import { create } from 'zustand';

import { UserStore } from '@/types/types';

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  stats: {
    betsCount: 0,
    unreadNotifications: 0,
  },
  setUser: (userData) => set(() => userData),
  clearUser: () =>
    set(() => ({
      user: null,
      stats: {
        betsCount: 0,
        unreadNotifications: 0,
      },
    })),
}));
