"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { IoMailOutline, IoCallOutline, IoLocationOutline, IoSendOutline } from "react-icons/io5";
import { FaXTwitter, FaInstagram, FaTiktok, FaFacebookF } from "react-icons/fa6";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFAFA]">
        {/* Hero */}
        <div className="relative bg-gradient-to-r from-[#1D349A] to-[#0A1B5C] py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,white_0%,transparent_60%)]" />
          </div>
          <div className="max-w-[1347px] mx-auto px-4 text-center relative z-10">
            <h1 className="text-3xl lg:text-[48px] font-bold text-white leading-tight mb-4">
              Get In Touch
            </h1>
            <p className="text-white/70 text-[16px] max-w-lg mx-auto">
              Have a question or need help? We&apos;re here for you 24/7. Reach out and we&apos;ll respond within minutes.
            </p>
          </div>
        </div>

        <div className="max-w-[1347px] mx-auto px-4 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#1D349A]/10 rounded-xl flex items-center justify-center mb-4">
                  <IoMailOutline className="w-6 h-6 text-[#1D349A]" />
                </div>
                <h3 className="text-[16px] font-bold text-gray-900 mb-1">Email Us</h3>
                <p className="text-[14px] text-gray-500 mb-3">We reply within 30 minutes</p>
                <a href="mailto:support@digilink.store" className="text-[14px] font-semibold text-[#1D349A] hover:underline">
                  support@digilink.store
                </a>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#1D349A]/10 rounded-xl flex items-center justify-center mb-4">
                  <IoCallOutline className="w-6 h-6 text-[#1D349A]" />
                </div>
                <h3 className="text-[16px] font-bold text-gray-900 mb-1">Live Chat</h3>
                <p className="text-[14px] text-gray-500 mb-3">Available 24/7 on our website</p>
                <button className="text-[14px] font-semibold text-[#1D349A] hover:underline">
                  Start a Chat
                </button>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#1D349A]/10 rounded-xl flex items-center justify-center mb-4">
                  <IoLocationOutline className="w-6 h-6 text-[#1D349A]" />
                </div>
                <h3 className="text-[16px] font-bold text-gray-900 mb-1">Follow Us</h3>
                <p className="text-[14px] text-gray-500 mb-3">Stay updated with our latest deals</p>
                <div className="flex items-center gap-3">
                  <a href="#" className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-[#1D349A] hover:text-white transition-colors">
                    <FaXTwitter className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-[#1D349A] hover:text-white transition-colors">
                    <FaInstagram className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-[#1D349A] hover:text-white transition-colors">
                    <FaTiktok className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-[#1D349A] hover:text-white transition-colors">
                    <FaFacebookF className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-10 lg:p-14 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IoSendOutline className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-[24px] font-bold text-gray-900 mb-3">Message Sent!</h2>
                  <p className="text-gray-500 text-[15px] mb-8 max-w-sm mx-auto">
                    Thank you for reaching out. We&apos;ll get back to you within 30 minutes.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-8 py-3 bg-[#1D349A] text-white font-bold rounded-full hover:bg-[#162a7d] transition-colors text-[14px]"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8">
                  <h2 className="text-[20px] font-bold text-gray-900 mb-6">
                    Send us a message
                  </h2>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                          First Name *
                        </label>
                        <input
                          type="text"
                          placeholder="John"
                          className="w-full h-[48px] px-4 bg-gray-50 border border-gray-200 rounded-lg text-[15px] placeholder:text-gray-400 focus:outline-none focus:border-[#1D349A] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          placeholder="Doe"
                          className="w-full h-[48px] px-4 bg-gray-50 border border-gray-200 rounded-lg text-[15px] placeholder:text-gray-400 focus:outline-none focus:border-[#1D349A] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                        Email *
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        className="w-full h-[48px] px-4 bg-gray-50 border border-gray-200 rounded-lg text-[15px] placeholder:text-gray-400 focus:outline-none focus:border-[#1D349A] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                        Subject *
                      </label>
                      <select className="w-full h-[48px] px-4 bg-gray-50 border border-gray-200 rounded-lg text-[15px] text-gray-700 focus:outline-none focus:border-[#1D349A] transition-colors appearance-none cursor-pointer">
                        <option value="">Select a topic</option>
                        <option value="order">Order Issue</option>
                        <option value="product">Product Question</option>
                        <option value="refund">Refund Request</option>
                        <option value="partnership">Partnership</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                        Message *
                      </label>
                      <textarea
                        rows={5}
                        placeholder="Tell us how we can help..."
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-[15px] placeholder:text-gray-400 focus:outline-none focus:border-[#1D349A] transition-colors resize-none"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setSubmitted(true)}
                    className="liquid-fill w-full h-[48px] mt-6 bg-[#1D349A] text-white font-bold text-[15px] rounded-full hover:bg-[#162a7d] transition-colors flex items-center justify-center gap-2"
                  >
                    <IoSendOutline className="w-4 h-4" />
                    Send Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
