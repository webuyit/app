/* eslint-disable @typescript-eslint/ban-ts-comment */
import { toPng } from 'html-to-image';

import { toast } from '@/hooks/use-toast';

const waitForImagesToLoad = async (container: HTMLElement) => {
  const imgs = container.querySelectorAll('img');
  await Promise.all(
    Array.from(imgs).map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((res, rej) => {
        img.onload = res;
        img.onerror = rej;
      });
    }),
  );
};

export const shareCard = async ({
  cardRef,
  setIsGenerating,
  cardType,
}: {
  cardRef: React.RefObject<HTMLDivElement> | null;
  setIsGenerating: (value: boolean) => void;
  cardType: 'pre-market' | 'loss' | 'win';
}) => {
  //@ts-ignore
  if (!cardRef.current) {
    toast({
      title: 'Error',
      description: 'Card not found.',
      variant: 'destructive',
    });
    console.log('No card ref');
    return;
  }

  try {
    // Ensure all images inside the card are fully loaded
    setIsGenerating(true);
    //@ts-ignore
    await waitForImagesToLoad(cardRef.current);

    // Add delay to let UI fully settle (animations/rendering)
    await new Promise((res) => setTimeout(res, 200));

    // Generate PNG image from the card DOM
    //@ts-ignore
    const dataUrl = await toPng(cardRef.current, {
      quality: 1,
      pixelRatio: 2,
      backgroundColor:
        cardType === 'pre-market'
          ? '#84cc16'
          : cardType === 'win'
            ? '#84cc16'
            : cardType === 'loss'
              ? '#dc2626'
              : '#84cc16', // recommended for visibility on all themes
    });

    const response = await fetch(dataUrl);
    const blob = await response.blob();
    const file = new File([blob], 'bet-card.png', { type: blob.type });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: 'My Bet Card',
        text: 'Check out my bet result on GOAT 🐐!',
        files: [file],
      });

      toast({
        title: 'Shared Successfully',
        description: 'Your card has been shared!',
      });
    } else {
      // Fallback: Download image
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'bet-card.png';
      link.click();

      toast({
        title: 'Card Downloaded',
        description: 'Your card has been saved to your device.',
      });
    }
  } catch (error) {
    console.error('Error sharing card:', error);
    toast({
      title: 'Error',
      description: 'Failed to generate or share the card.',
      variant: 'destructive',
    });
  } finally {
    setIsGenerating(false); // stop loading
  }
};
