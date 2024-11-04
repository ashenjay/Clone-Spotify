import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TrackCard from './TrackCard';
import { tracks } from '../data/tracks';

export default function MainContent() {
  return (
    <main className="flex-1 bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-y-auto">
      <header className="flex items-center justify-between px-8 py-4 sticky top-0 bg-zinc-800/75 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button className="rounded-full bg-black/40 p-2">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="rounded-full bg-black/40 p-2">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm font-semibold hover:text-white">Sign up</button>
          <button className="bg-white text-black px-8 py-2 rounded-full font-semibold hover:scale-105 transition">
            Log in
          </button>
        </div>
      </header>

      <div className="px-8 py-6">
        <h1 className="text-3xl font-bold mb-6">Good afternoon</h1>
        
        <div className="grid grid-cols-3 gap-4 mb-8">
          {tracks.map((track) => (
            <TrackCard key={track.id} track={track} variant="compact" />
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-6">Made for you</h2>
        <div className="grid grid-cols-5 gap-6">
          {tracks.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </div>
    </main>
  );
}