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
    images: [],
    category: [],
    sizes: [],
  };

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(Date.now());
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

    const res = await fetch("/api/products");
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

    const res = await fetch("/api/upload", {
      method: "POST",
      body: fd,
    });

    const data = await res.json();
    return data?.uploads || [];
  }


  async function handleFiles(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setLoading(true);

    const uploads = await uploadFiles(files);

    setForm({
      ...form,
      images: [...form.images, ...uploads],
    });

    setLoading(false);
  }

  function removeImage(index) {
    setForm({
      ...form,
      images: form.images.filter((_, i) => i !== index),
    });
  }


  function addSize() {
    setForm({
      ...form,
      sizes: [...form.sizes, ""],
    });
  }

  function removeSize(index) {
    setForm({
      ...form,
      sizes: form.sizes.filter((_, i) => i !== index),
    });
  }

  function handleSizeChange(index, value) {
    const updated = [...form.sizes];
    updated[index] = value;
    setForm({
      ...form,
      sizes: updated,
    });
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
      images: p.images || [],
      category: p.category || [],
      sizes: p.sizes || [],
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }


  return (
    <div className="p-6 md:p-10 min-h-screen text-black">

      <h1 className="text-3xl font-bold mb-6">
        {editingId ? "Edit Product" : "Add Product"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >

        <div>
          <label className="font-medium">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label className="font-medium">Slug</label>
          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label className="font-medium">Price</label>
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            type="number"
            required
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label className="font-medium">Old Price</label>
          <input
            name="oldPrice"
            value={form.oldPrice}
            onChange={handleChange}
            type="number"
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
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
              setForm({
                ...form,
                category: selected ? selected.map((s) => s.value) : [],
              })
            }
            className="w-full border rounded-lg mt-1 p-0.5"
            options={categories.map((cat) => ({ value: cat, label: cat }))}
            isMulti
          >
          </Select>
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

        <div className="md:col-span-2 flex gap-6 items-center mt-2">
          <label className="flex items-center gap-2 font-medium cursor-pointer">
            <input
              type="checkbox"
              checked={form.isBestSeller}
              onChange={(e) => setForm({ ...form, isBestSeller: e.target.checked })}
              className="w-4 h-4"
            />
            Best Seller
          </label>
          <label className="flex items-center gap-2 font-medium cursor-pointer">
            <input
              type="checkbox"
              checked={form.isMostPopular}
              onChange={(e) => setForm({ ...form, isMostPopular: e.target.checked })}
              className="w-4 h-4"
            />
            Most Popular
          </label>
        </div>

        <div className="md:col-span-2">
          <label className="font-medium">Sizes</label>

          <div className="space-y-3 mt-2">
            {(form.sizes || []).map((sz, idx) => (
              <div key={idx} className="flex gap-2 items-center">

                <input value={sz} onChange={(e) => handleSizeChange(idx, e.target.value)} placeholder="Size (e.g. 500ml)" className="border rounded px-2 py-1" />

                <button type="button" onClick={() => removeSize(idx)} className="bg-red-500 text-white px-2 py-1 rounded">Remove</button>

              </div>
            ))}

            <button type="button" onClick={addSize} className="bg-gray-200 px-3 py-1 rounded">
              Add Size
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
              onClick={() => {
                setEditingId(null);
                setForm(emptyForm);
              }}
              className="border px-6 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              Cancel
            </button>
          )}

        </div>
      </form>
    </div>
  );
}