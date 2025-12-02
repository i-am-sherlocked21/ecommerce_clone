import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext.jsx';

export const Header = ({ onNavigate, currentPage, isLoggedIn, onLogout }) => {
  const { cart } = useCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-20 bg-babyPink/80 backdrop-blur border-b border-pink-100">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <motion.div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onNavigate('home')}
          whileHover={{ scale: 1.03 }}
        >
          <span className="text-2xl">👶</span>
          <div>
            <div className="text-xl font-extrabold tracking-tight text-primary">BabyBliss</div>
            <p className="text-xs text-slate-500">Soft, safe & happy baby essentials</p>
          </div>
        </motion.div>
        <nav className="flex items-center gap-3 text-sm">
          <button
            onClick={() => onNavigate('home')}
            className={`px-3 py-1 rounded-full ${
              currentPage === 'home' ? 'bg-white text-primary' : 'hover:bg-white/70'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('cart')}
            className={`relative px-3 py-1 rounded-full ${
              currentPage === 'cart' ? 'bg-white text-primary' : 'hover:bg-white/70'
            }`}
          >
            Cart
            {count > 0 && (
              <span className="absolute -right-1 -top-1 text-[10px] bg-primary text-white rounded-full px-1">
                {count}
              </span>
            )}
          </button>
          {!isLoggedIn ? (
            <button
              onClick={() => onNavigate('login')}
              className={`px-3 py-1 rounded-full ${
                currentPage === 'login' ? 'bg-white text-primary' : 'hover:bg-white/70'
              }`}
            >
              Login
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-xs text-slate-500">
                Hi, Demo Parent
              </span>
              <button
                onClick={onLogout}
                className="px-3 py-1 rounded-full bg-white text-primary text-xs hover:bg-white/80"
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};


