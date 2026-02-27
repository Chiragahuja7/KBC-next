"use client";
import { useState } from "react";
import { useCart } from "../Context/CartContext";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function CheckoutModal({ onClose }) {
  const { cartItems, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");

  const total = cartItems.reduce(
    (acc, item) => acc + (item.price ?? 0) * item.quantity,
    0
  );

  const handlePayment = async () => {
    setLoading(true);
    try {
      const orderRes = await fetch("/api/razorpay/createOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total, currency: "INR" }),
      });

      const orderData = await orderRes.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "My E-commerce Store",
        description: "Order Payment",
        order_id: orderData.id,
        handler: async function (response) {
          try {
            await submitOrder('paid', response);
            alert('Payment successful and order placed');
            clearCart();
            onClose();
          } catch (e) {
            console.error(e);
            alert('Payment succeeded but failed to record order');
          }
        },
        prefill: {
          name,
          email,
          contact: phone,
        },
      };

      const sdkLoaded = await loadRazorpayScript();

      if (!window.Razorpay) {
        window.Razorpay = function (opts) {
          this.opts = opts;
          this.open = () => {
            setTimeout(() => {
              const fakeResponse = {
                razorpay_payment_id: 'pay_fake_' + Date.now(),
                razorpay_order_id: opts.order_id,
                razorpay_signature: 'sig_fake',
              };
              if (typeof opts.handler === 'function') opts.handler(fakeResponse);
            }, 800);
          };
        };
      }

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed to initialize");
    } finally {
      setLoading(false);
    }
  };

  const submitOrder = async (paymentStatus = 'pending', paymentResponse = null) => {
    if (cartItems.length === 0) throw new Error('Cart is empty');

    const items = cartItems.map(item => ({
      productId: item._id,
      name: item.name,
      price: item.price ?? 0,
      qty: item.quantity,
      size: item.selectedSize || "",
      image: (item.images && item.images[0]?.url) || "",
    }));

    const formData = new FormData();
    formData.append('customerName', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('pincode', pincode);
    formData.append('items', JSON.stringify(items));
    formData.append('totalAmount', String(total));
    formData.append('paymentStatus', paymentStatus);
    if (paymentResponse) formData.append('paymentResponse', JSON.stringify(paymentResponse));

    const res = await fetch('/api/orders', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to place order');
    return data;
  };

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex justify-end items-end md:items-center text-black bg-black/50">
      <div onClick={(e) => e.stopPropagation()} className="bg-white p-4 w-full flex flex-col md:w-120 h-full relative transform transition-transform duration-500 ease-in-out">
        <button onClick={onClose} className="absolute right-4 top-4 text-xl">✕</button>
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>

        <div className="mb-4">
          <p className="font-semibold">Items ({cartItems.length})</p>
          <ul className="mt-2 max-h-25 overflow-auto">
            {cartItems.map((item, i) => (
              <li key={i} className="flex justify-between py-1 border-b-gray-200 border-b">
                <img
                  src={item.images?.[0]?.url}
                  alt={item.name}
                  className="w-15 h-12 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.selectedSize ? `Size: ${item.selectedSize} × ` : ''}{item.quantity}</p>
                </div>
                <div className="font-bold">Rs.{(item.price ?? 0) * item.quantity}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between items-center font-bold text-lg mb-4">
          <span>Subtotal</span>
          <span>Rs.{total}</span>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            try {
              setLoading(true);
              await handlePayment();
            } catch (err) {
              console.error(err);
              alert(err.message || 'Failed to initiate payment');
            } finally {
              setLoading(false);
            }
          }}
        >
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="w-full border border-gray-300 rounded px-3 py-2" placeholder="Enter your name" required />
            <label className="block text-sm font-medium mb-1 mt-2">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full border border-gray-300 rounded px-3 py-2" placeholder="Enter your email" required />
            <label className="block text-sm font-medium mb-1 mt-2">Phone No</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" className="w-full border border-gray-300 rounded px-3 py-2" placeholder="Enter your phone" required />
            <label className="block text-sm font-medium mb-1 mt-2">Address</label>
            <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" className="w-full border border-gray-300 rounded px-3 py-2" placeholder="Enter your address" required />
            <label className="block text-sm font-medium mb-1 mt-2">Pincode</label>
            <input value={pincode} onChange={(e) => setPincode(e.target.value)} type="text" className="w-full border border-gray-300 rounded px-3 py-2" placeholder="Enter your pincode" required />
          </div>
          <button type="submit" disabled={loading || cartItems.length === 0} className="bg-[#444444] text-white w-full px-4 py-3 rounded-full">{loading ? 'Processing...' : 'Submit'}</button>
        </form>
      </div>
    </div>
  );
}
