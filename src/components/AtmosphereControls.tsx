import React from 'react';
import { Snowflake, Sparkles, Wind, RotateCcw } from 'lucide-react';
import { StageAmbienceTheme } from '../types/atmosphere';

// Custom Medium Balloon Icon SVG
const BalloonIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 2a7 7 0 0 0-7 7c0 5 7 10 7 10s7-5 7-10a7 7 0 0 0-7-7z" />
    <path d="M12 19v3" />
    <path d="M10 22h4" />
    <path d="M8 8a4 4 0 0 1 4-4" />
  </svg>
);

interface AtmosphereControlsProps {
  onTriggerSnowflakes: () => void;
  onTriggerBalloons: () => void;
  onTriggerBoth: () => void;
  onClearAll: () => void;
  snowRemainingSeconds: number;
  balloonsRemainingSeconds: number;
  isSnowActive: boolean;
  isBalloonsActive: boolean;
  windIntensity: 'calm' | 'breeze' | 'gust';
  onWindChange: (intensity: 'calm' | 'breeze' | 'gust') => void;
  currentTheme: StageAmbienceTheme;
  onThemeChange: (theme: StageAmbienceTheme) => void;
}

export const AtmosphereControls: React.FC<AtmosphereControlsProps> = ({
  onTriggerSnowflakes,
  onTriggerBalloons,
  onTriggerBoth,
  onClearAll,
  snowRemainingSeconds,
  balloonsRemainingSeconds,
  isSnowActive,
  isBalloonsActive,
  windIntensity,
  onWindChange,
  currentTheme,
  onThemeChange
}) => {
  return (
    <section id="atmosphere-stage" className="relative z-20 py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-6">
        {/* Curatorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-xs tracking-widest uppercase text-amber-300/80 mb-3 font-sans">
            <span>Atmospheric Console</span>
            <span aria-hidden="true">·</span>
            <span>Master Environmental Stage</span>
            <span aria-hidden="true">·</span>
            <span>5.0 Second Cycles</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium tracking-tight text-stone-100 text-balance leading-tight">
            Ceremonial Stagecraft & Kinetic Ambience
          </h1>

          <p className="mt-4 text-stone-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Select an atmospheric element to orchestrate a precision five-second ceremonial display across the grand pavilion.
          </p>
        </div>

        {/* The Formal Command Card */}
        <div className="relative rounded-2xl border border-stone-800 bg-stone-900/70 backdrop-blur-xl p-6 sm:p-10 shadow-2xl overflow-hidden">
          {/* Subtle decorative framing */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Primary Action Zone: The Two Required Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {/* Button 1: Snowflakes */}
            <div className={`flex flex-col justify-between p-6 rounded-xl border transition-all duration-300 ${
              isSnowActive
                ? 'border-sky-400/50 bg-sky-950/20 shadow-lg shadow-sky-950/40'
                : 'border-stone-800 hover:border-stone-700 bg-stone-950/40'
            }`}>
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-sky-300/80 font-mono">
                    <span>Protocol I</span>
                    <span aria-hidden="true">·</span>
                    <span>Top to Bottom Descent</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-serif text-stone-100 mt-1">
                    Crystalline Snowfall
                  </h2>
                </div>
                <div className={`p-3 rounded-lg border transition-colors ${
                  isSnowActive
                    ? 'border-sky-400/40 bg-sky-500/10 text-sky-200'
                    : 'border-stone-800 bg-stone-900/60 text-stone-400'
                }`}>
                  <Snowflake className={`w-6 h-6 ${isSnowActive ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed mb-6">
                Releases medium-sized hexagonal dendrite snowflakes (28–34px) cascading from the upper vault to the pavilion floor for exactly 5 seconds.
              </p>

              {/* Status and Active Countdown */}
              <div className="flex items-center justify-between py-2 px-3 rounded-md bg-stone-950/60 border border-stone-800/80 text-xs mb-4">
                <span className="text-stone-400">Descent Status:</span>
                <span className="font-mono tabular-nums text-stone-200">
                  {isSnowActive ? (
                    <span className="text-sky-300 font-medium">
                      Active · {snowRemainingSeconds.toFixed(1)}s remaining
                    </span>
                  ) : (
                    <span className="text-stone-500">Standby (Ready)</span>
                  )}
                </span>
              </div>

              {/* Snowflakes Button */}
              <button
                type="button"
                onClick={onTriggerSnowflakes}
                className={`w-full py-3.5 px-6 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 flex items-center justify-center gap-2.5 whitespace-nowrap cursor-pointer ${
                  isSnowActive
                    ? 'bg-sky-100 text-sky-950 shadow-md hover:bg-white active:scale-[0.99]'
                    : 'bg-stone-800 hover:bg-stone-750 text-stone-100 border border-stone-700/80 hover:border-sky-400/40 active:scale-[0.99]'
                }`}
              >
                <Snowflake className="w-4 h-4 text-sky-400" />
                <span className="font-sans font-semibold">Snowflakes</span>
                <span className="text-xs opacity-75 font-mono ml-1">(5s)</span>
              </button>
            </div>

            {/* Button 2: Balloons */}
            <div className={`flex flex-col justify-between p-6 rounded-xl border transition-all duration-300 ${
              isBalloonsActive
                ? 'border-amber-400/50 bg-amber-950/20 shadow-lg shadow-amber-950/40'
                : 'border-stone-800 hover:border-stone-700 bg-stone-950/40'
            }`}>
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-amber-300/80 font-mono">
                    <span>Protocol II</span>
                    <span aria-hidden="true">·</span>
                    <span>Bottom to Top Ascent</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-serif text-stone-100 mt-1">
                    Ceremonial Ascendance
                  </h2>
                </div>
                <div className={`p-3 rounded-lg border transition-colors ${
                  isBalloonsActive
                    ? 'border-amber-400/40 bg-amber-500/10 text-amber-200'
                    : 'border-stone-800 bg-stone-900/60 text-stone-400'
                }`}>
                  <BalloonIcon className="w-6 h-6 text-amber-300" />
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed mb-6">
                Ascends medium-sized ceremonial luster balloons (48–60px) from the dais through the gallery clerestory for exactly 5 seconds.
              </p>

              {/* Status and Active Countdown */}
              <div className="flex items-center justify-between py-2 px-3 rounded-md bg-stone-950/60 border border-stone-800/80 text-xs mb-4">
                <span className="text-stone-400">Ascent Status:</span>
                <span className="font-mono tabular-nums text-stone-200">
                  {isBalloonsActive ? (
                    <span className="text-amber-300 font-medium">
                      Active · {balloonsRemainingSeconds.toFixed(1)}s remaining
                    </span>
                  ) : (
                    <span className="text-stone-500">Standby (Ready)</span>
                  )}
                </span>
              </div>

              {/* Balloons Button */}
              <button
                type="button"
                onClick={onTriggerBalloons}
                className={`w-full py-3.5 px-6 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 flex items-center justify-center gap-2.5 whitespace-nowrap cursor-pointer ${
                  isBalloonsActive
                    ? 'bg-amber-300 text-stone-950 shadow-md hover:bg-amber-200 active:scale-[0.99]'
                    : 'bg-stone-800 hover:bg-stone-750 text-stone-100 border border-stone-700/80 hover:border-amber-400/40 active:scale-[0.99]'
                }`}
              >
                <BalloonIcon className="w-4 h-4 text-amber-400" />
                <span className="font-sans font-semibold">Balloons</span>
                <span className="text-xs opacity-75 font-mono ml-1">(5s)</span>
              </button>
            </div>
          </div>

          {/* Secondary Controls Bar */}
          <div className="mt-8 pt-6 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4">
            {/* Wind Drift Control */}
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5" />
                Air Currents:
              </span>
              <div className="flex items-center gap-1 p-1 bg-stone-950/70 rounded-lg border border-stone-800">
                {(['calm', 'breeze', 'gust'] as const).map((intensity) => (
                  <button
                    key={intensity}
                    type="button"
                    onClick={() => onWindChange(intensity)}
                    className={`px-2.5 py-1 text-xs rounded font-medium capitalize transition-colors ${
                      windIntensity === intensity
                        ? 'bg-stone-800 text-amber-200 shadow-sm'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {intensity}
                  </button>
                ))}
              </div>
            </div>

            {/* Stage Atmosphere Backdrop */}
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-stone-400">Backdrop:</span>
              <div className="flex items-center gap-1 p-1 bg-stone-950/70 rounded-lg border border-stone-800">
                {(
                  [
                    { id: 'midnight', label: 'Midnight Gala' },
                    { id: 'obsidian', label: 'Obsidian Hall' },
                    { id: 'champagne', label: 'Champagne Silk' },
                    { id: 'conservatory', label: 'Conservatory' }
                  ] as const
                ).map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => onThemeChange(theme.id)}
                    className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                      currentTheme === theme.id
                        ? 'bg-stone-800 text-stone-100 shadow-sm'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {theme.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Utility Quick Actions */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onTriggerBoth}
                className="px-3.5 py-1.5 text-xs font-medium text-amber-200 hover:text-white bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-md transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Grand Finale (Both)
              </button>

              {(isSnowActive || isBalloonsActive) && (
                <button
                  type="button"
                  onClick={onClearAll}
                  className="px-3 py-1.5 text-xs text-stone-400 hover:text-stone-200 border border-stone-800 hover:border-stone-700 rounded-md transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset Stage
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
