"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { IoShieldCheckmark, IoFlash, IoHeadset, IoPricetagsOutline } from "react-icons/io5";
import { products } from "@/data/products";

const stats = [
  { number: "50K+", label: "Happy Customers" },
  { number: "500+", label: "Digital Products" },
  { number: "99.9%", label: "Uptime Delivery" },
  { number: "24/7", label: "Support Available" },
];

const values = [
  {
    icon: IoFlash,
    title: "Instant Delivery",
    description: "All products are delivered instantly to your email. No waiting, no delays — get started in seconds.",
  },
  {
    icon: IoPricetagsOutline,
    title: "Unbeatable Prices",
    description: "We negotiate bulk deals directly with providers, passing the savings to you. Up to 70% off retail.",
  },
  {
    icon: IoShieldCheckmark,
    title: "100% Secure",
    description: "Every transaction is protected with military-grade encryption. Your data stays safe with us.",
  },
  {
    icon: IoHeadset,
    title: "Always Available",
    description: "Our support team is available around the clock. Got an issue? We'll resolve it within minutes.",
  },
];

const timeline = [
  { year: "2023", title: "Founded", description: "DigiLink was born with a simple idea: make premium digital tools affordable for everyone." },
  { year: "2024", title: "10K Customers", description: "Reached our first major milestone with customers from 80+ countries worldwide." },
  { year: "2025", title: "500+ Products", description: "Expanded our catalog to cover AI, design, productivity, privacy, and entertainment." },
  { year: "2026", title: "Global Leader", description: "Now serving 50K+ customers with instant delivery and 24/7 support." },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <div className="relative bg-gradient-to-br from-[#1D349A] via-[#162a7d] to-[#0A1B5C] py-20 lg:py-28 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-white rounded-full blur-3xl" />
          </div>
          <div className="max-w-[900px] mx-auto px-4 text-center relative z-10">
            <span className="text-[#7B9FFF] text-[13px] font-bold tracking-widest uppercase mb-4 block">
              About DigiLink
            </span>
            <h1 className="text-3xl lg:text-[52px] font-bold text-white leading-tight mb-6">
              Premium Digital Tools
              <br />
              at the Price of Candy
            </h1>
            <p className="text-white/60 text-[16px] lg:text-[18px] max-w-xl mx-auto leading-relaxed">
              We believe everyone deserves access to the best digital tools.
              That&apos;s why we offer premium subscriptions at a fraction of the retail price.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-[1347px] mx-auto px-4 -mt-10 relative z-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center"
              >
                <p className="text-[28px] lg:text-[36px] font-bold text-[#1D349A]">{stat.number}</p>
                <p className="text-[13px] text-gray-500 font-medium mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission */}
        <div className="max-w-[900px] mx-auto px-4 py-16 lg:py-24 text-center">
          <span className="text-[12px] font-bold tracking-widest uppercase text-[#1D349A] mb-3 block">
            Our Mission
          </span>
          <h2 className="text-[24px] lg:text-[36px] font-bold text-gray-900 leading-tight mb-6">
            Democratizing Access to Premium Software
          </h2>
          <p className="text-gray-500 text-[16px] leading-relaxed max-w-2xl mx-auto">
            We partner directly with top software providers to bring you legitimate, premium subscriptions
            at prices that everyone can afford. From AI assistants to design tools, coding platforms to
            privacy solutions — we&apos;ve got you covered.
          </p>
        </div>

        {/* Values */}
        <div className="bg-[#FAFAFA] py-16 lg:py-20">
          <div className="max-w-[1347px] mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-[12px] font-bold tracking-widest uppercase text-[#1D349A] mb-3 block">
                Why Choose Us
              </span>
              <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900">
                Built Different
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-12 h-12 bg-[#1D349A]/10 rounded-xl flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-[#1D349A]" />
                  </div>
                  <h3 className="text-[16px] font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-[14px] text-gray-500 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-[800px] mx-auto px-4 py-16 lg:py-24">
          <div className="text-center mb-12">
            <span className="text-[12px] font-bold tracking-widest uppercase text-[#1D349A] mb-3 block">
              Our Journey
            </span>
            <h2 className="text-[24px] lg:text-[32px] font-bold text-gray-900">
              From Idea to Impact
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-[2px] bg-gray-200 lg:-translate-x-px" />

            <div className="space-y-10">
              {timeline.map((item, i) => (
                <div
                  key={item.year}
                  className={`relative flex items-start gap-6 ${
                    i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-6 lg:left-1/2 w-3 h-3 bg-[#1D349A] rounded-full -translate-x-1.5 lg:-translate-x-1.5 mt-2 z-10 ring-4 ring-white" />

                  <div className={`ml-14 lg:ml-0 lg:w-1/2 ${i % 2 === 0 ? "lg:pr-12 lg:text-right" : "lg:pl-12"}`}>
                    <span className="text-[#1D349A] text-[14px] font-bold">{item.year}</span>
                    <h3 className="text-[18px] font-bold text-gray-900 mt-1">{item.title}</h3>
                    <p className="text-[14px] text-gray-500 mt-1 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#1D349A] to-[#0A1B5C] py-16 lg:py-20">
          <div className="max-w-[700px] mx-auto px-4 text-center">
            <h2 className="text-[24px] lg:text-[36px] font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-white/60 text-[16px] mb-8">
              Browse our collection of {products.length}+ premium products at unbeatable prices.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/shop"
                className="liquid-fill-white inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#1D349A] font-bold rounded-full text-[15px]"
              >
                Browse Products
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-white/30 text-white font-bold rounded-full text-[15px] hover:bg-white/10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
