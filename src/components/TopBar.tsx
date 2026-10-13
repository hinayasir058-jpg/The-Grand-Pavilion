import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface TopBarProps {
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenInfo: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ isMuted, onToggleMute, onOpenInfo }) => {
  return (
    <header className="relative z-40 border-b border-stone-800/80 bg-stone-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="/"
          className="text-lg md:text-xl font-serif font-medium tracking-wide text-stone-100 hover:text-amber-200 transition-colors whitespace-nowrap shrink-0"
        >
          The Sovereign Pavilion
        </a>

        {/* Zone 2: 4-5 single-line clean text links */}
        <nav className="hidden md:flex items-center gap-7 text-xs tracking-wider uppercase font-medium text-stone-400">
          <a
            href="#atmosphere-stage"
            className="hover:text-stone-100 transition-colors whitespace-nowrap shrink-0"
          >
            Atmosphere
          </a>
          <a
            href="#stage-specs"
            className="hover:text-stone-100 transition-colors whitespace-nowrap shrink-0"
          >
            Specifications
          </a>
          <a
            href="#programme"
            className="hover:text-stone-100 transition-colors whitespace-nowrap shrink-0"
          >
            Ceremonies
          </a>
          <a
            href="#curatorial-notes"
            className="hover:text-stone-100 transition-colors whitespace-nowrap shrink-0"
          >
            Archive
          </a>
        </nav>

        {/* Zone 3: 1 primary action button (with compact audio toggle affordance) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleMute}
            aria-label={isMuted ? 'Unmute atmospheric audio' : 'Mute atmospheric audio'}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-400 hover:text-stone-200 border border-stone-800 hover:border-stone-700 bg-stone-900/60 rounded-md transition-all whitespace-nowrap shrink-0"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-300/80" />}
            <span className="hidden sm:inline">{isMuted ? 'Muted' : 'Audio On'}</span>
          </button>

          <button
            onClick={onOpenInfo}
            className="px-4 py-2 text-xs tracking-wide uppercase font-medium text-stone-950 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 hover:from-amber-100 hover:to-amber-200 rounded-md shadow-sm transition-all whitespace-nowrap shrink-0 font-sans"
          >
            Protocol Guide
          </button>
        </div>
      </div>
    </header>
  );
};
