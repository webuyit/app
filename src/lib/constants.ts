import {
  IconBell,
  IconBrandDiscord,
  IconBrandTelegram,
  IconBrandX,
  IconClipboardList,
  IconHome,
  IconUser,
  IconWorldWww,
} from '@tabler/icons-react';

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
