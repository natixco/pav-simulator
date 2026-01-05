import { LocalStore } from '$lib/results/local-store';

export type DeterminationResult = {
  timestamp: number;
  total: number;
  correct: number;
  incorrect: number;
  omitted: number;
  averageResponseTime: number;
  medianResponseTime: number;
  speed: string;
}

export type MonotonyResult = {
  timestamp: number;
  total: number;
  correct: number;
};

export const determinationStore = new LocalStore<DeterminationResult>('results');
export const monotonyStore = new LocalStore<MonotonyResult>('monotony-results');