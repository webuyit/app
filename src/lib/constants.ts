import {
  IconBell,
  IconBrandDiscord,
  IconBrandTelegram,
  IconBrandX,
  IconClipboardList,
  IconDeviceGamepad,
  IconDeviceGamepad2,
  IconHome,
  IconUser,
  IconWorldWww,
} from '@tabler/icons-react';
import { FaDiscord, FaGlobe, FaTelegram, FaTwitter } from 'react-icons/fa';

import { ANNOUNCEMENTS_TYPE, MARKET } from '@/types/types';

export const SERVER_URL = 'http://localhost:4000/api/v1/';
export const DEMO_USER = 'cmb7l7a000001tpl8tniob02w';

export const SOCIAL_LINKS = [
  {
    name: 'Discord',
    link: 'link',
    icon: IconBrandDiscord,
  },
  {
    name: 'Twitter',
    link: 'link',
    icon: IconBrandX,
  },
  {
    name: 'Telegram',
    link: 'link',
    icon: IconBrandTelegram,
  },
  {
    name: 'Website',
    link: '//',
    icon: IconWorldWww,
  },
];

export const bottomNavbar = [
  {
    title: 'Home',
    icon: IconHome,
    url: '/home',
  },
  {
    title: 'Contracts',
    icon: IconClipboardList,
    url: '/contracts',
  },
  {
    title: 'Battle',
    icon: IconDeviceGamepad2,
    url: '/games',
  },
  {
    title: 'Notifications',
    icon: IconBell,
    url: '/notifications',
  },
  {
    title: 'Profile',
    icon: IconUser,
    url: '/profile',
  },
];

// PLACEHOLDERS DEMOS

export const players = [
  {
    name: 'Haaland',
    avatar: '/img/player-1.webp',
    id: 'playerId',
  },
  {
    name: 'Haaland',
    avatar: '/img/player-1.webp',
    id: 'playerId',
  },
  {
    name: 'Haaland',
    avatar: '/img/player-1.webp',
    id: 'playerId',
  },
  {
    name: 'Haaland',
    avatar: '/img/player-1.webp',
    id: 'playerId',
  },
  {
    name: 'Haaland',
    avatar: '/img/player-1.webp',
    id: 'playerId',
  },
  {
    name: 'Haaland',
    avatar: '/img/player-1.webp',
    id: 'playerId',
  },
  {
    name: 'Haaland',
    avatar: '/img/player-1.webp',
    id: 'playerId',
  },
  {
    name: 'Haaland',
    avatar: '/img/player-1.webp',
    id: 'playerId',
  },
];

export const popularBets = [
  {
    id: '33',
    title: 'Arsenal vs Man City',
    status: 'OPEN',
    marketType: 'CUSTOM',
    cover: '/img/player-1.webp',
    player: '/img/player-1.webp',
    clubLogo: '/img/club.svg',
    startsAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
    endsAt: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // 4 hours from now
    createdAt: new Date(Date.now()),
    closedAt: new Date(Date.now()),
    sponsoredStake: 300,
    feePercent: 4,
    players: [
      {
        id: 'some id',
        name: 'Haaland',
        mainColor: 'blue',
        profilePicture: '/img/player-1.webp',
        team: {
          name: 'Ynaga',
          logo: '/img/club.svg',
        },
      },
    ],
    outcomes: [
      { label: 'Yes', odds: 3.7 },
      { label: 'No', odds: 4 },
    ],
  },
  {
    id: '33',
    title: 'Arsenal vs Man City',
    status: 'OPEN',
    marketType: 'CUSTOM',

    cover: '/img/player-1.webp',
    player: '/img/player-1.webp',
    clubLogo: '/img/club.svg',
    startsAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
    endsAt: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // 4 hours from now
    createdAt: new Date(Date.now()),
    closedAt: new Date(Date.now()),
    sponsoredStake: 300,
    feePercent: 4,
    players: [
      {
        id: 'some id',
        name: 'Haaland',
        mainColor: 'blue',
        profilePicture: '/img/player-1.webp',
        team: {
          name: 'Ynaga',
          logo: '/img/club.svg',
        },
      },
    ],
    outcomes: [
      { label: 'Yes', odds: 3.7 },
      { label: 'No', odds: 4 },
    ],
  },
  {
    id: '33',
    title: 'Arsenal vs Man City',
    status: 'OPEN',
    marketType: 'CUSTOM',

    cover: '/img/player-1.webp',
    player: '/img/player-1.webp',
    clubLogo: '/img/club.svg',
    startsAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
    endsAt: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // 4 hours from now
    createdAt: new Date(Date.now()),
    closedAt: new Date(Date.now()),
    sponsoredStake: 300,
    feePercent: 4,
    players: [
      {
        id: 'some id',
        name: 'Haaland',
        mainColor: 'blue',
        profilePicture: '/img/player-1.webp',
        team: {
          name: 'Ynaga',
          logo: '/img/club.svg',
        },
      },
    ],
    outcomes: [
      { label: 'Yes', odds: 3.7 },
      { label: 'No', odds: 4 },
    ],
  },
  {
    id: '33',
    title: 'Arsenal vs Man City',
    status: 'OPEN',
    marketType: 'CUSTOM',

    cover: '/img/player-1.webp',
    player: '/img/player-1.webp',
    clubLogo: '/img/club.svg',
    startsAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
    endsAt: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // 4 hours from now
    createdAt: new Date(Date.now()),
    closedAt: new Date(Date.now()),
    sponsoredStake: 300,
    feePercent: 4,
    players: [
      {
        id: 'some id',
        name: 'Haaland',
        mainColor: 'blue',
        profilePicture: '/img/player-1.webp',
        team: {
          name: 'Ynaga',
          logo: '/img/club.svg',
        },
      },
    ],
    outcomes: [
      { label: 'Yes', odds: 3.7 },
      { label: 'No', odds: 4 },
    ],
  },
  {
    id: '33',
    title: 'Arsenal vs Man City',
    status: 'OPEN',
    marketType: 'CUSTOM',

    cover: '/img/player-1.webp',
    player: '/img/player-1.webp',
    clubLogo: '/img/club.svg',
    startsAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
    endsAt: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // 4 hours from now
    createdAt: new Date(Date.now()),
    closedAt: new Date(Date.now()),
    sponsoredStake: 300,
    feePercent: 4,
    players: [
      {
        id: 'some id',
        name: 'Haaland',
        mainColor: 'blue',
        profilePicture: '/img/player-1.webp',
        team: {
          name: 'Ynaga',
          logo: '/img/club.svg',
        },
      },
    ],
    outcomes: [
      { label: 'Yes', odds: 3.7 },
      { label: 'No', odds: 4 },
    ],
  },
  {
    id: '33',
    title: 'Arsenal vs Man City',
    status: 'OPEN',
    marketType: 'CUSTOM',

    cover: '/img/player-1.webp',
    player: '/img/player-1.webp',
    clubLogo: '/img/club.svg',
    startsAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
    endsAt: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // 4 hours from now
    createdAt: new Date(Date.now()),
    closedAt: new Date(Date.now()),
    sponsoredStake: 300,
    feePercent: 4,
    players: [
      {
        id: 'some id',
        name: 'Haaland',
        mainColor: 'blue',
        profilePicture: '/img/player-1.webp',
        team: {
          name: 'Ynaga',
          logo: '/img/club.svg',
        },
      },
    ],
    outcomes: [
      { label: 'Yes', odds: 3.7 },
      { label: 'No', odds: 4 },
    ],
  },
  {
    id: '33',
    title: 'Arsenal vs Man City',
    status: 'OPEN',
    marketType: 'CUSTOM',

    cover: '/img/player-1.webp',
    player: '/img/player-1.webp',
    clubLogo: '/img/club.svg',
    startsAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
    endsAt: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // 4 hours from now
    createdAt: new Date(Date.now()),
    closedAt: new Date(Date.now()),
    sponsoredStake: 300,
    feePercent: 4,
    players: [
      {
        id: 'some id',
        name: 'Haaland',
        mainColor: 'blue',
        profilePicture: '/img/player-1.webp',
        team: {
          name: 'Ynaga',
          logo: '/img/club.svg',
        },
      },
    ],
    outcomes: [
      { label: 'Yes', odds: 3.7 },
      { label: 'No', odds: 4 },
    ],
  },
  {
    id: '33',
    title: 'Arsenal vs Man City',
    status: 'OPEN',
    marketType: 'CUSTOM',

    cover: '/img/player-1.webp',
    player: '/img/player-1.webp',
    clubLogo: '/img/club.svg',
    startsAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
    endsAt: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // 4 hours from now
    createdAt: new Date(Date.now()),
    closedAt: new Date(Date.now()),
    sponsoredStake: 300,
    feePercent: 4,
    players: [
      {
        id: 'some id',
        name: 'Haaland',
        mainColor: 'blue',
        profilePicture: '/img/player-1.webp',
        team: {
          name: 'Ynaga',
          logo: '/img/club.svg',
        },
      },
    ],
    outcomes: [
      { label: 'Yes', odds: 3.7 },
      { label: 'No', odds: 4 },
    ],
  },
];

export const upcomingMarkets: MARKET[] = [
  {
    id: 'market-001',
    title: 'Champions Clash: Alpha FC vs Thunderbolt',
    category: 'FOOTBALL' as const,
    status: 'OPEN',
    marketType: 'TOURNAMENT',
    startsAt: new Date('2025-06-16T18:00:00Z'),
    endsAt: new Date('2025-06-16T20:00:00Z'),
    createdAt: new Date('2025-06-14T10:00:00Z'),
    players: [
      {
        id: 'player-001',
        name: 'Leo Blaze',
        mainColor: '#FF5733',
        profilePicture: '/img/player-1.webp',
        category: 'Forward',
        createdAt: new Date(),
        team: {
          id: 'team-001',
          name: 'Alpha FC',
          logo: '/img/player-1.webp',
          league: { id: 'league-001', name: 'Premier League' },
        },
        nationality: {
          id: 'nat-001',
          name: 'Brazil',
          flag: '/img/player-1.webp',
        },
      },
    ],
    outcomes: [
      {
        id: 'outcome-001',
        label: 'Alpha FC Wins',
        totalStaked: 1200,
        bettorsCount: 60,
        effectiveStake: 1150,
        odds: 2.1,
        impliedProbability: 0.47,
      },
      {
        id: 'outcome-002',
        label: 'Thunderbolt Wins',
        totalStaked: 800,
        bettorsCount: 40,
        effectiveStake: 780,
        odds: 2.8,
        impliedProbability: 0.36,
      },
    ],
    match: {
      id: 'match-001',
      title: 'Alpha FC vs Thunderbolt',
      coverUrl: '/img/player-1.webp',
      category: 'FOOTBALL',
      description: 'A fierce knockout clash in the tournament quarter-finals.',
      teamAId: 'team-001',
      teamBId: 'team-002',
      matchStatus: 'UPCOMING',
      startsAt: new Date('2025-06-16T18:00:00Z'),
      endsAt: new Date('2025-06-16T20:00:00Z'),
      createdAt: new Date('2025-06-14T10:00:00Z'),
      teamA: {
        id: 'team-001',
        name: 'Alpha FC',
        logo: '/img/player-1.webp',
        league: { id: 'league-001', name: 'Premier League' },
      },
      teamB: {
        id: 'team-002',
        name: 'Thunderbolt',
        logo: '/img/player-1.webp',
        league: { id: 'league-001', name: 'Premier League' },
      },
      markets: [],
    },
    creator: {
      id: 'user-001',
      fullName: 'Admin Creator',
      profilePicture: '/img/player-1.webp',
    },
  },

  // Repeat the structure for 6 more upcoming markets
  {
    id: 'market-002',
    title: 'Galaxy United vs StrikeForce - Showdown',
    category: 'SOCCER' as const,
    status: 'OPEN',
    marketType: 'FRIENDLY',
    startsAt: new Date('2025-06-17T17:00:00Z'),
    endsAt: new Date('2025-06-17T19:00:00Z'),
    createdAt: new Date('2025-06-13T09:00:00Z'),
    players: [],
    outcomes: [
      {
        id: 'outcome-003',
        label: 'Galaxy United',
        totalStaked: 1500,
        bettorsCount: 70,
        effectiveStake: 1450,
        odds: 1.9,
        impliedProbability: 0.53,
      },
      {
        id: 'outcome-004',
        label: 'StrikeForce',
        totalStaked: 900,
        bettorsCount: 45,
        effectiveStake: 880,
        odds: 3.0,
        impliedProbability: 0.33,
      },
    ],
    match: {
      id: 'match-002',
      title: 'Galaxy United vs StrikeForce',
      coverUrl: '/img/player-1.webp',
      category: 'SOCCER',
      description: 'Two clubs face off for regional dominance.',
      teamAId: 'team-003',
      teamBId: 'team-004',
      matchStatus: 'UPCOMING',
      startsAt: new Date('2025-06-17T17:00:00Z'),
      endsAt: new Date('2025-06-17T19:00:00Z'),
      createdAt: new Date('2025-06-13T09:00:00Z'),
      teamA: {
        id: 'team-003',
        name: 'Galaxy United',
        logo: '/img/player-1.webp',
        league: { id: 'league-002', name: 'MLS' },
      },
      teamB: {
        id: 'team-004',
        name: 'StrikeForce',
        logo: '/img/player-1.webp',
        league: { id: 'league-002', name: 'MLS' },
      },
      markets: [],
    },
    creator: {
      id: 'user-002',
      fullName: 'Jane Predictor',
      profilePicture: '/img/player-1.webp',
    },
  },

  // Add 5 more markets following the same structure
  ...Array.from({ length: 5 }).map((_, i) => ({
    id: `market-00${i + 3}`,
    title: `Fantasy Duel ${i + 1}`,
    category: 'FANTASY' as const,
    status: 'OPEN' as const,
    marketType: 'CUSTOM' as const,
    startsAt: new Date(`2025-06-${18 + i}T16:00:00Z`),
    endsAt: new Date(`2025-06-${18 + i}T18:00:00Z`),
    createdAt: new Date('2025-06-13T08:00:00Z'),
    players: [],
    outcomes: [
      {
        id: `outcome-a${i}`,
        label: `Player A Wins`,
        totalStaked: 500 + i * 100,
        bettorsCount: 25 + i * 5,
        effectiveStake: 480 + i * 100,
        odds: 2.5,
        impliedProbability: 0.4,
      },
      {
        id: `outcome-b${i}`,
        label: `Player B Wins`,
        totalStaked: 700 + i * 100,
        bettorsCount: 35 + i * 5,
        effectiveStake: 690 + i * 100,
        odds: 2.0,
        impliedProbability: 0.5,
      },
    ],
    match: {
      id: `match-00${i + 3}`,
      title: `Fantasy Duel Match ${i + 1}`,
      coverUrl: '/img/player-1.webp',
      category: 'FANTASY',
      description: 'A fantasy-based prediction contest.',
      teamAId: `team-a${i}`,
      teamBId: `team-b${i}`,
      matchStatus: 'UPCOMING',
      startsAt: new Date(`2025-06-${18 + i}T16:00:00Z`),
      endsAt: new Date(`2025-06-${18 + i}T18:00:00Z`),
      createdAt: new Date('2025-06-13T08:00:00Z'),
      teamA: {
        id: `team-a${i}`,
        name: `Team A${i}`,
        logo: '/img/player-1.webp',
        league: { id: 'league-003', name: 'Fantasy League' },
      },
      teamB: {
        id: `team-b${i}`,
        name: `Team B${i}`,
        logo: '/img/player-1.webp',
        league: { id: 'league-003', name: 'Fantasy League' },
      },
      markets: [],
    },
    creator: {
      id: `user-00${i + 3}`,
      fullName: `User ${i + 3}`,
      profilePicture: '/img/player-1.webp',
    },
  })),
];

export const COIN_URL = `https://testnet.kizzy.io/icons/coin_icon.svg`;
export const CHILIZ_LOGO =
  'https://pbs.twimg.com/profile_images/1912259716035534848/uGaHzKsK_400x400.png';

export const FAKE_ENDPOINT_FROM_TEST = 'http://localhost:5000/';

export const announcements: ANNOUNCEMENTS_TYPE[] = [
  {
    title: 'Welcome Bonus',
    content: '🔥 Welcome Bonus: Get 100% match up to $500!',
    icon: 'star',
    isActive: true,
    order: 1,
  },
  {
    title: 'Live Game',
    content: '⚡ Live: Lakers vs Warriors - Bet now!',
    icon: 'trophy',
    isActive: true,
    order: 2,
  },
  {
    title: 'Daily Picks',
    content: '🎯 Daily Picks: 85% win rate this week',
    icon: 'gift',
    isActive: true,
    order: 3,
  },
];

export const socialLinks = [
  { name: 'Discord', icon: FaDiscord, color: '#5865F2', href: '#' },
  { name: 'Twitter', icon: FaTwitter, color: '#1DA1F2', href: '#' },
  { name: 'Telegram', icon: FaTelegram, color: '#0088CC', href: '#' },
  { name: 'Website', icon: FaGlobe, color: '#6B7280', href: '#' },
];
