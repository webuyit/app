import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Zapfy',
    short_name: 'Zapfy',
    description:
      'Zapfy helps you send parcels quicker and smarter, whether you’re a business or just sending to loved ones',
    start_url: '/',
    id: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#facc15',
    theme_color: '#7dd3fc',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },

      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
