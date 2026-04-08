"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { products } from "@/data/products";
import { IoBagOutline } from "react-icons/io5";
import { HiOutlineSearch } from "react-icons/hi";
import { Suspense } from "react";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <>
      {/* Search Bar */}
      <div className="max-w-[700px] mx-auto px-4 pt-8 pb-6">
        <div className="flex items-center h-[56px] rounded-full overflow-hidden bg-white border-2 border-gray-200 focus-within:border-[#1D349A] transition-colors shadow-sm">
          <HiOutlineSearch className="w-5 h-5 text-gray-400 ml-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for AI tools, design software, subscriptions..."
            className="flex-1 h-full px-4 text-[16px] text-gray-900 placeholder:text-gray-400 outline-none bg-transparent"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="mr-4 text-[13px] text-gray-400 hover:text-gray-600 font-medium"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="max-w-[1347px] mx-auto px-4 pb-16">
        {!query.trim() ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-[15px] mb-6">Start typing to search products</p>
            <div>
              <p className="text-[12px] font-bold tracking-widest uppercase text-gray-300 mb-3">
                Popular Searches
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {["ChatGPT", "Canva Pro", "NordVPN", "Midjourney", "Gemini", "Copilot"].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-full text-[14px] font-medium text-gray-700 hover:border-[#1D349A] hover:text-[#1D349A] transition-colors"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiOutlineSearch className="w-8 h-8 text-gray-300" />
            </div>
            <h2 className="text-[18px] font-bold text-gray-900 mb-2">
              No results for &ldquo;{query}&rdquo;
            </h2>
            <p className="text-gray-500 text-[14px]">
              Try different keywords or browse our{" "}
              <Link href="/shop" className="text-[#1D349A] font-semibold hover:underline">
                full catalog
              </Link>
            </p>
          </div>
        ) : (
          <>
            <p className="text-[14px] text-gray-500 mb-6">
              {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url('${product.image}')` }}
                    />
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-bold px-2 py-1 rounded">
                      {product.discount}
                    </div>
                  </div>
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
          </>
        )}
      </div>
    </>
  );
}

export default function SearchPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFAFA]">
        <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading...</div>}>
          <SearchContent />
        </Suspense>
      </main>
    </>
  );
}
