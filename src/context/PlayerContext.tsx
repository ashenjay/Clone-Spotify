import React, { createContext, useContext, useState, useRef } from 'react';

interface PlayerContextType {
  isPlaying: boolean;
  currentTrack: Track | null;
  play: (track: Track) => void;
  pause: () => void;
  toggle: () => void;
  progress: number;
  currentTime: number;
  duration: number;
  volume: number;
  setVolume: (value: number) => void;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  image: string;
  audioUrl: string;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = (track: Track) => {
    if (currentTrack?.id !== track.id) {
      setCurrentTrack(track);
      if (!audioRef.current) {
        audioRef.current = new Audio(track.audioUrl);
        audioRef.current.addEventListener('timeupdate', () => {
          if (audioRef.current) {
            setProgress(audioRef.current.currentTime / audioRef.current.duration);
            setCurrentTime(audioRef.current.currentTime);
          }
        });
        audioRef.current.addEventListener('loadedmetadata', () => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration);
          }
        });
      } else {
        audioRef.current.src = track.audioUrl;
      }
      audioRef.current.volume = volume;
    }
    audioRef.current?.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const toggle = () => {
    if (isPlaying) {
      pause();
    } else if (currentTrack) {
      play(currentTrack);
    }
  };

  const handleVolumeChange = (value: number) => {
    const newVolume = Math.max(0, Math.min(1, value));
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <PlayerContext.Provider 
      value={{ 
        isPlaying, 
        currentTrack, 
        play, 
        pause, 
        toggle, 
        progress,
        currentTime,
        duration,
        volume,
        setVolume: handleVolumeChange
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}