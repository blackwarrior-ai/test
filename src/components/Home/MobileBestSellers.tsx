"use client";

import React, { useRef, useState } from "react";
import { IoBagOutline } from "react-icons/io5";

const BEST_SELLERS = [
  { id: 1, title: "ChatGPT Plus Private", category: "AI ASSISTANT", tag: "Sale", image: "/hero/chatgpt-logo-dl.jpg", oldPrice: "$20.00", newPrice: "$9.99" },
  { id: 2, title: "Gemini Pro", category: "AI ASSISTANT", tag: "Sale", image: "/hero/gemini-pro.png", oldPrice: "$20.00", newPrice: "$10.90" },
  { id: 3, title: "SuperGrok", category: "AI ASSISTANT", tag: "Sale", image: "/hero/grok.jpg", oldPrice: "$30.00", newPrice: "$12.99" },
  { id: 4, title: "Canva Pro", category: "DESIGN", tag: "Sale", image: "/hero/canva-pro.jpg", oldPrice: "$15.00", newPrice: "$5.00" },
  { id: 5, title: "Perplexity Pro", category: "AI SEARCH", tag: "Sale", image: "/hero/perplexity-pro.jpg", oldPrice: "$20.00", newPrice: "$11.99" },
  { id: 6, title: "Midjourney Pro", category: "AI ART", tag: "Sale", image: "/hero/chatgpt-logo-dl.jpg", oldPrice: "$30.00", newPrice: "$19.50" },
  { id: 7, title: "GitHub Copilot Pro", category: "DEVELOPER", tag: "Sale", image: "/hero/grok.jpg", oldPrice: "$19.00", newPrice: "$8.55" },
  { id: 8, title: "NordVPN Premium", category: "SECURITY", tag: "Sale", image: "/hero/canva-pro.jpg", oldPrice: "$12.00", newPrice: "$3.60" },
  { id: 9, title: "Spotify Premium", category: "STREAMING", tag: "Sale", image: "/hero/perplexity-pro.jpg", oldPrice: "$10.00", newPrice: "$4.00" },
  { id: 10, title: "ElevenLabs Pro", category: "AI VOICE", tag: "Sale", image: "/hero/gemini-pro.png", oldPrice: "$22.00", newPrice: "$12.76" }
];

export function MobileBestSellers() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;
    
    // Calculate progress between 0 and 1
    const scrollProgress = scrollLeft / maxScroll;
    
    // We have 5 pagination lines. A 0-based index from 0 to 4.
    const index = Math.round(scrollProgress * 4);
    setActiveIndex(index);
  };

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const { scrollWidth, clientWidth } = scrollRef.current;
    // Calculate the maximum possible scroll left value
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;
    
    // Reverse calculate the scroll target for this specific index (0 to 4)
    const targetScroll = (maxScroll / 4) * index;
    scrollRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });
  };

  // Group into pairs (2 items each) so they scroll and snap together
  const pairs = [];
  for (let i = 0; i < BEST_SELLERS.length; i += 2) {
    pairs.push(BEST_SELLERS.slice(i, i + 2));
  }

  return (
    <section className="w-full lg:hidden bg-[#EBEBEB] py-[60px]">
      
      {/* Header */}
      <div className="px-4 mb-5">
        <h2 className="text-gray-900 text-[22px] sm:text-[24px] font-extrabold font-[var(--font-heading)] leading-tight">
          Best sellers
        </h2>
        {/* Subtle separating line */}
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
      
      {/* Pagination indicators (calculated dynamically based on scroll) */}
      <div className="flex justify-center items-center gap-2 mt-2">
        {[0, 1, 2, 3, 4].map((index) => (
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
