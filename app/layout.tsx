import type { Metadata } from 'next'
import './globals.css'
import WhatsAppButton from '@/components/whatsapp-button'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://weddingbazaar.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'WeddingBazaar – India\'s #1 Wedding Planning Platform',
    template: '%s | WeddingBazaar',
  },
  description:
    'Find verified photographers, venues, decorators, caterers & more. Compare quotes, read real reviews, and plan your dream wedding on India\'s largest wedding marketplace.',
  keywords: [
    'wedding vendors',
    'wedding photographers',
    'wedding venues',
    'wedding decorators',
    'wedding catering',
    'bridal makeup',
    'mehendi artists',
    'wedding planning',
    'Indian wedding',
  ],
  authors: [{ name: 'WeddingBazaar' }],
  creator: 'WeddingBazaar',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'WeddingBazaar',
    title: 'WeddingBazaar – India\'s #1 Wedding Planning Platform',
    description:
      'Find verified photographers, venues, decorators, caterers & more. Plan your dream wedding with 25,000+ verified vendors across 100+ Indian cities.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WeddingBazaar – India\'s #1 Wedding Planning Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WeddingBazaar – India\'s #1 Wedding Planning Platform',
    description:
      'Find verified wedding vendors across India. Photographers, venues, decorators & more.',
    images: ['/og-image.jpg'],
    creator: '@WeddingBazaar',
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
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    canonical: siteUrl,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'WeddingBazaar',
  url: siteUrl,
  description:
    "India's largest wedding planning platform connecting couples with verified vendors.",
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteUrl}/vendors?query={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
  sameAs: [
    'https://www.facebook.com/WeddingBazaar',
    'https://www.instagram.com/WeddingBazaar',
    'https://twitter.com/WeddingBazaar',
    'https://www.youtube.com/WeddingBazaar',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta name="theme-color" content="#ec4899" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="WeddingBazaar" />
      </head>
      <body>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  )
}
