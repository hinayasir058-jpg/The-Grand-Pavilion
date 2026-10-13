import React from 'react';
import { X, Snowflake } from 'lucide-react';

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

interface ProtocolGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerSnowflakes: () => void;
  onTriggerBalloons: () => void;
}

export const ProtocolGuideModal: React.FC<ProtocolGuideModalProps> = ({
  isOpen,
  onClose,
  onTriggerSnowflakes,
  onTriggerBalloons
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="protocol-guide-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-xl rounded-2xl border border-stone-800 bg-stone-900 text-stone-100 p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-300 font-mono">
              PROTOCOL ARCHIVE
            </span>
            <h2 id="protocol-guide-title" className="text-xl font-serif text-stone-100 mt-1">
              Atmospheric Stage Manual & Guidelines
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-md text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-5 space-y-5 text-xs sm:text-sm text-stone-300 leading-relaxed">
          <div className="p-4 rounded-xl border border-sky-900/50 bg-sky-950/20">
            <h3 className="font-serif text-base text-sky-200 flex items-center gap-2 mb-1.5">
              <Snowflake className="w-4 h-4 text-sky-300" />
              1. Snowflake Atmospheric Protocol
            </h3>
            <p className="text-stone-400 text-xs leading-relaxed">
              Upon invoking the <strong className="text-stone-200">Snowflakes</strong> button, medium-sized crystal flakes (25–34px) are introduced at the upper edge of the display and descend through gravity for <strong>5.0 continuous seconds</strong>. Each particle oscillates according to ambient wind values.
            </p>
            <button
              onClick={() => {
                onTriggerSnowflakes();
                onClose();
              }}
              className="mt-3 px-3 py-1.5 text-xs font-medium text-sky-200 bg-sky-900/50 hover:bg-sky-800/60 rounded border border-sky-700/60 transition-colors"
            >
              Execute Snowfall Now (5s)
            </button>
          </div>

          <div className="p-4 rounded-xl border border-amber-900/50 bg-amber-950/20">
            <h3 className="font-serif text-base text-amber-200 flex items-center gap-2 mb-1.5">
              <BalloonIcon className="w-4 h-4 text-amber-300" />
              2. Balloon Atmospheric Protocol
            </h3>
            <p className="text-stone-400 text-xs leading-relaxed">
              Upon invoking the <strong className="text-stone-200">Balloons</strong> button, medium-sized ceremonial balloons (44–52px W × 56–66px H) are released from the lower boundary and float buoyantly to the celestial apex for <strong>5.0 continuous seconds</strong>. Each balloon features silk-luster shading and an undulating tether.
            </p>
            <button
              onClick={() => {
                onTriggerBalloons();
                onClose();
              }}
              className="mt-3 px-3 py-1.5 text-xs font-medium text-amber-200 bg-amber-900/50 hover:bg-amber-800/60 rounded border border-amber-700/60 transition-colors"
            >
              Execute Balloon Ascent Now (5s)
            </button>
          </div>

          <p className="text-xs text-stone-500 pt-2 border-t border-stone-800">
            Both atmospheric triggers may be invoked concurrently or consecutively. Particles gracefully conclude their transit after the 5-second interval expires.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-4 border-t border-stone-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-stone-900 bg-amber-200 hover:bg-amber-100 rounded-md transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
