"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { HiOutlineSearch, HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoBagOutline, IoCloseOutline } from "react-icons/io5";

export default function MobileHeader() {
  const topBarRef = useRef<HTMLDivElement>(null);
  const [topBarHeight, setTopBarHeight] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  // States for Overlays
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Global events to open modals from other components
  useEffect(() => {
    const handleOpenCart = () => setIsCartOpen(true);
    const handleOpenMenu = () => setIsMenuOpen(true);
    window.addEventListener("open-cart", handleOpenCart);
    window.addEventListener("open-menu", handleOpenMenu);
    return () => {
      window.removeEventListener("open-cart", handleOpenCart);
      window.removeEventListener("open-menu", handleOpenMenu);
    };
  }, []);

  // Lock body scroll when any modal is open
  useEffect(() => {
    if (isMenuOpen || isSearchOpen || isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, isSearchOpen, isCartOpen]);

  // Measure announcement bar height
  useEffect(() => {
    const measure = () => {
      if (topBarRef.current) setTopBarHeight(topBarRef.current.offsetHeight);
    };
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Turn header white once user scrolls past hero
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 font-medium antialiased">
        {/* Announcement Bar — always opaque */}
        <div ref={topBarRef} className="bg-[#1a1a1a] border-b border-white/10 text-white">
          <div className="px-4 py-2 flex items-center justify-center text-[11px] font-bold tracking-wide">
            Visit our contact page to send us a message
          </div>
        </div>

        {/* Main Header Row — transparent on hero, white after scroll */}
        <div
          className={`transition-colors duration-300 ${
            scrolled ? "bg-white shadow-sm" : "bg-transparent"
          }`}
        >
          <div className="relative flex items-center justify-between px-4 h-[60px]">
            {/* Left: Hamburger + Search */}
            <div className="flex items-center gap-4">
              <button aria-label="Open menu" onClick={() => setIsMenuOpen(true)}>
                <HiOutlineMenuAlt2
                  className={`w-6 h-6 transition-colors duration-300 ${
                    scrolled ? "text-gray-900" : "text-white"
                  }`}
                />
              </button>
              <button aria-label="Search" onClick={() => setIsSearchOpen(true)}>
                <HiOutlineSearch
                  className={`w-[22px] h-[22px] transition-colors duration-300 ${
                    scrolled ? "text-gray-700" : "text-white"
                  }`}
                />
              </button>
            </div>

            {/* Center: Logo */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
            >
              <span
                className={`font-[var(--font-logo)] text-[26px] font-extrabold tracking-[0.04em] transition-colors duration-300 ${
                  scrolled ? "text-gray-900" : "text-white"
                }`}
              >
                Digilink<span className="logo-dot text-white mix-blend-difference">.</span>
              </span>
            </Link>

            {/* Right: Cart */}
            <button aria-label="Cart" onClick={() => setIsCartOpen(true)}>
              <IoBagOutline
                className={`w-[24px] h-[24px] transition-colors duration-300 ${
                  scrolled ? "text-gray-700" : "text-white"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Spacer — only announcement bar height; hero sits behind the main header row */}
      <div aria-hidden="true" style={{ height: topBarHeight }} />

      {/* OVERLAY ANIMATIONS */}
      <style>{`
        @keyframes slideRight { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        @keyframes slideLeft { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .anim-slide-right { animation: slideRight 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .anim-slide-left { animation: slideLeft 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .anim-fade-in { animation: fadeIn 0.2s ease-out forwards; }
      `}</style>

      {/* --- MENU OVERLAY --- */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] flex lg:hidden">
          <div className="absolute inset-0 bg-black/60 anim-fade-in" onClick={() => setIsMenuOpen(false)} />
          <div className="relative w-[300px] max-w-[85vw] bg-white h-full shadow-2xl flex flex-col anim-slide-right">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <span className="font-[var(--font-logo)] text-[22px] font-extrabold tracking-[0.04em]">Digilink.</span>
              <button aria-label="Close menu" onClick={() => setIsMenuOpen(false)} className="p-1">
                <IoCloseOutline className="w-7 h-7 text-gray-800" />
              </button>
            </div>
            <nav className="flex flex-col p-5 gap-6 text-[16px] font-semibold text-gray-900 overflow-y-auto">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link href="/collections" onClick={() => setIsMenuOpen(false)}>Shop Collections</Link>
              <Link href="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            </nav>
            <div className="mt-auto p-5 border-t border-gray-100 bg-gray-50">
              <button className="w-full bg-black text-white py-3.5 rounded-md font-bold text-[14px]">
                Sign In / Register
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- SEARCH OVERLAY --- */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] bg-white anim-fade-in flex flex-col lg:hidden">
          <div className="flex items-center px-4 h-[70px] border-b border-gray-200 gap-3">
            <HiOutlineSearch className="w-6 h-6 text-gray-400" />
            <input 
              autoFocus
              type="text" 
              placeholder="Search for products..." 
              className="flex-1 bg-transparent border-none outline-none text-[16px] text-gray-900 placeholder:text-gray-400"
            />
            <button aria-label="Close search" onClick={() => setIsSearchOpen(false)} className="p-2">
              <IoCloseOutline className="w-7 h-7 text-gray-800" />
            </button>
          </div>
          <div className="p-6 text-gray-500">
            <h3 className="text-[12px] font-bold tracking-widest uppercase mb-4 text-gray-400">Popular Searches</h3>
            <div className="flex flex-wrap gap-2 text-[14px]">
              {['Earphones', 'Speakers', 'Soundbars'].map(term => (
                <span key={term} className="px-4 py-2 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 text-gray-800 font-medium">
                  {term}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- CART OVERLAY --- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end lg:hidden">
          <div className="absolute inset-0 bg-black/60 anim-fade-in" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-[340px] max-w-[90vw] bg-white h-full shadow-2xl flex flex-col anim-slide-left">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-white">
              <span className="font-extrabold text-[18px]">Shopping Cart (0)</span>
              <button aria-label="Close cart" onClick={() => setIsCartOpen(false)} className="p-1">
                <IoCloseOutline className="w-7 h-7 text-gray-800" />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gray-50/50">
               <div className="w-[80px] h-[80px] bg-gray-100 rounded-full flex items-center justify-center mb-6">
                 <IoBagOutline className="w-10 h-10 text-gray-400" />
               </div>
               <p className="text-gray-900 font-bold text-[18px] mb-2">Your cart is empty</p>
               <p className="text-gray-500 text-[14px]">Looks like you haven't added anything yet.</p>
               <button onClick={() => setIsCartOpen(false)} className="mt-8 w-full bg-black text-white py-4 rounded-md font-bold text-[14px] hover:bg-gray-900 transition-colors">
                 Start Shopping
               </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
