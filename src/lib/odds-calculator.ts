import { OUTCOME } from '@/types/types';

import { CONSTANT_VIRTUAL_STAKE, MAX_ODDS_CAP } from './constants';

export interface OutcomeWithSimulation extends OUTCOME {
  odds: number;
  impliedProbability: number;
  potentialPayout?: number;
  potentialProfit?: number;
}

export function simulateOddsWithUserStake(
  outcomes: OUTCOME[],
  selectedOutcomeId: string,
  userStake: number,
  virtualStakePerOutcome = CONSTANT_VIRTUAL_STAKE,
  maxOdds = MAX_ODDS_CAP,
): OutcomeWithSimulation[] {
  const updated = outcomes.map((o) => {
    const isSelected = o.id === selectedOutcomeId;
    const effectiveStake =
      o.totalStaked + virtualStakePerOutcome + (isSelected ? userStake : 0);

    return {
      ...o,
      effectiveStake,
    };
  });

  const totalStake = updated.reduce((sum, o) => sum + o.effectiveStake, 0);

  return updated.map((o) => {
    const prob = o.effectiveStake / totalStake;
    const rawOdds = 1 / prob;
    const odds = parseFloat(Math.min(rawOdds, maxOdds).toFixed(2));
    const impliedProbability = parseFloat((prob * 100).toFixed(1));

    const isSelected = o.id === selectedOutcomeId;

    return {
      ...o,
      odds,
      impliedProbability,
      ...(isSelected && userStake > 0
        ? {
            potentialPayout: parseFloat((userStake * odds).toFixed(2)),
            potentialProfit: parseFloat((userStake * (odds - 1)).toFixed(2)),
          }
        : {}),
    };
  });
}
