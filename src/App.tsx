import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TopBar } from './components/TopBar';
import { AtmosphereControls } from './components/AtmosphereControls';
import { AtmosphereCanvas } from './components/AtmosphereCanvas';
import { ProgrammeSchedule } from './components/ProgrammeSchedule';
import { ProtocolGuideModal } from './components/ProtocolGuideModal';
import { StageAmbienceTheme } from './types/atmosphere';
import { soundFx } from './utils/audio';

export default function App() {
  // Atmospheric effect states (5-second duration)
  const [isSnowActive, setIsSnowActive] = useState<boolean>(false);
  const [snowRemainingSeconds, setSnowRemainingSeconds] = useState<number>(0);
  const snowEndTimestampRef = useRef<number>(0);

  const [isBalloonsActive, setIsBalloonsActive] = useState<boolean>(false);
  const [balloonsRemainingSeconds, setBalloonsRemainingSeconds] = useState<number>(0);
  const balloonsEndTimestampRef = useRef<number>(0);

  // Additional atmospheric controls
  const [windIntensity, setWindIntensity] = useState<'calm' | 'breeze' | 'gust'>('breeze');
  const [currentTheme, setCurrentTheme] = useState<StageAmbienceTheme>('midnight');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);

  // Sound mute toggle
  const handleToggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      soundFx.setMuted(next);
      return next;
    });
  }, []);

  // Snowflakes button trigger: medium snowflakes fall from top to bottom for 5 seconds
  const handleTriggerSnowflakes = useCallback(() => {
    soundFx.playSnowflakeChime();
    const now = Date.now();
    snowEndTimestampRef.current = now + 5000; // Exactly 5 seconds
    setIsSnowActive(true);
    setSnowRemainingSeconds(5.0);
  }, []);

  // Balloons button trigger: medium balloons float from bottom of screen to top for 5 seconds
  const handleTriggerBalloons = useCallback(() => {
    soundFx.playBalloonAscentChime();
    const now = Date.now();
    balloonsEndTimestampRef.current = now + 5000; // Exactly 5 seconds
    setIsBalloonsActive(true);
    setBalloonsRemainingSeconds(5.0);
  }, []);

  // Grand finale trigger (both simultaneously for 5 seconds)
  const handleTriggerBoth = useCallback(() => {
    handleTriggerSnowflakes();
    handleTriggerBalloons();
  }, [handleTriggerSnowflakes, handleTriggerBalloons]);

  // Reset stage
  const handleClearAll = useCallback(() => {
    snowEndTimestampRef.current = 0;
    balloonsEndTimestampRef.current = 0;
    setIsSnowActive(false);
    setIsBalloonsActive(false);
    setSnowRemainingSeconds(0);
    setBalloonsRemainingSeconds(0);
  }, []);

  // Precise 5-second countdown ticker
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();

      // Check snowflakes
      if (snowEndTimestampRef.current > 0) {
        const remainingMs = snowEndTimestampRef.current - now;
        if (remainingMs <= 0) {
          snowEndTimestampRef.current = 0;
          setIsSnowActive(false);
          setSnowRemainingSeconds(0);
        } else {
          setSnowRemainingSeconds(Math.max(0, remainingMs / 1000));
        }
      }

      // Check balloons
      if (balloonsEndTimestampRef.current > 0) {
        const remainingMs = balloonsEndTimestampRef.current - now;
        if (remainingMs <= 0) {
          balloonsEndTimestampRef.current = 0;
          setIsBalloonsActive(false);
          setBalloonsRemainingSeconds(0);
        } else {
          setBalloonsRemainingSeconds(Math.max(0, remainingMs / 1000));
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Background gradient based on selected formal theme
  const getThemeBackground = () => {
    switch (currentTheme) {
      case 'obsidian':
        return 'bg-gradient-to-b from-stone-950 via-neutral-900 to-stone-950';
      case 'champagne':
        return 'bg-gradient-to-b from-[#14100c] via-[#211a14] to-[#14100c]';
      case 'conservatory':
        return 'bg-gradient-to-b from-[#091512] via-[#0f221d] to-[#091512]';
      case 'midnight':
      default:
        return 'bg-gradient-to-b from-[#070b14] via-[#0f172a] to-[#070b14]';
    }
  };

  return (
    <div className={`min-h-screen text-stone-100 ${getThemeBackground()} relative selection:bg-amber-700/30 selection:text-amber-100 transition-colors duration-700`}>
      {/* Subtle curatorial grain */}
      <div className="fixed inset-0 curatorial-grain pointer-events-none opacity-40 z-0" />

      {/* Atmospheric Full-Screen Animation Canvas (medium snowflakes top-to-bottom & medium balloons bottom-to-top) */}
      <AtmosphereCanvas
        snowflakesActive={isSnowActive}
        balloonsActive={isBalloonsActive}
        windIntensity={windIntensity}
      />

      {/* Top Bar with 3-Zone Contract */}
      <TopBar
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenInfo={() => setIsGuideOpen(true)}
      />

      {/* Main Content Area */}
      <main className="relative z-10 pb-24">
        {/* Master Atmospheric Controls with the two required buttons */}
        <AtmosphereControls
          onTriggerSnowflakes={handleTriggerSnowflakes}
          onTriggerBalloons={handleTriggerBalloons}
          onTriggerBoth={handleTriggerBoth}
          onClearAll={handleClearAll}
          snowRemainingSeconds={snowRemainingSeconds}
          balloonsRemainingSeconds={balloonsRemainingSeconds}
          isSnowActive={isSnowActive}
          isBalloonsActive={isBalloonsActive}
          windIntensity={windIntensity}
          onWindChange={setWindIntensity}
          currentTheme={currentTheme}
          onThemeChange={setCurrentTheme}
        />

        {/* Formal Specifications and Programme Schedule */}
        <ProgrammeSchedule
          onTriggerSnowflakes={handleTriggerSnowflakes}
          onTriggerBalloons={handleTriggerBalloons}
        />
      </main>

      {/* Formal Footer */}
      <footer className="relative z-20 border-t border-stone-800/80 bg-stone-950/80 text-stone-500 py-10 text-xs">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif text-stone-300 text-sm">The Sovereign Pavilion</span>
            <span aria-hidden="true">·</span>
            <span>State Ceremonial Hall</span>
            <span aria-hidden="true">·</span>
            <span>MMXXVI</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={handleTriggerSnowflakes}
              className="hover:text-stone-300 transition-colors"
            >
              Snowflakes Protocol
            </button>
            <button
              onClick={handleTriggerBalloons}
              className="hover:text-stone-300 transition-colors"
            >
              Balloons Protocol
            </button>
            <button
              onClick={() => setIsGuideOpen(true)}
              className="hover:text-stone-300 transition-colors"
            >
              Manual
            </button>
          </div>
        </div>
      </footer>

      {/* Protocol Guide Dialog */}
      <ProtocolGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        onTriggerSnowflakes={handleTriggerSnowflakes}
        onTriggerBalloons={handleTriggerBalloons}
      />
    </div>
  );
}
