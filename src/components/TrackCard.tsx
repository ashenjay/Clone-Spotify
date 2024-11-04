import React from 'react';
import { Play, Pause } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import type { Track } from '../context/PlayerContext';

interface TrackCardProps {
  track: Track;
  variant?: 'large' | 'compact';
}

export default function TrackCard({ track, variant = 'large' }: TrackCardProps) {
  const { isPlaying, currentTrack, play, pause } = usePlayer();
  const isCurrentTrack = currentTrack?.id === track.id;

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isCurrentTrack && isPlaying) {
      pause();
    } else {
      play(track);
    }
  };

  if (variant === 'compact') {
    return (
      <div className="group relative bg-zinc-800/50 rounded-lg flex items-center gap-4 overflow-hidden hover:bg-zinc-800 transition-colors">
        <img src={track.image} alt={track.title} className="w-20 h-20 object-cover" />
        <span className="font-semibold">{track.title}</span>
        <button
          onClick={handlePlayClick}
          className="absolute right-4 w-12 h-12 flex items-center justify-center rounded-full bg-green-500 text-black opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all shadow-lg"
        >
          {isCurrentTrack && isPlaying ? (
            <Pause className="w-6 h-6 fill-current" />
          ) : (
            <Play className="w-6 h-6 fill-current" />
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-zinc-800/40 p-4 rounded-lg hover:bg-zinc-800 transition-colors group">
      <div className="relative aspect-square mb-4">
        <img 
          src={track.image}
          alt={track.title}
          className="w-full h-full object-cover rounded-md"
        />
        <button
          onClick={handlePlayClick}
          className="absolute right-2 bottom-2 w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-black opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all shadow-lg"
        >
          {isCurrentTrack && isPlaying ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 fill-current" />
          )}
        </button>
      </div>
      <h3 className="font-semibold mb-2">{track.title}</h3>
      <p className="text-sm text-zinc-400">{track.artist}</p>
    </div>
  );
}