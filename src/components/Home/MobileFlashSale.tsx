"use client";

import { useEffect, useState } from "react";

function getTarget() {
  return Date.now() + 1 * 24 * 60 * 60 * 1000 + 23 * 60 * 60 * 1000 + 47 * 60 * 1000 + 16 * 1000;
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function MobileFlashSale() {
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
    <section className="px-4 pb-[54px] lg:hidden bg-[#EBEBEB]">
      <div className="w-full rounded-[10px] bg-[#F4F691] px-4 py-8 flex flex-col items-center justify-center text-center">
        
        {/* Left label */}
        <h3 className="text-[18px] font-bold text-gray-900 tracking-tight mb-2">
          Flash Sale now on!
        </h3>

        {/* Countdown */}
        <div className="flex items-center text-[#0A0A0A] mt-2 mb-4">
          <span className="text-[38px] font-black leading-none tabular-nums tracking-tight">
            {pad(time.d)}
          </span>
          <span className="text-[20px] font-medium leading-none mx-[6px] relative -top-[2px]">:</span>
          <span className="text-[38px] font-black leading-none tabular-nums tracking-tight">
            {pad(time.h)}
          </span>
          <span className="text-[20px] font-medium leading-none mx-[6px] relative -top-[2px]">:</span>
          <span className="text-[38px] font-black leading-none tabular-nums tracking-tight">
            {pad(time.m)}
          </span>
          <span className="text-[20px] font-medium leading-none mx-[6px] relative -top-[2px]">:</span>
          <span className="text-[38px] font-black leading-none tabular-nums tracking-tight">
            {pad(time.s)}
          </span>
        </div>

        {/* Right text */}
        <p className="text-[17px] text-gray-900 leading-[1.3] font-medium mb-6">
          Save on modern table office,<br />
          best sellers + more
        </p>

        {/* CTA */}
        <button className="liquid-fill-white w-[90%] max-w-[280px] h-[54px] flex items-center justify-center bg-[#0A0A0A] text-white text-[16px] font-bold rounded-full whitespace-nowrap overflow-hidden z-10 transition-colors">
          Use Code: FLASH30
        </button>

      </div>
    </section>
  );
}
