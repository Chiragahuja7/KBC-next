'use client';

import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import {FreeMode, Pagination } from 'swiper/modules';

export default function SecondSlider(){
    return(
    <>
<h1 className="text-black text-4xl text-center font-bold mt-7 pt-7">Shop By Concern</h1>
<div>
    <div className="p-4 md:block hidden">
      <div className="flex gap-3 p-8">
        <div className="overflow-hidden">
            <div className="flex flex-col">
                <Link href="/shop?category=Weight%20Management" className="min-w-full sm:min-w-[60%] md:min-w-0 overflow-hidden rounded-xl">
                <Image src="https://refineveda.com/cdn/shop/files/Untitled_design_16.png?v=1762240449&width=360" height={100} width={300} className="rounded-xl transition-transform duration-300 hover:scale-110 " alt="Home"/>
                </Link>
                <h4 className="text-black font-bold text-center mt-3">Weight Management</h4>
            </div>
        </div>
        <div className="overflow-hidden">
            <div className="flex flex-col">
                <Link href="/shop?category=Migraine%20Relief" className="min-w-full sm:min-w-[60%] md:min-w-0 overflow-hidden rounded-xl">
                <Image src="https://refineveda.com/cdn/shop/files/ChatGPT_Image_Nov_4_2025_12_35_58_PM.png?v=1762240109&width=360" height={100} width={300} className="rounded-xl transition-transform duration-300 hover:scale-110 " alt="Home"/>
                </Link>
                <h4 className="text-black font-bold text-center mt-3">Migraine Relief</h4>
            </div>
        </div>
        <div className="overflow-hidden">
            <div className="flex flex-col">
                <Link href="/shop?category=Digestive%20Health" className="min-w-full sm:min-w-[60%] md:min-w-0 overflow-hidden rounded-xl">
                <Image src="https://refineveda.com/cdn/shop/files/2.png?v=1762240335&width=360" 
                height={100} width={300} className="rounded-xl transition-transform duration-300 hover:scale-110 " alt="Home"/>
                </Link>
                <h4 className="text-black font-bold text-center mt-3">Digestive & Gut Health</h4>
            </div>
        </div>
        <div className="overflow-hidden">
            <div className="flex flex-col">
                <Link href="/shop?category=Vitality%20Booster" className="min-w-full sm:min-w-[60%] md:min-w-0 overflow-hidden rounded-xl">
                <Image src="https://refineveda.com/cdn/shop/files/4.png?v=1762240336&width=360" height={100} width={300} className="rounded-xl transition-transform duration-300 hover:scale-110 " alt="Home"/>
                </Link>
                <h4 className="text-black font-bold text-center mt-3">Men's & Women's Vitality</h4>
            </div>
        </div>
        <div className="overflow-hidden">
            <div className="flex flex-col">
                <Link href="/shop?category=Immunity%20%26%20Wellness" className="min-w-full sm:min-w-[60%] md:min-w-0 overflow-hidden rounded-xl">
                <Image src="https://refineveda.com/cdn/shop/files/3.png?v=1762240335&width=360" height={100} width={300} className="rounded-xl transition-transform duration-300 hover:scale-110 " alt="Home"/>
                </Link>
                <h4 className="text-black font-bold text-center mt-3">Immunity & Wellness</h4>
            </div>
        </div>
        <div className="overflow-hidden">
            <div className="flex flex-col">
                <Link href="/shop?category=Detox%20%26%20Cleanse" className="min-w-full sm:min-w-[60%] md:min-w-0 overflow-hidden rounded-xl">
                <Image src="https://refineveda.com/cdn/shop/files/5.png?v=1762240335&width=360" height={100} width={300} className="rounded-xl transition-transform duration-300 hover:scale-110 " alt="Home"/>
                </Link>
                <h4 className="text-black font-bold text-center mt-3">Detox & Cleanse</h4>
            </div>
        </div>
      </div>
    </div>
</div>
<div>
    <div className="p-4 md:hidden">
      <div className="gap-1">
        <Swiper pagination={{clickable: true, el:".custom-dots"}} freeMode={true} spaceBetween={10} slidesPerView={3} modules={[Pagination ,FreeMode]} className="mySwiper">
        <SwiperSlide>
        <div className="overflow-hidden">
            <div className="flex flex-col">
                <Link href="/shop?category=Weight%20Management" className=" overflow-hidden rounded-xl">
                <Image src="https://refineveda.com/cdn/shop/files/Untitled_design_16.png?v=1762240449&width=360" height={100} width={300} className="rounded-xl transition-transform duration-300 hover:scale-110 " alt="Home"/>
                </Link>
                <h4 className="text-black font-bold text-center mt-3">Weight Management</h4>
            </div>
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="overflow-hidden">
            <div className="flex flex-col">
                <Link href="/shop?category=Migraine%20Relief" className="min-w-full sm:min-w-[60%] md:min-w-0 overflow-hidden rounded-xl">
                <Image src="https://refineveda.com/cdn/shop/files/ChatGPT_Image_Nov_4_2025_12_35_58_PM.png?v=1762240109&width=360" height={100} width={300} className="rounded-xl transition-transform duration-300 hover:scale-110 " alt="Home"/>
                </Link>
                <h4 className="text-black font-bold text-center mt-3">Migraine Relief</h4>
            </div>
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="overflow-hidden">
            <div className="flex flex-col">
                <Link href="/shop?category=Digestive%20Health" className="min-w-full sm:min-w-[60%] md:min-w-0 overflow-hidden rounded-xl">
                <Image src="https://refineveda.com/cdn/shop/files/2.png?v=1762240335&width=360" 
                height={100} width={300} className="rounded-xl transition-transform duration-300 hover:scale-110 " alt="Home"/>
                </Link>
                <h4 className="text-black font-bold text-center mt-3">Digestive & Gut Health</h4>
            </div>
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="overflow-hidden">
            <div className="flex flex-col">
                <Link href="/shop?category=Vitality%20Booster" className="min-w-full sm:min-w-[60%] md:min-w-0 overflow-hidden rounded-xl">
                <Image src="https://refineveda.com/cdn/shop/files/4.png?v=1762240336&width=360" height={100} width={300} className="rounded-xl transition-transform duration-300 hover:scale-110 " alt="Home"/>
                </Link>
                <h4 className="text-black font-bold text-center mt-3">Men's & Women's Vitality</h4>
            </div>
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="overflow-hidden">
            <div className="flex flex-col">
                <Link href="/shop?category=Immunity%20%26%20Wellness" className="min-w-full sm:min-w-[60%] md:min-w-0 overflow-hidden rounded-xl">
                <Image src="https://refineveda.com/cdn/shop/files/3.png?v=1762240335&width=360" height={100} width={300} className="rounded-xl transition-transform duration-300 hover:scale-110 " alt="Home"/>
                </Link>
                <h4 className="text-black font-bold text-center mt-3">Immunity & Wellness</h4>
            </div>
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="overflow-hidden">
            <div className="flex flex-col">
                <Link href="/shop?category=Detox%20%26%20Cleanse" className="min-w-full sm:min-w-[60%] md:min-w-0 overflow-hidden rounded-xl">
                <Image src="https://refineveda.com/cdn/shop/files/5.png?v=1762240335&width=360" height={100} width={300} className="rounded-xl transition-transform duration-300 hover:scale-110 " alt="Home"/>
                </Link>
                <h4 className="text-black font-bold text-center mt-3">Detox & Cleanse</h4>
            </div>
        </div>
        </SwiperSlide>
        </Swiper>
        <div className="custom-dots mt-4 text-center"></div>
      </div>
    </div>
</div>
        </>
    )
}
