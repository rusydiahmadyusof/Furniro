"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/data/products";
import { useAuth } from "./AuthContext";

interface WishlistContextType {
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// Get storage key based on user ID
const getWishlistStorageKey = (userId: string | null): string => {
  if (userId) {
    return `furniro_wishlist_${userId}`;
  }
  return "furniro_wishlist_guest";
};

// Helper function to load wishlist from localStorage
const loadWishlistFromStorage = (userId: string | null): Product[] => {
  if (typeof window === "undefined") return [];
  
  try {
    const key = getWishlistStorageKey(userId);
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error loading wishlist from localStorage:", error);
  }
  return [];
};

// Helper function to save wishlist to localStorage
const saveWishlistToStorage = (wishlistItems: Product[], userId: string | null): void => {
  if (typeof window === "undefined") return;
  
  try {
    const key = getWishlistStorageKey(userId);
    localStorage.setItem(key, JSON.stringify(wishlistItems));
  } catch (error) {
    console.error("Error saving wishlist to localStorage:", error);
  }
};

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load wishlist from localStorage when user changes
  useEffect(() => {
    const userId = user?.uid || null;
    const loadedWishlist = loadWishlistFromStorage(userId);
    setWishlistItems(loadedWishlist);
    setIsInitialized(true);
  }, [user?.uid]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      const userId = user?.uid || null;
      saveWishlistToStorage(wishlistItems, userId);
    }
  }, [wishlistItems, isInitialized, user?.uid]);

  const addToWishlist = (product: Product) => {
    setWishlistItems((prevItems) => {
      if (prevItems.find((item) => item.id === product.id)) {
        return prevItems;
      }
      return [...prevItems, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

