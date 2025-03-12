import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import AppProviders from '~/lib/layout/Provider';
import './globals.css';

const APP_NAME = 'Invent3';
const DESCRIPTION = 'Assest Management Software';
export const metadata: Metadata = {
  title: { default: APP_NAME, template: '%s | Invent3' },
  description: DESCRIPTION,
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: 'default',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
        <SpeedInsights />
      </body>
    </html>
  );
}
