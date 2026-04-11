"use client";

const reviews = [
  {
    name: "Sarah",
    title: "Digital Marketer",
    initials: "S",
    color: "#4A90D9",
    text: "DigiLink completely changed how I buy software. Got my design suite at 40% off with instant delivery. The whole process took less than 2 minutes!",
  },
  {
    name: "James",
    title: "Freelance Developer",
    initials: "J",
    color: "#E67E22",
    text: "Best platform for AI tools. I've saved hundreds of dollars on subscriptions. Their customer support is incredibly responsive too.",
  },
  {
    name: "Ayesha",
    title: "Content Creator",
    initials: "A",
    color: "#8E44AD",
    text: "I was skeptical at first, but the deals are legit. Bought a VPN subscription and a video editing tool — both worked perfectly from day one.",
  },
  {
    name: "Michael",
    title: "Startup Founder",
    initials: "M",
    color: "#27AE60",
    text: "We equipped our entire team with productivity tools through DigiLink. The bulk pricing saved us over $2,000. Highly recommended for startups.",
  },
  {
    name: "Priya",
    title: "UX Designer",
    initials: "P",
    color: "#E74C3C",
    text: "The variety of design tools available here is unmatched. Plus, the instant key delivery means I can start working right away. Love it!",
  },
  {
    name: "Omar",
    title: "Cybersecurity Analyst",
    initials: "O",
    color: "#2C3E50",
    text: "Got premium security software at an unbeatable price. DigiLink is my go-to for all digital product purchases now. Fast, reliable, and affordable.",
  },
];

export function MobileReviewsSection() {
  const doubled = [...reviews, ...reviews];

  return (
    <section className="py-10 bg-[#EBEBEB] overflow-hidden">
      {/* Heading */}
      <div className="px-4 mb-8 text-center">
        <h2 className="text-[26px] font-bold font-[var(--font-barlow)]">
          <span className="text-[#3A8FB7]">Why People </span>
          <span className="text-gray-900">Love</span>
          <br />
          <span className="text-[#3A8FB7]">DigiLink</span>
        </h2>
      </div>

      {/* Vertical scrolling container */}
      <div className="relative h-[780px] overflow-hidden">
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#EBEBEB] to-transparent z-10 pointer-events-none" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#EBEBEB] to-transparent z-10 pointer-events-none" />

        {/* Scrolling cards */}
        <div className="flex flex-col gap-4 px-4 animate-scroll-up">
          {doubled.map((r, i) => (
            <ReviewCard key={`rv-${i}`} {...r} />
          ))}
        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes scrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-scroll-up {
          animation: scrollUp 18s linear infinite;
        }
      `}</style>
    </section>
  );
}

function ReviewCard({
  name,
  title,
  initials,
  color,
  text,
}: {
  name: string;
  title: string;
  initials: string;
  color: string;
  text: string;
}) {
  return (
    <div
      className="bg-white rounded-[16px] p-4 flex flex-col gap-2"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.18) 0px 0.6px 0.6px, rgba(0, 0, 0, 0.16) 0px 2.2px 2.2px",
      }}
    >
      {/* Header: Avatar + Name/Title + Stars */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[16px] font-bold flex-shrink-0"
          style={{ backgroundColor: color }}
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[16px] font-bold text-gray-900 font-[var(--font-barlow)]">{name}</p>
          <p className="text-[12px] text-gray-500 font-[var(--font-barlow)]">{title}</p>
        </div>
        <div className="flex gap-0.5 text-[#E8A838] text-[20px] flex-shrink-0">
          ★★★★★
        </div>
      </div>
      {/* Review text */}
      <p className="text-[14px] leading-[1.6] text-gray-800 font-[var(--font-barlow)]">
        {text}
      </p>
    </div>
  );
}
