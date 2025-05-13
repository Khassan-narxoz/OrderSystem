
import React, { createContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (error) {
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
  
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        if (isMounted) setUser(userData);
      } catch (error) {
        if (isMounted) {
          localStorage.removeItem('token');
          setUser(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
  
    fetchUser();
  
    return () => {
      isMounted = false;
    };
  }, []);
  

  const login = async (token) => {
    localStorage.setItem('token', JSON.stringify(token));
    await fetchUser();
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
