importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

  workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/reg-sw.js', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/teams.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/fcm.json', revision: '1' },

    { url: '/manifest.json', revision: '3' },
    { url: '/pages/about.html', revision: '1' },
    { url: '/pages/standings.html', revision: '1' },
    { url: '/pages/favteams.html', revision: '1' },
    { url: '/assets/bg.png', revision: '1' },

    { url: 'assets/bg.jpg', revision: '2' },
    { url: '/assets/icon192.png', revision: '1' },
    { url: '/assets/icon512.png', revision: '1' },
    { url: '/css/materialize.css', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },

    { url: '/css/style.css', revision: '1' },
    { url: '/js/teams.js', revision: '1' },
    { url: '/js/materialize.js', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },

    { url: '/js/api.js', revision: '1' },
    { url: '/js/init.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css', revision: '1' },

    { url: 'https://fonts.googleapis.com/css2?family=Quicksand&display=swap', revision: '1' },
    { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1' },
], {
ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName : 'pages'
    })
  );

workbox.routing.registerRoute(
    ({url}) => url.origin,
    workbox.strategies.staleWhileRevalidate({
      cacheName : 'dataOffline'
    })
  );


self.addEventListener('push', function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options =  {
    body: body,
    icon: 'assets/icon192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };

  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
