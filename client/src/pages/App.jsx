import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header.jsx';
import { Hero } from '../components/Hero.jsx';
import { CategoryCards } from '../components/CategoryCards.jsx';
import { ProductGrid } from '../components/ProductGrid.jsx';
import { ProductModal } from '../components/ProductModal.jsx';
import { CartPage } from './CartPage.jsx';
import { LoginPage } from './LoginPage.jsx';
import { useProducts } from '../hooks/useProducts.js';

export const App = () => {
  const [page, setPage] = useState('home');
  const [token, setToken] = useState(null);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState(null);
  const { products, loading } = useProducts();

  useEffect(() => {
    const stored = localStorage.getItem('babybliss_token');
    if (stored) {
      setToken(stored);
    }
  }, []);

  const filtered = filter ? products.filter((p) => p.category === filter) : products;

  const triggerNotification = async () => {
    if (!('Notification' in window)) {
      alert('Notifications are not supported in this browser.');
      return;
    }
    let permission = Notification.permission;
    if (permission === 'default') {
      permission = await Notification.requestPermission();
    }
    if (permission === 'granted') {
      new Notification('BabyBliss Demo', {
        body: 'This is a demo local notification for BabyBliss.',
        icon: 'https://cdn-icons-png.flaticon.com/512/3065/3065493.png'
      });
    } else {
      alert('Please allow notifications for this demo.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onNavigate={setPage}
        currentPage={page}
        isLoggedIn={!!token}
        onLogout={() => {
          localStorage.removeItem('babybliss_token');
          setToken(null);
          setPage('home');
        }}
      />
      {page === 'home' && (
        <>
          <Hero onNotify={triggerNotification} />
          <CategoryCards
            activeFilter={filter}
            onFilter={(cat) => setFilter(cat)}
          />
          {loading ? (
            <p className="max-w-5xl mx-auto px-4 mt-6 text-sm text-slate-500">
              Loading cute things for your baby...
            </p>
          ) : (
            <ProductGrid products={filtered} onSelect={setSelected} />
          )}
        </>
      )}
      {page === 'cart' && <CartPage />}
      {page === 'login' && (
        <LoginPage
          onSuccess={() => setPage('home')}
          onLogin={(t) => {
            setToken(t);
            setPage('home');
          }}
        />
      )}
      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </div>
  );
};

export default App;


