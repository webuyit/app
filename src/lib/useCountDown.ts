// utils/useCountdown.ts
import { useEffect, useState } from 'react';

export function useCountdown(targetTime: string | number | Date) {
  const target = new Date(targetTime).getTime();
  const [timeLeft, setTimeLeft] = useState(() => target - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = target - Date.now();
      setTimeLeft(Math.max(diff, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [target]);

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return {
    raw: timeLeft,
    formatted: `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`,
    isEnded: timeLeft <= 0,
  };
}

function pad(num: number) {
  return num.toString().padStart(2, '0');
}
