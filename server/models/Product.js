import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, enum: ['Bath', 'Toys', 'Skincare'], required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 4.5 },
    image: { type: String, required: true },
    description: { type: String, required: true }
  },
  { timestamps: true }
);

export const Product = mongoose.model('Product', productSchema);


