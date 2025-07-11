'use client';

import { useQuery } from '@tanstack/react-query';
import {
  ArrowLeft,
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

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface Tournament {
  id: number;
  title: string;
  description: string;
  type: 'OPEN' | 'PRIVATE' | 'PREMIUM' | 'GATED';
  sport: string;
  status: string;
  prize: string;
  entryFee: string;
  participants: number;
  maxParticipants: number;
  difficulty: string;
  timeRemaining: string;
  featured?: boolean;
  tokenRequirement?: {
    name: string;
    symbol: string;
    minAmount: string;
    userHolding: string;
  };
}

// Mock data for tournaments
const mockTournaments: Tournament[] = [
  {
    id: 1,
    title: 'NBA Elite Championship',
    description: 'Compete with the best basketball predictors',
    type: 'PREMIUM',
    sport: 'Basketball',
    status: 'upcoming',
    prize: '$50,000',
    entryFee: '250',
    participants: 1847,
    maxParticipants: 2000,
    difficulty: 'Expert',
    timeRemaining: '2d 14h',
    featured: true,
  },
  {
    id: 2,
    title: 'Tennis Grand Slam Predictor',
    description: 'Predict the next tennis grand slam outcomes',
    type: 'OPEN',
    sport: 'Tennis',
    status: 'live',
    prize: '$10,000',
    entryFee: 'Free',
    participants: 3241,
    maxParticipants: 5000,
    difficulty: 'Beginner',
    timeRemaining: '1d 8h',
  },
  {
    id: 3,
    title: 'VIP Soccer Champions',
    description: 'Exclusive tournament for invited members only',
    type: 'PRIVATE',
    sport: 'Soccer',
    status: 'invite',
    prize: '$25,000',
    entryFee: '500',
    participants: 45,
    maxParticipants: 100,
    difficulty: 'Expert',
    timeRemaining: '5d 2h',
  },
  {
    id: 4,
    title: 'Crypto Athletes League',
    description: 'Token-gated tournament for ABT holders',
    type: 'GATED',
    sport: 'Multi-Sport',
    status: 'upcoming',
    prize: '$75,000',
    entryFee: '100',
    participants: 156,
    maxParticipants: 500,
    difficulty: 'Pro',
    timeRemaining: '3d 6h',
    tokenRequirement: {
      name: 'AthleteBet Token',
      symbol: 'ABT',
      minAmount: '1000',
      userHolding: '2500',
    },
  },
  {
    id: 5,
    title: 'NFL Fantasy Masters',
    description: 'American football prediction tournament',
    type: 'OPEN',
    sport: 'American Football',
    status: 'upcoming',
    prize: '$15,000',
    entryFee: '50',
    participants: 892,
    maxParticipants: 1500,
    difficulty: 'Intermediate',
    timeRemaining: '4d 12h',
  },
  {
    id: 6,
    title: 'ETH Holders Exclusive',
    description: 'Premium tournament for Ethereum holders',
    type: 'GATED',
    sport: 'Basketball',
    status: 'upcoming',
    prize: '$100,000',
    entryFee: '500',
    participants: 78,
    maxParticipants: 200,
    difficulty: 'Expert',
    timeRemaining: '6d 18h',
    tokenRequirement: {
      name: 'Ethereum',
      symbol: 'ETH',
      minAmount: '0.5',
      userHolding: '0.3',
    },
  },
  {
    id: 7,
    title: 'Baseball World Series',
    description: 'Predict the World Series outcomes',
    type: 'PREMIUM',
    sport: 'Baseball',
    status: 'upcoming',
    prize: '$30,000',
    entryFee: '150',
    participants: 567,
    maxParticipants: 1000,
    difficulty: 'Pro',
    timeRemaining: '7d 4h',
  },
];

export default function Tournaments() {
  const { data: tournaments = mockTournaments, isLoading } = useQuery({
    queryKey: ['/api/tournaments'],
    queryFn: () => Promise.resolve(mockTournaments),
  });

  const formatParticipantCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

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

  const hasTokenRequirement = (tournament: Tournament) => {
    if (tournament.type !== 'GATED' || !tournament.tokenRequirement)
      return true;

    const userHolding = parseFloat(tournament.tokenRequirement.userHolding);
    const minRequired = parseFloat(tournament.tokenRequirement.minAmount);
    return userHolding >= minRequired;
  };

  // Group tournaments by sport
  const tournamentsByCategory = tournaments.reduce(
    (acc, tournament) => {
      const category = tournament.sport;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(tournament);
      return acc;
    },
    {} as Record<string, Tournament[]>,
  );

  const categories = Object.keys(tournamentsByCategory).sort();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="sticky top-0 z-10 bg-white shadow-sm dark:bg-gray-800">
          <div className="flex items-center px-4 py-4">
            <Skeleton className="mr-3 h-6 w-6" />
            <Skeleton className="h-6 w-32" />
          </div>
        </div>
        <div className="space-y-6 p-4">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <Skeleton className="mb-3 h-6 w-24" />
              <div className="grid gap-4">
                {[1, 2].map((j) => (
                  <Skeleton key={j} className="h-64 rounded-lg" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Empty state when no tournaments
  if (!tournaments || tournaments.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="sticky top-0 z-10 bg-white shadow-sm dark:bg-gray-800">
          <div className="flex items-center px-4 py-4">
            <Link
              href="/"
              className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              <ArrowLeft size={20} className="mr-3" />
            </Link>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              Tournaments
            </h1>
          </div>
        </div>

        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
          <div className="max-w-sm text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
              <Trophy size={40} className="text-gray-400 dark:text-gray-500" />
            </div>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              No Tournaments Available
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Check back soon for exciting tournaments and competitions to join!
            </p>
            <Link href="/">
              <Button className="hover:bg-primary/90 bg-primary text-white">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm dark:bg-gray-800">
        <div className="flex items-center px-4 py-4">
          <Link
            href="/"
            className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            <ArrowLeft size={20} className="mr-3" />
          </Link>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            Tournaments
          </h1>
          <div className="ml-auto">
            <Badge className="bg-primary/10 border-primary/20 text-primary">
              {tournaments.length} Available
            </Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6 p-4">
        {categories.map((category) => (
          <div key={category}>
            <h2 className="mb-3 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
              <Trophy size={20} className="mr-2 text-primary" />
              {category}
              <Badge className="ml-2 bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                {tournamentsByCategory[category].length}
              </Badge>
            </h2>

            <div className="grid gap-4">
              {tournamentsByCategory[category].map((tournament) => (
                <Card
                  key={tournament.id}
                  className={getTournamentCardStyle(
                    tournament.type,
                    tournament.featured || false,
                  )}
                >
                  {/* Premium Glow Effect */}
                  {tournament.type === 'PREMIUM' && tournament.featured && (
                    <div className="absolute inset-0 animate-pulse rounded-lg bg-gradient-to-r from-yellow-400/20 to-orange-400/20" />
                  )}

                  {/* Private Lock Overlay */}
                  {tournament.type === 'PRIVATE' && (
                    <div className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                      <Shield className="text-purple-600" size={14} />
                    </div>
                  )}

                  {/* Gated Token Overlay */}
                  {tournament.type === 'GATED' && (
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
                              tournament.type === 'OPEN'
                                ? 'border-blue-200 bg-blue-100 text-blue-800'
                                : tournament.type === 'PRIVATE'
                                  ? 'border-purple-200 bg-purple-100 text-purple-800'
                                  : tournament.type === 'GATED'
                                    ? 'border-emerald-200 bg-emerald-100 text-emerald-800'
                                    : 'border-0 bg-gradient-to-r from-yellow-400 to-orange-400 text-white'
                            }`}
                          >
                            {getTournamentIcon(tournament.type)}
                            <span className="ml-1">{tournament.type}</span>
                          </Badge>
                          {tournament.featured && (
                            <Badge className="border-orange-200 bg-orange-100 text-xs text-orange-800">
                              <Star size={10} className="mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        <h3 className="mb-1 text-base font-bold text-gray-900">
                          {tournament.title}
                        </h3>
                        <p className="mt-1 text-xs text-gray-600">
                          {tournament.description}
                        </p>
                      </div>
                    </div>

                    {/* Token Requirement for GATED tournaments */}
                    {tournament.type === 'GATED' &&
                      tournament.tokenRequirement && (
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
                            <span className="text-lg">
                              {tournament.tokenRequirement.symbol === 'ETH'
                                ? '💎'
                                : '🏆'}
                            </span>
                            <div className="flex-1">
                              <div className="text-xs text-gray-600">
                                {tournament.tokenRequirement.name}
                              </div>
                              <div className="text-sm font-medium text-gray-900">
                                Min: {tournament.tokenRequirement.minAmount}{' '}
                                {tournament.tokenRequirement.symbol}
                              </div>
                              <div className="text-xs text-emerald-600">
                                You have:{' '}
                                {tournament.tokenRequirement.userHolding}{' '}
                                {tournament.tokenRequirement.symbol}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                    {/* Prize and Entry */}
                    <div className="mb-3 grid grid-cols-2 gap-3">
                      <div className="rounded-lg bg-white/70 p-2">
                        <div className="mb-1 text-xs text-gray-500">
                          Prize Pool
                        </div>
                        <div className="flex items-center text-sm font-bold text-gray-900">
                          <Trophy className="mr-1 text-yellow-600" size={12} />
                          {tournament.prize}
                        </div>
                      </div>
                      <div className="rounded-lg bg-white/70 p-2">
                        <div className="mb-1 text-xs text-gray-500">
                          Entry Fee
                        </div>
                        <div className="flex items-center text-sm font-bold text-gray-900">
                          <Avatar className="mr-1 h-4 w-4">
                            <AvatarImage
                              src={`/img/coin.png`}
                              alt={'coin'}
                              className="object-cover"
                            />
                            <AvatarFallback className="text-xs">
                              $
                            </AvatarFallback>
                          </Avatar>
                          {tournament.entryFee}
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="mb-3 flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center text-gray-600">
                          <Users size={12} className="mr-1" />
                          {formatParticipantCount(tournament.participants)}/
                          {formatParticipantCount(tournament.maxParticipants)}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock size={12} className="mr-1" />
                          {tournament.timeRemaining}
                        </div>
                      </div>
                      <Badge className="bg-gray-100 text-xs text-gray-700">
                        {tournament.difficulty}
                      </Badge>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="h-1.5 w-full rounded-full bg-gray-200">
                        <div
                          className={`h-1.5 rounded-full transition-all ${
                            tournament.type === 'OPEN'
                              ? 'bg-blue-500'
                              : tournament.type === 'PRIVATE'
                                ? 'bg-purple-500'
                                : tournament.type === 'GATED'
                                  ? 'bg-gradient-to-r from-emerald-400 to-teal-500'
                                  : 'bg-gradient-to-r from-yellow-400 to-orange-500'
                          }`}
                          style={{
                            width: `${(tournament.participants / tournament.maxParticipants) * 100}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button
                      size="sm"
                      className={`w-full py-2 text-xs ${getTournamentButtonStyle(tournament.type)}`}
                      disabled={
                        /* (tournament.status === 'invite' &&
                          tournament.type === 'PRIVATE') ||
                        (tournament.type === 'GATED' &&
                          !hasTokenRequirement(tournament))*/
                        true
                      }
                    >
                      {tournament.type === 'PREMIUM' && (
                        <Zap size={12} className="mr-1" />
                      )}
                      {tournament.type === 'GATED' && (
                        <Coins size={12} className="mr-1" />
                      )}
                      {tournament.type === 'PRIVATE' &&
                      tournament.status === 'invite'
                        ? 'Invite Only'
                        : tournament.type === 'GATED' &&
                            !hasTokenRequirement(tournament)
                          ? 'Insufficient Tokens'
                          : tournament.status === 'upcoming'
                            ? 'Register Now'
                            : 'Join Tournament'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
