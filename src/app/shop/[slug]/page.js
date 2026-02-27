'use client'
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Marquee from "react-fast-marquee";
import { products } from "@/data/products"
import Link from "next/link";
import Image from "next/image";
import ProductModal from "@/src/components/ProductsModal";
import { useCart } from "@/src/Context/CartContext";
import CartModal from "@/src/components/CartModal";
import CheckoutModal from "@/src/components/CheckoutModal";

export default function Page() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [displayImage, setDisplayImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const { addToCart, cartItems, directBuy } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);


  useEffect(() => {
    if (!slug) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/${slug}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        const data = await res.json();
        setProduct(data.product);

        if (data.product.sizes?.length > 0) {
          setSelectedSize(data.product.sizes[0]);
        }

        const firstImg = data.product?.images && data.product.images[0] ? data.product.images[0].url : null;
        setDisplayImage(firstImg);

      } catch (err) {
        setError(err.message || 'Error fetching product');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  // Gallery always uses global product images only
  const uniqueGallery = useMemo(() => {
    if (!product) return [];

    const normalize = (item) => {
      if (!item) return null;
      if (typeof item === "string") return item;
      return item.url || item.secure_url || null;
    };

    const globals = (product.images || [])
      .map(normalize)
      .filter(Boolean);

    return Array.from(new Set(globals));
  }, [product]);

  useEffect(() => {
    if (uniqueGallery.length > 0) {
      setCurrentIndex(0);
      setDisplayImage(uniqueGallery[0]);
    }
  }, [product]);

  if (loading) return <div className="p-9 m-9 text-2xl text-black">Loading...</div>;
  if (error) return <div className="p-9 m-9 text-red-600">Error: {error}</div>;
  if (!product) return <div className="p-9 m-9">Product not found</div>;

  function increaseQty() {
    setQuantity(prev => prev + 1);
  }

  function decreaseQty() {
    setQuantity(prev => Math.max(1, prev - 1));
  }

  function prevImage() {
    if (uniqueGallery.length === 0) return;
    const next = (currentIndex - 1 + uniqueGallery.length) % uniqueGallery.length;
    setCurrentIndex(next);
    setDisplayImage(uniqueGallery[next]);
  }

  function nextImage() {
    if (uniqueGallery.length === 0) return;
    const next = (currentIndex + 1) % uniqueGallery.length;
    setCurrentIndex(next);
    setDisplayImage(uniqueGallery[next]);
  }

  function closeLightbox() {
    setIsLightboxOpen(false);
    document.body.style.overflow = '';
  }

  function handleShare() {
    const shareData = {
      title: product?.name,
      text: `Check out this product: ${product?.name}`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData).catch((err) => {
        console.error("Error sharing:", err);
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  }


  return (
    <div>
      <div>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 max-w-7xl mx-auto px-4 py-10">
          <div className="flex justify-center mt-6">
            <div className="me-2 mt-1 flex-col gap-3 hidden md:flex">
              {uniqueGallery.map((img, index) => (
                <button
                  key={index}
                  onClick={() => { setCurrentIndex(index); setDisplayImage(img); }}
                  className={`w-15 h-15 rounded border ${displayImage === img ? 'border-black' : 'border-gray-200'}`}>
                  <img src={img} alt={`thumb-${index}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div className="w-full max-w-md lg:max-w-lg aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center relative">
              {displayImage ? (
                <>
                  <img
                    src={displayImage}
                    alt={product.name}
                    className="w-full max-w-md lg:max-w-lg rounded-lg object-cover cursor-zoom-in"
                    onClick={() => { setIsLightboxOpen(true); document.body.style.overflow = 'hidden'; }}
                  />
                  <button
                    aria-label="previous image"
                    onClick={() => {
                      if (uniqueGallery.length === 0) return;
                      const next = (currentIndex - 1 + uniqueGallery.length) % uniqueGallery.length;
                      setCurrentIndex(next);
                      setDisplayImage(uniqueGallery[next]);
                    }}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full p-4 shadow-md"
                  >
                    ‹
                  </button>
                  <button
                    aria-label="next image"
                    onClick={() => {
                      if (uniqueGallery.length === 0) return;
                      const next = (currentIndex + 1) % uniqueGallery.length;
                      setCurrentIndex(next);
                      setDisplayImage(uniqueGallery[next]);
                    }}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full p-4 shadow-md">
                    ›
                  </button>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">No image</div>
              )}
            </div>


          </div>
          <div className="text-black font-bold md:overflow-auto overflow-visible h-auto md:h-130 no-scrollbar">
            <span className="text-gray-700">Refineveda</span>
            <h1 className="text-3xl">{product.name}</h1>
            <div className="flex">
              <p className="text-green-700 text-2xl mt-3">
                Rs. {product.price}.00
              </p>
              {product.oldPrice != null && (
                <p className="ms-3 text-xl line-through text-gray-400 mt-3.5">
                  Rs. {product.oldPrice}.00
                </p>
              )}
            </div>

            {Array.isArray(product.sizes) && product.sizes.length > 0 && (
              <div className="mt-4">
                <span className="block mb-2 font-medium">Size:</span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size, index) => (
                    <label key={index} className="ms-2 cursor-pointer">
                      <input
                        type="radio"
                        name="size"
                        className="hidden"
                        checked={selectedSize === size}
                        onChange={() => setSelectedSize(size)}
                      />

                      <span className={`block text-center min-w-12 px-4 py-2 border rounded-lg text-sm sm:text-base transition-colors duration-200
                  ${selectedSize === size ? "bg-black text-white border-black" : "bg-white text-black border-gray-300 hover:border-black"}`}>
                        {size}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-5">
              <div className="flex items-center justify-between border rounded-full px-6 py-3 text-black w-full sm:w-auto">
                <button onClick={decreaseQty} className="px-2">−</button>
                <span className="mx-3 px-1">{quantity}</span>
                <button onClick={increaseQty} className="px-2">+</button>
              </div>

              <button className="bg-gray-800 text-white w-full sm:w-auto md:px-44 px-5 py-3 rounded-full" onClick={() => {
                addToCart(product, selectedSize, quantity);
                setIsCartOpen(true);
              }}
              >Add to Cart</button>
            </div>
            <button className="bg-green-900 mt-2 text-white w-full px-10 py-4 rounded-full"
              onClick={() => {
                directBuy(product, selectedSize, quantity);
                setShowCheckout(true);
              }}
            >Buy It Now</button>

            <div className="border border-gray-300 md:h-48 mt-6 p-4 rounded-lg">
              <div className="flex gap-2 ms-3 mt-3 font-extralight border-b border-gray-300 pb-3">
                <svg width="25" height="25" fill="none">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14.501h1c1.1 0 2-.9 2-2v-10H6c-1.5 0-2.81.83-3.49 2.05"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2 17.501c0 1.66 1.34 3 3 3h1c0-1.1.9-2 2-2s2 .9 2 2h4c0-1.1.9-2 2-2s2 .9 2 2h1c1.66 0 3-1.34 3-3v-3h-3c-.55 0-1-.45-1-1v-3c0-.55.45-1 1-1h1.29l-1.71-2.99a2.016 2.016 0 0 0-1.74-1.01H15v7c0 1.1-.9 2-2 2h-1"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 22.501a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM16 22.501a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM22 12.501v2h-3c-.55 0-1-.45-1-1v-3c0-.55.45-1 1-1h1.29l1.71 3ZM2 8.501h6M2 11.501h4M2 14.501h2"></path>
                </svg>
                <p>Estimate delivery times: <strong className="font-bold">3-5 days</strong> all across India</p>
              </div>
              <div className="flex gap-2 ms-3 mt-5 font-extralight border-b border-gray-300 pb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 20 20" fill="none">
                  <path d="M3.32408 12.2187L2.05742 10.952C1.54076 10.4353 1.54076 9.5853 2.05742 9.06863L3.32408 7.80195C3.54075 7.58528 3.71575 7.16028 3.71575 6.86028V5.06859C3.71575 4.33526 4.31575 3.73528 5.04909 3.73528H6.84075C7.14075 3.73528 7.56575 3.5603 7.78242 3.34364L9.04908 2.07695C9.56574 1.56029 10.4158 1.56029 10.9324 2.07695L12.1991 3.34364C12.4158 3.5603 12.8407 3.73528 13.1407 3.73528H14.9324C15.6658 3.73528 16.2657 4.33526 16.2657 5.06859V6.86028C16.2657 7.16028 16.4407 7.58528 16.6574 7.80195L17.9241 9.06863C18.4408 9.5853 18.4408 10.4353 17.9241 10.952L16.6574 12.2187C16.4407 12.4353 16.2657 12.8603 16.2657 13.1603V14.9519C16.2657 15.6852 15.6658 16.2853 14.9324 16.2853H13.1407C12.8407 16.2853 12.4158 16.4603 12.1991 16.677L10.9324 17.9437C10.4158 18.4603 9.56574 18.4603 9.04908 17.9437L7.78242 16.677C7.56575 16.4603 7.14075 16.2853 6.84075 16.2853H5.04909C4.31575 16.2853 3.71575 15.6852 3.71575 14.9519V13.1603C3.71575 12.852 3.54075 12.427 3.32408 12.2187Z" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M7.5 12.502L12.5 7.50195" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M12.0788 12.0856H12.0862" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M7.91209 7.91862H7.91957" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <p>Use code "<strong className="font-bold">EXTRA10</strong>" to get extra 10% OFF on your order.</p>
              </div>
              <div className="flex gap-2 ms-3 mt-5 font-extralight md:pb-0 pb-3">
                <svg viewBox="0 0 32 32" width="25" fill="none">
                  <path d="M20.249 15.55v-4.575L8.386 4.125" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M2.962 8.3 14 14.687l10.962-6.35M14 26.013V14.675" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M11.412 2.1 4.737 5.813c-1.512.837-2.75 2.937-2.75 4.662v7.063c0 1.724 1.238 3.825 2.75 4.662l6.675 3.713c1.425.787 3.763.787 5.188 0l6.675-3.713c1.512-.837 2.75-2.938 2.75-4.662v-7.063c0-1.725-1.238-3.825-2.75-4.662L16.6 2.1c-1.438-.8-3.763-.8-5.188 0Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <p>Free shipping on all orders</p>
              </div>
            </div>

            <div className="mt-4 ms-3 md:ms-0 flex cursor-pointer">
              <svg width="14" height="15" fill="none" className="mt-1 text-color hover-heading-color">
                <path fill="currentColor" d="M9.813 11.407a.835.835 0 0 0-.11.281 1.59 1.59 0 0 0-.031.313c0 .188.031.365.094.531.073.156.171.292.296.406.115.125.25.224.407.297a1.5 1.5 0 0 0 .531.094c.188 0 .36-.031.516-.094.166-.073.307-.171.421-.296.126-.115.22-.25.282-.407a1.31 1.31 0 0 0 0-1.047 1.075 1.075 0 0 0-.281-.421 1.074 1.074 0 0 0-.422-.282 1.31 1.31 0 0 0-1.047 0 1.098 1.098 0 0 0-.406.281l-.094.094a.418.418 0 0 0-.078.11c0 .01-.006.02-.016.03-.01.011-.016.022-.016.032l-.03.031a.12.12 0 0 1-.017.047Zm.062-8.031c.02.042.047.083.078.125a.544.544 0 0 0 .11.11c.114.124.25.223.406.296a1.5 1.5 0 0 0 .531.094c.188 0 .36-.031.516-.094.166-.073.307-.172.421-.297a1.25 1.25 0 0 0 .282-.422 1.274 1.274 0 0 0 0-1.03 1.216 1.216 0 0 0-.281-.438 1.359 1.359 0 0 0-.422-.282 1.31 1.31 0 0 0-1.047 0 1.414 1.414 0 0 0-.406.282c-.126.125-.224.27-.297.437a1.376 1.376 0 0 0-.094.516c0 .114.01.224.031.328.031.104.073.203.125.297v.031c.01 0 .016.005.016.016.01 0 .015.005.015.015l.016.016Zm-5.75 3.25a.82.82 0 0 0-.078-.125.544.544 0 0 0-.11-.11 1.074 1.074 0 0 0-.421-.28 1.31 1.31 0 0 0-1.047 0 1.098 1.098 0 0 0-.407.28c-.124.126-.223.271-.296.438a1.334 1.334 0 0 0-.094.5c0 .188.031.365.094.531.073.157.171.297.296.422a1.311 1.311 0 0 0 1.453.281c.167-.072.308-.166.423-.28l.109-.11a.612.612 0 0 0 .078-.14h.016c0-.011.005-.022.015-.032.01-.01.016-.02.016-.031a1.02 1.02 0 0 0 .11-.297c.03-.115.046-.23.046-.344 0-.114-.016-.224-.047-.328a1.02 1.02 0 0 0-.11-.297c0-.01-.004-.016-.015-.016v-.03h-.015c0-.011-.006-.022-.016-.032Zm4.313-3.234a4.078 4.078 0 0 1-.079-.344 2.68 2.68 0 0 1 .172-1.422c.146-.323.339-.604.578-.844.24-.24.521-.427.844-.562a2.584 2.584 0 0 1 2.078 0c.334.135.62.323.86.562.24.24.427.521.562.844.146.323.219.672.219 1.047 0 .364-.073.708-.219 1.031a2.603 2.603 0 0 1-.562.844 2.64 2.64 0 0 1-1.89.781c-.366 0-.715-.068-1.048-.203a2.825 2.825 0 0 1-.844-.578L5.563 6.61c.03.115.057.235.078.36a2.277 2.277 0 0 1 0 .734 3.64 3.64 0 0 1-.079.36l3.547 2.062v-.016c.24-.24.521-.427.844-.562a2.585 2.585 0 0 1 2.078 0c.334.135.62.323.86.562.24.24.427.526.562.86a2.584 2.584 0 0 1 0 2.078 2.604 2.604 0 0 1-.562.844c-.24.24-.526.427-.86.562a2.585 2.585 0 0 1-2.078 0 2.603 2.603 0 0 1-.844-.562c-.24-.24-.432-.521-.578-.844A2.756 2.756 0 0 1 8.328 12c0-.125.01-.245.031-.36.021-.124.047-.25.079-.374L4.89 9.204v.016A2.64 2.64 0 0 1 3 10c-.366 0-.715-.068-1.048-.203a2.825 2.825 0 0 1-.844-.578c-.24-.24-.432-.521-.578-.844a2.68 2.68 0 0 1-.203-1.047c0-.364.068-.708.203-1.031.146-.323.339-.604.578-.844.24-.24.521-.427.844-.562a2.584 2.584 0 0 1 2.078 0c.334.135.62.323.86.562l3.546-2.062Z"></path>
              </svg>
              <button onClick={handleShare} className="ms-2">Share</button>
            </div>

            <div className="mt-3 ">
              <div>
                <details className="group border border-gray-300 bg-white p-3 border-x-white border-b-white">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-gray-900">
                    <span>Description</span>
                    <span className="group-open:hidden text-2xl">+</span>
                    <span className="hidden group-open:block text-2xl">-</span>
                  </summary>

                  <div className="group-open:animate-fadeIn mt-3 text-gray-600">
                    <p className="whitespace-pre-line">{product.description}</p>
                  </div>
                </details>
              </div>
              <div>
                <details className="group border border-gray-300 bg-white p-3 border-x-white border-b-white">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-gray-900">
                    <span>Ingredients</span>
                    <span className="group-open:hidden text-2xl">+</span>
                    <span className="hidden group-open:block text-2xl">-</span>
                  </summary>

                  <div className="group-open:animate-fadeIn mt-3 text-gray-600">
                    <p className="whitespace-pre-line">{product.description}</p>
                  </div>
                </details>
              </div>
              <div>
                <details className="group border border-gray-300 bg-white p-3 border-x-white border-b-white">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-gray-900">
                    <span>Direction of use</span>
                    <span className="group-open:hidden text-2xl">+</span>
                    <span className="hidden group-open:block text-2xl">-</span>
                  </summary>

                  <div className="group-open:animate-fadeIn mt-3 text-gray-600">
                    <p className="whitespace-pre-line">{product.description}</p>
                  </div>
                </details>
              </div>
              <div>
                <details className="group border border-gray-300 bg-white p-3 border-x-white">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-gray-900">
                    <span>Additional Info.</span>
                    <span className="group-open:hidden text-2xl">+</span>
                    <span className="hidden group-open:block text-2xl">-</span>
                  </summary>

                  <div className="group-open:animate-fadeIn mt-3 text-gray-600">
                    <p className="whitespace-pre-line">{product.description}</p>
                  </div>
                </details>
              </div>
            </div>

          </div>
        </div>
        <Marquee className="text-white bg-[#0f5b3f]" speed={150} pauseOnHover={true} >
          <div className="my-3 flex gap-20 font-bold">
            <p>
              😍Shop for ₹499+ GET 1 FREE GIFT!🎁
            </p>
            <svg width="12" height="12" fill="none" className="mt-1.5">
              <path fill="currentColor" d="M0 6c3 0 6-3 6-6 0 3 3 6 6 6-3 0-6 3-6 6 0-3-3-6-6-6Z"></path>
            </svg>
            <p>
              💸USE CODE "EXTRA10" TO GET EXTRA 10% OFF💸
            </p>
            <svg width="12" height="12" fill="none" className="mt-1.5">
              <path fill="currentColor" d="M0 6c3 0 6-3 6-6 0 3 3 6 6 6-3 0-6 3-6 6 0-3-3-6-6-6Z"></path>
            </svg>
            <p>
              😍Shop for ₹999+ GET 2 FREE GIFTS!🎁🎁
            </p>
            <svg width="12" height="12" fill="none" className="mt-1.5">
              <path fill="currentColor" d="M0 6c3 0 6-3 6-6 0 3 3 6 6 6-3 0-6 3-6 6 0-3-3-6-6-6Z"></path>
            </svg>
          </div>
        </Marquee>
      </div>

      <div className="text-black text-center mt-10">
        <h1 className="text-4xl font-bold">People Also Bought</h1>
        <p className="p-4 text-gray-600">
          Here's some of our most similar products people are buying. Click to discover trending style.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 transition">
              <Link href="" className="block relative md:overflow-hidden rounded-xl group">

                <span className="absolute top-3 left-3 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full z-10">
                  {item.discount}
                </span>

                <Image
                  src={item.img}
                  width={400}
                  height={400}
                  alt={item.name}
                  className="w-full h-65 object-cover rounded-xl transition-opacity duration-300 group-hover:opacity-0"
                />

                <Image
                  src={item.hoverImg}
                  width={400}
                  height={400}
                  alt="Hover"
                  className="w-full h-65 object-cover rounded-xl absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </Link>

              <h3 className="text-black font-semibold mt-4 text-center text-lg">
                {item.name}
              </h3>

              <div className="text-center mt-2">
                <span className="text-green-700 font-bold text-lg">
                  Rs. {item.price}.00
                </span>
                <span className="text-gray-400 line-through ms-2">
                  Rs. {item.oldPrice}.00
                </span>
              </div>

              <button
                onClick={() => setSelectedProduct(item)}
                className="mt-5 border-2 border-gray-300 text-[#0f5b3f] font-semibold w-full py-3 rounded-full hover:bg-[#0f5b3f] hover:text-white transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>

      <div className="text-black text-center mt-10 pt-10">
        <h1 className="text-4xl font-bold">Recently Viewed</h1>
        <p className="p-4 text-gray-600">
          Explore your recently viewed items, blending quality and style for a refined living experience.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 transition">
              <Link href="" className="block relative md:overflow-hidden rounded-xl group">

                <span className="absolute top-3 left-3 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full z-10">
                  {item.discount}
                </span>

                <Image
                  src={item.img}
                  width={400}
                  height={400}
                  alt={item.name}
                  className="w-full h-65 object-cover rounded-xl transition-opacity duration-300 group-hover:opacity-0"
                />

                <Image
                  src={item.hoverImg}
                  width={400}
                  height={400}
                  alt="Hover"
                  className="w-full h-65 object-cover rounded-xl absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </Link>

              <h3 className="text-black font-semibold mt-4 text-center text-lg">
                {item.name}
              </h3>

              <div className="text-center mt-2">
                <span className="text-green-700 font-bold text-lg">
                  Rs. {item.price}.00
                </span>
                <span className="text-gray-400 line-through ms-2">
                  Rs. {item.oldPrice}.00
                </span>
              </div>

              <button
                onClick={() => setSelectedProduct(item)}
                className="mt-5 border-2 border-gray-300 text-[#0f5b3f] font-semibold w-full py-3 rounded-full hover:bg-[#0f5b3f] hover:text-white transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={closeLightbox}>
          <button onClick={closeLightbox} className="absolute top-4 right-4 text-white bg-black/40 rounded-full p-2">✕</button>
          <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 md:left-8 text-white bg-black/30 rounded-full p-3">‹</button>
          <div className="max-w-[95%] max-h-[90%] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img src={displayImage} alt="lightbox" className="max-w-full max-h-full object-contain" />
          </div>
          <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 md:right-8 text-white bg-black/30 rounded-full p-3">›</button>
        </div>
      )}

      {isCartOpen && (
        <CartModal cartItems={cartItems} onClose={() => setIsCartOpen(false)} />
      )}
      {showCheckout && <CheckoutModal onClose={() => setShowCheckout(false)} />}
    </div>
  );
}