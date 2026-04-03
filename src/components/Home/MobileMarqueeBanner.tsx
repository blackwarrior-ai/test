"use client";

import { useEffect, useState } from "react";

const PHRASE = "Buy Tools at the Price of Candy     ·     DigiLink is Built to Serve You     ·     ";

const backgrounds = [
  "linear-gradient(to right, #B8A0D0, #EAB8C8)", // slide 1 — pastel lavender/pink
  "linear-gradient(to right, #484947, #9F9F9D)", // slide 2 — grey/silver
  "linear-gradient(to right, #0D0D0D, #2E0E0E)"  // slide 3 — dark charcoal/red
];

export function MobileMarqueeBanner() {
  const content = PHRASE.repeat(6);
  // Default to first slide
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    // Sync using exact index for identical absolute-layer fade implementation
    const handleSlideChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ index: number }>;
      setCurrent(customEvent.detail.index);
    };

    window.addEventListener('hero-slide-change', handleSlideChange);
    return () => window.removeEventListener('hero-slide-change', handleSlideChange);
  }, []);

  return (
    <>
      <style>{`
        @keyframes mobile-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .mobile-marquee-inner {
          animation: mobile-marquee 60s linear infinite;
          will-change: transform;
        }
      `}</style>

      <section className="relative w-full overflow-hidden py-8 select-none lg:hidden">
        {backgrounds.map((bg, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out z-[-1] ${
              idx === current ? "opacity-100" : "opacity-0"
            }`}
            style={{ background: bg }}
          />
        ))}

        <div className="relative z-10 mobile-marquee-inner whitespace-nowrap inline-block">
          <span className="text-[32px] sm:text-[40px] font-extrabold tracking-tight text-white uppercase drop-shadow-sm">
            {content + content}
          </span>
        </div>
      </section>
    </>
  );
}