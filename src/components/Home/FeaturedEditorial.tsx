"use client";

import Link from "next/link";

const cards = [
  {
    subtitle: "AI Assistants",
    title: "ChatGPT Plus",
    bgColor: "#c87676",
    image: "/hero/chatgpt-logo-dl.jpg",
    product: { name: "Private Account", price: 9.99 },
    href: "/products/chatgpt-private",
  },
  {
    subtitle: "Design Tools",
    title: "Canva Pro",
    bgColor: "#9d83b0",
    image: "/hero/canva-pro.jpg",
    product: { name: "Full Access", price: 5.0 },
    href: "/products/canva-pro",
  },
  {
    subtitle: "AI Research",
    title: "Perplexity Pro",
    bgColor: "#7a9e86",
    image: "/hero/perplexity-pro.jpg",
    product: { name: "Unlimited Searches", price: 11.99 },
    href: "/products/perplexity-pro",
  },
  {
    subtitle: "AI Assistants",
    title: "SuperGrok",
    bgColor: "#c49a6c",
    image: "/hero/grok.jpg",
    product: { name: "xAI Premium", price: 12.99 },
    href: "/products/supergrok",
  },
];

export function FeaturedEditorial() {
  return (
    <section className="py-10 lg:py-14">
      <div className="max-w-[1347px] mx-auto px-[16px]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card) => (
            <div
              key={card.title}
              className="relative rounded-2xl overflow-hidden flex flex-col justify-end h-[320px] lg:h-[360px]"
              style={{ backgroundColor: card.bgColor }}
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${card.image}')` }}
              />
              {/* Gradient overlay — transparent top → dark bottom */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent from-35% to-black/65 z-[1]" />

              {/* Subtitle + Title */}
              <div className="relative z-[2] px-4 pb-3">
                <p className="text-[12px] font-semibold text-white/75 tracking-wide mb-1.5">
                  {card.subtitle}
                </p>
                <h3 className="text-[22px] lg:text-[26px] font-bold text-white leading-tight mb-3">
                  {card.title}
                </h3>
              </div>

              {/* Product info strip */}
              <div className="relative z-[2] flex items-center gap-2.5 bg-black/45 px-3 py-3">
                {/* Thumbnail */}
                <div className="w-[46px] h-[46px] rounded-lg bg-[#F5EFE8] shrink-0 flex items-center justify-center overflow-hidden">
                  {/* Replace with <Image> when real images are ready */}
                  <div className="w-[28px] h-[28px] bg-gray-300 rounded" />
                </div>

                {/* Name + Price */}
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-white leading-tight truncate">
                    {card.product.name}
                  </p>
                  <p className="text-[13px] text-white/80 mt-0.5">
                    ${card.product.price.toFixed(2)}
                  </p>
                </div>

                {/* Shop button */}
                <Link
                  href={card.href}
                  className="liquid-fill shrink-0 px-4 py-2 bg-white text-gray-900 text-[13px] font-semibold rounded-full whitespace-nowrap"
                >
                  Shop
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
