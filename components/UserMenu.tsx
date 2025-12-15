"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import AccountIcon from "./icons/AccountIcon";

import { User } from "firebase/auth";

interface UserMenuProps {
  user: User;
}

const UserMenu = ({ user }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-6 h-6 text-gray-1 hover:text-primary transition-colors flex items-center justify-center"
        aria-label="User menu"
      >
        <AccountIcon />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-12 bg-white rounded-lg shadow-lg border border-gray-5 min-w-[200px] z-50 py-2">
            <div className="px-4 py-3 border-b border-gray-5">
              <p className="font-semibold text-sm text-black">{user.displayName || "User"}</p>
              <p className="text-xs text-gray-3 mt-1">{user.email}</p>
            </div>
            <div className="py-1">
              <button
                onClick={() => {
                  setIsOpen(false);
                  router.push("/profile");
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-1 hover:bg-light-bg transition-colors"
              >
                My Profile
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  router.push("/orders");
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-1 hover:bg-light-bg transition-colors"
              >
                My Orders
              </button>
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 text-sm text-red-accent hover:bg-light-bg transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserMenu;

