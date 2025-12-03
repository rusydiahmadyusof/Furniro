"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";
import CartTable from "@/components/CartTable";
import CartTotals from "@/components/CartTotals";
import FeaturesSection from "@/components/FeaturesSection";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/components/ToastProvider";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const { showToast } = useToast();
  const router = useRouter();

  const handleQuantityChange = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
  };

  const handleRemove = (id: string) => {
    removeFromCart(id);
    showToast("Item removed from cart", "info");
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      showToast("Your cart is empty", "error");
      return;
    }
    router.push("/checkout");
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroBanner
        title="Cart"
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Cart" },
        ]}
      />

      <section className="py-16 md:py-24 px-6 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CartTable
                items={cartItems}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemove}
              />
            </div>

            <div className="lg:col-span-1">
              <CartTotals subtotal={getTotalPrice()} onCheckout={handleCheckout} />
            </div>
          </div>
        </div>
      </section>

      <FeaturesSection />
      <Footer />
    </main>
  );
}

