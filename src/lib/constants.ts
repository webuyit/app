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

export const SERVER_URL = 'http://localhost:4000/api/v1/'; ///'https://goat-back-end.onrender.com/api/v1/';
export const DEMO_USER = 'cmc0cdd350000tpqwpul4us7k';
export const MAX_ODDS_CAP = 10;
export const CONSTANT_VIRTUAL_STAKE = 50;

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

export const tutorials = [
  {
    title: 'Whats GOAT?',
    cover: '/img/step-1.png',
    href: '/learn/what-is-goat',
  },
  {
    title: 'Whats Tournaments?',
    cover: '/img/compete.png',
    href: '/learn/tournaments',
  },
  {
    title: 'Whats PvP?',
    cover: '/img/compete.png',
    href: '/learn/pvp',
  },
];
