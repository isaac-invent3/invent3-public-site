import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import AppProviders from '~/lib/layout/Provider';
import './globals.css';
import { PublicEnvScript } from 'next-runtime-env';
import 'react-push-notification/dist/notifications/Notification.css';

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
      <head>
        <PublicEnvScript />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <AppProviders>{children}</AppProviders>
        <SpeedInsights />
      </body>
    </html>
  );
}
