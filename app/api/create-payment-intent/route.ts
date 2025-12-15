import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
if (!STRIPE_SECRET_KEY || !STRIPE_SECRET_KEY.startsWith("sk_")) {
  throw new Error("STRIPE_SECRET_KEY is not configured. Set it in .env.local");
}

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2025-11-17.clover",
});

// Simple rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // requests
const RATE_LIMIT_WINDOW = 60000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const { amount, currency = "myr", metadata } = await request.json();

    // Validate and sanitize input
    const amountNum = typeof amount === "number" ? amount : parseFloat(amount);
    if (!amountNum || isNaN(amountNum) || amountNum <= 0 || amountNum > 1000000) {
      return NextResponse.json(
        { error: "Invalid amount. Must be between 0.01 and 1,000,000" },
        { status: 400 }
      );
    }

    const currencyStr = String(currency || "myr").toLowerCase().slice(0, 3);
    const sanitizedMetadata = metadata && typeof metadata === "object" 
      ? Object.fromEntries(
          Object.entries(metadata).slice(0, 20).map(([k, v]) => [
            String(k).slice(0, 50),
            String(v).slice(0, 500)
          ])
        )
      : {};

    // Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amountNum * 100), // Convert to cents
      currency: currencyStr,
      metadata: sanitizedMetadata,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    console.error("Error creating payment intent:", error);
    
    // Provide more helpful error messages
    let errorMessage = "Failed to create payment intent";
    if (error.type === "StripeAuthenticationError") {
      errorMessage = "Invalid Stripe API key. Please check your STRIPE_SECRET_KEY in .env.local";
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

