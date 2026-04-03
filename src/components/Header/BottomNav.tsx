"use client";

import Link from "next/link";
import { IoChevronDown } from "react-icons/io5";

const navItems = [
  { label: "Shop By Categories", href: "/shop-by-categories", hasDropdown: true },
  { label: "Shop By Room", href: "/shop-by-room", hasDropdown: true },
  { label: "Tables & Desks", href: "/tables-desks", hasDropdown: true },
  { label: "Chairs & Stools", href: "/chairs-stools", hasDropdown: true },
  { label: "Pages", href: "/pages", hasDropdown: true },
  { label: "Theme Features", href: "/theme-features", hasDropdown: true },
  { label: "On Sale", href: "/on-sale", hasDropdown: false, isHighlighted: true },
];

export function BottomNav() {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-[1347px] mx-auto px-[16px]">
        <nav className="hidden lg:flex items-center gap-1 h-[46px]">
          {navItems.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-1 ${index === 0 ? "pl-0" : "pl-3"} pr-3 xl:${index === 0 ? "pl-0" : "pl-4"} xl:pr-4 h-full font-semibold whitespace-nowrap transition-colors duration-200 ${
                item.isHighlighted
                  ? "text-red-600 hover:text-red-700"
                  : "text-gray-900 hover:text-[#1a1acd]"
              }`}
            >
              {item.label}
              {item.hasDropdown && (
                <IoChevronDown className="w-3 h-3 ml-0.5 opacity-70" />
              )}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
