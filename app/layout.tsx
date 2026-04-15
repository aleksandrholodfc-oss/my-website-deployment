import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Script from 'next/script';

const inter = Inter({ subsets: ['cyrillic', 'latin'] });

export const metadata: Metadata = {
  title: 'Федерация Холода — Ремонт холодильного оборудования в Иркутске',
  description: 'Профессиональный ремонт и обслуживание холодильного оборудования в Иркутске. Торговое, промышленное холодильное оборудование, рефрижераторы, автокондиционеры. Выезд 24/7, гарантия до 1 года.',
  keywords: 'ремонт холодильного оборудования, ремонт холодильников, ремонт рефрижераторов, ремонт торгового оборудования, ремонт промышленного оборудования, ремонт автокондиционеров, ремонт климатического оборудования, Иркутск, Федерация Холода',
  authors: [{ name: 'Федерация Холода' }],
  creator: 'Федерация Холода',
  publisher: 'Федерация Холода',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://federatsiya-holoda.ru',
    title: 'Федерация Холода — Ремонт холодильного оборудования в Иркутске',
    description: 'Профессиональный ремонт и обслуживание холодильного оборудования. Выезд 24/7, гарантия до 1 года.',
    siteName: 'Федерация Холода',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Федерация Холода — Ремонт холодильного оборудования',
    description: 'Профессиональный ремонт и обслуживание холодильного оборудования. Выезд 24/7, гарантия до 1 года.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add verification codes when available
    // google: 'google-site-verification-code',
    // yandex: 'yandex-verification-code',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Федерация Холода',
    description: 'Профессиональный ремонт и обслуживание холодильного оборудования в Иркутске',
    url: 'https://federatsiya-holoda.ru',
    telephone: '+7 (914) 8866774',
    email: 'info@federatsiya-holoda.ru',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Иркутск',
      addressRegion: 'Иркутская область',
      addressCountry: 'RU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '52.280343',
      longitude: '104.254286',
    },
    openingHours: 'Mo-Su 00:00-23:59',
    priceRange: '$$',
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: '52.280343',
        longitude: '104.254286',
      },
      geoRadius: '100000',
    },
  };

  return (
    <html lang="ru">
      <head>
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        {/* Yandex.Metrica Counter - Replace XXXXXXXX with your actual counter ID */}
        <Script
          id="yandex-metrica"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              ym(XXXXXXXXX, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
              });
            `
          }}
        />
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/XXXXXXXXX"
              style={{ position: 'absolute', left: '-9999px' }}
              alt=""
            />
          </div>
        </noscript>
      </head>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
          <Header />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
