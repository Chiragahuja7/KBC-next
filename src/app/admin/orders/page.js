import connectDB from "@/src/lib/mongodb";
import Order from "@/src/models/Order";

export default async function AdminOrdersPage({ searchParams }){
    const page = Math.max(1, parseInt(searchParams?.page) || 1);
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
                                                    <li key={idx} className="text-sm">
                                                        {it.name} ×{it.qty}
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

                    <div className="mt-4 flex items-center justify-between text-sm text-gray-700">
                        <div>
                            Showing {(skip + 1)} - {Math.min(skip + orders.length, total)} of {total} orders
                        </div>
                        <div className="space-x-3">
                            <a className={`px-3 py-1 bg-gray-100 rounded ${page <= 1 ? 'opacity-50 pointer-events-none' : ''}`} href={`?page=${page - 1}`}>
                                Previous
                            </a>
                            <span>Page {page} of {totalPages}</span>
                            <a className={`px-3 py-1 bg-gray-100 rounded ${page >= totalPages ? 'opacity-50 pointer-events-none' : ''}`} href={`?page=${page + 1}`}>
                                Next
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}