// src/contects/AuthLoginUser.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthUserContext = createContext(null);

export const AuthUserProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem('userAuth');
    if (storedAuth) {
      const { isAuthenticated: authStatus, user: storedUser, role: storedRole } = JSON.parse(storedAuth);
      setIsAuthenticated(authStatus);
      setUser(storedUser);
      setRole(storedRole);
    }
  }, []);

  const login = async (username, password) => {
    if (username === 'user' && password === 'user123') {
      const userData = { username: 'standard_user', role: 'user' };
      setIsAuthenticated(true);
      setUser(userData);
      setRole('user');
      localStorage.setItem('userAuth', JSON.stringify({ isAuthenticated: true, user: userData, role: 'user' }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setRole(null);
    localStorage.removeItem('userAuth');
  };

  return (
    <AuthUserContext.Provider value={{ isAuthenticated, user, role, login, logout }}>
      {children}
    </AuthUserContext.Provider>
  );
};

export const useAuthUser = () => useContext(AuthUserContext);