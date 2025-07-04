importScripts(
  'https://www.gstatic.com/firebasejs/10.11.1/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/10.11.1/firebase-messaging-compat.js'
);

const firebaseConfig = {
  apiKey: 'AIzaSyAGn3Y1FJaRFrKXk8Z304DVYbzx9uHK_b8',
  authDomain: 'invent3pro.firebaseapp.com',
  projectId: 'invent3pro',
  storageBucket: 'invent3pro.firebasestorage.app',
  appId: '1:943963569:web:0edeafbf304464d922d190',
  messagingSenderId: 'G-3VPV1ZS220',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo-initials.svg',
    data: { url: payload.fcmOptions?.link || '/' },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    clients
      .matchAll({
        type: 'window',
        includeUncontrolled: true,
      })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url.includes(targetUrl) && 'focus' in client) {
            return client.focus();
          }
        }
        return clients.openWindow(targetUrl);
      })
  );
});
