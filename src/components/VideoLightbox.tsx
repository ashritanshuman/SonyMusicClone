// src/components/VideoLightbox.tsx
import React, { useEffect } from 'react';
import { X, PlayCircle } from 'lucide-react';
import '../styles/Lightbox.css';

interface VideoLightboxProps {
  isOpen: boolean;
  videoTitle: string;
  videoUrl: string;
  onClose: () => void;
}

export const VideoLightbox: React.FC<VideoLightboxProps> = ({ isOpen, videoTitle, videoUrl, onClose }) => {
  // Listen for ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Determine if it's a valid youtube/vimeo link
  const isEmbeddable = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') || videoUrl.includes('vimeo.com') || videoUrl.startsWith('http');

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content animate-scale-in" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="lightbox-header">
          <div className="lightbox-title">{videoTitle}</div>
          <button className="lightbox-close-btn" onClick={onClose} title="Close Video">
            <X size={20} />
          </button>
        </div>

        {/* Video Wrapper */}
        <div className="lightbox-video-wrapper">
          {isEmbeddable ? (
            <iframe 
              src={`${videoUrl}?autoplay=1`} 
              title={videoTitle} 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          ) : (
            <div className="mock-player">
              <div className="mock-player-spinner"></div>
              <PlayCircle size={48} style={{ color: 'var(--color-brand-red)' }} />
              <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>Streaming Feature Video...</div>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
                This is a mock player loading: {videoUrl}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
