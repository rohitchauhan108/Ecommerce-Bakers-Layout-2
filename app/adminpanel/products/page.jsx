"use client";

import { useMemo, useState } from "react";
import { products } from "@/lib/products";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Link from "next/link";

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return products.slice(start, start + itemsPerPage);
  }, [currentPage]);

  const getVisiblePages = () => {
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, idx) => start + idx);
  };
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Product Inventory
            </h3>
            <p className="text-sm text-slate-500">
              Showing all products with pagination and images.
            </p>
          </div>
          <div>
            <Link href="/adminpanel/products/addproduct">
              <button className="bg-[#c85b24] text-white px-3 py-1 rounded-lg cursor-pointer">
                Add New Product
              </button>
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
                <th className="px-3 py-3">Product</th>
                <th className="px-3 py-3">Category</th>
                <th className="px-3 py-3">Price</th>
                <th className="px-3 py-3 text-center">Edit</th>
                <th className="px-3 py-3 text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b last:border-b-0 transition-colors hover:bg-slate-50"
                >
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name || product.title}
                        className="h-14 w-14 rounded-xl object-cover border border-slate-200"
                      />
                      <div>
                        <div className="font-semibold text-slate-900">
                          {product.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-slate-600">
                    {product.category}
                  </td>
                  <td className="px-3 py-4 font-semibold text-slate-900">
                    ₹{product.price}
                  </td>
                  <td className="px-3 py-4 text-center">
                    <button
                      type="button"
                      title="Edit Product"
                      className="inline-flex items-center justify-center rounded-lg p-2 text-emerald-600 transition hover:bg-emerald-100 hover:text-emerald-700 cursor-pointer"
                    >
                      <BiEdit className="h-5 w-5" />
                    </button>
                  </td>
                  <td className="px-3 py-4 text-center">
                    <button
                      type="button"
                      title="Delete Product"
                      className="inline-flex items-center justify-center rounded-lg p-2 text-rose-600 transition hover:bg-rose-100 hover:text-rose-700 cursor-pointer"
                      onClick={() => setIsDeleteOpen(true)}
                    >
                      <MdDelete className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-sm text-slate-600 font-semibold mt-6">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span>Showing</span>
            <span className="font-semibold text-slate-900">
              {currentProducts.length}
            </span>
            <span>products on this page</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
              disabled={currentPage === 1}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold transition cursor-pointer hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            {getVisiblePages().map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`rounded-xl px-3 py-2 text-sm font-semibold transition cursor-pointer ${
                  page === currentPage
                    ? "bg-[#c85b24] text-white"
                    : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((page) => Math.min(page + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold transition cursor-pointer hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* all button logics */}

      {isDeleteOpen && (
        <>
          {/* Full-screen Backdrop & Modal Wrapper */}
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
            onClick={() => setIsDeleteOpen(false)} // Closes modal when clicking backdrop
          >
            {/* Modal Card */}
            <div
              className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center shadow-2xl transition-all"
              onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside modal
            >
              {/* Danger/Warning Icon */}
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
                <svg
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>

              {/* Heading & Subtext */}
              <h3 className="text-lg font-bold text-slate-900">
                Do you really want to delete the product?
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                This action cannot be undone. All data associated with this
                product will be permanently removed.
              </p>

              {/* Buttons */}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsDeleteOpen(false)}
                  className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 shadow-sm transition-colors cursor-not-allowed"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
