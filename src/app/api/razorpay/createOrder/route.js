import Razorpay from "razorpay";

export async function POST(req) {
  try {
    const body = await (async () => {
      try {
        return await req.json();
      } catch (e) {
        return {};
      }
    })();

    const amount = body.amount || 0;
    const currency = body.currency || "INR";

    const publicKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "";

    if (process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
      const razorpay = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });

      const options = {
        amount: amount * 100,
        currency,
        receipt: "receipt_" + Date.now(),
      };

      const order = await razorpay.orders.create(options);
      order.key = publicKey;
      return Response.json(order, { status: 200 });
    }

    const fakeOrder = {
      id: "fake_order_" + Date.now(),
      amount: amount * 100,
      currency,
      receipt: "receipt_" + Date.now(),
      status: "created",
    };

    fakeOrder.key = publicKey;

    return Response.json(fakeOrder, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Server error creating order" }, { status: 500 });
  }
}
