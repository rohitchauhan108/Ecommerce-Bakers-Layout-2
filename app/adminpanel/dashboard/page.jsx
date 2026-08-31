"use client";

import { useState } from "react";

const summaryCards = [
  { title: "Total Products", value: "128", subtitle: "Active inventory items" },
  { title: "Pending Orders", value: "24", subtitle: "Need fulfillment" },
  { title: "Customers", value: "540", subtitle: "Registered shoppers" },
];

export default function DashboardPage() {
  const [orders] = useState([
    { id: "ORD-101", customer: "Anuj Kaundal", amount: 1200, status: "Processing" },
    { id: "ORD-102", customer: "Priya Sharma", amount: 850, status: "Completed" },
    { id: "ORD-103", customer: "Rohit Mehra", amount: 1500, status: "Pending" },
  ]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {summaryCards.map((card) => (
          <div key={card.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">{card.title}</p>
            <h3 className="mt-2 text-3xl font-bold text-slate-900">{card.value}</h3>
            <p className="mt-1 text-sm text-slate-500">{card.subtitle}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
            <p className="text-sm text-slate-500">Latest customer orders and actions.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
                <th className="px-3 py-3">Order ID</th>
                <th className="px-3 py-3">Customer</th>
                <th className="px-3 py-3">Amount</th>
                <th className="px-3 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b last:border-b-0">
                  <td className="px-3 py-3 font-medium text-slate-800">{order.id}</td>
                  <td className="px-3 py-3 text-slate-600">{order.customer}</td>
                  <td className="px-3 py-3 text-slate-600">₹{order.amount}</td>
                  <td className="px-3 py-3 text-slate-600">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

