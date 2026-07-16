// src/hooks/useRouter.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

type RouterContextType = {
  currentPath: string;
  navigateTo: (path: string) => void;
};

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    // If external link, open in new tab or navigate away
    if (path.startsWith('http://') || path.startsWith('https://')) {
      window.open(path, '_blank', 'noopener,noreferrer');
      return;
    }
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigateTo }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};
