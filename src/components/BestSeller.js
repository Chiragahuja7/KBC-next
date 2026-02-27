'use client';
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { bestsellers } from "@/data/products";
import { useEffect, useState } from "react";
import ProductModal from "./ProductsModal";

export default function BestSeller(){
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products , setProducts]=useState([]);
    useEffect(()=>{
        const fetchProducts = async () => {
        const response = await fetch("/api/products/?sort=BestSeller&limit=3");
        const data = await response.json();
        if(!data.success){
            console.error("Failed to fetch bestsellers:", data.error);
        } else {
            setProducts(data.products);
        }
        }
        fetchProducts();
    },[])
    
    return(
        <>
        <div className="p-6">
        <div className="bg-gray-100 rounded-2xl p-4">
            <div className="p-4 flex justify-between items-center">
                <span className="text-black text-5xl font-bold">Best Sellers</span>
                <div className="flex gap-4">
                    <span className="text-green-700 font-semibold">Best Selling</span>
                    <Link className="text-gray-500" href="/shop">View All »</Link>
                </div>
            </div>

            <div className="p-4 md:block hidden w-auto">
            <div className="flex gap-3 p-3">

            {products.map((item)=>(
                <div key={item._id} className="min-w-full sm:min-w-[60%] md:min-w-0 bg-white rounded-2xl p-3">

                <Link href={`/shop/${item.slug}`} className="block overflow-hidden rounded-xl group relative">
                    {/* <span className="absolute top-3 left-3 bg-red-500 text-white text-sm px-3 py-1 rounded-full z-10">
                        {item.discount}
                    </span> */}
                    <Image src={item.images[0]?.url || "/assets/default-product-image.jpg"} height={80} width={600} alt={item.name} className="rounded-xl transition-opacity duration-300 group-hover:opacity-0 ease-linear object-cover h-100"/>
                    <Image src={item.images[1]?.url || item.images[0]?.url} height={80} width={600} alt="Hover" className="rounded-xl absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-linear object-cover h-100"/>
                </Link>
                <h3 className="text-black font-semibold mt-3 text-center">{item.name}</h3>
                <div className="text-center mt-1">
                    <span className="text-green-700 font-bold">Rs. {item.sizes[0]?.price}.00</span>
                    <span className="text-gray-400 line-through ms-2"> Rs. {item.sizes[0]?.oldPrice}.00</span>
                </div>

                <button onClick={() => setSelectedProduct(item)} className="mt-4 border text-[#0f5b3f] font-bold hover:text-white border-gray-300 w-full py-2 rounded-full hover:bg-[#0f5b3f] transition">
                    Add to Cart
                </button>
                </div>
            ))}
            </div>
            </div>

            <div className=" md:hidden w-auto">
            <div className="gap-3">
            <Swiper pagination={{clickable: true, el: ".custom-pagination"}} modules={[Pagination]} className="mySwiper pb-10">
            
            {products.map((item)=>(
                <SwiperSlide key={item.id}>
                <div className="min-w-full sm:min-w-[60%] md:min-w-0 bg-white rounded-2xl">
                
                <Link href="" className="block overflow-hidden rounded-xl group relative">
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-sm px-3 py-1 rounded-full z-10">
                        {item.discount}
                    </span>
                    <Image src={item.images[0]?.url || "/assets/default-product-image.jpg"} height={100} width={600} alt={item.name} className="rounded-xl transition-opacity duration-300 group-hover:opacity-0 ease-linear object-cover h-70"/>
                    <Image src={item.images[1]?.url || item.images[0]?.url} height={100} width={600} alt="Hover" className="rounded-xl absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-linear object-cover h-70"/>
                </Link>
                <h3 className="text-black font-semibold mt-3 text-center">{item.name}</h3>
                <div className="text-center mt-1">
                    <span className="text-green-700 font-bold">Rs. {item.sizes[0]?.price}.00</span>
                    <span className="text-gray-400 line-through ms-2"> Rs. {item.sizes[0]?.oldPrice}.00</span>
                </div>

                <button className="mt-4 border text-[#0f5b3f] font-bold hover:text-white border-gray-300 w-full py-2 rounded-full hover:bg-[#0f5b3f] transition">
                    Add to Cart
                </button>
                </div>
                </SwiperSlide>
            ))}
            </Swiper>
            <div className="custom-pagination mt-4 text-center"></div>
            </div>
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
