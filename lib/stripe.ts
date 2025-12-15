import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!publishableKey) {
      console.warn("Stripe publishable key is not set");
      return Promise.resolve(null);
    }
    
    // Validate key format
    if (!publishableKey.startsWith("pk_test_") && !publishableKey.startsWith("pk_live_")) {
      console.error(
        "Invalid Stripe publishable key format. Keys should start with 'pk_test_' or 'pk_live_'. " +
        "Please check your NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in .env.local"
      );
      return Promise.resolve(null);
    }
    
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

