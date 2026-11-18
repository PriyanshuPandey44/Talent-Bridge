import './globals.css';
import { SITE } from '@/lib/data';

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: 'Talent Bridge | Recruitment & Placement Agency in India', template: '%s | Talent Bridge' },
  description: 'Talent Bridge connects Indian companies with pre-screened talent across IT, BFSI, sales, HR and operations, and helps job seekers find the right role.',
  openGraph: { type: 'website', siteName: 'Talent Bridge', locale: 'en_IN' },
  icons: { icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌉</text></svg>" },
};
export const viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' };

export default function RootLayout({ children }) {
  const ld = { '@context': 'https://schema.org', '@type': 'EmploymentAgency', name: 'Talent Bridge', url: SITE.url, email: SITE.email, areaServed: 'IN' };
  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
