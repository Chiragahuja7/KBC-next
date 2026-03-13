"use client";
import { useState } from "react";
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
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Toggle Button */}
            <div className="md:hidden flex items-center p-4 bg-gray-900 text-white w-full fixed top-0 left-0 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 border border-gray-700 rounded-lg"
                >
                    {isOpen ? "✕" : "☰"}
                </button>
                <h1 className="ml-4 text-lg font-bold">Admin Panel</h1>
            </div>

            {/* Backdrop for mobile */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={`
                fixed md:static inset-y-0 left-0 z-40
                w-56 bg-gray-900 text-white flex flex-col
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                min-h-screen
            `}>
                <div className="p-5 border-b border-gray-700 hidden md:block">
                    <h1 className="text-xl font-bold">Admin Panel</h1>
                </div>
                {/* Spacer for mobile header height */}
                <div className="h-16 md:hidden"></div>
                
                <nav className="flex-1 py-4">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
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
            {/* Spacer for desktop/mobile content depending on header type */}
            <div className="md:hidden h-16"></div>
        </>
    );
}
