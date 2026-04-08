"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { IoEyeOutline, IoEyeOffOutline, IoLogoGoogle, IoLogoApple } from "react-icons/io5";

export default function AccountPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[440px]">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/">
              <span className="font-[var(--font-logo)] text-[32px] font-extrabold tracking-[0.04em] text-gray-900">
                Digilink<span className="logo-dot">.</span>
              </span>
            </Link>
            <p className="mt-2 text-gray-500 text-[15px]">
              {isLogin ? "Welcome back! Sign in to your account." : "Create your account and start shopping."}
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
            {/* Tab Toggle */}
            <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2.5 text-[14px] font-semibold rounded-lg transition-all duration-200 ${
                  isLogin ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2.5 text-[14px] font-semibold rounded-lg transition-all duration-200 ${
                  !isLogin ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
                }`}
              >
                Register
              </button>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button className="flex items-center justify-center gap-2 h-[44px] border border-gray-200 rounded-lg text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <IoLogoGoogle className="w-4 h-4" />
                Google
              </button>
              <button className="flex items-center justify-center gap-2 h-[44px] border border-gray-200 rounded-lg text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <IoLogoApple className="w-5 h-5" />
                Apple
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-[12px] text-gray-400 font-medium">OR</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Form */}
            <div className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full h-[48px] px-4 bg-gray-50 border border-gray-200 rounded-lg text-[15px] placeholder:text-gray-400 focus:outline-none focus:border-[#1D349A] transition-colors"
                  />
                </div>
              )}

              <div>
                <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full h-[48px] px-4 bg-gray-50 border border-gray-200 rounded-lg text-[15px] placeholder:text-gray-400 focus:outline-none focus:border-[#1D349A] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full h-[48px] px-4 pr-12 bg-gray-50 border border-gray-200 rounded-lg text-[15px] placeholder:text-gray-400 focus:outline-none focus:border-[#1D349A] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <IoEyeOffOutline className="w-5 h-5" />
                    ) : (
                      <IoEyeOutline className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded accent-[#1D349A] w-4 h-4" />
                    <span className="text-[13px] text-gray-600">Remember me</span>
                  </label>
                  <button className="text-[13px] text-[#1D349A] font-semibold hover:underline">
                    Forgot password?
                  </button>
                </div>
              )}

              {!isLogin && (
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded accent-[#1D349A] w-4 h-4 mt-0.5" />
                  <span className="text-[13px] text-gray-500">
                    I agree to the{" "}
                    <span className="text-[#1D349A] font-medium">Terms of Service</span> and{" "}
                    <span className="text-[#1D349A] font-medium">Privacy Policy</span>
                  </span>
                </label>
              )}
            </div>

            <button className="liquid-fill w-full h-[48px] mt-6 bg-[#1D349A] text-white font-bold text-[15px] rounded-full hover:bg-[#162a7d] transition-colors">
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </div>

          {/* Footer text */}
          <p className="text-center mt-6 text-[13px] text-gray-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#1D349A] font-semibold hover:underline"
            >
              {isLogin ? "Register" : "Sign In"}
            </button>
          </p>
        </div>
      </main>
    </>
  );
}
