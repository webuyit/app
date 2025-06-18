'use client';

import { Check, Clock } from 'lucide-react';
import { useTransitionRouter } from 'next-view-transitions';
// Import Swiper styles
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PLAYER } from '@/types/types';

type PlayerProps = {
  players: PLAYER[];
};
export function PlayersSection({ players }: PlayerProps) {
  const router = useTransitionRouter();

  console.log('Players', players);
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
                  className={`h-16 w-16 border-2 ${player.verified ? 'border-primary' : 'border-gray-300'} p-0.5`}
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
                    player.verified ? 'bg-green-500' : 'bg-gray-400'
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
