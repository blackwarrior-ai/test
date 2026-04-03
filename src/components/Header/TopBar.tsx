"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoChevronUp } from "react-icons/io5";

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

export function TopBar() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(2); // Belgium default
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const current = countries[selected];

  return (
    <div className="bg-[#1D349A] text-white">
      <div className="max-w-[1347px] mx-auto px-[16px] py-3 flex items-center justify-between lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Left Links */}
        <div className="hidden lg:flex items-center gap-5">
          <Link
            href="/help"
            className="hover:text-gray-200 transition-colors duration-200"
          >
            Help Center
          </Link>
          <Link
            href="/find-store"
            className="hover:text-gray-200 transition-colors duration-200"
          >
            Find a Store
          </Link>
          <Link
            href="/contact"
            className="hover:text-gray-200 transition-colors duration-200"
          >
            Contact
          </Link>
        </div>

        {/* Center Announcement */}
        <div className="flex-1 lg:flex-none text-center">
          <span className="tracking-wide">
            🤚 Free Express Shipping on orders $500!
          </span>
        </div>

        {/* Right Section */}
        <div className="hidden lg:flex items-center justify-end gap-4">
          {/* Country Selector with Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-1.5 hover:text-gray-200 transition-colors duration-200"
            >
              {current.flag}
              <span>{current.name} ({current.code})</span>
              <IoChevronUp
                className={`w-3 h-3 transition-transform duration-200 ${
                  open ? "rotate-0" : "rotate-180"
                }`}
              />
            </button>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 top-full mt-3 w-[260px] max-h-[400px] overflow-y-auto rounded-md bg-[#1D349A] border border-white/15 shadow-2xl z-[100] py-1">
                {countries.map((country, i) => (
                  <button
                    key={country.name}
                    onClick={() => {
                      setSelected(i);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-150 ${
                      i === selected
                        ? "bg-white/10 font-bold"
                        : "hover:bg-white/10"
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
            <Link
              href="#"
              className="hover:text-gray-200 transition-colors duration-200"
              aria-label="Facebook"
            >
              <FaFacebookF className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="#"
              className="hover:text-gray-200 transition-colors duration-200"
              aria-label="Twitter"
            >
              <FaXTwitter className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="#"
              className="hover:text-gray-200 transition-colors duration-200"
              aria-label="Instagram"
            >
              <FaInstagram className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="#"
              className="hover:text-gray-200 transition-colors duration-200"
              aria-label="TikTok"
            >
              <FaTiktok className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
