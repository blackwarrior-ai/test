"use client";

import { useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { HiOutlineSearch } from "react-icons/hi";
import Link from "next/link";

interface DesktopSearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = ["ChatGPT", "Canva Pro", "Midjourney", "NordVPN", "Perplexity"];
const QUICK_LINKS = [
  { label: "Shop All", href: "/shop" },
  { label: "AI Tools", href: "/shop" },
  { label: "Design Software", href: "/shop" },
  { label: "Entertainment", href: "/shop" },
];

export function DesktopSearchDrawer({ isOpen, onClose }: DesktopSearchDrawerProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm anim-fade-in transition-opacity cursor-pointer"
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className="relative w-[500px] h-full bg-white shadow-2xl flex flex-col anim-slide-left rounded-l-[40px] overflow-hidden"
      >
        {/* Header */}
        <div className="px-[40px] py-[30px] flex items-center justify-between border-b border-gray-100">
          <h2 className="text-[20px] font-bold text-gray-900 tracking-tight">Search</h2>
          <button 
            className="w-[44px] h-[44px] rounded-full flex items-center justify-center border border-gray-200 hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
            onClick={onClose}
            aria-label="Close form"
          >
            <IoCloseOutline className="w-[22px] h-[22px]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-[40px] py-[40px] flex gap-10 flex-col">
          
          {/* Big Input */}
          <div className="relative group">
            <input 
              type="text" 
              placeholder="What are you looking for?"
              className="w-full text-[16px] text-gray-900 placeholder:text-gray-400 py-4 outline-none border-b-2 border-gray-200 focus:border-gray-900 transition-colors bg-transparent"
              autoFocus
            />
            <button className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-900">
              <HiOutlineSearch className="w-6 h-6" />
            </button>
          </div>

          {/* Popular Searches */}
          <div>
            <h3 className="text-[13px] font-bold tracking-[0.1em] uppercase text-gray-500 mb-4">Popular Searches</h3>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map(term => (
                <button 
                  key={term}
                  className="px-4 py-2 rounded-full border border-gray-200 text-[14px] font-medium text-gray-700 hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[13px] font-bold tracking-[0.1em] uppercase text-gray-500 mb-4">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              {QUICK_LINKS.map(link => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    onClick={onClose}
                    className="text-[16px] text-gray-800 font-medium hover:text-gray-500 transition-colors flex items-center group/link"
                  >
                    <span>{link.label}</span>
                    <span className="ml-2 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
{/* Overriding animations internally in case they aren't globally defined */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-l { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .anim-fade-in { animation: fade-in 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .anim-slide-left { animation: slide-l 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />
    </div>
  );
}
