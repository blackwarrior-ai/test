import { Header } from "@/components/Header";
import { CategoryCarousel } from "@/components/Home/CategoryCarousel";
import { HeroBanner } from "@/components/Home/HeroBanner";
import { NewArrivals } from "@/components/Home/NewArrivals";
import { FlashSaleBanner } from "@/components/Home/FlashSaleBanner";
import { FeaturedEditorial } from "@/components/Home/FeaturedEditorial";
import { ShopByCategories } from "@/components/Home/ShopByCategories";
import { ProductShowcase } from "@/components/Home/ProductShowcase";
import { MarqueeBanner } from "@/components/Home/MarqueeBanner";
import { SpecialOffersTab } from "@/components/Home/SpecialOffersTab";
import { MobileCategoryCarousel } from "@/components/Home/MobileCategoryCarousel";

import { MobileProductSlider } from "@/components/Home/MobileProductSlider";
import { MobileBestSellers } from "@/components/Home/MobileBestSellers";
import { MobileFlashSale } from "@/components/Home/MobileFlashSale";
import { MobileCommunityPicks } from "@/components/Home/MobileCommunityPicks";
import { MobileLimitedStock } from "@/components/Home/MobileLimitedStock";
import { MobileCategoryBanners } from "@/components/Home/MobileCategoryBanners";
import {
  TrendingProducts,
  TrustBadges,
  Testimonials,
  NewsletterCTA,
  BrandPromises,
  MoreProducts,
  FAQ,
  FinalCTA,
} from "@/components/Home/HomeSections";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Mobile: Hero full-screen only, then Categories Carousel */}
        <div className="lg:hidden">
          <HeroBanner />
          <MobileProductSlider />
          <MobileCategoryCarousel />
          <MobileBestSellers />
          <MobileFlashSale />
          <MobileCommunityPicks />
          <MobileLimitedStock />
          <MobileCategoryBanners />
        </div>

        {/* Desktop: Category carousel under header, then hero */}
        <div className="hidden lg:block">
          <CategoryCarousel />
          <HeroBanner />
        </div>

        {/* Section 3: New Arrivals — desktop only */}
        <div className="hidden lg:block">
          <NewArrivals />
        </div>

        {/* Flash Sale Countdown Banner — desktop only */}
        <div className="hidden lg:block"><FlashSaleBanner /></div>

        {/* Section 4: Featured Editorial Cards — desktop only */}
        <div className="hidden lg:block"><FeaturedEditorial /></div>

        {/* Section 5: Shop By Categories Grid — desktop only */}
        <div className="hidden lg:block"><ShopByCategories /></div>

        {/* Section 6: Product Showcase Mosaic — desktop only */}
        <div className="hidden lg:block"><ProductShowcase /></div>

        {/* Marquee Text Banner — desktop only */}
        <div className="hidden lg:block"><MarqueeBanner /></div>

        {/* Special Offers Side Tab — desktop only */}
        <div className="hidden lg:block"><SpecialOffersTab /></div>

        {/* Trending Products Section */}
        <div className="hidden lg:block"><TrendingProducts /></div>

        {/* Trust Badges */}
        <div className="hidden lg:block"><TrustBadges /></div>

        {/* More Products to Explore */}
        <div className="hidden lg:block"><MoreProducts /></div>

        {/* Newsletter / CTA */}
        <div className="hidden lg:block"><NewsletterCTA /></div>

        {/* Testimonials */}
        <div className="hidden lg:block"><Testimonials /></div>

        {/* Brand Stats */}
        <div className="hidden lg:block"><BrandPromises /></div>

        {/* FAQ */}
        <div className="hidden lg:block"><FAQ /></div>

        {/* Final CTA */}
        <div className="hidden lg:block"><FinalCTA /></div>
      </main>
    </>
  );
}
