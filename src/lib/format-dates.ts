import {
  differenceInDays,
  differenceInHours,
  differenceInMonths,
  differenceInWeeks,
} from 'date-fns';

export function formatToRelativeShort(dateStr: Date) {
  const now = new Date();
  const target = new Date(dateStr);
  if (target <= now) return 'ENDED';

  if (target <= now) return '0h';

  const months = differenceInMonths(target, now);
  const weeks = differenceInWeeks(target, now) - months * 4;
  const days = differenceInDays(target, now) - (months * 30 + weeks * 7);
  const hours =
    differenceInHours(target, now) -
    (months * 30 * 24 + weeks * 7 * 24 + days * 24);

  const parts: string[] = [];
  if (months > 0) parts.push(`${months}mo`);
  if (weeks > 0) parts.push(`${weeks}w`);
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);

  return parts.join(' ');
}
