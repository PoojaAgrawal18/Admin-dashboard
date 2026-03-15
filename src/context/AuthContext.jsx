import { createContext, useContext, useState } from 'react';
import { adminLogin as apiAdminLogin } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = sessionStorage.getItem('adminUser');
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email, password) => {
    try {
      const { admin } = await apiAdminLogin(email, password);
      const userData = { id: admin.id, email: admin.email, name: admin.name };
      setUser(userData);
      sessionStorage.setItem('adminUser', JSON.stringify(userData));
      return { success: true };
    } catch (err) {
      const message = err?.data?.message || err?.message || 'Invalid email or password';
      return { success: false, message };
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('adminUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
