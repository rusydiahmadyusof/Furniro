"use client";

import { useState } from "react";
import { useToast } from "./ToastProvider";
import LoadingSpinner from "./LoadingSpinner";

const ContactForm = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      showToast("Please fill in all required fields correctly", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle validation errors from server
        if (data.errors) {
          setErrors(data.errors);
          showToast(
            data.message || "Please fix the errors in the form",
            "error"
          );
        } else {
          showToast(
            data.message || "Failed to send message. Please try again later.",
            "error"
          );
        }
        return;
      }

      // Success
      showToast(
        data.message || "Message sent successfully! We'll get back to you soon.",
        "success"
      );
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch (error) {
      console.error("Error submitting contact form:", error);
      showToast(
        "Network error. Please check your connection and try again.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm">
      <div className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block font-medium text-base text-black mb-2"
          >
            Your name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Abc"
            className={`w-full h-[75px] px-4 border rounded-[10px] focus:outline-none transition-colors placeholder:text-gray-3 ${
              errors.name ? "border-red-accent focus:border-red-accent" : "border-gray-3 focus:border-primary"
            }`}
          />
          {errors.name && (
            <p className="text-red-accent text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block font-medium text-base text-black mb-2"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Abc@def.com"
            className={`w-full h-[75px] px-4 border rounded-[10px] focus:outline-none transition-colors placeholder:text-gray-3 ${
              errors.email ? "border-red-accent focus:border-red-accent" : "border-gray-3 focus:border-primary"
            }`}
          />
          {errors.email && (
            <p className="text-red-accent text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block font-medium text-base text-black mb-2"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="This is an optional"
            className="w-full h-[75px] px-4 border border-gray-3 rounded-[10px] focus:outline-none focus:border-primary transition-colors placeholder:text-gray-3"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block font-medium text-base text-black mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Hi! i'd like to ask about"
            rows={5}
            className={`w-full min-h-[120px] px-4 py-4 border rounded-[10px] focus:outline-none transition-colors resize-none placeholder:text-gray-3 ${
              errors.message ? "border-red-accent focus:border-red-accent" : "border-gray-3 focus:border-primary"
            }`}
          />
          {errors.message && (
            <p className="text-red-accent text-sm mt-1">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary text-white font-semibold text-base px-12 py-3 rounded hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting && <LoadingSpinner size="sm" className="text-white" />}
          {isSubmitting ? "Sending..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;

