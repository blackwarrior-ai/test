"use client";

import { useEffect, useState } from "react";

/* Target: 1 day 23h 47m 16s from now (resets on mount) */
function getTarget() {
  return Date.now() + 1 * 24 * 60 * 60 * 1000 + 23 * 60 * 60 * 1000 + 47 * 60 * 1000 + 16 * 1000;
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function FlashSaleBanner() {
  const [target] = useState(getTarget);
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    function tick() {
      const diff = Math.max(0, target - Date.now());
      const s = Math.floor(diff / 1000) % 60;
      const m = Math.floor(diff / 60000) % 60;
      const h = Math.floor(diff / 3600000) % 24;
      const d = Math.floor(diff / 86400000);
      setTime({ d, h, m, s });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <section className="pb-2 lg:pb-3">
      <div className="max-w-[1347px] mx-auto px-[16px]">
        <div className="w-full rounded-2xl bg-[#F4F691] px-6 py-6 lg:px-16 min-h-[90px] lg:min-h-[140px] flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
          {/* Left label */}
          <span className="text-[14px] lg:text-[15px] font-bold text-gray-900 whitespace-nowrap shrink-0">
            Flash Sale now on!
          </span>

          {/* Countdown */}
          <div className="flex items-center gap-0 text-[#0A0A0A] shrink-0">
            <span className="text-[36px] lg:text-[46px] font-black leading-none tabular-nums tracking-tight">
              {pad(time.d)}
            </span>
            <span className="text-[22px] lg:text-[28px] font-normal leading-none mx-2 lg:mx-3">:</span>
            <span className="text-[36px] lg:text-[46px] font-black leading-none tabular-nums tracking-tight">
              {pad(time.h)}
            </span>
            <span className="text-[22px] lg:text-[28px] font-normal leading-none mx-2 lg:mx-3">:</span>
            <span className="text-[36px] lg:text-[46px] font-black leading-none tabular-nums tracking-tight">
              {pad(time.m)}
            </span>
            <span className="text-[22px] lg:text-[28px] font-normal leading-none mx-2 lg:mx-3">:</span>
            <span className="text-[36px] lg:text-[46px] font-black leading-none tabular-nums tracking-tight">
              {pad(time.s)}
            </span>
          </div>

          {/* Right text */}
          <p className="text-[13px] lg:text-[14px] text-gray-700 text-center lg:text-left leading-relaxed shrink-0">
            Save on modern table office,
            <br />
            best sellers + more
          </p>

          {/* CTA */}
          <button className="liquid-fill-white shrink-0 px-8 py-4 bg-[#0A0A0A] text-white text-[14px] font-bold rounded-full transition-colors duration-200 whitespace-nowrap">
            Use Code: FLASH30
          </button>
        </div>
      </div>
    </section>
  );
}
