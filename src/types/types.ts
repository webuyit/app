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

interface PLAYER {
  id: string;
  name: string;
  mainColor: string;
  profilePicture: string;
  team: TEAM;
  nationality: NATIONALITY;
  createdAt: Date;
}

export interface MARKET {
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
