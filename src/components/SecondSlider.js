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
<h1 className="text-black text-4xl text-center font-bold mt-7 pt-7">Categories</h1>
<div>
    <div className="p-4 md:block hidden">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 p-8">
        {[
          { name: "Jhula", img: "jhula.webp" },
          { name: "Dress", img: "dress.webp" },
          { name: "Jewellery", img: "jewellwey.webp" }, // Keeping original typo in filename
          { name: "Mukut", img: "mukut.webp" },
          { name: "Necklace", img: "necklace.webp" },
          { name: "Toys", img: "toys.webp" }
        ].map((cat, index) => (
          <div key={index} className="overflow-hidden">
              <div className="flex flex-col items-center">
                  <Link href={`/shop?category=${encodeURIComponent(cat.name)}`} className="w-full overflow-hidden rounded-xl">
                    <Image 
                      src={`/assets/categories/${cat.img}`} 
                      height={300} 
                      width={300} 
                      className="rounded-xl transition-transform duration-300 hover:scale-110 aspect-square object-cover w-full" 
                      alt={cat.name}
                    />
                  </Link>
                  <h4 className="text-black font-bold text-center mt-3">{cat.name}</h4>
              </div>
          </div>
        ))}
      </div>
    </div>
</div>
<div>
    <div className="p-4 md:hidden">
      <div className="gap-1">
        <Swiper pagination={{clickable: true, el:".custom-dots"}} freeMode={true} spaceBetween={10} slidesPerView={3} modules={[Pagination ,FreeMode]} className="mySwiper">
        {[
          { name: "Jhula", img: "jhula.webp" },
          { name: "Dress", img: "dress.webp" },
          { name: "Jewellery", img: "jewellwey.webp" },
          { name: "Mukut", img: "mukut.webp" },
          { name: "Necklace", img: "necklace.webp" },
          { name: "Toys", img: "toys.webp" }
        ].map((cat, index) => (
          <SwiperSlide key={index}>
            <div className="overflow-hidden">
                <div className="flex flex-col items-center">
                    <Link href={`/shop?category=${encodeURIComponent(cat.name)}`} className="w-full overflow-hidden rounded-xl">
                      <Image 
                        src={`/assets/categories/${cat.img}`} 
                        height={150} 
                        width={150} 
                        className="rounded-xl transition-transform duration-300 hover:scale-110 aspect-square object-cover w-full" 
                        alt={cat.name}
                      />
                    </Link>
                    <h4 className="text-black font-bold text-center mt-3 text-sm">{cat.name}</h4>
                </div>
            </div>
          </SwiperSlide>
        ))}
        </Swiper>
        <div className="custom-dots mt-4 text-center"></div>
      </div>
    </div>
</div>
        </>
    )
}
