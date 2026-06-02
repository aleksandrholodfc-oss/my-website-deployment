import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import FloatingButtons from '@/components/FloatingButtons';
import CookieConsent from '@/components/CookieConsent';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL('https://федерация-холода.рф'),
  applicationName: 'Федерация Холода',
  title: 'Федерация Холода — Ремонт холодильного оборудования в Иркутске',
  description:
    'Профессиональный ремонт и обслуживание холодильного оборудования в Иркутске. Торговое, промышленное холодильное оборудование, рефрижераторы, автокондиционеры. Выезд 24/7, гарантия до 1 года.',
  keywords:
    'ремонт холодильного оборудования, ремонт холодильников, ремонт рефрижераторов, ремонт торгового оборудования, ремонт промышленного оборудования, ремонт автокондиционеров, ремонт климатического оборудования, Иркутск, Федерация Холода',
  authors: [{ name: 'Федерация Холода' }],
  creator: 'Федерация Холода',
  publisher: 'Федерация Холода',
  category: 'Ремонт и обслуживание холодильного оборудования',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://федерация-холода.рф',
    title: 'Федерация Холода — Ремонт холодильного оборудования в Иркутске',
    description:
      'Профессиональный ремонт и обслуживание холодильного оборудования. Выезд 24/7, гарантия до 1 года.',
    siteName: 'Федерация Холода',
    images: [
      {
        url: '/images/og-cover.svg',
        width: 1200,
        height: 630,
        alt: 'Федерация Холода — ремонт холодильного оборудования в Иркутске',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: 'Федерация Холода',
    title: 'Федерация Холода — Ремонт холодильного оборудования',
    description:
      'Профессиональный ремонт и обслуживание холодильного оборудования. Выезд 24/7, гарантия до 1 года.',
    images: ['/images/og-cover.svg'],
  },
  alternates: {
    canonical: 'https://федерация-холода.рф',
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
  verification: {},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Федерация Холода',
    description: 'Профессиональный ремонт и обслуживание холодильного оборудования в Иркутске',
    url: 'https://федерация-холода.рф',
    telephone: '+79148866774',
    email: 'info@федерация-холода.рф',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Иркутск',
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
    priceRange: '₽₽',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '9',
      bestRating: '5',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Услуги по ремонту холодильного оборудования',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Ремонт торгового холодильного оборудования',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Ремонт промышленного холодильного оборудования',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Ремонт рефрижераторов',
          },
        },
      ],
    },
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

  const yandexId = process.env.NEXT_PUBLIC_YANDEX_METRICA_ID;

  return (
    <html lang="ru">
      <body className="font-sans antialiased">
        <Script
          id="schema-org"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        {yandexId ? (
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
                ym(${yandexId}, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });
              `,
            }}
          />
        ) : null}
        <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
          <Header />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
          <ScrollToTop />
          <FloatingButtons />
          <CookieConsent />
        </div>
      </body>
    </html>
  );
}
