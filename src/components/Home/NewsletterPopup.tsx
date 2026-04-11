"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    // Show immediately after a short delay
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem("hasSeenNewsletterPopup")) {
        setIsOpen(true);
        sessionStorage.setItem("hasSeenNewsletterPopup", "true");
      } else {
        setShowBadge(true); // Show the flower badge if they've seen it already
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    setTimeout(() => setShowBadge(true), 300); // Wait for popup exit animation
  };

  const openPopup = () => {
    setShowBadge(false);
    setIsOpen(true);
  };

  return (
    <>
      {/* Floating Flower Badge */}
      {showBadge && (
        <button 
          onClick={openPopup}
          className="fixed bottom-6 left-6 z-[9998] w-[80px] h-[80px] md:w-[90px] md:h-[90px] flex items-center justify-center group animate-in fade-in zoom-in duration-500 hover:scale-105 transition-transform"
        >
          {/* Spinning Flower Background */}
          <div className="absolute inset-0 text-black animate-[spin_8s_linear_infinite]">
            <svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 0 C60 0 65 15 75 15 C85 15 90 25 90 35 C90 45 100 50 100 60 C100 70 90 75 90 85 C90 95 85 100 75 100 C65 100 60 85 50 85 C40 85 35 100 25 100 C15 100 10 95 10 85 C10 75 0 70 0 60 C0 50 10 45 10 35 C10 25 15 15 25 15 C35 15 40 0 50 0 Z" />
            </svg>
          </div>
          {/* Centered Static Golden Text */}
          <div className="relative flex flex-col items-center justify-center font-[var(--font-barlow,-apple-system)]">
            <span className="text-[#FBBF24] font-extrabold text-[20px] md:text-[22px] leading-none">10%</span>
            <span className="text-[#FBBF24] font-bold text-[12px] md:text-[14px] leading-none">OFF</span>
          </div>
        </button>
      )}

      {/* Main Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-4 sm:p-6 transition-opacity duration-300">
          <div 
            className="relative w-full max-h-[calc(100vh-32px)] max-w-[400px] md:max-w-[760px] bg-white rounded-[12px] md:rounded-[8px] overflow-y-auto flex flex-col md:flex-row shadow-2xl animate-in zoom-in-[0.98] duration-300 mx-auto"
          >
            
            {/* Close Button - Floats over image on mobile, top right on desktop */}
            <button 
              onClick={closePopup}
          className="absolute top-3 right-3 z-10 w-[34px] h-[34px] flex items-center justify-center bg-white rounded-full text-black hover:bg-gray-100 transition-colors shadow-sm"
        >
          <IoClose size={20} />
        </button>

        {/* Image Section */}
        <div className="w-full h-[270px] min-h-[270px] md:min-h-[auto] md:h-auto md:w-1/2 relative bg-[#F7F7F8] shrink-0">
          <Image 
            src="https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=800&auto=format&fit=crop" 
            alt="Red Lamp"
            fill
            className="object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 px-6 pt-6 pb-6 md:p-10 flex flex-col items-center justify-center text-center bg-white">
          <h2 className="text-[26px] md:text-[32px] leading-[1.1] font-bold text-black mb-3 tracking-tight font-[var(--font-barlow,-apple-system)]">
            Sign up to get 10% OFF<br />your first order
          </h2>
          
          <p className="text-[15px] md:text-[16px] text-gray-600 mb-6">
            Sexy and sustainable goodies? Sign me up
          </p>

          <form className="w-full space-y-3 mb-6" onSubmit={(e) => { e.preventDefault(); closePopup(); }}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              required
              className="w-full h-[52px] bg-[#F4F4F5] text-black px-5 rounded-[100px] outline-none focus:ring-2 focus:ring-black placeholder:text-gray-500 font-medium text-[15px]"
            />
            <button 
              type="submit"
              className="w-full h-[52px] bg-black text-white font-bold text-[16px] rounded-[100px] hover:bg-gray-900 transition-colors"
            >
              Get 10% OFF
            </button>
          </form>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-[10px] w-full">
            <SocialIcon icon={<FaFacebookF size={15} />} />
            <SocialIcon icon={<FaXTwitter size={14} />} />
            <SocialIcon icon={<FaInstagram size={15} />} />
            <SocialIcon icon={<FaTiktok size={14} />} />
            <SocialIcon icon={<FaYoutube size={16} />} />
          </div>
        </div>

      </div>
    </div>
    )}
    </>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <a href="#" className="w-[38px] h-[38px] md:w-[42px] md:h-[42px] rounded-full border border-gray-200 flex items-center justify-center text-black hover:border-black hover:bg-gray-50 transition-colors">
      {icon}
    </a>
  );
}
