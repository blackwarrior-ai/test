"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How are the digital products delivered?",
    answer: "All digital products, including software keys and subscription access, are delivered instantly to your registered email address immediately after successful payment."
  },
  {
    question: "Are the software licenses authentic?",
    answer: "Yes, 100%. We source all our licenses and subscriptions directly from official vendors and authorized distributors. You receive official, fully updatable software."
  },
  {
    question: "What is your refund policy?",
    answer: "Since these are digital goods, we offer a 7-day money-back guarantee only if the product key is invalid or defective. Once a valid key is activated, it is non-refundable."
  },
  {
    question: "Do I get technical support with my purchase?",
    answer: "Absolutely! We provide 24/7 priority email support for all our Pro and Enterprise customers. Free tier users get standard support within 48 hours."
  },
  {
    question: "Can I upgrade my plan later?",
    answer: "Yes, you can upgrade your access or purchase additional tools at any time directly from your account dashboard."
  }
];

export function MobileFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full lg:hidden px-4 pt-10 pb-16 bg-[#EBEBEB]">
      <h2 className="text-[32px] font-bold text-[#0B4F75] mb-8 font-[var(--font-barlow)] tracking-tight text-center">
        FAQs
      </h2>
      
      <div className="flex flex-col gap-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index} 
              className={`rounded-[16px] overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'bg-[#F7F7F8] shadow-sm' : 'bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)]'
              }`}
              style={{
                boxShadow: isOpen ? 'inset 0px 1px 0px 0px rgba(165, 180, 252, 0.1), inset 0px 0px 4px 0px rgba(165, 180, 252, 0.1), inset 0px -4px 8px 0px rgba(165, 180, 252, 0.1), 0px 2px 0px 0px rgba(165, 180, 252, 0.03)' : '0px 2px 8px rgba(0,0,0,0.04)'
              }}
            >
              <button
                onClick={() => toggleFaq(index)}
                className={`w-full flex items-center justify-between text-left focus:outline-none transition-all duration-300 ${
                  isOpen ? 'px-6 pt-6 pb-4' : 'p-6'
                }`}
              >
                <span className="text-[16px] font-bold text-[#0B4F75] font-[var(--font-barlow)] pr-4">
                  {faq.question}
                </span>
                <div 
                  className={`flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
                    isOpen ? 'rotate-45 text-gray-500' : 'rotate-0 text-gray-900'
                  }`}
                >
                  <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor">
                    <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"/>
                  </svg>
                </div>
              </button>
              
              <div 
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
              >
                <div className="overflow-hidden">
                  <p className="text-[15px] text-gray-600 leading-[1.6] font-[var(--font-barlow)] px-6 pb-6">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}