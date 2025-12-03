"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useToast } from "./ToastProvider";
import { Product } from "@/data/products";

interface ProductCardProps extends Product {
  viewMode?: "grid" | "list";
}

const ProductCard = ({
  id,
  name,
  description,
  price,
  originalPrice,
  discount,
  badge,
  imageUrl,
  viewMode = "grid",
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id, name, description, price, originalPrice, discount, badge, imageUrl } as Product);
    showToast("Product added to cart", "success");
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const product = { id, name, description, price, originalPrice, discount, badge, imageUrl } as Product;
    if (isInWishlist(id)) {
      removeFromWishlist(id);
      showToast("Removed from wishlist", "info");
    } else {
      addToWishlist(product);
      showToast("Added to wishlist", "success");
    }
  };

  if (viewMode === "list") {
    return (
      <Link
        href={`/products/${id}`}
        className="relative bg-white group cursor-pointer flex gap-6 p-4 border border-gray-5 rounded-lg hover:border-primary transition-colors"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-[200px] w-[200px] flex-shrink-0 overflow-hidden rounded">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {badge === "discount" && discount && (
            <div className="absolute top-4 right-4 w-12 h-12 bg-red-accent rounded-full flex items-center justify-center">
              <span className="font-medium text-base text-white">{discount}</span>
            </div>
          )}
          {badge === "new" && (
            <div className="absolute top-4 right-4 w-12 h-12 bg-green-accent rounded-full flex items-center justify-center">
              <span className="font-medium text-base text-white">New</span>
            </div>
          )}
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-2xl text-gray-1 mb-2">{name}</h3>
            <p className="font-medium text-base text-gray-3 mb-3">{description}</p>
            <div className="flex items-center gap-4">
              <span className="font-semibold text-xl text-gray-1">{price}</span>
              {originalPrice && (
                <span className="font-normal text-base text-gray-4 line-through">
                  {originalPrice}
                </span>
              )}
            </div>
          </div>
          {isHovered && (
            <div className="flex gap-4 items-center mt-4">
              <button
                onClick={handleAddToCart}
                className="bg-primary text-white px-8 py-2 font-semibold text-base rounded hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Add to cart
              </button>
              <button
                onClick={handleWishlistToggle}
                className={`text-gray-3 hover:text-primary transition-colors ${
                  isInWishlist(id) ? "text-primary" : ""
                }`}
              >
                {isInWishlist(id) ? "Liked" : "Like"}
              </button>
            </div>
          )}
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/products/${id}`}
      className="relative bg-white group cursor-pointer block h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[301px] w-full overflow-hidden flex-shrink-0">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {badge === "discount" && discount && (
          <div className="absolute top-6 right-6 w-12 h-12 bg-red-accent rounded-full flex items-center justify-center">
            <span className="font-medium text-base text-white">{discount}</span>
          </div>
        )}

        {badge === "new" && (
          <div className="absolute top-6 right-6 w-12 h-12 bg-green-accent rounded-full flex items-center justify-center">
            <span className="font-medium text-base text-white">New</span>
          </div>
        )}

        {isHovered && (
          <div className="absolute inset-0 bg-gray-1 bg-opacity-72 flex flex-col items-center justify-center gap-6 transition-opacity">
            <button
              onClick={handleAddToCart}
              className="bg-white px-12 py-3 font-semibold text-base text-primary rounded hover:bg-primary hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            >
              Add to cart
            </button>
            <div className="flex gap-5 items-center">
              <button
                onClick={handleWishlistToggle}
                className={`flex items-center gap-1 transition-colors ${
                  isInWishlist(id)
                    ? "text-primary"
                    : "text-white hover:text-primary"
                }`}
              >
                <span className="text-base">{isInWishlist(id) ? "Liked" : "Like"}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-light-bg p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-2xl text-gray-1 mb-2 line-clamp-1">{name}</h3>
        <p className="font-medium text-base text-gray-3 mb-3 line-clamp-2 flex-shrink-0">{description}</p>
        <div className="flex items-center gap-4 mt-auto">
          <span className="font-semibold text-xl text-gray-1">{price}</span>
          {originalPrice && (
            <span className="font-normal text-base text-gray-4 line-through">
              {originalPrice}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

