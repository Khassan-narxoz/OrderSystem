import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RegisterForm from './forms/RegisterForm';
import LoginForm from './forms/LoginForm';
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage';
import App from './App';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "products",
        element: <ProductsPage />
      },
      {
        path: "my-orders",
        element: <OrdersPage />
      },
      {
        path: "all-orders",
        element: <OrdersPage />
      },
    ]
  },
  {
    path: "register",
    element: <RegisterForm />
  },
  {
    path: "login",
    element: <LoginForm />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
