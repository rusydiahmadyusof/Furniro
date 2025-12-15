"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { getStripe } from "@/lib/stripe";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";
import BillingDetailsForm, { BillingFormData } from "@/components/BillingDetailsForm";
import OrderSummary from "@/components/OrderSummary";
import PaymentOptions from "@/components/PaymentOptions";
import StripePaymentForm from "@/components/StripePaymentForm";
import FeaturesSection from "@/components/FeaturesSection";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/components/ToastProvider";

const ORDERS_STORAGE_KEY = "furniro_orders";

// Helper function to save order to localStorage
const saveOrderToStorage = (order: any): void => {
  if (typeof window === "undefined") return;
  
  try {
    const existingOrders = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || "[]");
    const newOrder = {
      ...order,
      id: `order-${Date.now()}`,
      date: new Date().toISOString(),
    };
    existingOrders.push(newOrder);
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(existingOrders));
  } catch (error) {
    console.error("Error saving order to localStorage:", error);
  }
};

// Validate billing form data
const validateBillingData = (data: BillingFormData): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  if (!data.firstName?.trim()) errors.firstName = "First name is required";
  if (!data.lastName?.trim()) errors.lastName = "Last name is required";
  if (!data.streetAddress?.trim()) errors.streetAddress = "Street address is required";
  if (!data.townCity?.trim()) errors.townCity = "Town/City is required";
  if (!data.zipCode?.trim()) errors.zipCode = "ZIP code is required";
  
  if (!data.phone?.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^[\d\s\-\+\(\)]+$/.test(data.phone)) {
    errors.phone = "Invalid phone number";
  }

  if (!data.email?.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Invalid email address";
  }

  return { isValid: Object.keys(errors).length === 0, errors };
};

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("direct-bank-transfer");
  const [billingData, setBillingData] = useState<BillingFormData | null>(null);
  const [showBillingErrors, setShowBillingErrors] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [stripeClientSecret, setStripeClientSecret] = useState<string | null>(null);
  const [isLoadingStripe, setIsLoadingStripe] = useState(false);
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { showToast } = useToast();
  const router = useRouter();

  const orderItems = cartItems.map((item) => ({
    name: item.product.name,
    quantity: item.quantity,
    price: item.product.price,
  }));

  const totalAmount = getTotalPrice();

  // Create payment intent when Stripe is selected
  useEffect(() => {
    if (paymentMethod === "stripe" && totalAmount > 0 && billingData) {
      createPaymentIntent();
    } else {
      setStripeClientSecret(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethod, totalAmount, billingData]);

  const createPaymentIntent = async () => {
    setIsLoadingStripe(true);
    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalAmount,
          currency: "myr",
          metadata: {
            orderItems: JSON.stringify(orderItems),
            customerEmail: billingData?.email || "",
          },
        }),
      });

      const data = await response.json();
      
      if (!response.ok || !data.clientSecret) {
        const errorMessage = data.error || data.details || "Failed to initialize payment";
        showToast(errorMessage, "error");
        return;
      }

      setStripeClientSecret(data.clientSecret);
    } catch (error: any) {
      showToast("Failed to initialize payment. Please check your Stripe API keys.", "error");
    } finally {
      setIsLoadingStripe(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      showToast("Your cart is empty.", "error");
      return;
    }

    if (!billingData) {
      showToast("Please fill in your billing details.", "error");
      setShowBillingErrors(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const validation = validateBillingData(billingData);
    if (!validation.isValid) {
      const errorMessages = Object.values(validation.errors);
      showToast(`Please fix: ${errorMessages.slice(0, 2).join(", ")}`, "error");
      setShowBillingErrors(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (paymentMethod !== "stripe") {
      await processOrder();
    }
  };

  const processOrder = async () => {
    setIsPlacingOrder(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const order = {
        billing: billingData,
        paymentMethod,
        items: orderItems,
        total: totalAmount,
        subtotal: totalAmount,
        status: paymentMethod === "stripe" ? "paid" : "pending",
      };

      saveOrderToStorage(order);
      clearCart();
      showToast(`Order placed! Total: RM ${totalAmount.toFixed(2)}`, "success");
      
      setTimeout(() => router.push("/"), 2000);
    } catch (error) {
      showToast("Failed to place order. Please try again.", "error");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const handleStripeSuccess = () => processOrder();
  const handleStripeError = (error: string) => showToast(error, "error");

  const stripeOptions = stripeClientSecret ? {
    clientSecret: stripeClientSecret,
    appearance: { theme: "stripe" as const },
  } : null;

  const stripePromise = useMemo(() => getStripe(), []);

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
              <BillingDetailsForm 
                onDataChange={setBillingData}
                showErrors={showBillingErrors}
              />
            </div>

            <div className="space-y-8">
              <OrderSummary items={orderItems} />
              <PaymentOptions onPaymentMethodChange={setPaymentMethod} />

              {paymentMethod === "stripe" ? (
                <div className="bg-white rounded-lg p-6 border border-gray-3">
                  {isLoadingStripe ? (
                    <div className="flex items-center justify-center py-8">
                      <LoadingSpinner size="lg" />
                    </div>
                  ) : stripeOptions ? (
                    <Elements 
                      {...({ stripePromise } as any)} 
                      options={stripeOptions}
                    >
                      <StripePaymentForm
                        amount={totalAmount}
                        onSuccess={handleStripeSuccess}
                        onError={handleStripeError}
                      />
                    </Elements>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-3 mb-4">
                        Please fill in your billing details to proceed with payment.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handlePlaceOrder}
                  disabled={isPlacingOrder || cartItems.length === 0}
                  className="w-full border-2 border-black rounded-[15px] py-4 font-semibold text-xl text-black hover:bg-black hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isPlacingOrder && <LoadingSpinner size="sm" />}
                  {isPlacingOrder ? "Processing order..." : "Place order"}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <FeaturesSection />
      <Footer />
    </main>
  );
}
