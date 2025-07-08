import { Interface } from 'readline';

export interface SLIDE_DATA {
  cover?: string;
  title: string;
  description?: string;
  cta?: string;
  className?: string;
}

export interface USER_PROFILE_PROPS {
  email?: string;
  userName?: string;
  firstName?: string;
  lastName?: string;
  publicKey: string;
  walletSource: string;
  privyId: string;
  authMethod: string;
  fullName?: string;
  profilePicture?: string;
}

interface CLUB {
  name?: string;
  clubLogo: string;
}

export interface OUTCOME {
  id: string;
  label: string;
  totalStaked: number;
  bettorsCount: number;
  effectiveStake: number;
  odds: number;
  impliedProbability: number;
}

interface TEAM {
  id: string;
  name: string;
  logo: string;
  league: LEAGUE;
}
interface LEAGUE {
  id: string;
  name: string;
}

interface NATIONALITY {
  id: string;
  name: string;
  flag: string;
}

export interface PLAYER {
  id: string;
  name: string;
  mainColor: string;
  profilePicture: string;
  category: string;
  team: TEAM;
  nationality: NATIONALITY;
  createdAt: Date;
  verified?: boolean;
}

export interface MATCH {
  id: string;
  title: string;
  coverUrl: string;
  category: string;
  description: string;
  teamAId: string;
  teamBId: string;
  matchStatus:
    | 'UPCOMING'
    | 'LIVE'
    | 'COMPLETED'
    | 'DELAYED'
    | 'ENDED'
    | 'CANCELLED';
  startsAt: Date;
  endsAt: Date;
  createdAt: Date;
  teamA: TEAM;
  teamB: TEAM;
  markets: MARKET[];
}

// PLAYER CONTAINER

type Container = {
  player: PLAYER;
};
export interface MARKET {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  isHot: boolean;
  isFeatured: boolean;
  category?: 'ESPORT' | 'FOOTBALL' | 'BASEBALL' | 'SOCCER' | 'FANTASY';
  status:
    | 'OPEN'
    | 'CLOSED'
    | 'PENDING'
    | 'DELAYED'
    | 'ENDED'
    | 'RESOLVED'
    | 'LIVE';
  marketType:
    | 'CUSTOM'
    | 'SPONSORED'
    | 'PARTENERSHIP'
    | 'FRIENDLY'
    | 'TOURNAMENT';
  startsAt: Date;
  endsAt: Date;
  createdAt: Date;
  resolvedAt?: Date;
  closedAt?: Date;
  sponsoredStake?: number;
  feePercent?: number;
  creatorFeeShare?: number;
  creator?: MIN_USER;
  players: Container[];
  outcomes: OUTCOME[];
  Match: MATCH;
  totalPools: number;
}

export interface TOURNAMENT {
  id: string;
  title: string;
  description: string;
  featured: boolean;
  coverUrl: string;
  themeColor: string;
  type: 'OPEN' | 'PRIVATE' | 'PREMIUM' | 'ESPORTS' | 'FANTASY';
  entryType: 'OPEN' | 'PREMIUM' | 'GATED' | 'PRIVATE';
  scoringType: 'TOTAL_POINTS' | 'WINS_ONLY';
  status: 'UPCOMING';
  entryFee: number;
  requiredToken: string;
  requiredTokenAmount: number;
  requiredTokenName: string;
  requiredTokenSymbol: string;
  requiredTokenLogoUrl: string;
  maxParticipants: number;
  entryDescription: string;
  prizePool: number;
  creatorId: string;
  participants: number;
  markets: MARKET[];
  startsAt: Date;
  endsAt: Date;
  createdAt: Date;
  resolvedAt: Date;
  closedAt: Date;
  creator: MIN_USER;
}

interface MIN_USER {
  id: string;
  fullName: string;
  profilePicture: string;
}

export interface POPULAR_GAMES_CARD {
  player: PLAYER;
  title: string;
  club: CLUB;
  endTime: Date;
  outcomes: OUTCOME;
}

interface PAGINATION {
  total: number;
  page: number;
  limit: number;
}
// PLAYERS LIST
export interface PLAYERS {
  players: PLAYER[];
  pagination: PAGINATION;
}
//MARKETS LIST
export interface MARKETS {
  markets: MARKET[];
  pagination: PAGINATION;
}
//TOURNAMENTS LIST
export interface TOURNAMENTS {
  tornaments: TOURNAMENT[];
  pagination: PAGINATION;
}
export interface ANNOUNCEMENTS_TYPE {
  title: string;
  content: string;
  icon: string;
  isActive: boolean;
  order: number;
}

export interface WalletInfo {
  walletSource: string;
  name: string;
  publicKey: string;
  active: boolean;
}

export interface UserProfile {
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
  wallets: WalletInfo[];
}

export interface UserStats {
  betsCount: number;
  unreadNotifications: number;
}

export interface UserStore {
  user: UserProfile | null;
  stats: UserStats;
  setUser: (userData: { user: UserProfile; stats: UserStats }) => void;
  clearUser: () => void;
}

/*

{
  "user": {
    "id": "cmc0cdd350000tpqwpul4us7k",
    "privyId": "did:privy:cmbdp6ry100r3l40msy6ptnby",
    "clerkId": null,
    "faucetPoints": 100,
    "points": 0,
    "profilePicture": "https://pbs.twimg.com/profile_images/1926921314402447361/-dgoMdlT_normal.png",
    "firstName": null,
    "lastName": null,
    "fullName": "GOAT 🐐",
    "authMethod": "TWITTER",
    "email": "",
    "phone": null,
    "username": null,
    "lastClaimedAt": null,
    "createdAt": "2025-06-17T09:49:37.024Z",
    "updatedAt": "2025-06-17T09:49:37.024Z",
    "earlyAccess": false,
    "degenMode": false,
    "referralCode": "tEMy3y",
    "referredById": null,
    "wallets": [
      {
        "walletSource": "PRIVY",
        "name": "PRIVY",
        "publicKey": "0x9CCB751a2BC4061B9d6cA49c71412Ae0e414bc8f",
        "active": true
      }
    ]
  },
  "stats": {
    "betsCount": 0,
    "unreadNotifications": 0
  }
}*/
