'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function OneSignalInit() {
  const session = useSession();
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.OneSignal) {
      const script = document.createElement('script');
      script.src =
        'https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js';
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        window.OneSignal = window.OneSignal || [];
        window.OneSignal.push(() => {
          window.OneSignal.init({
            appId: 'cb3ce5eb-7d38-401f-8321-5b120a7e88ae',
            safari_web_id:
              'web.onesignal.auto.328b76bd-f95e-4ddf-b873-dc7d80d0ffe4',
            notifyButton: {
              enable: true,
            },
            allowLocalhostAsSecureOrigin: true, // only for dev
          });

          // ⏳ Listen for subscription changes
          window.OneSignal.on('subscriptionChange', (isSubscribed: boolean) => {
            if (isSubscribed) {
              // 🔐 Set the external user ID here
              window.OneSignal.setExternalUserId(session?.data?.user);
            }
          });
        });
      };
    }
  }, []);

  return null;
}
