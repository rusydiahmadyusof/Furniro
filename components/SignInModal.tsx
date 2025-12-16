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
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { signIn, signInWithGoogle } = useAuth();
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

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setErrors({});
    try {
      await signInWithGoogle();
      onClose();
      setEmail("");
      setPassword("");
      setErrors({});
    } catch (error: any) {
      const errorMessage = error.message || "Failed to sign in with Google. Please try again.";
      showToast(errorMessage, "error");
      setErrors({ general: errorMessage });
    } finally {
      setIsGoogleLoading(false);
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

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading || isSubmitting}
            className="w-full border-2 border-gray-3 rounded-[10px] py-3 font-semibold text-base text-black hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mb-4"
          >
            {isGoogleLoading ? (
              <LoadingSpinner size="sm" />
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            {isGoogleLoading ? "Signing in..." : "Continue with Google"}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-3"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-3">Or</span>
            </div>
          </div>

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

