const cacheversion = 'v1';
filesToCache = [
	'index.html',
	'/images/icon-512x512.png',
	'/images/icon-192x192.png',
	'/images/icon-144x144.png'
]

self.addEventListener('install', event => {
	console.log('Service worker install event fired!');
	event.waitUntil(
		caches.open(cacheversion).then(cache => {
			return cache.addAll(filesToCache);
		})
	);
});

self.addEventListener('fetch', event => {
	console.log('Fetch interecepted for: ', event.request.url);
	event.respondWith(
		caches.match(event.request).then(cachedResponse => {
			if (cachedResponse) {
				return cachedResponse;
			}
			return fetch(event.request);
		})
	);
})
self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys().then(keyList => {
			return Promise.all(
				keyList.map(key => {
					if (key !== cacheversion){
						return caches.delete(key);
					}
				})
			)
		})
	);
});

