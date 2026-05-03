import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useCart } from "../Context/CartContext";
import CheckoutModal from "./CheckoutModal";
import { useRouter } from "next/navigation";

export default function CartModal({ cartItems, onClose }) {
  const { removeFromCart, increaseQty, decreaseQty } = useCart();
  const [show, setShow] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => setShow(true), 10);

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClose = () => {
    onClose();
  };

  const total = cartItems.reduce(
    (acc, item) => acc + (item.price ?? 0) * item.quantity,
    0
  );

  function handleCartPage() {
    router.push('/cartpage');
    onClose();
  }

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose} 
        className="fixed inset-0 z-50 flex justify-end items-end md:items-center text-black bg-black/60 backdrop-blur-sm"
      >
        <motion.div 
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          onClick={(e) => e.stopPropagation()} 
          className="bg-white w-full flex flex-col md:w-120 h-full relative shadow-2xl"
        >
          <button onClick={handleClose} className="absolute right-4 top-4 text-xl hover:scale-110 transition-transform">✕</button>

          <h2 className="text-2xl font-bold mb-4 mt-4 ms-2">Shopping Cart ({cartItems.length})</h2>
          <div className="bg-gray-50 p-4 border-b border-gray-200">
            <div className="flex items-center gap-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
              <div className="flex items-center gap-1">
                <i className="fa-solid fa-check text-primary"></i>
                <span>100% Quality</span>
              </div>
              <div className="flex items-center gap-1">
                <i className="fa-solid fa-truck-fast text-primary"></i>
                <span>Fast Shipping</span>
              </div>
              <div className="flex items-center gap-1">
                <i className="fa-solid fa-lock text-primary"></i>
                <span>Secure</span>
              </div>
            </div>
          </div>

          {cartItems.length === 0 ? (<p className="text-gray-500 ms-1 p-4">Your cart is empty.</p>) : (
            <>
              <div className="flex-1 overflow-y-auto px-2">
                <ul className="space-y-4 py-4">
                  <AnimatePresence initial={false}>
                    {cartItems.map((item, index) => (
                      <motion.li 
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                        key={`${item._id}-${item.selectedSize}-${item.selectedColor}`} 
                        className="flex p-4 border-b border-gray-100 bg-white"
                      >
                        <img
                          src={item.cartImage || item.images?.[0]?.url}
                          alt={item.name}
                          className="w-20 h-24 object-cover rounded shadow-sm mr-4"
                        />
                        <div className="flex flex-col flex-1">
                          <h3 className="font-semibold text-sm">{item.name}</h3>
                          {item.selectedSize && (
                            <p className="text-xs text-gray-500">
                              Size: {typeof item.selectedSize === "object" ? item.selectedSize.label : item.selectedSize}
                            </p>
                          )}
                          {item.selectedColor && (
                            <p className="text-xs text-gray-500">
                              Color: {item.selectedColor}
                            </p>
                          )}
                          <div className="flex mt-1">
                            <p className="text-primary font-bold text-sm">
                              Rs.{item.price}
                            </p>
                            {item.oldPrice != null && (
                              <p className="ms-2 line-through text-gray-400 text-xs text-[#d32f2f]">
                                Rs. {item.oldPrice}.00
                              </p>
                            )}
                          </div>

                          <div className="flex border border-gray-200 bg-gray-50 text-black w-max mt-2 rounded overflow-hidden">
                            <button onClick={() => decreaseQty(item._id, item.selectedSize)} className="px-2 hover:bg-gray-200 transition-colors">−</button>
                            <span className="px-2 text-sm flex items-center">{item.quantity}</span>
                            <button onClick={() => increaseQty(item._id, item.selectedSize)} className="px-2 hover:bg-gray-200 transition-colors">+</button>
                          </div>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item._id, item.selectedSize)} 
                          className="text-gray-400 hover:text-red-500 transition-colors p-2 h-max"
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-600 font-medium">SubTotal:</span>
                  <span className="text-2xl font-bold text-black">Rs.{total} + shipping</span>
                </div>
                <div className="space-y-3">
                  <button onClick={handleCartPage} className="w-full py-4 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all">View Cart</button>
                  <button onClick={() => setShowCheckout(true)} className="w-full py-4 rounded-full bg-black text-white font-bold hover:bg-gray-800 transition-all shadow-lg shadow-black/10">Checkout</button>
                </div>
              </div>
            </>
          )}
        </motion.div>
        <AnimatePresence>
          {showCheckout && <CheckoutModal onClose={() => setShowCheckout(false)} />}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
