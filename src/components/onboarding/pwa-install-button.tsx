'use client';

import { useEffect, useRef, useState } from 'react';

import { Download, QrCode } from 'lucide-react';
import QRCode from 'qrcode';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { getDevicePlatform } from '@/lib/isStandAlone';

import { Button } from '../ui/button';

export default function PWAInstallButton() {
  const installRef = useRef<any>(null);
  const [promptEvent, setPromptEvent] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const device = getDevicePlatform();
  const platformUrl = 'https://app.mygoat.fun/download';
  useEffect(() => {
    import('@khmyznikov/pwa-install');

    let lastPrompt = window.promptEvent;

    const intervalId = setInterval(() => {
      if (window.promptEvent !== lastPrompt) {
        lastPrompt = window.promptEvent;
        setPromptEvent(window.promptEvent);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

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
  const handleInstall = async () => {
    if (device !== 'desktop' && isMobile && installRef.current) {
      installRef.current.showDialog(true);
    } else {
      setShowModal(true);
      await generateQRCode();
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Button
        onClick={handleInstall}
        className="rounded-lg bg-blue-600 px-6 py-3 text-white shadow-md"
      >
        <Download className="mr-1 h-6 w-6 group-hover:animate-bounce" />
        Add to Home Screen
      </Button>

      {/* ✅ This now works because JSX types are globally declared */}
      {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
      {/*@ts-expect-error  */}
      <pwa-install
        manual-apple="true"
        manual-chrome="true"
        ref={installRef}
        name="GOAT"
        manifest-url="/manifest.webmanifest"
        externalpromptEvent={promptEvent}
      >
        {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
        {/*@ts-expect-error  */}
      </pwa-install>

      {/* Desktop Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="border-0 bg-white/95 shadow-2xl backdrop-blur-sm sm:max-w-md">
          <DialogHeader className="space-y-4 text-center">
            <div className="to-primary-dark mx-auto flex h-16 w-16 animate-pulse-lime items-center justify-center rounded-full bg-gradient-to-br from-primary">
              <QrCode className="h-8 w-8 text-white" />
            </div>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Access GOAT on Your Mobile
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 pt-4">
            <p className="text-center leading-relaxed text-gray-600">
              GOAT is designed exclusively for mobile devices right now. To
              enjoy dynamic athlete predictions and PvP tournamentss
            </p>

            {/* QR Code Placeholder */}
            <div className="border-primary/20 mx-auto flex h-48 w-48 items-center justify-center rounded-2xl border-2 bg-gradient-to-br from-gray-100 to-gray-200">
              <div className="space-y-2 text-center">
                {qrCodeUrl && (
                  <img
                    src={qrCodeUrl}
                    alt="QR Code"
                    className="h-full w-full"
                  />
                )}
              </div>
            </div>

            <div className="space-y-2 text-center">
              <p className="font-semibold text-gray-800">
                Scan this QR code on your mobile device
              </p>
              <p className="text-sm text-gray-600">
                to download and launch the app
              </p>
            </div>

            <Button
              onClick={() => setShowModal(false)}
              variant="outline"
              className="border-primary/30 hover:bg-primary/10 h-12 w-full text-primary transition-all duration-300 hover:border-primary"
            >
              Got it, thanks!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
