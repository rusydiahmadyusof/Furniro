"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "./ToastProvider";
import LoadingSpinner from "./LoadingSpinner";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignUp: () => void;
}

const SignInModal = ({ isOpen, onClose, onSwitchToSignUp }: SignInModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { signIn } = useAuth();
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      await signIn(email, password);
      showToast("Signed in successfully! Welcome back!", "success");
      onClose();
      setEmail("");
      setPassword("");
      setErrors({});
    } catch (error: any) {
      const errorMessage = error.message || "Failed to sign in. Please check your credentials.";
      showToast(errorMessage, "error");
      setErrors({ general: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[70]"
        onClick={onClose}
      />
      <div className="fixed inset-0 flex items-center justify-center z-[70] p-4">
        <div
          className="bg-white rounded-lg max-w-md w-full p-8 relative shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-3 hover:text-gray-1 transition-colors"
            aria-label="Close"
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

          <h2 className="text-3xl font-semibold text-black mb-2">Sign In</h2>
          <p className="text-gray-3 text-sm mb-6">Welcome back! Please sign in to your account.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="signin-email"
                className="block font-medium text-base text-black mb-2"
              >
                Email address
              </label>
              <input
                type="email"
                id="signin-email"
                value={email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
                placeholder="Enter your email"
                className={`w-full h-[50px] px-4 border rounded-[10px] focus:outline-none transition-colors ${
                  errors.email || errors.general
                    ? "border-red-accent focus:border-red-accent"
                    : "border-gray-3 focus:border-primary"
                }`}
              />
            </div>

            <div>
              <label
                htmlFor="signin-password"
                className="block font-medium text-base text-black mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="signin-password"
                value={password}
                onChange={(e) => handleChange("password", e.target.value)}
                required
                placeholder="Enter your password"
                className={`w-full h-[50px] px-4 border rounded-[10px] focus:outline-none transition-colors ${
                  errors.password || errors.general
                    ? "border-red-accent focus:border-red-accent"
                    : "border-gray-3 focus:border-primary"
                }`}
              />
            </div>

            {errors.general && (
              <p className="text-red-accent text-sm">{errors.general}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white font-semibold text-base py-3 rounded hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting && <LoadingSpinner size="sm" className="text-white" />}
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-3">
            Don't have an account?{" "}
            <button
              onClick={onSwitchToSignUp}
              className="text-primary font-semibold hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignInModal;

