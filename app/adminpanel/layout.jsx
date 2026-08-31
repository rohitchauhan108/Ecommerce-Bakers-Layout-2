'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  {
    label: 'Dashboard',
    href: '/adminpanel/dashboard',
    description: 'Overview of performance, sales, and analytics.',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l9-9 9 9M5 10v10h4V10H5zm10 0v10h4V10h-4z" />
      </svg>
    ),
  },
  {
    label: 'Products',
    href: '/adminpanel/products',
    description: 'Manage your bakery items, inventory, and pricing.',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    label: 'Orders',
    href: '/adminpanel/orders',
    description: 'Track incoming customer orders and fulfillment status.',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
  },
  {
    label: 'Customers',
    href: '/adminpanel/customers',
    description: 'View customer accounts, purchase history, and details.',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
];

export default function AdminPanelLayout({ children }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Find matching nav item (handles exact matches & sub-routes like /adminpanel/products/123)
  const activeNavItem = navItems.find((item) => 
    pathname === item.href || pathname?.startsWith(`${item.href}/`)
  ) || navItems[0]; // Fallback to Dashboard object

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 px-4 py-3 shadow-sm backdrop-blur md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen((value) => !value)}
              className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 hover:text-[#c85b24]"
              aria-label="Toggle sidebar"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="text-lg font-bold text-[#c85b24]">{activeNavItem.label}</h1>
              <p className="text-xs text-slate-500">{activeNavItem.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c85b24] font-semibold text-white">
              AD
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-700">Admin User</p>
              <p className="text-xs text-slate-500">Super Admin</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <aside
          className={`border-r border-slate-200 bg-white p-3 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}
        >
          <div className="mb-4 px-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            {isSidebarOpen ? 'Navigation' : ''}
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                    isActive ? 'bg-[#c85b24] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  } ${!isSidebarOpen ? 'justify-center px-2' : ''}`}
                  title={isSidebarOpen ? undefined : item.label}
                >
                  <span className={isActive ? 'text-amber-200' : 'text-slate-400'}>{item.icon}</span>
                  {isSidebarOpen && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}