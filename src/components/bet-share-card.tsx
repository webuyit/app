'use client';

import { useRef, useState } from 'react';

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
import { BET } from '@/types/types';

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

  const formatDate = (dateString: Date) => {
    return dateString.toLocaleDateString('en-US', {
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
        <div className="relative p-6 pb-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                <Trophy className="text-gray-800" size={16} />
              </div>
              <span className="text-lg font-bold text-white">AthleteBet</span>
            </div>
            {isWin ? (
              <TrendingUp className="text-white" size={24} />
            ) : (
              <TrendingDown className="text-white" size={24} />
            )}
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
          <div className="absolute right-4 top-4">
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-full ${
                isWin ? 'bg-white/20' : 'bg-white/20'
              }`}
            >
              {isWin ? '🎉' : '😢'}
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="relative mx-4 mb-6 rounded-2xl bg-white p-6 shadow-lg">
          {/* User Info */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
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
                <div className="font-bold text-gray-900">@{userName}</div>
                <div className="text-sm text-gray-600">
                  {bet.outcome.market.players[0].player.name}
                </div>
              </div>
            </div>
            <div className="text-gray-400">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
          </div>

          {/* Payout Amount */}
          <div className="mb-4 text-center">
            <div
              className={`mb-1 text-sm font-medium ${isWin ? 'text-green-600' : 'text-red-600'}`}
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
              <div className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400">
                <span className="text-sm text-yellow-800">💰</span>
              </div>
            </div>
          </div>

          {/* Bet Description */}
          <div
            className={`mb-4 rounded-lg p-3 ${isWin ? 'bg-green-50' : 'bg-red-50'}`}
          >
            <div
              className={`text-sm font-medium ${isWin ? 'text-green-800' : 'text-red-800'}`}
            >
              {bet.outcome.market.title}
            </div>
            <div className="mt-1 text-sm text-gray-600">
              Bet: {bet.outcome.market.description}
            </div>
            <div className="mt-1 text-xs text-gray-500">Result: 30 Points</div>
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
                    {userName}
                  </div>
                </div>
              </div>
              <div className="mt-2 text-center">
                <div className="text-xs text-gray-500">
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
          onClick={downloadCard}
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
