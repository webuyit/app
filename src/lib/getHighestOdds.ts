import { OUTCOME } from '@/types/types';

export function getHighestOdds(outcomes: OUTCOME[]): number {
  if (!outcomes || outcomes.length === 0) return 0;
  return Math.max(...outcomes.map((o) => o.odds));
}
