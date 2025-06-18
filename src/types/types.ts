import { Interface } from 'readline';

export interface SLIDE_DATA {
  cover?: string;
  title: string;
  description?: string;
  cta?: string;
  className?: string;
}

export interface USER_PROFILE_PROPS {
  email: string;
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
  ooverUrl: string;
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
