"use client";

import { useState, useEffect, useCallback } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import Link from "next/link";
import { MobileSmallCategoryCarousel } from "./MobileSmallCategoryCarousel";
import { MobileMarqueeBanner } from "./MobileMarqueeBanner";

const SLIDE_DURATIONS = [9000, 5000, 5000];
const PROGRESS_CIRCUMFERENCE = 100.5;

/* ── Slide data ── */
const slides = [
  {
    id: 1,
    subtitle: "High-end Earphones",
    title: "Premium Audio\nProducts",
    cta: "Discover Collection",
    ctaBg: "bg-white text-gray-900 hover:bg-gray-100",
    href: "/collections/earphones",
    image: "/hero/slide-1.webp",
    bgColor: "#F74A2C",
    outerBg: "linear-gradient(135deg, #FD6246 0%, #F53613 50%, #E02300 100%)",
  },
  {
    id: 2,
    subtitle: "High-end Headphones",
    title: "High-\nPerformance\nSound Tools",
    cta: "Discover Collection",
    ctaBg: "bg-[#2C364E] text-white hover:bg-[#3B4867]",
    href: "/collections/headphones",
    image: "/hero/slide-2.webp",
    bgColor: "#51514F",
    outerBg: "linear-gradient(135deg, #484947 0%, #51514F 50%, #9F9F9D 100%)",
  },
  {
    id: 3,
    subtitle: "Introducing the MW08 Sport",
    title: "High-\nPerformance &\nElegant Design",
    cta: "Shop the MW08 Sport",
    ctaBg: "bg-white text-gray-900 hover:bg-gray-100",
    href: "/collections/sport",
    image: "/hero/slide3-latest.png",
    bgColor: "#111111",
    outerBg: "linear-gradient(135deg, #242424 0%, #111111 50%, #000000 100%)",
  },
];

export function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [progressMs, setProgressMs] = useState(0);
  const [videoRestartKey, setVideoRestartKey] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      if (index === current) return;
      setCurrent(index);
    },
    [current]
  );

  // Sync active slide index via event for perfectly synced cross-fades
  useEffect(() => {
    document.documentElement.style.setProperty('--active-slide-bg', slides[current].bgColor);
    window.dispatchEvent(new CustomEvent('hero-slide-change', { detail: { index: current } }));

    setProgressMs(0);
    if (current === 0) {
      setVideoRestartKey((prev) => prev + 1);
    }
  }, [current]);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const duration = SLIDE_DURATIONS[current];
    let frameId = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;

      if (elapsed >= duration) {
        setProgressMs(duration);
        setCurrent((prev) => (prev + 1) % slides.length);
        return;
      }

      setProgressMs(elapsed);
      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [current]);

  const activeProgress = Math.min(progressMs / SLIDE_DURATIONS[current], 1);

  return (
    <>
      <style>{`
        @keyframes progressSlide {
          from { stroke-dashoffset: 100.5; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
      
      {/* ── MOBILE HERO (padded card design exactly like screenshot) ── */}
      <section className="lg:hidden relative w-full overflow-hidden" style={{ height: "calc(100svh - 32px)" }}>
        {/* Background that bleeds behind the fixed header */}
        {slides.map((slide, i) => (
          <div
            key={`outer-${slide.id}`}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
            style={{ background: slide.outerBg }}
          />
        ))}

        {/* Card Container - padded from edges, sits below the transparent header */}
        <div className="absolute inset-0 z-10 pt-[58px] pb-4 px-[14px] pointer-events-none">
          <div className="relative w-full h-full rounded-[16px] overflow-hidden pointer-events-auto border border-white/10 shadow-2xl">
            {slides.map((slide, i) => (
              <div
                key={`inner-${slide.id}`}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out flex flex-col justify-center px-8 text-left overflow-hidden ${
                  i === current ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
                style={{ backgroundColor: slide.bgColor }}
              >
                {/* Video Background for Slide 1 */}
                {i === 0 && current === 0 && (
                  <div className="absolute inset-0 z-0">
                    <video 
                      key={videoRestartKey}
                      src="/hero/slide1.mp4" 
                      className="w-full h-full object-cover" 
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                    />
                  </div>
                )}

                {/* Ad text image overlay — only on first (black) slide. 
                    If you want to keep the text over the video, leave this. 
                    If you don't want text, you can comment it out, but I'll make sure it's above the video. */}
                {i === 0 && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                    {/* If you want to remove the text entirely, just delete this img tag */}
                  </div>
                )}
                {/* Image overlay — only on second slide */}
                {i === 1 && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <img
                      src="/hero/slide2-ad.png"
                      alt="Slide 2 Ad"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {/* Image overlay — only on third slide */}
                {i === 2 && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <img
                      src="/hero/slide3-ad.png"
                      alt="Slide 3 Ad"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            ))}

            {/* Numbered slide indicators — bottom right, grouped overlapping circles based on screenshot */}
            <div className="absolute bottom-6 right-6 z-20 flex items-center -space-x-1.5">
              {slides.map((_, i) => {
                const isActive = i === current;
                return (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`relative w-[34px] h-[34px] rounded-full flex items-center justify-center text-[13px] font-bold transition-all duration-300 ${
                      isActive
                        ? "bg-transparent text-white z-10"
                        : "bg-transparent text-white border border-white/70 hover:bg-white/10 z-0"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  >
                    <span className="relative z-10">{i + 1}</span>
                    
                    {/* SVG Progress Border for the Active Slide */}
                    {isActive && (
                      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 34 34">
                        <circle
                          cx="17"
                          cy="17"
                          r="16"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeDasharray={PROGRESS_CIRCUMFERENCE}
                          strokeDashoffset={PROGRESS_CIRCUMFERENCE * (1 - activeProgress)}
                        />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Sync components embedded safely directly below mobile banner to enforce absolute variable sync */}
      <div className="lg:hidden">
        <MobileSmallCategoryCarousel />
        <MobileMarqueeBanner current={current} />
      </div>

      {/* ── DESKTOP HERO (boxed, inside container) ── */}
      <section className="hidden lg:block relative w-full">
        <div className="max-w-[1347px] mx-auto px-[16px]">
          {/* Slider container */}
          <div className="relative w-full rounded-xl overflow-hidden" style={{ aspectRatio: "1315 / 520" }}>
            {/* Slides */}
            {slides.map((slide, i) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-600 ease-in-out ${
                  i === current ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
                style={{ backgroundColor: slide.bgColor }}
              >
                {/* Background placeholder — replace with next/image */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50" />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
                  <span className="text-sm md:text-base lg:text-lg font-medium tracking-wide mb-2 opacity-90">
                    {slide.subtitle}
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-bold tracking-tight leading-tight mb-6 lg:mb-8">
                    {slide.title}
                  </h2>
                  <Link
                    href={slide.href}
                    className="liquid-fill-white inline-flex items-center justify-center px-8 py-3.5 border-2 border-white text-white font-semibold rounded-full transition-colors duration-300 text-sm md:text-base"
                  >
                    {slide.cta}
                  </Link>
                </div>
              </div>
            ))}

            {/* Navigation arrows */}
            <button
              onClick={prev}
              className="absolute left-4 bottom-6 z-20 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors duration-200"
              aria-label="Previous slide"
            >
              <IoChevronBack className="w-4 h-4 text-white" />
            </button>

            <button
              onClick={next}
              className="absolute right-4 bottom-6 z-20 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors duration-200"
              aria-label="Next slide"
            >
              <IoChevronForward className="w-4 h-4 text-white" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
              {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-8 h-2.5 bg-white"
                    : "w-2.5 h-2.5 bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      </section>
    </>
  );
}
