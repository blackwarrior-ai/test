"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Header } from "@/components/Header";
import { getProductBySlug, products } from "@/data/products";
import { IoBagOutline, IoChevronForward, IoShieldCheckmark, IoFlash, IoMail } from "react-icons/io5";
import { HiOutlineHeart, HiHeart } from "react-icons/hi2";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const [wishlisted, setWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
            <p className="text-gray-500 mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1D349A] text-white font-semibold rounded-full hover:bg-[#162a7d] transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        </main>
      </>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const savingsPercent = Math.round(((product.oldPrice - product.newPrice) / product.oldPrice) * 100);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFAFA]">
        {/* Breadcrumb */}
        <div className="max-w-[1347px] mx-auto px-4 pt-6 pb-4">
          <nav className="flex items-center gap-2 text-[13px] text-gray-400">
            <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
            <IoChevronForward className="w-3 h-3" />
            <Link href="/shop" className="hover:text-gray-600 transition-colors">Shop</Link>
            <IoChevronForward className="w-3 h-3" />
            <span className="text-gray-900 font-medium">{product.title}</span>
          </nav>
        </div>

        {/* Product Section */}
        <div className="max-w-[1347px] mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
            {/* Left — Image */}
            <div className="relative">
              <div className="sticky top-[160px]">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${product.image}')` }}
                  />
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="bg-red-600 text-white text-[12px] font-bold px-3 py-1.5 rounded-lg">
                      {product.discount}
                    </span>
                    {product.badge && (
                      <span className="bg-[#1D349A] text-white text-[12px] font-bold px-3 py-1.5 rounded-lg">
                        {product.badge}
                      </span>
                    )}
                  </div>
                  {/* Wishlist */}
                  <button
                    onClick={() => setWishlisted(!wishlisted)}
                    className="absolute top-4 right-4 w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                  >
                    {wishlisted ? (
                      <HiHeart className="w-6 h-6 text-red-500" />
                    ) : (
                      <HiOutlineHeart className="w-6 h-6 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right — Product Info */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[12px] font-bold text-[#1D349A] tracking-widest uppercase bg-[#1D349A]/10 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <span className="text-[12px] font-bold text-orange-600 tracking-wider uppercase bg-orange-50 px-3 py-1 rounded-full">
                  {product.tag}
                </span>
              </div>

              <h1 className="text-[28px] lg:text-[36px] font-bold text-gray-900 leading-tight mb-4">
                {product.title}
              </h1>

              <p className="text-gray-500 text-[15px] leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Price Block */}
              <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
                <div className="flex items-end gap-3 mb-2">
                  <span className="text-[32px] font-bold text-gray-900">
                    ${product.newPrice.toFixed(2)}
                  </span>
                  <span className="text-[18px] text-gray-400 line-through mb-1">
                    ${product.oldPrice.toFixed(2)}
                  </span>
                  <span className="text-[14px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded mb-1">
                    Save {savingsPercent}%
                  </span>
                </div>
                <p className="text-[13px] text-gray-400">
                  You save ${(product.oldPrice - product.newPrice).toFixed(2)} on this purchase
                </p>
              </div>

              {/* Quantity + Add to Cart */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-11 h-11 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-lg font-medium"
                  >
                    −
                  </button>
                  <span className="w-12 h-11 flex items-center justify-center text-[15px] font-semibold border-x border-gray-200">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-11 h-11 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-lg font-medium"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => window.dispatchEvent(new Event("open-cart"))}
                  className="liquid-fill flex-1 flex items-center justify-center gap-2 h-[48px] bg-[#1D349A] text-white font-bold text-[15px] rounded-full hover:bg-[#162a7d] transition-colors"
                >
                  <IoBagOutline className="w-5 h-5" />
                  Add to Cart — ${(product.newPrice * quantity).toFixed(2)}
                </button>
              </div>

              {/* Buy Now */}
              <Link
                href="/checkout"
                className="liquid-fill-white flex items-center justify-center gap-2 h-[48px] bg-gray-900 text-white font-bold text-[15px] rounded-full mb-8"
              >
                Buy Now
              </Link>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="flex flex-col items-center text-center p-3 bg-white rounded-xl border border-gray-100">
                  <IoFlash className="w-5 h-5 text-[#1D349A] mb-1.5" />
                  <span className="text-[12px] font-semibold text-gray-900">Instant Delivery</span>
                  <span className="text-[11px] text-gray-400">Via email</span>
                </div>
                <div className="flex flex-col items-center text-center p-3 bg-white rounded-xl border border-gray-100">
                  <IoShieldCheckmark className="w-5 h-5 text-[#1D349A] mb-1.5" />
                  <span className="text-[12px] font-semibold text-gray-900">Secure Purchase</span>
                  <span className="text-[11px] text-gray-400">100% safe</span>
                </div>
                <div className="flex flex-col items-center text-center p-3 bg-white rounded-xl border border-gray-100">
                  <IoMail className="w-5 h-5 text-[#1D349A] mb-1.5" />
                  <span className="text-[12px] font-semibold text-gray-900">24/7 Support</span>
                  <span className="text-[11px] text-gray-400">We&apos;re here</span>
                </div>
              </div>

              {/* Features */}
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="text-[14px] font-bold text-gray-900 mb-4 tracking-wide uppercase">
                  What&apos;s Included
                </h3>
                <ul className="space-y-3">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] text-gray-600">
                      <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold">
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[24px] lg:text-[28px] font-bold text-gray-900">
                  You May Also Like
                </h2>
                <Link
                  href="/shop"
                  className="text-[14px] font-semibold text-[#1D349A] hover:underline flex items-center gap-1"
                >
                  View All <IoChevronForward className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {related.map((p) => (
                  <Link
                    key={p.id}
                    href={`/products/${p.slug}`}
                    className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                      <div
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                        style={{ backgroundImage: `url('${p.image}')` }}
                      />
                      <div className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-bold px-2 py-1 rounded">
                        {p.discount}
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-[11px] font-bold text-[#1D349A] tracking-wider uppercase mb-1">
                        {p.category}
                      </p>
                      <h3 className="text-[14px] font-semibold text-gray-900 mb-2 group-hover:text-[#1D349A] transition-colors">
                        {p.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-[16px] font-bold">${p.newPrice.toFixed(2)}</span>
                        <span className="text-[13px] text-gray-400 line-through">${p.oldPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
