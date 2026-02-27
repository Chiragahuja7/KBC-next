"use client";
import { useState } from "react";
import Link from "next/link";

export default function ContactUs(){
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResponseMsg("");

    const res = await fetch("/api/contactus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      setResponseMsg("Message sent successfully ✅");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setResponseMsg("Something went wrong ❌");
    }

    setLoading(false);
  }
    return(
        <>
         <div className="p-9 m-9 text-center">
            <Link href="/" className="text-gray-300">Home</Link>
            <span className="text-black"> : Contact</span>
            <div className="text-center mt-3">
            <span className="text-4xl text-black text-center font-bold">Contact Us</span>
            </div>
        </div>
        <div className="text-black m-9 p-9 gap-1 grid grid-cols-1 md:grid-cols-2">
            <div className="">
                <span className="font-bold text-2xl">Customer Support</span>
                <p className="text-gray-500 pt-2 pb-2">Have a question? Please contact us using the customer support channels below.</p>
                <span className="font-bold">Customer Care:</span>
                <p className="text-gray-500 underline pt-2 pb-1"><a href="tel:+91-9876495313">+91-9876495313</a></p>
                <p className="text-gray-500 underline pb-1">Email: <a href="mailto:info@refineveda.com">info@refineveda.com</a></p>
                <p className="text-gray-500 pb-1">Opening hours: Mon-Sat 9:00am - 6:00pm</p>
                <span className="font-bold pb-1">Bulk Order:</span>
                <p className="text-gray-500 underline pb-1 pt-1">Email: <a href="mailto:info@refineveda.com">info@refineveda.com</a></p>
                <span className="font-bold pb-1">Contact for Franchise:</span>
                <p className="text-gray-500 underline pb-1 pt-1">Email: <a href="mailto:info@refineveda.com">info@refineveda.com</a></p>
            </div>
            <div className="mt-6 sm:mt-0">
                <span className="font-bold text-2xl">Contact Us</span>
                <p className="text-gray-500 pt-2 pb-2">Please submit all general enquiries in the contact form below and we look forward to hearing from you soon.</p>
                <div>
                    <form className="space-x-3" onSubmit={handleSubmit}>
                        <input placeholder=" Your Name" name="name" className="border border-gray-300 rounded-2xl md:w-80 w-65 h-10" value={formData.name} onChange={handleChange} required/>
                        <input placeholder=" Your Email" name="email" className="border border-gray-300 rounded-2xl md:w-80 w-65 h-10 md:pt-0 mt-3" value={formData.email} onChange={handleChange} required/>
                        <textarea name="message" placeholder="Your Message" rows={5} className="border border-gray-300 rounded-xl w-65 mt-4 md:w-100 lg:w-165 p-3 outline-none focus:border-black" required value={formData.message} onChange={handleChange}/>
                        <br/>
                        <input type="checkbox" className=" ms-2" required /><span>I agree to the Privacy Policy of the website.</span>
                        <br/>
                        <br/>
                        <button type="submit" disabled={loading} className="bg-gray-700 text-white rounded-3xl h-11 w-full md:w-40 hover:bg-gray-800 transition">
                        {loading ? "Sending..." : "Send"}
                        </button>
                        {responseMsg && (
                        <p className="text-sm text-gray-600">
                            {responseMsg}
                        </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}