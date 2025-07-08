import { OUTCOME } from '@/types/types';

type PayoutDetails = {
  potentialPayout: number;
  potentialProfit: number;
  odds: number;
  impliedProbability: number;
};

export function getPayoutDetails(
  outcomes: OUTCOME[],
  selectedOutcomeId: string,
  userStake: number,
): PayoutDetails | null {
  if (!selectedOutcomeId || userStake <= 0) return null;

  const selectedOutcome = outcomes.find((o) => o.id === selectedOutcomeId);
  if (!selectedOutcome) return null;

  const { odds = 1, impliedProbability = 0 } = selectedOutcome;

  const potentialPayout = parseFloat((userStake * odds).toFixed(2));
  const potentialProfit = parseFloat((potentialPayout - userStake).toFixed(2));

  return {
    potentialPayout,
    potentialProfit,
    odds,
    impliedProbability,
  };
}
