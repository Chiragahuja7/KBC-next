"use client";
import Link from "next/link";
import { allproducts, categories } from "@/data/products";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductModal from "@/src/components/ProductsModal";

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const searchParams = useSearchParams();
    const router = useRouter();

    const [minPriceState, setMinPriceState] = useState("");
    const [maxPriceState, setMaxPriceState] = useState("");
    const [rangeState, setRangeState] = useState(1000);
    const [inStockChecked, setInStockChecked] = useState(false);
    const [outOfStockChecked, setOutOfStockChecked] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [pageState, setPageState] = useState(1);
    const [pagesState, setPagesState] = useState(1);
    const [totalState, setTotalState] = useState(0);

    useEffect(() => {
        if (!searchParams) return;

        const minPrice = searchParams.get("minPrice") || "";
        const maxPrice = searchParams.get("maxPrice") || "";
        const priceRange = searchParams.get("priceRange") || maxPrice || "1000";
        const inStock = searchParams.get("inStock");
        const page = searchParams.get("page") || "1";

        setMinPriceState(minPrice);
        setMaxPriceState(maxPrice);
        setRangeState(Number(priceRange));
        setInStockChecked(inStock === "true");
        setOutOfStockChecked(inStock === "false");
        setPageState(Number(page));
    }, [searchParams]);

    const updateQuery = (updates = {}) => {
        if (!searchParams) return;

        const params = new URLSearchParams(searchParams.toString());

        Object.entries(updates).forEach(([key, value]) => {
            if (!value) {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        });

        if (!updates.page) {
            params.set("page", "1");
        }

        router.push(`/shop?${params.toString()}`);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                if (!searchParams) return;

                const params = new URLSearchParams(searchParams.toString());

                if (!params.get("page")) params.set("page", "1");
                if (!params.get("limit")) params.set("limit", "6");

                const response = await fetch(`/api/products?${params.toString()}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data = await response.json();
                console.log("Fetched products:", data);

                if (data?.success && Array.isArray(data.products)) {
                    setProducts(data.products);
                    setPageState(Number(data.page) || 1);
                    setPagesState(Number(data.pages) || 1);
                    setTotalState(Number(data.total) || 0);
                }
                else if (Array.isArray(data)) {
                    setProducts(data);
                    setPageState(1);
                    setPagesState(1);
                    setTotalState(data.length);
                }

            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [searchParams]);
    return (
        <>
            <div className="p-9 m-9 mb-1 text-center">
                <Link href="/" className="text-gray-400">Home</Link>
                <span className="text-black"> : Shop</span>
                <div className="flex items-center justify-center mt-3 gap-3">
                    <span className="text-4xl text-black text-center font-bold">Shop</span>
                </div>
            </div>
            <button onClick={() => setShowFilters(true)} className="md:hidden ms-10 px-3 py-1 rounded text-black bg-gray-200 text-sm">Filters</button>

            <div className="flex text-black p-2 relative">
                {showFilters && (
                    <div onClick={() => setShowFilters(false)} className="fixed inset-0 bg-black/40 z-40 md:hidden" />
                )}

                <div className={`${showFilters ? 'fixed left-0 top-0 z-50 h-full w-3/4 bg-white p-5' : 'hidden'} md:block md:w-64 md:relative md:h-auto md:top-auto md:left-auto md:z-auto md:bg-transparent md:p-5`}>
                    <div className="border-b-gray-200 border border-white">
                        <details className="group" open>
                            <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-gray-900">
                                <span className="text-bold text-xl">Shop by Concern</span>
                                <span className="group-open:hidden text-2xl">+</span>
                                <span className="hidden group-open:block text-2xl">-</span>
                            </summary>

                            <div className="group-open:animate-fadeIn mt-3 text-gray-600">
                                {categories.map((category, index) => {
                                    return (
                                        <Link key={index} href={`/shop?category=${encodeURIComponent(category)}`} className="block py-2 px-3 rounded hover:bg-gray-200">
                                            {category}
                                        </Link>
                                    )
                                })}
                            </div>
                        </details>
                    </div>

                    <div className="mt-6 border-b-gray-200 border border-white">
                        <details className="group " open>
                            <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-gray-900">
                                <span className="text-bold text-xl">Availability</span>
                                <span className="group-open:hidden text-2xl">+</span>
                                <span className="hidden group-open:block text-2xl">-</span>
                            </summary>

                            <div className="flex flex-col group-open:animate-fadeIn mt-3 text-gray-600">
                                <div>
                                    <input type="checkbox" id="inStock" name="inStock" className="mr-2" checked={inStockChecked} onChange={(e) => {
                                        const checked = e.target.checked;
                                        setInStockChecked(checked);
                                        if (checked) {
                                            setOutOfStockChecked(false);
                                            updateQuery({ inStock: "true" });
                                        } else {
                                            if (outOfStockChecked) updateQuery({ inStock: "false" });
                                            else updateQuery({ inStock: null });
                                        }
                                    }} />
                                    <label htmlFor="inStock">In Stock</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="outOfStock" name="outOfStock" className="mr-2" checked={outOfStockChecked} onChange={(e) => {
                                        const checked = e.target.checked;
                                        setOutOfStockChecked(checked);
                                        if (checked) {
                                            setInStockChecked(false);
                                            updateQuery({ inStock: "false" });
                                        } else {
                                            if (inStockChecked) updateQuery({ inStock: "true" });
                                            else updateQuery({ inStock: null });
                                        }
                                    }} />
                                    <label htmlFor="outOfStock">Out Of Stock</label>
                                </div>
                            </div>
                        </details>
                    </div>

                    <div className="mt-6 border-b-gray-200 border border-white">
                        <details className="group " open>
                            <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-gray-900">
                                <span className="text-bold text-xl">Price</span>
                                <span className="group-open:hidden text-2xl">+</span>
                                <span className="hidden group-open:block text-2xl">-</span>
                            </summary>

                            <div className="flex flex-col group-open:animate-fadeIn mt-3 text-gray-600">
                                <p>INR</p>
                                <div className="flex items-center">
                                    <div>
                                        <input type="number" id="minPrice" name="minPrice" value={minPriceState} onChange={(e) => {
                                            const v = e.target.value;
                                            setMinPriceState(v);
                                            updateQuery({ minPrice: v || null });
                                        }} className="border w-20 border-gray-300 rounded py-1" />
                                    </div>
                                    <p className="mx-3">_</p>
                                    <div>
                                        <input type="number" id="maxPrice" name="maxPrice" value={maxPriceState} onChange={(e) => {
                                            const v = e.target.value;
                                            setMaxPriceState(v);
                                            updateQuery({ maxPrice: v || null });
                                        }} className=" border w-20 border-gray-300 rounded py-1" />
                                    </div>
                                </div>
                                <div>
                                    <input type="range" name="priceRange" id="priceRange" min="0" max="1000" value={rangeState} onChange={(e) => {
                                        const v = e.target.value;
                                        setRangeState(Number(v));
                                        setMaxPriceState(String(v));
                                        updateQuery({ priceRange: v, maxPrice: v });
                                    }} className="w-full bg-black mt-3" />
                                </div>
                            </div>
                        </details>
                    </div>

                    {/* <div className="mt-6">
                    <details className="group " open>
                            <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-gray-900">
                            <span className="text-bold text-xl">BestSeller</span>
                            <span className="group-open:hidden text-2xl">+</span>
                            <span className="hidden group-open:block text-2xl">-</span>
                            </summary>
                        </details>
                </div> */}

                </div>

                <div className="p-4 w-auto">
                    <div className="text-black mb-3 flex items-center justify-end gap-3">
                        <select className="border-gray-200" onChange={(e) => updateQuery({ sort: e.target.value })}>
                            <option value="">Sort By</option>
                            <option value="BestSeller">Best Seller</option>
                            <option value="priceLowHigh">Price: Low to High</option>
                            <option value="priceHighLow">Price: High to Low</option>
                            <option value="AlphabeticalAZ">Alphabetical: A-Z</option>
                            <option value="AlphabeticalZA">Alphabetical: Z-A</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-3">

                        {products.map((item) => {
                            const primaryImg = (item && item.images && item.images.length > 0) ? item.images[0].url : '/assets/placeholder.png';
                            const hoverImg = (item && item.images && item.images.length > 1) ? item.images[1].url : primaryImg;

                            return (
                                <div key={item._id} className="min-w-full sm:min-w-[60%] md:min-w-0 bg-white rounded-2xl p-3">

                                    <Link href={`/shop/${item.slug}`} className="block overflow-hidden rounded-xl group relative">
                                        {/* <span className="absolute top-3 left-3 bg-red-500 text-white text-sm px-3 py-1 rounded-full z-10">{item.discount}</span> */}
                                        <Image src={primaryImg} height={100} width={300} alt={item.name} className="rounded-xl transition-opacity duration-300 group-hover:opacity-0 ease-linear w-full h-65 md:h-90" />
                                        <Image src={hoverImg} height={100} width={300} alt="Hover" className="rounded-xl absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-linear w-full h-65 md:h-90" />
                                    </Link>
                                    <h3 className="text-black font-semibold mt-3 text-center">{item.name}</h3>
                                    <div className="text-center mt-1">
                                        <span className="text-green-700 font-bold">Rs.{item.price}.00</span>
                                        <span className="text-gray-400 line-through ms-2"> Rs.{item.oldPrice}.00</span>
                                    </div>

                                    <button className="mt-4 border text-[#0f5b3f] font-bold hover:text-white border-gray-300 w-full py-2 rounded-full hover:bg-[#0f5b3f] transition" onClick={() => setSelectedProduct(item)}>
                                        Add to Cart
                                    </button>
                                </div>
                            )
                        })}

                    </div>

                    <div className="flex items-center justify-center gap-2 mt-6">
                        <button
                            onClick={() => updateQuery({ page: 1 })}
                            disabled={pageState <= 1}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            First
                        </button>
                        <button
                            onClick={() => updateQuery({ page: Math.max(1, pageState - 1) })}
                            disabled={pageState <= 1}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Prev
                        </button>

                        <span className="px-3">{pageState} of {pagesState}</span>

                        <button
                            onClick={() => updateQuery({ page: Math.min(pagesState, pageState + 1) })}
                            disabled={pageState >= pagesState}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                        <button
                            onClick={() => updateQuery({ page: pagesState })}
                            disabled={pageState >= pagesState}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Last
                        </button>
                    </div>
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