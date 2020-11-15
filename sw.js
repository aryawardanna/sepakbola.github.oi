importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);
workbox.precaching.precacheAndRoute([
    { url: "/", revision: 1 },
    { url: "/material_icons/codepoints", revision: 1 },
    { url: "/material_icons/material-icons.css", revision: 1 },
    { url: "/material_icons/MaterialIcons-Regular.eot", revision: 1 },
    { url: "/material_icons/MaterialIcons-Regular.ijmap", revision: 1 },
    { url: "/material_icons/MaterialIcons-Regular.ttf", revision: 1 },
    { url: "/material_icons/MaterialIcons-Regular.woff", revision: 1 },
    { url: "/material_icons/MaterialIcons-Regular.woff2", revision: 1 },
    { url: "/js/RegisterSW/RegisterSW.js", revision: 1 },
    { url: "/js/RegisterSW/RegisterSWDetailTeam.js", revision: 1 },
    { url: "/js/RegisterSW/RegisterSWEvents.js", revision: 1 },
    { url: "/js/RegisterSW/RegisterSWPlayersList.js", revision: 1 },
    { url: "/index.html", revision: 1 },
    { url: "/nav.html", revision: 1 },
    { url: "/manifest.json", revision: 1 },
    { url: "/push.js", revision: 1 },
    { url: "/css/materialize.min.css", revision: 1 },
    { url: "/css/load.css", revision: 1 },
    { url: "/js/Api.js", revision: 1 },
    { url: "/js/DataBase.js", revision: 1 },
    { url: "/js/idb.js", revision: 1 },
    { url: "/js/materialize.min.js", revision: 1 },
    { url: "/js/nav.js", revision: 1 },
    { url: "/js/Load/load-DetailTeam.js", revision: 1 },
    { url: "/js/Load/load-index.js", revision: 1 },
    { url: "/js/Load/load-ListAllPlayers.js", revision: 1 },
], {
    ignoreUrlParametersMatching: [/.*/],
});


workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
            }),
        ],
    }),
);

workbox.routing.registerRoute(
    new RegExp('pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: "pages",
    })
);

workbox.routing.registerRoute(
    new RegExp('/css/'),
    workbox.strategies.cacheFirst({
        cacheName: 'styles'
    })
);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: "gila-bola",

    })
);

self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: 'images/logo.png',
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