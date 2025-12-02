import React from 'react';
import { motion } from 'framer-motion';

const categories = [
  { key: null, label: 'All', emoji: '⭐', color: 'from-babyPink to-babyMint' },
  { key: 'Bath', label: 'Bath', emoji: '🛁', color: 'from-babyBlue to-babyMint' },
  { key: 'Toys', label: 'Toys', emoji: '🧸', color: 'from-babyYellow to-babyPink' },
  { key: 'Skincare', label: 'Skincare', emoji: '🧴', color: 'from-babyLavender to-babyPink' }
];

export const CategoryCards = ({ onFilter, activeFilter }) => {
  return (
    <section className="max-w-5xl mx-auto px-4 mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
      {categories.map((cat) => {
        const isActive = activeFilter === cat.key || (cat.key === null && !activeFilter);
        return (
          <motion.button
            key={cat.label}
            whileHover={{ y: -4 }}
            className={`rounded-3xl bg-gradient-to-br ${cat.color} p-[1px] shadow-md ${
              isActive ? 'ring-2 ring-primary/60' : ''
            }`}
            onClick={() => onFilter(cat.key)}
          >
            <div className="rounded-3xl bg-white/80 p-3 flex flex-col items-start h-full">
              <span className="text-2xl">{cat.emoji}</span>
              <span className="mt-1 font-semibold text-sm text-slate-800">{cat.label}</span>
              <span className="text-[11px] text-slate-500 mt-1">
                {cat.key ? `Explore ${cat.label.toLowerCase()} essentials.` : 'Show all products.'}
              </span>
            </div>
          </motion.button>
        );
      })}
    </section>
  );
};


