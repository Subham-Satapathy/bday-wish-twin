import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Happy Birthday Twin! 🎉💕',
  description: 'A special birthday celebration filled with love, memories, and surprises for Twin',
  keywords: 'birthday, love, celebration, romantic, Twin',
  authors: [{ name: 'Loving Partner' }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false, // Prevent zoom on mobile for better UX
  },
  themeColor: '#FFB6C1',
  manifest: '/manifest.json',
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">💕</text></svg>',
        type: 'image/svg+xml',
      },
    ],
    apple: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">💕</text></svg>',
        type: 'image/svg+xml',
      },
    ],
  },
  openGraph: {
    title: 'Happy Birthday Twin! 🎉💕',
    description: 'A special birthday celebration filled with love and surprises',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Birthday wishes for Twin',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Happy Birthday Twin! 🎉💕',
    description: 'A special birthday celebration filled with love and surprises',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preload critical fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600;700&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />
        
        {/* Mobile optimization meta tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Birthday Wishes" />
        
        {/* Prevent unwanted zoom on iOS */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        
        {/* Performance hints */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* Inline critical CSS for viewport height calculation */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Calculate proper viewport height for mobile
              function setVH() {
                let vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', vh + 'px');
              }
              setVH();
              window.addEventListener('resize', setVH);
              window.addEventListener('orientationchange', setVH);
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased overflow-x-hidden">
        {/* Skip to main content for accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white p-2 rounded-md z-50">
          Skip to main content
        </a>
        
        <main id="main-content" className="relative">
          {children}
        </main>
        
        {/* Service Worker for PWA functionality */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
