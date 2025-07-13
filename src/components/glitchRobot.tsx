'use client';

import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

export const GlitchedRobot = () => {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const blinkInterval = setInterval(
      () => {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
      },
      3000 + Math.random() * 2000,
    );

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <motion.div
      className="relative mx-auto mb-8 h-32 w-32"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', duration: 0.8, delay: 0.2 }}
    >
      <motion.svg
        viewBox="0 0 120 120"
        className="h-full w-full"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Robot Body */}
        <motion.rect
          x="30"
          y="50"
          width="60"
          height="50"
          rx="8"
          fill="currentColor"
          className="text-muted-foreground"
          animate={{
            fill: isBlinking ? '#ef4444' : 'currentColor',
          }}
          transition={{ duration: 0.1 }}
        />

        {/* Robot Head */}
        <motion.rect
          x="35"
          y="25"
          width="50"
          height="40"
          rx="12"
          fill="currentColor"
          className="text-card"
          stroke="hsl(var(--border))"
          strokeWidth="2"
        />

        {/* Eyes */}
        <motion.circle
          cx="48"
          cy="40"
          r={isBlinking ? '1' : '4'}
          fill="currentColor"
          className="text-primary"
          animate={{
            scale: isBlinking ? 0.2 : 1,
            fill: isBlinking ? '#ef4444' : 'hsl(var(--primary))',
          }}
          transition={{ duration: 0.1 }}
        />
        <motion.circle
          cx="72"
          cy="40"
          r={isBlinking ? '1' : '4'}
          fill="currentColor"
          className="text-primary"
          animate={{
            scale: isBlinking ? 0.2 : 1,
            fill: isBlinking ? '#ef4444' : 'hsl(var(--primary))',
          }}
          transition={{ duration: 0.1 }}
        />

        {/* Antenna */}
        <motion.line
          x1="60"
          y1="25"
          x2="60"
          y2="15"
          stroke="currentColor"
          strokeWidth="2"
          className="text-muted-foreground"
          animate={{
            x2: [60, 58, 62, 60],
            y2: [15, 13, 17, 15],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.circle
          cx="60"
          cy="15"
          r="3"
          fill="currentColor"
          className="text-primary"
          animate={{
            scale: [1, 1.2, 1],
            fill: [
              'hsl(var(--primary))',
              'hsl(var(--primary-glow))',
              'hsl(var(--primary))',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Arms */}
        <motion.rect
          x="15"
          y="55"
          width="20"
          height="8"
          rx="4"
          fill="currentColor"
          className="text-muted-foreground"
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.rect
          x="85"
          y="55"
          width="20"
          height="8"
          rx="4"
          fill="currentColor"
          className="text-muted-foreground"
          animate={{ rotate: [5, -5, 5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {/* Chest Panel */}
        <motion.rect
          x="45"
          y="65"
          width="30"
          height="20"
          rx="4"
          fill="currentColor"
          className="text-accent"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
        />

        {/* Glitch Effect Lines */}
        <motion.g
          animate={{
            opacity: isBlinking ? [1, 0, 1, 0, 1] : 0,
            x: isBlinking ? [-2, 2, -1, 1, 0] : 0,
          }}
          transition={{ duration: 0.3, times: [0, 0.2, 0.4, 0.6, 1] }}
        >
          <line
            x1="20"
            y1="35"
            x2="100"
            y2="35"
            stroke="#ef4444"
            strokeWidth="1"
            opacity="0.7"
          />
          <line
            x1="25"
            y1="55"
            x2="95"
            y2="55"
            stroke="#3b82f6"
            strokeWidth="1"
            opacity="0.7"
          />
          <line
            x1="30"
            y1="75"
            x2="90"
            y2="75"
            stroke="#10b981"
            strokeWidth="1"
            opacity="0.7"
          />
        </motion.g>
      </motion.svg>
    </motion.div>
  );
};
