"use client";

import Link from "next/link";

const rightTopCards = [
  {
    label: "Canva Pro",
    href: "/products/canva-pro",
    bg: "#9d83b0",
    image: "/hero/canva-pro.jpg",
  },
  {
    label: "Gemini Pro",
    href: "/products/gemini-pro",
    bg: "#6384a3",
    image: "/hero/gemini-pro.png",
  },
];

const leftCard = {
  label: "ChatGPT Plus Private",
  href: "/products/chatgpt-private",
  bg: "#c87676",
  image: "/hero/chatgpt-logo-dl.jpg",
};

const rightBottomCard = {
  label: "SuperGrok by xAI",
  href: "/products/supergrok",
  bg: "#c49a6c",
  image: "/hero/grok.jpg",
};

export function ProductShowcase() {
  return (
    <section className="pt-5 pb-10 lg:pt-7 lg:pb-14">
      <div className="max-w-[1347px] mx-auto px-[16px]">
        <div className="flex gap-2 rounded-2xl overflow-hidden" style={{ height: "580px" }}>

          {/* LEFT — large card */}
          <Link
            href={leftCard.href}
            className="liquid-fill-white relative flex-1 rounded-2xl overflow-hidden flex items-end"
            style={{ backgroundColor: leftCard.bg }}
          >
            {/* Background image */}
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${leftCard.image}')` }} />
            {/* Dark gradient at bottom for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <span className="relative z-10 px-5 pb-5 text-[18px] lg:text-[22px] font-bold text-white">
              {leftCard.label}
            </span>
          </Link>

          {/* RIGHT — top 2 + bottom 1 */}
          <div className="flex flex-col gap-2" style={{ width: "49%" }}>

            {/* Top row: 2 small cards */}
            <div className="flex gap-2 flex-1">
              {rightTopCards.map((card) => (
                <Link
                  key={card.label}
                  href={card.href}
                  className="liquid-fill-white relative flex-1 rounded-2xl overflow-hidden flex items-end"
                  style={{ backgroundColor: card.bg }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${card.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <span className="relative z-10 px-4 pb-4 text-[14px] lg:text-[16px] font-bold text-white">
                    {card.label}
                  </span>
                </Link>
              ))}
            </div>

            {/* Bottom: 1 wide card */}
            <Link
              href={rightBottomCard.href}
              className="liquid-fill-white relative rounded-2xl overflow-hidden flex items-end flex-1"
              style={{ backgroundColor: rightBottomCard.bg }}
            >
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${rightBottomCard.image}')` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <span className="relative z-10 px-5 pb-5 text-[18px] lg:text-[22px] font-bold text-white">
                {rightBottomCard.label}
              </span>
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
}
