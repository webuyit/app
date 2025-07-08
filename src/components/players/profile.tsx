'use client';

import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from 'react';
import { use } from 'react';

import { useParams } from 'next/navigation';

import {
  Activity,
  ArrowLeft,
  Calendar,
  DollarSign,
  Flag,
  MapPin,
  Star,
  StarOff,
  Target,
  TrendingUp,
  Trophy,
  Users,
} from 'lucide-react';
import { useTransitionRouter } from 'next-view-transitions';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { BettingDrawer, sampleBetMarket } from '@/components/betting-drawer';
import {
  TournamentDrawer,
  sampleTournament,
} from '@/components/tournament-drawer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatNumberCompact } from '@/lib/format-number-compact';
import { getHighestOdds } from '@/lib/getHighestOdds';
import { MARKET, PLAYER } from '@/types/types';

/* eslint-disable @typescript-eslint/ban-ts-comment */

interface PlayerStats {
  goals?: number;
  assists?: number;
  matchPoints?: number;
  kills?: number;
  roundsWon?: number;
  damageDealt?: number;
  winRate?: number;
  averageScore?: number;
}

interface PlayerPerformance {
  date: string;
  value: number;
  label: string;
}

interface BetMarket {
  id: string;
  title: string;
  description: string;
  odds: string;
  tvl: string;
  participants: number;
  outcomes: Array<{
    id: string;
    label: string;
    odds: number;
    probability: number;
  }>;
}

interface League {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'upcoming' | 'completed';
  position?: string;
  prize?: string;
}

/*interface Player {
  id: number;
  name: string;
  age: number;
  nationality: string;
  team: string;
  sport: string;
  imageUrl: string;
  category: string;
  stats: PlayerStats;
  performance: PlayerPerformance[];
  markets: BetMarket[];
  leagues: League[];
  isFollowing?: boolean;
  followers: number;
}*/

type Props = {
  player: PLAYER;
};

export default function PlayerProfile({ player }: Props) {
  const [isFollowing, setIsFollowing] = useState(false);
  const params = useParams();
  const playerId = params.playerId;
  const router = useTransitionRouter();
  // Get player data based on ID
  const getPlayerData = (id: string): Partial<PLAYER> => {
    const players = {
      '1': {
        id: 1,
        name: 'LeBron James',
        age: 39,
        nationality: 'USA',
        team: 'Los Angeles Lakers',
        sport: 'Basketball',
        imageUrl: '/api/placeholder/120/120',
        category: 'NBA',
        followers: 2847,
        stats: {
          goals: 28,
          assists: 8.1,
          matchPoints: 1250,
          winRate: 68,
          averageScore: 25.4,
        },
      },
      '2': {
        id: 2,
        name: 'Serena Williams',
        age: 42,
        nationality: 'USA',
        team: 'Independent',
        sport: 'Tennis',
        imageUrl: '/api/placeholder/120/120',
        category: 'WTA',
        followers: 3421,
        stats: {
          goals: 0,
          assists: 0,
          matchPoints: 892,
          winRate: 85,
          averageScore: 6.2,
        },
      },
      '3': {
        id: 3,
        name: 'Cristiano Ronaldo',
        age: 39,
        nationality: 'Portugal',
        team: 'Al Nassr',
        sport: 'Football',
        imageUrl: '/api/placeholder/120/120',
        category: 'Saudi Pro League',
        followers: 5124,
        stats: {
          goals: 42,
          assists: 15,
          matchPoints: 1890,
          winRate: 72,
          averageScore: 8.7,
        },
      },
    };

    //@ts-ignore
    return players[id as keyof typeof players] || players['1'];
  };

  const basePlayerData = getPlayerData(
    Array.isArray(playerId) ? playerId[0] : playerId || '1',
  );

  //@ts-expect-error
  const mockPlayer: Player = {
    ...basePlayerData,
    performance: [
      { date: 'Jan', value: 22, label: 'Points' },
      { date: 'Feb', value: 28, label: 'Points' },
      { date: 'Mar', value: 31, label: 'Points' },
      { date: 'Apr', value: 25, label: 'Points' },
      { date: 'May', value: 29, label: 'Points' },
      { date: 'Jun', value: 33, label: 'Points' },
      { date: 'Jul', value: 28, label: 'Points' },
    ],
    markets: [
      {
        id: 'market-1',
        title: 'Points Scored Next Game',
        description: 'Over/Under 25.5 points',
        odds: '1.85x',
        tvl: '$45,200',
        participants: 1284,
        outcomes: [
          { id: 'over', label: 'Over 25.5', odds: 1.85, probability: 54 },
          { id: 'under', label: 'Under 25.5', odds: 1.95, probability: 46 },
        ],
      },
      {
        id: 'market-2',
        title: 'Triple-Double Achievement',
        description: 'Will achieve triple-double in next 3 games',
        odds: '2.25x',
        tvl: '$28,900',
        participants: 892,
        outcomes: [
          { id: 'yes', label: 'Yes', odds: 2.25, probability: 42 },
          { id: 'no', label: 'No', odds: 1.65, probability: 58 },
        ],
      },
      {
        id: 'market-3',
        title: 'Assists Total',
        description: 'Over/Under 8.5 assists next game',
        odds: '1.75x',
        tvl: '$32,100',
        participants: 743,
        outcomes: [
          { id: 'over', label: 'Over 8.5', odds: 1.75, probability: 57 },
          { id: 'under', label: 'Under 8.5', odds: 2.05, probability: 43 },
        ],
      },
    ],
    leagues: [
      {
        id: 'nba-regular',
        name: 'NBA Regular Season',
        type: 'Professional League',
        status: 'active',
        position: '4th in Western Conference',
      },
      {
        id: 'playoffs',
        name: 'NBA Playoffs',
        type: 'Tournament',
        status: 'upcoming',
        prize: '$25M Prize Pool',
      },
      {
        id: 'all-star',
        name: 'NBA All-Star Weekend',
        type: 'Exhibition',
        status: 'completed',
        position: 'MVP Winner',
      },
    ],
  };

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  const getStatIcon = (sport: string) => {
    switch (sport.toLowerCase()) {
      case 'basketball':
        return <Activity size={16} className="text-orange-500" />;
      case 'football':
        return <Target size={16} className="text-green-500" />;
      case 'tennis':
        return <Trophy size={16} className="text-blue-500" />;
      case 'esports':
        return <TrendingUp size={16} className="text-purple-500" />;
      default:
        return <Trophy size={16} className="text-blue-500" />;
    }
  };

  const getStatLabels = (sport: string) => {
    switch (sport.toLowerCase()) {
      case 'basketball':
        return { stat1: 'Avg Points', stat2: 'Assists', stat3: 'Win Rate' };
      case 'football':
        return { stat1: 'Goals', stat2: 'Assists', stat3: 'Win Rate' };
      case 'tennis':
        return { stat1: 'Avg Rating', stat2: 'Aces/Match', stat3: 'Win Rate' };
      default:
        return { stat1: 'Score', stat2: 'Performance', stat3: 'Win Rate' };
    }
  };

  /*   FOOTBALL
  BASEBALL
  TENNIS
  ESPORT
  BASKETBALL*/

  const getComparisonData = (sport: string, playerStats: PlayerStats) => {
    switch (sport.toLowerCase()) {
      case 'BASKETBALL':
        return [
          {
            stat: 'Points',
            player: playerStats.averageScore || 0,
            league: 18.2,
          },
          { stat: 'Assists', player: playerStats.assists || 0, league: 5.4 },
          { stat: 'Rebounds', player: 7.3, league: 6.8 },
          { stat: 'Efficiency', player: 28.5, league: 19.1 },
        ];
      case 'FOOTBALL':
        return [
          { stat: 'Goals', player: playerStats.goals || 0, league: 12.5 },
          { stat: 'Assists', player: playerStats.assists || 0, league: 8.2 },
          { stat: 'Shots', player: 4.2, league: 3.1 },
          {
            stat: 'Rating',
            player: playerStats.averageScore || 0,
            league: 6.8,
          },
        ];
      case 'TENNIS':
        return [
          { stat: 'Aces', player: 8.5, league: 5.2 },
          { stat: 'Win %', player: playerStats.winRate || 0, league: 65 },
          { stat: 'Break %', player: 42, league: 35 },
          {
            stat: 'Rating',
            player: playerStats.averageScore || 0,
            league: 5.8,
          },
        ];
      default:
        return [
          {
            stat: 'Score',
            player: playerStats.averageScore || 0,
            league: 15.0,
          },
          { stat: 'Performance', player: 85, league: 70 },
          { stat: 'Consistency', player: 78, league: 65 },
          { stat: 'Win Rate', player: playerStats.winRate || 0, league: 60 },
        ];
    }
  };

  const getLeagueStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'completed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="text-gray-600 dark:text-gray-400"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            Player Profile
          </h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="mx-auto max-w-md">
        {/* Player Overview */}
        <div className="border-b border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-start space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={player.profilePicture}
                alt={player.name}
                className="object-cover"
              />
              <AvatarFallback className="text-lg">
                {mockPlayer.name
                  .split(' ')
                  .map((n: string) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                    {player.name}
                  </h2>
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Flag size={14} className="mr-2" />
                      {player.nationality.name}, {player.age} years
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Users size={14} className="mr-2" />
                      {mockPlayer.team}
                    </div>
                    <Badge className="bg-primary/10 text-xs text-primary">
                      {player.category}
                    </Badge>
                  </div>
                </div>

                <Button
                  onClick={handleFollowToggle}
                  size="sm"
                  variant={isFollowing ? 'default' : 'outline'}
                  className="ml-4"
                >
                  {isFollowing ? (
                    <>
                      <Star size={16} className="mr-1 fill-current" />
                      Following
                    </>
                  ) : (
                    <>
                      <StarOff size={16} className="mr-1" />
                      Follow
                    </>
                  )}
                </Button>
              </div>

              <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                {formatNumberCompact(mockPlayer.followers, {
                  decimals: 1,
                })}{' '}
                followers
              </div>
            </div>
          </div>
        </div>

        {/* Performance Charts */}
        <div className="border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white">
              {getStatIcon(player.category)}
              <span className="ml-2">Performance</span>
            </h3>
            <Badge variant="outline" className="text-xs">
              Last 6 months
            </Badge>
          </div>

          {/* Stats Grid */}
          <div className="mb-6 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {mockPlayer.stats.averageScore}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Avg Points
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {mockPlayer.stats.assists}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Assists
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {mockPlayer.stats.winRate}%
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Win Rate
              </div>
            </div>
          </div>

          {/* Performance Chart - Sorare Style */}
          <Tabs defaultValue="performance" className="w-full">
            <TabsList className="mb-4 grid w-full grid-cols-2">
              <TabsTrigger value="performance" className="text-xs">
                Performance
              </TabsTrigger>
              <TabsTrigger value="comparison" className="text-xs">
                vs League Avg
              </TabsTrigger>
            </TabsList>

            <TabsContent value="performance" className="mt-0">
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockPlayer.performance}>
                    <defs>
                      <linearGradient
                        id="performanceGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="oklch(76.8% 0.233 130.85)"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="oklch(76.8% 0.233 130.85)"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="2 2" stroke="#f3f4f6" />
                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: '#9ca3af' }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: '#9ca3af' }}
                      domain={['dataMin - 2', 'dataMax + 2']}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                        color: '#111827',
                        fontSize: '12px',
                      }}
                      labelStyle={{ color: '#6b7280', fontSize: '11px' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="oklch(76.8% 0.233 130.85)"
                      strokeWidth={2.5}
                      fill="url(#performanceGradient)"
                      dot={{
                        fill: 'oklch(76.8% 0.233 130.85)',
                        strokeWidth: 0,
                        r: 3,
                      }}
                      activeDot={{
                        r: 5,
                        stroke: 'oklch(76.8% 0.233 130.85)',
                        strokeWidth: 2,
                        fill: 'white',
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="comparison" className="mt-0">
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={getComparisonData(mockPlayer.sport, mockPlayer.stats)}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="2 2" stroke="#f3f4f6" />
                    <XAxis
                      dataKey="stat"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: '#9ca3af' }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: '#9ca3af' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '12px',
                      }}
                    />
                    <Bar
                      dataKey="league"
                      fill="#e5e7eb"
                      radius={[2, 2, 0, 0]}
                      name="League Avg"
                    />
                    <Bar
                      dataKey="player"
                      fill="oklch(76.8% 0.233 130.85)"
                      radius={[2, 2, 0, 0]}
                      name={mockPlayer.name}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Live Markets */}
        <div className="border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white">
              <Target size={18} className="mr-2 text-primary" />
              Live Markets ({player.markets.length})
            </h3>
          </div>

          <div className="space-y-3">
            {player.markets.map((market: MARKET) => (
              <Card
                key={market.id}
                className="transition-shadow hover:shadow-md"
              >
                <CardContent className="p-4">
                  <div className="mb-3">
                    <h4 className="mb-1 text-sm font-semibold capitalize text-gray-900 dark:text-white">
                      {market.title}
                    </h4>
                    <p className="mb-2 text-xs capitalize text-gray-600 dark:text-gray-400">
                      {market.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center">
                        <TrendingUp size={10} className="mr-1" />
                        {getHighestOdds(market.outcomes)}
                      </div>
                      <div className="flex items-center">
                        <DollarSign size={10} className="mr-1" />
                        {market.totalPools}
                      </div>
                      <div className="flex items-center">
                        <Users size={10} className="mr-1" />
                        400
                      </div>
                    </div>
                  </div>

                  <BettingDrawer
                    market={{
                      ...sampleBetMarket,
                      id: market.id,
                      title: market.title,
                      description: market.description,
                      player: {
                        name: player.name,
                        imageUrl: player.profilePicture,
                        sport: player.category,
                      },
                      tvl: formatNumberCompact(market.totalPools),
                      outcomes: market.outcomes,
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

        {/* Leagues Involved */}
        <div className="hidden bg-white p-4 dark:bg-gray-800">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white">
              <Trophy size={18} className="mr-2 text-primary" />
              Active Leagues ({mockPlayer.leagues.length})
            </h3>
          </div>

          <div className="hidden space-y-3">
            {}
            {/*@ts-ignore   */}
            {mockPlayer.leagues.map((league) => (
              <Card
                key={league.id}
                className="transition-shadow hover:shadow-sm"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center space-x-2">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                          {league.name}
                        </h4>
                        <Badge
                          className={`text-xs ${getLeagueStatusColor(league.status)}`}
                        >
                          {league.status}
                        </Badge>
                      </div>
                      <p className="mb-1 text-xs text-gray-600 dark:text-gray-400">
                        {league.type}
                      </p>
                      {league.position && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {league.position}
                        </p>
                      )}
                      {league.prize && (
                        <p className="text-xs text-green-600 dark:text-green-400">
                          {league.prize}
                        </p>
                      )}
                    </div>

                    <div className="text-right">
                      <Calendar size={16} className="text-gray-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
