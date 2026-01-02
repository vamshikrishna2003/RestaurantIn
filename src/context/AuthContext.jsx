import React, { createContext, useContext, useState } from 'react';
import axios from 'axios'; // 👉 Make sure axios is installed

const AuthContext = createContext(null);

// AuthProvider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Login function (REAL API)
  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      if (response.data && response.data.user) {
        setUser(response.data.user);
        return true;
      }

      return false;
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      return false;
    }
  };

  // Register function (REAL API)
  const register = async (name, email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password
      });

      if (response.data) {
        setUser(response.data);
        return true;
      }

      return false;
    } catch (err) {
      console.error('Registration error:', err.response?.data || err.message);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
