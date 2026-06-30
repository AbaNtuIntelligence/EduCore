import { useState, useEffect } from 'react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/verify');
      if (res.status === 401) {
        // Not authenticated, this is expected for public pages
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setIsAuthenticated(data.authenticated || false);
    } catch (error) {
      // Ignore errors for public pages
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  return { isAuthenticated, loading, checkAuth };
}
