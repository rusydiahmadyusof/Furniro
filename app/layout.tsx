import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { ToastProvider } from "@/components/ToastProvider";

export const metadata: Metadata = {
  title: "Furniro - Furniture E-Commerce",
  description: "Discover beautiful furniture collections for your home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <WishlistProvider>
            <ToastProvider>{children}</ToastProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}

