'use client';

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from 'react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

export default function FirstSlider() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch("/api/banners");
        const data = await res.json();
        if (data.success) {
          setBanners(data.banners);
        }
      } catch (err) {
        console.error("Failed to fetch banners:", err);
      }
    };
    fetchBanners();
  }, []);

  if (banners.length === 0) return null;

  return (
    <>
      <div className="p-4 md:block hidden w-auto">
        <div className="flex gap-3 p-3 md:overflow-visible">
          {banners.map((b) => (
            <Link key={b._id} href={b.link || "/shop"} className="min-w-full sm:min-w-[60%] md:min-w-0 overflow-hidden rounded-xl flex-1">
              <img src={b.image?.url} height={100} width={600} className="rounded-xl transition-transform duration-300 hover:scale-110 w-full h-auto object-cover" alt="Banner" />
            </Link>
          ))}
        </div>
      </div>

      <div className="p-4 md:hidden">
        <div className=" md:p-6">
          <div className=" gap-3 md:overflow-visible">
            <Swiper pagination={{ clickable: true, el: ".custom-dot" }} modules={[Pagination]} className="mySwiper ">
              {banners.map((b) => (
                <SwiperSlide key={b._id}>
                  <Link href={b.link || "/shop"} className="min-w-full sm:min-w-[60%] md:min-w-0 overflow-hidden rounded-xl">
                    <img src={b.image?.url} height={100} width={500} className="rounded-xl transition-transform duration-300 hover:scale-110 w-full h-auto object-cover" alt="Banner" />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="custom-dot mt-4 text-center"></div>
          </div>
        </div>

      </div>
    </>

  )
}