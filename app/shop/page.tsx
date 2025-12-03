"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";
import ShopFilters from "@/components/ShopFilters";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import FeaturesSection from "@/components/FeaturesSection";
import { allProducts, type Product } from "@/data/products";

interface FilterOptions {
  categories: string[];
  priceRange: { min: number; max: number };
}

export default function ShopPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [sortBy, setSortBy] = useState("Default");
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    priceRange: { min: 0, max: 10000000 },
  });

  let filteredProducts = allProducts.filter((product) => {
    if (filters.categories.length > 0 && product.category) {
      if (!filters.categories.includes(product.category)) {
        return false;
      }
    }
    const price = parseFloat(product.price.replace(/[^\d.]/g, ""));
    if (price < filters.priceRange.min || price > filters.priceRange.max) {
      return false;
    }
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = parseFloat(a.price.replace(/[^\d.]/g, ""));
    const priceB = parseFloat(b.price.replace(/[^\d.]/g, ""));

    switch (sortBy) {
      case "Price: Low to High":
        return priceA - priceB;
      case "Price: High to Low":
        return priceB - priceA;
      case "Newest":
        return (b.badge === "new" ? 1 : 0) - (a.badge === "new" ? 1 : 0);
      case "Oldest":
        return (a.badge === "new" ? 1 : 0) - (b.badge === "new" ? 1 : 0);
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroBanner
        title="Shop"
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Shop" },
        ]}
      />

      <ShopFilters
        totalResults={sortedProducts.length}
        showingFrom={startIndex + 1}
        showingTo={Math.min(endIndex, sortedProducts.length)}
        onViewChange={setViewMode}
        onSortChange={handleSortChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        onFilterChange={handleFilterChange}
      />

      <section className="py-16 md:py-24 px-6 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                : "flex flex-col gap-6"
            }
          >
            {currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                viewMode={viewMode}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </section>

      <FeaturesSection />
      <Footer />
    </main>
  );
}

