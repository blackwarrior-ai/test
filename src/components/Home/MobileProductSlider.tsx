"use client";

import React from "react";
import { IoBagOutline } from "react-icons/io5";

const MOCK_PRODUCTS = [
  {
    id: 1,
    title: "ChatGPT Private",
    tag: "GOOD OLD GAME",
    status: "Now on sale",
    discount: "+50%",
    oldPrice: "$20.00",
    newPrice: "$9.99",
    image: "/hero/chatgpt-logo-dl.jpg",
    bgColor: "bg-[#c87676]" 
  },
  {
    id: 2,
    title: "Gemini Pro",
    tag: "GOOD OLD GAME",
    status: "Now on sale",
    discount: "-45%",
    oldPrice: "$20.00",
    newPrice: "$10.90",
    image: "/hero/gemini-pro.png",
    bgColor: "bg-[#6384a3]"
  },
  {
    id: 3,
    title: "SuperGrok",
    tag: "GOOD OLD GAME",
    status: "Now on sale",
    discount: "-57%",
    oldPrice: "$30.00",
    newPrice: "$12.99",
    image: "/hero/grok.jpg",
    bgColor: "bg-[#c49a6c]" // Warm Ochre from last box
  },
  {
    id: 4,
    title: "Canva Pro",
    tag: "GOOD OLD GAME",
    status: "Now on sale",
    discount: "-67%",
    oldPrice: "$15.00",
    newPrice: "$5.00",
    image: "/hero/canva-pro.jpg",
    bgColor: "bg-[#9d83b0]" // Amethyst Lavender
  },
  {
    id: 5,
    title: "Perplexity Pro",
    tag: "GOOD OLD GAME",
    status: "Now on sale",
    discount: "-40%",
    oldPrice: "$20.00",
    newPrice: "$11.99",
    image: "/hero/perplexity-pro.jpg",
    bgColor: "bg-[#7a9e86]" // Calm Sage Green from 3rd box
  }
];

export function MobileProductSlider() {
  return (
    <section className="w-full pt-[72px] pb-[36px] lg:hidden bg-[#EBEBEB]">
      {/* Horizontal Slider Area */}
      <div 
        className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-4 [&::-webkit-scrollbar]:hidden" 
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {MOCK_PRODUCTS.map((prod) => (
          <div 
            key={prod.id} 
            className="relative w-[260px] shrink-0 snap-center rounded-[10px] overflow-hidden bg-[#1a1c23] shadow-md flex flex-col h-[300px]"
          >
            {/* Top Image Section */}
            <div className="relative w-full flex-1">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${prod.image}')` }}
              />
              {/* "Now on sale" Tag on Top Right */}
              <div className="absolute top-2 right-2 bg-red-600/90 text-white text-[11px] font-bold uppercase tracking-wider px-2 py-1 rounded shadow-md z-10 backdrop-blur-sm">
                {prod.status}
              </div>
            </div>

            {/* Bottom Content Section with solid dark background */}
            <div className={`relative flex flex-col justify-end p-3 h-[90px] shrink-0 ${prod.bgColor}`}>
              {/* Title Section */}
              <div className="mb-auto">
                <h3 className="text-white text-[15px] font-bold leading-tight line-clamp-1 drop-shadow-md">
                  {prod.title}
                </h3>
              </div>
              
              {/* Price & Action Section */}
              <div className="flex items-end justify-between mt-1">
                {/* Price */}
                <div className="flex items-center gap-[6px]">
                  <div className="bg-white/95 text-gray-900 shadow-sm font-extrabold text-[13px] px-2 py-1 rounded-sm backdrop-blur-sm">
                    {prod.discount}
                  </div>
                  <div className="flex flex-col leading-none justify-center">
                    <span className="text-white/60 text-[12px] line-through mb-[2px]">{prod.oldPrice}</span>
                    <span className="text-white text-[18px] font-bold">{prod.newPrice}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                      <button 
                        onClick={() => alert(`Added ${prod.title} to wishlist!`)}
                        className="w-[36px] h-[36px] flex items-center justify-center rounded-sm border border-white/60 text-white hover:bg-white/10 transition-colors"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => window.dispatchEvent(new Event('open-cart'))}
                        className="w-[36px] h-[36px] flex items-center justify-center rounded-sm bg-[#90d03b] text-[#1a2e05] hover:bg-[#80bf2f] transition-colors"
                      >
                        <IoBagOutline className="w-[20px] h-[20px]" />
                      </button>
                    </div>
                  </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
