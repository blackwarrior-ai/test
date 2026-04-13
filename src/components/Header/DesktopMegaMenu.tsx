"use client";

import Link from "next/link";
import Image from "next/image";

interface DesktopMegaMenuProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function DesktopMegaMenu({ isOpen, onMouseEnter, onMouseLeave }: DesktopMegaMenuProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="absolute left-0 right-0 top-full bg-white border-t border-gray-100 shadow-2xl z-40 overflow-hidden anim-fade-in"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="max-w-[1347px] mx-auto px-[36px] py-[40px] flex gap-12">
        {/* Left: Link Columns */}
        <div className="w-1/2 flex gap-12">
          {/* Column 1 */}
          <div className="flex flex-col gap-4 flex-1">
            <h3 className="text-[13px] font-bold tracking-[0.1em] uppercase text-gray-400 mb-2">Shop by Category</h3>
            <Link href="/shop" className="text-[15px] font-medium text-gray-800 hover:text-gray-500 transition-colors">AI Content Generators</Link>
            <Link href="/shop" className="text-[15px] font-medium text-gray-800 hover:text-gray-500 transition-colors">Design & Graphics</Link>
            <Link href="/shop" className="text-[15px] font-medium text-gray-800 hover:text-gray-500 transition-colors">Video Editing Tools</Link>
            <Link href="/shop" className="text-[15px] font-medium text-gray-800 hover:text-gray-500 transition-colors">SEO & Marketing</Link>
            <Link href="/shop" className="text-[15px] font-medium text-gray-800 hover:text-gray-500 transition-colors">Entertainment</Link>
          </div>
          {/* Column 2 */}
          <div className="flex flex-col gap-4 flex-1">
            <h3 className="text-[13px] font-bold tracking-[0.1em] uppercase text-gray-400 mb-2">Popular Tools</h3>
            <Link href="/shop" className="text-[15px] font-medium text-gray-800 hover:text-gray-500 transition-colors">ChatGPT Private</Link>
            <Link href="/shop" className="text-[15px] font-medium text-gray-800 hover:text-gray-500 transition-colors">Canva Pro Lifetime</Link>
            <Link href="/shop" className="text-[15px] font-medium text-gray-800 hover:text-gray-500 transition-colors">Midjourney V6</Link>
            <Link href="/shop" className="text-[15px] font-medium text-gray-800 hover:text-gray-500 transition-colors">NordVPN Premium</Link>
            <Link href="/shop" className="text-[15px] font-medium text-gray-800 hover:text-gray-500 transition-colors">Perplexity Pro</Link>
          </div>
        </div>

        {/* Right: Banners */}
        <div className="w-1/2 flex gap-6">
          {/* Banner 1 */}
          <Link href="/shop" className="group relative flex-1 aspect-[4/3] rounded-[16px] overflow-hidden bg-gray-100 flex items-end p-6">
            <img 
              src="/hero/canva-pro.jpg" 
              alt="Canva Pro" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="relative z-10">
              <span className="bg-white text-gray-900 text-[11px] font-bold uppercase tracking-wider px-2 py-1 rounded mb-2 inline-block">Sale</span>
              <h4 className="text-white text-[20px] font-bold leading-tight">Canva Pro <br/> Lifetime Access</h4>
            </div>
          </Link>
          {/* Banner 2 */}
          <Link href="/shop" className="group relative flex-1 aspect-[4/3] rounded-[16px] overflow-hidden bg-gray-100 flex items-end p-6">
            <img 
              src="/hero/chatgpt-logo-dl.jpg" 
              alt="ChatGPT" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="relative z-10">
              <span className="bg-[#90d03b] text-[#1a2e05] text-[11px] font-bold uppercase tracking-wider px-2 py-1 rounded mb-2 inline-block">New</span>
              <h4 className="text-white text-[20px] font-bold leading-tight">ChatGPT <br/> Private Account</h4>
            </div>
          </Link>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .anim-fade-in { animation: fade-in 0.2s ease-out forwards; }
      `}} />
    </div>
  );
}
