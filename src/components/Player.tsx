import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Mic2, ListMusic, Laptop2, Volume2, VolumeX, Volume1, Maximize2 } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export default function Player() {
  const { isPlaying, currentTrack, toggle, progress, currentTime, duration, volume, setVolume } = usePlayer();

  if (!currentTrack) return null;

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    setVolume(percentage);
  };

  const VolumeIcon = () => {
    if (volume === 0) return <VolumeX />;
    if (volume < 0.5) return <Volume1 />;
    return <Volume2 />;
  };

  const toggleMute = () => {
    setVolume(volume === 0 ? 1 : 0);
  };

  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img 
            src={currentTrack.image}
            alt={currentTrack.title}
            className="w-14 h-14 rounded"
          />
          <div>
            <h3 className="font-semibold">{currentTrack.title}</h3>
            <p className="text-sm text-zinc-400">{currentTrack.artist}</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-6">
            <Shuffle className="w-5 h-5 text-zinc-200 hover:text-white cursor-pointer" />
            <SkipBack className="w-5 h-5 text-zinc-200 hover:text-white cursor-pointer" />
            <button 
              onClick={toggle}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current" />
              )}
            </button>
            <SkipForward className="w-5 h-5 text-zinc-200 hover:text-white cursor-pointer" />
            <Repeat className="w-5 h-5 text-zinc-200 hover:text-white cursor-pointer" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-400 w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <div className="h-1 rounded-full w-96 bg-zinc-600 group cursor-pointer">
              <div 
                className="bg-zinc-200 h-1 rounded-full transition-all duration-100 group-hover:bg-green-500"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <span className="text-sm text-zinc-400 w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Mic2 className="w-5 h-5 text-zinc-200 hover:text-white cursor-pointer" />
          <ListMusic className="w-5 h-5 text-zinc-200 hover:text-white cursor-pointer" />
          <Laptop2 className="w-5 h-5 text-zinc-200 hover:text-white cursor-pointer" />
          <div className="flex items-center gap-2 group">
            <button onClick={toggleMute} className="focus:outline-none">
              <VolumeIcon />
            </button>
            <div 
              className="h-1 rounded-full w-24 bg-zinc-600 cursor-pointer"
              onClick={handleVolumeChange}
            >
              <div 
                className="bg-zinc-200 h-1 rounded-full group-hover:bg-green-500 transition-all"
                style={{ width: `${volume * 100}%` }}
              />
            </div>
          </div>
          <Maximize2 className="w-5 h-5 text-zinc-200 hover:text-white cursor-pointer" />
        </div>
      </div>
    </footer>
  );
}