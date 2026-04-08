"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { products } from "@/data/products";
import { IoShieldCheckmark, IoLockClosed, IoCheckmarkCircle } from "react-icons/io5";

const demoItems = [
  { productId: 1, quantity: 1 },
  { productId: 4, quantity: 2 },
];

export default function CheckoutPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const cartProducts = demoItems.map((item) => ({
    ...item,
    product: products.find((p) => p.id === item.productId)!,
  }));

  const subtotal = cartProducts.reduce(
    (sum, item) => sum + item.product.newPrice * item.quantity,
    0
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFAFA]">
        <div className="max-w-[960px] mx-auto px-4 py-8 lg:py-12">
          {/* Steps */}
          <div className="flex items-center justify-center gap-4 mb-10">
            {["Information", "Payment"].map((label, i) => (
              <div key={label} className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold transition-colors ${
                    step > i + 1
                      ? "bg-green-500 text-white"
                      : step === i + 1
                      ? "bg-[#1D349A] text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step > i + 1 ? "✓" : i + 1}
                </div>
                <span
                  className={`text-[14px] font-medium ${
                    step >= i + 1 ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {label}
                </span>
                {i === 0 && (
                  <div className="w-16 h-[2px] bg-gray-200 mx-2">
                    <div
                      className="h-full bg-[#1D349A] transition-all duration-500"
                      style={{ width: step > 1 ? "100%" : "0%" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left — Form */}
            <div className="lg:col-span-3">
              {step === 1 ? (
                <div className="bg-white rounded-xl border border-gray-100 p-6 lg:p-8">
                  <h2 className="text-[20px] font-bold text-gray-900 mb-6">
                    Contact Information
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full h-[48px] px-4 bg-gray-50 border border-gray-200 rounded-lg text-[15px] placeholder:text-gray-400 focus:outline-none focus:border-[#1D349A] transition-colors"
                      />
                      <p className="mt-1.5 text-[12px] text-gray-400">
                        Your product credentials will be sent to this email
                      </p>
                    </div>

                    <div>
                      <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full h-[48px] px-4 bg-gray-50 border border-gray-200 rounded-lg text-[15px] placeholder:text-gray-400 focus:outline-none focus:border-[#1D349A] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className="w-full h-[48px] px-4 bg-gray-50 border border-gray-200 rounded-lg text-[15px] placeholder:text-gray-400 focus:outline-none focus:border-[#1D349A] transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    className="liquid-fill w-full h-[48px] mt-8 bg-[#1D349A] text-white font-bold text-[15px] rounded-full hover:bg-[#162a7d] transition-colors"
                  >
                    Continue to Payment
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-gray-100 p-6 lg:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[20px] font-bold text-gray-900">Payment</h2>
                    <button
                      onClick={() => setStep(1)}
                      className="text-[13px] text-[#1D349A] font-semibold hover:underline"
                    >
                      ← Back
                    </button>
                  </div>

                  {/* Payment Methods */}
                  <div className="space-y-3 mb-6">
                    {[
                      { id: "card", label: "Credit / Debit Card", desc: "Visa, Mastercard, AMEX" },
                      { id: "paypal", label: "PayPal", desc: "Pay with your PayPal account" },
                      { id: "crypto", label: "Crypto", desc: "Bitcoin, ETH, USDT" },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                          paymentMethod === method.id
                            ? "border-[#1D349A] bg-[#1D349A]/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={() => setPaymentMethod(method.id)}
                          className="accent-[#1D349A] w-4 h-4"
                        />
                        <div>
                          <p className="text-[14px] font-semibold text-gray-900">{method.label}</p>
                          <p className="text-[12px] text-gray-400">{method.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>

                  {paymentMethod === "card" && (
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          className="w-full h-[48px] px-4 bg-gray-50 border border-gray-200 rounded-lg text-[15px] placeholder:text-gray-400 focus:outline-none focus:border-[#1D349A] transition-colors"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            maxLength={5}
                            className="w-full h-[48px] px-4 bg-gray-50 border border-gray-200 rounded-lg text-[15px] placeholder:text-gray-400 focus:outline-none focus:border-[#1D349A] transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                            CVC
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            maxLength={4}
                            className="w-full h-[48px] px-4 bg-gray-50 border border-gray-200 rounded-lg text-[15px] placeholder:text-gray-400 focus:outline-none focus:border-[#1D349A] transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <button className="liquid-fill w-full h-[50px] bg-[#1D349A] text-white font-bold text-[15px] rounded-full hover:bg-[#162a7d] transition-colors flex items-center justify-center gap-2">
                    <IoLockClosed className="w-4 h-4" />
                    Pay ${subtotal.toFixed(2)}
                  </button>

                  <div className="flex items-center justify-center gap-2 mt-4 text-[12px] text-gray-400">
                    <IoShieldCheckmark className="w-4 h-4" />
                    Secured with 256-bit SSL encryption
                  </div>
                </div>
              )}
            </div>

            {/* Right — Summary */}
            <div className="lg:col-span-2">
              <div className="sticky top-[160px] bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="text-[16px] font-bold text-gray-900 mb-4">Order Summary</h3>

                <div className="space-y-4 mb-5">
                  {cartProducts.map(({ product, quantity }) => (
                    <div key={product.id} className="flex gap-3">
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url('${product.image}')` }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-gray-900 truncate">
                          {product.title}
                        </p>
                        <p className="text-[12px] text-gray-400">Qty: {quantity}</p>
                      </div>
                      <span className="text-[14px] font-semibold text-gray-900 shrink-0">
                        ${(product.newPrice * quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-2">
                  <div className="flex justify-between text-[14px] text-gray-500">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[14px] text-gray-500">
                    <span>Delivery</span>
                    <span className="font-medium text-green-600">Instant</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 mt-4">
                  <div className="flex justify-between text-[18px] font-bold text-gray-900">
                    <span>Total</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Trust */}
                <div className="mt-6 flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <IoCheckmarkCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[12px] font-semibold text-green-800">
                      Instant Digital Delivery
                    </p>
                    <p className="text-[11px] text-green-600">
                      Credentials sent to your email within minutes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
