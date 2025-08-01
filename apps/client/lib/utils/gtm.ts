// lib/gtm.ts
import { env } from 'next-runtime-env';

export const GTM_ID = env('NEXT_PUBLIC_GTM_ID');

export const pageview = (url: string) => {
  if (window && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: 'pageview',
      page: url,
    });
  }
};
