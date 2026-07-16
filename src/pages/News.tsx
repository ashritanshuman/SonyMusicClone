// src/pages/News.tsx
import React, { useState } from 'react';
import { Search, X, MessageSquare, Heart, RefreshCw, Play } from 'lucide-react';
import { VideoLightbox } from '../components/VideoLightbox';
import '../styles/Pages.css';

interface PressRelease {
  id: number;
  date: string;
  title: string;
  snippet: string;
  content: string;
}

const RELEASES: PressRelease[] = [
  {
    id: 1,
    date: 'July 14, 2026',
    title: 'Sony Music Artists Lead Nominations for the 2026 Global Music Awards',
    snippet: 'With outstanding achievements across Pop, Hip-Hop, and Country categories, Sony Music Entertainment artists have secured major nominations, highlighting a year of unmatched creative excellence.',
    content: 'Sony Music Entertainment today celebrated a landmark achievement as its roster of world-class artists received dozens of nominations for the 2026 Global Music Awards. Heading the list are multi-nominees Tyla, Beyoncé, and Travis Scott, who collectively represent the vanguard of contemporary sound. Rob Stringer, Chairman of Sony Music Group, remarked: "We are immensely proud of our artists, songwriters, and creators. Their dedication to pushes boundaries and shapes international culture. These nominations are a testament to their visionary work and the collaboration of our label teams around the world."'
  },
  {
    id: 2,
    date: 'July 10, 2026',
    title: 'Epic Records Announces Groundbreaking Partnership with International Label Group',
    snippet: 'Epic Records is expanding its global footprint by launching a joint venture to co-sign, develop, and distribute rising talent across African and European territories.',
    content: 'Epic Records, a division of Sony Music Entertainment, today announced a strategic global partnership with the International Label Group (ILG). This joint venture is designed to discover and nurture rising musical talent across Africa and Europe, providing independent artists with Epic\'s powerful global infrastructure, marketing, and distribution capabilities. Under the terms of the agreement, ILG will lead local A&R and talent discovery, while Epic Records will manage international releases, digital promotion, and marketing campaigns. The partnership marks a significant milestone in Epic\'s commitment to diversifying global musical distribution.'
  },
  {
    id: 3,
    date: 'July 05, 2026',
    title: 'Sony Music Global Giving Campaign Raises $10M for Community Music Education',
    snippet: 'Through partnerships with non-profits worldwide, the annual initiative funds grants, instruments, and recording studio spaces for underprivileged youth in over 30 countries.',
    content: 'Sony Music Group today announced that its annual global philanthropic initiative has raised more than $10 million to fund music education programs for underserved communities. Through the Global Social Justice Fund, Sony Music has partnered with over 50 educational non-profits across 30 countries to purchase musical instruments, construct recording facilities, and hire music teachers. Julie Swidler, EVP of Business Affairs, stated: "Music has the power to change lives. By providing resources and professional studio environments to young, passionate creators, we are investing in the next generation of storytellers and building a more inclusive creative pipeline."'
  },
  {
    id: 4,
    date: 'June 30, 2026',
    title: 'Sony Music Publishing Named Publisher of the Year at Annual Industry Awards',
    snippet: 'Sony Music Publishing has been honored with the prestigious publisher award, recognizing its historic songwriting catalog and creative support team.',
    content: 'Sony Music Publishing has officially been named Publisher of the Year at the 2026 Music Industry Awards. Recognized for its exceptional songwriting catalog and dedication to supporting composers, the publishing division enjoyed a banner year of Billboard Chart success, catalog expansions, and strategic licensing deals. The award honors the division\'s creative support teams and their work protecting and enhancing the value of songwriters\' intellectual property.'
  }
];

const TWEETS = [
  {
    user: 'Sony Music',
    handle: '@sonymusic',
    time: '1h',
    text: 'BREAKING: Sony Music artists lead the pack at the 2026 #GlobalMusicAwards nominations! Read the full press release at <a href="/news">sonymusic.com/news</a>'
  },
  {
    user: 'Epic Records',
    handle: '@Epic_Records',
    time: '3h',
    text: 'Exciting news! We are partnering with International Label Group to develop and elevate new voices globally. 🌍🎙️'
  }
];

export const News: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRelease, setSelectedRelease] = useState<PressRelease | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const filteredReleases = RELEASES.filter((release) => {
    const matchesSearch = release.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          release.snippet.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="subpage-container animate-fade-in">
      <div className="container">
        {/* Page Header */}
        <header className="page-header">
          <h1 className="page-title">Press Releases</h1>
          <p className="page-subtitle">
            Stay up to date with official corporate announcements, business partnerships, executive appointments, and artist announcements.
          </p>
          <div className="page-header-underline"></div>
        </header>

        {/* Two-Column Grid */}
        <div className="subpage-grid">
          {/* Main news/stories list */}
          <main style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Search Bar */}
            <div className="filter-bar-container" style={{ justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
              <div className="search-input-wrapper">
                <Search className="search-icon-pos" size={18} />
                <input
                  type="text"
                  placeholder="Search press releases..."
                  className="search-field"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Releases list */}
            {filteredReleases.length > 0 ? (
              <div className="news-list">
                {filteredReleases.map((release) => (
                  <article key={release.id} className="news-item">
                    <div className="news-date">{release.date}</div>
                    <h2 className="news-title" style={{ fontSize: '1.35rem' }}>{release.title}</h2>
                    <p className="news-snippet">{release.snippet}</p>
                    <button 
                      className="read-more-link" 
                      style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer', alignSelf: 'flex-start' }}
                      onClick={() => setSelectedRelease(release)}
                    >
                      Read Full Release »
                    </button>
                  </article>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
                No press releases found matching your search.
              </div>
            )}
          </main>

          {/* Sidebar */}
          <aside className="sidebar-column">
            {/* Social Feed Widget */}
            <div className="twitter-widget">
              <div className="twitter-header">
                <div className="twitter-title">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  Social Feed
                </div>
                <span className="twitter-handle">@sonymusic</span>
              </div>
              <div className="twitter-feed">
                {TWEETS.map((tweet, idx) => (
                  <div key={idx} className="tweet">
                    <div className="tweet-header">
                      <span style={{ color: 'var(--color-text-dark)', fontWeight: 700 }}>{tweet.user}</span>
                      <span>{tweet.time}</span>
                    </div>
                    <div 
                      className="tweet-text" 
                      dangerouslySetInnerHTML={{ __html: tweet.text }}
                    ></div>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '4px', color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><MessageSquare size={12} /> 4</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><RefreshCw size={12} /> 8</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Heart size={12} /> 36</span>
                    </div>
                  </div>
                ))}
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
                  Press Briefing: Sony Music Global Impact Report
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Reader Modal */}
      {selectedRelease && (
        <div className="reader-modal-overlay" onClick={() => setSelectedRelease(null)}>
          <div className="reader-modal-content animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <button className="reader-modal-close" onClick={() => setSelectedRelease(null)}>
              <X size={20} />
            </button>
            <div className="reader-modal-body">
              <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-brand-red)' }}>
                Official Press Release • {selectedRelease.date}
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-text-dark)' }}>
                {selectedRelease.title}
              </h2>
              <div className="reader-modal-text">
                <p><strong>NEW YORK, NY — {selectedRelease.date}</strong> — {selectedRelease.content}</p>
                <p style={{ marginTop: '1.5rem', borderTop: '1px solid #eee', paddingTop: '1.5rem', fontSize: '0.82rem', color: '#666' }}>
                  <strong>About Sony Music Entertainment:</strong><br />
                  At Sony Music Entertainment, we honor the artistic vision of our creators and partner with them to bring their music to audiences worldwide. We operate globally through dynamic record labels and divisions, fostering innovation, diversity, and social responsibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <VideoLightbox 
        isOpen={lightboxOpen} 
        videoTitle="Press Briefing: Sony Music Global Impact Report" 
        videoUrl="https://www.youtube.com/embed/j38Tz4L_b3k" 
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
};
