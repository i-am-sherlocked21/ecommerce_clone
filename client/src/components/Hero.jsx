import React from 'react';
import { motion } from 'framer-motion';

export const Hero = ({ onNotify }) => {
  return (
    <section className="max-w-5xl mx-auto px-4 py-8 md:py-12 grid md:grid-cols-2 gap-8 items-center">
      <div>
        <motion.h1
          className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Gentle care for your little one,{' '}
          <span className="text-primary">delivered with love.</span>
        </motion.h1>
        <p className="mt-3 text-sm md:text-base text-slate-600">
          BabyBliss is a demo mini-store inspired by FirstCry – browse baby-safe bath, toys,
          and skincare essentials in a soft pastel UI.
        </p>
        <motion.div
          className="mt-5 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary"
          >
            Shop baby essentials
          </motion.button>
          <motion.button
            onClick={onNotify}
            className="px-4 py-2 rounded-full border border-primary/40 text-primary bg-white hover:bg-babyPink transition text-sm"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Send Notification
          </motion.button>
        </motion.div>
        <p className="mt-2 text-[11px] text-slate-400">
          This is a demo-only experience. No real orders or payments.
        </p>
      </div>
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <div className="rounded-3xl bg-gradient-to-br from-babyBlue via-babyPink to-babyMint p-1 shadow-xl">
          <div className="rounded-3xl bg-white/80 p-6 flex flex-col items-center gap-3">
            <div className="flex gap-3">
              <span className="text-4xl">🍼</span>
              <span className="text-4xl">🧸</span>
              <span className="text-4xl">🧴</span>
            </div>
            <p className="text-xs text-slate-500 text-center">
              Curated baby products for bath time, play time, and cuddle time.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};


