"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import { useCart } from "@/src/Context/CartContext";
import CartModal from "@/src/components/CartModal";
import CheckoutModal from "@/src/components/CheckoutModal";

import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";

export default function ProductModal({ product, onClose }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [qty, setQty] = useState(1);
  const { addToCart, cartItems, directBuy } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose && onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    if (!product) return;
    if (Array.isArray(product.sizes) && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
    if (Array.isArray(product.colors) && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  function imgUrl(item) {
    if (!item) return null;
    if (typeof item === "string") return item;
    return item.url || item.secure_url || null;
  }

  const hasSizes = Array.isArray(product?.sizes) && product.sizes.length > 0;
  const hasColors = Array.isArray(product?.colors) && product.colors.length > 0;

  // Determine current display price based on selected size
  const displayPrice = selectedSize && typeof selectedSize === "object" && selectedSize.price
    ? selectedSize.price
    : product?.price;

  const displayOldPrice = selectedSize && typeof selectedSize === "object" && selectedSize.oldPrice
    ? selectedSize.oldPrice
    : product?.oldPrice;

  // Gallery: use size image if available, otherwise global product images
  const gallery = (() => {
    // If a size is selected and has its own image, show that first
    const imgs = [];
    if (selectedSize && typeof selectedSize === "object" && selectedSize.image?.url) {
      imgs.push(selectedSize.image.url);
    }
    if (Array.isArray(product?.images)) {
      product.images.forEach((img) => {
        const url = imgUrl(img);
        if (url && !imgs.includes(url)) imgs.push(url);
      });
    }
    return imgs;
  })();

  function increaseQty() {
    setQty((prev) => prev + 1);
  }

  function decreaseQty() {
    if (qty === 1) return;
    setQty((prev) => prev - 1);
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  function handleAddToCart() {
    addToCart(product, selectedSize, qty, selectedColor);
    setIsCartOpen(true);
  }

  function handleBuyNow() {
    directBuy(product, selectedSize, qty, selectedColor);
    setShowCheckout(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center backdrop-blur-sm px-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose && onClose();
      }}
    >

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white w-full max-w-5xl rounded-3xl grid grid-cols-1 md:grid-cols-2 relative overflow-y-auto md:overflow-hidden max-h-[90vh] md:max-h-none shadow-2xl"
        onMouseDown={(e) => e.stopPropagation()}
      >

        {/* Improved Close Button for Mobile and Desktop */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-md text-xl text-black md:bg-transparent md:shadow-none hover:bg-gray-100 transition"
        >
          ✕
        </button>

        <div className="w-full aspect-square md:aspect-auto">
          <Swiper
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="w-full h-full"
          >
            {gallery.map((img, i) => (
              <SwiperSlide key={i}>
                <div className="relative w-full h-80 md:h-[600px] flex items-center justify-center bg-gray-50">
                  <Image
                    src={img}
                    fill
                    alt="product"
                    className="object-contain md:object-cover"
                    priority={i === 0}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="p-6 md:p-10 flex flex-col justify-center">
          {product?.discount && (
            <div className="mb-2">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{product.discount}</span>
            </div>
          )}

          <h2 className="text-2xl md:text-3xl font-bold text-black leading-tight">{product.name}</h2>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-primary text-3xl font-extrabold text-[#212e58ff]">
              Rs. {displayPrice}.00
            </span>
            {displayOldPrice != null && (
              <span className="line-through text-gray-400 text-xl font-medium">Rs. {displayOldPrice}.00</span>
            )}
          </div>

          <div className="border-t border-gray-100 my-6"></div>

          {hasSizes && (
            <div className="mb-6">
              <p className="text-sm font-bold text-gray-900 mb-3">SELECT WEIGHT</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s, index) => {
                  const label = typeof s === "object" ? s.label : s;
                  const isActive = typeof selectedSize === "object" && typeof s === "object"
                    ? selectedSize?._id === s._id
                    : selectedSize === s;
                  return (
                    <button
                      key={s._id || index}
                      onClick={() => setSelectedSize(s)}
                      className={`border px-4 py-2 text-sm font-medium transition-all ${isActive ? "bg-black text-white border-black" : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"}`}>
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {hasColors && (
            <div className="mb-6">
              <p className="text-sm font-bold text-gray-900 mb-3">COLOR: <span className="text-gray-500 font-normal">{selectedColor}</span></p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`border px-4 py-2 text-sm font-medium transition-all ${selectedColor === color ? "bg-black text-white border-black" : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"}`}>
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-auto">
            <div className="flex items-center border border-gray-200 bg-gray-50 rounded-full h-14 px-6 text-black font-bold">
              <button onClick={decreaseQty} className="w-6 text-xl">−</button>
              <span className="flex-1 text-center min-w-[40px]">{qty}</span>
              <button onClick={increaseQty} className="w-6 text-xl">+</button>
            </div>

            <button
              onClick={handleAddToCart}
              className="bg-black text-white w-full h-14 rounded-full font-bold hover:bg-gray-800 transition shadow-lg shadow-black/10"
            >
              Add to Cart
            </button>
          </div>

          <button
            onClick={handleBuyNow}
            className="w-full h-14 rounded-full mt-3 font-bold transition-all shadow-lg shadow-primary/20"
            style={{ backgroundColor: 'var(--primary)', color: 'white' }}
          >
            Buy it now
          </button>

          <div className="mt-6 text-center">
            <Link href={`/shop/${product.slug}`} className="text-sm font-bold text-black hover:underline inline-flex items-center gap-1">
              View Full Details <i className="fa-solid fa-arrow-right text-[10px]"></i>
            </Link>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {isCartOpen && (
          <CartModal cartItems={cartItems} onClose={() => setIsCartOpen(false)} />
        )}
        {showCheckout && (
          <CheckoutModal onClose={() => setShowCheckout(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
