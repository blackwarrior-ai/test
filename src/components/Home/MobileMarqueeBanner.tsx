"use client";

const PHRASE = "Buy Tools at the Price of Candy     ·     DigiLink is Built to Serve You     ·     ";

const backgrounds = [
  "linear-gradient(to right, #FD6246, #E02300)", // slide 1 — Light #EF2600 Red
  "linear-gradient(to right, #484947, #9F9F9D)", // slide 2 — grey/silver
  "linear-gradient(to right, #242424, #000000)"  // slide 3 — dark black shade
];

export function MobileMarqueeBanner({ current = 0 }: { current?: number }) {
  const content = PHRASE.repeat(6);

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