"use client";

import React from "react";
import { EnquiryForm } from "@/components/enquiry/EnquiryForm";

export default function EnquiryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
        <p className="text-gray-600 text-center mb-8">
          Have questions? We'd love to hear from you. Send us an enquiry and we'll respond as soon as possible.
        </p>
        <EnquiryForm />
      </div>
    </div>
  );
}
