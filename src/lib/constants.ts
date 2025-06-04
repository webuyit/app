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

import { MARKET } from '@/types/types';

export const SERVER_URL = 'http://localhost:5000/api/v1/';
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

export const announcements = [
  {
    title: 'The announcement title',
    description: 'description here',
    link: '/somelinkshere',
    coverUrl: '/img/cover.jpeg',
  },
  {
    title: 'The announcement title',
    description: 'description here',
    link: '/somelinkshere',
    coverUrl: '/img/cover.jpeg',
  },
  {
    title: 'The announcement title',
    description: 'description here',
    link: '/somelinkshere',
    coverUrl: '/img/cover.jpeg',
  },
  {
    title: 'The announcement title',
    description: 'description here',
    link: '/somelinkshere',
    coverUrl: '/img/cover.jpeg',
  },
  {
    title: 'The announcement title',
    description: 'description here',
    link: '/somelinkshere',
    coverUrl: '/img/cover.jpeg',
  },
];

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

// lib/constants.ts

/*export interface MARKET {
  id: string;
  title: string;
  status: 'OPEN' | 'CLOSED' | 'PENDING' | 'DELAYED' | 'ENDED' | 'RESOLVED';
  marketType:
    | 'CUSTOM'
    | 'SPONSORED'
    | 'PARTENERSHIP'
    | 'FRIENDLY'
    | 'TOURNAMENT';
  startsAt: Date;
  endsAt: Date;
  createdAt: Date;
  resolvedAt: Date;
  closedAt: Date;
  sponsoredStake: number;
  feePercent: number;
  creatorFeeShare: number;
  creator: MIN_USER;
  players: PLAYER[];
  outcomes: OUTCOME[];
}*/
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
