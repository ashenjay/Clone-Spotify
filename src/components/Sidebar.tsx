import React from 'react';
import { Home, Search, Library, Plus, ArrowRight } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-[350px] bg-black p-6">
      <nav className="space-y-6">
        <div className="bg-zinc-900 rounded-lg p-4 space-y-4">
          <a href="#" className="flex items-center gap-4 text-sm font-semibold text-zinc-200 hover:text-white">
            <Home className="w-6 h-6" />
            Home
          </a>
          <a href="#" className="flex items-center gap-4 text-sm font-semibold text-zinc-200 hover:text-white">
            <Search className="w-6 h-6" />
            Search
          </a>
        </div>

        <div className="bg-zinc-900 rounded-lg p-4 flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Library className="w-6 h-6 text-zinc-200" />
              <span className="font-semibold text-zinc-200">Your Library</span>
            </div>
            <div className="flex items-center gap-3">
              <Plus className="w-5 h-5 text-zinc-200 hover:text-white cursor-pointer" />
              <ArrowRight className="w-5 h-5 text-zinc-200 hover:text-white cursor-pointer" />
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {['Liked Songs', 'Daily Mix 1', 'Discover Weekly', 'Top Hits 2024'].map((playlist) => (
              <div key={playlist} className="group flex items-center gap-4 cursor-pointer hover:bg-zinc-800 rounded p-2">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-700 to-blue-300 rounded flex items-center justify-center">
                  <Library className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-zinc-200 group-hover:text-white">{playlist}</p>
                  <p className="text-sm text-zinc-400">Playlist • Spotify</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}