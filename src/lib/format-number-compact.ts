type FormatOptions = {
  threshold?: number; // When to start compact formatting
  decimals?: number; // Decimal places for compact output
  withSuffix?: boolean; // Use K/M/B suffixes
  customSuffixes?: Record<string, string>; // Override K/M/B labels
  useCommas?: boolean; // Use comma-style format like "1,000"
  locale?: string; // For Intl formatting, default = 'en-US'
};

export function formatNumberCompact(
  value: number,
  {
    threshold = 1000,
    decimals = 3,
    withSuffix = true,
    customSuffixes = {},
    useCommas = false,
    locale = 'en-US',
  }: FormatOptions = {},
): string {
  if (useCommas) {
    return new Intl.NumberFormat(locale).format(value);
  }

  if (value < threshold) return value.toString();

  const suffixes: [number, string][] = [
    [1e9, customSuffixes.B || 'B'],
    [1e6, customSuffixes.M || 'M'],
    [1e3, customSuffixes.K || 'K'],
  ];

  for (const [num, suffix] of suffixes) {
    if (value >= num) {
      const formatted = (value / num).toFixed(decimals);
      return withSuffix ? `${formatted}${suffix}` : formatted;
    }
  }

  return value.toString();
}
