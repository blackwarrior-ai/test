"use client";

import { useRef, useState, useEffect } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const categories = [
  { label: "AI Assistants", emoji: "🤖" },
  { label: "Design Tools", emoji: "🎨", hasArrow: true },
  { label: "Coding", emoji: "💻" },
  { label: "Productivity", emoji: "📋" },
  { label: "Privacy & VPN", emoji: "🔒" },
  { label: "Entertainment", emoji: "🎵" },
  { label: "Voices", emoji: "🎙️" },
  { label: "Graphics", emoji: "✨" },
  { label: "Cloud Storage", emoji: "☁️" },
  { label: "Education", emoji: "📚" },
  { label: "All Products", emoji: "🛍️" },
];

export function CategoryCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  /* ── Drag listeners attached once, use refs to avoid stale closures ── */
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const el = scrollRef.current;
      if (!el) return;
      const walk = (e.clientX - dragStartX.current) * 1.5;
      el.scrollLeft = dragScrollLeft.current - walk;
    };
    const onMouseUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      setIsDragging(false);
      /* snap to nearest full box after drag ends */
      const el = scrollRef.current;
      if (!el) return;
      el.style.scrollSnapType = "x mandatory";
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []); // empty deps — refs handle live values

  const onMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    /* disable snap while dragging so it doesn't fight cursor */
    el.style.scrollSnapType = "none";
    isDraggingRef.current = true;
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragScrollLeft.current = el.scrollLeft;
  };

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.style.scrollSnapType = "x mandatory";
    el.scrollBy({ left: dir === "left" ? -el.clientWidth * 0.6 : el.clientWidth * 0.6, behavior: "smooth" });
  };

  /* ── Arrow button (reusable) ── */
  const ArrowBtn = ({ dir }: { dir: "left" | "right" }) => (
    <button
      onClick={() => scroll(dir)}
      aria-label={`Scroll ${dir}`}
      className="group relative w-[40px] h-[40px] rounded-full border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.13)] overflow-hidden flex items-center justify-center"
      style={{
        opacity: isHovered ? 1 : 0,
        transform: isHovered ? "scale(1)" : "scale(0.75)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
        pointerEvents: isHovered ? "auto" : "none",
        flexShrink: 0,
      }}
    >
      {/* white base */}
      <span className="absolute inset-0 bg-white" />
      {/* black liquid fill — scale from center on hover */}
      <span
        className="absolute inset-0 rounded-full bg-black origin-center"
        style={{ transform: "scale(0)", transition: "transform 0.8s cubic-bezier(0.4,0,0.2,1)" }}
        // React can't animate group-hover via inline style — handled via CSS class below
      />
      {dir === "left"
        ? <IoChevronBack className="relative z-10 w-5 h-5 text-black group-hover:text-white transition-colors duration-700" />
        : <IoChevronForward className="relative z-10 w-5 h-5 text-black group-hover:text-white transition-colors duration-700" />
      }
    </button>
  );

  return (
    <section
      className="py-6 w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsDragging(false); }}
    >
      <div className="max-w-[1347px] mx-auto px-4">
        <div className="flex items-start gap-2">

          {/* LEFT ARROW */}
          <div className="shrink-0 flex items-center justify-center" style={{ paddingTop: "24px" }}>
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="arrow-btn group relative w-[40px] h-[40px] rounded-full border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.13)] overflow-hidden flex items-center justify-center"
              style={{
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? "scale(1)" : "scale(0.75)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
                pointerEvents: isHovered ? "auto" : "none",
              }}
            >
              <span className="absolute inset-0 bg-white z-0" />
              <span className="absolute inset-0 bg-black z-[1] scale-0 group-hover:scale-100 rounded-full origin-center transition-transform duration-[800ms]" />
              <IoChevronBack className="relative z-10 w-5 h-5 text-black group-hover:text-white transition-colors duration-700" />
            </button>
          </div>

          {/* SCROLLABLE CONTENT */}
          <div
            ref={scrollRef}
            onMouseDown={onMouseDown}
            className="flex gap-12 overflow-x-auto flex-1 py-2 select-none"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              cursor: isDragging ? "grabbing" : "grab",
              scrollSnapType: "x mandatory",
            }}
          >
            {categories.map((cat, i) => (
              <button
                key={i}
                className="flex flex-col items-center gap-2.5 min-w-[110px] group shrink-0"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="liquid-fill-circle w-[90px] h-[90px] rounded-full bg-[#F5F5F5] flex items-center justify-center transition-colors duration-200">
                  <span className="text-[36px]">{cat.emoji}</span>
                </div>
                <span className="text-[13px] font-semibold text-gray-900 whitespace-nowrap flex items-center gap-1">
                  {cat.label}
                  {cat.hasArrow && <IoChevronForward className="w-3 h-3 text-gray-500" />}
                </span>
              </button>
            ))}
          </div>

          {/* RIGHT ARROW */}
          <div className="shrink-0 flex items-center justify-center" style={{ paddingTop: "24px" }}>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="arrow-btn group relative w-[40px] h-[40px] rounded-full border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.13)] overflow-hidden flex items-center justify-center"
              style={{
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? "scale(1)" : "scale(0.75)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
                pointerEvents: isHovered ? "auto" : "none",
              }}
            >
              <span className="absolute inset-0 bg-white z-0" />
              <span className="absolute inset-0 bg-black z-[1] scale-0 group-hover:scale-100 rounded-full origin-center transition-transform duration-[800ms]" />
              <IoChevronForward className="relative z-10 w-5 h-5 text-black group-hover:text-white transition-colors duration-700" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
