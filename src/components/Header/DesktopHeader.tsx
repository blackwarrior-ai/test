"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { HiOutlineSearch } from "react-icons/hi";
import { SlLocationPin } from "react-icons/sl";
import { HiOutlineUser } from "react-icons/hi2";
import { IoBagOutline } from "react-icons/io5";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

/* ── Country list with CSS flag colours ── */
const countries: { name: string; code: string; flag: React.ReactNode }[] = [
  {
    name: "Australia",
    code: "USD $",
    flag: (
      <span className="inline-flex w-[20px] h-[14px] rounded-[2px] overflow-hidden shrink-0 bg-[#00008B] relative">
        <span className="absolute inset-0 flex items-center justify-center text-white text-[8px] leading-none font-bold">🇦🇺</span>
      </span>
    ),
  },
  {
    name: "Austria",
    code: "USD $",
    flag: (
      <span className="inline-flex w-[20px] h-[14px] rounded-[2px] overflow-hidden shrink-0 flex-col">
        <span className="w-full h-1/3 bg-[#EF3340]" />
        <span className="w-full h-1/3 bg-white" />
        <span className="w-full h-1/3 bg-[#EF3340]" />
      </span>
    ),
  },
  {
    name: "Belgium",
    code: "USD $",
    flag: (
      <span className="inline-flex w-[20px] h-[14px] rounded-[2px] overflow-hidden shrink-0">
        <span className="w-1/3 h-full bg-black" />
        <span className="w-1/3 h-full bg-[#FDDA24]" />
        <span className="w-1/3 h-full bg-[#EF3340]" />
      </span>
    ),
  },
  {
    name: "Canada",
    code: "USD $",
    flag: (
      <span className="inline-flex w-[20px] h-[14px] rounded-[2px] overflow-hidden shrink-0 items-center justify-center text-[10px] leading-none">🇨🇦</span>
    ),
  },
  {
    name: "Czechia",
    code: "USD $",
    flag: (
      <span className="inline-flex w-[20px] h-[14px] rounded-[2px] overflow-hidden shrink-0 items-center justify-center text-[10px] leading-none">🇨🇿</span>
    ),
  },
  {
    name: "Denmark",
    code: "USD $",
    flag: (
      <span className="inline-flex w-[20px] h-[14px] rounded-[2px] overflow-hidden shrink-0 items-center justify-center text-[10px] leading-none">🇩🇰</span>
    ),
  },
  {
    name: "Finland",
    code: "USD $",
    flag: (
      <span className="inline-flex w-[20px] h-[14px] rounded-[2px] overflow-hidden shrink-0 items-center justify-center text-[10px] leading-none">🇫🇮</span>
    ),
  },
  {
    name: "France",
    code: "USD $",
    flag: (
      <span className="inline-flex w-[20px] h-[14px] rounded-[2px] overflow-hidden shrink-0">
        <span className="w-1/3 h-full bg-[#002395]" />
        <span className="w-1/3 h-full bg-white" />
        <span className="w-1/3 h-full bg-[#EF4135]" />
      </span>
    ),
  },
  {
    name: "Germany",
    code: "USD $",
    flag: (
      <span className="inline-flex w-[20px] h-[14px] rounded-[2px] overflow-hidden shrink-0 flex-col">
        <span className="w-full h-1/3 bg-black" />
        <span className="w-full h-1/3 bg-[#DD0000]" />
        <span className="w-full h-1/3 bg-[#FFCC00]" />
      </span>
    ),
  },
  {
    name: "Hong Kong SAR",
    code: "USD $",
    flag: (
      <span className="inline-flex w-[20px] h-[14px] rounded-[2px] overflow-hidden shrink-0 items-center justify-center text-[10px] leading-none">🇭🇰</span>
    ),
  },
];

/* ── Nav items with dropdowns ── */
const navItems: {
  label: string;
  href: string;
  hasDropdown: boolean;
  isHighlighted?: boolean;
  children?: { label: string; href: string; desc?: string }[];
}[] = [
  {
    label: "Shop All",
    href: "/shop",
    hasDropdown: true,
    children: [
      { label: "AI Assistants", href: "/shop?cat=ai-assistants", desc: "ChatGPT, Gemini, Grok & more" },
      { label: "Design Tools", href: "/shop?cat=design-tools", desc: "Canva, Midjourney, Adobe" },
      { label: "Coding", href: "/shop?cat=coding", desc: "GitHub Copilot & dev tools" },
      { label: "Privacy & VPN", href: "/shop?cat=privacy", desc: "NordVPN, Surfshark & more" },
      { label: "View All Products", href: "/shop" },
    ],
  },
  {
    label: "AI Tools",
    href: "/shop?cat=ai-assistants",
    hasDropdown: true,
    children: [
      { label: "ChatGPT Plus", href: "/products/chatgpt-private" },
      { label: "Gemini Pro", href: "/products/gemini-pro" },
      { label: "SuperGrok", href: "/products/supergrok" },
      { label: "Perplexity Pro", href: "/products/perplexity-pro" },
    ],
  },
  {
    label: "Design & Creative",
    href: "/shop?cat=design-tools",
    hasDropdown: true,
    children: [
      { label: "Canva Pro", href: "/products/canva-pro" },
      { label: "Midjourney Pro", href: "/products/midjourney-pro" },
      { label: "Adobe Creative Cloud", href: "/products/adobe-creative-cloud" },
    ],
  },
  {
    label: "Productivity",
    href: "/shop?cat=productivity",
    hasDropdown: false,
  },
  {
    label: "About",
    href: "/about",
    hasDropdown: true,
    children: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  { label: "Contact", href: "/contact", hasDropdown: false },
  { label: "On Sale", href: "/shop", hasDropdown: false, isHighlighted: true },
];

/* ── Animated hamburger / cross icon ── */
function MenuIcon({ open }: { open: boolean }) {
  return (
    <div className="w-[22px] h-[16px] relative flex flex-col justify-between">
      <span
        className={`block h-[2px] w-full bg-gray-900 rounded transition-all duration-300 ease-in-out origin-center ${
          open ? "translate-y-[7px] rotate-45" : ""
        }`}
      />
      <span
        className={`block h-[2px] w-full bg-gray-900 rounded transition-all duration-300 ease-in-out ${
          open ? "opacity-0 scale-x-0" : "opacity-100"
        }`}
      />
      <span
        className={`block h-[2px] w-full bg-gray-900 rounded transition-all duration-300 ease-in-out origin-center ${
          open ? "-translate-y-[7px] -rotate-45" : ""
        }`}
      />
    </div>
  );
}

export default function DesktopHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [spacerHeight, setSpacerHeight] = useState(0);
  const [topBarHeight, setTopBarHeight] = useState(0);
  const [headerOffset, setHeaderOffset] = useState(0);
  const [navCollapsed, setNavCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [selected, setSelected] = useState(2); // Belgium default
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Measure heights
  useEffect(() => {
    const measure = () => {
      if (headerRef.current && window.scrollY <= 5) {
        setSpacerHeight(headerRef.current.offsetHeight);
      }
      if (topBarRef.current) {
        setTopBarHeight(topBarRef.current.offsetHeight);
      }
    };
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, []);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const offset = Math.min(scrollY, topBarHeight);
    setHeaderOffset(offset);
    const collapsed = scrollY > topBarHeight;
    setNavCollapsed(collapsed);
    if (!collapsed) setMenuOpen(false);
  }, [topBarHeight]);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close country dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCountryOpen(false);
      }
    }
    if (countryOpen) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [countryOpen]);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const showNav = !navCollapsed || menuOpen;
  const current = countries[selected];

  return (
    <>
      <header
        ref={headerRef}
        className="fixed left-0 right-0 z-50 text-[15px] font-medium antialiased"
        style={{ top: `-${headerOffset}px` }}
      >
        {/* Tier 1 – Announcement Bar */}
        <div ref={topBarRef} className="bg-[#1D349A] text-white">
          <div className="max-w-[1347px] mx-auto px-[16px] py-3 grid grid-cols-3 gap-8">
            {/* Left Links */}
            <div className="flex items-center gap-5">
              <Link href="/help" className="hover:text-gray-200 transition-colors duration-200">
                Help Center
              </Link>
              <Link href="/find-store" className="hover:text-gray-200 transition-colors duration-200">
                Find a Store
              </Link>
              <Link href="/contact" className="hover:text-gray-200 transition-colors duration-200">
                Contact
              </Link>
            </div>

            {/* Center Announcement */}
            <div className="text-center">
              <span className="tracking-wide">🤚 Free Express Shipping on orders $500!</span>
            </div>

            {/* Right Section */}
            <div className="flex items-center justify-end gap-4">
              {/* Country Selector with Dropdown */}
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setCountryOpen((v) => !v)}
                  className="flex items-center gap-1.5 hover:text-gray-200 transition-colors duration-200"
                >
                  {current.flag}
                  <span>{current.name} ({current.code})</span>
                  <IoChevronUp
                    className={`w-3 h-3 transition-transform duration-200 ${
                      countryOpen ? "rotate-0" : "rotate-180"
                    }`}
                  />
                </button>

                {countryOpen && (
                  <div className="absolute right-0 top-full mt-3 w-[260px] max-h-[400px] overflow-y-auto rounded-md bg-[#1D349A] border border-white/15 shadow-2xl z-[100] py-1">
                    {countries.map((country, i) => (
                      <button
                        key={country.name}
                        onClick={() => {
                          setSelected(i);
                          setCountryOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-150 ${
                          i === selected ? "bg-white/10 font-bold" : "hover:bg-white/10"
                        }`}
                      >
                        {country.flag}
                        <span className={i === selected ? "underline underline-offset-2" : ""}>
                          {country.name}（{country.code}）
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-3.5 ml-3">
                <Link href="#" className="hover:text-gray-200 transition-colors duration-200" aria-label="Facebook">
                  <FaFacebookF className="w-3.5 h-3.5" />
                </Link>
                <Link href="#" className="hover:text-gray-200 transition-colors duration-200" aria-label="Twitter">
                  <FaXTwitter className="w-3.5 h-3.5" />
                </Link>
                <Link href="#" className="hover:text-gray-200 transition-colors duration-200" aria-label="Instagram">
                  <FaInstagram className="w-3.5 h-3.5" />
                </Link>
                <Link href="#" className="hover:text-gray-200 transition-colors duration-200" aria-label="TikTok">
                  <FaTiktok className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Tier 2 – Main Header */}
        <div className="bg-white transition-colors duration-200">
          <div className="max-w-[1347px] mx-auto py-[20px] px-[16px]">
            <div className="w-full h-[48px] flex items-center gap-x-[1.2rem]">

              {/* Hamburger + Logo group */}
              <div className="flex items-center shrink-0 mr-[1.2rem]">
                <button
                  onClick={toggleMenu}
                  className={`flex items-center h-10 transition-all duration-300 ease-in-out ${
                    navCollapsed
                      ? "opacity-100 w-[34px]"
                      : "opacity-0 w-0 overflow-hidden pointer-events-none"
                  }`}
                  aria-label={menuOpen ? "Close menu" : "Open menu"}
                >
                  <MenuIcon open={menuOpen} />
                </button>

                <Link href="/">
                  <span className="font-[var(--font-logo)] text-[28px] font-extrabold tracking-[0.04em] text-gray-900">
                    Digilink<span className="logo-dot">.</span>
                  </span>
                </Link>
              </div>

              {/* Search Bar */}
              <div className="flex-1 flex items-center justify-start">
                <div className="flex w-[600px] h-[48px] items-center rounded-full overflow-hidden bg-[#EDEDED] transition-colors duration-200">
                  <Link href="/shop" className="flex items-center gap-1.5 px-5 h-[48px] text-gray-700 whitespace-nowrap border-r border-gray-300 bg-[#E0E0E0] hover:bg-[#D5D5D5] transition-colors duration-200">
                    All Categories
                    <IoChevronDown className="w-3.5 h-3.5 text-gray-500" />
                  </Link>
                  <form action="/search" method="get" className="flex-1 flex items-center">
                    <input
                      type="text"
                      name="q"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="What are you looking for?"
                      className="flex-1 h-[48px] px-4 text-gray-700 placeholder-gray-400 outline-none bg-transparent"
                    />
                    <button
                      type="submit"
                      className="flex items-center justify-center w-[46px] h-[48px] text-gray-600 hover:text-gray-900 transition-colors duration-200"
                      aria-label="Search"
                    >
                      <HiOutlineSearch className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              </div>

              {/* Right: Icons */}
              <div className="flex items-center justify-end gap-4 shrink-0">
                <Link
                  href="/find-store"
                  className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors duration-200 whitespace-nowrap"
                >
                  <SlLocationPin className="w-[18px] h-[18px]" />
                  <span>Find a store</span>
                </Link>

                <Link
                  href="/account"
                  className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors duration-200 whitespace-nowrap"
                >
                  <HiOutlineUser className="w-5 h-5" />
                  <span>Sign in/ Register</span>
                </Link>

                <button
                  onClick={() => window.location.href = '/cart'}
                  className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  aria-label="Cart"
                >
                  <IoBagOutline className="w-[22px] h-[22px] text-gray-700" />
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Tier 3 – Bottom Nav: fast slide */}
        <div
          className={`overflow-hidden bg-white transition-all duration-200 ease-out ${
            showNav ? "max-h-[60px]" : "max-h-0"
          }`}
        >
          <div className="bg-white border-b border-gray-200">
            <div className="max-w-[1347px] mx-auto px-[16px]">
              <nav className="flex items-center gap-1 h-[46px]">
                {navItems.map((item, index) => (
                  <div
                    key={item.label}
                    className="relative h-full flex items-center"
                    onMouseEnter={() => {
                      if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
                      if (item.hasDropdown && item.children) setActiveDropdown(index);
                    }}
                    onMouseLeave={() => {
                      dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 150);
                    }}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center gap-1 ${index === 0 ? "pl-0" : "pl-3"} pr-3 xl:${index === 0 ? "pl-0" : "pl-4"} xl:pr-4 h-full font-semibold whitespace-nowrap transition-colors duration-200 ${
                        item.isHighlighted
                          ? "text-red-600 hover:text-red-700"
                          : "text-gray-900 hover:text-[#1D349A]"
                      }`}
                    >
                      {item.label}
                      {item.hasDropdown && (
                        <IoChevronDown className={`w-3 h-3 ml-0.5 opacity-70 transition-transform duration-200 ${activeDropdown === index ? "rotate-180" : ""}`} />
                      )}
                    </Link>

                    {/* Dropdown Panel */}
                    {item.hasDropdown && item.children && activeDropdown === index && (
                      <div className="absolute top-full left-0 pt-0 z-50">
                        <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[220px] mt-0">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="flex flex-col px-4 py-2.5 hover:bg-gray-50 transition-colors"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <span className="text-[14px] font-medium text-gray-900">
                                {child.label}
                              </span>
                              {child.desc && (
                                <span className="text-[12px] text-gray-400 mt-0.5">
                                  {child.desc}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Shadow */}
        <div
          className={`pointer-events-none absolute bottom-0 left-0 right-0 translate-y-full h-[20px] transition-opacity duration-200 ease-out ${
            navCollapsed ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.03) 40%, transparent 100%)",
          }}
        />
      </header>

      {/* Desktop spacer: full header height */}
      <div aria-hidden="true" style={{ height: spacerHeight }} />
    </>
  );
}
