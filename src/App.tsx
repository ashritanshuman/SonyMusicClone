// src/App.tsx
import React from 'react';
import { RouterProvider, useRouter } from './hooks/useRouter';
import { MusicPlayerProvider } from './hooks/useMusicPlayer';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MusicPlayer } from './components/MusicPlayer';

// Pages
import { Home } from './pages/Home';
import { Artists } from './pages/Artists';
import { Labels } from './pages/Labels';
import { Executives } from './pages/Executives';
import { Contacts } from './pages/Contacts';
import { DEI } from './pages/DEI';
import { InsideSony } from './pages/InsideSony';
import { News } from './pages/News';
import { FAQ } from './pages/FAQ';

const AppContent: React.FC = () => {
  const { currentPath } = useRouter();

  // Simple client-side route switcher
  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <Home />;
      case '/artists':
        return <Artists />;
      case '/labels':
        return <Labels />;
      case '/executives':
        return <Executives />;
      case '/contacts':
        return <Contacts />;
      case '/diversity-equity-inclusion':
        return <DEI />;
      case '/inside-sony-music':
        return <InsideSony />;
      case '/news':
        return <News />;
      case '/faq':
        return <FAQ />;
      default:
        // Clean fallback
        return <Home />;
    }
  };

  return (
    <>
      <Navbar />
      {renderPage()}
      <Footer />
      <MusicPlayer />
    </>
  );
};

export const App: React.FC = () => {
  return (
    <RouterProvider>
      <MusicPlayerProvider>
        <AppContent />
      </MusicPlayerProvider>
    </RouterProvider>
  );
};

export default App;
