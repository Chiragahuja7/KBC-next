"use client";

import Link from "next/link";
import { useCart } from "../../Context/CartContext";

export default function CartPage(){
    const { cartItems, increaseQty, decreaseQty, removeFromCart } = useCart();

    const items = cartItems || [];

    function changeQty(item, delta){
        if (delta > 0) increaseQty(item._id, item.selectedSize?.size);
        else decreaseQty(item._id, item.selectedSize?.size);
    }

  const total = cartItems.reduce(
    (acc, item) => acc + item.selectedSize.price * item.quantity,
    0
  );

    return (
        <>
            <div className="p-9 m-9 text-black">
                <div className="flex items-center gap-2">
                    <Link href="/" className="text-gray-400">Home</Link>
                    <span className="text-gray-400">•</span>
                    <span className="font-medium">Your Shopping Cart</span>
                </div>
                <div className="text-center mt-6">
                    <h1 className="text-4xl font-bold">Shopping Cart</h1>
                    <p className="mt-2 text-gray-500">Review your selected items before purchase. Enjoy a seamless shopping experience!</p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 md:px-6 pb-16 flex flex-col lg:flex-row gap-8 text-black">
                <div className="flex-1">
                    <div className="border-b-gray-300 border-b pb-4 mb-6">
                        <div className="hidden md:grid grid-cols-12 gap-4 text-left text-gray-600 font-semibold">
                            <div className="col-span-6">Product</div>
                            <div className="md:col-span-2">Price</div>
                            <div className="md:col-span-2">Quantity</div>
                            <div className="md:col-span-2">Total</div>
                        </div>
                    </div>

                    <div>
                        {items.map(item => {
                            const id = item._id || item.id;
                            const price = item.selectedSize?.price ?? item.price ?? (item.sizes && item.sizes[0]?.price) ?? 0;
                            const qty = item.quantity ?? item.qty ?? 1;
                            const img = item.selectedSize?.image?.url ?? item.images?.[0]?.url ?? item.img ?? '/assets/placeholder.png';
                            return (
                            <div key={id + (item.selectedSize?.size || '')} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start md:items-center py-6 border-b border-b-gray-300">
                                <div className="md:col-span-6 flex items-start md:items-center gap-4">
                                    <img src={img} alt={item.name} className="w-24 h-24 object-cover rounded" />
                                    <div>
                                        <h3 className="font-semibold">{item.name}</h3>
                                        {item.selectedSize?.size && <p className="text-sm text-gray-500 mt-1">{item.selectedSize.size}</p>}
                                        {item.pack && <p className="text-sm text-gray-500 mt-1">{item.pack}</p>}
                                        <div className="flex items-center gap-3 mt-2 text-gray-400">
                                            {/* <button className="text-sm">Edit</button> */}
                                            <button onClick={() => removeFromCart(id, item.selectedSize?.size)} className="text-sm text-red-600">Remove</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <p className="text-green-800 font-bold">Rs. {Number(price).toLocaleString()}</p>
                                </div>

                                <div className="md:col-span-2">
                                    <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-2">
                                        <button onClick={() => changeQty(item, -1)} className="px-3 text-lg">−</button>
                                        <div className="px-4 font-semibold">{qty}</div>
                                        <button onClick={() => changeQty(item, 1)} className="px-3 text-lg">+</button>
                                    </div>
                                </div>

                                <div className="md:col-span-2 text-right">
                                    <p className="font-semibold">Rs. {(price * qty).toLocaleString()}</p>
                                </div>
                            </div>
                        )})}
                    </div>

                    <div className="mt-8 md:block hidden">
                        <h2 className="text-xl font-semibold mb-4">You may also like...</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex gap-4 items-center border rounded-lg p-4">
                                <img src="https://refineveda.com/cdn/shop/files/complete_wellness_kit-Photoroom.jpg?v=1763637235&width=720" alt="suggestion" className="w-24 h-24 object-cover rounded" />
                                <div>
                                    <h3 className="font-medium">Sarva Arogya - Complete Wellness Kit</h3>
                                    <p className="text-green-800 font-bold mt-1">Rs. 999.00 <span className="line-through text-gray-400 ml-2">Rs. 2,197.00</span></p>
                                    <button className="mt-3 underline text-sm text-gray-800">Add to Cart</button>
                                </div>
                            </div>

                            <div className="flex gap-4 items-center border rounded-lg p-4">
                                <img src="https://refineveda.com/cdn/shop/files/migrainekit-Photoroom_2.jpg?v=1761904777&width=720" alt="suggestion2" className="w-24 h-24 object-cover rounded" />
                                <div>
                                    <h3 className="font-medium">Migraine Kit - Best For Headache Relief</h3>
                                    <p className="text-green-800 font-bold mt-1">Rs. 799.00 <span className="line-through text-gray-400 ml-2">Rs. 999.00</span></p>
                                    <button className="mt-3 underline text-sm text-gray-800">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <aside className="w-full lg:w-96">
                    <div className="bg-gray-100 rounded-xl p-6 shadow-sm">
                        <div className="mb-4">
                            <div className="bg-gray-100 p-6">
                                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                                <div className="bg-green-900 h-4 rounded-full transition-all duration-700 ease-out" style={{ width: `${Math.min(100, (total / 500) * 100)}%` }}></div>
                                </div>

                                {total >= 500 ? (
                                <div className="mt-2">
                                    <p className="text-green-900 font-bold">🎉 You qualify for free shipping!</p>
                                </div>
                                ):(
                                <div className="flex mt-2">
                                <p>Spend Rs 500 to get </p><p className="text-green-900 ms-1">Free shipping!</p>
                                </div>
                                )
                                }
                                
                            </div>
                            <p className="mt-4 text-gray-700">Congratulations! You've got free shipping!</p>
                        </div>

                        <div className="border-t border-b py-4 my-4">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Subtotal:</span>
                                <span className="font-semibold">Rs. {total.toLocaleString()}</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">Tax included. Shipping and discounts calculated at checkout.</p>
                        </div>

                        <div className="flex gap-3 items-center">
                            <input placeholder="Discount Code" className="flex-1 px-4 py-3 rounded-full border" />
                            <button className="bg-gray-800 text-white px-4 py-3 rounded-full">Apply</button>
                        </div>

                        <button className="w-full mt-6 bg-gray-800 text-white py-3 rounded-full">Check Out</button>
                    </div>
                </aside>
            </div>
        </>
    );
}