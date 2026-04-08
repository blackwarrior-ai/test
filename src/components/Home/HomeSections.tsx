"use client";

import Link from "next/link";
import { products } from "@/data/products";
import { IoFlash, IoShieldCheckmark, IoHeadset, IoRocket, IoStarOutline, IoChevronForward } from "react-icons/io5";

/* ── Section: Trending Products ── */
export function TrendingProducts() {
  const trending = products.filter((p) => ["Hot", "New", "Deal"].includes(p.badge || "")).slice(0, 4);

  return (
    <section className="py-10 lg:py-14">
      <div className="max-w-[1347px] mx-auto px-[16px]">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-[12px] font-bold tracking-widest uppercase text-[#1D349A] mb-2 block">
              Trending Now
            </span>
            <h2 className="text-[28px] lg:text-[32px] font-bold text-gray-900">
              Most Popular This Week
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-[14px] font-semibold text-[#1D349A] hover:underline flex items-center gap-1"
          >
            View All <IoChevronForward className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {trending.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url('${product.image}')` }}
                />
                <div className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-bold px-2 py-1 rounded">
                  {product.discount}
                </div>
                {product.badge && (
                  <div className="absolute top-3 right-3 bg-[#1D349A] text-white text-[11px] font-bold px-2 py-1 rounded">
                    {product.badge}
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="text-[11px] font-bold text-[#1D349A] tracking-wider uppercase mb-1">
                  {product.category}
                </p>
                <h3 className="text-[15px] font-semibold text-gray-900 mb-2 group-hover:text-[#1D349A] transition-colors line-clamp-1">
                  {product.title}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-[17px] font-bold">${product.newPrice.toFixed(2)}</span>
                  <span className="text-[13px] text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Section: Trust Badges / Features ── */
export function TrustBadges() {
  const badges = [
    { icon: IoFlash, title: "Instant Delivery", desc: "Products delivered to your email in seconds" },
    { icon: IoShieldCheckmark, title: "Secure Payments", desc: "256-bit SSL encrypted transactions" },
    { icon: IoHeadset, title: "24/7 Support", desc: "We're here to help around the clock" },
    { icon: IoRocket, title: "Instant Activation", desc: "Start using immediately after purchase" },
  ];

  return (
    <section className="py-10 lg:py-14 bg-[#FAFAFA]">
      <div className="max-w-[1347px] mx-auto px-[16px]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {badges.map((badge) => (
            <div
              key={badge.title}
              className="bg-white rounded-xl border border-gray-100 p-6 text-center hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-14 h-14 bg-[#1D349A]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <badge.icon className="w-7 h-7 text-[#1D349A]" />
              </div>
              <h3 className="text-[15px] font-bold text-gray-900 mb-1">{badge.title}</h3>
              <p className="text-[13px] text-gray-500">{badge.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Section: Testimonials ── */
export function Testimonials() {
  const reviews = [
    {
      name: "Alex M.",
      role: "Freelancer",
      text: "Got my ChatGPT Plus account within 2 minutes. Works perfectly and saved me 50%. Absolutely recommended!",
      rating: 5,
    },
    {
      name: "Sarah K.",
      role: "Designer",
      text: "Canva Pro at this price is insane. All features work flawlessly. DigiLink is my go-to for digital tools now.",
      rating: 5,
    },
    {
      name: "Omar R.",
      role: "Developer",
      text: "GitHub Copilot Pro delivered instantly. The support team even helped me set it up. 10/10 experience.",
      rating: 5,
    },
  ];

  return (
    <section className="py-10 lg:py-14">
      <div className="max-w-[1347px] mx-auto px-[16px]">
        <div className="text-center mb-10">
          <span className="text-[12px] font-bold tracking-widest uppercase text-[#1D349A] mb-2 block">
            Customer Reviews
          </span>
          <h2 className="text-[28px] lg:text-[32px] font-bold text-gray-900">
            Loved by 50,000+ Customers
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <IoStarOutline key={i} className="w-4 h-4 text-yellow-500 fill-yellow-400" />
                ))}
              </div>
              <p className="text-[14px] text-gray-600 leading-relaxed mb-5">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1D349A] flex items-center justify-center text-white font-bold text-[14px]">
                  {review.name[0]}
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-gray-900">{review.name}</p>
                  <p className="text-[12px] text-gray-400">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Section: Newsletter / CTA ── */
export function NewsletterCTA() {
  return (
    <section className="py-10 lg:py-14">
      <div className="max-w-[1347px] mx-auto px-[16px]">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#1D349A] to-[#0A1B5C] py-14 lg:py-20 px-8 lg:px-14 text-center">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,white_0%,transparent_60%)]" />
          </div>
          <div className="relative z-10">
            <h2 className="text-[24px] lg:text-[36px] font-bold text-white mb-3">
              Get 10% Off Your First Order
            </h2>
            <p className="text-white/60 text-[15px] mb-8 max-w-md mx-auto">
              Subscribe to our newsletter for exclusive deals, new product announcements, and special promotions.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-[48px] px-5 rounded-full text-[15px] text-gray-900 placeholder:text-gray-400 outline-none"
              />
              <button className="liquid-fill h-[48px] px-8 bg-white text-[#1D349A] font-bold text-[14px] rounded-full hover:bg-gray-100 transition-colors shrink-0">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Section: Brand Promises ── */
export function BrandPromises() {
  return (
    <section className="py-10 lg:py-14 bg-gray-900">
      <div className="max-w-[1347px] mx-auto px-[16px]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 text-center">
          {[
            { num: "50K+", label: "Happy Customers" },
            { num: "500+", label: "Digital Products" },
            { num: "99.9%", label: "Delivery Success" },
            { num: "< 2min", label: "Avg. Delivery Time" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-[32px] lg:text-[42px] font-bold text-white">{stat.num}</p>
              <p className="text-[14px] text-gray-400 font-medium mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Section: Recently Viewed / More Products ── */
export function MoreProducts() {
  const more = products.slice(6, 12);

  return (
    <section className="py-10 lg:py-14">
      <div className="max-w-[1347px] mx-auto px-[16px]">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-[28px] lg:text-[32px] font-bold text-gray-900">
              More to Explore
            </h2>
            <p className="mt-2 text-gray-500 text-[15px]">
              Discover more premium tools and subscriptions.
            </p>
          </div>
          <Link
            href="/shop"
            className="text-[14px] font-semibold text-[#1D349A] hover:underline flex items-center gap-1"
          >
            See All <IoChevronForward className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          {more.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url('${product.image}')` }}
                />
                <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                  {product.discount}
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-[13px] font-semibold text-gray-900 line-clamp-1 group-hover:text-[#1D349A] transition-colors">
                  {product.title}
                </h3>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-[14px] font-bold">${product.newPrice.toFixed(2)}</span>
                  <span className="text-[11px] text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Section: FAQ ── */
export function FAQ() {
  const faqs = [
    {
      q: "How does instant delivery work?",
      a: "After your purchase, you'll receive an email within minutes containing your product credentials or activation instructions.",
    },
    {
      q: "Are these accounts legitimate?",
      a: "Yes, all products sold on DigiLink are 100% legitimate. We work directly with providers to offer discounted subscription plans.",
    },
    {
      q: "What if I have issues with my purchase?",
      a: "Our 24/7 support team is here to help. Contact us via live chat, email, or our contact page and we'll resolve any issues promptly.",
    },
    {
      q: "Can I get a refund?",
      a: "We offer a satisfaction guarantee. If you experience any issues within 24 hours of purchase, we'll provide a full replacement or refund.",
    },
  ];

  return (
    <section className="py-10 lg:py-14 bg-[#FAFAFA]">
      <div className="max-w-[800px] mx-auto px-[16px]">
        <div className="text-center mb-10">
          <span className="text-[12px] font-bold tracking-widest uppercase text-[#1D349A] mb-2 block">
            FAQ
          </span>
          <h2 className="text-[28px] lg:text-[32px] font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group bg-white rounded-xl border border-gray-100 overflow-hidden"
            >
              <summary className="flex items-center justify-between p-5 cursor-pointer text-[15px] font-semibold text-gray-900 hover:text-[#1D349A] transition-colors list-none">
                {faq.q}
                <span className="text-gray-400 group-open:rotate-45 transition-transform duration-200 text-[20px]">
                  +
                </span>
              </summary>
              <div className="px-5 pb-5 text-[14px] text-gray-500 leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Section: Final CTA Banner ── */
export function FinalCTA() {
  return (
    <section className="py-10 lg:py-14">
      <div className="max-w-[1347px] mx-auto px-[16px]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-gray-900 rounded-2xl px-8 lg:px-14 py-10 lg:py-14">
          <div>
            <h2 className="text-[24px] lg:text-[32px] font-bold text-white mb-2">
              Ready to Save Big?
            </h2>
            <p className="text-gray-400 text-[15px]">
              Use code <span className="text-white font-bold">FLASH30</span> for an extra 30% off your first order.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/shop"
              className="liquid-fill-white inline-flex items-center justify-center px-8 py-3.5 bg-white text-gray-900 font-bold rounded-full text-[15px]"
            >
              Shop Now
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded-full text-[15px] hover:bg-white/10 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
