"use client";

import Link from "next/link";
import { IoChevronForward } from "react-icons/io5";

const categories = [
  { label: "Sale Items",      emoji: "🔥", isSale: true },
  { label: "AI Assistants",   emoji: "🤖" },
  { label: "Design Tools",    emoji: "🎨" },
  { label: "Coding",          emoji: "💻" },
  { label: "Productivity",    emoji: "📋" },
  { label: "Privacy & VPN",   emoji: "🔒" },
  { label: "Entertainment",   emoji: "🎵" },
  { label: "Voices & Audio",  emoji: "🎙️" },
  { label: "Graphics",        emoji: "✨" },
  { label: "Cloud Storage",   emoji: "☁️" },
  { label: "Education",       emoji: "📚" },
  { label: "All Products",    emoji: "🛍️" },
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
                      <span className="text-[40px]">{cat.emoji}</span>
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
