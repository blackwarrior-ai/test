"use client";

import Link from "next/link";

const carouselItems = [
  {
    id: 1,
    name: "Coding",
    image: "/products/headphones-cat.png",
  },
  {
    id: 2,
    name: "AI",
    image: "/products/earphones-cat.png",
  },
  {
    id: 3,
    name: "Voices",
    image: "/products/speakers-cat.png",
  },
  {
    id: 4,
    name: "Graphics",
    image: "/products/accessories-cat.png",
  },
  {
    id: 5,
    name: "Privacy",
    image: "/products/soundbars-cat.png",
  },
  {
    id: 6,
    name: "Entertainment",
    image: "/products/turntables-cat.png",
  }
];

export function MobileSmallCategoryCarousel() {
  return (
    <section className="w-full bg-[#EBEBEB] pt-[72px] pb-[84px] px-4 lg:hidden">
      <div className="flex overflow-x-auto gap-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {carouselItems.map((item) => (
          <Link
            href="/collections"
            key={item.id}
            className="relative bg-white rounded-[10px] overflow-hidden flex flex-col justify-between shrink-0 shadow-sm"
            style={{ width: "calc(52vw - 16px)", aspectRatio: "1 / 1" }}
          >
            {item.id === 1 ? (
              /* Coding box — same style as AI box */
              <>
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <img
                    src="/hero/coding-cat.png"
                    alt={item.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <h3 className="absolute bottom-0 left-0 right-0 text-gray-900 font-bold text-[15.5px] font-[var(--font-heading)] tracking-tight px-4 py-3">
                  {item.name}
                </h3>
              </>
            ) : item.id === 2 ? (
              /* AI box — image centered in full box, title overlaid at bottom */
              <>
                <div className="absolute inset-0 flex items-center justify-center p-3">
                  <img
                    src="/hero/ai-cat2.png"
                    alt={item.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <h3 className="absolute bottom-0 left-0 right-0 text-gray-900 font-bold text-[15.5px] font-[var(--font-heading)] tracking-tight px-4 py-3">
                  {item.name}
                </h3>
              </>
            ) : item.id === 3 ? (
              /* Voices box */
              <>
                <div className="absolute inset-0 flex items-center justify-center p-1">
                  <img
                    src="/hero/voices-cat.svg"
                    alt={item.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <h3 className="absolute bottom-0 left-0 right-0 text-gray-900 font-bold text-[15.5px] font-[var(--font-heading)] tracking-tight px-4 py-3">
                  {item.name}
                </h3>
              </>
            ) : item.id === 4 ? (
              /* Graphics box */
              <>
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <img
                    src="/hero/graphics-cat.png"
                    alt={item.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <h3 className="absolute bottom-0 left-0 right-0 text-gray-900 font-bold text-[15.5px] font-[var(--font-heading)] tracking-tight px-4 py-3">
                  {item.name}
                </h3>
              </>
            ) : item.id === 5 ? (
              /* Privacy box */
              <>
                <div className="absolute inset-0 flex items-center justify-center p-5">
                  <img
                    src="/hero/privacy-cat.png"
                    alt={item.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <h3 className="absolute bottom-0 left-0 right-0 text-gray-900 font-bold text-[15.5px] font-[var(--font-heading)] tracking-tight px-4 py-3">
                  {item.name}
                </h3>
              </>
            ) : item.id === 6 ? (
              /* Entertainment box */
              <>
                <div className="absolute inset-0 flex items-center justify-center p-7">
                  <img
                    src="/hero/entertainment-cat.png"
                    alt={item.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <h3 className="absolute bottom-0 left-0 right-0 text-gray-900 font-bold text-[15.5px] font-[var(--font-heading)] tracking-tight px-4 py-3">
                  {item.name}
                </h3>
              </>
            ) : (
              <>
                {/* Image Wrapper */}
                <div className="relative flex-1 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center p-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
                {/* Title */}
                <h3 className="text-gray-900 font-bold text-[15.5px] font-[var(--font-heading)] tracking-tight px-4 py-3 shrink-0">
                  {item.name}
                </h3>
              </>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
