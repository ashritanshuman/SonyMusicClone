// src/components/Footer.tsx
import React from 'react';
import { useRouter } from '../hooks/useRouter';
import { HelpCircle } from 'lucide-react';
import '../styles/Footer.css';

export const Footer: React.FC = () => {
  const { navigateTo } = useRouter();

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    navigateTo(path);
  };

  const footerLinks = [
    { label: 'Royalty Information', path: '/faq' },
    { label: 'Music United', path: '/' },
    { label: 'Pro Guide', path: '/' },
    { label: 'Copyright Information', path: '/faq' },
    { label: 'Privacy Policy', path: '/' },
    { label: 'How We Use Your Data', path: '/' },
    { label: 'Do Not Sell/Share My Personal Info', path: '/' },
    { label: 'Your California Privacy Rights', path: '/' },
    { label: 'Terms & Conditions', path: '/' },
    { label: 'AI Usage Terms', path: '/' },
    { label: 'Send Us Feedback', path: '/contacts' },
    { label: 'Why Music Matters', path: '/' }
  ];

  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Social Icons */}
        <div className="footer-socials">
          <a href="https://facebook.com/sonymusic" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Facebook">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
            </svg>
          </a>
          <a href="https://twitter.com/sonymusic" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Twitter">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="https://instagram.com/sonymusic" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Instagram">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>
          <a href="https://youtube.com/sonymusic" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="YouTube">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
              <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
            </svg>
          </a>
        </div>

        {/* Policy Buttons */}
        <div className="footer-policy-buttons">
          <button className="policy-btn" onClick={(e) => handleLinkClick(e, '/faq')}>
            ROYALTY INFO
          </button>
          <button className="policy-btn" onClick={(e) => handleLinkClick(e, '/faq')}>
            COPYRIGHT INFO
          </button>
        </div>

        {/* Links Grid */}
        <div className="footer-links-grid">
          {footerLinks.map((link, idx) => (
            <a 
              key={idx} 
              href={link.path} 
              onClick={(e) => handleLinkClick(e, link.path)}
              className="footer-link-item"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Bottom Area */}
        <div className="footer-bottom">
          <div className="copyright-text">
            © {new Date().getFullYear()} Sony Music Entertainment. All Rights Reserved.
          </div>
          <div className="footer-badges">
            <div className="gptw-badge">
              <span className="gptw-badge-logo">Great</span>
              <span>Place To Work Certified</span>
            </div>
            <a 
              href="/faq" 
              onClick={(e) => handleLinkClick(e, '/faq')} 
              className="footer-link-item" 
              style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <HelpCircle size={14} /> Help Center
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
