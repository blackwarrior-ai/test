"use client";

const PHRASE = "Buy Tools at the Price of Candy     ·     DigiLink is Built to Serve You     ·     ";

export function MarqueeBanner() {
  // Repeat phrase enough times so it's always wider than any screen
  const content = PHRASE.repeat(6);

  return (
    <>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-inner {
          animation: marquee 60s linear infinite;
          will-change: transform;
        }
      `}</style>

      <section className="w-full overflow-hidden py-4 select-none">
        {/* Inner duplicated: first half animates out, second half is identical so loop is seamless */}
        <div className="marquee-inner whitespace-nowrap inline-block">
          <span className="text-[64px] lg:text-[88px] font-extrabold tracking-tight leading-none text-gray-900">
            {content + content}
          </span>
        </div>
      </section>
    </>
  );
}
