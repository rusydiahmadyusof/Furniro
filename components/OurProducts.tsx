"use client";

import ProductCard from "./ProductCard";
import { allProducts } from "@/data/products";

const OurProducts = () => {
  const featuredProducts = allProducts.slice(0, 8);

  return (
    <section className="py-16 md:py-24 px-6 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-bold text-4xl md:text-5xl text-gray-1 text-center mb-12">
          Our Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div className="flex justify-center">
          <button className="border-2 border-primary text-primary font-semibold text-base px-12 py-3 rounded hover:bg-primary hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            Show More
          </button>
        </div>
      </div>
    </section>
  );
};

export default OurProducts;

