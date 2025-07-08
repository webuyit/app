'use client';

import { AnnouncementCarousel } from '@/components/announcement-carousel';
import { BottomNavigation } from '@/components/bottom-navigation';
import { Header } from '@/components/header';
import { PlayersSection } from '@/components/players-section';
import { PopularBetsSection } from '@/components/popular-bets-section';
import { TournamentsSection } from '@/components/tournaments-section';
import { UpcomingEventsSection } from '@/components/upcoming-events-section';
import {
  MARKET,
  MARKETS,
  PLAYERS,
  TOURNAMENT,
  TOURNAMENTS,
} from '@/types/types';

import InitUserClient from '../initUserClient';
import { GatedTournamentsSection } from '../upcoming-events/gated-tournaments-section';

type HomeProps = {
  players: PLAYERS;
  markets: MARKETS;
  tournaments: TOURNAMENTS;
};
export default function Home({ players, markets, tournaments }: HomeProps) {
  console.log('markets from home', markets);
  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:mx-auto md:max-w-md md:border-x md:border-gray-200">
      <Header />
      <div className="overflow-x-hidden">
        <AnnouncementCarousel />
        <PlayersSection players={players.players} />
        <PopularBetsSection initialMarkets={markets} />
        <UpcomingEventsSection events={markets.markets} />
        <TournamentsSection tournaments={tournaments.tornaments} />
        <GatedTournamentsSection tournaments={tournaments.tornaments} />
        <InitUserClient />
      </div>
      <BottomNavigation />
    </div>
  );
}
