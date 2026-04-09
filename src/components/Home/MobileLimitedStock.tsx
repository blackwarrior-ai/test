"use client";

import React, { useRef, useState } from "react";

const LIMITED_STOCK = [
  { id: 1, title: "Claude Pro Annual", tag: "ALMOST GONE", image: "/hero/chatgpt-logo-dl.jpg", oldPrice: "$20.00", newPrice: "$8.99", discount: "-55%", bgColor: "bg-[#9d83b0]" },
  { id: 2, title: "Suno AI Music Pro", tag: "LOW STOCK", image: "/hero/gemini-pro.png", oldPrice: "$25.00", newPrice: "$12.49", discount: "-50%", bgColor: "bg-[#9d83b0]" },
  { id: 3, title: "Runway ML Pro", tag: "LAST FEW", image: "/hero/grok.jpg", oldPrice: "$35.00", newPrice: "$15.99", discount: "-54%", bgColor: "bg-[#9d83b0]" },
  { id: 4, title: "Pika Labs Premium", tag: "HURRY UP", image: "/hero/canva-pro.jpg", oldPrice: "$18.00", newPrice: "$7.20", discount: "-60%", bgColor: "bg-[#9d83b0]" },
  { id: 5, title: "Leonardo AI Pro", tag: "SELLING FAST", image: "/hero/perplexity-pro.jpg", oldPrice: "$24.00", newPrice: "$9.60", discount: "-60%", bgColor: "bg-[#9d83b0]" },
  { id: 6, title: "Jasper AI Business", tag: "LIMITED", image: "/hero/chatgpt-logo-dl.jpg", oldPrice: "$49.00", newPrice: "$19.60", discount: "-60%", bgColor: "bg-[#9d83b0]" },
  { id: 7, title: "Descript Pro Plan", tag: "FEW LEFT", image: "/hero/gemini-pro.png", oldPrice: "$28.00", newPrice: "$11.20", discount: "-60%", bgColor: "bg-[#9d83b0]" },
  { id: 8, title: "Luma Dream Machine", tag: "RARE DEAL", image: "/hero/grok.jpg", oldPrice: "$30.00", newPrice: "$12.00", discount: "-60%", bgColor: "bg-[#9d83b0]" },
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
                <div className={`p-3.5 flex flex-col flex-1 justify-between ${prod.bgColor}`}>
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
