"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Hook to handle navigation

export default function AddProduct() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    productImage: null,
    featureImages: [],
  });

  // Redirect back to the previous page on cancel/close
  const handleClose = () => {
    router.back(); // Redirects to previous URL
  };

  // Handle Text/Select Inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Main Product Image
  const handleSingleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, productImage: e.target.files[0] }));
    }
  };

  // Handle Multiple Feature Images
  const handleMultipleImagesChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFormData((prev) => ({
        ...prev,
        featureImages: [...prev.featureImages, ...filesArray],
      }));
    }
  };

  // Remove Selected Feature Image
  const removeFeatureImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      featureImages: prev.featureImages.filter((_, i) => i !== index),
    }));
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Product Data:", formData);

    // After submitting, redirect back to products list
    router.back();
  };

  return (
    /* Full-Screen Modal Overlay (Always visible on page load) */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={handleClose}
    >
      {/* Modal Container */}
      <div
        className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Add New Product
            </h2>
            <p className="text-xs text-slate-500">
              Fill in the details below to create a product entry.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form Body (Scrollable) */}
        <form
          onSubmit={handleSubmit}
          className="mt-4 overflow-y-auto pr-1 space-y-4 flex-1"
        >
          {/* Main Product Image Upload */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Primary Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleSingleImageChange}
              className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-[#c85b24] hover:file:bg-indigo-100 cursor-pointer"
            />
            {formData.productImage && (
              <p className="mt-1 text-xs text-slate-500">
                Selected:{" "}
                <span className="font-medium text-slate-700">
                  {formData.productImage.name}
                </span>
              </p>
            )}
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g. Wireless Noise-Canceling Headphones"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-[#c85b24] focus:outline-none focus:ring-1 focus:ring-[#c85b24]"
            />
          </div>

          {/* Category & Price (Grid Row) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Category *
              </label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-black focus:border-[#c85b24] focus:outline-none focus:ring-1 focus:ring-[#c85b24]"
              >
                <option value="" disabled>
                  Select category
                </option>
                <option value="rusks-toasts">Rusks & Toasts</option>
                <option value="tea-time-cakes">Tea Time Cakes</option>
                <option value="confections-stick-jaws">
                  Confections & Stick Jaws
                </option>
                <option value="gifting-hampers">Gifting Hampers</option>
                <option value="baklava">Baklava</option>
                <option value="pastries">Pastries</option>
                <option value="oven-fresh-breads">Oven Fresh Breads</option>
                <option value="savory-snacks">Savory Snacks</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Price *
              </label>
              <input
                type="number"
                name="price"
                step="0.01"
                required
                value={formData.price}
                onChange={handleInputChange}
                placeholder="99.99"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-[#c85b24] focus:outline-none focus:ring-1 focus:ring-[#c85b24]"
              />
            </div>
          </div>

          {/* Product Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Write a brief overview of the product..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-[#c85b24] focus:outline-none focus:ring-1 focus:ring-[#c85b24] resize-none"
            />
          </div>

          {/* Multiple Feature Images Upload */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Feature Images (Multiple)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleMultipleImagesChange}
              className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
            />

            {/* Selected Files List Preview */}
            {formData.featureImages.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.featureImages.map((file, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 rounded-md bg-slate-100 cursor-pointer px-2 py-1 text-xs text-slate-700 border border-slate-200"
                  >
                    <span className="max-w-[120px] truncate cursor-pointer">
                      {file.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFeatureImage(idx)}
                      className="text-slate-400 hover:text-[#c85b24] ml-1"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons Footer */}
          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg border cursor-pointer border-slate-300 px-4 py-2 text-sm font-semibold text-black hover:bg-[#c85b24] hover:text-white transition-all duration-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#c85b24] px-5 py-2 text-sm font-semibold text-white hover:bg-black shadow-sm transition-all duration-500 cursor-pointer"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
