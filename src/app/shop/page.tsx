"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { products, categories } from "@/data/products";
import { IoBagOutline, IoGridOutline, IoListOutline, IoChevronDown } from "react-icons/io5";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Biggest Discount", value: "discount" },
  { label: "Newest", value: "newest" },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    let items =
      selectedCategory === "all"
        ? [...products]
        : products.filter(
            (p) =>
              p.category.toLowerCase().replace(/\s+/g, "-") === selectedCategory
          );

    switch (sortBy) {
      case "price-asc":
        items.sort((a, b) => a.newPrice - b.newPrice);
        break;
      case "price-desc":
        items.sort((a, b) => b.newPrice - a.newPrice);
        break;
      case "discount":
        items.sort(
          (a, b) =>
            (b.oldPrice - b.newPrice) / b.oldPrice -
            (a.oldPrice - a.newPrice) / a.oldPrice
        );
        break;
      case "newest":
        items.sort((a, b) => b.id - a.id);
        break;
    }
    return items;
  }, [selectedCategory, sortBy]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFAFA]">
        {/* Breadcrumb */}
        <div className="max-w-[1347px] mx-auto px-4 pt-6 pb-2">
          <nav className="flex items-center gap-2 text-[13px] text-gray-400">
            <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Shop</span>
          </nav>
        </div>

        {/* Hero Banner */}
        <div className="max-w-[1347px] mx-auto px-4 mb-8">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#1D349A] to-[#0A1B5C] py-12 lg:py-16 px-8 lg:px-14">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,white_0%,transparent_70%)]" />
            </div>
            <h1 className="text-3xl lg:text-[42px] font-bold text-white leading-tight">
              All Products
            </h1>
            <p className="mt-3 text-white/70 text-[15px] lg:text-[16px] max-w-xl">
              Premium digital tools and subscriptions at unbeatable prices.
              Instant delivery to your inbox.
            </p>
            <p className="mt-4 text-white/50 text-[14px]">{products.length} products</p>
          </div>
        </div>

        <div className="max-w-[1347px] mx-auto px-4 pb-16">
          <div className="flex gap-8">
            {/* Sidebar — Desktop */}
            <aside className="hidden lg:block w-[240px] shrink-0">
              <div className="sticky top-[160px]">
                <h3 className="text-[13px] font-bold tracking-widest uppercase text-gray-400 mb-4">
                  Categories
                </h3>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`text-left px-3 py-2.5 rounded-lg text-[14px] font-medium transition-colors ${
                      selectedCategory === "all"
                        ? "bg-[#1D349A] text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    All Products
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`text-left px-3 py-2.5 rounded-lg text-[14px] font-medium transition-colors flex items-center gap-2.5 ${
                        selectedCategory === cat.slug
                          ? "bg-[#1D349A] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span className="text-[16px]">{cat.icon}</span>
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Price Ranges */}
                <h3 className="text-[13px] font-bold tracking-widest uppercase text-gray-400 mt-8 mb-4">
                  Price Range
                </h3>
                <div className="flex flex-col gap-2 text-[14px] text-gray-600">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded accent-[#1D349A]" />
                    Under $5
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded accent-[#1D349A]" />
                    $5 – $10
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded accent-[#1D349A]" />
                    $10 – $20
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded accent-[#1D349A]" />
                    $20+
                  </label>
                </div>
              </div>
            </aside>

            {/* Main Grid */}
            <div className="flex-1 min-w-0">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6 gap-4">
                {/* Mobile filter toggle */}
                <button
                  onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[14px] font-medium"
                >
                  <HiOutlineAdjustmentsHorizontal className="w-4 h-4" />
                  Filter
                </button>

                <div className="flex items-center gap-3 ml-auto">
                  {/* Sort */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 pr-9 text-[14px] font-medium text-gray-700 cursor-pointer focus:outline-none focus:border-[#1D349A]"
                    >
                      {sortOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <IoChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  </div>

                  {/* Grid toggle — desktop only */}
                  <div className="hidden lg:flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setGridCols(4)}
                      className={`p-2.5 transition-colors ${
                        gridCols === 4
                          ? "bg-gray-900 text-white"
                          : "bg-white text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      <IoGridOutline className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setGridCols(3)}
                      className={`p-2.5 transition-colors ${
                        gridCols === 3
                          ? "bg-gray-900 text-white"
                          : "bg-white text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      <IoListOutline className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile filter panel */}
              {mobileFilterOpen && (
                <div className="lg:hidden mb-6 p-4 bg-white rounded-xl border border-gray-200">
                  <h3 className="text-[13px] font-bold tracking-widest uppercase text-gray-400 mb-3">
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => { setSelectedCategory("all"); setMobileFilterOpen(false); }}
                      className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                        selectedCategory === "all"
                          ? "bg-[#1D349A] text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      All
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.slug}
                        onClick={() => { setSelectedCategory(cat.slug); setMobileFilterOpen(false); }}
                        className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                          selectedCategory === cat.slug
                            ? "bg-[#1D349A] text-white"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {cat.icon} {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Product Grid */}
              <div
                className={`grid gap-4 ${
                  gridCols === 4
                    ? "grid-cols-2 lg:grid-cols-4"
                    : "grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {filtered.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                      <div
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                        style={{ backgroundImage: `url('${product.image}')` }}
                      />
                      {/* Discount Badge */}
                      <div className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-bold px-2 py-1 rounded">
                        {product.discount}
                      </div>
                      {product.badge && (
                        <div className="absolute top-3 right-3 bg-[#1D349A] text-white text-[11px] font-bold px-2 py-1 rounded">
                          {product.badge}
                        </div>
                      )}
                      {/* Quick add */}
                      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            window.dispatchEvent(new Event("open-cart"));
                          }}
                          className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors"
                        >
                          <IoBagOutline className="w-5 h-5 text-gray-900" />
                        </button>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <p className="text-[11px] font-bold text-[#1D349A] tracking-wider uppercase mb-1">
                        {product.category}
                      </p>
                      <h3 className="text-[15px] font-semibold text-gray-900 leading-snug mb-2 group-hover:text-[#1D349A] transition-colors">
                        {product.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-[17px] font-bold text-gray-900">
                          ${product.newPrice.toFixed(2)}
                        </span>
                        <span className="text-[13px] text-gray-400 line-through">
                          ${product.oldPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <IoBagOutline className="w-8 h-8 text-gray-300" />
                  </div>
                  <p className="text-gray-500 font-medium">No products found in this category.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
