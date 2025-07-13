'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { toPng } from 'html-to-image';
import {
  Download,
  Share2,
  TrendingDown,
  TrendingUp,
  Trophy,
} from 'lucide-react';
import QRCode from 'qrcode';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getSportEmoji } from '@/lib/getSportEmoji';
import { shareCard } from '@/lib/shareCard';
import { useUserStore } from '@/lib/stores/useUserStore';
import { truncateMiddle } from '@/lib/utils';
import { BET } from '@/types/types';
import { User } from '@/types/user';

interface BetShareCardProps {
  bet: BET;
  userName?: string;
}

export function BetShareCard({
  bet,
  userName = 'AthleteBetter',
}: BetShareCardProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const user = useUserStore<User>((s) => s.user);
  const isWin = bet.status === 'WON';
  const platformUrl = 'https://athletebet.app'; // Your platform URL

  // Generate QR code
  const generateQRCode = async () => {
    try {
      const qrUrl = await QRCode.toDataURL(platformUrl, {
        width: 120,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      });
      setQrCodeUrl(qrUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  useEffect(() => {
    //setIsGenerating(true);
    const handleAutoGnerate = async () => {
      await generateQRCode();
    };
    handleAutoGnerate();
  }, []);

  // Generate and download card as image
  const downloadCard = async () => {
    if (!cardRef.current) return;

    setIsGenerating(true);
    try {
      await generateQRCode();

      // Wait a bit for QR code to render
      setTimeout(async () => {
        try {
          const dataUrl = await toPng(cardRef.current!, {
            quality: 1.0,
            pixelRatio: 2,
            backgroundColor: 'transparent',
          });

          const link = document.createElement('a');
          link.download = `athletebet-${bet.status.toLowerCase()}-${bet.outcome?.market.players[0].player.name.replace(' ', '-')}.png`;
          link.href = dataUrl;
          link.click();

          toast({
            title: 'Card Downloaded!',
            description: 'Your bet result card has been saved to your device.',
          });
        } catch (error) {
          console.error('Error generating image:', error);
          toast({
            title: 'Error',
            description: 'Failed to generate card image. Please try again.',
            variant: 'destructive',
          });
        } finally {
          setIsGenerating(false);
        }
      }, 100);
    } catch (error) {
      console.error('Error:', error);
      setIsGenerating(false);
    }
  };
  //
  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount: number) => {
    const num = parseFloat(amount.toString());
    return num.toFixed(2);
  };

  const getOddsDisplay = (odds: string) => {
    // Convert odds like "+150" to multiplier like "2.5x"
    const num = parseFloat(odds.replace('+', ''));
    const multiplier = num / 100 + 1;
    return `${multiplier.toFixed(2)}x`;
  };

  return (
    <div className="space-y-4">
      {/* Share Card */}
      <div
        ref={cardRef}
        className={`relative mx-auto w-full max-w-sm overflow-hidden rounded-3xl shadow-2xl ${
          isWin
            ? 'bg-gradient-to-br from-green-400 via-green-500 to-green-600'
            : 'bg-gradient-to-br from-red-400 via-red-500 to-red-600'
        }`}
        style={{
          background: isWin
            ? 'linear-gradient(135deg, oklch(76.8% 0.233 130.85), oklch(70% 0.25 135))'
            : 'linear-gradient(135deg, #ef4444, #dc2626)',
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
          <div className="absolute right-0 top-0 h-32 w-32 -translate-y-16 translate-x-16 rounded-full bg-white/5" />
          <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-12 translate-y-12 rounded-full bg-white/5" />
        </div>

        {/* Header */}
        <div className="relative p-4 pb-2">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-full">
                <Image
                  src={`/img/logo.png`}
                  width={40}
                  height={40}
                  alt="logo"
                  className=""
                />
              </div>
              <span className="text-lg font-bold text-white">GOAT</span>
            </div>
          </div>

          <div className="mb-4 flex items-center space-x-3">
            <span className="text-2xl font-bold text-white">SETTLED</span>
            <div
              className={`rounded-full px-3 py-1 text-sm font-bold ${
                isWin ? 'bg-white text-green-600' : 'bg-white text-red-600'
              }`}
            >
              {bet.status}
            </div>
          </div>

          {/* Mascot/Character placeholder */}
          {/* Mascot/Character placeholder */}
          <div className="absolute right-4 top-4">
            <div
              className={`flex items-center justify-center rounded-full ${
                isWin ? 'bg-white/20' : 'bg-white/20'
              }`}
            >
              {isWin ? (
                <Image
                  src={`/img/wojak-win.png`}
                  width={70}
                  height={70}
                  alt="moscout"
                  className="object-cover"
                />
              ) : (
                <Image
                  src={`/img/wojak-loss.png`}
                  width={70}
                  height={70}
                  alt="moscout"
                  className="object-cover"
                />
              )}
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="relative mx-3 mb-3 rounded-2xl bg-white p-2 shadow-lg">
          {/* User Info */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Avatar className="h-14 w-14">
                <AvatarImage
                  src={bet.outcome.market.players[0].player.profilePicture}
                  alt={bet.outcome.market.players[0].player.name}
                  className="object-cover"
                />
                <AvatarFallback className="text-sm font-medium">
                  {bet.outcome.market.players[0].player.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .substring(0, 2)}
                </AvatarFallback>
              </Avatar>

              <div>
                <div className="text-lg font-semibold capitalize text-gray-900">
                  {bet.outcome.market.players[0].player.name}
                </div>
              </div>
            </div>
            <div className="text-gray-400">
              <p className="text-2xl">
                {getSportEmoji(bet.outcome.market.Match.category)}
              </p>
            </div>
          </div>

          {/* Payout Amount */}
          <div className="mb-4 text-center">
            <div
              className={`mb-1 font-medium ${isWin ? 'text-green-600' : 'text-red-600'}`}
            >
              Payout
            </div>
            <div
              className={`flex items-center justify-center text-4xl font-bold ${
                isWin ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {isWin ? '+' : '-'}
              {formatCurrency(isWin ? bet.potentialPayout : bet.amount)}
              <Image
                src={`/img/coin.png`}
                width={40}
                height={40}
                alt="coin"
                className="h-7 w-7"
              />
            </div>
          </div>

          {/* Bet Description */}
          <div
            className={`mb-4 rounded-lg p-3 ${isWin ? 'bg-green-50' : 'bg-red-50'}`}
          >
            <div
              className={`text-sm font-medium capitalize ${isWin ? 'text-green-800' : 'text-red-800'}`}
            >
              {truncateMiddle(bet.outcome.market.title, 24, 5, 30)}
            </div>
            <div className="mt-1 text-sm capitalize text-gray-600">
              Match:{' '}
              {truncateMiddle(bet.outcome.market.Match.description, 24, 5, 30)}
            </div>
            <div className="mt-1 text-xs capitalize text-gray-500">
              Result: {bet.outcome.market.result || '10 Points'}
            </div>
          </div>

          {/* Bottom Row with QR and Details */}
          <div className="flex items-end justify-between">
            <div className="h-16 w-16">
              {qrCodeUrl && (
                <img src={qrCodeUrl} alt="QR Code" className="h-full w-full" />
              )}
            </div>
            <div className="ml-4 flex-1">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="mb-1 text-xs text-gray-500">Odds</div>
                  <div className="text-sm font-bold text-gray-900">
                    {bet.oddsAtBet}
                  </div>
                </div>
                <div>
                  <div className="mb-1 text-xs text-gray-500">Stake</div>
                  <div className="text-sm font-bold text-gray-900">
                    {formatCurrency(bet.amount)}
                  </div>
                </div>
                <div>
                  <div className="mb-1 text-xs text-gray-500">Placed by</div>
                  <div className="text-sm font-bold text-gray-900">
                    {truncateMiddle(user.fullName || 'Unknown')}
                  </div>
                </div>
              </div>
              <div className="mt-2 text-center">
                <div className="text-xs text-muted-foreground">
                  On {formatDate(bet.createdAt)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="text-center">
        <Button
          onClick={() =>
            shareCard({
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              cardRef,
              setIsGenerating,
              cardType: isWin ? 'win' : 'loss',
            })
          }
          disabled={isGenerating}
          className="hover:bg-primary/90 rounded-xl bg-primary px-6 py-3 font-medium text-white"
        >
          {isGenerating ? (
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Generating...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Share2 size={16} />
              <span>Share Result</span>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}
