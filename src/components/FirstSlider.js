'use client';

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

export default function FirstSlider(){
    return(
        <>
    <div className="p-4 md:block hidden w-auto">
      <div className="flex gap-3 p-3 md:overflow-visible">
      <Link href="/shop/shilajit" className="min-w-full sm:min-w-[60%] md:min-w-0 overflow-hidden rounded-xl">
        <Image src="https://refineveda.com/cdn/shop/files/ChatGPT_Image_Jan_9_2026_08_00_06_PM.png?v=1767969032&width=480%20480w,%20//refineveda.com/cdn/shop/files/ChatGPT_Image_Jan_9_2026_08_00_06_PM.png?v=1767969032&width=360%20360w" height={100} width={600} className="rounded-xl transition-transform duration-300 hover:scale-110 " alt="Home"/>
      </Link>
      <Link href="/shop/jeevan-amrit-complete-health-trio" className="min-w-full sm:min-w-[60%] md:min-w-0 overflow-hidden rounded-xl">
        <Image src="https://refineveda.com/cdn/shop/files/ChatGPT_Image_Jan_9_2026_07_55_04_PM.png?v=1767968722&width=480%20480w,%20//refineveda.com/cdn/shop/files/ChatGPT_Image_Jan_9_2026_07_55_04_PM.png?v=1767968722&width=360%20360w" height={100} width={600} className="rounded-xl transition-transform duration-300 hover:scale-110" alt="Home"/>
      </Link>
      <Link href="/shop/migraine-kit" className="min-w-full sm:min-w-[60%] md:min-w-0 overflow-hidden rounded-xl">
        <Image src="https://refineveda.com/cdn/shop/files/ChatGPT_Image_Jan_9_2026_08_01_35_PM.png?v=1767969110&width=480%20480w,%20//refineveda.com/cdn/shop/files/ChatGPT_Image_Jan_9_2026_08_01_35_PM.png?v=1767969110&width=360%20360w" height={100} width={600} className="rounded-xl transition-transform duration-300 hover:scale-110" alt="Home"/>
      </Link>
      </div>
    </div>

    <div className="p-4 md:hidden">
        <div className=" md:p-6">
      <div className=" gap-3 md:overflow-visible">
        <Swiper pagination={{clickable: true,el:".custom-dot"}} modules={[Pagination]} className="mySwiper ">
    <SwiperSlide>
      <Link href="/shop/shilajit" className="min-w-full sm:min-w-[60%] md:min-w-0 overflow-hidden rounded-xl">
        <Image src="https://refineveda.com/cdn/shop/files/ChatGPT_Image_Jan_9_2026_08_00_06_PM.png?v=1767969032&width=480%20480w,%20//refineveda.com/cdn/shop/files/ChatGPT_Image_Jan_9_2026_08_00_06_PM.png?v=1767969032&width=360%20360w" height={100} width={500} className="rounded-xl transition-transform duration-300 hover:scale-110 " alt="Home"/>
      </Link>
      </SwiperSlide>
      <SwiperSlide>
      <Link href="/shop/jeevan-amrit-complete-health-trio" className="min-w-full sm:min-w-[60%] md:min-w-0 overflow-hidden rounded-xl">
        <Image src="https://refineveda.com/cdn/shop/files/ChatGPT_Image_Jan_9_2026_07_55_04_PM.png?v=1767968722&width=480%20480w,%20//refineveda.com/cdn/shop/files/ChatGPT_Image_Jan_9_2026_07_55_04_PM.png?v=1767968722&width=360%20360w" height={100} width={500} className="rounded-xl transition-transform duration-300 hover:scale-110" alt="Home"/>
      </Link>
    </SwiperSlide>
      <SwiperSlide>
      <Link href="/shop/migraine-kit" className="min-w-full sm:min-w-[60%] md:min-w-0 overflow-hidden rounded-xl">
        <Image src="https://refineveda.com/cdn/shop/files/ChatGPT_Image_Jan_9_2026_08_01_35_PM.png?v=1767969110&width=480%20480w,%20//refineveda.com/cdn/shop/files/ChatGPT_Image_Jan_9_2026_08_01_35_PM.png?v=1767969110&width=360%20360w" height={100} width={500} className="rounded-xl transition-transform duration-300 hover:scale-110" alt="Home"/>
      </Link>
      </SwiperSlide>
    </Swiper>
    <div className="custom-dot mt-4 text-center"></div>
      </div>
    </div>
    
    </div>
        </>
    
    )
}