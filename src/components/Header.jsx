'use client'
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import CartModal from "./CartModal";
import { useCart } from "../Context/CartContext";
import SearchModal from "./SearchModal";

export default function Header(){
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const { cartItems } = useCart();
    const [cartAnimated, setCartAnimated] = useState(false);

    useEffect(() => {
        if (cartItems.length > 0) {
            setCartAnimated(true);
            const timer = setTimeout(() => setCartAnimated(false), 300);
            return () => clearTimeout(timer);
        }
    }, [cartItems.length]);

    return(
        <header className="p-4 pt-1 relative" style={{ backgroundColor: 'var(--primary)' }}>
            <div className="flex justify-between items-center">

                <div className="md:hidden">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <i className="fa-solid fa-bars text-2xl text-white"></i>
                    </button>
                </div>
                <Link href="/" className="ms-9 md:ms-0">
                    <Image src="/assets/kbc_logo.webp" height={100} width={100} alt="logo" />
                </Link>

                <div className="w-170 h-10 bg-white rounded-full hidden gap-1 md:flex items-center px-2">
                    <i className="me-2 fa-solid fa-magnifying-glass text-stone-600"></i>
                    <input
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                setIsSearchOpen(true);
                            }
                        }}
                        className="w-full text-black outline-none"
                        placeholder="I am looking for...."
                    />
                </div>

                <div className="flex items-center gap-4 text-white">

                    <button 
                        className="md:hidden"
                        onClick={() => setIsSearchOpen(true)}
                    >
                        <i className="fa-solid fa-magnifying-glass text-xl"></i>
                    </button>

                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsCartOpen(true)} 
                        className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-colors"
                    >
                        <motion.i 
                            animate={cartAnimated ? { scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] } : {}}
                            className="fa-solid fa-cart-shopping"
                        ></motion.i>
                        <span className="hidden md:inline">Cart</span>
                        <motion.p
                            key={cartItems.length}
                            initial={{ scale: 1.5, color: "#ff8a00" }}
                            animate={{ scale: 1, color: "#ffffff" }}
                        >({cartItems.length})</motion.p>
                    </motion.button>
                </div>
            </div>

            <nav className="hidden md:flex border-t border-white/20">
                <ul className="flex items-center gap-8 mt-4 ms-5">
                    <Link className="hover:text-orange-600 hover:underline" href="/">Home</Link>
                    <Link className="hover:text-orange-600 hover:underline" href="/shop">Shop</Link>
                    <Link className="hover:text-orange-600 hover:underline" href="/contactus">Contact Us</Link>
                </ul>
            </nav>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, x: "-100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "-100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed inset-0 bg-white text-stone-900 z-[100] md:hidden flex flex-col justify-start p-6 select-none overflow-y-auto"
                    >
                        {/* Top Section with Close Button */}
                        <div className="flex justify-end w-full mb-8">
                            <motion.button 
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-12 h-12 flex items-center justify-center bg-stone-100 rounded-full hover:bg-stone-200 transition-colors shadow-sm select-none"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-800">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </motion.button>
                        </div>

                        {/* Centered navigation items and button directly underneath */}
                        <div className="flex flex-col items-center justify-center flex-1 gap-12">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="w-full flex justify-center"
                            >
                                <Link 
                                    onClick={() => setIsMobileMenuOpen(false)} 
                                    href="/"
                                    className="text-4xl md:text-5xl font-bold tracking-tight text-stone-900 hover:text-stone-600 transition-colors duration-200"
                                >
                                    Home
                                </Link>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 }}
                                className="w-full flex justify-center"
                            >
                                <Link 
                                    onClick={() => setIsMobileMenuOpen(false)} 
                                    href="/shop"
                                    className="text-4xl md:text-5xl font-bold tracking-tight text-stone-900 hover:text-stone-600 transition-colors duration-200"
                                >
                                    Shop
                                </Link>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex justify-center w-full px-4"
                            >
                                <Link 
                                    onClick={() => setIsMobileMenuOpen(false)} 
                                    href="/contactus"
                                    className="w-full max-w-sm py-4 bg-stone-950 text-white text-center rounded-full text-base md:text-lg font-bold tracking-wider hover:bg-stone-800 transition-colors duration-200 shadow-md select-none mt-4"
                                >
                                    GET IN TOUCH
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isCartOpen && (
                    <CartModal 
                        cartItems={cartItems} 
                        onClose={() => setIsCartOpen(false)} 
                    />
                )}
            </AnimatePresence>

            <SearchModal
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
                searchQuery={searchText}
            />
        </header>
    )
}