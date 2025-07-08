import React, { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { toast } from '@/hooks/use-toast';
import { DEMO_USER, SERVER_URL } from '@/lib/constants';
import {
  OutcomeWithSimulation,
  simulateOddsWithUserStake,
} from '@/lib/odds-calculator';
import { MARKET } from '@/types/types';

import { Button } from '../ui/button';

interface Props {
  market: MARKET;
}

type PLACE_BETS_TYPE = {
  amount: number;
  userId: string;
  outcomeId: string;
};
export const MarketCard = ({ market }: Props) => {
  const [stakes, setStakes] = useState<Record<string, number>>({});
  const [selectedOutcomeId, setSelectedOutcomeId] = useState<string | null>(
    null,
  );

  const handleStakeChange = (outcomeId: string, value: number) => {
    setSelectedOutcomeId(outcomeId);
    setStakes((prev) => ({ ...prev, [outcomeId]: value }));
  };

  console.log('outcomeId', selectedOutcomeId);

  const displayOutcomes: OutcomeWithSimulation[] = selectedOutcomeId
    ? simulateOddsWithUserStake(
        market.outcomes,
        selectedOutcomeId,
        stakes[selectedOutcomeId] || 0,
      )
    : market.outcomes;

  const mutation = useMutation({
    mutationFn: async (data: PLACE_BETS_TYPE) => {
      const res = await axios.post(`${SERVER_URL}bets`, data);
      return res.data;
    },
    onSuccess: () => {
      toast({
        title: 'Tournament added successfully!',
      });
    },
    onError: () => {
      toast({
        title: 'Failed to add tournament',
      });
    },
  });

  return (
    <div className="mb-6 rounded-xl border bg-white p-4 shadow-md">
      <h3 className="mb-2 text-xl font-semibold">{market.title}</h3>
      <p className="mb-3 text-sm text-gray-500">{market.description}</p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {displayOutcomes.map((outcome) => (
          <div key={outcome.id} className="rounded border bg-gray-50 p-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">{outcome.label}</span>
              <span className="text-sm text-blue-600">{outcome.odds}x</span>
              <div>
                <div>
                  <p>Potential : {outcome.potentialPayout}</p>
                  <Button
                    onClick={() =>
                      mutation.mutate({
                        amount: stakes[outcome.id],
                        outcomeId: outcome.id,
                        userId: DEMO_USER,
                      })
                    }
                  >
                    {mutation.isPending ? 'Loading...' : 'Place bet'}
                  </Button>
                </div>
              </div>
            </div>
            <input
              type="number"
              min={0}
              placeholder="Your stake"
              value={stakes[outcome.id] || ''}
              onChange={(e) =>
                handleStakeChange(outcome.id, parseFloat(e.target.value) || 0)
              }
              className="mt-2 w-full rounded border px-2 py-1 text-sm"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
