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
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
    </svg>
  );
}

/* ── Currency SVG icon ── */
function CurrencyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
  const [headerOffset, setHeaderOffset] = useState(0);
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

  /* ── Scroll: slide announcement bar up ── */
  const handleScroll = useCallback(() => {
    setHeaderOffset(Math.min(window.scrollY, topBarHeight));
  }, [topBarHeight]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

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
        className="fixed left-0 right-0 z-50 group/header"
        style={{ top: `-${headerOffset}px` }}
      >
        {/* ── Dark Backdrop when mega menu is open ── */}
        {megaMenuOpen && (
          <div className="fixed inset-0 top-[120px] bg-black/40 backdrop-blur-sm -z-10 h-[100vh]" />
        )}

        {/* ── Announcement Bar (dark, 40px) ── */}
        <div ref={topBarRef} className="bg-[#1f1f1f] text-[#fafafa] text-[12px] font-medium font-[Inter,sans-serif]">
          <div className="max-w-[1347px] mx-auto px-[36px] h-[40px] flex items-center justify-between">

            {/* Left: Social icons */}
            <div className="flex items-center gap-[24px]">
              <Link href="#" aria-label="Facebook" className="opacity-70 hover:opacity-100 transition-opacity">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15.12 5.35H17V2.14H14.54C11.63 2.14 10.45 3.79 10.45 6.07V8.16H7.94V11.23H10.46V19H14.03V11.23H17.14L17.47 8.16H14.03V6.66C14.03 5.76 14.39 5.35 15.12 5.35Z"/></svg>
              </Link>
              <Link href="#" aria-label="X" className="opacity-70 hover:opacity-100 transition-opacity">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M13.8984 10.4679L23.2325 0H21.0183L12.914 9.07186L6.44146 0H0L9.78911 13.6338L0 24.5938H2.21443L10.7725 15.0298L17.6166 24.5938H24.0575L13.898 10.4679H13.8984ZM11.8967 13.7744L10.9038 12.4042L3.01358 1.5173H6.41505L12.7788 10.2982L13.7717 11.6683L22.0195 23.0487H20.6179L11.8967 13.7747V13.7744Z"/></svg>
              </Link>
              <Link href="#" aria-label="Instagram" className="opacity-70 hover:opacity-100 transition-opacity">
                <FaInstagram className="w-[15px] h-[15px]" />
              </Link>
              <Link href="#" aria-label="YouTube" className="opacity-70 hover:opacity-100 transition-opacity">
                <FaYoutube className="w-[16px] h-[16px]" />
              </Link>
            </div>

            {/* Center: Slide carousel */}
            <div className="flex items-center gap-[18px] absolute left-1/2 -translate-x-1/2">
              <button
                onClick={() => setSlideIdx(p => (p - 1 + slides.length) % slides.length)}
                className="opacity-50 hover:opacity-100 transition-opacity text-[16px] leading-none flex items-center justify-center w-[20px] h-[20px]"
                aria-label="Previous"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              </button>
              <Link key={slideIdx} href={slide.href} className="ann-slide hover:opacity-100 transition-opacity tracking-[0.01em]">
                {slide.text}
              </Link>
              <button
                onClick={() => setSlideIdx(p => (p + 1) % slides.length)}
                className="opacity-50 hover:opacity-100 transition-opacity text-[16px] leading-none flex items-center justify-center w-[20px] h-[20px]"
                aria-label="Next"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
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
                  className="flex items-center gap-[6px] opacity-80 hover:opacity-100 transition-opacity"
                >
                  <GlobeIcon />
                  <span>English</span>
                  <IoChevronDown className={`w-[10px] h-[10px] ml-1 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
                </button>
                {langOpen && (
                  <div className="absolute right-0 top-full mt-[10px] w-[140px] rounded-md bg-[#1f1f1f] border border-white/10 shadow-2xl py-1 text-[#fafafa]">
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
                  className="flex items-center gap-[6px] opacity-80 hover:opacity-100 transition-opacity"
                >
                  <CurrencyIcon />
                  <span>{current.name} ({current.code})</span>
                  <IoChevronDown className={`w-[10px] h-[10px] ml-1 transition-transform duration-200 ${countryOpen ? "rotate-180" : ""}`} />
                </button>
                {countryOpen && (
                  <div className="absolute right-0 top-full mt-[10px] w-[240px] max-h-[360px] overflow-y-auto rounded-md bg-[#1f1f1f] border border-white/10 shadow-2xl py-1 text-[#fafafa]">
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
        <div className="relative bg-white h-[80px] flex items-center shadow-sm">
          <div className="max-w-[1347px] w-full mx-auto px-[36px] flex items-center gap-8">

            {/* Logo */}
            <Link href="/" className="shrink-0 flex items-center">
              <span className="font-[var(--font-logo)] text-[28px] font-extrabold tracking-[0.04em] text-gray-900">
                Digilink<span className="logo-dot">.</span>
              </span>
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
                    <span className="text-[16px] font-medium text-gray-800 leading-[20px] transition-transform duration-300 ease-out group-hover/nav-link:-translate-y-full">
                      {item.label}
                    </span>
                    <span className="text-[16px] font-bold text-gray-900 leading-[20px] transition-transform duration-300 ease-out group-hover/nav-link:-translate-y-full" aria-hidden="true">
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
                <HiOutlineSearch className="w-[22px] h-[22px]" />
              </button>
              {/* Account */}
              <Link
                href="/account"
                className="w-11 h-11 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                aria-label="Account"
              >
                <HiOutlineUser className="w-[22px] h-[22px]" />
              </Link>
              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative w-11 h-11 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                aria-label="Cart"
              >
                <IoBagOutline className="w-[23px] h-[23px]" />
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
    </>
  );
}
