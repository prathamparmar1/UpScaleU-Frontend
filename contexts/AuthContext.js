// contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const AuthContext = createContext(null);

// Custom hook to consume context easily
export function useAuth() {
  return useContext(AuthContext);
}

// Provider component
export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);   // Stores { access, refresh }
  const [loading, setLoading] = useState(true);

  // Load auth state from localStorage when app starts
  useEffect(() => {
    const savedAuth = localStorage.getItem("auth");
    if (savedAuth) {
      setAuth(JSON.parse(savedAuth));
    }
    setLoading(false);
  }, []);

  // Save to localStorage whenever auth changes
  useEffect(() => {
    if (auth) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth]);

  // Functions to login & logout
  const login = (tokens) => {
    setAuth(tokens); // tokens = { access, refresh }
  };

  const logout = () => {
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
