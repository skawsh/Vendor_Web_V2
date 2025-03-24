
import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkUserSession = () => {
      const storedUser = localStorage.getItem('skawsh_user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        } catch (error) {
          // If there's an error parsing the stored user, clear it
          localStorage.removeItem('skawsh_user');
        }
      }
      setIsLoading(false);
    };

    checkUserSession();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Hardcoded credentials check
    if (email === 'Busybee@gmail.com' && password === 'Skawsh@123') {
      const userData = { email };
      setUser(userData);
      setIsAuthenticated(true);
      // Store user data in localStorage
      localStorage.setItem('skawsh_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('skawsh_user');
  };

  if (isLoading) {
    // Return a loading state while checking for stored session
    return <div className="flex items-center justify-center h-screen">Loading session...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
