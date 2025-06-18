'use client';

import { useEffect, useRef } from 'react';

import {
  Clock,
  Coins,
  Crown,
  DollarSign,
  Globe,
  Key,
  Lock,
  Shield,
  Star,
  Trophy,
  Users,
  Zap,
} from 'lucide-react';
import { Link, useTransitionRouter } from 'next-view-transitions';
// Import Swiper styles
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import {
  TournamentDrawer,
  sampleTournament,
} from '@/components/tournament-drawer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatToRelativeShort } from '@/lib/format-dates';
import { formatNumberCompact } from '@/lib/format-number-compact';
import { TOURNAMENT } from '@/types/types';

// Mock tournament data
const mockTournaments = [
  {
    id: 1,
    name: 'NBA Championship Predictor',
    type: 'OPEN',
    status: 'active',
    entryFee: 'Free',
    prize: '$10,000',
    participants: 1247,
    maxParticipants: 5000,
    timeLeft: '2d 14h',
    description: 'Predict the NBA Finals outcome',
    difficulty: 'Beginner',
    featured: false,
  },
  {
    id: 2,
    name: 'Elite Athletes Weekly',
    type: 'PREMIUM',
    status: 'starting',
    entryFee: '$100',
    prize: '$50,000',
    participants: 89,
    maxParticipants: 100,
    timeLeft: '6h 30m',
    description: 'High-stakes weekly tournament',
    difficulty: 'Expert',
    featured: true,
  },
  {
    id: 3,
    name: 'VIP Invite Only',
    type: 'PRIVATE',
    status: 'invite',
    entryFee: '$250',
    prize: '$25,000',
    participants: 45,
    maxParticipants: 50,
    timeLeft: '1d 8h',
    description: 'Exclusive invitation required',
    difficulty: 'Advanced',
    featured: false,
  },
  {
    id: 4,
    name: 'Weekend Warriors',
    type: 'OPEN',
    status: 'active',
    entryFee: '$10',
    prize: '$5,000',
    participants: 892,
    maxParticipants: 2000,
    timeLeft: '3d 2h',
    description: 'Weekend sports predictions',
    difficulty: 'Intermediate',
    featured: false,
  },
  {
    id: 5,
    name: 'Diamond League',
    type: 'PREMIUM',
    status: 'upcoming',
    entryFee: '$500',
    prize: '$100,000',
    participants: 12,
    maxParticipants: 25,
    timeLeft: '5d 12h',
    description: 'Ultra-premium tournament',
    difficulty: 'Master',
    featured: true,
  },
  {
    id: 6,
    name: 'Token Holders Championship',
    type: 'GATED',
    status: 'active',
    entryFee: 'Free',
    prize: '$30,000',
    participants: 234,
    maxParticipants: 1000,
    timeLeft: '4d 18h',
    description: 'Exclusive for ABT token holders',
    difficulty: 'Advanced',
    featured: false,
    tokenRequirement: {
      symbol: 'ABT',
      name: 'AthleteBet Token',
      minAmount: '500',
      userHolding: '1,250', // User's current balance
    },
  },
  {
    id: 7,
    name: 'Elite Crypto League',
    type: 'GATED',
    status: 'starting',
    entryFee: '$50',
    prize: '$75,000',
    participants: 67,
    maxParticipants: 150,
    timeLeft: '12h 45m',
    description: 'ETH holders exclusive tournament',
    difficulty: 'Expert',
    featured: true,
    tokenRequirement: {
      symbol: 'ETH',
      name: 'Ethereum',
      minAmount: '0.5',
      userHolding: '0.5421', // User's current balance
    },
  },
];

type Props = {
  tournaments: TOURNAMENT[];
};
export function TournamentsSection({ tournaments }: Props) {
  const swiperRef = useRef<any>(null);

  const filteredTournaments = tournaments.filter(
    (market) => market.entryType !== 'GATED',
  );

  console.log('Filtered tournaments', filteredTournaments);
  console.log('Tournaments', tournaments);
  /*useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      (window as any).Swiper &&
      mockTournaments.length > 0
    ) {
      swiperRef.current = new (window as any).Swiper('.tournaments-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 16,
        freeMode: true,
        scrollbar: {
          el: '.swiper-scrollbar',
          hide: true,
        },
      });
    }

    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy();
      }
    };
  }, []);*/

  const formatParticipants = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const fakeParticipantsValue = 3000;
  const getTournamentIcon = (type: string) => {
    switch (type) {
      case 'OPEN':
        return <Globe size={16} />;
      case 'PRIVATE':
        return <Lock size={16} />;
      case 'PREMIUM':
        return <Crown size={16} />;
      case 'GATED':
        return <Key size={16} />;
      default:
        return <Trophy size={16} />;
    }
  };

  const getTournamentCardStyle = (type: string, featured: boolean) => {
    const baseClasses =
      'overflow-hidden touch-feedback cursor-pointer transition-all duration-300 hover:shadow-lg';

    switch (type) {
      case 'OPEN':
        return `${baseClasses} border-blue-200 hover:border-blue-300 bg-gradient-to-br from-blue-50 to-white`;
      case 'PRIVATE':
        return `${baseClasses} border-purple-200 hover:border-purple-300 bg-gradient-to-br from-purple-50 to-white relative`;
      case 'PREMIUM':
        return `${baseClasses} border-yellow-300 hover:border-yellow-400 bg-gradient-to-br from-yellow-50 via-orange-50 to-white relative ${
          featured ? 'ring-2 ring-yellow-400 shadow-xl' : ''
        }`;
      case 'GATED':
        return `${baseClasses} border-emerald-300 hover:border-emerald-400 bg-gradient-to-br from-emerald-50 via-teal-50 to-white relative ${
          featured ? 'ring-2 ring-emerald-400 shadow-xl' : ''
        }`;
      default:
        return baseClasses;
    }
  };

  const getTournamentButtonStyle = (type: string) => {
    switch (type) {
      case 'OPEN':
        return 'bg-blue-600 hover:bg-blue-700 text-white';
      case 'PRIVATE':
        return 'bg-purple-600 hover:bg-purple-700 text-white';
      case 'PREMIUM':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-md';
      case 'GATED':
        return 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-md';
      default:
        return 'bg-primary hover:bg-primary/90 text-white';
    }
  };

  const hasTokenRequirement = (tournament: any) => {
    if (tournament.type !== 'GATED' || !tournament.tokenRequirement)
      return true;

    const userHolding = parseFloat(tournament.tokenRequirement.userHolding);
    const minRequired = parseFloat(tournament.tokenRequirement.minAmount);
    return userHolding >= minRequired;
  };

  return (
    <section className="px-4 py-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Tournaments</h2>
        <Link href="/tournaments">
          <Button
            variant="ghost"
            className="h-auto p-0 text-sm font-medium text-primary hover:bg-transparent"
          >
            View All
          </Button>
        </Link>
      </div>
      <Swiper
        slidesPerView="auto"
        spaceBetween={16}
        freeMode={true}
        scrollbar={{
          el: '.swiper-scrollbar',
          hide: true,
        }}
      >
        {filteredTournaments.map((tournament) => (
          <SwiperSlide key={tournament.id} className="swiper-slide !w-72">
            <Card
              className={getTournamentCardStyle(
                tournament.entryType,
                tournament.featured,
              )}
            >
              {/* Premium Glow Effect */}
              {tournament.entryType === 'PREMIUM' && tournament.featured && (
                <div className="absolute inset-0 animate-pulse rounded-lg bg-gradient-to-r from-yellow-400/20 to-orange-400/20" />
              )}

              {/* Private Lock Overlay */}
              {tournament.entryType === 'PRIVATE' && (
                <div className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                  <Shield className="text-purple-600" size={14} />
                </div>
              )}

              {/* Gated Token Overlay */}
              {tournament.entryType === 'GATED' && (
                <div className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                  <Coins className="text-emerald-600" size={14} />
                </div>
              )}

              <CardContent className="relative p-4">
                {/* Header */}
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-1 flex items-center space-x-2">
                      <Badge
                        className={`text-xs font-bold ${
                          tournament.entryType === 'OPEN'
                            ? 'border-blue-200 bg-blue-100 text-blue-800'
                            : tournament.entryType === 'PRIVATE'
                              ? 'border-purple-200 bg-purple-100 text-purple-800'
                              : tournament.entryType === 'GATED'
                                ? 'border-emerald-200 bg-emerald-100 text-emerald-800'
                                : 'border-0 bg-gradient-to-r from-yellow-400 to-orange-400 text-white'
                        }`}
                      >
                        {getTournamentIcon(tournament.entryType)}
                        <span className="ml-1">{tournament.entryType}</span>
                      </Badge>
                      {tournament.featured && (
                        <Badge className="border-orange-200 bg-orange-100 text-xs text-orange-800">
                          <Star size={10} className="mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                    <h3 className="truncate text-sm font-semibold leading-tight text-gray-900">
                      {tournament.title}
                    </h3>
                    <p className="mt-1 text-xs text-gray-600">
                      {tournament.description}
                    </p>
                  </div>
                </div>

                {/* Token Requirement for GATED tournaments */}
                {tournament.entryType === 'GATED' &&
                  tournament.requiredToken && (
                    <div className="mb-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="text-xs font-medium text-emerald-800">
                          Token Required
                        </div>
                        <Badge
                          className={`text-xs ${
                            hasTokenRequirement(tournament)
                              ? 'border-green-200 bg-green-100 text-green-800'
                              : 'border-red-200 bg-red-100 text-red-800'
                          }`}
                        >
                          {hasTokenRequirement(tournament)
                            ? '✓ Eligible'
                            : '✗ Insufficient'}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-lg">
                          {tournament.requiredTokenLogoUrl ? (
                            <img
                              src={tournament.requiredTokenLogoUrl}
                              alt={tournament.requiredTokenSymbol}
                              className="h-4 w-4 rounded-full object-cover"
                            />
                          ) : (
                            '💎'
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-gray-600">
                            {tournament.requiredTokenName}
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            Min: {tournament.requiredTokenAmount}{' '}
                            {tournament.requiredTokenSymbol}
                          </div>
                          <div className="text-xs text-emerald-600">
                            You have: {'300'} {tournament.requiredTokenSymbol}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                {/* Prize and Entry */}
                <div className="mb-3 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-white/70 p-2">
                    <div className="mb-1 text-xs text-gray-500">Prize Pool</div>
                    <div className="flex items-center text-sm font-bold text-gray-900">
                      <Trophy className="mr-1 text-yellow-600" size={12} />
                      {formatNumberCompact(tournament.prizePool | 0)}
                    </div>
                  </div>
                  <div className="rounded-lg bg-white/70 p-2">
                    <div className="mb-1 text-xs text-gray-500">Entry Fee</div>
                    <div className="flex items-center text-sm font-bold text-gray-900">
                      <DollarSign className="mr-1 text-green-600" size={12} />
                      {tournament.entryFee}
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="mb-3 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center text-gray-600">
                      <Users size={12} className="mr-1" />
                      <span>{formatParticipants(600)}</span>
                      <span className="mx-1 text-gray-400">/</span>
                      <span>{formatParticipants(2000)}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock size={12} className="mr-1" />
                      <span>{formatToRelativeShort(tournament.startsAt)}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {'Degens'}
                  </Badge>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="h-1.5 w-full rounded-full bg-gray-200">
                    <div
                      className={`h-1.5 rounded-full transition-all ${
                        tournament.entryType === 'OPEN'
                          ? 'bg-blue-500'
                          : tournament.entryType === 'PRIVATE'
                            ? 'bg-purple-500'
                            : tournament.entryType === 'GATED'
                              ? 'bg-gradient-to-r from-emerald-400 to-teal-500'
                              : 'bg-gradient-to-r from-yellow-400 to-orange-500'
                      }`}
                      style={{
                        width: `${(fakeParticipantsValue / tournament.maxParticipants) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Tournament Details Button */}
                <TournamentDrawer
                  tournament={{
                    ...sampleTournament,
                    id: `tournament-${tournament.id}`,
                    name: tournament.title,
                    description: tournament.description,
                    type: tournament.entryType as
                      | 'OPEN'
                      | 'PRIVATE'
                      | 'PREMIUM'
                      | 'GATED',
                    prize: '70000', ///tournament.prizePool.toString(),
                    entryFee: '200', //tournament.entryFee.toString(),
                    participants: tournament.participants,
                    maxParticipants: tournament.maxParticipants,
                    difficulty: 'Degens',
                    timeRemaining: '3d 5h',
                    featured: tournament.featured || false,
                    status: 'upcoming',
                    tokenRequirement: {
                      name: tournament.requiredTokenName,
                      symbol: tournament.requiredTokenSymbol,
                      minAmount: '300',
                      userHolding: '400',
                    },
                    leaderboard: sampleTournament.leaderboard,
                  }}
                  trigger={
                    <Button
                      size="sm"
                      className={`w-full py-2 text-xs ${getTournamentButtonStyle(tournament.entryType)}`}
                      disabled={
                        //(tournament.status === 'UPCOMING' &&
                        //  tournament.type === 'PRIVATE') ||
                        //(tournament.entryType === 'GATED' &&
                        //  !hasTokenRequirement(tournament))
                        false
                      }
                    >
                      {tournament.entryType === 'PREMIUM' && (
                        <Zap size={12} className="mr-1" />
                      )}
                      {tournament.entryType === 'GATED' && (
                        <Coins size={12} className="mr-1" />
                      )}
                      <Trophy size={12} className="mr-1" />
                      View Tournament
                    </Button>
                  }
                />
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
