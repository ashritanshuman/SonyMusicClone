// src/pages/Contacts.tsx
import React, { useState } from 'react';
import { useRouter } from '../hooks/useRouter';
import { VideoLightbox } from '../components/VideoLightbox';
import { MapPin, Phone, Mail, Play } from 'lucide-react';
import '../styles/Pages.css';

interface Office {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  region: 'Americas' | 'Europe' | 'Asia-Pacific' | 'Africa & MidEast';
}

const OFFICES_DATA: Office[] = [
  // Americas
  {
    id: 1,
    name: 'Sony Music Corporate HQ (New York)',
    address: '25 Madison Avenue, New York, NY 10010, United States',
    phone: '+1 (212) 833-8000',
    email: 'info.us@sonymusic.com',
    region: 'Americas'
  },
  {
    id: 2,
    name: 'Sony Music Nashville',
    address: '1201 Demonbreun Street, Suite 1300, Nashville, TN 37203, United States',
    phone: '+1 (615) 301-4300',
    email: 'info.nashville@sonymusic.com',
    region: 'Americas'
  },
  {
    id: 3,
    name: 'Sony Music Latin (Miami)',
    address: '3390 Mary Street, Miami, FL 33133, United States',
    phone: '+1 (305) 695-3500',
    email: 'info.latin@sonymusic.com',
    region: 'Americas'
  },
  // Europe
  {
    id: 4,
    name: 'Sony Music UK (London)',
    address: '2 Canal Reach, London N1C 4DB, United Kingdom',
    phone: '+44 (20) 7361-8000',
    email: 'info.uk@sonymusic.com',
    region: 'Europe'
  },
  {
    id: 5,
    name: 'Sony Music Germany (Berlin)',
    address: 'Balanstraße 73, Haus 31, 81541 München, Germany',
    phone: '+49 (89) 4136-0',
    email: 'info.de@sonymusic.com',
    region: 'Europe'
  },
  {
    id: 6,
    name: 'Sony Music France (Paris)',
    address: '52-54 Rue de Châteaudun, 75009 Paris, France',
    phone: '+33 (1) 5325-3000',
    email: 'info.fr@sonymusic.com',
    region: 'Europe'
  },
  // Asia-Pacific
  {
    id: 7,
    name: 'Sony Music Japan (Tokyo)',
    address: '4-5-1 Akasaka, Minato-ku, Tokyo 107-8301, Japan',
    phone: '+81 (3) 3515-5111',
    email: 'info.jp@sonymusic.com',
    region: 'Asia-Pacific'
  },
  {
    id: 8,
    name: 'Sony Music Australia (Sydney)',
    address: '100 Harris Street, Pyrmont, NSW 2009, Australia',
    phone: '+61 (2) 9276-4000',
    email: 'info.au@sonymusic.com',
    region: 'Asia-Pacific'
  },
  // Africa & MidEast
  {
    id: 9,
    name: 'Sony Music South Africa (Johannesburg)',
    address: '1st Floor, 4 Fricker Road, Illovo, Johannesburg 2196, South Africa',
    phone: '+27 (11) 274-5000',
    email: 'info.za@sonymusic.com',
    region: 'Africa & MidEast'
  },
  {
    id: 10,
    name: 'Sony Music Middle East (Dubai)',
    address: 'Office 402, Building 3, Dubai Media City, Dubai, United Arab Emirates',
    phone: '+971 (4) 438-9500',
    email: 'info.me@sonymusic.com',
    region: 'Africa & MidEast'
  }
];

const REGIONS: Array<'Americas' | 'Europe' | 'Asia-Pacific' | 'Africa & MidEast'> = [
  'Americas', 'Europe', 'Asia-Pacific', 'Africa & MidEast'
];

export const Contacts: React.FC = () => {
  const { navigateTo } = useRouter();
  const [activeRegion, setActiveRegion] = useState<'Americas' | 'Europe' | 'Asia-Pacific' | 'Africa & MidEast'>('Americas');
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const filteredOffices = OFFICES_DATA.filter((office) => office.region === activeRegion);

  return (
    <div className="subpage-container animate-fade-in">
      <div className="container">
        {/* Page Header */}
        <header className="page-header">
          <h1 className="page-title">Global Directory</h1>
          <p className="page-subtitle">
            Contact Sony Music offices around the globe. Select a region to view local contact directories.
          </p>
          <div className="page-header-underline"></div>
        </header>

        {/* Subpage Two-Column Layout */}
        <div className="subpage-grid">
          {/* Main Offices list */}
          <main>
            {/* Region tabs */}
            <div className="contacts-tabs">
              {REGIONS.map((region) => (
                <button
                  key={region}
                  className={`tab-btn ${activeRegion === region ? 'active' : ''}`}
                  onClick={() => setActiveRegion(region)}
                >
                  {region}
                </button>
              ))}
            </div>

            {/* Offices List */}
            <div className="offices-list">
              {filteredOffices.map((office) => (
                <div key={office.id} className="office-card animate-fade-in">
                  <div>
                    <h2 className="office-name">{office.name}</h2>
                    <div className="office-address" style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                      <MapPin size={18} style={{ color: 'var(--color-brand-red)', flexShrink: 0, marginTop: '2px' }} />
                      <span>{office.address}</span>
                    </div>
                  </div>
                  
                  <div className="office-contact-info">
                    <div className="office-contact-detail">
                      <Phone size={14} style={{ color: 'var(--color-brand-red)' }} />
                      <span>Phone:</span> {office.phone}
                    </div>
                    <div className="office-contact-detail">
                      <Mail size={14} style={{ color: 'var(--color-brand-red)' }} />
                      <span>Email:</span> <a href={`mailto:${office.email}`} style={{ color: 'var(--color-brand-red)', textDecoration: 'underline' }}>{office.email}</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>

          {/* Sidebar */}
          <aside className="sidebar-column">
            {/* FAQ Callout Box */}
            <div className="faq-callout-box">
              <div className="faq-callout-header">Demo Submissions</div>
              <div className="faq-callout-body">
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-dark)', lineHeight: '1.4' }}>
                  Please note that Sony Music offices do not accept unsolicited music demos. Refer to our FAQ to learn how to submit your music.
                </p>
                <button className="faq-callout-btn" onClick={() => navigateTo('/faq')}>
                  View Submission FAQs »
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
                    src="https://images.unsplash.com/photo-1487180142328-054b783fc471?w=480&auto=format&fit=crop&q=60" 
                    alt="Sony Music Spotlight" 
                    className="video-thumbnail" 
                  />
                  <div className="video-play-overlay">
                    <Play size={36} className="play-icon-svg" fill="rgba(255,255,255,0.2)" />
                  </div>
                </div>
                <div className="video-info-card" style={{ padding: '0.75rem 1rem', fontSize: '0.85rem' }}>
                  Working at Sony Music: Global Career Paths
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <VideoLightbox 
        isOpen={lightboxOpen} 
        videoTitle="Working at Sony Music: Global Career Paths" 
        videoUrl="https://www.youtube.com/embed/j38Tz4L_b3k" 
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
};
