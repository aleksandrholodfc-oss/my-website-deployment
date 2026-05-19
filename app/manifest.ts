import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Федерация Холода',
    short_name: 'Федерация Холода',
    description: 'Профессиональный ремонт и обслуживание холодильного оборудования',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#3b82f6',
    icons: [
      {
        src: '/images/logo.png',
        sizes: '128x128',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/images/logo.png',
        sizes: '128x128',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
