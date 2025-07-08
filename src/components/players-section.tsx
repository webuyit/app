'use client';

import { useQuery } from '@tanstack/react-query';
import { Check, Clock } from 'lucide-react';
import { useTransitionRouter } from 'next-view-transitions';
// Import Swiper styles
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SERVER_URL } from '@/lib/constants';
import { useUserStore } from '@/lib/stores/useUserStore';
import { PLAYER, PLAYERS } from '@/types/types';
import { User } from '@/types/user';

type PlayerProps = {
  initialPlayers: PLAYERS;
};
export function PlayersSection({ initialPlayers }: PlayerProps) {
  const router = useTransitionRouter();
  const user = useUserStore<User>((s) => s.user);
  const stats = useUserStore((s) => s.stats);

  const { data: response } = useQuery({
    queryKey: [`players`],
    queryFn: async () => {
      const res = await fetch(`${SERVER_URL}players/basic?limit=20`);
      return res.json();
    },
    initialData: initialPlayers,
    refetchInterval: 80_000, // every 30 seconds
    refetchOnWindowFocus: false, // don't refetch when switching tabs (unless needed)
    staleTime: 79_000, // prevents too-frequent re-fetching
    refetchIntervalInBackground: false,
  });
  const players = response?.players ?? [];
  const handlePlayerClick = (playerId: number) => {
    router.push(`/players/${playerId}`);
  };

  return (
    <section className="bg-white px-4 py-4">
      <h2 className="mb-3 text-lg font-semibold text-gray-900">
        Featured Players
      </h2>
      <Swiper
        autoplay={{ delay: 2500 }}
        loop={true}
        spaceBetween={10}
        slidesPerView="auto"
        className="!overflow-visible"
      >
        {players.map((player: any) => (
          <SwiperSlide key={player.id} className="flex !w-auto">
            <div
              className="touch-feedback mr-4 flex cursor-pointer flex-col items-center space-y-2"
              onClick={() => handlePlayerClick(player.id)}
            >
              <div className="relative">
                <Avatar
                  className={`h-16 w-16 border-2 ${player.featured ? 'border-primary' : 'border-gray-300'} p-0.5`}
                >
                  <AvatarImage
                    src={player.profilePicture}
                    alt={player.name}
                    className="rounded-full object-cover"
                  />
                  <AvatarFallback className="text-sm font-medium">
                    {player.name
                      .split(' ')
                      .map((n: string) => n[0])
                      .join('')
                      .substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white ${
                    player.featured ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                >
                  {player.verified ? (
                    <Check className="text-white" size={12} />
                  ) : (
                    <Clock className="text-white" size={10} />
                  )}
                </div>
              </div>
              <span
                className={`text-xs font-medium ${player.verified ? 'text-gray-700' : 'text-gray-500'}`}
              >
                {player.name.split(' ')[0]}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
