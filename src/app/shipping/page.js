export default function ShippingPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-black">
      <h1 className="text-4xl font-bold mb-8">Shipping Policy</h1>
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>Thank you for visiting and shopping at Kunj Bihari Collection. Following are the terms and conditions that constitute our Shipping Policy.</p>
        
        <h2 className="text-2xl font-semibold text-black mt-8">1. Shipment Processing Time</h2>
        <p>All orders are processed within 2-3 business days. Orders are not shipped or delivered on weekends or holidays.</p>
        
        <h2 className="text-2xl font-semibold text-black mt-8">2. Shipping Rates & Delivery Estimates</h2>
        <p>Shipping charges for your order will be calculated afterwards.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Standard Shipping: 5-7 business days</li>
          <li>Expedited Shipping: 2-4 business days</li>
        </ul>
        
        <h2 className="text-2xl font-semibold text-black mt-8">3. Shipment Confirmation & Order Tracking</h2>
        <p>You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s).</p>
        
        <h2 className="text-2xl font-semibold text-black mt-8">4. Customs, Duties and Taxes</h2>
        <p>Kunj Bihari Collection is not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer (tariffs, taxes, etc.).</p>
        
        <h2 className="text-2xl font-semibold text-black mt-8">5. Damages</h2>
        <p>Kunj Bihari Collection is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim.</p>
      </div>
    </div>
  );
}
