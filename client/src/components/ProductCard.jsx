import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext.jsx';

export const ProductCard = ({ product, onOpen }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      className="rounded-3xl bg-white shadow-sm border border-pink-50 overflow-hidden flex flex-col"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      whileHover={{
        scale: 1.03,
        y: -4,
        boxShadow: '0 20px 30px rgba(244, 114, 182, 0.18)'
      }}
    >
      <button onClick={onOpen} className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-44 w-full object-cover"
          loading="lazy"
        />
        <span className="absolute left-2 top-2 bg-white/80 text-[11px] px-2 py-1 rounded-full">
          ⭐ {product.rating}
        </span>
      </button>
      <div className="p-4 flex flex-col flex-1">
        <button onClick={onOpen} className="text-sm font-semibold text-slate-800 text-left">
          {product.name}
        </button>
        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-bold text-primary text-lg">₹{product.price}</span>
          <motion.button
            onClick={() => addToCart(product, 1)}
            whileTap={{ scale: 0.96 }}
            className="text-xs px-3 py-1.5 rounded-full bg-primary text-white hover:bg-pink-500"
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};


