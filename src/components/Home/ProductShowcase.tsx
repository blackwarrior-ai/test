"use client";

import Link from "next/link";

const rightTopCards = [
  {
    label: "MW08 Sport",
    href: "/products/mw08-sport",
    bg: "#2C3A2C",
    image: "/showcase/mw08-sport.webp",
  },
  {
    label: "Accessories",
    href: "/collections/accessories",
    bg: "#B0B8BC",
    image: "/showcase/accessories.webp",
  },
];

const leftCard = {
  label: "MG20 Gaming Headphones",
  href: "/products/mg20-gaming",
  bg: "#1A2535",
  image: "/showcase/mg20-gaming.webp",
};

const rightBottomCard = {
  label: "MH40 Wireless",
  href: "/products/mh40-wireless",
  bg: "#4A3728",
  image: "/showcase/mh40-wireless.webp",
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
            {/* Placeholder bg — replace with next/image */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1A2535] via-[#263040] to-[#080E18]" />
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
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${card.bg}CC, ${card.bg}99)`,
                    }}
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
              <div className="absolute inset-0 bg-gradient-to-br from-[#6B4C37] via-[#4A3728] to-[#2A1F16]" />
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
