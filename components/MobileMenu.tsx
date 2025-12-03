"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IMAGES } from "@/constants/images";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[60] lg:hidden"
        onClick={onClose}
      />
      <div className="fixed top-0 left-0 h-full w-64 bg-white z-[60] lg:hidden transform transition-transform duration-300 shadow-xl">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-5">
            <Link href="/" className="flex items-center gap-2" onClick={onClose}>
              <div className="h-8 w-12 relative">
                <Image
                  src={IMAGES.logo}
                  alt="Furniro Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h1 className="font-montserrat font-bold text-2xl text-black">
                Furniro
              </h1>
            </Link>
            <button
              onClick={onClose}
              className="text-gray-1 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <nav className="flex-1 p-6">
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className="block font-medium text-base text-black hover:text-primary transition-colors py-2 focus:outline-none focus:text-primary"
                  onClick={onClose}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="block font-medium text-base text-black hover:text-primary transition-colors py-2 focus:outline-none focus:text-primary"
                  onClick={onClose}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block font-medium text-base text-black hover:text-primary transition-colors py-2 focus:outline-none focus:text-primary"
                  onClick={onClose}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="block font-medium text-base text-black hover:text-primary transition-colors py-2 focus:outline-none focus:text-primary"
                  onClick={onClose}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;

