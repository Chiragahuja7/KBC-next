"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { label: "Add Product", href: "/admin" },
    { label: "All Products", href: "/admin/products" },
    { label: "Banners", href: "/admin/banners" },
    { label: "Categories", href: "/admin/categories" },
    { label: "Orders", href: "/admin/orders" },
];

export default function AdminHeader() {
    const pathname = usePathname();

    return (
        <aside className="w-56 min-h-screen bg-gray-900 text-white flex flex-col">
            <div className="p-5 border-b border-gray-700">
                <h1 className="text-xl font-bold">Admin Panel</h1>
            </div>
            <nav className="flex-1 py-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`block px-5 py-3 text-sm font-medium transition-colors ${isActive
                                ? "bg-gray-700 text-white border-l-4 border-green-500"
                                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                }`}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
            <div className="p-5 border-t border-gray-700">
                <Link href="/" className="text-sm text-gray-400 hover:text-white">
                    ← Back to Store
                </Link>
            </div>
        </aside>
    );
}
