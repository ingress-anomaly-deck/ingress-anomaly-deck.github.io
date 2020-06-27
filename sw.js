'use strict';

/* global self, fetch, caches, Promise */

const CACHE = 'deckofcards';

self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request)
    .then((response) => {
      if (!response || response.status !== 200 || response.type !== 'basic') {
        return response;
      }
      if (event.request.method !== 'GET') {
        return response;
      }
      const clonedResponse = response.clone();

      caches.open(CACHE)
        .then((cache) => {
          cache.put(event.request, clonedResponse);
        })
        .catch(err => {
          console.error(new Error(err));
        });

      return response;
    }).catch(err => {
      console.error(new Error(err));
      return caches.match(event.request);
    })
  );
});
