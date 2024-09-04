import type { Metadata } from 'next';
import AppProviders from '~/lib/layout/Provider';

export const metadata: Metadata = {
  title: 'Invent3',
  description: 'Assest Management Software',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppProviders>
        <body>{children}</body>
      </AppProviders>
    </html>
  );
}
