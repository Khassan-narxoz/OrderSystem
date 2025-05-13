
import axios from 'axios';

export const authHeader = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const API_URL = 'https://ordersystem-a6me.onrender.com/api';

export const loginUser = async (userData) => {
  return await axios.post(`${API_URL}/login`, userData);
};

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/register`, userData);
};

export const sendCode = async (email, code) => {
  return await axios.post(`${API_URL}/send-code`, { email, code });
};

export const getCurrentUser = async () => {
    const res = await axios.get(`${API_URL}/users/me`, {
      headers: authHeader(),
    });
    return res.data;
};

export const createProduct = async (productData) => {
    try {
      const res = await axios.post(`${API_URL}/products`, productData, {
        headers: authHeader(),
      });
      return res.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  };
  
  export const LogoutSystem = async () => {
    try {
      const response = await axios.post(`${API_URL}/logout`, {}, {
        headers: authHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  export const getAllProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`, {
        headers: authHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении товаров:', error);
      throw error;
    }
  };

  export const deleteProductById = async (productId) => {
    try {
      const response = await axios.delete(`${API_URL}/products/${productId}`, {
        headers: authHeader()
      });
      return response.data;
    } catch (error) {
      console.error(`Ошибка при удалении товара с ID ${productId}:`, error);
      throw error;
    }
  };

  export const updateProductById = async (productId, updatedProductData) => {
    try {
      const response = await axios.put(`${API_URL}/products/${productId}`, updatedProductData, {
        headers: authHeader()
      });
      return response.data;
    } catch (error) {
      console.error(`Ошибка при обновлении товара с ID ${productId}:`, error);
      throw error;
    }
  };

  export const createOrder = async (orderData) => {
    try {
      const response = await axios.post(`${API_URL}/orders`, orderData, {
        headers: authHeader(),
      });
      return response.data;
    } catch (error) {
      console.error('Ошибка при оформлении заказа:', error);
      throw error;
    }
  };

  export const getUserOrders = async () => {
    const res = await axios.get(`${API_URL}/orders/user`, {
      headers: authHeader()
    });
    return res.data;
  };
  
  export const getAllOrders = async () => {
    const res = await axios.get(`${API_URL}/orders/all`, {
      headers: authHeader()
    });
    return res.data;
  };