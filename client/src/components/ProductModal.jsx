import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext.jsx';

export const ProductModal = ({ product, onClose }) => {
  const { addToCart } = useCart();

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="max-w-md w-full bg-white rounded-3xl overflow-hidden shadow-xl"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="h-56 w-full object-cover"
              />
              <button
                onClick={onClose}
                className="absolute right-3 top-3 bg-white/80 rounded-full px-2 py-1 text-xs"
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-800">{product.name}</h3>
                <span className="text-xs bg-babyPink px-2 py-1 rounded-full">
                  ⭐ {product.rating}
                </span>
              </div>
              <p className="text-xs text-slate-600">{product.description}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="font-bold text-primary text-xl">₹{product.price}</span>
                <button
                  className="btn-primary text-xs"
                  onClick={() => {
                    addToCart(product, 1);
                    onClose();
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


