import connectDB from "@/src/lib/mongodb";
import Order from "@/src/models/Order";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function AdminOrdersPage({ searchParams }){
    const sp = await searchParams;
    const page = Math.max(1, parseInt(sp?.page) || 1);
    const limit = 10;
    const skip = (page - 1) * limit;

    await connectDB();

    const [orders, total] = await Promise.all([
        Order.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
        Order.countDocuments(),
    ]);

    const totalPages = Math.max(1, Math.ceil(total / limit));

    return(
        <div className="p-6 md:p-10 bg-gray-100 min-h-screen text-black">
            <h1 className="text-3xl font-bold mb-6">Admin Orders</h1>

            {(!orders || !orders.length) ? (
                <p>No orders found.</p>
            ) : (
                <div className="overflow-x-auto bg-white shadow rounded-lg p-4">
                    <table className="w-full table-auto text-left">
                        <thead>
                            <tr className="text-sm text-gray-600">
                                <th className="px-4 py-2">Order ID</th>
                                <th className="px-4 py-2">Customer</th>
                                <th className="px-4 py-2">Items</th>
                                <th className="px-4 py-2">Total</th>
                                <th className="px-4 py-2">Payment</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Placed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id} className="border-t align-top">
                                    <td className="px-4 py-3 text-sm">{String(order._id)}</td>
                                    <td className="px-4 py-3 text-sm">{order.customerName || order.email || '—'}</td>
                                    <td className="px-4 py-3 text-sm">
                                        {order.items && order.items.length ? (
                                            <ul className="list-disc pl-5">
                                                {order.items.map((it, idx) => (
                                                    <li key={idx} className="text-sm mb-1">
                                                        <a 
                                                            href={`https://kunjbiharicollection.in/shop/${it.slug}`} 
                                                            target="_blank" 
                                                            className="text-blue-600 hover:underline font-medium"
                                                        >
                                                            {it.name}
                                                        </a>
                                                        <span className="text-gray-500 ml-1">
                                                            ({it.size || it.selectedSize || 'N/A'}{it.color ? `, ${it.color}` : ''})
                                                        </span>
                                                        <span className="font-bold ml-1">×{it.qty}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <span>—</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-sm">₹{order.totalAmount?.toFixed ? order.totalAmount.toFixed(2) : order.totalAmount}</td>
                                    <td className="px-4 py-3 text-sm">{order.paymentStatus}</td>
                                    <td className="px-4 py-3 text-sm">{order.orderStatus}</td>
                                    <td className="px-4 py-3 text-sm">{order.createdAt ? new Date(order.createdAt).toLocaleString() : ''}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-700">
                        <div className="text-center sm:text-left">
                            Showing {(skip + 1)} - {Math.min(skip + (orders?.length || 0), total)} of {total} orders
                        </div>
                        <div className="flex items-center space-x-3">
                            <Link 
                                className={`px-3 py-1 bg-gray-100 rounded ${page <= 1 ? 'opacity-50 pointer-events-none' : ''}`} 
                                href={`?page=${page - 1}`}
                            >
                                Previous
                            </Link>
                            <span>Page {page} of {totalPages}</span>
                            <Link 
                                className={`px-3 py-1 bg-gray-100 rounded ${page >= totalPages ? 'opacity-50 pointer-events-none' : ''}`} 
                                href={`?page=${page + 1}`}
                            >
                                Next
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}