"use client";

import Image from "next/image";
import { IoBagOutline } from "react-icons/io5";

const mobileProducts = [
  {
    id: 1,
    name: "Green Sofa",
    // We assume an image exists, or user will replace it.
    image: "/products/green-sofa.png",
  },
  {
    id: 2,
    name: "Red Chair",
    image: "/products/red-chair.png",
  }
];

export function MobileProductGrid() {
  return (
    <section className="w-full px-[16px] py-8 lg:hidden">
      <div className="grid grid-cols-2 gap-4">
        {mobileProducts.map((product) => (
          <div
            key={product.id}
            className="relative bg-[#F5F5F5] rounded-[24px] overflow-hidden flex items-center justify-center aspect-[0.95]"
          >
            {/* Image Wrapper */}
            <div className="relative w-full h-[80%] flex items-center justify-center p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain mix-blend-multiply"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>

            {/* Shopping Bag Button */}
            <button
              className="absolute bottom-3 right-3 w-[42px] h-[42px] bg-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:scale-105 transition-transform"
              aria-label="Add to cart"
            >
              <IoBagOutline className="w-[20px] h-[20px] text-black stroke-[3]" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}