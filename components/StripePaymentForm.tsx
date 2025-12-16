"use client";

import { useState, FormEvent } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import LoadingSpinner from "./LoadingSpinner";
import { useToast } from "./ToastProvider";

interface StripePaymentFormProps {
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

const StripePaymentForm = ({
  amount,
  onSuccess,
  onError,
}: StripePaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { showToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  // Safety check - if Stripe or Elements aren't available, show error
  if (!stripe || !elements) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">
          Payment system is not available. Please refresh the page.
        </p>
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
        },
        redirect: "if_required",
      });

      if (error) {
        const errorMsg = error.message || "Payment failed";
        onError(errorMsg);
        showToast(errorMsg, "error");
      } else if (paymentIntent?.status === "succeeded") {
        onSuccess();
        showToast("Payment successful!", "success");
      }
    } catch (err: any) {
      const errorMsg = err.message || "Payment error occurred";
      onError(errorMsg);
      showToast(errorMsg, "error");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg p-6 border border-gray-3">
        <PaymentElement />
      </div>
      <button
        type="submit"
        disabled={!stripe || !elements || isProcessing}
        className="w-full bg-primary text-white font-semibold text-base py-3 rounded hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isProcessing && <LoadingSpinner size="sm" className="text-white" />}
        {isProcessing ? "Processing..." : `Pay RM ${amount.toFixed(2)}`}
      </button>
    </form>
  );
};

export default StripePaymentForm;

