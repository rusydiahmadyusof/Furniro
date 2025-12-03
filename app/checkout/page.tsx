"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";
import BillingDetailsForm from "@/components/BillingDetailsForm";
import OrderSummary from "@/components/OrderSummary";
import PaymentOptions from "@/components/PaymentOptions";
import FeaturesSection from "@/components/FeaturesSection";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/components/ToastProvider";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("direct-bank-transfer");
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { showToast } = useToast();
  const router = useRouter();

  const orderItems = cartItems.map((item) => ({
    name: item.product.name,
    quantity: item.quantity,
    price: item.product.price,
  }));

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      showToast("Your cart is empty", "error");
      return;
    }
    clearCart();
    showToast("Order placed successfully!", "success");
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroBanner
        title="Checkout"
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Checkout" },
        ]}
      />

      <section className="py-16 md:py-24 px-6 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <BillingDetailsForm />
            </div>

            <div className="space-y-8">
              <OrderSummary items={orderItems} />
              <PaymentOptions onPaymentMethodChange={setPaymentMethod} />

              <button
                onClick={handlePlaceOrder}
                className="w-full border-2 border-black rounded-[15px] py-4 font-semibold text-xl text-black hover:bg-black hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              >
                Place order
              </button>
            </div>
          </div>
        </div>
      </section>

      <FeaturesSection />
      <Footer />
    </main>
  );
}

