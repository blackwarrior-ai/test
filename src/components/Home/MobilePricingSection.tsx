"use client";

export function MobilePricingSection() {
  return (
    <section className="w-full lg:hidden px-4 pt-12 pb-10 bg-[#EBEBEB]">
      <div className="relative w-full bg-black text-white pt-12 pb-14 px-4 rounded-[16px] overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-[20%] left-[-20%] w-[300px] h-[300px] bg-[#1D349A] opacity-30 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[50%] right-[-20%] w-[300px] h-[300px] bg-[#D65324] opacity-20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[10%] w-[300px] h-[300px] bg-[#1D349A] opacity-30 blur-[120px] rounded-full pointer-events-none" />

      {/* Heading */}
      <h2 className="text-center text-[32px] leading-[1.1] font-bold tracking-tight mb-12 font-[var(--font-barlow)]">
        Everything you need for <br /> free
      </h2>

      <div className="flex flex-col gap-6 relative z-10 w-full max-w-[400px] mx-auto">
        
        {/* FREE PLAN */}
        <div className="bg-white/[0.03] border border-white/10 rounded-[20px] p-6 backdrop-blur-md">
          <div className="mb-6">
            <h3 className="text-[22px] font-bold font-[var(--font-barlow)]">Free</h3>
            <p className="text-gray-400 text-[14px] mt-1 font-[var(--font-barlow)]">Basic Access</p>
          </div>
          
          <div className="flex items-baseline gap-1 mb-8">
            <span className="text-[42px] font-bold leading-none font-[var(--font-barlow)]">$0</span>
            <span className="text-gray-400 text-[14px] font-[var(--font-barlow)]">/month</span>
          </div>

          <div className="flex flex-col gap-4">
            <Feature text="Access to basic digital tools" />
            <Feature text="Unlimited standard downloads" />
            <Feature text="Lifetime access to purchased items" />
            <Feature text="Community forum support" />
          </div>
        </div>

        {/* PRO PLAN */}
        <div className="bg-white/[0.03] border border-[#D65324]/50 shadow-[0_0_30px_rgba(214,83,36,0.15)] rounded-[20px] p-6 backdrop-blur-md relative overflow-hidden">
          {/* Subtle inner glow for Pro plan */}
          <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[#D65324] opacity-10 blur-[50px] pointer-events-none" />
          
          <div className="mb-6 relative z-10">
            <h3 className="text-[22px] font-bold font-[var(--font-barlow)]">Pro</h3>
            <p className="text-gray-300 text-[14px] mt-1 font-[var(--font-barlow)]">Free for a limited period</p>
          </div>
          
          <div className="flex items-baseline gap-2 mb-8 relative z-10">
            <span className="text-[24px] font-bold text-gray-500 line-through decoration-gray-500 font-[var(--font-barlow)]">$15</span>
            <div className="flex items-baseline gap-1">
              <span className="text-[42px] font-bold leading-none font-[var(--font-barlow)]">$0</span>
              <span className="text-gray-300 text-[14px] font-[var(--font-barlow)]">/month</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 relative z-10">
            <Feature text="Everything included in Free" />
            <Feature text="Premium AI tools & software access" />
            <Feature text="Auto-updates for all digital products" />
            <Feature text="Commercial use licenses included" />
            <Feature text="Premium email support within 24 hours" />
          </div>
        </div>

        {/* ENTERPRISE PLAN */}
        <div className="bg-white/[0.03] border border-[#1D349A]/40 shadow-[0_0_30px_rgba(29,52,154,0.1)] rounded-[20px] p-6 backdrop-blur-md">
          <div className="mb-8">
            <h3 className="text-[22px] font-bold font-[var(--font-barlow)]">Enterprise</h3>
            <p className="text-gray-400 text-[14px] mt-1 font-[var(--font-barlow)]">For Teams</p>
          </div>
          
          <button className="w-full py-3 px-6 rounded-full border border-white/20 text-white font-medium text-[15px] mb-8 hover:bg-white/5 transition-colors font-[var(--font-barlow)]">
            Talk to us
          </button>

          <div className="flex flex-col gap-4">
            <Feature text="Everything included in Pro" />
            <Feature text="Team-wide collaboration & sharing" />
            <Feature text="Bulk enterprise licensing" />
            <Feature text="Single Sign-On (SSO) integration" />
            <Feature text="Dedicated account manager" />
          </div>
        </div>

      </div>
      </div>
    </section>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex-shrink-0">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <span className="text-[14px] text-gray-100 leading-[1.4] font-[var(--font-barlow)]">{text}</span>
    </div>
  );
}