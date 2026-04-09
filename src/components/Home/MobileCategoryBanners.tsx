"use client";

import React from "react";
import Link from "next/link";

const CATEGORY_BANNERS = [
  { id: 1, title: "AI ASSISTANTS", image: "/hero/chatgpt-logo-dl.jpg" },
  { id: 2, title: "DESIGN TOOLS", image: "/hero/canva-pro.jpg" },
  { id: 3, title: "PRODUCTIVITY", image: "/hero/gemini-pro.png" },
  { id: 4, title: "DEVELOPER PRO", image: "/hero/grok.jpg" },
  { id: 5, title: "SECURITY & VPN", image: "/hero/perplexity-pro.jpg" },
];

export function MobileCategoryBanners() {
  return (
    <section className="w-full lg:hidden bg-[#EBEBEB] py-8 px-4 flex flex-col gap-4">
      {CATEGORY_BANNERS.map((cat) => (
        <Link key={cat.id} href="/shop">
          <div className="relative w-full h-[90px] rounded-[6px] overflow-hidden border border-white/10 shadow-lg group block">
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url('${cat.image}')` }}
            />
            {/* Dark Edges Gradient Effect to match the image */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#121212]/90 via-[#121212]/20 to-[#121212]/90" />
            <div className="absolute inset-0 bg-black/30" />
            
            {/* Centered Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-[18px] sm:text-[20px] font-black tracking-widest uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {cat.title}
              </h3>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}