import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { Product } from './models/Product.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://localhost:27017/babybliss_demo';

// CORS configuration for production
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'BabyBliss API running' });
});

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// Seed / upsert demo products so new items appear even if collection already has data
const seedProductsIfNeeded = async () => {
  const demo = [
    {
      name: 'Gentle Baby Body Wash',
      category: 'Bath',
      price: 299,
      rating: 4.8,
      image:
        'https://images.pexels.com/photos/6046509/pexels-photo-6046509.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Tear-free, pH balanced body wash for your little one.'
    },
    {
      name: 'Soft Plush Bunny Toy',
      category: 'Toys',
      price: 499,
      rating: 4.9,
      image:
        'https://images.pexels.com/photos/3770580/pexels-photo-3770580.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Ultra-soft plush bunny, perfect for cuddles and nap time.'
    },
    {
      name: 'Baby Moisturizing Lotion',
      category: 'Skincare',
      price: 349,
      rating: 4.7,
      image:
        'https://images.pexels.com/photos/3738341/pexels-photo-3738341.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Lightweight, non-sticky lotion to keep baby skin hydrated.'
    },
    {
      name: 'Organic Cotton Swaddle Blanket',
      category: 'Bath',
      price: 399,
      rating: 4.6,
      image:
        'https://images.pexels.com/photos/3875220/pexels-photo-3875220.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Breathable, super-soft swaddle blanket made from organic cotton.'
    },
    {
      name: 'Colorful Rattle Set',
      category: 'Toys',
      price: 259,
      rating: 4.4,
      image:
        'https://images.pexels.com/photos/459704/pexels-photo-459704.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Bright, engaging rattles to stimulate your baby’s senses.'
    },
    {
      name: 'Baby Face Cream',
      category: 'Skincare',
      price: 279,
      rating: 4.5,
      image:
        'https://images.pexels.com/photos/3738371/pexels-photo-3738371.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Gentle face cream to protect delicate baby skin from dryness.'
    }
  ];

  for (const item of demo) {
    await Product.findOneAndUpdate(
      { name: item.name },
      item,
      { upsert: true, new: true }
    );
  }
  console.log('Seeded / updated demo products');
};

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');
    await seedProductsIfNeeded();
    app.listen(PORT, () => {
      console.log(`BabyBliss API running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Mongo connection error', err);
    process.exit(1);
  });


