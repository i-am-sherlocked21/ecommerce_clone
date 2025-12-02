import { useEffect, useState } from 'react';
import { demoProducts } from '../data/products';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || '';
        const res = await fetch(`${API_URL}/api/products`);
        if (!res.ok) {
          throw new Error('Backend not available, using demo data.');
        }
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.warn(err.message);
        setProducts(demoProducts);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};


