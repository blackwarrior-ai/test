"use client";

import React from "react";
import Link from "next/link";

const DEALS = [
  {
    label: "AI ASSISTANTS",
    title: "Unlock AI Power",
    subtitle: "Save up to 40% on ChatGPT, Gemini & more",
    cta: "Shop AI Tools",
    bgColor: "bg-[#F9E0DB]",
    badgeColor: "bg-[#E2F04D] text-black",
    discount: "40%",
  },
  {
    label: "DESIGN & CREATIVE",
    title: "Create Without Limits",
    subtitle: "Premium design tools at 30% off",
    cta: "Shop Design",
    bgColor: "bg-[#D8EDE0]",
    badgeColor: "bg-[#F06050] text-white",
    discount: "30%",
  },
  {
    label: "SECURITY & VPN",
    title: "Stay Protected",
    subtitle: "NordVPN, 1Password & more — up to 75% off",
    cta: "Shop Security",
    bgColor: "bg-[#E0E0F0]",
    badgeColor: "bg-[#1D349A] text-white",
    discount: "75%",
  },
];

const WHY_DIGILINK = [
  { title: "Instant Delivery", desc: "Get your license key within seconds after purchase.", num: "01" },
  { title: "Verified Genuine", desc: "Every product is 100% authentic and officially licensed.", num: "02" },
  { title: "Best Prices", desc: "Up to 75% off retail — guaranteed lowest prices online.", num: "03" },
  { title: "24/7 Support", desc: "Our team is here to help anytime you need assistance.", num: "04" },
];

export function MobileInspiredSection() {
  return (
    <section className="w-full lg:hidden bg-[#EBEBEB] pt-[40px] pb-[30px]">

      {/* Section Header */}
      <div className="px-4 mb-5">
        <h2 className="text-gray-900 text-[22px] sm:text-[24px] font-extrabold font-[var(--font-heading)] leading-tight">
          Deals You Don&apos;t Want to Miss
        </h2>
        <div className="w-full h-px bg-black/10 mt-4" />
      </div>

      {/* Deal Cards */}
      <div className="flex flex-col gap-3 px-4 mb-8">
        {DEALS.map((deal, i) => (
          <div
            key={i}
            className={`relative w-full rounded-[10px] overflow-hidden ${deal.bgColor} px-5 py-6 flex flex-col`}
          >
            {/* Label */}
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
              {deal.label}
            </span>

            {/* Title */}
            <h3 className="text-gray-900 text-[20px] font-extrabold leading-tight mb-1.5">
              {deal.title}
            </h3>

            {/* Subtitle */}
            <p className="text-gray-600 text-[13px] leading-relaxed mb-5 max-w-[70%]">
              {deal.subtitle}
            </p>

            {/* Save Badge */}
            <div className={`absolute top-5 right-5 w-[56px] h-[56px] rounded-full ${deal.badgeColor} flex flex-col items-center justify-center`}>
              <span className="text-[9px] font-bold leading-none">Save</span>
              <span className="text-[17px] font-black leading-tight">{deal.discount}</span>
            </div>

            {/* CTA */}
            <Link
              href="/shop"
              className="inline-flex items-center justify-center bg-[#1a1a1a] text-white text-[13px] font-bold px-5 py-2.5 rounded-full self-start"
            >
              {deal.cta}
            </Link>
          </div>
        ))}
      </div>

      {/* Why DigiLink */}
      <div className="px-4">
        <h3 className="text-gray-900 text-[18px] font-extrabold mb-5">
          Why DigiLink?
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {WHY_DIGILINK.map((item, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-[10px] p-4 overflow-hidden border border-transparent hover:border-[#1D349A]/20 transition-all duration-500"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              {/* Animated gradient bg on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1D349A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Number */}
              <span className="relative block text-[32px] font-black text-[#1D349A]/10 leading-none mb-2 group-hover:text-[#1D349A]/25 transition-colors duration-500">
                {item.num}
              </span>

              {/* Content */}
              <div className="relative">
                <h4 className="text-gray-900 text-[13px] font-bold mb-1.5 group-hover:text-[#1D349A] transition-colors duration-300">
                  {item.title}
                </h4>
                <p className="text-gray-500 text-[11px] leading-relaxed">{item.desc}</p>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#1D349A] group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-4 bg-[#1D349A] rounded-[10px] px-4 py-4 flex items-center justify-between">
          <div className="text-center flex-1">
            <span className="block text-white text-[18px] font-black leading-none">50K+</span>
            <span className="block text-white/50 text-[9px] font-semibold uppercase tracking-wider mt-1">Customers</span>
          </div>
          <div className="w-px h-8 bg-white/15" />
          <div className="text-center flex-1">
            <span className="block text-white text-[18px] font-black leading-none">4.9</span>
            <span className="block text-white/50 text-[9px] font-semibold uppercase tracking-wider mt-1">Rating</span>
          </div>
          <div className="w-px h-8 bg-white/15" />
          <div className="text-center flex-1">
            <span className="block text-white text-[18px] font-black leading-none">200+</span>
            <span className="block text-white/50 text-[9px] font-semibold uppercase tracking-wider mt-1">Products</span>
          </div>
        </div>
      </div>

    </section>
  );
}
