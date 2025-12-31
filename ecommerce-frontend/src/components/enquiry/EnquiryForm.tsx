"use client";

import React, { useState } from "react";
import { enquiryService, Enquiry } from "@/services/enquiryService";

interface EnquiryFormProps {
  productId?: string;
  onSuccess?: () => void;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({ productId, onSuccess }) => {
  const [formData, setFormData] = useState<Enquiry>({
    name: "",
    email: "",
    phone: "",
    message: "",
    productId,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      await enquiryService.submitEnquiry(formData);
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "", productId });
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || "Failed to submit enquiry");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-primary">Send Enquiry</h2>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          Enquiry submitted successfully!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-secondary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-secondary"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Phone *</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-secondary"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Message *</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-secondary"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-secondary text-white py-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
      >
        {isLoading ? "Submitting..." : "Submit Enquiry"}
      </button>
    </form>
  );
};
