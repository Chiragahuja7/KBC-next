'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CartModal from "./CartModal";
import { useCart } from "../Context/CartContext";
import SearchModal from "./SearchModal";

export default function Header(){
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const { cartItems } = useCart();

    return(
        <header className="bg-[#0f5b3f] p-4 relative">
            <div className="flex justify-between items-center ms-5 mb-4">

                <div className="md:hidden">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <i className="fa-solid fa-bars text-2xl text-white"></i>
                    </button>
                </div>
                <Link href="/">
                    <Image src="/assets/refineveda_logo.webp" height={100} width={100} alt="logo" />
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

                    <button 
                        onClick={() => setIsCartOpen(true)} 
                        className="flex items-center gap-2"
                    >
                        <i className="fa-solid fa-cart-shopping"></i>
                        <span className="hidden md:inline">Cart</span>
                        <p>({cartItems.length})</p>
                    </button>
                </div>
            </div>

            <nav className="hidden md:flex border-t border-white/20">
                <ul className="flex items-center gap-8 mt-4 ms-5">
                    <Link className="hover:text-orange-600 hover:underline" href="/">Home</Link>
                    <Link className="hover:text-orange-600 hover:underline" href="/shop">Shop</Link>
                    <Link className="hover:text-orange-600 hover:underline" href="/shop/jeevan-amrit-complete-health-trio">💪HEALTH KITS💪</Link>
                    <Link className="hover:text-orange-600 hover:underline" href="/shop/migraine-kit">Migraine Kit</Link>
                    <Link className="hover:text-orange-600 hover:underline" href="/contactus">Contact Us</Link>
                </ul>
            </nav>

            {isMobileMenuOpen && (
                <div className="md:hidden bg-white text-black absolute left-0 w-full shadow-lg z-50">
                    <ul className="flex flex-col p-4 gap-4">
                        <Link onClick={() => setIsMobileMenuOpen(false)} href="/">Home</Link>
                        <Link onClick={() => setIsMobileMenuOpen(false)} href="/shop">Shop</Link>
                        <Link onClick={() => setIsMobileMenuOpen(false)} href="/shop/jeevan-amrit-complete-health-trio">💪HEALTH KITS💪</Link>
                        <Link onClick={() => setIsMobileMenuOpen(false)} href="/shop/migraine-kit">Migraine Kit</Link>
                        <Link onClick={() => setIsMobileMenuOpen(false)} href="/contactus">Contact Us</Link>
                    </ul>
                </div>
            )}

            {isCartOpen && (
                <CartModal 
                    cartItems={cartItems} 
                    onClose={() => setIsCartOpen(false)} 
                />
            )}

            <SearchModal
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
                searchQuery={searchText}
            />
        </header>
    )
}