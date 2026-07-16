// src/pages/Artists.tsx
import React, { useState } from 'react';
import { useMusicPlayer } from '../hooks/useMusicPlayer';
import { Play, ExternalLink, Search } from 'lucide-react';
import '../styles/Pages.css';

interface Artist {
  id: number;
  name: string;
  genre: string;
  photoUrl: string;
  siteUrl: string;
}

const ARTISTS_DATA: Artist[] = [
  {
    id: 1,
    name: 'Tyla',
    genre: 'R&B / Afro-pop',
    photoUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=480&auto=format&fit=crop&q=60',
    siteUrl: 'https://tyla.world/'
  },
  {
    id: 2,
    name: 'Beyoncé',
    genre: 'Pop / R&B',
    photoUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=480&auto=format&fit=crop&q=60',
    siteUrl: 'https://www.beyonce.com/'
  },
  {
    id: 3,
    name: 'Travis Scott',
    genre: 'Hip-Hop',
    photoUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=480&auto=format&fit=crop&q=60',
    siteUrl: 'https://www.travisscott.com/'
  },
  {
    id: 4,
    name: 'Luke Combs',
    genre: 'Country',
    photoUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=480&auto=format&fit=crop&q=60',
    siteUrl: 'https://www.lukecombs.com/'
  },
  {
    id: 5,
    name: 'Miley Cyrus',
    genre: 'Pop / Rock',
    photoUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=480&auto=format&fit=crop&q=60',
    siteUrl: 'https://www.mileycyrus.com/'
  },
  {
    id: 6,
    name: 'Adele',
    genre: 'Pop / Soul',
    photoUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=480&auto=format&fit=crop&q=60',
    siteUrl: 'https://www.adele.com/'
  },
  {
    id: 7,
    name: 'Khalid',
    genre: 'R&B / Pop',
    photoUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=480&auto=format&fit=crop&q=60',
    siteUrl: 'https://www.khalidofficial.com/'
  },
  {
    id: 8,
    name: 'Foo Fighters',
    genre: 'Rock',
    photoUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=480&auto=format&fit=crop&q=60',
    siteUrl: 'https://www.foofighters.com/'
  },
  {
    id: 9,
    name: 'SZA',
    genre: 'R&B',
    photoUrl: 'https://images.unsplash.com/photo-1487180142328-054b783fc471?w=480&auto=format&fit=crop&q=60',
    siteUrl: 'https://szaszam.com/'
  }
];

const GENRES = ['All', 'Pop', 'Hip-Hop', 'Country', 'R&B', 'Rock'];

export const Artists: React.FC = () => {
  const { playArtistTrack } = useMusicPlayer();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');

  const filteredArtists = ARTISTS_DATA.filter((artist) => {
    const matchesSearch = artist.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || artist.genre.toLowerCase().includes(selectedGenre.toLowerCase());
    return matchesSearch && matchesGenre;
  });

  const handlePlayPreview = (e: React.MouseEvent, artistName: string) => {
    e.stopPropagation();
    playArtistTrack(artistName);
  };

  return (
    <div className="subpage-container animate-fade-in">
      <div className="container">
        {/* Page Title */}
        <header className="page-header">
          <h1 className="page-title">Featured Artists</h1>
          <p className="page-subtitle">
            Sony Music Entertainment is home to many of the world's most iconic and talented artists. Browse a selection of our featured roster.
          </p>
          <div className="page-header-underline"></div>
        </header>

        {/* Filter and Search Bar */}
        <div className="filter-bar-container">
          {/* Category Filters */}
          <div className="category-filter-tags">
            {GENRES.map((genre) => (
              <button
                key={genre}
                className={`filter-tag ${selectedGenre === genre ? 'active' : ''}`}
                onClick={() => setSelectedGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="search-input-wrapper">
            <Search className="search-icon-pos" size={18} />
            <input
              type="text"
              placeholder="Search artists..."
              className="search-field"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Artists Photo Grid */}
        {filteredArtists.length > 0 ? (
          <div className="artists-grid">
            {filteredArtists.map((artist) => (
              <div key={artist.id} className="artist-photo-card" onClick={(e) => handlePlayPreview(e, artist.name)}>
                <img src={artist.photoUrl} alt={artist.name} className="artist-card-bg-img" />
                <div className="artist-card-vignette"></div>
                <div className="artist-card-info-bar">
                  <div className="artist-card-title">{artist.name}</div>
                  <div className="artist-card-genre">{artist.genre}</div>
                  
                  <div className="artist-card-hover-actions">
                    <button className="artist-card-btn" onClick={(e) => handlePlayPreview(e, artist.name)}>
                      <Play size={12} fill="currentColor" /> Play Preview
                    </button>
                    <a 
                      href={artist.siteUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="artist-card-btn secondary-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Official Site <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
            No artists found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};
