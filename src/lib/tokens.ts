import axios from 'axios';

type MoralisToken = {
  symbol: string;
  name: string;
  token_address: string;
  balance_formatted: string;
  usd_price: number;
  logo: string | null;
};

export type EnhancedToken = {
  symbol: string;
  name: string;
  token_address: string;
  balance_formatted: string;
  usd_price: number;
  usd_value: number;
  logo: string;
  price_change_24h?: number;
  price_change_percent_24h: number;
  price_change_usd_24h: number;
};

type PriceChange = {
  changeUsd: string;
  changePercent: string;
  isPositive: boolean;
  indicator: 'up' | 'down' | 'neutral';
};

const preferredOrder = ['CHZ', 'JUV', 'CITY', 'PSG', 'BAR']; // your preferred token order
const tokenDisplayLimit = 5; // max to show

const COINGECKO_API = 'https://api.coingecko.com/api/v3';
const COINGECKO_TOKENS: Record<string, string> = {
  CHZ: 'chiliz',
  OG: 'og-fan-token',
  SANTOS: 'santos-fc-fan-token',
  PSG: 'paris-saint-germain-fan-token',
  JUV: 'juventus-fan-token',
  CITY: 'manchester-city-fan-token',
  BAR: 'fc-barcelona-fan-token',
  // Add more mappings
};

export const DEFAULT_TOKENS = [
  {
    symbol: 'CHZ',
    name: 'Chiliz',
    coingeckoId: 'chiliz',
    address: '0x2b2ae9b932bb5d56a0c9992130df7fbeb86eba1f',
  },
  {
    symbol: 'OG',
    name: 'OG Fan Token',
    coingeckoId: 'og-fan-token',
    address: '0x1234567890abcdef00000000000000000000og11',
  },
  {
    symbol: 'SANTOS',
    name: 'Santos FC Fan Token',
    coingeckoId: 'santos-fc-fan-token',
    address: '0x1234567890abcdef00000000000000000000sant',
  },
  {
    symbol: 'PSG',
    name: 'Paris Saint-Germain Fan Token',
    coingeckoId: 'paris-saint-germain-fan-token',
    address: '0x1234567890abcdef00000000000000000000psg1',
  },
  {
    symbol: 'JUV',
    name: 'Juventus Fan Token',
    coingeckoId: 'juventus-fan-token',
    address: '0x1234567890abcdef00000000000000000000juve',
  },
  {
    symbol: 'CITY',
    name: 'Manchester City Fan Token',
    coingeckoId: 'manchester-city-fan-token',
    address: '0x1234567890abcdef00000000000000000000mcfc',
  },
  {
    symbol: 'BAR',
    name: 'FC Barcelona Fan Token',
    coingeckoId: 'fc-barcelona-fan-token',
    address: '0x1234567890abcdef00000000000000000000barc',
  },
];

export const enhanceMoralisTokens1 = async (
  moralisTokens: MoralisToken[],
  preferredOrder: string[],
  limit: number,
): Promise<EnhancedToken[]> => {
  try {
    const uniqueSymbols = [
      ...new Set(
        moralisTokens
          .map((token) => token.symbol)
          .filter((s) => COINGECKO_TOKENS[s]),
      ),
    ];

    const coingeckoIds = uniqueSymbols.map((sym) => COINGECKO_TOKENS[sym]);

    const { data: marketData } = await axios.get(
      `${COINGECKO_API}/coins/markets`,
      {
        params: {
          vs_currency: 'usd',
          ids: coingeckoIds.join(','),
        },
      },
    );

    const marketMap = Object.fromEntries(
      marketData.map((token: EnhancedToken) => [
        token.symbol.toUpperCase(),
        token,
      ]),
    );
    const enhanced = moralisTokens.map((token) => {
      const marketInfo = marketMap[token.symbol.toUpperCase()];
      const price = marketInfo?.current_price ?? token.usd_price ?? 0;
      const value = parseFloat(token.balance_formatted) * price;
      const priceChangePercent = marketInfo?.price_change_percentage_24h ?? 0;

      const priceChangeUsd = price * (priceChangePercent / 100);

      return {
        ...token,
        usd_price: price,
        usd_value: value,
        price_change_percent_24h: priceChangePercent,
        price_change_usd_24h: priceChangeUsd,
        logo: token.logo ?? marketInfo?.image ?? '/default-logo.png',
      };
    });

    // Sort by preferredOrder first, fallback to usd_value
    const sorted = enhanced.sort((a, b) => {
      const indexA = preferredOrder.indexOf(a.symbol);
      const indexB = preferredOrder.indexOf(b.symbol);

      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;

      return b.usd_value - a.usd_value; // fallback
    });

    return sorted.slice(0, limit);
  } catch (error) {
    console.error('Error enhancing tokens:', error);
    return [];
  }
};

export const enhanceMoralisTokens = async (
  moralisTokens: MoralisToken[],
  preferredOrder: string[],
  limit: number,
): Promise<EnhancedToken[]> => {
  try {
    const hasBalances = moralisTokens.length > 0;

    const tokensToUse = hasBalances
      ? moralisTokens
      : DEFAULT_TOKENS.map((t) => ({
          ...t,
          balance_formatted: '0.00',
          usd_price: 0,
          usd_value: 0,
          logo: null,
          decimals: 18,
          native_token: false,
        }));

    const uniqueSymbols = [
      ...new Set(
        tokensToUse
          .map((token) => token.symbol)
          .filter((s) => COINGECKO_TOKENS[s]),
      ),
    ];

    const coingeckoIds = uniqueSymbols.map((sym) => COINGECKO_TOKENS[sym]);

    const { data: marketData } = await axios.get(
      `${COINGECKO_API}/coins/markets`,
      {
        params: {
          vs_currency: 'usd',
          ids: coingeckoIds.join(','),
        },
      },
    );

    const marketMap = Object.fromEntries(
      marketData.map((token: EnhancedToken) => [
        token.symbol.toUpperCase(),
        token,
      ]),
    );

    const enhanced = tokensToUse.map((token) => {
      const marketInfo = marketMap[token.symbol.toUpperCase()];
      const price = marketInfo?.current_price ?? token.usd_price ?? 0;
      const priceChangePercent = marketInfo?.price_change_percentage_24h ?? 0;
      const priceChangeUsd = price * (priceChangePercent / 100);

      const balance = parseFloat(token.balance_formatted ?? '0');
      const value = balance * price;

      return {
        ...token,
        usd_price: price,
        usd_value: value,
        price_change_percent_24h: priceChangePercent,
        price_change_usd_24h: priceChangeUsd,
        logo: token.logo ?? marketInfo?.image ?? '/default-logo.png',
      };
    });

    const sorted = enhanced.sort((a, b) => {
      const indexA = preferredOrder.indexOf(a.symbol);
      const indexB = preferredOrder.indexOf(b.symbol);

      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;

      return b.usd_value - a.usd_value;
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return sorted.slice(0, limit);
  } catch (error) {
    console.error('Error enhancing tokens:', error);
    return [];
  }
};

export function formatPriceChange(
  changeUsd: number,
  changePercent: number,
): PriceChange {
  const isPositive = changeUsd > 0;
  const isNegative = changeUsd < 0;

  return {
    changeUsd: `${isPositive ? '+' : ''}${changeUsd.toFixed(4)} USD`,
    changePercent: `${isPositive ? '+' : ''}${changePercent.toFixed(2)}%`,
    isPositive,
    indicator: isPositive ? 'up' : isNegative ? 'down' : 'neutral',
  };
}
