import React from 'react';
import { Snowflake } from 'lucide-react';

// Custom Balloon Icon
const MiniBalloonIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 2a7 7 0 0 0-7 7c0 5 7 10 7 10s7-5 7-10a7 7 0 0 0-7-7z" />
    <path d="M12 19v3" />
    <path d="M10 22h4" />
  </svg>
);

interface ProgrammeScheduleProps {
  onTriggerSnowflakes: () => void;
  onTriggerBalloons: () => void;
}

export const ProgrammeSchedule: React.FC<ProgrammeScheduleProps> = ({
  onTriggerSnowflakes,
  onTriggerBalloons
}) => {
  return (
    <div className="space-y-16 py-12">
      {/* Specifications Grid */}
      <section id="stage-specs" className="max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-amber-300/80 mb-3 font-mono">
          <span>CATALOGUE SPECIFICATIONS</span>
          <span aria-hidden="true">·</span>
          <span>SERIES 2026.IV</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-serif text-stone-100 mb-6">
          Atmospheric Kinematic Matrix
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Snowflake Matrix */}
          <div className="p-6 rounded-xl border border-stone-800 bg-stone-900/40">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-4">
              <span className="font-serif text-lg text-stone-200 flex items-center gap-2">
                <Snowflake className="w-4 h-4 text-sky-300" />
                Medium Snowflakes Protocol
              </span>
              <span className="text-xs font-mono text-stone-400">SPEC. SNOW-05</span>
            </div>

            <dl className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between py-1 border-b border-stone-800/60">
                <dt className="text-stone-400">Particle Dimension</dt>
                <dd className="font-mono text-stone-200">Medium (25px – 34px Ø)</dd>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-800/60">
                <dt className="text-stone-400">Trajectory Vector</dt>
                <dd className="font-mono text-stone-200">Top to Bottom (Gravity Descent)</dd>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-800/60">
                <dt className="text-stone-400">Emission Duration</dt>
                <dd className="font-mono text-stone-200">5.00 Seconds Exact</dd>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-800/60">
                <dt className="text-stone-400">Structural Symmetry</dt>
                <dd className="text-stone-200">6-Fold Hexagonal Dendrite</dd>
              </div>
              <div className="flex justify-between py-1">
                <dt className="text-stone-400">Curatorial Occasion</dt>
                <dd className="text-stone-200">Winter Galas & Nocturnes</dd>
              </div>
            </dl>
          </div>

          {/* Balloon Matrix */}
          <div className="p-6 rounded-xl border border-stone-800 bg-stone-900/40">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-4">
              <span className="font-serif text-lg text-stone-200 flex items-center gap-2">
                <MiniBalloonIcon className="w-4 h-4 text-amber-300" />
                Medium Balloons Protocol
              </span>
              <span className="text-xs font-mono text-stone-400">SPEC. BAL-05</span>
            </div>

            <dl className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between py-1 border-b border-stone-800/60">
                <dt className="text-stone-400">Particle Dimension</dt>
                <dd className="font-mono text-stone-200">Medium (44–52px W × 56–66px H)</dd>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-800/60">
                <dt className="text-stone-400">Trajectory Vector</dt>
                <dd className="font-mono text-stone-200">Bottom to Top (Buoyant Ascent)</dd>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-800/60">
                <dt className="text-stone-400">Emission Duration</dt>
                <dd className="font-mono text-stone-200">5.00 Seconds Exact</dd>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-800/60">
                <dt className="text-stone-400">Luster Finish</dt>
                <dd className="text-stone-200">3D Silk & Champagne Foil</dd>
              </div>
              <div className="flex justify-between py-1">
                <dt className="text-stone-400">Curatorial Occasion</dt>
                <dd className="text-stone-200">State Banquets & Jubilees</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Ceremonial Programme */}
      <section id="programme" className="max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-amber-300/80 mb-3 font-mono">
          <span>PAVILION PROGRAMME</span>
          <span aria-hidden="true">·</span>
          <span>SEASON CEREMONIES</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-serif text-stone-100 mb-6">
          Grand Assembly Schedule
        </h2>

        <div className="divide-y divide-stone-800 border-y border-stone-800">
          {/* Item 1 */}
          <div className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
                <span>01. WINTER SOLSTICE</span>
                <span aria-hidden="true">·</span>
                <span>DECEMBER 21</span>
                <span aria-hidden="true">·</span>
                <span>GRAND ROTUNDA</span>
              </div>
              <h3 className="text-lg font-serif text-stone-200">
                The Sovereign Symphonic Nocturne & Crystalline Fall
              </h3>
              <p className="text-xs text-stone-400 max-w-xl">
                Full orchestral brass and strings accompanied by descending medium crystalline snowflakes across the vaulted glass ceiling.
              </p>
            </div>
            <button
              type="button"
              onClick={onTriggerSnowflakes}
              className="self-start sm:self-center px-4 py-2 text-xs font-medium text-sky-200 hover:text-white bg-sky-950/40 hover:bg-sky-900/50 border border-sky-800/60 rounded-md transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <Snowflake className="w-3.5 h-3.5 text-sky-400" />
              Test Snowflakes (5s)
            </button>
          </div>

          {/* Item 2 */}
          <div className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
                <span>02. CENTENNIAL JUBILEE</span>
                <span aria-hidden="true">·</span>
                <span>SPRING EQUINOX</span>
                <span aria-hidden="true">·</span>
                <span>GREAT PAVILION</span>
              </div>
              <h3 className="text-lg font-serif text-stone-200">
                The Imperial Toast & Sovereign Balloon Ascendance
              </h3>
              <p className="text-xs text-stone-400 max-w-xl">
                Commencement of ceremonial state honors, accompanied by the buoyant floating of medium ceremonial luster balloons toward the zenith.
              </p>
            </div>
            <button
              type="button"
              onClick={onTriggerBalloons}
              className="self-start sm:self-center px-4 py-2 text-xs font-medium text-amber-200 hover:text-white bg-amber-950/40 hover:bg-amber-900/50 border border-amber-800/60 rounded-md transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <MiniBalloonIcon className="w-3.5 h-3.5 text-amber-400" />
              Test Balloons (5s)
            </button>
          </div>

          {/* Item 3 */}
          <div className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
                <span>03. CONSERVATORY SALON</span>
                <span aria-hidden="true">·</span>
                <span>MONTHLY MATINÉE</span>
                <span aria-hidden="true">·</span>
                <span>ATRIUM</span>
              </div>
              <h3 className="text-lg font-serif text-stone-200">
                Atmospheric Harmony & Kinetic Physics Masterclass
              </h3>
              <p className="text-xs text-stone-400 max-w-xl">
                Curatorial demonstration examining fluid buoyancy and mathematical crystallization in architectural stage spaces.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onTriggerSnowflakes}
                className="px-3 py-1.5 text-xs font-medium text-stone-300 hover:text-white bg-stone-900 border border-stone-800 rounded-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Snowflake className="w-3 h-3 text-sky-400" />
                Snow
              </button>
              <button
                type="button"
                onClick={onTriggerBalloons}
                className="px-3 py-1.5 text-xs font-medium text-stone-300 hover:text-white bg-stone-900 border border-stone-800 rounded-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <MiniBalloonIcon className="w-3 h-3 text-amber-400" />
                Balloons
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Curatorial Archival Notes (Pattern D from Museum reference) */}
      <section id="curatorial-notes" className="max-w-5xl mx-auto px-6">
        <div className="border border-stone-800/80 bg-stone-900/30 rounded-2xl p-8 sm:p-12 relative">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-widest text-stone-500 font-mono mb-2">
              CURATORIAL ARCHIVE · FOLIO 82
            </div>

            <h3 className="text-2xl font-serif text-stone-100 mb-4">
              On the Choreography of Vertical Atmosphere
            </h3>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:font-normal first-letter:text-amber-200 first-letter:float-left first-letter:mr-3 first-letter:mt-1">
              Throughout history, grand ceremonies have relied upon dynamic vertical motion to transform static architecture into living theater. When crystalline flakes descend from celestial heights, they evoke stillness, reflection, and natural reverence. Conversely, when balloons ascend buoyantly against gravity, the human spirit is lifted toward celebration and renewal. Both phenomena, when calibrated to exact five-second intervals, awaken the majestic cadence of our grand ceremonial hall.
            </p>

            <div className="mt-8 pt-6 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-500">
              <span>Dr. Alistair Vance, Master of Ceremonial Design</span>
              <span>The Sovereign Pavilion · 2026 Archive</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
