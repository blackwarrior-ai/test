"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import Link from "next/link";
import { products } from "@/data/products";

const displayProducts = products.slice(0, 6);

const tabs = ["New Arrivals", "Hot Items"] as const;

export function NewArrivals() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("New Arrivals");
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateProgress = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(0);
      return;
    }
    setScrollProgress(el.scrollLeft / maxScroll);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateProgress();
    el.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });
    return () => {
      el.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [updateProgress]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.55;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="py-10 lg:py-14">
      <div className="max-w-[1347px] mx-auto px-[16px]">
        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-[28px] lg:text-[32px] font-bold text-gray-900 leading-tight">
              New Arrivals
            </h2>
            <p className="mt-2 text-gray-500 text-[15px]">
              Traditional divides between personal and professional space.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-[15px] font-semibold pb-1 transition-colors duration-200 ${
                  activeTab === tab
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable product row */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Promotion card */}
          <div className="shrink-0 w-[280px] lg:w-[300px] rounded-xl overflow-hidden relative bg-[#8A7D6B] flex flex-col justify-between min-h-[420px]">
            {/* Placeholder bg — replace with real image */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#8A7D6B] via-[#7A6D5B] to-[#6A5D4B]" />

            <div className="relative z-10 p-6 flex flex-col justify-between h-full">
              <div>
                <span className="text-[#D4C480] text-sm font-semibold tracking-wide">
                  Promotion
                </span>
                <h3 className="text-white text-[26px] lg:text-[28px] font-bold leading-tight mt-2">
                  Soft Stools
                  <br />
                  Design
                </h3>
              </div>

              <Link
                href="/collections/soft-stools"
                className="liquid-fill inline-flex items-center justify-center w-fit px-6 py-2.5 bg-white text-gray-900 text-sm font-semibold rounded-full transition-colors duration-200 mt-auto"
              >
                Shop Now
              </Link>
            </div>
          </div>

          {/* Product cards */}
          {displayProducts.map((product) => (
            <div key={product.slug} className="shrink-0 w-[220px] lg:w-[240px] group">
              {/* Image area */}
              <Link href={`/products/${product.slug}`} className="block">
                <div className="liquid-fill w-full aspect-[1/1.1] rounded-xl bg-[#F3F3F3] flex items-center justify-center relative transition-colors duration-200 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('${product.image}')` }}
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-[#1D349A] text-white text-[11px] font-bold px-2 py-1 rounded z-10">
                      {product.badge}
                    </span>
                  )}
                  <span className="absolute top-3 right-3 bg-red-600 text-white text-[11px] font-bold px-2 py-1 rounded z-10">
                    {product.discount}
                  </span>
                </div>
              </Link>

              {/* Info */}
              <div className="mt-3">
                <span className="text-[11px] font-semibold text-[#1D349A] tracking-wider uppercase">
                  {product.category}
                </span>
                <h4 className="text-[15px] font-semibold text-gray-900 mt-0.5 leading-snug">
                  {product.title}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-[15px] font-bold text-gray-900">
                    ${product.newPrice.toFixed(2)}
                  </p>
                  <p className="text-[13px] text-gray-400 line-through">
                    ${product.oldPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar: progress + arrows */}
        <div className="mt-6 flex items-center justify-between gap-4">
          {/* Progress bar */}
          <div className="flex-1 h-[2px] bg-gray-200 rounded-full relative overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-gray-900 rounded-full transition-all duration-200"
              style={{ width: "30%", transform: `translateX(${scrollProgress * 233}%)` }}
            />
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="liquid-fill-circle w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center transition-colors duration-200"
              aria-label="Scroll left"
            >
              <IoChevronBack className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="liquid-fill-circle w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center transition-colors duration-200"
              aria-label="Scroll right"
            >
              <IoChevronForward className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
