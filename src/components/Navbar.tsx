// src/components/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from '../hooks/useRouter';
import { ChevronDown, Menu, X } from 'lucide-react';
import '../styles/Navbar.css';

export const Navbar: React.FC = () => {
  const { currentPath, navigateTo } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileOpenSection, setMobileOpenSection] = useState<string | null>(null);

  // Close drawer on path change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileOpenSection(null);
  }, [currentPath]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const toggleMobileSection = (section: string) => {
    if (mobileOpenSection === section) {
      setMobileOpenSection(null);
    } else {
      setMobileOpenSection(section);
    }
  };

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    navigateTo(path);
  };

  const isActive = (paths: string[]) => {
    return paths.includes(currentPath) ? 'active' : '';
  };

  return (
    <header className="header-container">
      {/* SONY Corporate Bar */}
      <div className="sony-corporate-bar">
        <a href="https://www.sony.com" target="_blank" rel="noopener noreferrer">
          SONY
        </a>
      </div>

      {/* Main Navbar */}
      <nav className="main-navbar">
        <div className="logo-container" onClick={(e) => handleLinkClick(e, '/')}>
          <svg className="logo-icon-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" fill="#e31b23" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="#ffffff" strokeWidth="4" />
            <circle cx="50" cy="50" r="18" fill="none" stroke="#ffffff" strokeWidth="3" strokeDasharray="5,3" />
            <circle cx="50" cy="50" r="6" fill="#ffffff" />
          </svg>
          <div className="logo-text">
            SONY MUSIC
            <span>ENTERTAINMENT</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="nav-menu">
          <li className="nav-item">
            <span className={`nav-link ${isActive(['/artists', '/labels', '/executives', '/contacts', '/diversity-equity-inclusion'])}`}>
              About <ChevronDown size={14} />
            </span>
            <ul className="dropdown-menu">
              <li className="dropdown-item">
                <a href="/artists" onClick={(e) => handleLinkClick(e, '/artists')}>Featured Artists</a>
              </li>
              <li className="dropdown-item">
                <a href="/labels" onClick={(e) => handleLinkClick(e, '/labels')}>Labels & Divisions</a>
              </li>
              <li className="dropdown-item">
                <a href="/executives" onClick={(e) => handleLinkClick(e, '/executives')}>Executives</a>
              </li>
              <li className="dropdown-item">
                <a href="/contacts" onClick={(e) => handleLinkClick(e, '/contacts')}>Contacts</a>
              </li>
              <li className="dropdown-item">
                <a href="/diversity-equity-inclusion" onClick={(e) => handleLinkClick(e, '/diversity-equity-inclusion')}>Diversity & Inclusion</a>
              </li>
              <li className="dropdown-item">
                <a href="https://giving-back.sonymusic.com/" target="_blank" rel="noopener noreferrer">Giving Back</a>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <span className={`nav-link ${isActive(['/inside-sony-music', '/news'])}`}>
              News <ChevronDown size={14} />
            </span>
            <ul className="dropdown-menu">
              <li className="dropdown-item">
                <a href="/inside-sony-music" onClick={(e) => handleLinkClick(e, '/inside-sony-music')}>Inside Sony Music</a>
              </li>
              <li className="dropdown-item">
                <a href="/news" onClick={(e) => handleLinkClick(e, '/news')}>Press Releases</a>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <a href="https://careers.sonymusic.com/" target="_blank" rel="noopener noreferrer" className="nav-link">
              Careers
            </a>
          </li>

          <li className="nav-item">
            <a href="/faq" onClick={(e) => handleLinkClick(e, '/faq')} className={`nav-link ${isActive(['/faq'])}`}>
              FAQ
            </a>
          </li>

          <li className="nav-item">
            <span className="nav-link">
              For Artists <ChevronDown size={14} />
            </span>
            <ul className="dropdown-menu">
              <li className="dropdown-item">
                <a href="https://artistsforward.sonymusic.com/" target="_blank" rel="noopener noreferrer">Artists Forward</a>
              </li>
              <li className="dropdown-item">
                <a href="https://artisttools.sonymusic.com/" target="_blank" rel="noopener noreferrer">Artist Portal</a>
              </li>
            </ul>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-list">
          <li className="mobile-nav-item">
            <div 
              className={`mobile-nav-title ${mobileOpenSection === 'about' ? 'active' : ''}`}
              onClick={() => toggleMobileSection('about')}
            >
              About <ChevronDown size={18} style={{ transform: mobileOpenSection === 'about' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </div>
            {mobileOpenSection === 'about' && (
              <ul className="mobile-dropdown">
                <li><a href="/artists" onClick={(e) => handleLinkClick(e, '/artists')} className="mobile-dropdown-link">Featured Artists</a></li>
                <li><a href="/labels" onClick={(e) => handleLinkClick(e, '/labels')} className="mobile-dropdown-link">Labels & Divisions</a></li>
                <li><a href="/executives" onClick={(e) => handleLinkClick(e, '/executives')} className="mobile-dropdown-link">Executives</a></li>
                <li><a href="/contacts" onClick={(e) => handleLinkClick(e, '/contacts')} className="mobile-dropdown-link">Contacts</a></li>
                <li><a href="/diversity-equity-inclusion" onClick={(e) => handleLinkClick(e, '/diversity-equity-inclusion')} className="mobile-dropdown-link">Diversity & Inclusion</a></li>
                <li><a href="https://giving-back.sonymusic.com/" target="_blank" rel="noopener noreferrer" className="mobile-dropdown-link">Giving Back ↗</a></li>
              </ul>
            )}
          </li>

          <li className="mobile-nav-item">
            <div 
              className={`mobile-nav-title ${mobileOpenSection === 'news' ? 'active' : ''}`}
              onClick={() => toggleMobileSection('news')}
            >
              News <ChevronDown size={18} style={{ transform: mobileOpenSection === 'news' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </div>
            {mobileOpenSection === 'news' && (
              <ul className="mobile-dropdown">
                <li><a href="/inside-sony-music" onClick={(e) => handleLinkClick(e, '/inside-sony-music')} className="mobile-dropdown-link">Inside Sony Music</a></li>
                <li><a href="/news" onClick={(e) => handleLinkClick(e, '/news')} className="mobile-dropdown-link">Press Releases</a></li>
              </ul>
            )}
          </li>

          <li className="mobile-nav-item">
            <a href="https://careers.sonymusic.com/" target="_blank" rel="noopener noreferrer" className="mobile-nav-title">
              Careers ↗
            </a>
          </li>

          <li className="mobile-nav-item">
            <a href="/faq" onClick={(e) => handleLinkClick(e, '/faq')} className="mobile-nav-title">
              FAQ
            </a>
          </li>

          <li className="mobile-nav-item">
            <div 
              className={`mobile-nav-title ${mobileOpenSection === 'for-artists' ? 'active' : ''}`}
              onClick={() => toggleMobileSection('for-artists')}
            >
              For Artists <ChevronDown size={18} style={{ transform: mobileOpenSection === 'for-artists' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </div>
            {mobileOpenSection === 'for-artists' && (
              <ul className="mobile-dropdown">
                <li><a href="https://artistsforward.sonymusic.com/" target="_blank" rel="noopener noreferrer" className="mobile-dropdown-link">Artists Forward ↗</a></li>
                <li><a href="https://artisttools.sonymusic.com/" target="_blank" rel="noopener noreferrer" className="mobile-dropdown-link">Artist Portal ↗</a></li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};
