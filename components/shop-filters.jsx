'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'

const categories = [
  { id: 'all', label: 'All Categories' },
  { id: 'biscuit-and-confections', label: 'Biscuits & Cookies' },
  { id: 'rusk', label: 'Rusks & Toasts' },
  { id: 'tea-time-cake', label: 'Tea Time Cakes' },
  { id: 'confections-and-stick-jaws', label: 'Confections & Stick Jaws' },
  { id: 'gifts', label: 'Gifting Hampers', href: '/gifts' },
  { id: 'baklava', label: 'Baklava' },
  { id: 'pastries', label: 'Pastries' },
  { id: 'fresh-bread', label: 'Oven Fresh Breads' },
  { id: 'savory-snacks', label: 'Savory Snacks' },
]

export function ShopFilters({
  selectedCategory,
  onCategoryChange,
  isMobileOpen,
  onMobileClose,
  deliveryScope,
}) {
  const router = useRouter()

  const visibleCategories = deliveryScope === 'panIndia' 
    ? categories.filter(c => c.id !== 'tea-time-cake') 
    : categories

  const FilterContent = () => (
    <div className="space-y-8">
      <div className="space-y-2">
        {visibleCategories.map((cat) => (
          <div key={cat.id} className="relative">
            <button
              type="button"
              onClick={() => {
                if (cat.href) {
                  router.push(cat.href)
                  onMobileClose?.()
                } else {
                  // If 'all' is clicked, show all products
                  const newCat = cat.id === 'all' ? null : cat.id;
                  onCategoryChange(newCat);
                }
              }}
              className={`w-full text-left px-4 py-2.5 rounded-xl transition-colors ${
                (selectedCategory === cat.id || (cat.id === 'all' && !selectedCategory))
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-beige'
              }`}
            >
              {cat.label}
            </button>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <>
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-20 bg-card rounded-2xl p-6 shadow-sm max-h-[calc(100vh-6rem)] overflow-y-auto no-scrollbar">
          <FilterContent />
        </div>
      </aside>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 max-h-[80vh] bg-card rounded-t-3xl z-50 lg:hidden overflow-y-auto no-scrollbar"
            >
              <div className="p-6">
                <div className="flex justify-end mb-4">
                  <button type="button" onClick={onMobileClose} className="p-2 hover:bg-muted rounded-full">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <FilterContent />
                <button
                  type="button"
                  onClick={onMobileClose}
                  className="w-full mt-8 py-4 bg-primary text-primary-foreground font-medium rounded-2xl hover:bg-primary/90 transition-colors uppercase tracking-wide"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}