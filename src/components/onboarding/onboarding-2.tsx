'use client';

import { useEffect, useRef, useState } from 'react';

import { useLogin, usePrivy } from '@privy-io/react-auth';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import {
  Activity,
  BarChart3,
  ChevronRight,
  Loader,
  Play,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users,
} from 'lucide-react';
import { useTransitionRouter } from 'next-view-transitions';
// Import Swiper styles
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { SERVER_URL, socialLinks } from '@/lib/constants';
import { USER_PROFILE_PROPS } from '@/types/types';

export default function OnboardingScreen() {
  // const [, setLocation] = useLocation();
  const router = useTransitionRouter();
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<any>(null);
  const { ready, authenticated, logout, user } = usePrivy();

  /*const slides = [
    {
      id: 1,
      title: 'Welcome to AthleteBet',
      subtitle: 'Social Media Betting',
      description:
        'Experience the future of sports betting with real-time athlete performance markets and social features.',
      icon: <Trophy size={64} className="text-primary" />,
      gradient: 'from-blue-500 to-purple-600',
      features: ['Live Markets', 'Real-time Data', 'Social Betting'],
    },
    {
      id: 2,
      title: 'Smart Analytics',
      subtitle: 'Data-Driven Insights',
      description:
        'Make informed decisions with advanced player statistics, performance charts, and market analysis.',
      icon: <BarChart3 size={64} className="text-emerald-500" />,
      gradient: 'from-emerald-500 to-teal-600',
      features: ['Player Stats', 'Market Trends', 'Predictive Analytics'],
    },
    {
      id: 3,
      title: 'Join the Community',
      subtitle: 'Connect & Compete',
      description:
        'Compete in tournaments, follow top players, and share your winning strategies with the community.',
      icon: <Users size={64} className="text-orange-500" />,
      gradient: 'from-orange-500 to-red-600',
      features: ['Tournaments', 'Leaderboards', 'Social Sharing'],
    },
  ];*/

  const handleSocialClick = (href: string) => {
    if (href !== '#') {
      window.open(href, '_blank');
    }
  };

  // HANDLE AUTH

  const mutation = useMutation({
    mutationFn: async (data: USER_PROFILE_PROPS) => {
      const res = await axios.post(`${SERVER_URL}users/register`, data);
      return res.data;
    },
    onSuccess: (info) => {
      console.log('Created account succfully', info);

      router.replace('/home');
    },
    onError: (err) => {
      toast({
        title: 'Failed to Register profile',
        variant: 'destructive',
      });
      console.log('Creating acc failed', err);
    },
  });

  const { login } = useLogin({
    onComplete: async ({
      user,
      wasAlreadyAuthenticated,
      loginMethod,
      loginAccount,
    }) => {
      console.log('From in-complete');
      const publicKey = user.wallet?.address || '';
      const privyId = user.id;
      const isNewUser = true;

      const metadata: USER_PROFILE_PROPS = {
        publicKey,
        privyId,
        walletSource: 'PRIVY',
        authMethod: loginMethod?.toUpperCase() || '',
      };

      // Only include email if it's actually available
      if (user.email?.address) {
        metadata.email = user.email.address;
      }

      // Additional profile info based on login method
      if (loginMethod === 'google') {
        metadata.fullName = user.google?.name || '';
      }

      if (loginMethod === 'twitter') {
        metadata.userName = user.twitter?.username || '';
        metadata.fullName = user.twitter?.name || '';
        metadata.profilePicture = user.twitter?.profilePictureUrl || '';
      }

      if (loginMethod === 'discord') {
        metadata.userName = user.discord?.username || '';
        metadata.fullName = user.discord?.username || '';
      }

      await mutation.mutateAsync(metadata);
    },
    onError: (error) => {
      console.log(`error creating pryvy acc`, error);
    },
  });

  return (
    <div className="mx-auto min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white md:max-w-md">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(132,204,22,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_35%,rgba(132,204,22,0.05)_50%,transparent_65%)]" />
      </div>

      <div className="relative z-10 flex h-screen flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Target size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold">AthleteBet</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-primary/20 border-primary/30 rounded-full border px-3 py-1">
              <span className="text-xs font-medium text-primary">Beta</span>
            </div>
          </div>
        </div>

        {/* Swiper Container */}

        {/* Bottom Section */}
        <div className="flex h-full flex-col items-end justify-end">
          <div className="space-y-6 p-6">
            {/* Get Started Button */}
            <Button
              onClick={login}
              size="lg"
              className="hover:from-primary/90 shadow-primary/25 w-full transform rounded-xl bg-gradient-to-r from-primary to-green-500 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:to-green-500/90 active:scale-[0.98]"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <>
                  <Loader size={20} className="mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Play size={20} className="mr-2" />
                  Get Started
                  <ChevronRight size={20} className="ml-2" />
                </>
              )}
            </Button>

            {/* Social Links */}
            <div className="space-y-3">
              <p className="text-center text-sm text-gray-400">
                Connect with us
              </p>
              <div className="flex justify-center space-x-6">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <button
                      key={social.name}
                      onClick={() => handleSocialClick(social.href)}
                      className="group flex h-12 w-12 items-center justify-center rounded-xl border border-gray-600 bg-gray-800/50 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-gray-400 hover:bg-gray-700/50 active:scale-95"
                      style={
                        {
                          '--hover-color': social.color,
                        } as React.CSSProperties
                      }
                    >
                      <IconComponent
                        size={20}
                        className="text-gray-400 transition-colors duration-300 group-hover:text-white"
                        style={
                          { color: 'var(--hover-color)' } as React.CSSProperties
                        }
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="text-center">
              <p className="text-xs text-gray-500">
                By continuing, you agree to our Terms of Service and Privacy
                Policy
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements for visual enhancement */}
      <div
        className="absolute left-10 top-20 h-2 w-2 animate-bounce rounded-full bg-primary opacity-60"
        style={{ animationDelay: '0s' }}
      />
      <div
        className="absolute right-8 top-40 h-1 w-1 animate-bounce rounded-full bg-green-400 opacity-40"
        style={{ animationDelay: '1s' }}
      />
      <div
        className="absolute bottom-40 left-6 h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400 opacity-50"
        style={{ animationDelay: '2s' }}
      />
      <div
        className="absolute bottom-60 right-12 h-1 w-1 animate-bounce rounded-full bg-purple-400 opacity-30"
        style={{ animationDelay: '3s' }}
      />
    </div>
  );
}
