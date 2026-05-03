'use client';
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion, AnimatePresence } from 'framer-motion';


import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useEffect, useState } from "react";
import ProductModal from "./ProductsModal";

export default function BestSeller() {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch("/api/products/?bestseller=true&limit=3");
            const data = await response.json();
            if (!data.success) {
                console.error("Failed to fetch bestsellers:", data.error);
            } else {
                setProducts(data.products);
            }
        }
        fetchProducts();
    }, [])

    return (
        <>
            <div className="p-6">
                <div className="bg-gray-100 rounded-2xl p-4">
                    <div className="p-4 flex justify-between items-center">
                        <span className="text-black text-3xl md:text-5xl font-bold">Best Sellers</span>
                        <div className="flex items-center gap-4">
                            <span className="font-semibold hidden md:inline" style={{ color: 'var(--primary)' }}>Best Selling</span>
                            <Link className="text-stone-500 font-medium whitespace-nowrap" href="/shop">View All »</Link>
                        </div>
                    </div>

                    <div className="p-4 md:block hidden w-auto">
                        <div className="flex gap-3 p-3">
                            {products.map((item) => (
                                <motion.div
                                    key={item._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                    className="min-w-full sm:min-w-[60%] md:min-w-0 bg-white rounded-2xl p-3 shadow-sm hover:shadow-xl transition-shadow duration-300"
                                >

                                    <Link href={`/shop/${item.slug}`} className="block">
                                        <div className="overflow-hidden rounded-xl group relative">
                                            {/* <span className="absolute top-3 left-3 bg-red-500 text-white text-sm px-3 py-1 rounded-full z-10">
                                                {item.discount}
                                            </span> */}
                                            <Image src={item.images[0]?.url || "/assets/default-product-image.jpg"} height={80} width={600} alt={item.name} className="rounded-xl transition-opacity duration-300 group-hover:opacity-0 ease-linear object-cover h-100" />
                                            <Image src={item.images[1]?.url || item.images[0]?.url} height={80} width={600} alt="Hover" className="rounded-xl absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-linear object-cover h-100" />
                                        </div>
                                        <h3 className="text-black font-semibold mt-3 text-center">{item.name}</h3>
                                        <div className="text-center mt-1">
                                            <span className="text-primary font-bold">Rs. {item.price}.00</span>
                                            <span className="text-gray-400 line-through ms-2"> Rs. {item.oldPrice}.00</span>
                                        </div>
                                    </Link>

                                    <button onClick={() => setSelectedProduct(item)} className="mt-4 border text-primary font-bold hover:text-white border-gray-300 w-full py-2 rounded-full hover:bg-primary transition">
                                        Add to Cart
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className=" md:hidden w-auto">
                        <div className="gap-3">
                            <Swiper pagination={{ clickable: true, el: ".custom-pagination" }} modules={[Pagination]} className="mySwiper pb-10">

                                {products.map((item) => (
                                    <SwiperSlide key={item.id}>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            className="min-w-full sm:min-w-[60%] md:min-w-0 bg-white rounded-2xl"
                                        >

                                            <Link href={`/shop/${item.slug}`} className="block">
                                                <div className="overflow-hidden rounded-xl group relative">
                                                    {/* <span className="absolute top-3 left-3 bg-red-500 text-white text-sm px-3 py-1 rounded-full z-10">
                                                        {item.discount}
                                                    </span> */}
                                                    <Image src={item.images[0]?.url || "/assets/default-product-image.jpg"} height={100} width={600} alt={item.name} className="rounded-xl transition-opacity duration-300 group-hover:opacity-0 ease-linear object-cover h-70" />
                                                    <Image src={item.images[1]?.url || item.images[0]?.url} height={100} width={600} alt="Hover" className="rounded-xl absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-linear object-cover h-70" />
                                                </div>
                                                <h3 className="text-black font-semibold mt-3 text-center">{item.name}</h3>
                                                <div className="text-center mt-1">
                                                    <span className="text-primary font-bold">Rs. {item.price}.00</span>
                                                    <span className="text-gray-400 line-through ms-2"> Rs. {item.oldPrice}.00</span>
                                                </div>
                                            </Link>

                                            <button onClick={() => setSelectedProduct(item)} className="mt-4 border text-primary font-bold hover:text-white border-gray-300 w-full py-2 rounded-full hover:bg-primary transition">
                                                Add to Cart
                                            </button>
                                        </motion.div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <div className="custom-pagination mt-4 text-center"></div>
                        </div>
                    </div>
                    <AnimatePresence>
                        {selectedProduct && (
                            <ProductModal
                                product={selectedProduct}
                                onClose={() => setSelectedProduct(null)}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </>
    )
}
