"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ContactUs() {
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

    try {
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
        setResponseMsg(data.error || "Something went wrong ❌");
      }
    } catch (err) {
      setResponseMsg("Something went wrong ❌");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-stone-50/50 pb-16 antialiased">
      {/* Navigation / Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 pt-12 md:pt-16 select-none">
        <nav className="flex items-center gap-2 text-sm font-medium text-stone-500 mb-6">
          <Link href="/" className="hover:text-stone-800 transition-colors">
            Home
          </Link>
          <span className="text-stone-300">/</span>
          <span className="text-stone-900 font-semibold">Contact</span>
        </nav>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 md:mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-stone-900 mb-4">
            Get in touch
          </h1>
          <p className="text-stone-600 max-w-xl text-base md:text-lg">
            Whether you have a question about our products, bulk orders, or just want to say hi, we're always here to help.
          </p>
        </motion.div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        
        {/* Left Column: Support Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-5 flex flex-col gap-6"
        >
          {/* Card 1: Customer Support */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-stone-200/60 shadow-sm flex flex-col gap-5">
            <div>
              <span className="text-xs font-bold tracking-wider uppercase text-stone-400 block mb-1">Support</span>
              <h2 className="text-2xl font-bold text-stone-900">Customer Care</h2>
            </div>
            
            <div className="space-y-4 text-stone-600">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-stone-400 block">Phone</span>
                <a href="tel:+917627027559" className="text-stone-800 font-semibold hover:text-stone-600 transition-colors text-lg">
                  +91 76270 27559
                </a>
              </div>

              <div className="flex flex-col gap-1 border-t border-stone-100 pt-3">
                <span className="text-sm font-bold text-stone-400 block">General Inquiries</span>
                <a href="mailto:kunjbiharicollections20@gmail.com" className="text-stone-800 font-semibold hover:text-stone-600 transition-colors break-all">
                  kunjbiharicollections20@gmail.com
                </a>
              </div>

              <div className="flex flex-col gap-1 border-t border-stone-100 pt-3">
                <span className="text-sm font-bold text-stone-400 block">Operating Hours</span>
                <p className="text-stone-700 font-medium">
                  Mon - Sun &bull; 9:00am - 8:00pm
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Bulk Orders */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-stone-200/60 shadow-sm flex flex-col gap-5">
            <div>
              <span className="text-xs font-bold tracking-wider uppercase text-stone-400 block mb-1">Business</span>
              <h2 className="text-2xl font-bold text-stone-900">Bulk Orders</h2>
            </div>
            
            <div className="space-y-4 text-stone-600">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-stone-400 block">Corporate & Wholesale</span>
                <a href="mailto:kunjbiharicollections20@gmail.com" className="text-stone-800 font-semibold hover:text-stone-600 transition-colors break-all">
                  kunjbiharicollections20@gmail.com
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Contact Form Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-7"
        >
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-stone-200/60 shadow-sm">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-stone-900 mb-2">Message Us</h2>
              <p className="text-stone-500 text-sm">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Name and Email in grid for tablet+, single col on mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-bold tracking-wider uppercase text-stone-400">
                    Your Name
                  </label>
                  <input 
                    id="name"
                    type="text"
                    placeholder="Jane Doe" 
                    name="name" 
                    className="w-full border border-stone-200 focus:border-stone-800 rounded-xl px-4 py-3 text-stone-900 outline-none transition-all duration-200 bg-stone-50/30 backdrop-blur-sm focus:ring-4 focus:ring-stone-100" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-bold tracking-wider uppercase text-stone-400">
                    Your Email
                  </label>
                  <input 
                    id="email"
                    type="email"
                    placeholder="jane@example.com" 
                    name="email" 
                    className="w-full border border-stone-200 focus:border-stone-800 rounded-xl px-4 py-3 text-stone-900 outline-none transition-all duration-200 bg-stone-50/30 backdrop-blur-sm focus:ring-4 focus:ring-stone-100" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs font-bold tracking-wider uppercase text-stone-400">
                  Your Message
                </label>
                <textarea 
                  id="message"
                  name="message" 
                  placeholder="How can we help you?" 
                  rows={5} 
                  className="w-full border border-stone-200 focus:border-stone-800 rounded-xl px-4 py-3 text-stone-900 outline-none transition-all duration-200 bg-stone-50/30 backdrop-blur-sm focus:ring-4 focus:ring-stone-100 resize-none" 
                  required 
                  value={formData.message} 
                  onChange={handleChange} 
                />
              </div>

              {/* Consent checkbox */}
              <div className="flex items-start gap-3 py-2 cursor-pointer select-none">
                <input 
                  id="consent"
                  type="checkbox" 
                  className="w-4 h-4 mt-1 border border-stone-300 text-stone-900 rounded focus:ring-stone-800 select-none cursor-pointer" 
                  required 
                />
                <label htmlFor="consent" className="text-stone-600 text-sm leading-snug cursor-pointer select-none">
                  I agree to the <Link href="/privacy" className="font-semibold text-stone-900 hover:underline">Privacy Policy</Link> of the website.
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col gap-3 mt-2">
                <motion.button 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit" 
                  disabled={loading} 
                  className="w-full md:w-fit px-8 py-4 bg-stone-900 text-white text-center rounded-xl font-bold tracking-wide hover:bg-stone-800 transition-colors shadow-sm select-none duration-200 disabled:bg-stone-400 cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>

                {responseMsg && (
                  <motion.p 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className={`text-sm font-semibold mt-1 ${
                      responseMsg.includes("successfully") ? "text-emerald-600" : "text-rose-600"
                    }`}
                  >
                    {responseMsg}
                  </motion.p>
                )}
              </div>
            </form>
          </div>
        </motion.div>

      </div>
    </div>
  );
}