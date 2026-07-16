// src/hooks/useMusicPlayer.tsx
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

export interface Track {
  title: string;
  artist: string;
  url: string;
  coverUrl: string;
}

const DEFAULT_TRACKS: Track[] = [
  {
    title: 'Water',
    artist: 'Tyla',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Sample royalty-free
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=150&auto=format&fit=crop&q=60'
  },
  {
    title: 'TEXAS HOLD \'EM',
    artist: 'Beyoncé',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=150&auto=format&fit=crop&q=60'
  },
  {
    title: 'FE!N',
    artist: 'Travis Scott',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150&auto=format&fit=crop&q=60'
  },
  {
    title: 'Flowers',
    artist: 'Miley Cyrus',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&auto=format&fit=crop&q=60'
  },
  {
    title: 'Easy On Me',
    artist: 'Adele',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=150&auto=format&fit=crop&q=60'
  }
];

interface MusicPlayerContextType {
  tracks: Track[];
  currentTrack: Track;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  playTrack: (index: number) => void;
  playArtistTrack: (artistName: string) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setVolume: (val: number) => void;
  toggleMute: () => void;
  setProgress: (percent: number) => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined);

export const MusicPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Setup audio element
  useEffect(() => {
    audioRef.current = new Audio(DEFAULT_TRACKS[currentTrackIndex].url);
    audioRef.current.volume = volume;

    const handleTimeUpdate = () => {
      if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
      if (audioRef.current) setDuration(audioRef.current.duration);
    };

    const handleEnded = () => {
      nextTrack();
    };

    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
    audioRef.current.addEventListener('ended', handleEnded);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audioRef.current.removeEventListener('ended', handleEnded);
      }
    };
  }, []);

  // Sync volume state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Handle track changing
  useEffect(() => {
    if (audioRef.current) {
      const wasPlaying = isPlaying;
      audioRef.current.pause();
      audioRef.current.src = DEFAULT_TRACKS[currentTrackIndex].url;
      audioRef.current.load();
      
      // Update time immediately on source change
      setCurrentTime(0);
      setDuration(0);

      if (wasPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.log('Audio playback failed', err);
          setIsPlaying(false);
        });
      }
    }
  }, [currentTrackIndex]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log('Audio playback failed', err);
      });
    }
  };

  const playTrack = (index: number) => {
    if (index >= 0 && index < DEFAULT_TRACKS.length) {
      setCurrentTrackIndex(index);
      setIsPlaying(true);
      // Timeout to wait for source update
      setTimeout(() => {
        audioRef.current?.play().catch(e => console.log(e));
      }, 50);
    }
  };

  const playArtistTrack = (artistName: string) => {
    const idx = DEFAULT_TRACKS.findIndex(
      (t) => t.artist.toLowerCase() === artistName.toLowerCase()
    );
    if (idx !== -1) {
      playTrack(idx);
    } else {
      // Default to first track if not found
      playTrack(0);
    }
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DEFAULT_TRACKS.length);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DEFAULT_TRACKS.length) % DEFAULT_TRACKS.length);
  };

  const setVolume = (val: number) => {
    const cleanVal = Math.max(0, Math.min(1, val));
    setVolumeState(cleanVal);
    if (cleanVal > 0) setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const setProgress = (percent: number) => {
    if (audioRef.current && duration > 0) {
      const newTime = (percent / 100) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        tracks: DEFAULT_TRACKS,
        currentTrack: DEFAULT_TRACKS[currentTrackIndex],
        isPlaying,
        volume,
        isMuted,
        currentTime,
        duration,
        playTrack,
        playArtistTrack,
        togglePlay,
        nextTrack,
        prevTrack,
        setVolume,
        toggleMute,
        setProgress
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return context;
};
