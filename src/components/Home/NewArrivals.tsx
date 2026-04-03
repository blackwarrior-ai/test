"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import Link from "next/link";

/* ── Product data ── */
const products = [
  {
    category: "CHAIRS",
    name: "Cross Chair Heritage",
    price: 589.0,
    image: "/products/cross-chair.webp",
    colors: ["#C4B9A8", "#3A3A3A"],
  },
  {
    category: "SOFAS",
    name: "Ray Sofa Basic",
    price: 3289.0,
    image: "/products/ray-sofa.webp",
    colors: ["#B8BCA8", "#8BBCAC"],
  },
  {
    category: "CHAIRS",
    name: "Turn Chair Vivid",
    price: 309.0,
    image: "/products/turn-chair.webp",
    colors: ["#8B2A2A", "#D4A843"],
  },
  {
    category: "SOFA",
    name: "Loop Sofa Armrest",
    price: 3289.0,
    image: "/products/loop-sofa.webp",
    colors: ["#3A3A3A", "#A8C8D8"],
  },
  {
    category: "FLOATING",
    name: "Pixel Shelf",
    price: 85.0,
    image: "/products/pixel-shelf.webp",
    colors: ["#A89080"],
  },
  {
    category: "TABLES",
    name: "Edge Table Round",
    price: 429.0,
    image: "/products/edge-table.webp",
    colors: ["#D4C4A8", "#3A3A3A"],
  },
];

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
          {products.map((product) => (
            <div key={product.name} className="shrink-0 w-[220px] lg:w-[240px] group">
              {/* Image area */}
              <Link href="#" className="block">
                <div className="liquid-fill w-full aspect-[1/1.1] rounded-xl bg-[#F3F3F3] flex items-center justify-center relative transition-colors duration-200">
                  {/* Placeholder — replace with next/image */}
                  <div className="w-[60%] h-[60%] bg-[#E5E5E5] rounded-lg" />
                </div>
              </Link>

              {/* Info */}
              <div className="mt-3">
                <span className="text-[11px] font-semibold text-gray-400 tracking-wider uppercase">
                  {product.category}
                </span>
                <h4 className="text-[15px] font-semibold text-gray-900 mt-0.5 leading-snug">
                  {product.name}
                </h4>
                <p className="text-[15px] font-bold text-gray-900 mt-1">
                  ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>

                {/* Color swatches */}
                <div className="flex items-center gap-1.5 mt-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className="w-5 h-5 rounded-full border border-gray-200 hover:ring-2 hover:ring-gray-300 hover:ring-offset-1 transition-all duration-150"
                      style={{ backgroundColor: color }}
                      aria-label={`Color ${color}`}
                    />
                  ))}
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
