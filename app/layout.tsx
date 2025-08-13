import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

// Optimize font loading with variable fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

// Enhanced metadata for better SEO and social sharing
export const metadata: Metadata = {
  title: {
    default: "Veritae.ID - Decentralized Identity Platform",
    template: "%s | Veritae.ID"
  },
  description: "Create and manage your decentralized identity with Veritae.ID - our W3C-compliant DID platform. Secure, private, and user-controlled digital identity for the modern web.",
  keywords: ["DID", "Decentralized Identity", "W3C", "Blockchain", "Ethereum", "Self-Sovereign Identity", "Digital Identity", "Privacy", "Security"],
  authors: [{ name: "Veritae.ID Team" }],
  creator: "Veritae.ID Platform",
  publisher: "Veritae.ID Platform",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://veritae.id"), // Replace with your actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://veritae.id",
    title: "Veritae.ID - Decentralized Identity Platform",
    description: "Create and manage your decentralized identity with Veritae.ID - our W3C-compliant DID platform.",
    siteName: "Veritae.ID",
    images: [
      {
        url: "/og-image.png", // You'll need to add this image
        width: 1200,
        height: 630,
        alt: "Veritae.ID Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Veritae.ID - Decentralized Identity Platform",
    description: "Create and manage your decentralized identity with Veritae.ID - our W3C-compliant DID platform.",
    images: ["/og-image.png"], // Same image as OpenGraph
    creator: "@veritae_id", // Replace with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json", // You might want to add a web manifest
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#3b82f6",
      },
    ],
  },
  category: "Technology",
};

// Enhanced viewport configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Additional meta tags for better mobile experience */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Veritae.ID" />
        
        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        
        {/* DNS prefetch for better performance */}
        <link rel="dns-prefetch" href="https://ethereum.org" />
        <link rel="dns-prefetch" href="https://metamask.io" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100`}
        suppressHydrationWarning
      >
        {/* Skip to main content link for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-blue-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Skip to main content
        </a>
        
        {/* Main content wrapper */}
        <Providers>
          <div className="flex flex-col min-h-screen">
            <main id="main-content" className="flex-1">
              {children}
            </main>
          </div>
        </Providers>
        
        {/* Performance monitoring script (optional) */}
        {process.env.NODE_ENV === 'production' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // Basic performance monitoring
                if ('performance' in window) {
                  window.addEventListener('load', function() {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    if (perfData) {
                      console.log('Page load time:', perfData.loadEventEnd - perfData.fetchStart);
                    }
                  });
                }
              `,
            }}
          />
        )}
      </body>
    </html>
  );
}
