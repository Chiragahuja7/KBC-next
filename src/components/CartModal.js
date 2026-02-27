import { useState, useEffect } from "react";
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
    setShow(false);
    setTimeout(onClose, 300);
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
      <div onClick={handleClose} className={"fixed inset-0 z-50 flex justify-end items-end md:items-center text-black bg-black/50"}>
        <div onClick={(e) => e.stopPropagation()} className={`bg-white w-full flex flex-col md:w-120 h-full relative transform transition-transform duration-500 ease-in-out ${show ? "translate-x-0" : "translate-x-full"}`} >
          <button onClick={handleClose} className="absolute right-4 top-4 text-xl ease-out transition-all duration-700">✕</button>

          <h2 className="text-2xl font-bold mb-4 mt-4 ms-2">Shopping Cart ({cartItems.length})</h2>
          <div className="bg-gray-100 p-6">
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div className="bg-green-900 h-4 rounded-full transition-all duration-700 ease-out" style={{ width: `${Math.min(100, (total / 500) * 100)}%` }}></div>
            </div>

            {total >= 500 ? (
              <div className="mt-2">
                <p className="text-green-900 font-bold">🎉 You qualify for free shipping!</p>
              </div>
            ) : (
              <div className="flex mt-2">
                <p>Spend Rs 500 to get </p><p className="text-green-900 ms-1">Free shipping!</p>
              </div>
            )
            }

          </div>

          {cartItems.length === 0 ? (<p className="text-gray-500 ms-1 p-4">Your cart is empty.</p>) : (
            <>
              <div className="flex-1 overflow-y-auto px-2">
                <ul>
                  {cartItems.map((item, index) => (
                    <li key={index} className="flex mb-4 p-4 border-b border-gray-200">
                      <img
                        src={item.images?.[0]?.url}
                        alt={item.name}
                        className="w-25 h-30 object-cover rounded mr-4"
                      />
                      <div className="flex flex-col">
                        <h3 className="font-semibold">{item.name}</h3>
                        {item.selectedSize && (
                          <p className="text-sm text-gray-500">
                            Size: {item.selectedSize}
                          </p>
                        )}
                        <div className="flex">
                          <p className="text-green-800 font-bold">
                            Rs.{item.price}
                          </p>
                          {item.oldPrice != null && (
                            <p className="ms-2 line-through text-gray-400">
                              Rs. {item.oldPrice}.00
                            </p>
                          )}
                        </div>

                        <div className="flex border border-gray-200 bg-gray-100 text-black w-max mt-3 py-1">
                          <button onClick={() => decreaseQty(item._id, item.selectedSize)} className="px-2">−</button>
                          <span className="mx-3 px-1">{item.quantity}</span>
                          <button onClick={() => increaseQty(item._id, item.selectedSize)} className="px-2">+</button>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item._id, item.selectedSize)} className="relative md:mt-14 md:ms-35 mt-18 ms-15">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-100 border border-gray-300 pt-4 mt-4 font-bold text-lg border-t w-full p-4">
                <div className=" justify-between flex w-full mb-4">
                  <span>SubTotal:</span>
                  <span>Rs.{total}</span>
                </div>
                <div>
                  <button onClick={handleCartPage} className=" bg-white text-green-950 w-full px-10 py-3 rounded-full">View Cart</button>
                  <button onClick={() => setShowCheckout(true)} className="bg-[#444444] mt-4 text-white w-full px-10 py-3 rounded-full">Checkout</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {showCheckout && <CheckoutModal onClose={() => setShowCheckout(false)} />}
    </>
  );
}
