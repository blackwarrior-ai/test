"use client";

import React from "react";
import Link from "next/link";

const CATEGORIES = [
  { id: 1, name: "Sale Items", highlight: true },
  { id: 2, name: "AI Assistants" },
  { id: 3, name: "Design Tools" },
  { id: 4, name: "Productivity" },
  { id: 5, name: "Security" },
  { id: 6, name: "Developer" },
  { id: 7, name: "Streaming" },
  { id: 8, name: "AI Writing" },
  { id: 9, name: "AI Art" },
  { id: 10, name: "AI Video" },
  { id: 11, name: "Learning" },
  { id: 12, name: "Accessories" },
];

export function MobileShopByCategories() {
  return (
    <section className="w-full lg:hidden bg-[#EBEBEB] pt-[40px] pb-[20px] px-4">
      {/* Header */}
      <h2 className="text-gray-900 text-[22px] sm:text-[24px] font-extrabold font-[var(--font-heading)] leading-tight mb-1">
        Shop By Categories
      </h2>
      <Link href="/shop" className="text-gray-900 text-[14px] font-semibold underline underline-offset-4 inline-flex items-center gap-1 mb-5">
        Shop All Products <span className="text-[16px]">›</span>
      </Link>

      {/* Category Grid */}
      <div className="grid grid-cols-3 gap-3 w-full max-w-[500px] mx-auto">
        {CATEGORIES.map((cat) => (
          <Link key={cat.id} href="/shop" className="flex flex-col items-center gap-2 py-3">
            <div className={`w-[72px] h-[72px] rounded-full flex items-center justify-center ${
              cat.highlight ? "bg-[#D65324]" : "bg-[#e0e0e0]"
            }`}>
              {cat.highlight ? (
                <span className="text-white text-[13px] font-extrabold">Sale</span>
              ) : (
                <span className="text-gray-500 text-[11px] font-bold text-center leading-tight px-1">{cat.name.split(' ')[0]}</span>
              )}
            </div>
            <span className="text-gray-900 text-[12px] sm:text-[13px] font-semibold text-center leading-tight">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
