// types/globals.d.ts

export {};

declare global {
  // ✅ Allow storing the deferred install prompt
  interface Window {
    promptEvent?: BeforeInstallPromptEvent;
  }

  // ✅ BeforeInstallPromptEvent full type
  interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    prompt(): Promise<void>;
    readonly userChoice: Promise<{
      outcome: 'accepted' | 'dismissed';
      platform: string;
    }>;
  }

  // ✅ Tell React/JSX that <pwa-install> is allowed
  namespace JSX {
    interface IntrinsicElements {
      'pwa-install': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        name?: string;
        icon?: string;
        externalpromptEvent?: any;
      };
    }
  }
}
