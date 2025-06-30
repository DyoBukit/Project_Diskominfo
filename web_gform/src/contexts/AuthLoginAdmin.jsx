// src/contects/AuthLoginAdmin.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem('adminAuth');
    if (storedAuth) {
      const { isAuthenticated: authStatus, user: storedUser, role: storedRole } = JSON.parse(storedAuth);
      setIsAuthenticated(authStatus);
      setUser(storedUser);
      setRole(storedRole);
    }
  }, []);

  const login = async (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      const adminData = { username: 'admin_user', role: 'admin' };
      setIsAuthenticated(true);
      setUser(adminData);
      setRole('admin');
      localStorage.setItem('adminAuth', JSON.stringify({ isAuthenticated: true, user: adminData, role: 'admin' }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setRole(null);
    localStorage.removeItem('adminAuth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);