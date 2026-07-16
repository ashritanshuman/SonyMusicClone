// src/pages/Home.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from '../hooks/useRouter';
import { useMusicPlayer } from '../hooks/useMusicPlayer';
import { VideoLightbox } from '../components/VideoLightbox';
import { Play, ArrowRight, ChevronLeft, ChevronRight, MessageSquare, Heart, RefreshCw } from 'lucide-react';
import '../styles/Home.css';

interface HeroSlide {
  id: number;
  artist: string;
  tagline: string;
  desc: string;
  bgUrl: string;
}

interface VideoItem {
  id: number;
  title: string;
  url: string;
  thumbUrl: string;
}

interface NewsItem {
  id: number;
  date: string;
  title: string;
  snippet: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    artist: 'Tyla',
    tagline: 'GLOBAL SENSATION',
    desc: 'Stream the self-titled debut album featuring the hit single "Water" and "Truth or Dare" worldwide now.',
    bgUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1200&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    artist: 'Beyoncé',
    tagline: 'ACT II: COWBOY CARTER',
    desc: 'Experience the history-making album featuring the chart-topping singles "TEXAS HOLD \'EM" and "16 CARRIAGES".',
    bgUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    artist: 'Travis Scott',
    tagline: 'UTOPIA WORLD TOUR',
    desc: 'The record-breaking album UTOPIA continues to dominate global charts. Stream the ultimate visual experience.',
    bgUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80'
  },
  {
    id: 4,
    artist: 'Luke Combs',
    tagline: 'FATHERS & SONS',
    desc: 'The award-winning country superstar returns with a deeply personal collection of songs. Out now.',
    bgUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&auto=format&fit=crop&q=80'
  }
];

const LABELS = [
  'Columbia Records', 'RCA Records', 'Epic Records', 'Arista Records', 
  'AWAL', 'Legacy Recordings', 'Alamo Records', 'Sony Music Latin', 
  'Sony Music Podcasts', 'Som Livre', 'Ministry of Sound', 'Masterworks'
];

const VIDEOS: VideoItem[] = [
  {
    id: 1,
    title: 'Tyla - Water (Official Music Video)',
    url: 'https://www.youtube.com/embed/XOiUxQLSgFI',
    thumbUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=480&auto=format&fit=crop&q=60'
  },
  {
    id: 2,
    title: 'Beyoncé - TEXAS HOLD \'EM (Official Visualizer)',
    url: 'https://www.youtube.com/embed/j38Tz4L_b3k',
    thumbUrl: 'https://images.unsplash.com/photo-1487180142328-054b783fc471?w=480&auto=format&fit=crop&q=60'
  },
  {
    id: 3,
    title: 'Travis Scott - FE!N ft. Playboi Carti (Official Audio)',
    url: 'https://www.youtube.com/embed/B9synWjhHCY',
    thumbUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=480&auto=format&fit=crop&q=60'
  },
  {
    id: 4,
    title: 'Miley Cyrus - Flowers (Official Music Video)',
    url: 'https://www.youtube.com/embed/G7KNmW9a75Y',
    thumbUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=480&auto=format&fit=crop&q=60'
  }
];

const NEWS: NewsItem[] = [
  {
    id: 1,
    date: 'July 14, 2026',
    title: 'Sony Music Artists Lead Nominations for the 2026 Global Music Awards',
    snippet: 'With outstanding achievements across Pop, Hip-Hop, and Country categories, Sony Music Entertainment artists have secured major nominations, highlighting a year of unmatched creative excellence.'
  },
  {
    id: 2,
    date: 'July 10, 2026',
    title: 'Epic Records Announces Groundbreaking Partnership with International Label Group',
    snippet: 'Epic Records is expanding its global footprint by launching a joint venture to co-sign, develop, and distribute rising talent across African and European territories.'
  },
  {
    id: 3,
    date: 'July 05, 2026',
    title: 'Sony Music Global Giving Campaign Raises $10M for Community Music Education',
    snippet: 'Through partnerships with non-profits worldwide, the annual initiative funds grants, instruments, and recording studio spaces for underprivileged youth in over 30 countries.'
  }
];

const TWEETS = [
  {
    user: 'Sony Music',
    handle: '@sonymusic',
    time: '2h',
    text: 'History in the making. Congrats to all our artists nominated at this year\'s #GlobalMusicAwards! 🏆 read more at: <a href="/news">sonymusic.com/news</a>'
  },
  {
    user: 'Columbia Records',
    handle: '@ColumbiaRecords',
    time: '5h',
    text: 'Summer vibes are locked in. Check out the latest playlist featuring new tunes from our incredible lineup. 🎧☀️'
  },
  {
    user: 'Sony Music',
    handle: '@sonymusic',
    time: '1d',
    text: 'Music brings us together. This year we funded 15 new youth recording centers around the globe. Thank you to our partners! 🌍❤️'
  }
];

export const Home: React.FC = () => {
  const { navigateTo } = useRouter();
  const { playArtistTrack } = useMusicPlayer();
  const [activeSlide, setActiveSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxVideo, setLightboxVideo] = useState({ title: '', url: '' });

  // Auto-play slider
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleOpenVideo = (video: VideoItem) => {
    setLightboxVideo({ title: video.title, url: video.url });
    setLightboxOpen(true);
  };

  const handleListenClick = (e: React.MouseEvent, artist: string) => {
    e.stopPropagation();
    playArtistTrack(artist);
  };

  return (
    <div className="animate-fade-in" style={{ flex: 1 }}>
      {/* Hero Slider */}
      <section className="hero-slider-section" aria-label="Featured Artists Carousel">
        {HERO_SLIDES.map((slide, idx) => (
          <div 
            key={slide.id} 
            className={`hero-slide ${idx === activeSlide ? 'active' : ''}`}
          >
            <img src={slide.bgUrl} alt={slide.artist} className="hero-slide-bg" />
            <div className="hero-slide-overlay"></div>
            <div className="hero-slide-content">
              <span className="hero-slide-tag">{slide.tagline}</span>
              <h1 className="hero-slide-title">{slide.artist}</h1>
              <p className="hero-slide-desc">{slide.desc}</p>
              <button className="hero-action-btn" onClick={(e) => handleListenClick(e, slide.artist)}>
                <Play size={16} fill="white" /> Listen Preview
              </button>
            </div>
          </div>
        ))}

        <button className="slider-arrow left" onClick={handlePrevSlide} aria-label="Previous Slide">
          <ChevronLeft size={24} />
        </button>
        <button className="slider-arrow right" onClick={handleNextSlide} aria-label="Next Slide">
          <ChevronRight size={24} />
        </button>

        <div className="slider-dots">
          {HERO_SLIDES.map((_, idx) => (
            <button 
              key={idx} 
              className={`slider-dot ${idx === activeSlide ? 'active' : ''}`}
              onClick={() => setActiveSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Labels Marquee */}
      <section className="labels-section">
        <div className="labels-marquee-container">
          <div className="labels-marquee">
            {LABELS.concat(LABELS).map((label, idx) => (
              <div key={idx} className="label-logo-card">
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Page Layout Grid */}
      <div className="container">
        <main className="home-content-grid">
          {/* Main content column */}
          <div className="main-column">
            
            {/* Featured Videos */}
            <section aria-labelledby="featured-videos-title">
              <h2 id="featured-videos-title" className="home-section-title">Featured Videos</h2>
              <div className="videos-grid">
                {VIDEOS.map((video) => (
                  <div key={video.id} className="video-card" onClick={() => handleOpenVideo(video)}>
                    <div className="video-thumbnail-container">
                      <img src={video.thumbUrl} alt={video.title} className="video-thumbnail" />
                      <div className="video-play-overlay">
                        <Play size={44} className="play-icon-svg" fill="rgba(255,255,255,0.2)" />
                      </div>
                    </div>
                    <div className="video-info-card">{video.title}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* News */}
            <section aria-labelledby="latest-news-title">
              <h2 id="latest-news-title" className="home-section-title">Latest Press Releases</h2>
              <div className="news-list">
                {NEWS.map((item) => (
                  <article key={item.id} className="news-item">
                    <div className="news-date">{item.date}</div>
                    <h3 className="news-title">{item.title}</h3>
                    <p className="news-snippet">{item.snippet}</p>
                    <a href="/news" onClick={(e) => { e.preventDefault(); navigateTo('/news'); }} className="read-more-link">
                      Read More <ArrowRight size={14} />
                    </a>
                  </article>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button className="more-news-btn" onClick={() => navigateTo('/news')}>
                  More News »
                </button>
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <aside className="sidebar-column">
            {/* FAQ Box */}
            <div className="faq-callout-box">
              <div className="faq-callout-header">Have a Question?</div>
              <div className="faq-callout-body">
                <ul className="faq-callout-bullets">
                  <li className="faq-callout-bullet">Demo submission procedures</li>
                  <li className="faq-callout-bullet">Careers and internship listings</li>
                  <li className="faq-callout-bullet">Artist royalty query center</li>
                  <li className="faq-callout-bullet">Copyright clearance licensing</li>
                </ul>
                <button className="faq-callout-btn" onClick={() => navigateTo('/faq')}>
                  View Our FAQs »
                </button>
              </div>
            </div>

            {/* Social Feed Mock */}
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
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><MessageSquare size={12} /> 12</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><RefreshCw size={12} /> 48</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Heart size={12} /> 128</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </main>
      </div>

      {/* Lightbox for video playback */}
      <VideoLightbox 
        isOpen={lightboxOpen} 
        videoTitle={lightboxVideo.title} 
        videoUrl={lightboxVideo.url} 
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
};
