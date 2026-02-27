"use client";

import { categories } from "@/data/products";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
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
    images: [],
    category: [],
    sizes: [],
  };

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(Date.now());



  useEffect(() => {
    fetchProducts();
  }, []);

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
      alert("At least one image is required");
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
      alert("Failed to save product: " + (result?.error || "Unknown error"));
      setLoading(false);
      return;
    }

    setForm(emptyForm);
    setEditingId(null);
    setFileInputKey(Date.now());
    fetchProducts();

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
      images: p.images || [],
      category: p.category || [],
      sizes: p.sizes || [],
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }


  async function handleDelete(id) {
    if (!confirm("Delete this product?")) return;

    await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    fetchProducts();
  }

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen text-black">

      <h1 className="text-3xl font-bold mb-6">
        Admin Panel
      </h1>
      <Link href="/admin/orders" className="text-black hover:underline">
        View Orders
      </Link>

      <div className="bg-white rounded-2xl shadow-md p-6 mb-10">

        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Product" : "Add Product"}
        </h2>

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

      <div className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto">

        <h2 className="text-xl font-semibold mb-4">Products</h2>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="w-full border border-gray-300">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Slug</th>
                <th className="p-3 border">Price</th>
                <th className="p-3 border">Category</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="text-center hover:bg-gray-50">

                  <td className="p-3 border">{p.name}</td>
                  <td className="p-3 border">{p.slug}</td>
                  <td className="p-3 border">Rs. {p.price}</td>
                  <td className="p-3 border">{p.category?.join(", ")}</td>

                  <td className="p-3 border">

                    <button
                      onClick={() => handleEdit(p)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(p._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded-lg ml-2 hover:bg-red-700 transition"
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}