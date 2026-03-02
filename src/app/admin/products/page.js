"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

export default function AllProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        setLoading(true);
        const res = await fetch("/api/products?admin=true");
        const data = await res.json();
        setProducts(Array.isArray(data.products) ? data.products : []);
        setLoading(false);
    }

    async function handleDelete(id) {
        const result = await Swal.fire({
            title: "Delete Product?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it",
        });

        if (!result.isConfirmed) return;

        try {
            const res = await fetch("/api/products", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            const data = await res.json();
            if (data.success) {
                toast.success("Product deleted successfully");
                fetchProducts();
            } else {
                toast.error("Failed to delete: " + (data.error || ""));
            }
        } catch {
            toast.error("Something went wrong");
        }
    }

    function handleEdit(p) {
        // Navigate to admin page with product id as query param
        router.push(`/admin?edit=${p._id}`);
    }

    return (
        <div className="p-6 md:p-10 min-h-screen text-black">
            <h1 className="text-3xl font-bold mb-6">All Products</h1>

            <div className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto">
                {loading ? (
                    <div>Loading...</div>
                ) : products.length === 0 ? (
                    <p className="text-gray-500">No products yet.</p>
                ) : (
                    <table className="w-full border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 border">Image</th>
                                <th className="p-3 border">Name</th>
                                <th className="p-3 border">Price</th>
                                <th className="p-3 border">Category</th>
                                <th className="p-3 border">Flags</th>
                                <th className="p-3 border">Status</th>
                                <th className="p-3 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p) => (
                                <tr key={p._id} className="text-center hover:bg-gray-50">
                                    <td className="p-3 border">
                                        {p.images?.[0]?.url ? (
                                            <img src={p.images[0].url} alt={p.name} className="w-12 h-12 object-cover rounded mx-auto" />
                                        ) : (
                                            <span className="text-gray-400 text-sm">No img</span>
                                        )}
                                    </td>
                                    <td className="p-3 border font-medium">{p.name}</td>
                                    <td className="p-3 border">Rs. {p.price}</td>
                                    <td className="p-3 border text-sm">{p.category?.join(", ")}</td>
                                    <td className="p-3 border text-sm">
                                        {p.isBestSeller && <span className="inline-block bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs mr-1">Best Seller</span>}
                                        {p.isMostPopular && <span className="inline-block bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">Popular</span>}
                                    </td>
                                    <td className="p-3 border text-sm">
                                        {p.isListed !== false
                                            ? <span className="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">Listed</span>
                                            : <span className="inline-block bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs">Unlisted</span>
                                        }
                                    </td>
                                    <td className="p-3 border">
                                        <button
                                            onClick={() => handleEdit(p)}
                                            className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(p._id)}
                                            className="bg-red-600 text-white px-3 py-1 rounded-lg ml-2 hover:bg-red-700 transition text-sm"
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
