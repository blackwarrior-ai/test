"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { IoFlash, IoShieldCheckmark } from "react-icons/io5";

export function Footer() {
  const [cookieOpen, setCookieOpen] = useState(false);
  const [cookieAccepted, setCookieAccepted] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("digilink-cookies");
    if (stored) setCookieAccepted(stored === "accepted");
    else setCookieAccepted(null);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("digilink-cookies", "accepted");
    setCookieAccepted(true);
    setCookieOpen(false);
  };

  const declineCookies = () => {
    localStorage.setItem("digilink-cookies", "declined");
    setCookieAccepted(false);
    setCookieOpen(false);
  };

  return (
    <>
      {/* Cookie Settings Modal */}
      {cookieOpen && (
        <div className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center px-4 pb-4 sm:pb-0">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setCookieOpen(false)} />
          <div className="relative bg-[#111111] border border-white/10 rounded-2xl p-6 max-w-[380px] w-full z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#1D349A]/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="18" height="18" fill="white">
                  <path d="M164.49,163.51a12,12,0,1,1-17,0A12,12,0,0,1,164.49,163.51Zm-81-8a12,12,0,1,0,17,0A12,12,0,0,0,83.51,155.51Zm9-39a12,12,0,1,0-17,0A12,12,0,0,0,92.49,116.49Zm48-1a12,12,0,1,0,0,17A12,12,0,0,0,140.49,115.51ZM232,128A104,104,0,1,1,128,24a8,8,0,0,1,8,8,40,40,0,0,0,40,40,8,8,0,0,1,8,8,40,40,0,0,0,40,40A8,8,0,0,1,232,128Zm-16.31,7.39A56.13,56.13,0,0,1,168.5,87.5a56.13,56.13,0,0,1-47.89-47.19,88,88,0,1,0,95.08,95.08Z" />
                </svg>
              </div>
              <h3 className="text-white text-[17px] font-bold">Cookie Settings</h3>
            </div>
            <p className="text-gray-400 text-[13px] leading-relaxed mb-6">
              We use cookies to improve your experience, analyze site traffic, and personalize content. You can choose to accept or decline non-essential cookies.
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={acceptCookies}
                className="w-full bg-[#1D349A] text-white py-3 rounded-full text-[14px] font-semibold hover:bg-[#162a7d] transition-colors"
              >
                Accept All Cookies
              </button>
              <button
                onClick={declineCookies}
                className="w-full bg-white/10 text-white py-3 rounded-full text-[14px] font-semibold hover:bg-white/20 transition-colors"
              >
                Decline Non-Essential
              </button>
            </div>
            {cookieAccepted !== null && (
              <p className="text-center text-[11px] text-gray-500 mt-3">
                Current status: <span className="text-white">{cookieAccepted ? "Accepted" : "Declined"}</span>
              </p>
            )}
          </div>
        </div>
      )}

      <footer className="w-full bg-black text-white relative overflow-hidden flex flex-col justify-end">
        {/* Gradient overlay */}
        <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-[#1D349A]/20 via-transparent to-black pointer-events-none opacity-50" />

        <div className="flex flex-col px-6 pt-16 pb-8 relative z-10 w-full mx-auto max-w-[1347px]">
          {/* Mobile Footer */}
          <div className="flex flex-col lg:hidden">

            {/* Top Hero */}
            <div className="flex flex-col items-center text-center mb-16 px-2">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-tight mb-4 text-white max-w-[340px]">
                Get Premium Digital Tools at Best Prices
              </h2>
              <p className="text-[17px] text-gray-300 mb-10 max-w-[310px] leading-[1.5] mx-auto">
                Instant delivery of AI tools, software & subscriptions — right to your inbox.
              </p>

              <div className="flex flex-col w-full gap-3 max-w-[320px] mx-auto">
                <Link
                  href="/shop"
                  className="flex items-center justify-center gap-2 bg-white text-[#1D349A] px-6 py-4 rounded-full font-semibold text-[16px] w-full hover:bg-gray-100 transition-colors"
                >
                  <IoFlash className="w-4 h-4" />
                  Browse All Products
                </Link>
                <Link
                  href="/affiliate"
                  className="flex items-center justify-center gap-2 bg-white text-[#1D349A] px-6 py-4 rounded-full font-semibold text-[16px] w-full hover:bg-gray-100 transition-colors"
                >
                  <IoShieldCheckmark className="w-4 h-4" />
                  Join Affiliate Program
                </Link>
              </div>
            </div>

            {/* Links Grid — 2 columns */}
            <div className="grid grid-cols-2 gap-y-12 gap-x-6 mb-16">
              <FooterSection title="Navigation">
                <FooterLink href="/about" text="About" />
                <FooterLink href="/contact" text="Contact" />
                <FooterLink href="/careers" text="Careers" />
              </FooterSection>

              <FooterSection title="Documentation">
                <FooterLink href="/blog" text="Blog" />
                <FooterLink href="/license" text="License" />
                <FooterLink href="/refund" text="Refund policy" />
                <FooterLink href="/privacy" text="Privacy policy" />
                <FooterLink href="/terms" text="Terms and Conditions" />
              </FooterSection>

              <FooterSection title="Products">
                <FooterLink href="/themes" text="Themes" badge="New" />
                <FooterLink href="/plugins" text="Plugins" />
                <FooterLink href="/software" text="Software" />
                <FooterLink href="/subscriptions" text="Subscriptions" />
              </FooterSection>

              <FooterSection title="Social Connect">
                <FooterLink href="https://x.com" text="X" external />
                <FooterLink href="https://discord.com" text="Discord" external />
                <FooterLink href="https://linkedin.com" text="Linkedin" external />
                <FooterLink href="https://instagram.com" text="Instagram" external />
              </FooterSection>
            </div>

            {/* Bottom Bar */}
            <div className="flex items-center justify-between text-[11px] text-white font-medium mb-16 relative z-20">
              <p>© 2026 DigiLink</p>
              <p>Made for Professionals</p>
              <button
                onClick={() => setCookieOpen(true)}
                className="hover:text-gray-300 transition-colors"
                aria-label="Cookie Settings"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="18" height="18" fill="currentColor">
                  <path d="M164.49,163.51a12,12,0,1,1-17,0A12,12,0,0,1,164.49,163.51Zm-81-8a12,12,0,1,0,17,0A12,12,0,0,0,83.51,155.51Zm9-39a12,12,0,1,0-17,0A12,12,0,0,0,92.49,116.49Zm48-1a12,12,0,1,0,0,17A12,12,0,0,0,140.49,115.51ZM232,128A104,104,0,1,1,128,24a8,8,0,0,1,8,8,40,40,0,0,0,40,40,8,8,0,0,1,8,8,40,40,0,0,0,40,40A8,8,0,0,1,232,128Zm-16.31,7.39A56.13,56.13,0,0,1,168.5,87.5a56.13,56.13,0,0,1-47.89-47.19,88,88,0,1,0,95.08,95.08Z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Desktop placeholder */}
          <div className="hidden lg:flex items-center justify-center py-20 text-gray-500">
            [Desktop Footer — coming soon]
          </div>
        </div>

        {/* Big logo at the bottom */}
        <div
          className="w-full overflow-hidden flex justify-center items-end pb-0 pointer-events-none select-none"
          style={{ maskImage: 'linear-gradient(to top, black 15%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 15%, transparent 100%)' }}
        >
          <span
            style={{ fontFamily: 'var(--font-logo)' }}
            className="text-[17vw] leading-[0.8] font-bold text-white/80 text-center w-full tracking-widest block translate-y-[30%]"
          >
            DIGILINK
          </span>
        </div>
      </footer>
    </>
  );
}

function FooterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full">
      <h3 className="text-[#a1a1a1] text-[13px] uppercase tracking-wider mb-4">{title}</h3>
      <nav className="flex flex-col gap-3">
        {children}
      </nav>
    </div>
  );
}

function FooterLink({ href, text, external, badge }: { href: string; text: string; external?: boolean; badge?: string }) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : "_self"}
      rel={external ? "noopener noreferrer" : ""}
      className="flex items-center gap-2 hover:text-gray-300 transition-colors"
    >
      <span className="text-white text-[15px] font-medium">{text}</span>
      {badge && (
        <span className="bg-[#FF7400] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-[4px] leading-tight uppercase">
          {badge}
        </span>
      )}
    </Link>
  );
}
