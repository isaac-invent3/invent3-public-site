// lib/gtm.ts
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-PQ9RB86S';

export const pageview = (url: string) => {
  if (window && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: 'pageview',
      page: url,
    });
  }
};
