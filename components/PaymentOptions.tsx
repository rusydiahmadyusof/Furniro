"use client";

import { useState } from "react";

interface PaymentOptionsProps {
  onPaymentMethodChange?: (method: string) => void;
}

const PaymentOptions = ({ onPaymentMethodChange }: PaymentOptionsProps) => {
  const [selectedMethod, setSelectedMethod] = useState("direct-bank-transfer");

  const handleMethodChange = (method: string) => {
    setSelectedMethod(method);
    onPaymentMethodChange?.(method);
  };

  return (
    <div className="bg-white rounded-lg p-8">
      <div className="space-y-6">
        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="direct-bank-transfer"
              checked={selectedMethod === "direct-bank-transfer"}
              onChange={() => handleMethodChange("direct-bank-transfer")}
              className="mt-1 w-[14px] h-[14px] text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
            />
            <div className="flex-1">
              <p className="font-medium text-base text-black mb-2">
                Direct Bank Transfer
              </p>
              <p className="font-light text-base text-gray-3">
                Make your payment directly into our bank account. Please use your
                Order ID as the payment reference. Your order will not be shipped
                until the funds have cleared in our account.
              </p>
            </div>
          </label>
        </div>

        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="direct-bank-transfer-2"
              checked={selectedMethod === "direct-bank-transfer-2"}
              onChange={() => handleMethodChange("direct-bank-transfer-2")}
              className="w-[14px] h-[14px] text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
            />
            <p className="font-medium text-base text-gray-3">Direct Bank Transfer</p>
          </label>
        </div>

        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="stripe"
              checked={selectedMethod === "stripe"}
              onChange={() => handleMethodChange("stripe")}
              className="w-[14px] h-[14px] text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
            />
            <div className="flex-1">
              <p className="font-medium text-base text-black mb-1">
                Credit/Debit Card (Stripe)
              </p>
              <p className="font-light text-sm text-gray-3">
                Secure payment via Stripe. Accepts Visa, Mastercard, and more.
              </p>
            </div>
          </label>
        </div>

        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="cash-on-delivery"
              checked={selectedMethod === "cash-on-delivery"}
              onChange={() => handleMethodChange("cash-on-delivery")}
              className="w-[14px] h-[14px] text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
            />
            <p className="font-medium text-base text-gray-3">Cash On Delivery</p>
          </label>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-5">
        <p className="font-normal text-base text-black text-justify">
          Your personal data will be used to support your experience throughout this
          website, to manage access to your account, and for other purposes described
          in our{" "}
          <a href="#" className="font-semibold text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded">
            privacy policy.
          </a>
        </p>
      </div>
    </div>
  );
};

export default PaymentOptions;

