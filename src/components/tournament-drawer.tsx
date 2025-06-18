'use client';

import { useRef, useState } from 'react';

import { toPng } from 'html-to-image';
import {
  Clock,
  Coins,
  Crown,
  DollarSign,
  Globe,
  Key,
  Lock,
  Medal,
  Share2,
  Shield,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from 'lucide-react';

import { BettingDrawer, sampleBetMarket } from '@/components/betting-drawer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TournamentMarket {
  id: string;
  title: string;
  description: string;
  player: {
    name: string;
    imageUrl: string;
    sport: string;
    team?: string;
  };
  odds: string;
  tvl: string;
  participants: number;
  type: string;
}

interface Tournament {
  id: string;
  name: string;
  description: string;
  type: 'OPEN' | 'PRIVATE' | 'PREMIUM' | 'GATED';
  prize: string;
  entryFee: string;
  participants: number;
  maxParticipants: number;
  difficulty: string;
  timeRemaining: string;
  featured?: boolean;
  status: 'upcoming' | 'live' | 'completed' | 'invite';
  tokenRequirement?: {
    name: string;
    symbol: string;
    minAmount: string;
    userHolding: string;
  };
  markets: TournamentMarket[];
  leaderboard: LeaderboardEntry[];
}

interface LeaderboardEntry {
  id: string;
  userName: string;
  walletAddress: string;
  position: number;
  score: number;
  earnings: string;
  avatar?: string;
  isCurrentUser?: boolean;
}

interface TournamentDrawerProps {
  tournament: Tournament;
  trigger: React.ReactNode;
}

export function TournamentDrawer({
  tournament,
  trigger,
}: TournamentDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('markets');
  const [isSharing, setIsSharing] = useState(false);
  const leaderboardRef = useRef<HTMLDivElement>(null);

  const getTournamentIcon = (type: string) => {
    switch (type) {
      case 'OPEN':
        return <Globe size={20} />;
      case 'PRIVATE':
        return <Lock size={20} />;
      case 'PREMIUM':
        return <Crown size={20} />;
      case 'GATED':
        return <Key size={20} />;
      default:
        return <Trophy size={20} />;
    }
  };

  const getTournamentTheme = (type: string) => {
    switch (type) {
      case 'OPEN':
        return {
          gradient: 'bg-gradient-to-br from-blue-500 to-blue-700',
          accent: 'text-blue-600',
          border: 'border-blue-200',
          bg: 'bg-blue-50',
          badgeStyle: 'bg-blue-100 text-blue-800 border-blue-200',
        };
      case 'PRIVATE':
        return {
          gradient: 'bg-gradient-to-br from-purple-500 to-purple-700',
          accent: 'text-purple-600',
          border: 'border-purple-200',
          bg: 'bg-purple-50',
          badgeStyle: 'bg-purple-100 text-purple-800 border-purple-200',
        };
      case 'PREMIUM':
        return {
          gradient:
            'bg-gradient-to-br from-yellow-400 via-orange-500 to-orange-600',
          accent: 'text-orange-600',
          border: 'border-orange-200',
          bg: 'bg-gradient-to-br from-yellow-50 to-orange-50',
          badgeStyle:
            'bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0',
        };
      case 'GATED':
        return {
          gradient: 'bg-gradient-to-br from-emerald-500 to-teal-600',
          accent: 'text-emerald-600',
          border: 'border-emerald-200',
          bg: 'bg-emerald-50',
          badgeStyle: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        };
      default:
        return {
          gradient: 'bg-gradient-to-br from-gray-500 to-gray-700',
          accent: 'text-gray-600',
          border: 'border-gray-200',
          bg: 'bg-gray-50',
          badgeStyle: 'bg-gray-100 text-gray-800 border-gray-200',
        };
    }
  };

  const hasTokenRequirement = (tournament: Tournament) => {
    if (tournament.type !== 'GATED' || !tournament.tokenRequirement)
      return true;

    const userHolding = parseFloat(tournament.tokenRequirement.userHolding);
    const minRequired = parseFloat(tournament.tokenRequirement.minAmount);
    return userHolding >= minRequired;
  };

  const formatParticipantCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown size={20} className="text-yellow-500" />;
      case 2:
        return <Medal size={20} className="text-gray-400" />;
      case 3:
        return <Medal size={20} className="text-orange-500" />;
      default:
        return (
          <span className="text-lg font-bold text-gray-500">#{position}</span>
        );
    }
  };

  const handleShareLeaderboard = async () => {
    if (!leaderboardRef.current) return;

    setIsSharing(true);
    try {
      const dataUrl = await toPng(leaderboardRef.current, {
        quality: 0.95,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        width: 400,
        height: 600,
      });

      const link = document.createElement('a');
      link.download = `${tournament.name}-leaderboard.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating leaderboard image:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const theme = getTournamentTheme(tournament.type);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>

      <DrawerContent className="max-h-[90vh] bg-white dark:bg-gray-900">
        <div className="mx-auto w-full max-w-md">
          {/* Header with Tournament Branding */}
          <DrawerHeader className="relative overflow-hidden">
            <div className={`absolute inset-0 ${theme.gradient} opacity-90`} />
            <div className="absolute inset-0 bg-black/20" />

            <div className="relative z-10 py-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <div className="text-white">
                  {getTournamentIcon(tournament.type)}
                </div>
              </div>

              <div className="mb-2 flex items-center justify-center">
                <Badge className={`text-sm font-bold ${theme.badgeStyle}`}>
                  {getTournamentIcon(tournament.type)}
                  <span className="ml-1">{tournament.type}</span>
                </Badge>
                {tournament.featured && (
                  <Badge className="ml-2 border-white/30 bg-white/20 text-sm text-white">
                    <Zap size={12} className="mr-1" />
                    Featured
                  </Badge>
                )}
              </div>

              <DrawerTitle className="mb-2 text-xl font-bold text-white">
                {tournament.name}
              </DrawerTitle>
              <DrawerDescription className="text-sm text-white/80">
                {tournament.description}
              </DrawerDescription>
            </div>
          </DrawerHeader>

          <div className="max-h-[60vh] space-y-4 overflow-y-auto px-4 pb-4">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="markets"
                  className="flex items-center space-x-2"
                >
                  <Target size={16} />
                  <span>Markets</span>
                </TabsTrigger>
                <TabsTrigger
                  value="leaderboard"
                  className="flex items-center space-x-2"
                >
                  <Trophy size={16} />
                  <span>Leaderboard</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="markets" className="space-y-4">
                {/* Tournament Stats */}
                <Card className={`${theme.border} ${theme.bg}`}>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                          Prize Pool
                        </div>
                        <div
                          className={`text-lg font-bold ${theme.accent} flex items-center justify-center`}
                        >
                          <Trophy size={16} className="mr-1" />
                          {tournament.prize}
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                          Entry Fee
                        </div>
                        <div
                          className={`text-lg font-bold ${theme.accent} flex items-center justify-center`}
                        >
                          <DollarSign size={16} className="mr-1" />
                          {tournament.entryFee}
                        </div>
                      </div>
                    </div>

                    <Separator className="my-3" />

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <Users size={14} className="mr-1" />
                          {formatParticipantCount(400)}/
                          {formatParticipantCount(tournament.maxParticipants)}
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <Clock size={14} className="mr-1" />
                          {tournament.timeRemaining}
                        </div>
                      </div>
                      <Badge className="text-xs">{tournament.difficulty}</Badge>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3">
                      <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          className={`h-2 rounded-full transition-all ${theme.gradient}`}
                          style={{
                            width: `${(tournament.participants / tournament.maxParticipants) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Token Requirement for GATED tournaments */}
                {tournament.type === 'GATED' && tournament.tokenRequirement && (
                  <Card className="border-emerald-200 bg-emerald-50">
                    <CardContent className="p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center text-sm font-medium text-emerald-800">
                          <Coins size={16} className="mr-2" />
                          Token Requirement
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
                      <div className="flex items-center space-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                          <span className="text-lg">
                            {tournament.tokenRequirement.symbol === 'ETH'
                              ? '💎'
                              : '🏆'}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">
                            {tournament.tokenRequirement.name}
                          </div>
                          <div className="text-xs text-gray-600">
                            Required: {tournament.tokenRequirement.minAmount}{' '}
                            {tournament.tokenRequirement.symbol}
                          </div>
                          <div className="text-xs text-emerald-600">
                            You have: {tournament.tokenRequirement.userHolding}{' '}
                            {tournament.tokenRequirement.symbol}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Tournament Markets */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white">
                      <Target size={18} className="mr-2 text-primary" />
                      Markets ({tournament.markets.length})
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {tournament.markets.map((market) => (
                      <Card
                        key={market.id}
                        className="transition-shadow hover:shadow-md"
                      >
                        <CardContent className="p-4">
                          <div className="mb-3 flex items-start space-x-3">
                            <Avatar className="h-12 w-12">
                              <AvatarImage
                                src={market.player.imageUrl}
                                alt={market.player.name}
                                className="object-cover"
                              />
                              <AvatarFallback className="text-sm">
                                {market.player.name
                                  .split(' ')
                                  .map((n) => n[0])
                                  .join('')
                                  .substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="mb-1 flex items-center space-x-2">
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                                  {market.player.name}
                                </h4>
                                {market.player.team && (
                                  <Badge variant="outline" className="text-xs">
                                    {market.player.team}
                                  </Badge>
                                )}
                              </div>
                              <p className="mb-2 text-xs text-gray-600 dark:text-gray-400">
                                {market.title}
                              </p>
                              <div className="flex items-center space-x-4 text-xs">
                                <div className="flex items-center text-gray-500">
                                  <TrendingUp size={10} className="mr-1" />
                                  {market.odds}
                                </div>
                                <div className="flex items-center text-gray-500">
                                  <DollarSign size={10} className="mr-1" />
                                  {market.tvl}
                                </div>
                                <div className="flex items-center text-gray-500">
                                  <Users size={10} className="mr-1" />
                                  {market.participants}
                                </div>
                              </div>
                            </div>
                          </div>

                          <BettingDrawer
                            market={{
                              ...sampleBetMarket,
                              id: market.id,
                              title: market.title,
                              description: market.description,
                              player: market.player,
                              tvl: market.tvl,
                            }}
                            trigger={
                              <Button
                                size="sm"
                                className="hover:bg-primary/90 w-full bg-primary text-xs text-white"
                              >
                                <Target size={12} className="mr-1" />
                                Place Bet
                              </Button>
                            }
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="leaderboard" className="space-y-4">
                {/* Leaderboard */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white">
                      <Trophy size={18} className="mr-2 text-primary" />
                      Top 10 Leaders
                    </h3>
                  </div>

                  <div className="space-y-2">
                    {tournament.leaderboard.slice(0, 10).map((entry) => (
                      <Card
                        key={entry.id}
                        className={`transition-all ${
                          entry.isCurrentUser
                            ? `ring-2 ${theme.border.replace('border-', 'ring-')} ${theme.bg}`
                            : 'hover:shadow-sm'
                        }`}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center space-x-3">
                            <div className="flex w-10 items-center justify-center">
                              {getRankIcon(entry.position)}
                            </div>

                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={entry.avatar}
                                alt={entry.userName}
                                className="object-cover"
                              />
                              <AvatarFallback className="text-sm">
                                {entry.userName
                                  .split(' ')
                                  .map((n) => n[0])
                                  .join('')
                                  .substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                {entry.userName}
                                {entry.isCurrentUser && (
                                  <Badge className="bg-primary/10 ml-2 text-xs text-primary">
                                    You
                                  </Badge>
                                )}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {entry.walletAddress.slice(0, 6)}...
                                {entry.walletAddress.slice(-4)}
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-sm font-bold text-gray-900 dark:text-white">
                                {entry.earnings}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {entry.score} pts
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Share Leaderboard */}
                  <div className="mt-4">
                    <Button
                      onClick={handleShareLeaderboard}
                      disabled={isSharing}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                      size="sm"
                    >
                      <Share2 size={16} className="mr-2" />
                      {isSharing ? 'Generating...' : 'Share Leaderboard'}
                    </Button>
                  </div>
                </div>

                {/* Hidden Shareable Leaderboard Component */}
                <div
                  ref={leaderboardRef}
                  className="fixed -top-[9999px] left-0 w-96 bg-white p-6"
                  style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                >
                  <div
                    className={`${theme.gradient} relative overflow-hidden rounded-t-2xl p-6 text-white`}
                  >
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="relative z-10 text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                        {getTournamentIcon(tournament.type)}
                      </div>
                      <h2 className="mb-1 text-xl font-bold">
                        {tournament.name}
                      </h2>
                      <p className="text-sm text-white/80">
                        Tournament Leaderboard
                      </p>
                      <div className="mt-3 flex items-center justify-center space-x-4 text-sm">
                        <div className="flex items-center">
                          <Trophy size={14} className="mr-1" />
                          {tournament.prize}
                        </div>
                        <div className="flex items-center">
                          <Users size={14} className="mr-1" />
                          {tournament.participants}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4">
                    <div className="space-y-3">
                      {tournament.leaderboard
                        .slice(0, 5)
                        .map((entry, index) => (
                          <div
                            key={entry.id}
                            className="flex items-center space-x-3"
                          >
                            <div className="flex h-8 w-8 items-center justify-center">
                              {index === 0 && (
                                <Crown size={20} className="text-yellow-500" />
                              )}
                              {index === 1 && (
                                <Medal size={20} className="text-gray-400" />
                              )}
                              {index === 2 && (
                                <Medal size={20} className="text-orange-500" />
                              )}
                              {index > 2 && (
                                <span className="text-lg font-bold text-gray-500">
                                  #{entry.position}
                                </span>
                              )}
                            </div>

                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-xs font-bold text-white">
                              {entry.userName.slice(0, 2).toUpperCase()}
                            </div>

                            <div className="flex-1">
                              <div className="text-sm font-semibold text-gray-900">
                                {entry.userName}
                                {entry.isCurrentUser && (
                                  <span className="ml-2 rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                                    You
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-gray-500">
                                {entry.score} points
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-sm font-bold text-gray-900">
                                {entry.earnings}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>

                    <div className="mt-6 border-t border-gray-200 pt-4 text-center">
                      <div className="mb-2 text-xs text-gray-500">
                        Join the competition at
                      </div>
                      <div className="text-sm font-bold text-gray-900">
                        AthleteBet Platform
                      </div>
                      <div className="mt-1 text-xs text-gray-400">
                        Mobile-first athlete betting
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Join Tournament Button */}
            <div className="sticky bottom-0 border-t bg-white pt-4 dark:bg-gray-900">
              <Button
                className={`w-full py-3 font-medium text-white ${theme.gradient} transition-opacity hover:opacity-90`}
                size="lg"
                disabled={
                  tournament.status === 'completed' ||
                  (tournament.type === 'PRIVATE' &&
                    tournament.status === 'invite') ||
                  (tournament.type === 'GATED' &&
                    !hasTokenRequirement(tournament))
                }
              >
                {tournament.type === 'PREMIUM' && (
                  <Crown size={16} className="mr-2" />
                )}
                {tournament.type === 'GATED' && (
                  <Key size={16} className="mr-2" />
                )}
                {tournament.type === 'PRIVATE' && (
                  <Shield size={16} className="mr-2" />
                )}
                {tournament.type === 'OPEN' && (
                  <Globe size={16} className="mr-2" />
                )}

                {tournament.status === 'completed'
                  ? 'Tournament Ended'
                  : tournament.type === 'PRIVATE' &&
                      tournament.status === 'invite'
                    ? 'Invite Only'
                    : tournament.type === 'GATED' &&
                        !hasTokenRequirement(tournament)
                      ? 'Insufficient Tokens'
                      : `Join Tournament • ${tournament.entryFee}`}
              </Button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

// Sample tournament data
export const sampleTournament: Tournament = {
  id: 'tournament-1',
  name: 'NBA Elite Championship',
  description:
    'Compete with the best basketball predictors in our premium tournament',
  type: 'PREMIUM',
  prize: '$50,000',
  entryFee: '$250',
  participants: 1847,
  maxParticipants: 2000,
  difficulty: 'Expert',
  timeRemaining: '2d 14h',
  featured: true,
  status: 'upcoming',
  markets: [
    {
      id: 'market-1',
      title: 'Will LeBron score over 25.5 points?',
      description: 'LeBron James next game points prediction',
      player: {
        name: 'LeBron James',
        imageUrl: '/api/placeholder/48/48',
        sport: 'Basketball',
        team: 'Lakers',
      },
      odds: '1.85x',
      tvl: '$45,230',
      participants: 892,
      type: 'over_under',
    },
    {
      id: 'market-2',
      title: 'Will Stephen Curry hit 6+ threes?',
      description: 'Stephen Curry three-pointers prediction',
      player: {
        name: 'Stephen Curry',
        imageUrl: '/api/placeholder/48/48',
        sport: 'Basketball',
        team: 'Warriors',
      },
      odds: '2.1x',
      tvl: '$32,150',
      participants: 654,
      type: 'over_under',
    },
    {
      id: 'market-3',
      title: 'Will Kevin Durant score 30+ points?',
      description: 'Kevin Durant scoring prediction',
      player: {
        name: 'Kevin Durant',
        imageUrl: '/api/placeholder/48/48',
        sport: 'Basketball',
        team: 'Suns',
      },
      odds: '1.75x',
      tvl: '$28,900',
      participants: 543,
      type: 'over_under',
    },
  ],
  leaderboard: [
    {
      id: '1',
      userName: 'CryptoBaller92',
      walletAddress: '0x742d35Cc6634C0532925a3b8D238E8a3a3A8d3a8',
      position: 1,
      score: 2450,
      earnings: '+$12,580',
      avatar: '/api/placeholder/40/40',
      isCurrentUser: false,
    },
    {
      id: '2',
      userName: 'SportsBetKing',
      walletAddress: '0x123d35Cc6634C0532925a3b8D238E8a3a3A8d123',
      position: 2,
      score: 2340,
      earnings: '+$9,240',
      avatar: '/api/placeholder/40/40',
      isCurrentUser: false,
    },
    {
      id: '3',
      userName: 'You',
      walletAddress: '0x456d35Cc6634C0532925a3b8D238E8a3a3A8d456',
      position: 3,
      score: 2180,
      earnings: '+$7,650',
      avatar: '/api/placeholder/40/40',
      isCurrentUser: true,
    },
    {
      id: '4',
      userName: 'AthletePredictor',
      walletAddress: '0x789d35Cc6634C0532925a3b8D238E8a3a3A8d789',
      position: 4,
      score: 1950,
      earnings: '+$5,820',
      avatar: '/api/placeholder/40/40',
      isCurrentUser: false,
    },
    {
      id: '5',
      userName: 'BasketballPro',
      walletAddress: '0x987d35Cc6634C0532925a3b8D238E8a3a3A8d987',
      position: 5,
      score: 1820,
      earnings: '+$4,200',
      avatar: '/api/placeholder/40/40',
      isCurrentUser: false,
    },
    {
      id: '6',
      userName: 'CourtVision',
      walletAddress: '0x654d35Cc6634C0532925a3b8D238E8a3a3A8d654',
      position: 6,
      score: 1720,
      earnings: '+$3,150',
      avatar: '/api/placeholder/40/40',
      isCurrentUser: false,
    },
    {
      id: '7',
      userName: 'DunkMaster',
      walletAddress: '0x321d35Cc6634C0532925a3b8D238E8a3a3A8d321',
      position: 7,
      score: 1580,
      earnings: '+$2,400',
      avatar: '/api/placeholder/40/40',
      isCurrentUser: false,
    },
    {
      id: '8',
      userName: 'StatGenius',
      walletAddress: '0x147d35Cc6634C0532925a3b8D238E8a3a3A8d147',
      position: 8,
      score: 1420,
      earnings: '+$1,800',
      avatar: '/api/placeholder/40/40',
      isCurrentUser: false,
    },
    {
      id: '9',
      userName: 'GameChanger',
      walletAddress: '0x258d35Cc6634C0532925a3b8D238E8a3a3A8d258',
      position: 9,
      score: 1280,
      earnings: '+$1,200',
      avatar: '/api/placeholder/40/40',
      isCurrentUser: false,
    },
    {
      id: '10',
      userName: 'NBAWatcher',
      walletAddress: '0x369d35Cc6634C0532925a3b8D238E8a3a3A8d369',
      position: 10,
      score: 1150,
      earnings: '+$850',
      avatar: '/api/placeholder/40/40',
      isCurrentUser: false,
    },
  ],
};
