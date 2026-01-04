"use client";

import React, { useState } from "react";
import { enquiryService, EnquiryRequest } from "@/services/enquiryService";
import { extractErrorMessage, extractFieldErrors } from "@/config/apiClient";

interface EnquiryFormProps {
  productId?: string;
  onSuccess?: () => void;
}

// Validation helpers
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^[+]?[0-9\-\s()]{7,20}$/;

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({ productId, onSuccess }) => {
  const [formData, setFormData] = useState<EnquiryRequest>({
    name: "",
    email: "",
    phone: "",
    message: "",
    productId,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [success, setSuccess] = useState(false);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 2) return "Name must be at least 2 characters";
        if (value.trim().length > 100) return "Name must be less than 100 characters";
        return undefined;
      case "email":
        if (!value.trim()) return "Email is required";
        if (!EMAIL_REGEX.test(value.trim())) return "Please enter a valid email address";
        return undefined;
      case "phone":
        if (!value.trim()) return "Phone number is required";
        if (!PHONE_REGEX.test(value.trim())) return "Please enter a valid phone number";
        return undefined;
      case "message":
        if (!value.trim()) return "Message is required";
        if (value.trim().length < 10) return "Message must be at least 10 characters";
        if (value.trim().length > 5000) return "Message must be less than 5000 characters";
        return undefined;
      default:
        return undefined;
    }
  };

  const validateForm = (): boolean => {
    const errors: FieldErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      phone: validateField("phone", formData.phone),
      message: validateField("message", formData.message),
    };
    
    setFieldErrors(errors);
    return !Object.values(errors).some(error => error !== undefined);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear field error on change
    if (fieldErrors[name as keyof FieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    // Clear general error
    if (error) setError("");
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const fieldError = validateField(name, value);
    setFieldErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      setError("Please fix the errors below before submitting.");
      return;
    }
    
    setIsLoading(true);
    setError("");

    try {
      await enquiryService.submitEnquiry(formData);
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "", productId });
      setFieldErrors({});
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      // Extract field-specific errors from backend
      const backendFieldErrors = extractFieldErrors(err);
      if (backendFieldErrors) {
        setFieldErrors(backendFieldErrors as FieldErrors);
      }
      setError(extractErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-2xl font-bold text-green-600 mb-2">Thank You!</h3>
        <p className="text-gray-600 mb-6">
          Your enquiry has been submitted successfully. We'll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Send Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <div>
            <p className="font-medium">Something went wrong</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="John Doe"
            maxLength={100}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition ${
              fieldErrors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {fieldErrors.name && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors.name}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="john@example.com"
            maxLength={100}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition ${
              fieldErrors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {fieldErrors.email && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="+1 (555) 123-4567"
            maxLength={20}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition ${
              fieldErrors.phone ? "border-red-500" : "border-gray-300"
            }`}
          />
          {fieldErrors.phone && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors.phone}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <select
            name="subject"
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition"
          >
            <option value="general">General Enquiry</option>
            <option value="product">Product Information</option>
            <option value="order">Order Status</option>
            <option value="support">Technical Support</option>
            <option value="feedback">Feedback</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={5}
          maxLength={5000}
          placeholder="Please describe your enquiry in detail (minimum 10 characters)..."
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition resize-none ${
            fieldErrors.message ? "border-red-500" : "border-gray-300"
          }`}
        />
        <div className="flex justify-between items-center mt-1">
          {fieldErrors.message ? (
            <p className="text-red-500 text-sm">{fieldErrors.message}</p>
          ) : (
            <span></span>
          )}
          <p className={`text-sm ${formData.message.length > 4500 ? "text-yellow-600" : "text-gray-500"}`}>
            {formData.message.length}/5000 characters
          </p>
        </div>
      </div>

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="privacy"
          required
          className="mt-1 h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
        />
        <label htmlFor="privacy" className="text-sm text-gray-600">
          I agree to the{" "}
          <a href="#" className="text-secondary hover:underline">
            Privacy Policy
          </a>{" "}
          and consent to being contacted regarding my enquiry.
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-secondary text-white py-4 rounded-lg font-bold hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Sending...</span>
          </>
        ) : (
          <>
            <span>Send Message</span>
            <span>→</span>
          </>
        )}
      </button>

      <p className="text-center text-sm text-gray-500">
        We typically respond within 24 hours
      </p>
    </form>
  );
};
