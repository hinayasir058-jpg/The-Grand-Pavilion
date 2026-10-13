import React, { useEffect, useRef } from 'react';
import { SnowflakeParticle, BalloonParticle } from '../types/atmosphere';

interface AtmosphereCanvasProps {
  snowflakesActive: boolean;
  balloonsActive: boolean;
  windIntensity: 'calm' | 'breeze' | 'gust';
}

const BALLOON_PALETTES = [
  {
    primary: '#C59A45', // Champagne Gold
    secondary: '#8F661B',
    highlight: '#FFF3CF',
    stringColor: '#E6C687',
    name: 'Imperial Gold'
  },
  {
    primary: '#9F2A2A', // Royal Burgundy
    secondary: '#661515',
    highlight: '#FCA5A5',
    stringColor: '#E29578',
    name: 'Royal Burgundy'
  },
  {
    primary: '#1E3A8A', // Midnight Sapphire
    secondary: '#172554',
    highlight: '#93C5FD',
    stringColor: '#93C5FD',
    name: 'Midnight Sapphire'
  },
  {
    primary: '#993355', // Rose Velvet
    secondary: '#661933',
    highlight: '#FBCFE8',
    stringColor: '#F472B6',
    name: 'Rose Velvet'
  },
  {
    primary: '#166534', // Sovereign Emerald
    secondary: '#052E16',
    highlight: '#86EFAC',
    stringColor: '#86EFAC',
    name: 'Sovereign Emerald'
  },
  {
    primary: '#5B21B6', // Ceremonial Amethyst
    secondary: '#3B0764',
    highlight: '#DDD6FE',
    stringColor: '#C4B5FD',
    name: 'Ceremonial Amethyst'
  },
  {
    primary: '#64748B', // Sterling Platinum
    secondary: '#334155',
    highlight: '#E2E8F0',
    stringColor: '#CBD5E1',
    name: 'Sterling Platinum'
  }
];

export const AtmosphereCanvas: React.FC<AtmosphereCanvasProps> = ({
  snowflakesActive,
  balloonsActive,
  windIntensity
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const snowflakesRef = useRef<SnowflakeParticle[]>([]);
  const balloonsRef = useRef<BalloonParticle[]>([]);
  const lastSpawnSnowRef = useRef<number>(0);
  const lastSpawnBalloonRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);

  // Wind offset factor
  const windFactor = windIntensity === 'gust' ? 2.2 : windIntensity === 'breeze' ? 1.0 : 0.2;

  // Render snowflake crystal on 2D context
  const drawSnowflake = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    rotation: number,
    opacity: number,
    variant: number
  ) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = Math.max(0, Math.min(1, opacity));

    const radius = size / 2;

    // Subtle soft glow
    ctx.shadowColor = 'rgba(255, 255, 255, 0.75)';
    ctx.shadowBlur = 6;
    ctx.strokeStyle = '#FFFFFF';
    ctx.fillStyle = '#FFFFFF';
    ctx.lineWidth = Math.max(1.2, size * 0.07);
    ctx.lineCap = 'round';

    const arms = 6;
    for (let i = 0; i < arms; i++) {
      ctx.save();
      ctx.rotate((i * Math.PI) / 3);

      // Main arm
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -radius);
      ctx.stroke();

      if (variant === 0) {
        // Detailed dendritic branches
        const branchDist1 = radius * 0.45;
        const branchLen1 = radius * 0.32;
        ctx.beginPath();
        ctx.moveTo(0, -branchDist1);
        ctx.lineTo(-branchLen1, -branchDist1 - branchLen1 * 0.6);
        ctx.moveTo(0, -branchDist1);
        ctx.lineTo(branchLen1, -branchDist1 - branchLen1 * 0.6);
        ctx.stroke();

        const branchDist2 = radius * 0.75;
        const branchLen2 = radius * 0.22;
        ctx.beginPath();
        ctx.moveTo(0, -branchDist2);
        ctx.lineTo(-branchLen2, -branchDist2 - branchLen2 * 0.5);
        ctx.moveTo(0, -branchDist2);
        ctx.lineTo(branchLen2, -branchDist2 - branchLen2 * 0.5);
        ctx.stroke();
      } else if (variant === 1) {
        // Hexagonal star facets
        const branchDist = radius * 0.55;
        const branchLen = radius * 0.28;
        ctx.beginPath();
        ctx.moveTo(0, -branchDist);
        ctx.lineTo(-branchLen, -branchDist);
        ctx.moveTo(0, -branchDist);
        ctx.lineTo(branchLen, -branchDist);
        ctx.stroke();

        // Tip diamond
        ctx.beginPath();
        ctx.arc(0, -radius, 1.5, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Stellar needle star
        const branchDist = radius * 0.5;
        const branchLen = radius * 0.25;
        ctx.beginPath();
        ctx.moveTo(0, -branchDist);
        ctx.lineTo(-branchLen, -branchDist - branchLen * 0.4);
        ctx.moveTo(0, -branchDist);
        ctx.lineTo(branchLen, -branchDist - branchLen * 0.4);
        ctx.stroke();
      }

      ctx.restore();
    }

    // Central core crystal
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.09, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  // Render formal balloon on 2D context
  const drawBalloon = (
    ctx: CanvasRenderingContext2D,
    b: BalloonParticle,
    time: number
  ) => {
    ctx.save();
    ctx.translate(b.x, b.y);
    ctx.rotate(b.tilt);
    ctx.globalAlpha = Math.max(0, Math.min(1, b.opacity));

    const w = b.width;
    const h = b.height;
    const rx = w / 2;
    const ry = h / 2;

    // Shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 8;

    // Balloon body (tear-drop / oval)
    ctx.beginPath();
    ctx.moveTo(0, ry);
    // Cubic bezier curve for stately egg/tear balloon shape
    ctx.bezierCurveTo(-rx * 1.3, ry * 0.3, -rx * 1.25, -ry * 0.9, 0, -ry);
    ctx.bezierCurveTo(rx * 1.25, -ry * 0.9, rx * 1.3, ry * 0.3, 0, ry);
    ctx.closePath();

    // Radial gradient for 3D metallic/silk luster
    const grad = ctx.createRadialGradient(-rx * 0.35, -ry * 0.4, 2, 0, 0, ry * 1.2);
    grad.addColorStop(0, b.color.highlight);
    grad.addColorStop(0.35, b.color.primary);
    grad.addColorStop(1, b.color.secondary);

    ctx.fillStyle = grad;
    ctx.fill();

    // Subtle edge hairline stroke
    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Specular curved reflection highlight
    ctx.beginPath();
    ctx.ellipse(-rx * 0.38, -ry * 0.38, rx * 0.22, ry * 0.35, -Math.PI / 6, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.42)';
    ctx.fill();

    // Balloon knot at the bottom
    ctx.beginPath();
    ctx.moveTo(-3, ry);
    ctx.lineTo(3, ry);
    ctx.lineTo(5, ry + 5);
    ctx.lineTo(-5, ry + 5);
    ctx.closePath();
    ctx.fillStyle = b.color.secondary;
    ctx.fill();

    // Undulating ribbon string
    const stringLen = b.stringLength;
    ctx.beginPath();
    ctx.moveTo(0, ry + 5);

    const waveOffset = Math.sin(time * 0.003 + b.seed) * b.stringWaviness;
    const waveOffset2 = Math.cos(time * 0.004 + b.seed * 1.5) * b.stringWaviness;

    ctx.bezierCurveTo(
      waveOffset * 1.5,
      ry + stringLen * 0.33,
      waveOffset2 * 1.8,
      ry + stringLen * 0.66,
      waveOffset * 0.8,
      ry + stringLen
    );

    ctx.strokeStyle = b.color.stringColor;
    ctx.lineWidth = 1.2;
    ctx.stroke();

    ctx.restore();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, width, height);

        // 1. Spawning Snowflakes if active
        // Medium size: 24px - 34px
        if (snowflakesActive && currentTime - lastSpawnSnowRef.current > 75) {
          lastSpawnSnowRef.current = currentTime;
          // Spawn 1-2 medium snowflakes per burst
          const count = 2;
          for (let k = 0; k < count; k++) {
            const size = 25 + Math.random() * 9; // 25px to 34px (Medium size)
            snowflakesRef.current.push({
              id: 's_' + Math.random().toString(36).substring(2, 9),
              x: Math.random() * (width + 100) - 50,
              y: -size - Math.random() * 30, // Start falling from top
              size,
              speed: 130 + Math.random() * 80, // Falling speed (pixels per second)
              swaySpeed: 1.5 + Math.random() * 1.8,
              swayAmplitude: (20 + Math.random() * 25) * windFactor,
              rotation: Math.random() * Math.PI * 2,
              rotationSpeed: (Math.random() - 0.5) * 1.6,
              opacity: 0.82 + Math.random() * 0.18,
              variant: Math.floor(Math.random() * 3),
              seed: Math.random() * 100
            });
          }
        }

        // 2. Spawning Balloons if active
        // Medium size: 44px - 52px width, 56px - 66px height
        if (balloonsActive && currentTime - lastSpawnBalloonRef.current > 160) {
          lastSpawnBalloonRef.current = currentTime;
          const palette = BALLOON_PALETTES[Math.floor(Math.random() * BALLOON_PALETTES.length)];
          const widthSize = 44 + Math.random() * 8; // Medium width: 44px - 52px
          const heightSize = widthSize * (1.25 + Math.random() * 0.15); // Medium height: ~55px - 66px

          balloonsRef.current.push({
            id: 'b_' + Math.random().toString(36).substring(2, 9),
            x: 60 + Math.random() * (width - 120),
            y: height + heightSize + 40, // Start floating from bottom of the screen
            width: widthSize,
            height: heightSize,
            speed: 150 + Math.random() * 70, // Upward floating speed
            swaySpeed: 1.2 + Math.random() * 1.2,
            swayAmplitude: (14 + Math.random() * 20) * windFactor,
            tilt: 0,
            color: palette,
            opacity: 0.95,
            stringLength: 38 + Math.random() * 14,
            stringWaviness: 12 + Math.random() * 10,
            seed: Math.random() * 50
          });
        }

        // 3. Update and draw Snowflakes (falling from top to bottom)
        const updatedSnowflakes: SnowflakeParticle[] = [];
        for (let i = 0; i < snowflakesRef.current.length; i++) {
          const s = snowflakesRef.current[i];
          s.y += s.speed * dt;
          s.rotation += s.rotationSpeed * dt;

          const sway = Math.sin(currentTime * 0.002 * s.swaySpeed + s.seed) * s.swayAmplitude;
          const currentX = s.x + sway + (windFactor > 1 ? (currentTime * 0.03) % 40 : 0);

          drawSnowflake(ctx, currentX, s.y, s.size, s.rotation, s.opacity, s.variant);

          // Keep snowflake while it has not fallen past the bottom of the screen
          if (s.y < height + s.size + 40) {
            updatedSnowflakes.push(s);
          }
        }
        snowflakesRef.current = updatedSnowflakes;

        // 4. Update and draw Balloons (floating from bottom to top)
        const updatedBalloons: BalloonParticle[] = [];
        for (let j = 0; j < balloonsRef.current.length; j++) {
          const b = balloonsRef.current[j];
          b.y -= b.speed * dt; // Float upwards

          const sway = Math.sin(currentTime * 0.0025 * b.swaySpeed + b.seed) * b.swayAmplitude;
          b.tilt = Math.sin(currentTime * 0.002 * b.swaySpeed + b.seed) * 0.08;
          const currentX = b.x + sway;

          drawBalloon(ctx, { ...b, x: currentX }, currentTime);

          // Keep balloon while it has not floated past the top of the screen
          if (b.y > -b.height - b.stringLength - 50) {
            updatedBalloons.push(b);
          }
        }
        balloonsRef.current = updatedBalloons;
      }

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [snowflakesActive, balloonsActive, windIntensity, windFactor]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      style={{ display: 'block' }}
      aria-hidden="true"
    />
  );
};
