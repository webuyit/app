import { create } from 'zustand';

import { UserStore } from '@/types/user';

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  stats: {
    betsCount: 0,
    unreadNotifications: 0,
  },
  setUser: (user) => set(() => ({ user })),
  setStats: (stats) => set(() => ({ stats })),
  clearUser: () =>
    set(() => ({
      user: null,
      stats: { betsCount: 0, unreadNotifications: 0 },
    })),
}));
