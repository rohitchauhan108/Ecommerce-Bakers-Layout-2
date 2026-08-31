'use client';

import { useState } from 'react';

const starterCustomers = [
  { id: 1, name: 'Anuj Kaundal', email: 'anuj@example.com', phone: '9876543210', joined: '2025-07-01' },
  { id: 2, name: 'Priya Sharma', email: 'priya@example.com', phone: '9123456780', joined: '2025-06-20' },
  { id: 3, name: 'Rohit Mehra', email: 'rohit@example.com', phone: '9988776655', joined: '2025-05-18' },
];

export default function CustomersPage() {
  const [customers] = useState(starterCustomers);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Customer List</h3>
        <p className="text-sm text-slate-500">Review recent signups and contact information.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
              <th className="px-3 py-3">Name</th>
              <th className="px-3 py-3">Email</th>
              <th className="px-3 py-3">Phone</th>
              <th className="px-3 py-3">Joined</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b last:border-b-0">
                <td className="px-3 py-3 font-medium text-slate-800">{customer.name}</td>
                <td className="px-3 py-3 text-slate-600">{customer.email}</td>
                <td className="px-3 py-3 text-slate-600">{customer.phone}</td>
                <td className="px-3 py-3 text-slate-600">{customer.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
