'use client';
import { testimonials } from "@/data/products"
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import {FreeMode, Pagination } from 'swiper/modules';
import Link from "next/link"
import Image from "next/image";

export default function Testimonials(){
    return(
        <>
        <div className="items-center text-center p-4">
            <span className="font-bold text-4xl items-center text-black">Customer Testimonials</span>
        </div>

        <div className="md:block hidden">
            <div className="flex p-6 ms-9 me-9">
            <Swiper pagination={{clickable: true, el:".testimonials-dots"}} spaceBetween={30} slidesPerView={2} modules={[Pagination ,FreeMode]} className="mySwiper">
                
                {testimonials.map((item)=>(
                    <SwiperSlide>
                    <div key={item.id} className="text-black ms-9 me-9 ps-9 pe-9">
                    <span className="flex justify-center">⭐⭐⭐⭐⭐</span>
                    <span className="flex justify-center font-bold">{item.name} - {item.location} <span className="font-medium ms-3">✔️ Verified buyer</span></span>
                    <p className="text-center text-2xl">{item.review}</p>
                    <div className="flex justify-center">
                    <Link href="">
                    <Image className="rounded-full" src={item.itemImage} height={10} width={60} alt={item.itemName}/>
                    </Link>
                    </div>
                    <span className="flex justify-center font-bold">{item.itemName}</span>
                    <div className="text-center mt-1">
                    <span className="text-green-700 font-bold">Rs.{item.price}.00</span>
                    <span className="text-gray-400 line-through ms-2"> Rs. {item.oldPrice}.00</span>
                    </div>
                    </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            
            </div>
            <div className="testimonials-dots mt-4 text-center"></div>
        </div>

        <div className="md:hidden">
            <div className="flex p-6">
            <Swiper pagination={{clickable: true, el:".testimonial-dots"}} spaceBetween={30} slidesPerView={1} modules={[Pagination ,FreeMode]} className="mySwiper">
                
                {testimonials.map((item)=>(
                    <SwiperSlide>
                    <div key={item.id} className="text-black">
                    <span className="flex justify-center">⭐⭐⭐⭐⭐</span>
                    <span className="flex justify-center font-bold">{item.name} - {item.location} <span className="font-medium ms-3">✔️ Verified buyer</span></span>
                    <p className="text-center text-2xl">{item.review}</p>
                    <div className="flex justify-center">
                    <Link href="">
                    <Image className="rounded-full" src={item.itemImage} height={10} width={60} alt={item.itemName}/>
                    </Link>
                    </div>
                    <span className="flex justify-center font-bold">{item.itemName}</span>
                    <div className="text-center mt-1">
                    <span className="text-green-700 font-bold">Rs.{item.price}.00</span>
                    <span className="text-gray-400 line-through ms-2"> Rs. {item.oldPrice}.00</span>
                    </div>
                    </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            
            </div>
            <div className="testimonial-dots mt-4 text-center"></div>
        </div>
        </>
    )
}