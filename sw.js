const assets = [
    '/',
    'index.html',
    'favicon.png',
    '1.8.8.js',
    '1.5.2.js',
    '1.3.js',
    'fix-webm-duration.js',
    'worker_bootstrap.js',
    '1.3.epk',
    '1.5.2/vanilla.epk',
    '1.5.2/nebula.epk',
    '1.5.2/ricefault.epk',
    '1.5.2/bedlessfault.epk',
    '1.8.8/vanilla.epk',
    '1.8.8/nebula.epk',
    '1.8.8/ricefault.epk',
    '1.8.8/bedlessfault.epk'
];

self.addEventListener('install', (evt) => {
    evt.waitUntil(
        caches.open('site').then((cache) => {
            cache.addAll(assets);
        })
    );
});

self.addEventListener('fetch', function (event) {
    if (event.request.method != 'GET') return;
    event.respondWith(
        caches.open('site').then(function (cache) {
            return cache.match(event.request).then(function (response) {
                return fetch(event.request)
                    .then(function (response) {
                        cache.put(event.request, response.clone());
                        return response;
                    })
                    .catch(() => {
                        return response;
                    });
            });
        })
    );
});
