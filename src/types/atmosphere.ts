export type ParticleType = 'snowflake' | 'balloon';

export interface SnowflakeParticle {
  id: string;
  x: number; // percentage 0-100 across screen
  y: number; // pixels from top
  size: number; // medium size in pixels: 24 to 34px
  speed: number; // pixels per second
  swaySpeed: number; // oscillation frequency
  swayAmplitude: number; // horizontal drift amplitude in px
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  variant: number; // 0, 1, 2 for distinct crystalline snowflake shapes
  seed: number;
}

export interface BalloonParticle {
  id: string;
  x: number; // percentage 0-100 across screen
  y: number; // pixels from top
  width: number; // medium size: 42 to 54px
  height: number; // medium size: 54 to 68px
  speed: number; // pixels per second upward
  swaySpeed: number;
  swayAmplitude: number;
  tilt: number;
  color: {
    primary: string;
    secondary: string;
    highlight: string;
    stringColor: string;
    name: string;
  };
  opacity: number;
  stringLength: number;
  stringWaviness: number;
  seed: number;
}

export type StageAmbienceTheme = 'midnight' | 'obsidian' | 'champagne' | 'conservatory';

export interface StageThemeConfig {
  id: StageAmbienceTheme;
  name: string;
  bgClass: string;
  cardBg: string;
  borderClass: string;
  accentClass: string;
  description: string;
}
