'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function OneSignalInit() {
  const session = useSession();
  useEffect(() => {
    // Only run on the client
    if (typeof window !== 'undefined') {
      // Avoid duplicate script injection
      if (!document.getElementById('onesignal-sdk')) {
        const script = document.createElement('script');
        script.id = 'onesignal-sdk';
        script.src =
          'https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js';
        script.defer = true;
        document.head.appendChild(script);
      }

      // Initialize using OneSignalDeferred
      window.OneSignalDeferred = window.OneSignalDeferred || [];
      window.OneSignalDeferred.push(async function (OneSignal: any) {
        await OneSignal.init({
          appId: 'cb3ce5eb-7d38-401f-8321-5b120a7e88ae',
          safari_web_id:
            'web.onesignal.auto.328b76bd-f95e-4ddf-b873-dc7d80d0ffe4', // optional
          notifyButton: {
            enable: true,
          },
        });
        await OneSignal.login(session?.data?.user?.username);
        // // Listen to subscription change and set external user ID
        // OneSignal.Notifications.addEventListener('subscribe', async () => {
        //   console.log({});
        //   // Example: set dynamic external user ID (replace with real logic)
        // });
      });
    }
  }, []);

  return null;
}
