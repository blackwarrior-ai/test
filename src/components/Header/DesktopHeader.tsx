"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { IoChevronDown } from "react-icons/io5";
import { HiOutlineSearch } from "react-icons/hi";
import { HiOutlineUser } from "react-icons/hi2";
import { IoBagOutline } from "react-icons/io5";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import { DesktopSearchDrawer } from "./DesktopSearchDrawer";
import { DesktopCartDrawer } from "./DesktopCartDrawer";
import { DesktopMegaMenu } from "./DesktopMegaMenu";

/* ── Country list ── */
const countries: { name: string; code: string }[] = [
  { name: "Australia", code: "USD $" },
  { name: "Austria", code: "USD $" },
  { name: "Belgium", code: "EUR €" },
  { name: "Canada", code: "CAD $" },
  { name: "Czechia", code: "USD $" },
  { name: "Denmark", code: "USD $" },
  { name: "Finland", code: "EUR €" },
  { name: "France", code: "EUR €" },
  { name: "Germany", code: "EUR €" },
  { name: "Hong Kong SAR", code: "USD $" },
  { name: "Pakistan", code: "USD $" },
  { name: "United Kingdom", code: "GBP £" },
  { name: "United States", code: "USD $" },
];

/* ── Announcement slides ── */
const slides = [
  { text: "Save up to 60% with code BLACKFRIDAY", href: "/shop" },
  { text: "A question? Visit our contact page", href: "/contact" },
  { text: "New arrivals: AI & Design tools added weekly", href: "/shop" },
];

/* ── Nav items ── */
const navItems = [
  { label: "Shop", href: "/shop", hasMegaMenu: true },
  { label: "Collections", href: "/shop" },
  { label: "Explore", href: "/shop" },
  { label: "Software", href: "/software" },
  { label: "Contact", href: "/contact" },
  { label: "Theme features", href: "/about" },
];

/* ── Globe SVG icon ── */
function GlobeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
    </svg>
  );
}

/* ── Currency SVG icon ── */
function CurrencyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </svg>
  );
}

export default function DesktopHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const countryRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  const [spacerHeight, setSpacerHeight] = useState(0);
  const [topBarHeight, setTopBarHeight] = useState(0);
  const [isShrunk, setIsShrunk] = useState(false);
  const [slideIdx, setSlideIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  
  const [countryOpen, setCountryOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(10); // Pakistan
  
  // Drawer & Menu states
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /* ── Measure heights ── */
  useEffect(() => {
    const measure = () => {
      if (topBarRef.current) setTopBarHeight(topBarRef.current.offsetHeight);
      if (headerRef.current && window.scrollY <= 5) setSpacerHeight(headerRef.current.offsetHeight);
    };
    measure();
    const t = setTimeout(measure, 100);
    window.addEventListener("resize", measure, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener("resize", measure); };
  }, []);

  /* ── Scroll: Native DOM transform for butter-smooth effect ── */
  useEffect(() => {
    const headerEl = headerRef.current;
    
    const handleScroll = () => {
      const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
      
      // Directly manipulate DOM to avoid React re-render shivering
      if (headerEl) {
        const offset = Math.min(scrollY, topBarHeight || 56);
        headerEl.style.transform = `translateY(-${offset}px)`;
      }
      
      setIsShrunk(scrollY > (topBarHeight || 56) + 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Init status
    return () => window.removeEventListener("scroll", handleScroll);
  }, [topBarHeight]);

  /* ── Auto-cycle slides ── */
  useEffect(() => {
    if (paused) return;
    const iv = setInterval(() => setSlideIdx(p => (p + 1) % slides.length), 4000);
    return () => clearInterval(iv);
  }, [paused]);

  /* ── Close dropdowns on outside click ── */
  useEffect(() => {
    if (!countryOpen && !langOpen) return;
    const handler = (e: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) setCountryOpen(false);
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [countryOpen, langOpen]);

  const current = countries[selectedCountry];
  const slide = slides[slideIdx];

  const handleMenuEnter = () => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setMegaMenuOpen(true);
  };

  const handleMenuLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 200); // slight delay
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed left-0 right-0 z-50 group/header will-change-transform"
      >
        {/* ── Dark Backdrop when mega menu is open ── */}
        {megaMenuOpen && (
          <div className="fixed inset-0 top-[120px] bg-black/40 backdrop-blur-sm -z-10 h-[100vh]" />
        )}

        {/* ── Announcement Bar (dark, 56px) ── */}
        <div ref={topBarRef} className="bg-[#1f1f1f] text-[rgb(250,250,250)] text-[14px] font-normal leading-[17.5px] font-[Inter,sans-serif]">
          <div className="max-w-[1585px] w-full mx-auto px-[36px] h-[56px] flex items-center justify-between">

            {/* Left: Social icons */}
            <div className="flex items-center gap-[24px]">
              <Link href="#" aria-label="Facebook" className="hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0"><path d="M9.03153 23L9 13H5V9H9V6.5C9 2.7886 11.2983 1 14.6091 1C16.1951 1 17.5581 1.11807 17.9553 1.17085V5.04948L15.6591 5.05052C13.8584 5.05052 13.5098 5.90614 13.5098 7.16171V9H18.75L16.75 13H13.5098V23H9.03153Z"/></svg>
              </Link>
              <Link href="#" aria-label="X" className="hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0"><path d="M13.8984 10.4679L21.3339 2H19.5687L13.1074 9.35221L7.95337 2H2L9.80183 13.1157L2 22H3.7652L10.5845 14.2315L16.03 22H21.9833M4.398 3.29892H7.10408L19.5687 20.7594H16.8626"/></svg>
              </Link>
              <Link href="#" aria-label="Instagram" className="hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0"><path d="M12 2.98C14.94 2.98 15.28 2.99 16.44 3.04C17.14 3.04 17.83 3.18 18.48 3.42C18.96 3.6 19.39 3.88 19.75 4.24C20.12 4.59 20.4 5.03 20.57 5.51C20.81 6.16 20.94 6.85 20.95 7.55C21 8.71 21.01 9.06 21.01 12C21.01 14.94 21 15.28 20.95 16.44C20.95 17.14 20.81 17.83 20.57 18.48C20.39 18.95 20.11 19.39 19.75 19.75C19.39 20.11 18.96 20.39 18.48 20.57C17.83 20.81 17.14 20.94 16.44 20.95C15.28 21 14.93 21.01 12 21.01C9.07 21.01 8.72 21 7.55 20.95C6.85 20.95 6.16 20.81 5.51 20.57C5.03 20.39 4.6 20.11 4.24 19.75C3.87 19.4 3.59 18.96 3.42 18.48C3.18 17.83 3.05 17.14 3.04 16.44C2.99 15.28 2.98 14.93 2.98 12C2.98 9.07 2.99 8.72 3.04 7.55C3.04 6.85 3.18 6.16 3.42 5.51C3.6 5.03 3.88 4.6 4.24 4.24C4.59 3.87 5.03 3.59 5.51 3.42C6.16 3.18 6.85 3.05 7.55 3.04C8.71 2.99 9.06 2.98 12 2.98ZM12 1C9.01 1 8.64 1.01 7.47 1.07C6.56 1.09 5.65 1.26 4.8 1.58C4.07 1.86 3.4 2.3 2.85 2.85C2.3 3.41 1.86 4.07 1.58 4.8C1.26 5.65 1.09 6.56 1.07 7.47C1.02 8.64 1 9.01 1 12C1 14.99 1.01 15.36 1.07 16.53C1.09 17.44 1.26 18.35 1.58 19.2C1.86 19.93 2.3 20.6 2.85 21.15C3.41 21.7 4.07 22.14 4.8 22.42C5.65 22.74 6.56 22.91 7.47 22.93C8.64 22.98 9.01 23 12 23C14.99 23 15.36 22.99 16.53 22.93C17.44 22.91 18.35 22.74 19.2 22.42C19.93 22.14 20.6 21.7 21.15 21.15C21.7 20.59 22.14 19.93 22.42 19.2C22.74 18.35 22.91 17.44 22.93 16.53C22.98 15.36 23 14.99 23 12C23 9.01 22.99 8.64 22.93 7.47C22.91 6.56 22.74 5.65 22.42 4.8C22.14 4.07 21.7 3.4 21.15 2.85C20.59 2.3 19.93 1.86 19.2 1.58C18.35 1.26 17.44 1.09 16.53 1.07C15.36 1.02 14.99 1 12 1ZM12 6.35C10.88 6.35 9.79 6.68 8.86 7.3C7.93 7.92 7.21 8.8 6.78 9.84C6.35 10.87 6.24 12.01 6.46 13.1C6.68 14.2 7.22 15.2 8.01 15.99C8.8 16.78 9.81 17.32 10.9 17.54C12 17.76 13.13 17.65 14.16 17.22C15.19 16.79 16.07 16.07 16.7 15.14C17.32 14.21 17.65 13.12 17.65 12C17.65 10.5 17.05 9.06 16 8.01C14.94 6.95 13.5 6.36 12.01 6.36L12 6.35ZM12 15.67C11.27 15.67 10.57 15.45 9.96 15.05C9.36 14.65 8.89 14.07 8.61 13.4C8.33 12.73 8.26 11.99 8.4 11.28C8.54 10.57 8.89 9.92 9.4 9.4C9.91 8.88 10.57 8.54 11.28 8.4C11.99 8.26 12.73 8.33 13.4 8.61C14.07 8.89 14.64 9.36 15.05 9.96C15.45 10.56 15.67 11.27 15.67 12C15.67 12.97 15.28 13.91 14.6 14.59C13.91 15.28 12.98 15.66 12.01 15.66L12 15.67ZM17.87 7.45C18.6 7.45 19.19 6.86 19.19 6.13C19.19 5.4 18.6 4.81 17.87 4.81C17.14 4.81 16.55 5.4 16.55 6.13C16.55 6.86 17.14 7.45 17.87 7.45Z"/></svg>
              </Link>
              <Link href="#" aria-label="YouTube" className="hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0"><path d="M23.8 7.6C23.8 7.6 23.6 5.9 22.8 5.2C21.9 4.2 20.9 4.2 20.4 4.2C17 4 12 4 12 4C12 4 7 4 3.6 4.2C3.1 4.3 2.1 4.3 1.2 5.2C0.5 5.9 0.2 7.6 0.2 7.6C0.2 7.6 0 9.5 0 11.5V13.3C0 15.2 0.2 17.2 0.2 17.2C0.2 17.2 0.4 18.9 1.2 19.6C2.1 20.6 3.3 20.5 3.8 20.6C5.7 20.8 12 20.8 12 20.8C12 20.8 17 20.8 20.4 20.5C20.9 20.4 21.9 20.4 22.8 19.5C23.5 18.8 23.8 17.1 23.8 17.1C23.8 17.1 24 15.2 24 13.2V11.4C24 9.5 23.8 7.6 23.8 7.6ZM9.5 15.5V8.8L16 12.2L9.5 15.5Z"/></svg>
              </Link>
            </div>

            {/* Center: Slide carousel */}
            <div className="flex items-center absolute left-1/2 -translate-x-1/2">
              <button
                onClick={() => setSlideIdx(p => (p - 1 + slides.length) % slides.length)}
                className="hover:text-white transition-colors text-[16px] leading-none flex items-center justify-center w-[44px] h-[56px] shrink-0"
                aria-label="Previous"
              >
                <svg width="16" height="16" viewBox="0 0 15 14" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.33333 2.91675L2.25 7.00004M2.25 7.00004L6.33333 11.0834M2.25 7.00004H12.75"></path>
                </svg>
              </button>

              <div className="w-[448px] h-[56px] flex justify-center items-center overflow-hidden">
                <Link key={slideIdx} href={slide.href} className="ann-slide hover:text-white transition-colors tracking-[0.01em] text-center px-4 w-full truncate">
                  {slide.text}
                </Link>
              </div>

              <button
                onClick={() => setSlideIdx(p => (p + 1) % slides.length)}
                className="hover:text-white transition-colors text-[16px] leading-none flex items-center justify-center w-[44px] h-[56px] shrink-0"
                aria-label="Next"
              >
                <svg width="16" height="16" viewBox="0 0 15 14" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.00004H12.75M12.75 7.00004L8.66667 2.91675M12.75 7.00004L8.66667 11.0834"></path>
                </svg>
              </button>
              <button
                onClick={() => setPaused(v => !v)}
                className="sr-only"
                aria-label={paused ? "Play slideshow" : "Pause slideshow"}
              >
                {paused ? "Play" : "Pause"}
              </button>
            </div>

            {/* Right: Language + Country */}
            <div className="flex items-center gap-[28px]">
              {/* Language */}
              <div ref={langRef} className="relative z-[110]">
                <button
                  onClick={() => setLangOpen(v => !v)}
                  className="flex items-center gap-[6px] hover:text-white transition-colors"
                >
                  <GlobeIcon />
                  <span>English</span>
                  <IoChevronDown className={`w-[10px] h-[10px] ml-1 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
                </button>
                {langOpen && (
                  <div className="absolute right-0 top-full mt-[10px] w-[140px] rounded-md bg-[#1f1f1f] border border-white/10 shadow-2xl py-1 text-[rgb(250,250,250)]">
                    {["English", "French", "German", "Spanish"].map(lang => (
                      <button key={lang} onClick={() => setLangOpen(false)} className="w-full px-4 py-2.5 text-left text-[13px] hover:bg-white/10 transition-colors">
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Country */}
              <div ref={countryRef} className="relative z-[110]">
                <button
                  onClick={() => setCountryOpen(v => !v)}
                  className="flex items-center gap-[6px] hover:text-white transition-colors"
                >
                  <CurrencyIcon />
                  <span>{current.name} ({current.code})</span>
                  <IoChevronDown className={`w-[10px] h-[10px] ml-1 transition-transform duration-200 ${countryOpen ? "rotate-180" : ""}`} />
                </button>
                {countryOpen && (
                  <div className="absolute right-0 top-full mt-[10px] w-[240px] max-h-[360px] overflow-y-auto rounded-md bg-[#1f1f1f] border border-white/10 shadow-2xl py-1 text-[rgb(250,250,250)]">
                    {countries.map((c, i) => (
                      <button
                        key={c.name}
                        onClick={() => { setSelectedCountry(i); setCountryOpen(false); }}
                        className={`w-full flex items-center justify-between px-4 py-2.5 text-left text-[13px] transition-colors ${i === selectedCountry ? "bg-white/10 font-semibold" : "hover:bg-white/10"}`}
                      >
                        <span>{c.name}</span>
                        <span className="opacity-50">{c.code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Main Header (white) ── */}
        <div 
          className={`relative bg-white flex items-center transition-all duration-500 will-change-[height,box-shadow] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
            isShrunk ? "h-[96px] shadow-[0_8px_30px_rgba(0,0,0,0.08)]" : "h-[113px] shadow-none"
          }`}
        >
          <div className="max-w-[1347px] w-full mx-auto px-[36px] flex items-center gap-8">

            {/* Logo */}
            <Link href="/" className="shrink-0 flex items-center min-w-[120px] px-2">
              <img 
                src="/digilink-logo-mobile.svg" 
                alt="Digilink" 
                className="h-[52px] w-auto transition-all duration-300" 
                style={{ imageRendering: 'high-quality' as any, transform: 'translateZ(0)' }}
              />
            </Link>

            {/* Center Nav */}
            <nav className="flex-1 flex items-center justify-center gap-8 h-full">
              {navItems.map(item => (
                <div 
                  key={item.label}
                  className="h-full flex items-center"
                  onMouseEnter={item.hasMegaMenu ? handleMenuEnter : undefined}
                  onMouseLeave={item.hasMegaMenu ? handleMenuLeave : undefined}
                >
                  <Link
                    href={item.href}
                    aria-label={item.label}
                    className="group/nav-link relative overflow-hidden h-[20px] flex flex-col whitespace-nowrap"
                  >
                    <span className="text-[17px] font-medium text-[#171717] antialiased leading-[20px] transition-transform duration-300 ease-out group-hover/nav-link:-translate-y-full">
                      {item.label}
                    </span>
                    <span className="text-[17px] font-medium text-[#171717] antialiased leading-[20px] transition-transform duration-300 ease-out group-hover/nav-link:-translate-y-full" aria-hidden="true">
                      {item.label}
                    </span>
                  </Link>
                </div>
              ))}
            </nav>

            {/* Right: 3 icons */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="w-11 h-11 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                aria-label="Search"
              >
                <HiOutlineSearch className="w-[24px] h-[24px]" />
              </button>
              {/* Account */}
              <Link
                href="/account"
                className="w-11 h-11 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                aria-label="Account"
              >
                <HiOutlineUser className="w-[24px] h-[24px]" />
              </Link>
              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative w-11 h-11 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                aria-label="Cart"
              >
                <IoBagOutline className="w-[25px] h-[25px]" />
                <span className="absolute top-[6px] right-[4px] w-[18px] h-[18px] bg-[#90d03b] text-[#1a2e05] rounded-full flex items-center justify-center text-[10px] font-bold border border-white">
                  0
                </span>
              </button>
            </div>
          </div>

          {/* Mega Menu Overlay inside header flow */}
          <DesktopMegaMenu 
            isOpen={megaMenuOpen} 
            onMouseEnter={handleMenuEnter}
            onMouseLeave={handleMenuLeave}
          />
        </div>
      </header>

      {/* Spacer */}
      <div aria-hidden="true" style={{ height: spacerHeight }} />

      {/* Drawers outside the fixed header flow */}
      <DesktopSearchDrawer isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <DesktopCartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      {/* Separation line below header (only visible when not shrunk) */}
      {!isShrunk && (
        <div className="w-full h-px bg-gray-200 absolute left-0 -bottom-px z-10" />
      )}
    </>
  );
}
