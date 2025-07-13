'usse client';

import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { GlitchedRobot } from './glitchRobot';
import { Separator } from './ui/separator';

export const ErrorPage = () => {
  const handleDiscordReport = () => {
    // Replace with your Discord invite link
    window.open('https://discord.gg/2xCT9j5MR2', '_blank');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <motion.div
        className="w-full max-w-md text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Animated Robot Character */}
        <GlitchedRobot />

        {/* Error Message */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.h1
            className="mb-4 text-3xl font-bold leading-tight text-foreground sm:text-4xl"
            animate={{
              textShadow: [
                '0 0 0px hsl(var(--primary))',
                '0 0 10px hsl(var(--primary) / 0.3)',
                '0 0 0px hsl(var(--primary))',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Oops! We&apos;re still in beta
          </motion.h1>

          <motion.p
            className="mb-2 text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Something went wrong.
          </motion.p>

          <motion.p
            className="font-medium text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Help us squash the bug — report it to the team!
          </motion.p>
        </motion.div>

        <Button className="hidden" size="lg" variant={'outline'}>
          Refresh
        </Button>
        <div className="mb-4 hidden">
          <Separator />
        </div>
        {/* Discord Report Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 1 }}
        >
          <Button
            onClick={() => handleDiscordReport()}
            className="hover:shadow-glow group relative overflow-hidden px-6 py-3 text-base font-semibold transition-all duration-300"
            size="lg"
          >
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageSquare className="h-5 w-5" />
              <span>Report in Discord</span>
            </motion.div>

            {/* Hover glow effect */}
            <motion.div
              className="bg-primary-glow absolute inset-0 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-20"
              initial={false}
            />
          </Button>
        </motion.div>

        {/* Subtle help text */}
        <motion.p
          className="mt-6 text-xs text-muted-foreground opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Your feedback helps us improve the beta experience
        </motion.p>

        {/* Floating particles effect */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-primary opacity-30"
              initial={{
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 20,
              }}
              animate={{
                y: -20,
                x: Math.random() * window.innerWidth,
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};
