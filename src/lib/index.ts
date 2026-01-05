export type Signal = 'color' | 'pedal' | 'sound';

export const TEST_MODE = {
  UNLIMITED: 'unlimited',     // No time limit
  LIMITED: 'limited'  // Fixed time limit
} as const;

export type TestMode = typeof TEST_MODE[keyof typeof TEST_MODE];

export const SPEED = {
  SLOW: 'slow',
  MEDIUM: 'medium',
  FAST: 'fast',
} as const;

export type Speed = typeof SPEED[keyof typeof SPEED];

export const COLORS = [
  'red',
  'blue',
  'white',
  'green',
  'yellow',
];

export const PEDALS = [
  'left',
  'right',
];

export const SOUNDS = [
  'soundDeep',
  'soundHigh',
];