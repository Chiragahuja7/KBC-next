"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../Context/CartContext";

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
      // 1. Submit order to database (paymentStatus='pending' since it's WhatsApp/COD flow)
      await submitOrder("pending");

      // 2. Clear cart and notify success
      clearCart();
      onClose();

      // 3. Construct WhatsApp message
      let message = `*New Order Details*\n\n`;
      message += `*Customer Information:*\n`;
      message += `Name: ${name}\n`;
      message += `Phone: ${phone}\n`;
      message += `Email: ${email}\n`;
      message += `Address: ${address}, ${pincode}\n\n`;

      message += `*Items:*\n`;
      cartItems.forEach((item, index) => {
        const size = typeof item.selectedSize === "object" ? item.selectedSize.label : (item.selectedSize || "N/A");
        const color = item.selectedColor || "";
        const itemLink = `https://kunjbiharicollections.in/shop/${item.slug}`;
        
        message += `${index + 1}. ${item.name}`;
        if (size && size !== "N/A") message += ` (${size})`;
        if (color) message += ` [Color: ${color}]`;
        message += ` x ${item.quantity} - Rs.${(item.price ?? 0) * item.quantity}\n`;
        message += `Link: ${itemLink}\n\n`;
      });

      message += `*Total Amount: Rs.${total} + shipping*`;

      // 4. Redirect to WhatsApp
      const whatsappUrl = `https://wa.me/917627027559?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");

    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to place order");
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
      size: typeof item.selectedSize === 'object' ? item.selectedSize?.label : (item.selectedSize || ""),
      color: item.selectedColor || "",
      slug: item.slug || "",
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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose} 
      className="fixed inset-0 z-50 flex justify-end items-end md:items-center text-black bg-black/60 backdrop-blur-sm px-4"
    >
      <motion.div 
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()} 
        className="bg-white p-6 w-full flex flex-col md:w-120 h-full relative shadow-2xl overflow-y-auto"
      >
        <button onClick={onClose} className="absolute right-4 top-4 text-xl">✕</button>
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>

        <div className="mb-4">
          <p className="font-semibold">Items ({cartItems.length})</p>
          <ul className="mt-2 max-h-25 overflow-auto">
            {cartItems.map((item, i) => (
              <li key={i} className="flex justify-between py-1 border-b-gray-200 border-b">
                <img
                  src={item.cartImage || item.images?.[0]?.url}
                  alt={item.name}
                  className="w-15 h-12 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.selectedSize ? `Size: ${typeof item.selectedSize === 'object' ? item.selectedSize.label : item.selectedSize} × ` : ''}{item.quantity}</p>
                </div>
                <div className="font-bold">Rs.{(item.price ?? 0) * item.quantity}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between items-center font-bold text-lg mb-4">
          <span>Subtotal</span>
          <span>Rs.{total} + shipping</span>
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
          <button type="submit" disabled={loading || cartItems.length === 0} className="bg-[#444444] text-white w-full px-4 py-3 rounded-full">{loading ? 'Processing...' : 'Place Order on WhatsApp'}</button>
        </form>
      </motion.div>
    </motion.div>
  );
}
