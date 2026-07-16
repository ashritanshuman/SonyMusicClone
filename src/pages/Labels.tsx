// src/pages/Labels.tsx
import React, { useState } from 'react';
import { ExternalLink, Search } from 'lucide-react';
import '../styles/Pages.css';

interface Label {
  id: number;
  name: string;
  desc: string;
  roster: string[];
  siteUrl: string;
}

const LABELS_DATA: Label[] = [
  {
    id: 1,
    name: 'Columbia Records',
    desc: 'One of the most storied and successful record labels in history, Columbia Records is home to superstars like Beyoncé, Adele, Harry Styles, Lil Nas X, and Bob Dylan.',
    roster: ['Beyoncé', 'Adele', 'Harry Styles', 'Bob Dylan'],
    siteUrl: 'https://www.columbiarecords.com/'
  },
  {
    id: 2,
    name: 'RCA Records',
    desc: 'A cornerstone of American music representing diverse genres. RCA roster features icons and breaking talent including SZA, Khalid, Doja Cat, Foo Fighters, and Justin Timberlake.',
    roster: ['SZA', 'Khalid', 'Doja Cat', 'Foo Fighters'],
    siteUrl: 'https://www.rcarecords.com/'
  },
  {
    id: 3,
    name: 'Epic Records',
    desc: 'Known as the home to monumental pop, hip-hop and R&B releases. Epic represents Travis Scott, Future, 21 Savage, Giveon, Madison Beer, and legendary catalogs like Michael Jackson.',
    roster: ['Travis Scott', 'Future', '21 Savage', 'Michael Jackson'],
    siteUrl: 'https://www.epicrecords.com/'
  },
  {
    id: 4,
    name: 'Arista Records',
    desc: 'Steeped in history and reimagined for the modern era. Arista develops pioneering talent spanning alternative, pop, electronic and indie music worldwide.',
    roster: ['Måneskin', 'JP Saxe', 'Tai Verdes', 'Lola Brooke'],
    siteUrl: 'https://www.aristarecords.com/'
  },
  {
    id: 5,
    name: 'AWAL',
    desc: 'A premium artist services division providing independent creators with global distribution, marketing, funding, playlisting, and analytics without losing creative rights.',
    roster: ['Lauv', 'Jungle', 'Little Simz', 'Gerry Cinnamon'],
    siteUrl: 'https://www.awal.com/'
  },
  {
    id: 6,
    name: 'Legacy Recordings',
    desc: 'The catalog division of Sony Music Entertainment, dedicated to preserving, promoting, and curating classic recordings from historic masters across all musical eras.',
    roster: ['Elvis Presley', 'Michael Jackson', 'Jimi Hendrix', 'Johnny Cash'],
    siteUrl: 'https://www.legacyrecordings.com/'
  },
  {
    id: 7,
    name: 'Alamo Records',
    desc: 'A premier independent hip-hop and alternative record label founded by Todd Moscowitz, representing chart-topping talent like Lil Durk, Rod Wave, and Hotboii.',
    roster: ['Lil Durk', 'Rod Wave', 'Hotboii'],
    siteUrl: 'https://alamorecords.com/'
  },
  {
    id: 8,
    name: 'Som Livre',
    desc: 'The leading domestic record label in Brazil, developing local genres like Sertanejo, Pagode, and Brazilian Pop, and fostering South American musical culture.',
    roster: ['Luan Santana', 'Jorge & Mateus', 'Marília Mendonça'],
    siteUrl: 'https://somlivre.com.br/'
  },
  {
    id: 9,
    name: 'Ministry of Sound',
    desc: 'A legendary London-based dance music brand and record label, championing club-focused electronic anthems and major global dance floor remixes.',
    roster: ['Regard', 'Riton', 'Sigala', 'LF System'],
    siteUrl: 'https://www.ministryofsound.com/'
  }
];

export const Labels: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLabels = LABELS_DATA.filter((label) => {
    const matchesSearch = label.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          label.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          label.roster.some(artist => artist.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  return (
    <div className="subpage-container animate-fade-in">
      <div className="container">
        {/* Page Header */}
        <header className="page-header">
          <h1 className="page-title">Labels & Divisions</h1>
          <p className="page-subtitle">
            Sony Music Entertainment operates through various highly active record labels and business divisions, bringing music to fans globally.
          </p>
          <div className="page-header-underline"></div>
        </header>

        {/* Search Bar */}
        <div className="filter-bar-container" style={{ justifyContent: 'flex-end' }}>
          <div className="search-input-wrapper">
            <Search className="search-icon-pos" size={18} />
            <input
              type="text"
              placeholder="Search labels or artists..."
              className="search-field"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Labels Grid */}
        {filteredLabels.length > 0 ? (
          <div className="labels-grid">
            {filteredLabels.map((label) => (
              <div key={label.id} className="label-profile-card">
                <div className="label-card-logo-box">
                  {label.name.split(' ')[0]} {/* Abbreviated logo mock */}
                </div>
                <div className="label-card-content">
                  <h2 className="label-card-title">{label.name}</h2>
                  <p className="label-card-desc">{label.desc}</p>
                  
                  <div style={{ marginTop: 'auto' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-text-dark)', marginBottom: '6px' }}>
                      NOTABLE ROSTER:
                    </div>
                    <div className="label-card-artists-list">
                      {label.roster.map((artist, idx) => (
                        <span key={idx} className="label-artist-pill">
                          {artist}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="label-card-footer">
                  <a href={label.siteUrl} target="_blank" rel="noopener noreferrer" className="label-footer-link">
                    Visit Official Label Site <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
            No labels found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};
