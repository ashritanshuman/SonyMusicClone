// src/pages/Executives.tsx
import React, { useState } from 'react';
import { useRouter } from '../hooks/useRouter';
import { VideoLightbox } from '../components/VideoLightbox';
import { Play } from 'lucide-react';
import '../styles/Pages.css';

interface Exec {
  id: number;
  name: string;
  title: string;
  photoUrl: string;
  bio: string;
}

const EXECS: Exec[] = [
  {
    id: 1,
    name: 'Rob Stringer CBE',
    title: 'Chairman, Sony Music Group',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    bio: 'Rob Stringer is Chairman of Sony Music Group. In this role, he leads the global operations of the world\'s premier music publishing and recorded music companies. Stringer is responsible for driving the artistic and commercial development of a diverse global roster.'
  },
  {
    id: 2,
    name: 'Kevin Kelleher',
    title: 'Chief Operating Officer, Sony Music Entertainment',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    bio: 'Kevin Kelleher serves as Chief Operating Officer for Sony Music Entertainment. He oversees global administrative, business affairs, finance, human resources, legal, and operational activities for the recorded music division.'
  },
  {
    id: 3,
    name: 'Julie Swidler',
    title: 'EVP, Business Affairs & General Counsel',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    bio: 'Julie Swidler is Executive Vice President of Business Affairs and General Counsel. She oversees legal affairs, acquisitions, negotiations, and corporate contracts for Sony Music global properties, advising senior management on strategic partnerships.'
  },
  {
    id: 4,
    name: 'Dennis Kooker',
    title: 'President, Global Digital Business & US Sales',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80',
    bio: 'Dennis Kooker is President of Global Digital Business & US Sales. He drives the company\'s digital business development, sales strategy, licensing agreements with streaming services, and new technology investments.'
  }
];

export const Executives: React.FC = () => {
  const { navigateTo } = useRouter();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className="subpage-container animate-fade-in">
      <div className="container">
        {/* Page Header */}
        <header className="page-header">
          <h1 className="page-title">Leadership</h1>
          <p className="page-subtitle">
            Meet the executives who lead Sony Music Entertainment's global mission to support artists and cultivate creative excellence.
          </p>
          <div className="page-header-underline"></div>
        </header>

        {/* Subpage Two-Column Layout */}
        <div className="subpage-grid">
          {/* Main Leadership Grid */}
          <main className="executives-grid">
            {EXECS.map((exec) => (
              <article key={exec.id} className="exec-card">
                <div className="exec-photo-box">
                  <img src={exec.photoUrl} alt={exec.name} className="exec-photo" />
                </div>
                <div className="exec-info-box">
                  <h2 className="exec-name">{exec.name}</h2>
                  <div className="exec-title">{exec.title}</div>
                </div>
                <p className="exec-bio-text">{exec.bio}</p>
              </article>
            ))}
          </main>

          {/* Sidebar */}
          <aside className="sidebar-column">
            {/* FAQ Callout Box */}
            <div className="faq-callout-box">
              <div className="faq-callout-header">Leadership Questions</div>
              <div className="faq-callout-body">
                <ul className="faq-callout-bullets">
                  <li className="faq-callout-bullet">Company history and structures</li>
                  <li className="faq-callout-bullet">Corporate contact directories</li>
                  <li className="faq-callout-bullet">Global offices and divisions</li>
                </ul>
                <button className="faq-callout-btn" onClick={() => navigateTo('/faq')}>
                  View FAQs »
                </button>
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
                    src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=480&auto=format&fit=crop&q=60" 
                    alt="Sony Music Spotlight" 
                    className="video-thumbnail" 
                  />
                  <div className="video-play-overlay">
                    <Play size={36} className="play-icon-svg" fill="rgba(255,255,255,0.2)" />
                  </div>
                </div>
                <div className="video-info-card" style={{ padding: '0.75rem 1rem', fontSize: '0.85rem' }}>
                  Sony Music Spotlight: Creative Community
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <VideoLightbox 
        isOpen={lightboxOpen} 
        videoTitle="Sony Music Spotlight: Creative Community" 
        videoUrl="https://www.youtube.com/embed/j38Tz4L_b3k" 
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
};
