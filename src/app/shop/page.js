"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductModal from "@/src/components/ProductsModal";

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const searchParams = useSearchParams();
    const router = useRouter();

    const [maxPrice, setMaxPrice] = useState(2000);
    const [showFilters, setShowFilters] = useState(false);
    const [pageState, setPageState] = useState(1);
    const [pagesState, setPagesState] = useState(1);
    const [totalState, setTotalState] = useState(0);
    const [categories, setCategories] = useState([]);
    const [sortValue, setSortValue] = useState("");
    const [gridCols, setGridCols] = useState(3);

    useEffect(() => {
        fetch("/api/categories")
            .then(res => res.json())
            .then(data => setCategories((data.categories || []).map(c => c.name)))
            .catch(() => { });
    }, []);

    useEffect(() => {
        if (!searchParams) return;
        const mp = searchParams.get("maxPrice");
        const s = searchParams.get("sort") || "";
        const p = searchParams.get("page") || "1";
        if (mp) setMaxPrice(Number(mp));
        setSortValue(s);
        setPageState(Number(p));
    }, [searchParams]);

    const updateQuery = (updates = {}) => {
        if (!searchParams) return;
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(updates).forEach(([key, value]) => {
            if (!value && value !== 0) params.delete(key);
            else params.set(key, String(value));
        });
        if (!updates.page) params.set("page", "1");
        router.push(`/shop?${params.toString()}`);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                if (!searchParams) return;
                const params = new URLSearchParams(searchParams.toString());
                if (!params.get("page")) params.set("page", "1");
                if (!params.get("limit")) params.set("limit", "6");
                const response = await fetch(`/api/products?${params.toString()}`);
                if (!response.ok) throw new Error("Failed to fetch products");
                const data = await response.json();
                if (data?.success && Array.isArray(data.products)) {
                    setProducts(data.products);
                    setPageState(Number(data.page) || 1);
                    setPagesState(Number(data.pages) || 1);
                    setTotalState(Number(data.total) || 0);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [searchParams]);

    const activeCategory = searchParams?.get("category") || "";

    return (
        <>
            <div className="p-6 md:p-0 md:m-4 mb-1 text-center">
                <Link href="/" className="text-gray-400 hover:text-gray-600 transition">Home</Link>
                <span className="text-black"> : Shop</span>
                <h1 className="text-4xl text-black font-bold mt-3">Shop</h1>
                <p className="text-gray-500 mt-2 text-sm">{totalState} product{totalState !== 1 ? "s" : ""} found</p>
            </div>


            <div className="flex text-black p-2 relative">
                {showFilters && (
                    <div onClick={() => setShowFilters(false)} className="fixed inset-0 bg-black/40 z-40 md:hidden" />
                )}

                {/* Sidebar */}
                <div className={`${showFilters ? 'fixed left-0 top-0 z-50 h-full w-3/4 bg-white p-5 overflow-y-auto' : 'hidden'} md:block md:w-64 md:relative md:h-auto md:top-auto md:left-auto md:z-auto md:bg-transparent md:p-5`}>

                    {showFilters && (
                        <div className="flex justify-between items-center mb-4 md:hidden">
                            <span className="text-xl font-bold">Filters</span>
                            <button onClick={() => setShowFilters(false)} className="text-2xl">✕</button>
                        </div>
                    )}

                    {/* Categories */}
                    <div className="mb-6">
                        <h3 className="text-lg font-bold mb-3">Shop by Concern</h3>
                        <div className="space-y-1">
                            <Link
                                href="/shop"
                                className={`block py-2 px-3 rounded-lg text-sm transition ${!activeCategory ? 'bg-[#0f5b3f] text-white font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                All Products
                            </Link>
                            {categories.map((category, index) => (
                                <Link
                                    key={index}
                                    href={`/shop?category=${encodeURIComponent(category)}`}
                                    className={`block py-2 px-3 rounded-lg text-sm transition ${activeCategory === category ? 'bg-[#0f5b3f] text-white font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                                >
                                    {category}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Price Filter */}
                    <div className="mb-6">
                        <h3 className="text-lg font-bold mb-3">Price Range</h3>
                        <div className="bg-gray-50 rounded-xl p-4">
                            <div className="flex justify-between text-sm text-gray-500 mb-2">
                                <span>₹0</span>
                                <span className="font-semibold text-black">₹{maxPrice}</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="5000"
                                step="50"
                                value={maxPrice}
                                onChange={(e) => {
                                    const v = Number(e.target.value);
                                    setMaxPrice(v);
                                }}
                                onMouseUp={() => updateQuery({ maxPrice: maxPrice === 5000 ? null : String(maxPrice) })}
                                onTouchEnd={() => updateQuery({ maxPrice: maxPrice === 5000 ? null : String(maxPrice) })}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0f5b3f]"
                            />
                            <div className="flex gap-2 mt-3">
                                <button
                                    onClick={() => { setMaxPrice(500); updateQuery({ maxPrice: "500" }); }}
                                    className={`text-xs px-3 py-1 rounded-full border transition ${maxPrice === 500 ? 'bg-[#0f5b3f] text-white border-[#0f5b3f]' : 'border-gray-300 hover:bg-gray-100'}`}
                                >Under ₹500</button>
                                <button
                                    onClick={() => { setMaxPrice(1000); updateQuery({ maxPrice: "1000" }); }}
                                    className={`text-xs px-3 py-1 rounded-full border transition ${maxPrice === 1000 ? 'bg-[#0f5b3f] text-white border-[#0f5b3f]' : 'border-gray-300 hover:bg-gray-100'}`}
                                >Under ₹1000</button>
                                <button
                                    onClick={() => { setMaxPrice(5000); updateQuery({ maxPrice: null }); }}
                                    className={`text-xs px-3 py-1 rounded-full border transition ${maxPrice >= 5000 ? 'bg-[#0f5b3f] text-white border-[#0f5b3f]' : 'border-gray-300 hover:bg-gray-100'}`}
                                >All</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Section */}
                <div className="flex-1 p-2 md:p-4">

                    {/* Toolbar */}
                    <div className="mb-4 flex items-center gap-3">
                        <button onClick={() => setShowFilters(true)} className="md:hidden px-3 py-2 rounded-lg text-black bg-gray-100 border border-gray-300 text-sm font-medium flex items-center gap-1.5 shrink-0">
                            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h10M5 10h6M7 14h2" /></svg>
                            Filters
                        </button>
                        <p className="text-sm text-gray-500 hidden md:block whitespace-nowrap">
                            There are {totalState} results in total
                        </p>

                        {/* Grid Toggle Buttons */}
                        <div className="flex items-center gap-0.5 border border-gray-200 rounded-lg p-0.5 shrink-0 md:ms-60">
                            {/* Single col - visible on mobile, hidden on desktop */}
                            <button onClick={() => setGridCols(3)} title="Single Column" className={`md:hidden p-1.5 rounded transition ${gridCols !== 2 ? 'bg-black text-white' : 'text-gray-400 hover:bg-gray-100'}`}>
                                <svg width="16" height="16" viewBox="0 0 18 18" fill="currentColor"><rect x="3" y="1" width="12" height="7" rx="1.5" /><rect x="3" y="10" width="12" height="7" rx="1.5" /></svg>
                            </button>
                            <button onClick={() => setGridCols(2)} title="2 Columns" className={`p-1.5 rounded transition ${gridCols === 2 ? 'bg-black text-white' : 'text-gray-400 hover:bg-gray-100'}`}>
                                <svg width="16" height="16" viewBox="0 0 18 18" fill="currentColor"><rect x="1" y="1" width="7" height="7" rx="1.5" /><rect x="10" y="1" width="7" height="7" rx="1.5" /><rect x="1" y="10" width="7" height="7" rx="1.5" /><rect x="10" y="10" width="7" height="7" rx="1.5" /></svg>
                            </button>
                            <button onClick={() => setGridCols(3)} title="3 Columns" className={`hidden md:block p-1.5 rounded transition ${gridCols === 3 ? 'bg-black text-white' : 'text-gray-400 hover:bg-gray-100'}`}>
                                <svg width="16" height="16" viewBox="0 0 18 18" fill="currentColor"><rect x="0" y="1" width="5" height="7" rx="1" /><rect x="6.5" y="1" width="5" height="7" rx="1" /><rect x="13" y="1" width="5" height="7" rx="1" /><rect x="0" y="10" width="5" height="7" rx="1" /><rect x="6.5" y="10" width="5" height="7" rx="1" /><rect x="13" y="10" width="5" height="7" rx="1" /></svg>
                            </button>
                            <button onClick={() => setGridCols(4)} title="4 Columns" className={`hidden md:block p-1.5 rounded transition ${gridCols === 4 ? 'bg-black text-white' : 'text-gray-400 hover:bg-gray-100'}`}>
                                <svg width="16" height="16" viewBox="0 0 18 18" fill="currentColor"><rect x="0" y="1" width="3.5" height="7" rx="1" /><rect x="5" y="1" width="3.5" height="7" rx="1" /><rect x="9.5" y="1" width="3.5" height="7" rx="1" /><rect x="14.5" y="1" width="3.5" height="7" rx="1" /><rect x="0" y="10" width="3.5" height="7" rx="1" /><rect x="5" y="10" width="3.5" height="7" rx="1" /><rect x="9.5" y="10" width="3.5" height="7" rx="1" /><rect x="14.5" y="10" width="3.5" height="7" rx="1" /></svg>
                            </button>
                            <button onClick={() => setGridCols(1)} title="List View" className={`hidden md:block p-1.5 rounded transition ${gridCols === 1 ? 'bg-black text-white' : 'text-gray-400 hover:bg-gray-100'}`}>
                                <svg width="16" height="16" viewBox="0 0 18 18" fill="currentColor"><rect x="0" y="1" width="18" height="3" rx="1" /><rect x="0" y="6" width="18" height="3" rx="1" /><rect x="0" y="11" width="18" height="3" rx="1" /></svg>
                            </button>
                        </div>

                        <div className="relative ml-auto shrink-0">
                            <select
                                value={sortValue}
                                onChange={(e) => { setSortValue(e.target.value); updateQuery({ sort: e.target.value || null }); }}
                                className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0f5b3f] focus:border-transparent"
                            >
                                <option value="">Sort By</option>
                                <option value="priceLowHigh">Price: Low to High</option>
                                <option value="priceHighLow">Price: High to Low</option>
                                <option value="AlphabeticalAZ">Name: A → Z</option>
                                <option value="AlphabeticalZA">Name: Z → A</option>
                                <option value="BestSeller">Newest First</option>
                            </select>
                            <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" width="10" height="6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 1l4 4 4-4" /></svg>
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading ? (
                        <div className={`grid gap-4 justify-center ${gridCols === 1 ? 'grid-cols-1 max-w-2xl mx-auto' : gridCols === 2 ? 'grid-cols-2' : gridCols === 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-1 md:grid-cols-3'}`}>
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-white rounded-2xl p-3 animate-pulse">
                                    <div className={`bg-gray-200 rounded-xl w-full ${gridCols === 4 ? 'h-48' : gridCols === 1 ? 'h-48' : 'h-52 md:h-72'}`} />
                                    <div className="bg-gray-200 rounded h-4 w-3/4 mx-auto mt-4" />
                                    <div className="bg-gray-200 rounded h-4 w-1/2 mx-auto mt-2" />
                                    <div className="bg-gray-200 rounded-full h-10 w-full mt-4" />
                                </div>
                            ))}
                        </div>
                    ) : products.length === 0 ? (
                        /* Empty State */
                        <div className="text-center py-20">
                            <svg className="mx-auto mb-4" width="64" height="64" fill="none" stroke="#9ca3af" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            <h3 className="text-xl font-semibold text-gray-700">No products found</h3>
                            <p className="text-gray-400 mt-2">Try adjusting your filters or browse all products</p>
                            <Link href="/shop" className="inline-block mt-4 bg-[#0f5b3f] text-white px-6 py-2 rounded-full hover:bg-[#0d4e36] transition">
                                View All Products
                            </Link>
                        </div>
                    ) : (
                        <>
                            {/* Product Grid */}
                            <div className={`grid gap-4 transition-all duration-300 ${gridCols === 1 ? 'grid-cols-1 max-w-2xl mx-auto' : gridCols === 2 ? 'grid-cols-2' : gridCols === 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-1 md:grid-cols-3'}`}>
                                {products.map((item) => {
                                    const primaryImg = item?.images?.[0]?.url || '/assets/placeholder.png';
                                    const hoverImg = item?.images?.[1]?.url || primaryImg;
                                    const imgHeight = gridCols === 4 ? 'h-48' : gridCols === 1 ? 'h-48' : 'h-52 md:h-72';
                                    return (
                                        <div key={item._id} className="bg-white rounded-2xl p-3 group/card hover:shadow-lg transition-shadow duration-300">
                                            <Link href={`/shop/${item.slug}`} className="block overflow-hidden rounded-xl group relative">
                                                <Image src={primaryImg} height={300} width={400} alt={item.name} className={`rounded-xl transition-opacity duration-300 group-hover:opacity-0 ease-linear w-full object-cover ${imgHeight}`} />
                                                <Image src={hoverImg} height={300} width={400} alt="Hover" className={`rounded-xl absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-linear w-full object-cover ${imgHeight}`} />
                                            </Link>
                                            <h3 className={`text-black font-semibold mt-3 text-center ${gridCols === 4 ? 'text-sm' : ''}`}>{item.name}</h3>
                                            <div className="text-center mt-1">
                                                <span className={`text-green-700 font-bold ${gridCols === 4 ? 'text-sm' : ''}`}>Rs. {item.price}.00</span>
                                                {item.oldPrice && <span className={`text-gray-400 line-through ms-2 ${gridCols === 4 ? 'text-xs' : ''}`}>Rs. {item.oldPrice}.00</span>}
                                            </div>
                                            <button
                                                className={`mt-3 border text-[#0f5b3f] font-bold hover:text-white border-gray-300 w-full py-2 rounded-full hover:bg-[#0f5b3f] transition ${gridCols === 4 ? 'text-sm py-1.5' : ''}`}
                                                onClick={() => setSelectedProduct(item)}
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Pagination — hidden when only 1 page */}
                            {pagesState > 1 && (
                                <div className="flex items-center justify-center gap-2 mt-8 mb-6">
                                    <button
                                        onClick={() => updateQuery({ page: Math.max(1, pageState - 1) })}
                                        disabled={pageState <= 1}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium disabled:opacity-40 hover:bg-gray-100 transition"
                                    >
                                        ← Prev
                                    </button>

                                    {Array.from({ length: pagesState }, (_, i) => i + 1).map(p => (
                                        <button
                                            key={p}
                                            onClick={() => updateQuery({ page: p })}
                                            className={`w-10 h-10 rounded-lg text-sm font-medium transition ${p === pageState ? 'bg-[#0f5b3f] text-white' : 'border border-gray-300 hover:bg-gray-100'}`}
                                        >
                                            {p}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => updateQuery({ page: Math.min(pagesState, pageState + 1) })}
                                        disabled={pageState >= pagesState}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium disabled:opacity-40 hover:bg-gray-100 transition"
                                    >
                                        Next →
                                    </button>
                                </div>
                            )}
                        </>
                    )}

                    {selectedProduct && (
                        <ProductModal
                            product={selectedProduct}
                            onClose={() => setSelectedProduct(null)}
                        />
                    )}
                </div>
            </div>
        </>
    )
}