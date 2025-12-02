import React from 'react';
import { useCart } from '../context/CartContext.jsx';

export const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-xl font-bold text-slate-800 mb-2">Your Cart</h1>
        <p className="text-sm text-slate-500">
          Your cart is empty. Browse cute baby products on the home page to add items.
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold text-slate-800 mb-4">Your Cart</h1>
      <div className="space-y-3">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex gap-3 bg-white rounded-2xl p-3 shadow-sm border border-pink-50"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 rounded-2xl object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <h2 className="text-sm font-semibold text-slate-800">{item.name}</h2>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    ₹{item.price} each • ⭐ {item.rating}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-[11px] text-slate-400 hover:text-red-400"
                >
                  Remove
                </button>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item._id, -1)}
                    className="w-7 h-7 rounded-full border border-pink-100 flex items-center justify-center text-sm"
                  >
                    -
                  </button>
                  <span className="text-sm font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, 1)}
                    className="w-7 h-7 rounded-full border border-pink-100 flex items-center justify-center text-sm"
                  >
                    +
                  </button>
                </div>
                <div className="text-sm font-semibold text-primary">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 rounded-2xl bg-babyMint/60 border border-emerald-100 flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wide">Order Summary</p>
          <p className="text-lg font-bold text-slate-800">₹{subtotal}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={clearCart}
            className="px-3 py-2 rounded-full text-xs border border-slate-300 text-slate-600 bg-white"
          >
            Clear Cart
          </button>
          <button className="btn-primary text-xs">
            Checkout (Demo)
          </button>
        </div>
      </div>
      <p className="mt-2 text-[11px] text-slate-400">
        This is a demo-only cart experience. No real payments or orders are processed.
      </p>
    </main>
  );
};


