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
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartClosing, setIsCartClosing] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isCurrencyClosing, setIsCurrencyClosing] = useState(false);

  const closeMenu = () => {
    setIsMenuClosing(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsMenuClosing(false);
    }, 300);
  };

  const closeCurrency = () => {
    setIsCurrencyClosing(true);
    setTimeout(() => {
      setIsCurrencyOpen(false);
      setIsCurrencyClosing(false);
    }, 300);
  };

  const closeCart = () => {
    setIsCartClosing(true);
    setTimeout(() => {
      setIsCartOpen(false);
      setIsCartClosing(false);
    }, 300);
  };

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
        @keyframes slideLeftOut { from { transform: translateX(0); } to { transform: translateX(100%); } }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes slideDown { from { transform: translateY(0); } to { transform: translateY(100%); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
        .anim-slide-right { animation: slideRight 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .anim-slide-left { animation: slideLeft 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .anim-slide-left-out { animation: slideLeftOut 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .anim-slide-up { animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .anim-slide-down { animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .anim-fade-in { animation: fadeIn 0.2s ease-out forwards; }
        .anim-fade-out { animation: fadeOut 0.25s ease-in forwards; }
      `}</style>

      {/* --- MENU OVERLAY (Floating Bottom Sheet) --- */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end lg:hidden">
          <div className={`absolute inset-0 bg-black/50 ${isMenuClosing ? 'anim-fade-out' : 'anim-fade-in'}`} onClick={closeMenu} />
          <div className={`relative flex flex-col items-center ${isMenuClosing ? 'anim-slide-down' : 'anim-slide-up'}`}>
            
            {/* Close button — outside the card */}
            <button 
              aria-label="Close menu" 
              onClick={closeMenu} 
              className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-2 shadow-lg"
            >
              <IoCloseOutline className="w-5 h-5 text-gray-800" />
            </button>

            {/* White card */}
            <div className="bg-white rounded-[6px] shadow-2xl flex flex-col min-h-[65vh] max-h-[70vh] mx-2 mb-2 w-[calc(100%-16px)]">

            {/* Nav Links */}
            <nav className="flex flex-col px-6 pt-4 pb-6 overflow-y-auto font-[var(--font-barlow)]">
              {[
                { label: "Shop", href: "/shop", hasArrow: true },
                { label: "AI Tools", href: "/shop", hasArrow: true },
                { label: "Design & Creative", href: "/shop" },
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className="flex items-center justify-between py-1.5"
                >
                  <span className="text-gray-900 text-[24px] font-bold">{item.label}</span>
                  {item.hasArrow && (
                    <span className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-900">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Sign In / Sign Up */}
            <div className="mx-6 mb-4">
              <Link href="/signin" onClick={closeMenu} className="block w-full bg-gray-900 text-white text-center py-3 rounded-[6px] text-[14px] font-semibold font-[var(--font-barlow)]">
                Sign In / Sign Up
              </Link>
            </div>

            {/* Bottom: Social + Account */}
            <div className="px-6 pt-4 pb-6 border-t border-gray-100 mt-auto font-[var(--font-barlow)]">
              {/* Social Icons */}
              <div className="flex items-center gap-5 mb-5">
                {/* Facebook */}
                <a href="#" className="text-gray-900 hover:text-gray-900 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                </a>
                {/* X (Twitter) */}
                <a href="#" className="text-gray-900 hover:text-gray-900 transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                {/* Instagram */}
                <a href="#" className="text-gray-900 hover:text-gray-900 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
                </a>
                {/* YouTube */}
                <a href="#" className="text-gray-900 hover:text-gray-900 transition-colors">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>

              {/* Currency */}
              <div className="flex items-center gap-6 text-[14px]">
                <button onClick={() => setIsCurrencyOpen(true)} className="flex items-center gap-1.5 text-gray-900 font-medium">
                  USD $
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
                </button>
              </div>
            </div>

          </div>
          </div>

          {/* --- COUNTRY SELECTOR (over menu) --- */}
          {isCurrencyOpen && (
            <div className="absolute inset-0 z-[10] flex flex-col justify-end">
              <div className={`absolute inset-0 bg-black/30 ${isCurrencyClosing ? 'anim-fade-out' : 'anim-fade-in'}`} onClick={closeCurrency} />
              <div className={`relative flex flex-col items-center ${isCurrencyClosing ? 'anim-slide-down' : 'anim-slide-up'}`}>
                <button
                  aria-label="Close currency"
                  onClick={closeCurrency}
                  className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-2 shadow-lg"
                >
                  <IoCloseOutline className="w-5 h-5 text-gray-800" />
                </button>
                <div className="bg-white rounded-[10px] shadow-2xl flex flex-col max-h-[60vh] mx-3 mb-3 w-[calc(100%-24px)]">
                  <h3 className="text-center text-[16px] font-semibold text-gray-900 pt-5 pb-4 border-b border-gray-100">Country</h3>
                  <div className="flex flex-col overflow-y-auto">
                    {[
                      { flag: "🇨🇦", label: "Canada (CAD $)" },
                      { flag: "🇫🇷", label: "France (EUR €)" },
                      { flag: "🇭🇰", label: "Hong Kong SAR (HKD $)" },
                      { flag: "🇯🇵", label: "Japan (JPY ¥)" },
                      { flag: "🇬🇧", label: "United Kingdom (GBP £)" },
                      { flag: "🇺🇸", label: "United States (USD $)" },
                    ].map((c) => (
                      <button
                        key={c.label}
                        onClick={closeCurrency}
                        className="flex items-center gap-3 px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-[20px]">{c.flag}</span>
                        <span className="text-[15px] text-gray-800">{c.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

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
              {['ChatGPT', 'Canva Pro', 'NordVPN', 'Midjourney'].map(term => (
                <span key={term} className="px-4 py-2 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 text-gray-800 font-medium">
                  {term}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- CART OVERLAY (Full page, slides from right) --- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end lg:hidden p-2">
          <div className={`absolute inset-0 bg-black/50 ${isCartClosing ? 'anim-fade-out' : 'anim-fade-in'}`} onClick={closeCart} />
          <div className={`relative w-full h-full bg-white rounded-[6px] shadow-2xl flex flex-col ${isCartClosing ? 'anim-slide-left-out' : 'anim-slide-left'}`}>
            
            {/* Top bar with X */}
            <div className="flex items-center justify-end px-4 pt-4">
              <button 
                aria-label="Close cart" 
                onClick={closeCart}
              >
                <IoCloseOutline className="w-6 h-6 text-gray-900" />
              </button>
            </div>

            {/* Cart content — centered */}
            <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
              <div className="relative mb-4">
                <IoBagOutline className="w-10 h-10 text-gray-900" />
                <span className="absolute -top-1 -right-2 w-5 h-5 bg-gray-900 text-white text-[11px] font-bold rounded-full flex items-center justify-center">0</span>
              </div>
              <p className="text-gray-900 font-bold text-[16px] font-[var(--font-barlow)] mb-6">Your cart is empty</p>
              <button 
                onClick={closeCart} 
                className="bg-gray-900 text-white py-3.5 px-10 rounded-full font-bold text-[14px] font-[var(--font-barlow)]"
              >
                Continue shopping
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
