"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { products } from "@/data/products";
import { IoTrashOutline, IoAdd, IoRemove, IoChevronForward } from "react-icons/io5";
import { IoBagOutline } from "react-icons/io5";

interface CartItem {
  productId: number;
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { productId: 1, quantity: 1 },
    { productId: 4, quantity: 2 },
    { productId: 3, quantity: 1 },
  ]);

  const updateQuantity = (productId: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const cartProducts = cartItems.map((item) => ({
    ...item,
    product: products.find((p) => p.id === item.productId)!,
  }));

  const subtotal = cartProducts.reduce(
    (sum, item) => sum + item.product.newPrice * item.quantity,
    0
  );
  const savings = cartProducts.reduce(
    (sum, item) => sum + (item.product.oldPrice - item.product.newPrice) * item.quantity,
    0
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFAFA]">
        {/* Breadcrumb */}
        <div className="max-w-[1347px] mx-auto px-4 pt-6 pb-2">
          <nav className="flex items-center gap-2 text-[13px] text-gray-400">
            <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
            <IoChevronForward className="w-3 h-3" />
            <span className="text-gray-900 font-medium">Shopping Cart</span>
          </nav>
        </div>

        <div className="max-w-[1347px] mx-auto px-4 pb-16 pt-4">
          <h1 className="text-[28px] lg:text-[36px] font-bold text-gray-900 mb-8">
            Shopping Cart
            <span className="text-gray-400 font-normal text-[20px] ml-3">
              ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)
            </span>
          </h1>

          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-gray-100">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <IoBagOutline className="w-10 h-10 text-gray-300" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-6">Looks like you haven&apos;t added anything yet.</p>
              <Link
                href="/shop"
                className="liquid-fill inline-flex items-center gap-2 px-8 py-3.5 bg-[#1D349A] text-white font-bold rounded-full"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartProducts.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="flex gap-4 bg-white rounded-xl border border-gray-100 p-4 lg:p-5"
                  >
                    {/* Image */}
                    <Link href={`/products/${product.slug}`} className="shrink-0">
                      <div className="w-[100px] h-[100px] lg:w-[120px] lg:h-[120px] rounded-lg overflow-hidden bg-gray-100">
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url('${product.image}')` }}
                        />
                      </div>
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[11px] font-bold text-[#1D349A] tracking-wider uppercase mb-1">
                            {product.category}
                          </p>
                          <Link
                            href={`/products/${product.slug}`}
                            className="text-[15px] lg:text-[16px] font-semibold text-gray-900 hover:text-[#1D349A] transition-colors"
                          >
                            {product.title}
                          </Link>
                        </div>
                        <button
                          onClick={() => removeItem(product.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors shrink-0"
                        >
                          <IoTrashOutline className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="mt-auto flex items-end justify-between pt-3">
                        {/* Quantity */}
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQuantity(product.id, -1)}
                            className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                          >
                            <IoRemove className="w-4 h-4" />
                          </button>
                          <span className="w-10 h-9 flex items-center justify-center text-[14px] font-semibold border-x border-gray-200">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, 1)}
                            className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                          >
                            <IoAdd className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-[17px] font-bold text-gray-900">
                            ${(product.newPrice * quantity).toFixed(2)}
                          </p>
                          {quantity > 1 && (
                            <p className="text-[12px] text-gray-400">
                              ${product.newPrice.toFixed(2)} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-[160px] bg-white rounded-xl border border-gray-100 p-6">
                  <h2 className="text-[18px] font-bold text-gray-900 mb-5">
                    Order Summary
                  </h2>

                  <div className="space-y-3 text-[14px] mb-5">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>You save</span>
                      <span className="font-medium">−${savings.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Delivery</span>
                      <span className="font-medium text-green-600">Instant (Email)</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4 mb-6">
                    <div className="flex justify-between text-[18px] font-bold text-gray-900">
                      <span>Total</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Promo Code */}
                  <div className="flex gap-2 mb-6">
                    <input
                      type="text"
                      placeholder="Promo code"
                      className="flex-1 h-[44px] px-4 bg-gray-50 border border-gray-200 rounded-lg text-[14px] placeholder:text-gray-400 focus:outline-none focus:border-[#1D349A]"
                    />
                    <button className="px-5 h-[44px] bg-gray-900 text-white text-[13px] font-bold rounded-lg hover:bg-gray-800 transition-colors">
                      Apply
                    </button>
                  </div>

                  <Link
                    href="/checkout"
                    className="liquid-fill flex items-center justify-center w-full h-[48px] bg-[#1D349A] text-white font-bold text-[15px] rounded-full hover:bg-[#162a7d] transition-colors mb-3"
                  >
                    Proceed to Checkout
                  </Link>

                  <Link
                    href="/shop"
                    className="flex items-center justify-center w-full h-[44px] text-gray-600 font-medium text-[14px] hover:text-gray-900 transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
