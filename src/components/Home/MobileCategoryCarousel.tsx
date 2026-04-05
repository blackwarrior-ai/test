"use client";

import Link from "next/link";

const bentoItems = [
  {
    id: 1,
    name: "MG20 Gaming Headphones",
    video: "/hero/grok-video.mp4", 
    image: "",
    className: "col-span-2 aspect-[10/11]", 
    textClass: "hidden", // Text hidden for video
    titleClass: "hidden"
  },
  {
    id: 2,
    name: "MW08 Sport",
    image: "/hero/mw08-latest.png",
    className: "col-span-1 aspect-square",
    textClass: "hidden",
    titleClass: "hidden"
  },
  {
    id: 3,
    name: "Accessories",
    image: "/products/accessories.png",
    className: "col-span-1 aspect-square",
    textClass: "hidden",
    titleClass: "hidden"
  },
  {
    id: 4,
    name: "MH40 Wireless",
    image: "/products/mh40-wireless.png",
    className: "col-span-2 aspect-[2/1]",
    textClass: "hidden",
    titleClass: "hidden"
  }
];

export function MobileCategoryCarousel() {
  return (
    <section className="w-full lg:hidden px-4 pt-8 pb-12 bg-gradient-to-r from-[#D65324] to-[#8B3310]">
      <div className="grid grid-cols-2 gap-3 w-full max-w-[500px] mx-auto">
        {bentoItems.map((item) => (
          <Link
            key={item.id}
            href={"/collections"}
            className={`relative rounded-[10px] overflow-hidden bg-gray-400 block shadow-sm ${item.className}`}
          >
            {/* Background Container */}
            <div className="absolute inset-0">
               {/* Very subtle dark gradient behind text for readability */}
               <div className={`absolute inset-0 z-10 ${item.video ? 'hidden' : 'bg-gradient-to-t from-black/40 via-black/5 to-transparent'}`} />
               
               {item.video ? (
                 <video
                   src={item.video}
                   autoPlay
                   loop
                   muted
                   playsInline
                   className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                 />
               ) : (
                 <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    onError={(e) => {
                      // Fallback visually identical to the screenshot style if no image
                      e.currentTarget.style.display = 'none';
                      if (item.id === 1) e.currentTarget.parentElement!.classList.add('bg-[#7b8fa3]');
                      if (item.id === 2) e.currentTarget.parentElement!.classList.add('bg-[#4c5949]');
                      if (item.id === 3) e.currentTarget.parentElement!.classList.add('bg-[#a3a3a3]');
                      if (item.id === 4) e.currentTarget.parentElement!.classList.add('bg-[#aa8066]');
                    }}
                 />
               )}
            </div>

            {/* Text Overlay exactly positioned according to the image */}
            {!item.video && (
              <div className={`z-20 ${item.textClass}`}>
                <h3 className={item.titleClass}>{item.name}</h3>
              </div>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
