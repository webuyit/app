export type Wallet = {
  walletSource: string;
  name: string;
  publicKey: string;
  active: boolean;
};

export type User = {
  id: string;
  privyId: string;
  clerkId: string | null;
  faucetPoints: number;
  points: number;
  profilePicture: string;
  firstName: string | null;
  lastName: string | null;
  fullName: string;
  authMethod: string;
  email: string;
  phone: string | null;
  username: string | null;
  lastClaimedAt: string | null;
  createdAt: string;
  updatedAt: string;
  earlyAccess: boolean;
  degenMode: boolean;
  referralCode: string;
  referredById: string | null;
  wallets: Wallet[];
};

export type UserStats = {
  betsCount: number;
  unreadNotifications: number;
};

export type UserResponse = {
  user: User;
  stats: UserStats;
};

export type UserStore = {
  user: any;
  stats: {
    betsCount: number;
    unreadNotifications: number;
  };
  setUser: (user: any) => void;
  setStats: (stats: { betsCount: number; unreadNotifications: number }) => void;
  clearUser: () => void;
};
