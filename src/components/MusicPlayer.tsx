// src/components/MusicPlayer.tsx
import React, { useState } from 'react';
import { useMusicPlayer } from '../hooks/useMusicPlayer';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Minimize2, Disc } from 'lucide-react';
import '../styles/MusicPlayer.css';

export const MusicPlayer: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    volume,
    isMuted,
    currentTime,
    duration,
    togglePlay,
    nextTrack,
    prevTrack,
    setVolume,
    toggleMute,
    setProgress
  } = useMusicPlayer();

  const [minimized, setMinimized] = useState(true); // Minimized by default so it doesn't clutter

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = (clickX / width) * 100;
    setProgress(percentage);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (minimized) {
    return (
      <div 
        className="music-player-widget minimized" 
        onClick={() => setMinimized(false)}
        title="Open Sony Music Player"
      >
        <div className="minimized-trigger">
          <img src={currentTrack.coverUrl} alt="Album Cover" className="minimized-cover" />
          <div className="minimized-overlay">
            <Disc className={`control-btn ${isPlaying ? 'pulse-animation' : ''}`} size={24} style={{ color: isPlaying ? 'var(--color-brand-red)' : 'white' }} />
            <div className={`audio-wave minimized-equalizer ${!isPlaying ? 'paused' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="music-player-widget animate-scale-in">
      {/* Header */}
      <div className="player-header">
        <div className="player-title">
          <div className={`audio-wave ${!isPlaying ? 'paused' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          Sony Music player
        </div>
        <div className="player-header-actions">
          <button className="player-action-btn" onClick={() => setMinimized(true)} title="Minimize Player">
            <Minimize2 size={16} />
          </button>
        </div>
      </div>

      {/* Track Details */}
      <div className="player-track-info">
        <img src={currentTrack.coverUrl} alt={currentTrack.title} className="track-cover" />
        <div className="track-details">
          <div className="track-title">{currentTrack.title}</div>
          <div className="track-artist">{currentTrack.artist}</div>
        </div>
      </div>

      {/* Controls */}
      <div className="player-controls">
        <button className="control-btn" onClick={prevTrack} title="Previous Track">
          <SkipBack size={20} />
        </button>
        <button className="control-btn play-pause" onClick={togglePlay} title={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? <Pause size={22} fill="white" /> : <Play size={22} fill="white" style={{ marginLeft: '2px' }} />}
        </button>
        <button className="control-btn" onClick={nextTrack} title="Next Track">
          <SkipForward size={20} />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="player-progress-bar">
        <div className="progress-slider-container" onClick={handleProgressClick}>
          <div className="progress-fill" style={{ width: `${progressPercent}%` }}>
            <span className="progress-handle"></span>
          </div>
        </div>
        <div className="player-time">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration || 30)}</span> {/* Standard preview duration */}
        </div>
      </div>

      {/* Footer controls (Volume) */}
      <div className="player-footer">
        <div className="volume-control">
          <button className="control-btn" onClick={toggleMute} title={isMuted ? 'Unmute' : 'Mute'}>
            {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={isMuted ? 0 : volume} 
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="volume-slider"
          />
        </div>
        <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>PREVIEW</span>
      </div>
    </div>
  );
};
