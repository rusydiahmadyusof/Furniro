"use client";

import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { getProductById, allProducts } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = getProductById(productId);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    notFound();
  }

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const images = product.images || [product.imageUrl];

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-[100px] pb-8 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Shop", href: "/shop" },
              { label: product.name },
            ]}
          />
        </div>
      </div>

      <section className="py-12 px-6 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <div className="relative h-[600px] w-full mb-4 rounded-lg overflow-hidden">
                <Image
                  src={images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative h-24 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index
                          ? "border-primary"
                          : "border-transparent"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h1 className="font-semibold text-4xl text-gray-1 mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <span className="font-semibold text-3xl text-primary">
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span className="font-normal text-xl text-gray-4 line-through">
                    {product.originalPrice}
                  </span>
                )}
                {product.badge === "discount" && product.discount && (
                  <span className="bg-red-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                    {product.discount}
                  </span>
                )}
                {product.badge === "new" && (
                  <span className="bg-green-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                    New
                  </span>
                )}
              </div>

              <p className="font-normal text-lg text-gray-2 mb-8 leading-relaxed">
                {product.details || product.description}
              </p>

              <div className="mb-8">
                <label className="block font-medium text-base text-black mb-3">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-3 rounded w-fit">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="w-12 h-12 flex items-center justify-center text-gray-1 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M5 12H19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                    <span className="w-12 text-center font-medium text-base">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="w-12 h-12 flex items-center justify-center text-gray-1 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 5V19M5 12H19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-white font-semibold text-base px-8 py-4 rounded hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Add To Cart
              </button>
              <button
                onClick={handleWishlistToggle}
                className={`px-6 py-4 border-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  isInWishlist(product.id)
                    ? "border-primary text-primary bg-primary/10"
                    : "border-gray-5 text-gray-1 hover:border-primary hover:text-primary"
                }`}
              >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
              </div>

              <div className="border-t border-gray-5 pt-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-base text-gray-1 w-24">
                      SKU:
                    </span>
                    <span className="font-normal text-base text-gray-2">
                      : {product.id}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-base text-gray-1 w-24">
                      Category:
                    </span>
                    <span className="font-normal text-base text-gray-2">
                      : {product.category || "Uncategorized"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="font-bold text-4xl text-gray-1 text-center mb-12">
                Related Products
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} {...relatedProduct} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

