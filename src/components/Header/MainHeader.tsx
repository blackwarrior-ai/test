"use client";

import Link from "next/link";
import { IoChevronDown } from "react-icons/io5";
import { HiOutlineSearch } from "react-icons/hi";
import { HiOutlineUser } from "react-icons/hi2";
import { IoBagOutline } from "react-icons/io5";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

interface MainHeaderProps {
  isScrolled?: boolean;
  menuOpen?: boolean;
  onMenuToggle?: () => void;
}

/* Animated hamburger / cross icon */
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

export function MainHeader({ isScrolled = false, menuOpen = false, onMenuToggle }: MainHeaderProps) {
  return (
    <div className="w-full bg-white relative z-10">

      {/* The Centered Padding Container */}
      <div className="max-w-[1347px] mx-auto py-[20px] px-[16px]">
        {/* Desktop Layout */}
        <div className="w-full h-[60px] hidden lg:flex lg:items-center lg:gap-x-[1.2rem]">

          {/* Hamburger + Logo group — shifts left together when scrolled */}
          <div
            className="flex items-center shrink-0 mr-[1.2rem]"
          >
            {/* Hamburger — grows in from w-0 when scrolled */}
            <button
              onClick={onMenuToggle}
              className={`flex items-center h-10 transition-all duration-300 ease-in-out ${
                isScrolled
                  ? "opacity-100 w-[34px]"
                  : "opacity-0 w-0 overflow-hidden pointer-events-none"
              }`}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <MenuIcon open={menuOpen} />
            </button>

            {/* Logo */}
            <Link href="/">
              <img 
                src="/digilink-logo.svg" 
                alt="Digilink" 
                className="h-[76px] w-auto" 
                style={{ imageRendering: 'high-quality', transform: 'translateZ(0)' }}
              />
            </Link>
          </div>

          {/* Search Bar — takes remaining space */}
          <div className="flex-1 flex items-center justify-start">
            <div className="flex w-[600px] h-[48px] items-center rounded-full overflow-hidden bg-[#EDEDED] transition-colors duration-200">
              <button className="flex items-center gap-1.5 px-5 h-[48px] text-gray-700 whitespace-nowrap border-r border-gray-300 bg-[#E0E0E0] hover:bg-[#D5D5D5] transition-colors duration-200">
                All Categories
                <IoChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>
              <input
                type="text"
                placeholder="What are you looking for?"
                className="flex-1 h-[48px] px-4 text-gray-700 placeholder-gray-400 outline-none bg-transparent"
              />
              <button
                className="flex items-center justify-center w-[46px] h-[48px] text-gray-600 hover:text-gray-900 transition-colors duration-200"
                aria-label="Search"
              >
                <HiOutlineSearch className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center justify-end gap-3 shrink-0">
            <Link
              href="/account"
              className="flex items-center gap-2 px-4 h-[40px] rounded-full border border-gray-300 text-[14px] font-semibold text-gray-800 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-200 whitespace-nowrap"
            >
              <HiOutlineUser className="w-[17px] h-[17px]" />
              <span>Sign In</span>
            </Link>

            <button
              className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Cart"
            >
              <IoBagOutline className="w-[22px] h-[22px] text-gray-700" />
            </button>
          </div>

        </div>

        {/* ── Mobile & Tablet layout (below lg) ── */}
        <div className="lg:hidden">
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-[1.2rem] h-[48px]">
            <button
              className="flex items-center justify-center"
              aria-label="Open menu"
              onClick={onMenuToggle}
            >
              <HiOutlineMenuAlt2 className="w-6 h-6 text-gray-900" />
            </button>

            <Link href="/" className="flex items-center justify-center">
              <img src="/digilink-logo.svg" alt="Digilink" className="h-[24px] w-auto" />
            </Link>

            <button
              className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Cart"
            >
              <IoBagOutline className="w-[22px] h-[22px] text-gray-700" />
            </button>
          </div>

          <div className="mt-3 w-full flex items-center border border-gray-300 rounded-full overflow-hidden bg-white">
            <button className="flex items-center gap-1.5 px-4 h-[42px] text-gray-700 whitespace-nowrap border-r border-gray-300 bg-gray-50">
              All Categories
              <IoChevronDown className="w-3.5 h-3.5 text-gray-500" />
            </button>
            <input
              type="text"
              placeholder="What are you looking for?"
              className="flex-1 h-[42px] px-4 text-gray-700 placeholder-gray-400 outline-none bg-transparent"
            />
            <button
              className="flex items-center justify-center w-[42px] h-[42px] text-gray-600"
              aria-label="Search"
            >
              <HiOutlineSearch className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
