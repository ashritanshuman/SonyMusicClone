// src/pages/InsideSony.tsx
import React, { useState } from 'react';
import { Search, X, MessageSquare, Heart, RefreshCw, Play } from 'lucide-react';
import { VideoLightbox } from '../components/VideoLightbox';
import '../styles/Pages.css';

interface EditorialStory {
  id: number;
  date: string;
  category: string;
  title: string;
  snippet: string;
  content: string;
  imageUrl: string;
}

const STORIES: EditorialStory[] = [
  {
    id: 1,
    date: 'June 28, 2026',
    category: 'Features',
    title: 'Behind the Beat: Inside the Creative Process of Tyla\'s Debut Album',
    snippet: 'We sit down with producers and sound engineers to explore how Johannesburg rhythms fused with contemporary R&B to craft a new global pop sound.',
    content: 'Tyla\'s self-titled debut album is a masterpiece of cultural fusion. In this feature, we delve into the production rooms where Amapiano beats met classic American R&B vocal stacks. Producers share how the lead single "Water" was layered, explaining the choice of log drum basslines, syncopated shaker patterns, and airy synth pads. Sound engineers describe the challenges of mixing vocals to stand out above deep bass kicks, creating an immersive acoustic experience that has captivated listeners worldwide from Lagos to Los Angeles. Tyla herself reflects on bringing her authentic home-grown roots to the absolute peak of the billboard charts.',
    imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=480&auto=format&fit=crop&q=60'
  },
  {
    id: 2,
    date: 'June 18, 2026',
    category: 'Podcasts',
    title: 'Sony Music Launches "Vinyl Revival" Podcast Series',
    snippet: 'A new weekly audio series exploring the historical production, cover art designs, and collector culture surrounding classic vinyl albums.',
    content: 'Sony Music Podcasts is proud to present "Vinyl Revival", a new 10-episode audio documentary. Hosted by veteran music journalist Marcus Vance, each episode examines one iconic album from our catalog (such as Miles Davis\'s "Kind of Blue" or Bruce Springsteen\'s "Born to Run"). We interview original mastering engineers, album artwork designers, and famous collectors. Listeners will hear about the shift from mono to stereo recording, the artistic risks behind cover designs, and why analog vinyl continues to experience a massive resurgence in the digital era. Available on all streaming platforms starting this Tuesday.',
    imageUrl: 'https://images.unsplash.com/photo-1487180142328-054b783fc471?w=480&auto=format&fit=crop&q=60'
  },
  {
    id: 3,
    date: 'June 10, 2026',
    category: 'Innovation',
    title: 'Sony Music Technology Labs Pilots New Dolby Atmos Mixing Suites',
    snippet: 'Expanding spatial audio production for legacy catalog albums and upcoming artist releases in London and Tokyo studios.',
    content: 'As part of our commitment to audio innovation, Sony Music has completed the construction of four state-of-the-art Dolby Atmos mixing suites in our London and Tokyo production centers. These rooms are built from the ground up for spatial audio, featuring 9.1.4 speaker arrays calibrated to capture absolute acoustic purity. In the pilot phase, mastering engineers are remixing seminal albums from our rock and classical catalogs, giving listeners the sensation of standing directly in the center of the recording room. In addition, all major upcoming releases will be mixed in Dolby Atmos natively, ushering in the next generation of high-fidelity auditory experiences.',
    imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=480&auto=format&fit=crop&q=60'
  }
];

const TWEETS = [
  {
    user: 'Sony Music',
    handle: '@sonymusic',
    time: '4h',
    text: 'Amapiano meets R&B. Go behind the scenes of @Tyllaaaa\'s self-titled debut in our latest feature story! 🇿🇦✨ read more at: <a href="/inside-sony-music">sonymusic.com/stories</a>'
  },
  {
    user: 'Sony Music Podcasts',
    handle: '@sonymusicpod',
    time: '12h',
    text: 'Dust off your turntables! 🎚️ Vinyl Revival Episode 1 is live, diving deep into the making of Miles Davis\'s "Kind of Blue". Link in bio!'
  }
];

export const InsideSony: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStory, setSelectedStory] = useState<EditorialStory | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const filteredStories = STORIES.filter((story) => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          story.snippet.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          story.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="subpage-container animate-fade-in">
      <div className="container">
        {/* Page Header */}
        <header className="page-header">
          <h1 className="page-title">Inside Sony Music</h1>
          <p className="page-subtitle">
            Discover original features, artist interviews, technological innovations, and deep-dives into our podcast and video series.
          </p>
          <div className="page-header-underline"></div>
        </header>

        {/* Two-Column Grid */}
        <div className="subpage-grid">
          {/* Main news/stories list */}
          <main style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Search Bar */}
            <div className="filter-bar-container" style={{ justifyContent: 'flex-end', marginBottom: '2rem' }}>
              <div className="search-input-wrapper">
                <Search className="search-icon-pos" size={18} />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="search-field"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Articles Grid */}
            {filteredStories.length > 0 ? (
              <div className="news-cards-grid">
                {filteredStories.map((story) => (
                  <article key={story.id} className="news-card" style={{ cursor: 'pointer' }} onClick={() => setSelectedStory(story)}>
                    <div className="news-card-img-box">
                      <img src={story.imageUrl} alt={story.title} className="news-card-img" />
                    </div>
                    <div className="news-card-body">
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-brand-red)' }}>
                        <span>{story.category}</span>
                        <span style={{ color: 'var(--color-text-muted)' }}>{story.date}</span>
                      </div>
                      <h2 className="news-title" style={{ fontSize: '1.15rem' }}>{story.title}</h2>
                      <p className="news-snippet" style={{ fontSize: '0.88rem' }}>{story.snippet}</p>
                      <button 
                        className="read-more-link" 
                        style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer', marginTop: 'auto', alignSelf: 'flex-start' }}
                        onClick={(e) => { e.stopPropagation(); setSelectedStory(story); }}
                      >
                        Read Full Story »
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
                No stories found matching your criteria.
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
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><MessageSquare size={12} /> 6</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><RefreshCw size={12} /> 12</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Heart size={12} /> 44</span>
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
                    src="https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=480&auto=format&fit=crop&q=60" 
                    alt="Sony Music Spotlight" 
                    className="video-thumbnail" 
                  />
                  <div className="video-play-overlay">
                    <Play size={36} className="play-icon-svg" fill="rgba(255,255,255,0.2)" />
                  </div>
                </div>
                <div className="video-info-card" style={{ padding: '0.75rem 1rem', fontSize: '0.85rem' }}>
                  Behind the Glass: Spatial Audio Mixing Suite tour
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Modal Reader */}
      {selectedStory && (
        <div className="reader-modal-overlay" onClick={() => setSelectedStory(null)}>
          <div className="reader-modal-content animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <button className="reader-modal-close" onClick={() => setSelectedStory(null)}>
              <X size={20} />
            </button>
            <div className="reader-modal-body">
              <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-brand-red)' }}>
                {selectedStory.category} • {selectedStory.date}
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-text-dark)' }}>
                {selectedStory.title}
              </h2>
              <img 
                src={selectedStory.imageUrl} 
                alt={selectedStory.title} 
                style={{ width: '100%', height: '320px', objectFit: 'cover', borderRadius: '8px', margin: '0.5rem 0' }} 
              />
              <div className="reader-modal-text">
                <p>{selectedStory.content}</p>
                <p style={{ marginTop: '1rem' }}>
                  To keep up with the latest stories and technological developments, sign up for our corporate newsletter or follow us on our social platforms @sonymusic.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <VideoLightbox 
        isOpen={lightboxOpen} 
        videoTitle="Behind the Glass: Spatial Audio Mixing Suite tour" 
        videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ" 
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
};
