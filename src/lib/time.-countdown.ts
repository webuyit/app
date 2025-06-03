// utils/time.ts

export function getCountdownText(
  date: string | number | Date,
  label = 'Starts',
) {
  const now = new Date();
  const target = new Date(date);
  const diff = target.getTime() - now.getTime(); // milliseconds

  const absDiff = Math.abs(diff);
  const isPast = diff < 0;

  const seconds = Math.floor(absDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days >= 1) {
    return `${label} ${isPast ? `${days} day${days > 1 ? 's' : ''} ago` : `in ${days} day${days > 1 ? 's' : ''}`}`;
  } else if (hours >= 1) {
    return `${label} ${isPast ? `${hours} hour${hours > 1 ? 's' : ''} ago` : `in ${hours} hour${hours > 1 ? 's' : ''}`}`;
  } else if (minutes >= 1) {
    return `${label} ${isPast ? `${minutes} minute${minutes > 1 ? 's' : ''} ago` : `in ${minutes} minute${minutes > 1 ? 's' : ''}`}`;
  } else {
    return `${label} ${isPast ? `just now` : `soon`}`;
  }
}
