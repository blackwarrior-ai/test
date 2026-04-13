"use client";

import { useEffect } from "react";
import { IoCloseOutline, IoBagOutline } from "react-icons/io5";

interface DesktopCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DesktopCartDrawer({ isOpen, onClose }: DesktopCartDrawerProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm anim-fade-in transition-opacity cursor-pointer"
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className="relative w-[500px] h-full bg-white shadow-2xl flex flex-col anim-slide-left rounded-l-[40px] overflow-hidden"
      >
        {/* Header */}
        <div className="px-[40px] py-[30px] flex items-center justify-between border-b border-gray-100">
          <h2 className="text-[20px] font-bold text-gray-900 tracking-tight flex items-center gap-2">
            Cart
            <span className="w-6 h-6 bg-gray-100 text-gray-900 rounded-full flex items-center justify-center text-[12px] font-bold">
              0
            </span>
          </h2>
          <button 
            className="w-[44px] h-[44px] rounded-full flex items-center justify-center border border-gray-200 hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
            onClick={onClose}
            aria-label="Close cart"
          >
            <IoCloseOutline className="w-[22px] h-[22px]" />
          </button>
        </div>

        {/* Content - Empty State */}
        <div className="flex-1 overflow-y-auto px-[40px] flex flex-col items-center justify-center text-center">
          <div className="mb-6 relative">
            <IoBagOutline className="w-[48px] h-[48px] text-gray-900 opacity-20" />
          </div>
          <h3 className="text-[22px] font-bold text-gray-900 tracking-tight mb-2">
            Your cart is currently empty.
          </h3>
          <p className="text-[15px] text-gray-500 mb-8 max-w-[300px]">
            Before proceed to checkout you must add some products to your shopping cart.
          </p>
          <button 
            onClick={onClose}
            className="bg-gray-900 text-white font-semibold text-[15px] px-10 py-4 rounded-full hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20"
          >
            Return to shop
          </button>
        </div>
      </div>

      {/* Overriding animations internally in case they aren't globally defined */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-l { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .anim-fade-in { animation: fade-in 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .anim-slide-left { animation: slide-l 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />
    </div>
  );
}
