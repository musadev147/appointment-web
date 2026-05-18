import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('medsphere-token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token exists and load user profile (Mock profile lookup)
    const initializeAuth = async () => {
      if (token) {
        try {
          // Mocking token validation and fetching user data
          // In real API, we would do: axios.get('/auth/me')
          const mockUser = JSON.parse(localStorage.getItem('medsphere-user') || '{}');
          if (mockUser && mockUser.email) {
            setUser(mockUser);
          } else {
            // Token corrupt or empty
            logout();
          }
        } catch (error) {
          logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    // Mock login endpoint latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (email && password) {
      const mockToken = 'mock-jwt-token-xyz-12345';
      const mockUser = {
        id: 'user-101',
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        email: email,
        role: email.includes('admin') ? 'admin' : email.includes('doctor') ? 'doctor' : 'patient',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
      };

      localStorage.setItem('medsphere-token', mockToken);
      localStorage.setItem('medsphere-user', JSON.stringify(mockUser));
      setToken(mockToken);
      setUser(mockUser);
      setLoading(false);
      return { success: true, user: mockUser };
    }

    setLoading(false);
    throw new Error('Invalid email or password');
  };

  const register = async (name, email, password) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const mockToken = 'mock-jwt-token-xyz-12345';
    const mockUser = {
      id: `user-${Math.floor(Math.random() * 900) + 100}`,
      name: name,
      email: email,
      role: 'patient',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
    };

    localStorage.setItem('medsphere-token', mockToken);
    localStorage.setItem('medsphere-user', JSON.stringify(mockUser));
    setToken(mockToken);
    setUser(mockUser);
    setLoading(false);
    return { success: true, user: mockUser };
  };

  const logout = () => {
    localStorage.removeItem('medsphere-token');
    localStorage.removeItem('medsphere-user');
    setToken(null);
    setUser(null);
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    localStorage.setItem('medsphere-user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
