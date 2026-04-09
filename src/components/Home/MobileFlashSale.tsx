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
    <section className="px-4 pb-[36px] lg:hidden bg-[#EBEBEB]">

      {/* Discount Banner Card */}
      <div className="w-full rounded-[10px] overflow-hidden mb-3 relative h-[130px]">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero/flash-sale-bg.png')" }}
        />
      </div>

      {/* Countdown + Code Box */}
      <div className="w-full rounded-[10px] bg-[#F4F691] px-4 py-6 flex flex-col items-center justify-center text-center">

        {/* Countdown */}
        <div className="flex items-center text-[#0A0A0A] mb-4">
          {[
            { val: pad(time.d), label: "Days" },
            { val: pad(time.h), label: "Hrs" },
            { val: pad(time.m), label: "Min" },
            { val: pad(time.s), label: "Sec" },
          ].map((unit, i) => (
            <div key={unit.label} className="flex items-center">
              {i > 0 && (
                <span className="text-[20px] font-bold leading-none mx-[6px] relative -top-[4px] text-[#0A0A0A]/40">
                  :
                </span>
              )}
              <div className="flex flex-col items-center">
                <span className="text-[38px] font-black leading-none tabular-nums tracking-tight">
                  {unit.val}
                </span>
                <span className="text-[10px] font-semibold text-[#0A0A0A]/50 uppercase tracking-wider mt-1">
                  {unit.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button className="liquid-fill-white w-[90%] max-w-[280px] h-[50px] flex items-center justify-center bg-[#0A0A0A] text-white text-[15px] font-bold rounded-full whitespace-nowrap overflow-hidden z-10 transition-colors">
          Use Code: FLASH30
        </button>

      </div>
    </section>
  );
}
