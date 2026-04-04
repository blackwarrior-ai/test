"use client";

import React, { useRef, useState } from "react";

const BEST_SELLERS = [
  { id: 1, title: "Space Quest 1+2+3", tag: "NOW ON SALE", image: "/hero/slide-1.webp", oldPrice: "$9.99", newPrice: "$3.29", discount: "-67%" },
  { id: 2, title: "Police Quest Collection", tag: "NOW ON SALE", image: "/hero/slide-2.webp", oldPrice: "$9.99", newPrice: "$6.49", discount: "-35%" },
  { id: 3, title: "Dragon Age™: Origins", tag: "NOW ON SALE", image: "/hero/slide-1.webp", oldPrice: "$19.99", newPrice: "$7.39", discount: "-63%" },
  { id: 4, title: "The Witcher 3: Wild Hunt", tag: "NOW ON SALE", image: "/hero/slide-2.webp", oldPrice: "$49.99", newPrice: "$12.49", discount: "-75%" },
  { id: 5, title: "Cyberpunk 2077", tag: "NOW ON SALE", image: "/hero/slide-1.webp", oldPrice: "$59.99", newPrice: "$29.99", discount: "-50%" },
  { id: 6, title: "Fallout: New Vegas", tag: "NOW ON SALE", image: "/hero/slide-2.webp", oldPrice: "$19.99", newPrice: "$4.99", discount: "-75%" },
  { id: 7, title: "Mass Effect 2", tag: "NOW ON SALE", image: "/hero/slide-1.webp", oldPrice: "$19.99", newPrice: "$4.99", discount: "-75%" },
  { id: 8, title: "Half-Life 2", tag: "NOW ON SALE", image: "/hero/slide-2.webp", oldPrice: "$9.99", newPrice: "$1.99", discount: "-80%" },
  { id: 9, title: "Deus Ex: Classic", tag: "NOW ON SALE", image: "/hero/slide-1.webp", oldPrice: "$9.99", newPrice: "$1.49", discount: "-85%" },
  { id: 10, title: "BioShock Infinite", tag: "NOW ON SALE", image: "/hero/slide-2.webp", oldPrice: "$29.99", newPrice: "$7.49", discount: "-75%" }
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
    <section className="w-full lg:hidden bg-[#EBEBEB] py-10">
      
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
        className="flex overflow-x-auto snap-x snap-mandatory gap-3 px-4 pb-4 [&::-webkit-scrollbar]:hidden" 
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {pairs.map((pair, index) => (
          <div key={index} className="flex gap-3 shrink-0 snap-center justify-center w-[calc(100vw-2rem)]">
            {pair.map((prod) => (
              <div 
                key={prod.id} 
                className="flex flex-col relative w-[calc(50vw-1.5rem)] sm:w-[160px] max-w-[160px] h-[200px] shrink-0 rounded-[8px] overflow-hidden bg-[#1a1a1a] shadow-sm border border-black"
              >
                {/* Image Container */}
                <div className="relative w-full h-[120px] shrink-0 bg-[#2d2d2d]">
                  <img 
                    src={prod.image} 
                    alt={prod.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  {/* Product Tag */}
                  {prod.tag && (
                    <div className="absolute top-1.5 left-1.5 bg-gradient-to-r from-[#FACC15] to-[#F59E0B] px-1.5 py-0.5 rounded-[2px] border border-[#F59E0B]/50 shadow-sm">
                      <span className="text-black text-[8px] font-extrabold tracking-wide uppercase">
                        {prod.tag}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content Container */}
                <div className="p-2 flex flex-col flex-1 justify-between bg-[#1a1a1a]">
                  <h3 className="text-white text-[12px] font-bold leading-tight mb-1 line-clamp-2">
                    {prod.title}
                  </h3>

                  {/* Price Details */}
                  <div className="flex items-end justify-between mt-auto">
                    <span className="bg-[#D65324] text-white text-[10px] font-bold px-1.5 py-[2px] rounded-[4px]">
                      {prod.discount}
                    </span>
                    <div className="flex flex-col items-end leading-none">
                      {prod.oldPrice && (
                        <span className="text-gray-400 line-through text-[10px] mb-0.5">
                          {prod.oldPrice}
                        </span>
                      )}
                      <span className="text-white text-[13px] font-extrabold">
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
