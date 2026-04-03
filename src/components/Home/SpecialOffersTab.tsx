"use client";

import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { BsChatDots } from "react-icons/bs";

export function SpecialOffersTab() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[60] flex flex-col items-end">
      {/* Vertical tab */}
      <div className="liquid-fill-top flex flex-col items-center bg-[#1D349A] text-white rounded-l-lg shadow-lg">
        {/* Icon */}
        <div className="px-2.5 pt-3 pb-2">
          <BsChatDots className="w-5 h-5" />
        </div>

        {/* Vertical text */}
        <div
          className="px-2.5 pb-3 pt-1 text-[12px] font-bold tracking-wider leading-none"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          Special Offers For You
        </div>

        {/* Close button */}
        <button
          onClick={() => setVisible(false)}
          className="px-2.5 pb-3 pt-1 hover:text-gray-300 transition-colors duration-200"
          aria-label="Close special offers tab"
        >
          <IoClose className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
