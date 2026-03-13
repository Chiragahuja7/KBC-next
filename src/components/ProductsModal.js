"use client";

import { useState, useEffect } from "react";
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
    <div
      className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose && onClose();
      }}
    >

      <div
        className="bg-white w-full max-w-5xl rounded-3xl grid grid-cols-1 md:grid-cols-2 relative mx-4 md:mx-0 overflow-hidden"
        onMouseDown={(e) => e.stopPropagation()}
      >

        <button onClick={onClose} className="absolute right-4 top-4 text-xl text-black">✕</button>
        <div>

          <Swiper
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="rounded-2xl w-full h-80 md:h-auto"
          >
            {gallery.map((img, i) => (
              <SwiperSlide key={i}>
                <Image src={img} width={500} height={500} alt="product" className="w-full h-80 md:h-125 rounded-2xl object-cover" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="p-4 md:pl-1 md:p-9 mt-4 md:mt-0">
          {product?.discount && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">{product.discount}</span>
          )}

          <h2 className="text-xl md:text-3xl mt-2 font-bold text-black">{product.name}</h2>

          <div className="mt-4">
            <span className="text-green-700 text-3xl font-bold">
              Rs. {displayPrice}.00
            </span>
            {displayOldPrice != null && (
              <span className="line-through text-gray-600 text-2xl ml-2">Rs. {displayOldPrice}.00</span>
            )}
          </div>

          {hasSizes && (
            <>
              <p className="text-gray-700 mt-4">Weight: <b>{typeof selectedSize === "object" ? selectedSize?.label : selectedSize}</b></p>
              <div className="flex gap-2 mt-6">
                {product.sizes.map((s, index) => {
                  const label = typeof s === "object" ? s.label : s;
                  const isActive = typeof selectedSize === "object" && typeof s === "object"
                    ? selectedSize?._id === s._id
                    : selectedSize === s;
                  return (
                    <button
                      key={s._id || index}
                      onClick={() => setSelectedSize(s)}
                      className={`border px-5 py-2.5 border-gray-300 text-sm text-black ${isActive ? "bg-black text-white" : ""}`}>
                      {label}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {hasColors && (
            <div className="mt-4">
              <span className="text-gray-700">Color: <b>{selectedColor}</b></span>
              <div className="flex gap-2 mt-2">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`border px-5 py-2.5 border-gray-300 text-sm text-black ${selectedColor === color ? "bg-black text-white" : ""}`}>
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 mt-5">

            <div className="flex items-center border border-gray-300 bg-gray-50 rounded-full px-6 py-3 text-black">
              <button onClick={decreaseQty}>−</button>
              <span className="mx-3">{qty}</span>
              <button onClick={increaseQty}>+</button>
            </div>

            <button onClick={handleAddToCart} className="bg-gray-800 text-white w-full py-4 rounded-full">
              Add to Cart
            </button>
          </div>

          <button onClick={handleBuyNow} className="bg-green-900 text-white w-full py-4 rounded-full mt-4">
            Buy it now
          </button>
          <div className="md:pt-15">
            <Link href={`/shop/${product.slug}`} className="p-3 text-sm font-bold cursor-pointer text-black">
              View Full Details »
            </Link>
          </div>
        </div>
      </div>
      {isCartOpen && (
        <CartModal cartItems={cartItems} onClose={() => setIsCartOpen(false)} />
      )}
      {showCheckout && (
        <CheckoutModal onClose={() => setShowCheckout(false)} />
      )}
    </div>
  );
}
