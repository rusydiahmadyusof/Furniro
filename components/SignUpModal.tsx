"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "./ToastProvider";
import LoadingSpinner from "./LoadingSpinner";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignIn: () => void;
}

const SignUpModal = ({ isOpen, onClose, onSwitchToSignIn }: SignUpModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { signUp, signInWithGoogle } = useAuth();
  const { showToast } = useToast();

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      showToast("Please fill in all fields correctly", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      await signUp(name, email, password);
      showToast("Account created successfully! Welcome!", "success");
      onClose();
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setErrors({});
    } catch (error: any) {
      const errorMessage = error.message || "Failed to create account. Please try again.";
      showToast(errorMessage, "error");
      setErrors({ general: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true);
    setErrors({});
    try {
      await signInWithGoogle();
      onClose();
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setErrors({});
    } catch (error: any) {
      const errorMessage = error.message || "Failed to sign up with Google. Please try again.";
      showToast(errorMessage, "error");
      setErrors({ general: errorMessage });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    if (field === "name") setName(value);
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
    if (field === "confirmPassword") setConfirmPassword(value);
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
          className="bg-white rounded-lg max-w-md w-full p-8 relative shadow-xl max-h-[90vh] overflow-y-auto"
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

          <h2 className="text-3xl font-semibold text-black mb-2">Sign Up</h2>
          <p className="text-gray-3 text-sm mb-6">Create an account to get started.</p>

          <button
            type="button"
            onClick={handleGoogleSignUp}
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
            {isGoogleLoading ? "Signing up..." : "Continue with Google"}
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
                htmlFor="signup-name"
                className="block font-medium text-base text-black mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="signup-name"
                value={name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
                placeholder="Enter your full name"
                className={`w-full h-[50px] px-4 border rounded-[10px] focus:outline-none transition-colors ${
                  errors.name
                    ? "border-red-accent focus:border-red-accent"
                    : "border-gray-3 focus:border-primary"
                }`}
              />
              {errors.name && (
                <p className="text-red-accent text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="signup-email"
                className="block font-medium text-base text-black mb-2"
              >
                Email address
              </label>
              <input
                type="email"
                id="signup-email"
                value={email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
                placeholder="Enter your email"
                className={`w-full h-[50px] px-4 border rounded-[10px] focus:outline-none transition-colors ${
                  errors.email
                    ? "border-red-accent focus:border-red-accent"
                    : "border-gray-3 focus:border-primary"
                }`}
              />
              {errors.email && (
                <p className="text-red-accent text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="signup-password"
                className="block font-medium text-base text-black mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="signup-password"
                value={password}
                onChange={(e) => handleChange("password", e.target.value)}
                required
                placeholder="Create a password (min. 6 characters)"
                className={`w-full h-[50px] px-4 border rounded-[10px] focus:outline-none transition-colors ${
                  errors.password
                    ? "border-red-accent focus:border-red-accent"
                    : "border-gray-3 focus:border-primary"
                }`}
              />
              {errors.password && (
                <p className="text-red-accent text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="signup-confirm-password"
                className="block font-medium text-base text-black mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="signup-confirm-password"
                value={confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                required
                placeholder="Confirm your password"
                className={`w-full h-[50px] px-4 border rounded-[10px] focus:outline-none transition-colors ${
                  errors.confirmPassword
                    ? "border-red-accent focus:border-red-accent"
                    : "border-gray-3 focus:border-primary"
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-accent text-sm mt-1">{errors.confirmPassword}</p>
              )}
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
              {isSubmitting ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-3">
            Already have an account?{" "}
            <button
              onClick={onSwitchToSignIn}
              className="text-primary font-semibold hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpModal;

