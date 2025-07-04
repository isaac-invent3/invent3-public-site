import { useState, useEffect } from 'react';
import { messaging, getToken } from '../../firebase-config';

const useFCMToken = () => {
  const [fcmToken, setFcmToken] = useState(null);
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState(null);

  useEffect(() => {
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        setNotificationPermissionStatus(permission);

        if (permission === 'granted') {
          const token = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
          });
          setFcmToken(token);
          console.log('FCM Token:', token);
        } else {
          console.log('Notification permission denied');
        }
      } catch (error) {
        console.error('Error getting FCM token:', error);
      }
    };

    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      requestPermission();
    }
  }, []);

  return { fcmToken, notificationPermissionStatus };
};

export default useFCMToken;
