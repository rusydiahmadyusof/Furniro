"use client";

import { useState } from "react";
import Link from "next/link";
import { useToast } from "./ToastProvider";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast("Successfully subscribed to newsletter!", "success");
      setEmail("");
    } else {
      showToast("Please enter a valid email address", "error");
    }
  };

  return (
    <footer className="bg-white border-t border-gray-5 w-full">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h2 className="font-bold text-2xl text-black mb-6">Funiro.</h2>
            <p className="font-normal text-base text-gray-3 leading-relaxed">
              Lot 123, Jalan Bukit Bintang,
              <br />
              55100 Kuala Lumpur, Malaysia
            </p>
          </div>

          <div>
            <h3 className="font-medium text-base text-gray-3 mb-6">Links</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="font-medium text-base text-black hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="font-medium text-base text-black hover:text-primary transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="font-medium text-base text-black hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="font-medium text-base text-black hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-base text-gray-3 mb-6">Help</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="font-medium text-base text-black hover:text-primary transition-colors focus:outline-none focus:text-primary">
                  Payment Options
                </a>
              </li>
              <li>
                <a href="#" className="font-medium text-base text-black hover:text-primary transition-colors focus:outline-none focus:text-primary">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="font-medium text-base text-black hover:text-primary transition-colors focus:outline-none focus:text-primary">
                  Privacy Policies
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-base text-gray-3 mb-6">Newsletter</h3>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email Address"
                className="flex-1 border-b border-gray-5 pb-2 text-sm text-gray-3 placeholder:text-gray-3 focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="font-medium text-sm text-black border-b border-black pb-2 hover:text-primary hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-5 pt-6">
          <p className="font-normal text-base text-black text-center">
            2023 furino. All rights reverved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

