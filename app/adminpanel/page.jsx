"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// Import static products array (aliased as importedProducts to avoid shadowing state)
import { products as importedProducts } from "@/lib/products";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    router.replace("/adminpanel/dashboard");
  }, [router]);

  // Dynamic Products State
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination State (10 items per page)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Load products on mount
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        // Fallback to static data if importedProducts is undefined
        const data =
          importedProducts ||
          [
            // {
            //   id: 1,
            //   title: "Ajwain Biscuits (250 Grams)",
            //   category: "Electronics",
            //   price: 199.99,
            //   stock: 45,
            // },
            // {
            //   id: 2,
            //   title: "Ergonomic Chair",
            //   category: "Furniture",
            //   price: 299.0,
            //   stock: 8,
            // },
            // {
            //   id: 3,
            //   title: "Mechanical Keyboard",
            //   category: "Electronics",
            //   price: 89.5,
            //   stock: 0,
            // },
          ];
        setProducts(data);
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [orders, setOrders] = useState(ordersData);
  const [customers, setCustomers] = useState(customerdata);
  const totalCategories = new Set(
  products.map((item) => item.category)
).size;
  const [newProduct, setNewProduct] = useState({
    title: "",
    category: "",
    price: "",
    stock: "",
  });

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.title || !newProduct.price) return;

    const stockNum = parseInt(newProduct.stock) || 0;

    const addedItem = {
      id: Date.now(),
      title: newProduct.title,
      category: newProduct.category || "General",
      price: parseFloat(newProduct.price),
      stock: stockNum,
    };

    setProducts([addedItem, ...products]);
    setNewProduct({ title: "", category: "", price: "", stock: "" });
    setIsAddModalOpen(false);
    setCurrentPage(1);
  };

  // Pagination Logic
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getPageNumbers = () => {
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  // Navigation Items
  const navItems = [
    {
      name: "Dashboard",
      icon: (
        <svg
          className="h-5 w-5 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      ),
    },
    {
      name: "Products",
      icon: (
        <svg
          className="h-5 w-5 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
    },
    {
      name: "Order",
      icon: (
        <svg
          className="h-5 w-5 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      ),
    },
    {
      name: "Customers",
      icon: (
        <svg
          className="h-5 w-5 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
  ];

  // Dummy Customer Data
  const customerdata = [
    {
      name: "Anuj Kaundal",
      email: "anujkaundal@gmail.com",
      phone: "123456789",
      joined: "Oct 12, 2025",
    },
    {
      name: "Priya Sharma",
      email: "priya.sharma@gmail.com",
      phone: "987654321",
      joined: "Nov 04, 2025",
    },
    {
      name: "Rahul Verma",
      email: "rahul.verma@gmail.com",
      phone: "12384599",
      joined: "Dec 19, 2025",
    },
    {
      name: "Sneha Kapoor",
      email: "sneha.kapoor@gmail.com",
      phone: "654789321",
      joined: "Jan 02, 2026",
    },
    {
      name: "Amit Singh",
      email: "amit.singh@gmail.com",
      phone: "375951456",
      joined: "Feb 15, 2026",
    },
  ];

  // Dummy Orders Data
  const [ordersData, setOrdersData] = useState([
    {
      id: "ORD-101",
      customerName: "Anuj Kaundal",
      phone: "123456789",
      productName: "Wireless Headphones",
      amount: "$120.00",
      status: "Processing",
    },
    {
      id: "ORD-102",
      customerName: "Priya Sharma",
      phone: "987654321",
      productName: "Mechanical Keyboard",
      amount: "$85.00",
      status: "Completed",
    },
  ]);

  // Handler to update status dynamically
  const handleStatusChange = (id, newStatus) => {
    setOrdersData((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order,
      ),
    );
  };

  // Handler for delete
  const handleDelete = (id) => {
    setOrdersData((prevOrders) =>
      prevOrders.filter((order) => order.id !== id),
    );
  };

  // Handler for edit action
  const handleEdit = (order) => {
    console.log("Edit order:", order);
    // Open modal or populate form state here
  };
  const handleLogout = () => {
    alert("Logged out successfully");
  };

  return (
    <div className="min-h-screen bg-slate-100/70 font-sans text-slate-800 flex flex-col">
      {/* Dynamic Header with Integrated Admin Info */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md px-4 sm:px-8 py-3.5 shadow-2xs transition-all">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Left Side: Sidebar Toggle & Header Text */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-[#c85b24] cursor-pointer transition-colors focus:ring-2 focus:ring-slate-200"
              title="Toggle Navigation Bar"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-[#c85b24]">
                  Admin Dashboard
                </h1>
                <span className="inline-flex items-center rounded-md bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700 ring-1 ring-amber-600/20 ring-inset">
                  v2.4
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">
                Manage your platform settings, view recent activity, and monitor
                performance metrics.
              </p>
            </div>
          </div>

          {/* Right Side: Admin Info Card Embedded directly in Top Banner */}
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200/80">
            <div className="relative group flex items-center gap-3">
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c85b24] text-white font-bold text-sm shadow-sm ring-2 ring-amber-500/20">
                  AD
                </div>
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
              </div>

              <div className="hidden sm:flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-[#c85b24] leading-none">
                    Admin User
                  </span>
                 <span className="text-xs text-black mt-1">
                  admin@platform.com
                </span>
                </div>
              </div>
            </div>

            {/* Header Quick Actions */}
            <button
              onClick={handleLogout}
              className="ml-2 p-2 rounded-lg text-slate-400 hover:text-red-600 cursor-pointer hover:bg-red-50 transition-colors"
              title="Logout"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main App Container */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? "w-60" : "w-18"
          } transition-all duration-300 ease-in-out border-r border-slate-200/80 bg-white p-3.5 shadow-xs flex flex-col justify-between shrink-0`}
        >
          <div className="space-y-4">
            <div
              className={`px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 ${
                !isSidebarOpen && "hidden"
              }`}
            >
              Navigation Menu
            </div>

            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveTab(item.name)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#c85b24] text-white shadow-md shadow-slate-900/10"
                        : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                    } ${!isSidebarOpen && "justify-center px-0"}`}
                    title={!isSidebarOpen ? item.name : undefined}
                  >
                    <span
                      className={
                        isActive
                          ? "text-amber-400"
                          : "text-slate-400 group-hover:text-slate-600"
                      }
                    >
                      {item.icon}
                    </span>
                    {isSidebarOpen && <span>{item.name}</span>}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick System Status Footer */}
          {isSidebarOpen && (
            <div className="rounded-xl bg-slate-50 border border-slate-200/60 p-3 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>System Status</span>
                <span className="font-semibold text-emerald-600">Optimal</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[92%]" />
              </div>
            </div>
          )}
        </aside>

        {/* Dynamic Main Workspace */}
        <main className="flex-1 p-4 sm:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === "Dashboard" && (
            <div className="space-y-6">
              {/* Top Banner Actions */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-black">
                    Dashboard Overview
                  </h2>
                  <p className="text-xs text-slate-500">
                    Here is what is happening across your platform today.
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 w-full">
                {/* Card 1: Total Products */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Total Products
                    </span>
                    <span className="p-2 bg-amber-50 rounded-lg text-[#c85b24]">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="mt-2 text-3xl font-extrabold text-slate-900">
                    {loading ? "..." : products.length}
                  </div>
                </div>

                {/* Card 2: Total Orders */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Total Orders
                    </span>
                    <span className="p-2 bg-blue-50 rounded-lg text-[#c85b24]">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="mt-2 text-3xl font-extrabold text-slate-900">
                    {ordersData.length}
                  </div>
                </div>

                {/* Card 3: Total Customers */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Total Customers
                    </span>
                    <span className="p-2 bg-indigo-50 rounded-lg text-[#c85b24]">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="mt-2 text-3xl font-extrabold text-slate-900">
                    {customerdata.length}
                  </div>
                </div>
              </div>
              {/* Card 4: Total Categories */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Total Categories
                  </span>
                  <span className="p-2 bg-purple-50 rounded-lg text-[#c85b24]">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                      />
                    </svg>
                  </span>
                </div>
                <div className="mt-2 text-3xl font-extrabold text-slate-900">
                  8
                </div>
              </div>

              {/* Activity / Orders Table Preview */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-slate-900">Recent Orders</h3>
                  <button
                    onClick={() => setActiveTab("Order")}
                    className="text-xs font-semibold text-amber-800 hover:underline"
                  >
                    View All →
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-xs font-bold text-slate-400 uppercase">
                      <tr>
                        <th className="py-3 px-4">Order ID</th>
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {ordersData.map((order) => (
                        <tr
                          key={order.id}
                          className="hover:bg-slate-50/50 transition-colors"
                        >
                          {/* Customer Name + Avatar */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full bg-[#c85b24] text-white font-bold text-xs flex items-center justify-center shrink-0">
                                {order.customerName
                                  ? order.customerName.charAt(0).toUpperCase()
                                  : "U"}
                              </div>
                              <span className="font-semibold text-slate-800">
                                {order.customerName}
                              </span>
                            </div>
                          </td>

                          {/* Phone Number */}
                          <td className="py-3.5 px-4 text-slate-600 font-medium">
                            {order.phone}
                          </td>

                          {/* Product Name */}
                          <td className="py-3.5 px-4 text-slate-700 font-medium">
                            {order.productName}
                          </td>

                          {/* Price */}
                          <td className="py-3.5 px-4 font-semibold text-slate-900">
                            {order.amount}
                          </td>

                          {/* Editable Status dropdown */}
                          <td className="py-3.5 px-4">
                            <select
                              value={order.status}
                              onChange={(e) =>
                                handleStatusChange(order.id, e.target.value)
                              }
                              className={`px-2.5 py-1 rounded-full text-xs font-semibold border cursor-pointer outline-none transition-colors ${
                                order.status === "Completed"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                  : order.status === "Processing"
                                    ? "bg-blue-50 text-blue-700 border-blue-200"
                                    : "bg-slate-100 text-slate-700 border-slate-200"
                              }`}
                            >
                              <option
                                value="Processing"
                                className="bg-white text-slate-800"
                              >
                                Processing
                              </option>
                              <option
                                value="Completed"
                                className="bg-white text-slate-800"
                              >
                                Completed
                              </option>
                            </select>
                          </td>

                          {/* Actions (Edit / Delete) */}
                          <td className="py-3.5 px-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleDelete(order.id)}
                                className="px-2.5 py-1 text-xs font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS VIEW */}
          {activeTab === "Products" && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-lg font-bold text-black">
                    Products Directory
                  </h3>
                  <p className="text-xs text-slate-500">
                    Showing {products.length > 0 ? indexOfFirstProduct + 1 : 0}-
                    {Math.min(indexOfLastProduct, products.length)} of{" "}
                    {products.length} products
                  </p>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs"
                >
                  + Add New Product
                </button>
              </div>

              {loading ? (
                <div className="py-12 text-center text-slate-400">
                  Loading products database...
                </div>
              ) : error ? (
                <div className="py-12 text-center text-red-500 font-medium">
                  {error}
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto rounded-xl border border-slate-100">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                        <tr>
                          <th className="py-3.5 px-4">Title</th>
                          <th className="py-3.5 px-4">Category</th>
                          <th className="py-3.5 px-4">Price</th>
                          <th className="py-3.5 px-4">Stock</th>
                          <th className="py-3.5 px-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {currentProducts.map((item) => (
                          <tr
                            key={item.id}
                            className="hover:bg-slate-50/80 transition-colors"
                          >
                            <td className="py-3.5 px-4 font-semibold text-slate-900">
                              {item.title || item.name}
                            </td>
                            <td className="py-3.5 px-4 text-slate-500 capitalize">
                              {item.category}
                            </td>
                            <td className="py-3.5 px-4 font-semibold text-slate-900">
                              ${item.price}
                            </td>
                            <td className="py-3.5 px-4 text-slate-600">
                              {item.stock ?? "N/A"}
                            </td>
                            <td className="py-3.5 px-4">
                              <span
                                className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                  (item.stock ?? 1) > 10
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : (item.stock ?? 1) > 0
                                      ? "bg-amber-50 text-amber-700 border border-amber-200"
                                      : "bg-red-50 text-red-700 border border-red-200"
                                }`}
                              >
                                {(item.stock ?? 1) > 10
                                  ? "In Stock"
                                  : (item.stock ?? 1) > 0
                                    ? "Low Stock"
                                    : "Out of Stock"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination Controls */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="px-3 py-1.5 text-xs font-semibold border border-slate-200 rounded-lg disabled:opacity-40 hover:bg-slate-50 text-black transition-colors"
                    >
                      Previous
                    </button>

                    <div className="flex gap-1 items-center">
                      {getPageNumbers().map((number) => (
                        <button
                          key={number}
                          onClick={() => handlePageChange(number)}
                          className={`h-7 w-7 text-xs font-bold rounded-lg  cursor-pointer transition-colors ${
                            currentPage === number
                              ? "bg-[#c85b24] text-white"
                              : "text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          {number}
                        </button>
                      ))}
                    </div>

                    <button
                      disabled={currentPage === totalPages || totalPages === 0}
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="px-3 py-1.5 text-xs font-semibold border border-slate-200 rounded-lg disabled:opacity-40 hover:bg-slate-50 text-slate-700 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* TAB 3: ORDERS VIEW */}
          {activeTab === "Order" && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-black">
                  Orders Management
                </h3>
                <p className="text-xs text-slate-500">
                  Track and manage recent customer orders.
                </p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-100 bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50/80 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Customer Name</th>
                      <th className="py-3.5 px-4">Phone Number</th>
                      <th className="py-3.5 px-4">Product Name</th>
                      <th className="py-3.5 px-4">Price</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {ordersData.map((order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-slate-50/50 transition-colors"
                      >
                        {/* Customer Name + Avatar */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-[#c85b24] text-white font-bold text-xs flex items-center justify-center shrink-0">
                              {order.customerName
                                ? order.customerName.charAt(0).toUpperCase()
                                : "U"}
                            </div>
                            <span className="font-semibold text-slate-800">
                              {order.customerName}
                            </span>
                          </div>
                        </td>

                        {/* Phone Number */}
                        <td className="py-3.5 px-4 text-slate-600 font-medium">
                          {order.phone}
                        </td>

                        {/* Product Name */}
                        <td className="py-3.5 px-4 text-slate-700 font-medium">
                          {order.productName}
                        </td>

                        {/* Price */}
                        <td className="py-3.5 px-4 font-semibold text-slate-900">
                          {order.amount}
                        </td>

                        {/* Editable Status dropdown */}
                        <td className="py-3.5 px-4">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(order.id, e.target.value)
                            }
                            className={`px-2.5 py-1 rounded-full text-xs font-semibold border cursor-pointer outline-none transition-colors ${
                              order.status === "Completed"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : order.status === "Processing"
                                  ? "bg-blue-50 text-blue-700 border-blue-200"
                                  : "bg-slate-100 text-slate-700 border-slate-200"
                            }`}
                          >
                            <option
                              value="Processing"
                              className="bg-white text-slate-800"
                            >
                              Processing
                            </option>
                            <option
                              value="Completed"
                              className="bg-white text-slate-800"
                            >
                              Completed
                            </option>
                          </select>
                        </td>

                        {/* Actions (Edit / Delete) */}
                        <td className="py-3.5 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleDelete(order.id)}
                              className="px-2.5 py-1 text-xs font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: CUSTOMERS VIEW */}
          {activeTab === "Customers" && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Customers Directory
                  </h3>
                  <p className="text-xs text-slate-500">
                    Manage active customer accounts and access details.
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/80 w-fit">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-semibold text-slate-700">
                    {customerdata.length} Registered Accounts
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-100 bg-white">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="py-3.5 px-6">Customer Name</th>
                      <th className="py-3.5 px-6">Phone Number</th>
                      <th className="py-3.5 px-6">Email Address</th>
                      <th className="py-3.5 px-6 text-right">
                        Registration Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {customerdata.map((item, index) => (
                      <tr
                        key={item.email || index}
                        className="hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-[#c85b24] text-white font-bold text-xs flex items-center justify-center shrink-0">
                              {item.name
                                ? item.name.charAt(0).toUpperCase()
                                : "U"}
                            </div>
                            <span className="font-semibold text-slate-800">
                              {item.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-slate-600 font-medium">
                          {item.phone}
                        </td>
                        <td className="py-4 px-6 text-slate-600 font-medium">
                          {item.email}
                        </td>
                        <td className="py-4 px-6 text-slate-500 text-xs text-right font-medium">
                          {item.joined}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modernized Modal Component */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 z-50">
          <div className="bg-white w-full max-w-2xl rounded-2xl p-6 shadow-2xl space-y-5 border border-slate-100">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">
                Add New Product
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Product Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  required
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c85b24] transition-all file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-[#c85b24] file:text-white file:rounded-lg file:cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
                  placeholder="Enter Your Product Name"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Product description
                </label>
                <input
                  type="text"
                  required
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
                  placeholder="Enter Your Product Discription"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  required
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
                  placeholder="Category"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    className="w-full border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
                    placeholder="99.99"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Stock Units
                  </label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, stock: e.target.value })
                    }
                    className="w-full border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
                    placeholder="10"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Features Images
                </label>

                <input
                  type="file"
                  accept="image/*"
                  required
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-[#c85b24] file:text-white file:rounded-lg file:cursor-pointer"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-[#c85b24] hover:bg-black text-white rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
