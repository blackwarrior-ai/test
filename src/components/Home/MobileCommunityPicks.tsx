"use client";

import React, { useRef, useState } from "react";

const COMMUNITY_PICKS = [
  { id: 1, title: "Notion AI Workspace", tag: "COMMUNITY PICK", image: "/hero/gemini-pro.png", oldPrice: "$10.00", newPrice: "$4.99", discount: "-50%" },
  { id: 2, title: "Adobe Creative Cloud", tag: "TOP RATED", image: "/hero/canva-pro.jpg", oldPrice: "$55.00", newPrice: "$24.99", discount: "-55%" },
  { id: 3, title: "Spotify Premium Family", tag: "MOST LOVED", image: "/hero/perplexity-pro.jpg", oldPrice: "$16.00", newPrice: "$6.40", discount: "-60%" },
  { id: 4, title: "ElevenLabs Pro Voice", tag: "TRENDING", image: "/hero/grok.jpg", oldPrice: "$22.00", newPrice: "$11.00", discount: "-50%" },
  { id: 5, title: "NordVPN 2-Year Plan", tag: "BEST VALUE", image: "/hero/chatgpt-logo-dl.jpg", oldPrice: "$12.00", newPrice: "$3.00", discount: "-75%" },
  { id: 6, title: "Grammarly Premium", tag: "ESSENTIAL", image: "/hero/gemini-pro.png", oldPrice: "$30.00", newPrice: "$14.99", discount: "-50%" },
  { id: 7, title: "Coursera Plus Annual", tag: "LEARNING", image: "/hero/canva-pro.jpg", oldPrice: "$59.00", newPrice: "$23.60", discount: "-60%" },
  { id: 8, title: "Figma Professional", tag: "DESIGNER FAV", image: "/hero/perplexity-pro.jpg", oldPrice: "$15.00", newPrice: "$6.75", discount: "-55%" },
];

export function MobileCommunityPicks() {
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
  for (let i = 0; i < COMMUNITY_PICKS.length; i += 2) {
    pairs.push(COMMUNITY_PICKS.slice(i, i + 2));
  }

  return (
    <section className="w-full lg:hidden bg-[#EBEBEB] py-[60px]">
      
      {/* Header */}
      <div className="px-4 mb-5">
        <h2 className="text-gray-900 text-[22px] sm:text-[24px] font-extrabold font-[var(--font-heading)] leading-tight">
          Selected by Digilink Community
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
                className="flex flex-col relative w-[calc(50%-0.375rem)] h-[256px] shrink-0 rounded-[6px] overflow-hidden bg-[#303030] shadow-sm"
              >
                {/* Image Container */}
                <div className="relative w-full h-[140px] shrink-0 bg-[#1e1e1e]">
                  <img 
                    src={prod.image} 
                    alt={prod.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  {prod.tag && (
                    <div className="absolute top-1.5 left-1.5 bg-gradient-to-r from-[#FACC15] to-[#F59E0B] px-1.5 py-0.5 rounded-[2px] border border-[#F59E0B]/50 shadow-sm">
                      <span className="text-black text-[8px] font-extrabold tracking-wide uppercase">
                        {prod.tag}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content Container */}
                <div className="p-3.5 flex flex-col flex-1 justify-between bg-[#303030]">
                  <h3 className="text-white text-[13.5px] sm:text-[14.5px] font-bold leading-snug mb-2 line-clamp-3">
                    {prod.title}
                  </h3>

                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
                    <span className="bg-[#cd9eff] text-black text-[12px] font-extrabold px-2 py-0.5 rounded-[3px]">
                      {prod.discount}
                    </span>
                    <div className="flex flex-col items-end leading-tight">
                      {prod.oldPrice && (
                        <span className="text-gray-400 line-through text-[11px]">
                          {prod.oldPrice}
                        </span>
                      )}
                      <span className="text-white text-[14.5px] font-extrabold mt-[1px]">
                        {prod.newPrice}
                      </span>
                    </div>
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
