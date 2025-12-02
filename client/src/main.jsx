import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './pages/App.jsx';
import { CartProvider } from './context/CartContext.jsx';
import './index.css';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .catch((err) => console.error('SW registration failed', err));
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <>
        <Toaster
          position="top-center"
          toastOptions={{
            style: { borderRadius: '999px', background: '#fff', color: '#0f172a' }
          }}
        />
        <App />
      </>
    </CartProvider>
  </React.StrictMode>
);


