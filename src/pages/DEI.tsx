// src/pages/DEI.tsx
import React, { useState } from 'react';
import { VideoLightbox } from '../components/VideoLightbox';
import { Play } from 'lucide-react';
import '../styles/Pages.css';

interface DEIVal {
  title: string;
  desc: string;
}

const DEI_VALUES: DEIVal[] = [
  {
    title: 'Representation Matters',
    desc: 'We are committed to increasing diversity throughout our workforce, with particular focus on representation at the executive and leadership levels.'
  },
  {
    title: 'Equity in Opportunities',
    desc: 'We actively audit our career paths, development programs, and compensation systems to guarantee equal access and fairness for all employees.'
  },
  {
    title: 'Inclusive Culture',
    desc: 'Through employee resource groups (ERGs), mentorship programs, and ongoing training, we cultivate an environment where everyone feels valued and respected.'
  }
];

const PARTNERS = [
  'Color Of Change', 'National Urban League', 'The NAACP Legal Defense Fund',
  'Advancement Project', 'Equal Justice Initiative', 'United Negro College Fund',
  'Hispanic Federation', 'Asian American Legal Defense Fund', 'Out & Equal'
];

export const DEI: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className="subpage-container animate-fade-in">
      <div className="container">
        {/* Page Header */}
        <header className="page-header">
          <h1 className="page-title">Diversity, Equity & Inclusion</h1>
          <p className="page-subtitle">
            At Sony Music, we believe our business is strongest when we reflect the diversity of our artists, songwriters, and audiences worldwide.
          </p>
          <div className="page-header-underline"></div>
        </header>

        {/* Subpage Two-Column Layout */}
        <div className="subpage-grid">
          {/* Main Content */}
          <main style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {/* Core commitment */}
            <div className="dei-hero-card">
              <p>
                <strong>Sony Music Group's Global Social Justice Fund</strong> was launched to support social justice initiatives, combat racial inequality, and fund educational programs globally.
              </p>
              <p>
                To date, we have partnered with over 100 organizations globally, distributing grants to advance voter education, civil rights protections, and educational access for marginalized communities.
              </p>
            </div>

            {/* Core Values */}
            <div>
              <h2 className="home-section-title" style={{ marginBottom: '2rem' }}>Our DEI Pillars</h2>
              <div className="offices-list">
                {DEI_VALUES.map((val, idx) => (
                  <div key={idx} className="office-card" style={{ gridTemplateColumns: '1fr', gap: '8px', padding: '1.5rem 2rem' }}>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--color-brand-red)', fontWeight: 800 }}>
                      {val.title}
                    </h3>
                    <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                      {val.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Partners Grid */}
            <div>
              <h2 className="home-section-title" style={{ marginBottom: '1.5rem' }}>Global Partners Supported</h2>
              <div className="dei-partners-grid">
                {PARTNERS.map((partner, idx) => (
                  <div key={idx} className="dei-partner-logo">
                    {partner}
                  </div>
                ))}
              </div>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="sidebar-column">
            {/* FAQ Callout Box */}
            <div className="faq-callout-box">
              <div className="faq-callout-header">Careers & ERGs</div>
              <div className="faq-callout-body">
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-dark)', lineHeight: '1.4' }}>
                  Interested in joining Sony Music? Learn about our employee resource groups, inclusive benefits, and open career openings.
                </p>
                <a 
                  href="https://careers.sonymusic.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="faq-callout-btn"
                  style={{ display: 'block', textDecoration: 'none' }}
                >
                  Explore Careers ↗
                </a>
              </div>
            </div>

            {/* Featured Video Widget */}
            <div>
              <div className="home-section-title" style={{ fontSize: '1rem', marginBottom: '1rem' }}>Featured Video</div>
              <div 
                className="video-card" 
                onClick={() => setLightboxOpen(true)}
              >
                <div className="video-thumbnail-container">
                  <img 
                    src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=480&auto=format&fit=crop&q=60" 
                    alt="Sony Music Spotlight" 
                    className="video-thumbnail" 
                  />
                  <div className="video-play-overlay">
                    <Play size={36} className="play-icon-svg" fill="rgba(255,255,255,0.2)" />
                  </div>
                </div>
                <div className="video-info-card" style={{ padding: '0.75rem 1rem', fontSize: '0.85rem' }}>
                  Sony Music Social Impact: Global Action
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <VideoLightbox 
        isOpen={lightboxOpen} 
        videoTitle="Sony Music Social Impact: Global Action" 
        videoUrl="https://www.youtube.com/embed/j38Tz4L_b3k" 
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
};
