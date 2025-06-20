'use client';

import { useEffect, useRef, useState } from 'react';

export default function PWAInstallButton() {
  const installRef = useRef<any>(null);
  const [promptEvent, setPromptEvent] = useState<any>(null);

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

  const handleInstall = () => {
    if (installRef.current) {
      installRef.current.showDialog(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <button
        onClick={handleInstall}
        className="rounded-lg bg-blue-600 px-6 py-3 text-white shadow-md"
      >
        Install App
      </button>

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
    </div>
  );
}
