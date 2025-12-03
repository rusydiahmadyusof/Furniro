"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import FeaturesSection from "@/components/FeaturesSection";
import { useWishlist } from "@/contexts/WishlistContext";

export default function WishlistPage() {
  const { wishlistItems } = useWishlist();

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroBanner
        title="Wishlist"
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Wishlist" },
        ]}
      />

      <section className="py-16 md:py-24 px-6 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          {wishlistItems.length > 0 ? (
            <>
              <h2 className="font-bold text-4xl text-gray-1 mb-8">
                Your Wishlist ({wishlistItems.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {wishlistItems.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <h2 className="font-bold text-4xl text-gray-1 mb-4">
                Your Wishlist is Empty
              </h2>
              <p className="font-normal text-lg text-gray-3 mb-8">
                Start adding products you love to your wishlist!
              </p>
              <a
                href="/shop"
                className="inline-block bg-primary text-white font-semibold text-base px-12 py-3 rounded hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Browse Products
              </a>
            </div>
          )}
        </div>
      </section>

      <FeaturesSection />
      <Footer />
    </main>
  );
}

