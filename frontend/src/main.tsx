import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import UserCart from './UserCart.tsx';
import { CartProvider } from './context/CartProvider.tsx';
import ToasterContext from './context/ToastContext.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App />
    ),
  },
  {
    path: "cart",
    element: <UserCart />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CartProvider>
      <ToasterContext />
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>,
)
