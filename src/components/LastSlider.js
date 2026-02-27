'use client';

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

export default function LastSlider(){
    return(
        <>
    <div className="p-9 md:block hidden">
      <div className="flex gap-3 p-8 m-8 rounded-full">
      <div className="text-center flex-col justify-center">
        <div className="flex justify-center">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="59" height="59" rx="29.5" fill="white"></rect>
        <rect x="0.5" y="0.5" width="59" height="59" rx="29.5" stroke="#EBEBEB"></rect>
        <path d="M35.4136 31.3433V27.3784L25.1328 21.4417" stroke="#111111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M20.4336 25.0601L29.9994 30.5959L39.5002 25.0925" stroke="#111111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M30 40.4108V30.585" stroke="#111111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M27.7582 19.6867L21.9732 22.9043C20.6623 23.6301 19.5898 25.4501 19.5898 26.9451V33.066C19.5898 34.561 20.6623 36.3809 21.9732 37.1068L27.7582 40.3243C28.9932 41.0068 31.019 41.0068 32.254 40.3243L38.039 37.1068C39.3498 36.3809 40.4223 34.561 40.4223 33.066V26.9451C40.4223 25.4501 39.3498 23.6301 38.039 22.9043L32.254 19.6867C31.0081 18.9934 28.9932 18.9934 27.7582 19.6867Z" stroke="#111111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
        </div>
        <span className="font-bold text-black">Free Shipping</span>
        <p className="text-black">
            Enjoy free shipping all over India on orders above 499.
        </p>
      </div>
      <div className="text-center flex-col justify-center">
        <div className="flex justify-center">
       <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="59" height="59" rx="29.5" fill="white"></rect>
        <rect x="0.5" y="0.5" width="59" height="59" rx="29.5" stroke="#EBEBEB"></rect>
        <path d="M26.0781 30.0001L28.689 32.6218L33.9215 27.3784" stroke="#111111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M28.6456 19.6542C29.3931 19.015 30.6173 19.015 31.3756 19.6542L33.0873 21.1275C33.4123 21.4092 34.019 21.6367 34.4523 21.6367H36.294C37.4423 21.6367 38.3848 22.5792 38.3848 23.7275V25.5692C38.3848 25.9917 38.6123 26.6092 38.894 26.9342L40.3673 28.6458C41.0065 29.3933 41.0065 30.6175 40.3673 31.3758L38.894 33.0875C38.6123 33.4125 38.3848 34.0192 38.3848 34.4525V36.2942C38.3848 37.4425 37.4423 38.385 36.294 38.385H34.4523C34.0298 38.385 33.4123 38.6125 33.0873 38.8942L31.3756 40.3675C30.6281 41.0067 29.404 41.0067 28.6456 40.3675L26.934 38.8942C26.609 38.6125 26.0023 38.385 25.569 38.385H23.6948C22.5465 38.385 21.604 37.4425 21.604 36.2942V34.4417C21.604 34.0192 21.3765 33.4125 21.1056 33.0875L19.6431 31.365C19.0148 30.6175 19.0148 29.4042 19.6431 28.6567L21.1056 26.9342C21.3765 26.6092 21.604 26.0025 21.604 25.58V23.7167C21.604 22.5683 22.5465 21.6258 23.6948 21.6258H25.569C25.9915 21.6258 26.609 21.3983 26.934 21.1167L28.6456 19.6542Z" stroke="#111111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
        </div>
        <span className="font-bold text-black">Free Returns</span>
        <p className="text-black">Free returns within 15 days, only for incorrect or damaged products.</p>
      </div>
      <div className="text-center flex-col justify-center">
        <div className="flex justify-center">
       <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="59" height="59" rx="29.5" fill="white"></rect>
        <rect x="0.5" y="0.5" width="59" height="59" rx="29.5" stroke="#EBEBEB"></rect>
        <path d="M36.4796 28.6892V33.0225C36.4796 33.3042 36.4688 33.575 36.4363 33.835C36.1871 36.76 34.4646 38.2117 31.2905 38.2117H30.8571C30.5863 38.2117 30.3263 38.3417 30.1638 38.5583L28.8638 40.2917C28.2896 41.0608 27.358 41.0608 26.7838 40.2917L25.4838 38.5583C25.343 38.3742 25.0288 38.2117 24.7905 38.2117H24.3571C20.9013 38.2117 19.168 37.3558 19.168 33.0225V28.6892C19.168 25.515 20.6305 23.7925 23.5446 23.5433C23.8046 23.5108 24.0755 23.5 24.3571 23.5H31.2905C34.7463 23.5 36.4796 25.2333 36.4796 28.6892Z" stroke="#111111" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M40.8113 24.3559V28.6893C40.8113 31.8743 39.3488 33.5859 36.4346 33.8351C36.4671 33.5751 36.478 33.3043 36.478 33.0226V28.6893C36.478 25.2334 34.7446 23.5001 31.2888 23.5001H24.3555C24.0738 23.5001 23.803 23.5109 23.543 23.5434C23.7921 20.6293 25.5146 19.1667 28.6888 19.1667H35.6221C39.078 19.1667 40.8113 20.9001 40.8113 24.3559Z" stroke="#111111" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M31.6188 31.3542H31.6286" stroke="#111111" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M27.8298 31.3542H27.8395" stroke="#111111" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M24.0368 31.3542H24.0465" stroke="#111111" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
        </div>
        <span className="font-bold text-black">Support Online</span>
        <p className="text-black">
            We support customers 24/7,send questions we will solve for you.
        </p>
      </div>
      </div>
    </div>

    <div className="p-4 md:hidden">
        <div className=" md:p-6">
      <div className=" gap-3 md:overflow-visible">
        <div className="flex gap-3 m-8 rounded-full">
        <Swiper pagination={{clickable: true,el:".last-dot"}} modules={[Pagination]} className="mySwiper">
        <SwiperSlide> 
      <div className="text-center flex-col justify-center">
        <div className="flex justify-center">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="59" height="59" rx="29.5" fill="white"></rect>
        <rect x="0.5" y="0.5" width="59" height="59" rx="29.5" stroke="#EBEBEB"></rect>
        <path d="M35.4136 31.3433V27.3784L25.1328 21.4417" stroke="#111111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M20.4336 25.0601L29.9994 30.5959L39.5002 25.0925" stroke="#111111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M30 40.4108V30.585" stroke="#111111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M27.7582 19.6867L21.9732 22.9043C20.6623 23.6301 19.5898 25.4501 19.5898 26.9451V33.066C19.5898 34.561 20.6623 36.3809 21.9732 37.1068L27.7582 40.3243C28.9932 41.0068 31.019 41.0068 32.254 40.3243L38.039 37.1068C39.3498 36.3809 40.4223 34.561 40.4223 33.066V26.9451C40.4223 25.4501 39.3498 23.6301 38.039 22.9043L32.254 19.6867C31.0081 18.9934 28.9932 18.9934 27.7582 19.6867Z" stroke="#111111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
        </div>
        <span className="font-bold text-black">Free Shipping</span>
        <p className="text-black">
            Enjoy free shipping all over India on orders above 499.
        </p>
      </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="text-center flex-col justify-center">
        <div className="flex justify-center">
       <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="59" height="59" rx="29.5" fill="white"></rect>
        <rect x="0.5" y="0.5" width="59" height="59" rx="29.5" stroke="#EBEBEB"></rect>
        <path d="M26.0781 30.0001L28.689 32.6218L33.9215 27.3784" stroke="#111111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M28.6456 19.6542C29.3931 19.015 30.6173 19.015 31.3756 19.6542L33.0873 21.1275C33.4123 21.4092 34.019 21.6367 34.4523 21.6367H36.294C37.4423 21.6367 38.3848 22.5792 38.3848 23.7275V25.5692C38.3848 25.9917 38.6123 26.6092 38.894 26.9342L40.3673 28.6458C41.0065 29.3933 41.0065 30.6175 40.3673 31.3758L38.894 33.0875C38.6123 33.4125 38.3848 34.0192 38.3848 34.4525V36.2942C38.3848 37.4425 37.4423 38.385 36.294 38.385H34.4523C34.0298 38.385 33.4123 38.6125 33.0873 38.8942L31.3756 40.3675C30.6281 41.0067 29.404 41.0067 28.6456 40.3675L26.934 38.8942C26.609 38.6125 26.0023 38.385 25.569 38.385H23.6948C22.5465 38.385 21.604 37.4425 21.604 36.2942V34.4417C21.604 34.0192 21.3765 33.4125 21.1056 33.0875L19.6431 31.365C19.0148 30.6175 19.0148 29.4042 19.6431 28.6567L21.1056 26.9342C21.3765 26.6092 21.604 26.0025 21.604 25.58V23.7167C21.604 22.5683 22.5465 21.6258 23.6948 21.6258H25.569C25.9915 21.6258 26.609 21.3983 26.934 21.1167L28.6456 19.6542Z" stroke="#111111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
        </div>
        <span className="font-bold text-black">Free Returns</span>
        <p className="text-black">Free returns within 15 days, only for incorrect or damaged products.</p>
      </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="text-center flex-col justify-center">
        <div className="flex justify-center">
       <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="59" height="59" rx="29.5" fill="white"></rect>
        <rect x="0.5" y="0.5" width="59" height="59" rx="29.5" stroke="#EBEBEB"></rect>
        <path d="M36.4796 28.6892V33.0225C36.4796 33.3042 36.4688 33.575 36.4363 33.835C36.1871 36.76 34.4646 38.2117 31.2905 38.2117H30.8571C30.5863 38.2117 30.3263 38.3417 30.1638 38.5583L28.8638 40.2917C28.2896 41.0608 27.358 41.0608 26.7838 40.2917L25.4838 38.5583C25.343 38.3742 25.0288 38.2117 24.7905 38.2117H24.3571C20.9013 38.2117 19.168 37.3558 19.168 33.0225V28.6892C19.168 25.515 20.6305 23.7925 23.5446 23.5433C23.8046 23.5108 24.0755 23.5 24.3571 23.5H31.2905C34.7463 23.5 36.4796 25.2333 36.4796 28.6892Z" stroke="#111111" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M40.8113 24.3559V28.6893C40.8113 31.8743 39.3488 33.5859 36.4346 33.8351C36.4671 33.5751 36.478 33.3043 36.478 33.0226V28.6893C36.478 25.2334 34.7446 23.5001 31.2888 23.5001H24.3555C24.0738 23.5001 23.803 23.5109 23.543 23.5434C23.7921 20.6293 25.5146 19.1667 28.6888 19.1667H35.6221C39.078 19.1667 40.8113 20.9001 40.8113 24.3559Z" stroke="#111111" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M31.6188 31.3542H31.6286" stroke="#111111" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M27.8298 31.3542H27.8395" stroke="#111111" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M24.0368 31.3542H24.0465" stroke="#111111" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
        </div>
        <span className="font-bold text-black">Support Online</span>
        <p className="text-black">
            We support customers 24/7,send questions we will solve for you.
        </p>
      </div>
      </SwiperSlide>
      
    </Swiper>
    </div>
    <div className="last-dot mt-4 text-center"></div>
      </div>
    </div>
    
    </div>
        </>
    
    )
}