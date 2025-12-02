import React from 'react';
import { ProductCard } from './ProductCard.jsx';

export const ProductGrid = ({ products, onSelect }) => {
  return (
    <section className="max-w-5xl mx-auto px-4 mt-6 pb-10">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-slate-800">Featured Baby Products</h2>
        <p className="text-[11px] text-slate-500">{products.length} items</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} onOpen={() => onSelect(p)} />
        ))}
      </div>
    </section>
  );
};


