"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

export default function BannersAdmin() {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(false);
    const [link, setLink] = useState("");
    const [order, setOrder] = useState(0);
    const [fileInputKey, setFileInputKey] = useState(Date.now());

    useEffect(() => {
        fetchBanners();
    }, []);

    async function fetchBanners() {
        setLoading(true);
        const res = await fetch("/api/banners");
        const data = await res.json();
        setBanners(data.banners || []);
        setLoading(false);
    }

    async function uploadFile(file) {
        const fd = new FormData();
        fd.append("files", file);
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const data = await res.json();
        return data?.uploads?.[0] || null;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const fileInput = e.target.querySelector('input[type="file"]');
        const file = fileInput?.files?.[0];

        if (!file) {
            toast.error("Please select an image");
            return;
        }

        setLoading(true);

        const uploaded = await uploadFile(file);
        if (!uploaded) {
            toast.error("Image upload failed");
            setLoading(false);
            return;
        }

        const res = await fetch("/api/banners", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                image: uploaded,
                link: link || "/shop",
                order: Number(order),
            }),
        });

        const result = await res.json();
        if (result.success) {
            toast.success("Banner added!");
        } else {
            toast.error("Failed: " + (result.error || ""));
        }

        setLink("");
        setOrder(0);
        setFileInputKey(Date.now());
        fetchBanners();
        setLoading(false);
    }

    async function handleDelete(id) {
        const result = await Swal.fire({
            title: "Delete Banner?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it",
        });

        if (!result.isConfirmed) return;

        try {
            const res = await fetch("/api/banners", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            const data = await res.json();
            if (data.success) {
                toast.success("Banner deleted!");
            } else {
                toast.error("Failed: " + (data.error || ""));
            }
        } catch {
            toast.error("Something went wrong");
        }
        fetchBanners();
    }

    return (
        <div className="p-6 md:p-10 min-h-screen text-black">
            <h1 className="text-3xl font-bold mb-6">Hero Banners</h1>

            <div className="bg-white rounded-2xl shadow-md p-6 mb-10">
                <h2 className="text-xl font-semibold mb-4">Add Banner</h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                        <label className="font-medium block mb-1">Image</label>
                        <input key={fileInputKey} type="file" accept="image/*" className="w-full border rounded-lg px-3 py-2" required />
                    </div>
                    <div>
                        <label className="font-medium block mb-1">Link (slug or path)</label>
                        <input value={link} onChange={(e) => setLink(e.target.value)} placeholder="/shop/product-slug" className="w-full border rounded-lg px-3 py-2" />
                    </div>
                    <div>
                        <label className="font-medium block mb-1">Display Order</label>
                        <input type="number" value={order} onChange={(e) => setOrder(e.target.value)} className="w-full border rounded-lg px-3 py-2" />
                    </div>
                    <div>
                        <button type="submit" disabled={loading} className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition">
                            {loading ? "Uploading..." : "Add Banner"}
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Current Banners</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : banners.length === 0 ? (
                    <p className="text-gray-500">No banners yet. Add one above.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {banners.map((b) => (
                            <div key={b._id} className="border rounded-xl overflow-hidden">
                                <img src={b.image?.url} alt="banner" className="w-full h-40 object-cover" />
                                <div className="p-3">
                                    <p className="text-sm text-gray-600">Link: <span className="font-medium">{b.link}</span></p>
                                    <p className="text-sm text-gray-600">Order: <span className="font-medium">{b.order}</span></p>
                                    <button onClick={() => handleDelete(b._id)} className="mt-2 bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
