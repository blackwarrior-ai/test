"use client";

import React, { useRef, useState } from "react";
import { IoBagOutline } from "react-icons/io5";

const LIMITED_STOCK = [
  { id: 1, title: "Claude Pro Annual", category: "AI ASSISTANT", tag: "Sale", image: "/hero/chatgpt-logo-dl.jpg", oldPrice: "$20.00", newPrice: "$8.99" },
  { id: 2, title: "Suno AI Music Pro", category: "AI MUSIC", tag: "Sale", image: "/hero/gemini-pro.png", oldPrice: "$25.00", newPrice: "$12.49" },
  { id: 3, title: "Runway ML Pro", category: "AI VIDEO", tag: "Sale", image: "/hero/grok.jpg", oldPrice: "$35.00", newPrice: "$15.99" },
  { id: 4, title: "Pika Labs Premium", category: "AI VIDEO", tag: "Sale", image: "/hero/canva-pro.jpg", oldPrice: "$18.00", newPrice: "$7.20" },
  { id: 5, title: "Leonardo AI Pro", category: "AI ART", tag: "Sale", image: "/hero/perplexity-pro.jpg", oldPrice: "$24.00", newPrice: "$9.60" },
  { id: 6, title: "Jasper AI Business", category: "AI WRITING", tag: "Sale", image: "/hero/chatgpt-logo-dl.jpg", oldPrice: "$49.00", newPrice: "$19.60" },
  { id: 7, title: "Descript Pro Plan", category: "EDITING", tag: "Sale", image: "/hero/gemini-pro.png", oldPrice: "$28.00", newPrice: "$11.20" },
  { id: 8, title: "Luma Dream Machine", category: "AI 3D", tag: "Sale", image: "/hero/grok.jpg", oldPrice: "$30.00", newPrice: "$12.00" },
];

export function MobileLimitedStock() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;
    const scrollProgress = scrollLeft / maxScroll;
    const index = Math.round(scrollProgress * 3);
    setActiveIndex(index);
  };

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const { scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;
    const targetScroll = (maxScroll / 3) * index;
    scrollRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });
  };

  const pairs = [];
  for (let i = 0; i < LIMITED_STOCK.length; i += 2) {
    pairs.push(LIMITED_STOCK.slice(i, i + 2));
  }

  return (
    <section className="w-full lg:hidden bg-[#EBEBEB] py-[30px]">
      
      {/* Header */}
      <div className="px-4 mb-5">
        <h2 className="text-gray-900 text-[22px] sm:text-[24px] font-extrabold font-[var(--font-heading)] leading-tight">
          Limited in the Stock
        </h2>
        <div className="w-full h-px bg-black/10 mt-4" />
      </div>

      {/* Cards Slider */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory gap-3 px-4 pb-4 [&::-webkit-scrollbar]:hidden w-full max-w-[500px] mx-auto" 
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {pairs.map((pair, index) => (
          <div key={index} className="flex gap-3 shrink-0 snap-center justify-center w-[calc(100vw-2rem)] sm:w-[468px]">
            {pair.map((prod) => (
              <div 
                key={prod.id} 
                className="flex flex-col relative w-[calc(50%-0.375rem)] shrink-0 rounded-[6px] overflow-hidden bg-white shadow-sm"
              >
                {/* Image Container */}
                <div className="relative w-full h-[160px] shrink-0 bg-[#f5f5f5] flex items-center justify-center p-4">
                  <img 
                    src={prod.image} 
                    alt={prod.title} 
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  {prod.tag && (
                    <div className="absolute top-2 left-2 bg-[#D65324] px-2.5 py-1 rounded-full">
                      <span className="text-white text-[10px] font-bold">
                        {prod.tag}
                      </span>
                    </div>
                  )}
                  {/* Cart Button */}
                  <button className="absolute bottom-2 right-2 w-[34px] h-[34px] flex items-center justify-center rounded-full bg-white shadow-md border border-gray-100">
                    <IoBagOutline className="w-[16px] h-[16px] text-gray-700" />
                  </button>
                </div>

                {/* Content Container */}
                <div className="px-3 pt-2.5 pb-3 flex flex-col">
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    {prod.category}
                  </span>
                  <h3 className="text-gray-900 text-[13.5px] sm:text-[14px] font-bold leading-snug line-clamp-1 mb-2">
                    {prod.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[#D65324] text-[14px] font-extrabold">
                      {prod.newPrice}
                    </span>
                    {prod.oldPrice && (
                      <span className="text-gray-400 line-through text-[12px]">
                        {prod.oldPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      
      {/* Pagination indicators */}
      <div className="flex justify-center items-center gap-2 mt-2">
        {[0, 1, 2, 3].map((index) => (
          <button 
            key={index}
            onClick={() => scrollToIndex(index)}
            aria-label={`Go to slide pair ${index + 1}`}
            className={`h-[4px] rounded-full transition-all duration-300 ${
              activeIndex === index ? "w-8 bg-[#D65324]" : "w-5 bg-gray-300 hover:bg-gray-400"
            }`} 
          />
        ))}
      </div>

    </section>
  );
}
