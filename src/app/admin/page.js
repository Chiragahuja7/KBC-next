"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import Link from "next/link";

const Select = dynamic(() => import("react-select"), {
  ssr: false,
});

export default function Admin() {

  const emptyForm = {
    name: "",
    slug: "",
    description: "",
    price: "",
    oldPrice: "",
    isBestSeller: false,
    isMostPopular: false,
    isListed: true,
    images: [],
    category: [],
    sizes: [],
    colors: [],
  };

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [colorInput, setColorInput] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Support ?edit=id from All Products page
  useEffect(() => {
    const editId = searchParams?.get("edit");
    if (editId && products.length > 0) {
      const p = products.find(pr => pr._id === editId);
      if (p) handleEdit(p);
    }
  }, [searchParams, products]);

  async function fetchCategories() {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories((data.categories || []).map((c) => c.name));
    } catch (e) {
      console.error("Failed to fetch categories:", e);
    }
  }

  async function fetchProducts() {
    setLoading(true);
    const res = await fetch("/api/products?admin=true");
    const data = await res.json();
    setProducts(Array.isArray(data.products) ? data.products : []);
    setLoading(false);
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function uploadFiles(files) {
    const fd = new FormData();
    files.forEach((f) => fd.append("files", f));
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    return data?.uploads || [];
  }

  async function handleFiles(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setLoading(true);
    const uploads = await uploadFiles(files);
    setForm({ ...form, images: [...form.images, ...uploads] });
    setLoading(false);
  }

  function removeImage(index) {
    setForm({ ...form, images: form.images.filter((_, i) => i !== index) });
  }

  // --- Size variant helpers ---
  function addSize() {
    setForm({
      ...form,
      sizes: [...form.sizes, { label: "", price: "", oldPrice: "", image: null }],
    });
  }

  function removeSize(index) {
    setForm({ ...form, sizes: form.sizes.filter((_, i) => i !== index) });
  }

  function handleSizeFieldChange(index, field, value) {
    const updated = [...form.sizes];
    updated[index] = { ...updated[index], [field]: value };
    setForm({ ...form, sizes: updated });
  }

  async function handleSizeImage(index, e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    const uploads = await uploadFiles([file]);
    if (uploads.length > 0) {
      const updated = [...form.sizes];
      updated[index] = { ...updated[index], image: uploads[0] };
      setForm({ ...form, sizes: updated });
    }
    setLoading(false);
  }

  function removeSizeImage(index) {
    const updated = [...form.sizes];
    updated[index] = { ...updated[index], image: null };
    setForm({ ...form, sizes: updated });
  }

  // --- Color helpers ---
  function addColor() {
    const c = colorInput.trim();
    if (c && !form.colors.includes(c)) {
      setForm({ ...form, colors: [...form.colors, c] });
      setColorInput("");
    }
  }

  function removeColor(index) {
    setForm({ ...form, colors: form.colors.filter((_, i) => i !== index) });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.images.length) {
      toast.error("At least one image is required");
      return;
    }

    setLoading(true);

    const payload = {
      ...form,
      price: form.price === "" ? undefined : Number(form.price),
      oldPrice: form.oldPrice === "" ? undefined : Number(form.oldPrice),
      sizes: form.sizes.map((s) => ({
        ...s,
        price: s.price === "" ? undefined : Number(s.price),
        oldPrice: s.oldPrice === "" ? undefined : Number(s.oldPrice),
      })),
    };

    const method = editingId ? "PUT" : "POST";

    const res = await fetch("/api/products", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        editingId ? { id: editingId, ...payload } : payload
      ),
    });

    const result = await res.json();

    if (!result?.success) {
      toast.error("Failed to save product: " + (result?.error || "Unknown error"));
      setLoading(false);
      return;
    }

    toast.success(editingId ? "Product updated!" : "Product added!");
    setForm(emptyForm);
    setEditingId(null);
    setFileInputKey(Date.now());
    fetchProducts();
    if (searchParams?.get("edit")) router.replace("/admin");

    setLoading(false);
  }

  function handleEdit(p) {
    setEditingId(p._id);
    setForm({
      name: p.name || "",
      slug: p.slug || "",
      description: p.description || "",
      price: p.price ?? "",
      oldPrice: p.oldPrice ?? "",
      isBestSeller: p.isBestSeller || false,
      isMostPopular: p.isMostPopular || false,
      isListed: p.isListed !== false,
      images: p.images || [],
      category: p.category || [],
      sizes: (p.sizes || []).map((s) =>
        typeof s === "string"
          ? { label: s, price: "", oldPrice: "", image: null }
          : { label: s.label || "", price: s.price ?? "", oldPrice: s.oldPrice ?? "", image: s.image || null }
      ),
      colors: p.colors || [],
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="p-6 md:p-10 min-h-screen text-black">

      <h1 className="text-3xl font-bold mb-6">
        {editingId ? "Edit Product" : "Add Product"}
      </h1>

      <div className="bg-white rounded-2xl shadow-md p-6">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >

          <div>
            <label className="font-medium">Name</label>
            <input name="name" value={form.name} onChange={handleChange} required className="w-full border rounded-lg px-3 py-2 mt-1" />
          </div>

          <div>
            <label className="font-medium">Slug</label>
            <input name="slug" value={form.slug} onChange={handleChange} required className="w-full border rounded-lg px-3 py-2 mt-1" />
          </div>

          <div>
            <label className="font-medium">Base Price</label>
            <input name="price" value={form.price} onChange={handleChange} type="number" required className="w-full border rounded-lg px-3 py-2 mt-1" />
          </div>

          <div>
            <label className="font-medium">Base Old Price</label>
            <input name="oldPrice" value={form.oldPrice} onChange={handleChange} type="number" className="w-full border rounded-lg px-3 py-2 mt-1" />
          </div>

          <div>
            <label className="font-medium">Category</label>
            <Select
              name="category"
              value={categories
                .filter((cat) => form.category.includes(cat))
                .map((cat) => ({ value: cat, label: cat }))
              }
              onChange={(selected) =>
                setForm({ ...form, category: selected ? selected.map((s) => s.value) : [] })
              }
              className="w-full border rounded-lg mt-1 p-0.5"
              options={categories.map((cat) => ({ value: cat, label: cat }))}
              isMulti
            />
          </div>

          <div>
            <label className="font-medium">Images</label>
            <input
              key={fileInputKey}
              type="file"
              multiple
              onChange={handleFiles}
              className="w-full border rounded-lg px-3 py-2 mt-1"
              required={!editingId}
            />
            <div className="flex gap-3 flex-wrap mt-3">
              {(form.images || []).map((img, idx) => (
                <div key={idx} className="relative">
                  <img src={img.url} className="w-24 h-24 object-cover rounded" />
                  <button type="button" onClick={() => removeImage(idx)} className="absolute right-0 top-0 bg-white rounded-full px-2">✕</button>
                </div>
              ))}
            </div>
          </div>

          {/* Flags Row */}
          <div className="md:col-span-2 flex gap-6 items-center mt-2 flex-wrap">
            <label className="flex items-center gap-2 font-medium cursor-pointer">
              <input type="checkbox" checked={form.isBestSeller} onChange={(e) => setForm({ ...form, isBestSeller: e.target.checked })} className="w-4 h-4" />
              Best Seller
            </label>
            <label className="flex items-center gap-2 font-medium cursor-pointer">
              <input type="checkbox" checked={form.isMostPopular} onChange={(e) => setForm({ ...form, isMostPopular: e.target.checked })} className="w-4 h-4" />
              Most Popular
            </label>
            <label className="flex items-center gap-2 font-medium cursor-pointer">
              <div className={`relative w-11 h-6 rounded-full transition-colors ${form.isListed ? 'bg-green-500' : 'bg-gray-300'}`}>
                <input type="checkbox" checked={form.isListed} onChange={(e) => setForm({ ...form, isListed: e.target.checked })} className="sr-only" />
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.isListed ? 'translate-x-5' : 'translate-x-0.5'}`} onClick={() => setForm({ ...form, isListed: !form.isListed })} />
              </div>
              <span className={form.isListed ? 'text-green-700' : 'text-gray-500'}>{form.isListed ? "Listed" : "Unlisted"}</span>
            </label>
          </div>

          {/* Colors */}
          <div className="md:col-span-2">
            <label className="font-medium">Colors</label>
            <div className="flex gap-2 mt-2 items-center">
              <input
                value={colorInput}
                onChange={(e) => setColorInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addColor(); } }}
                placeholder="Type a color and press Enter or Add"
                className="border rounded-lg px-3 py-2 flex-1"
              />
              <button type="button" onClick={addColor} className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition text-sm font-medium">
                Add
              </button>
            </div>
            {form.colors.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {form.colors.map((c, i) => (
                  <span key={i} className="flex items-center gap-1 bg-gray-100 border rounded-full px-3 py-1 text-sm">
                    {c}
                    <button type="button" onClick={() => removeColor(i)} className="text-red-400 hover:text-red-600 ml-1">✕</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Size Variants */}
          <div className="md:col-span-2">
            <label className="font-medium">Size Variants</label>
            <p className="text-sm text-gray-500 mt-1">Add sizes with their own pricing and optional image. Leave empty if the product has no size variants.</p>

            <div className="space-y-4 mt-3">
              {(form.sizes || []).map((sz, idx) => (
                <div key={idx} className="border rounded-xl p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-sm text-gray-600">Variant {idx + 1}</span>
                    <button type="button" onClick={() => removeSize(idx)} className="text-red-500 text-sm hover:text-red-700">Remove</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="text-sm text-gray-600">Size Label</label>
                      <input
                        value={sz.label}
                        onChange={(e) => handleSizeFieldChange(idx, "label", e.target.value)}
                        placeholder="e.g. 500ml, Large"
                        className="w-full border rounded-lg px-3 py-2 mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Price</label>
                      <input
                        value={sz.price}
                        onChange={(e) => handleSizeFieldChange(idx, "price", e.target.value)}
                        type="number"
                        placeholder="Variant price"
                        className="w-full border rounded-lg px-3 py-2 mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Old Price</label>
                      <input
                        value={sz.oldPrice}
                        onChange={(e) => handleSizeFieldChange(idx, "oldPrice", e.target.value)}
                        type="number"
                        placeholder="Variant old price"
                        className="w-full border rounded-lg px-3 py-2 mt-1"
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <label className="text-sm text-gray-600">Variant Image (optional)</label>
                    {sz.image?.url ? (
                      <div className="flex items-center gap-3 mt-1">
                        <img src={sz.image.url} className="w-16 h-16 object-cover rounded" />
                        <button type="button" onClick={() => removeSizeImage(idx)} className="text-red-500 text-sm">Remove image</button>
                      </div>
                    ) : (
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleSizeImage(idx, e)}
                        className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
                      />
                    )}
                  </div>
                </div>
              ))}

              <button type="button" onClick={addSize} className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition text-sm font-medium">
                + Add Size Variant
              </button>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="font-medium">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full border rounded-lg px-3 py-2 mt-1 overflow-auto"
            />
          </div>

          <div className="md:col-span-2 flex gap-3 mt-4">
            <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition">
              {editingId ? "Update Product" : "Add Product"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => { setEditingId(null); setForm(emptyForm); }}
                className="border px-6 py-2 rounded-lg hover:bg-gray-200 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}