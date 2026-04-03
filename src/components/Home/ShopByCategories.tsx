"use client";

import Link from "next/link";
import { IoChevronForward } from "react-icons/io5";

const categories = [
  { label: "Sale Items",    image: "/categories/sale.webp",         isSale: true },
  { label: "Press Tables",  image: "/categories/press-tables.webp" },
  { label: "Lighting",      image: "/categories/lighting.webp" },
  { label: "Spoke Sofa",    image: "/categories/spoke-sofa.webp" },
  { label: "Storage",       image: "/categories/storage.webp" },
  { label: "Turn Chairs",   image: "/categories/turn-chairs.webp" },
  { label: "Longe Chairs",  image: "/categories/longe-chairs.webp" },
  { label: "Curve Coat",    image: "/categories/curve-coat.webp" },
  { label: "Cross Tables",  image: "/categories/cross-tables.webp" },
  { label: "Bend Chairs",   image: "/categories/bend-chairs.webp" },
  { label: "Bar Chairs",    image: "/categories/bar-chairs.webp" },
  { label: "Accessories",   image: "/categories/accessories.webp" },
];

export function ShopByCategories() {
  return (
    <section className="pt-2 pb-10 lg:pt-3 lg:pb-14">
      <div className="max-w-[1347px] mx-auto px-[16px]">

        {/* Section header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[26px] lg:text-[30px] font-bold text-gray-900">
            Shop By Categories
          </h2>
          <Link
            href="/shop"
            className="flex items-center gap-1 text-[14px] font-semibold text-gray-900 hover:text-[#1D349A] transition-colors duration-200"
          >
            Shop All Products
            <IoChevronForward className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid container with outer border */}
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="grid grid-cols-3 lg:grid-cols-6">
            {categories.map((cat, i) => {
              const row = Math.floor(i / 6);         // 0 = top row, 1 = bottom row
              const col = i % 6;
              const colMobile = i % 3;

              const borderRight = col < 5 ? "lg:border-r lg:border-gray-200" : "";
              const borderRightMobile = colMobile < 2 ? "border-r border-gray-200" : "";
              const borderBottom = row === 0 ? "border-b border-gray-200" : "";

              return (
                <Link
                  key={cat.label}
                  href={`/categories/${cat.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`liquid-fill-circle group flex flex-col items-center justify-center gap-3 py-8 px-4 ${borderBottom} ${borderRightMobile} ${borderRight}`}
                >
                  {/* Circle */}
                  <div
                    className={`w-[100px] h-[100px] rounded-full flex items-center justify-center overflow-hidden ${
                      cat.isSale ? "bg-[#CC2200]" : "bg-[#F0EFED]"
                    }`}
                  >
                    {cat.isSale ? (
                      <span className="text-white text-[22px] font-extrabold tracking-tight">
                        Sale
                      </span>
                    ) : (
                      /* Placeholder — replace with <Image> when real images are ready */
                      <div className="w-[68px] h-[68px] bg-[#DDDBD8] rounded" />
                    )}
                  </div>

                  {/* Label */}
                  <span className="text-[14px] font-medium text-gray-800 text-center leading-tight">
                    {cat.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
