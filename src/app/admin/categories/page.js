"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

export default function CategoriesAdmin() {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    async function fetchCategories() {
        setLoading(true);
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data.categories || []);
        setLoading(false);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!name.trim()) return;

        setLoading(true);
        const res = await fetch("/api/categories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name.trim() }),
        });
        const result = await res.json();
        if (result.success) {
            toast.success("Category added!");
        } else {
            toast.error("Failed: " + (result.error || ""));
        }
        setName("");
        fetchCategories();
        setLoading(false);
    }

    async function handleDelete(id) {
        const result = await Swal.fire({
            title: "Delete Category?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it",
        });

        if (!result.isConfirmed) return;

        try {
            const res = await fetch("/api/categories", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            const data = await res.json();
            if (data.success) {
                toast.success("Category deleted!");
            } else {
                toast.error("Failed: " + (data.error || ""));
            }
        } catch {
            toast.error("Something went wrong");
        }
        fetchCategories();
    }

    return (
        <div className="p-6 md:p-10 min-h-screen text-black">
            <h1 className="text-3xl font-bold mb-6">Categories</h1>

            <div className="bg-white rounded-2xl shadow-md p-6 mb-10">
                <h2 className="text-xl font-semibold mb-4">Add Category</h2>
                <form onSubmit={handleSubmit} className="flex gap-3 items-end">
                    <div className="flex-1">
                        <label className="font-medium block mb-1">Category Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Weight Management" className="w-full border rounded-lg px-3 py-2" required />
                    </div>
                    <button type="submit" disabled={loading} className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition">
                        {loading ? "Adding..." : "Add"}
                    </button>
                </form>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Current Categories</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : categories.length === 0 ? (
                    <p className="text-gray-500">No categories yet.</p>
                ) : (
                    <div className="flex flex-wrap gap-3">
                        {categories.map((c) => (
                            <div key={c._id} className="flex items-center gap-2 border rounded-full px-4 py-2">
                                <span className="font-medium">{c.name}</span>
                                <button onClick={() => handleDelete(c._id)} className="text-red-500 hover:text-red-700 text-sm">✕</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
