"use client";

import Image from "next/image";
import { useState } from "react";

interface CartItemProps {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  quantity: number;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem = ({
  id,
  name,
  price,
  imageUrl,
  quantity,
  onQuantityChange,
  onRemove,
}: CartItemProps) => {
  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(id, quantity - 1);
    }
  };

  const handleIncrease = () => {
    onQuantityChange(id, quantity + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value) || 1;
    if (newQuantity > 0) {
      onQuantityChange(id, newQuantity);
    }
  };

  const subtotal = parseFloat(price.replace(/[^\d.]/g, "")) * quantity;
  const formattedSubtotal = `RM ${subtotal.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  return (
    <div className="grid grid-cols-12 gap-4 items-center py-6 px-6 border-b border-gray-5 last:border-0">
      <div className="col-span-4 flex items-center gap-4">
        <div className="relative w-[105px] h-[105px] rounded-lg overflow-hidden bg-primary/20 flex-shrink-0">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-normal text-base text-gray-3">{name}</h3>
        </div>
      </div>

      <div className="col-span-2">
        <p className="font-normal text-base text-gray-3">{price}</p>
      </div>

      <div className="col-span-3">
        <div className="flex items-center border border-gray-3 rounded w-fit">
          <button
            onClick={handleDecrease}
            className="w-8 h-8 flex items-center justify-center text-gray-1 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded"
            aria-label="Decrease quantity"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <input
            type="number"
            value={quantity}
            onChange={handleInputChange}
            min="1"
            className="w-12 h-8 text-center text-base text-black border-0 focus:outline-none"
          />
          <button
            onClick={handleIncrease}
            className="w-8 h-8 flex items-center justify-center text-gray-1 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded"
            aria-label="Increase quantity"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
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

      <div className="col-span-2">
        <p className="font-normal text-base text-black">{formattedSubtotal}</p>
      </div>

      <div className="col-span-1 flex justify-end">
        <button
          onClick={() => onRemove(id)}
          className="w-7 h-7 flex items-center justify-center text-gray-3 hover:text-red-accent transition-colors focus:outline-none focus:ring-2 focus:ring-red-accent focus:ring-offset-1 rounded"
          aria-label="Remove item"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CartItem;

