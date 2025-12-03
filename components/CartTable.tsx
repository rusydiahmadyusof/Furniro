"use client";

import CartItem from "./CartItem";
import { CartItem as CartItemType } from "@/contexts/CartContext";

interface CartTableProps {
  items: CartItemType[];
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartTable = ({ items, onQuantityChange, onRemove }: CartTableProps) => {
  if (items.length === 0) {
    return (
      <div className="bg-[#f9f1e7] rounded-lg p-12 text-center">
        <p className="font-medium text-lg text-gray-3 mb-4">Your cart is empty</p>
        <a
          href="/shop"
          className="inline-block bg-primary text-white font-semibold text-base px-8 py-3 rounded hover:bg-primary/90 transition-colors"
        >
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="bg-[#f9f1e7] rounded-lg">
      <div className="bg-[#f9f1e7] py-4 px-6 rounded-t-lg">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <p className="font-medium text-base text-black">Product</p>
          </div>
          <div className="col-span-2">
            <p className="font-medium text-base text-black">Price</p>
          </div>
          <div className="col-span-3">
            <p className="font-medium text-base text-black">Quantity</p>
          </div>
          <div className="col-span-2">
            <p className="font-medium text-base text-black">Subtotal</p>
          </div>
          <div className="col-span-1"></div>
        </div>
      </div>

      <div className="bg-white rounded-b-lg">
        {items.map((item) => (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.product.name}
            price={item.product.price}
            imageUrl={item.product.imageUrl}
            quantity={item.quantity}
            onQuantityChange={onQuantityChange}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
};

export default CartTable;

