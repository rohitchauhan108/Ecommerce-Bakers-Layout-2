'use client';

import { useState } from 'react';

const starterOrders = [
  { id: 'ORD-101', customer: 'Anuj Kaundal', amount: 1200, status: 'Completed' },
  { id: 'ORD-102', customer: 'Priya Sharma', amount: 850, status: 'Completed' },
  { id: 'ORD-103', customer: 'Rohit Mehra', amount: 1500, status: 'Completed' },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState(starterOrders);

  const updateStatus = (id, status) => {
    setOrders(orders.map((order) => (order.id === id ? { ...order, status } : order)));
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Recent Orders</h3>
          <p className="text-sm text-slate-500">Track customer orders and update their status.</p>
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
                <td className="px-3 py-3">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="rounded-lg border border-slate-300 px-2 py-1 text-sm"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
