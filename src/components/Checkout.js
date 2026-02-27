const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const handlePayment = async () => {
  const res = await loadRazorpayScript();
  if (!res) {
    alert("Razorpay SDK failed to load");
    return;
  }

  const orderRes = await fetch("/api/razorpay/createOrder", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: 500 }),
  });

  const orderData = await orderRes.json();

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: orderData.amount,
    currency: orderData.currency,
    name: "My E-commerce Store",
    description: "Test Transaction",
    order_id: orderData.id,
    handler: function (response) {
      console.log("Payment Success:", response);
    },
    prefill: {
      name: "John Doe",
      email: "john@example.com",
      contact: "9999999999",
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};
