/**
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-env browser */
'use strict';

if ('serviceWorker' in navigator) {
  // If this is a dev environment (the hostname is localhost or 127.0.0.1),
  // skip service worker registration entirely and unregsiter and existing
  // service workers for easier development flow.
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // Do not register for dev environments
    console.log('Dev environment detected, skipping ServiceWorker registration.');
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      // Unregister any service workers that exist for this app
      for (var i=0; i<registrations.length; i++) {
        console.log('Unregistering existing service worker for dev environment.');
        registrations[i].unregister();
      }
    });
  } else {
    // Delay registration until after the page has loaded, to ensure that our
    // precaching requests don't degrade the first visit experience.
    // See https://developers.google.com/web/fundamentals/instant-and-offline/service-worker/registration
    window.addEventListener('load', function() {
      // Your service-worker.js *must* be located at the top-level directory relative to your site.
      // It won't be able to control pages unless it's located at the same level or higher than them.
      // *Don't* register service worker file in, e.g., a scripts/ sub-directory!
      // See https://github.com/slightlyoff/ServiceWorker/issues/468
      setTimeout(() => {
        navigator.serviceWorker.register(`service-worker.js`).then(function(reg) {
          console.log('Service worker registered.')
          // updatefound is fired if service-worker.js changes.
          reg.onupdatefound = function() {
            console.log('Service worker update found.');
            // The updatefound event implies that reg.installing is set; see
            // https://w3c.github.io/ServiceWorker/#service-worker-registration-updatefound-event
            var installingWorker = reg.installing;

            installingWorker.onstatechange = function() {
              switch (installingWorker.state) {
                case 'installed':
                if (navigator.serviceWorker.controller) {
                  // At this point, the old content will have been purged and the fresh content will
                  // have been added to the cache.
                  // It's the perfect time to display a "New content is available; please refresh."
                  // message in the page's interface.
                  console.log('New or updated content is available.');
                  setTimeout(function() {
                    window.dispatchEvent(new CustomEvent('service-worker-changes-available'));
                  }, 2500);
                } else {
                  // At this point, everything has been precached.
                  // It's the perfect time to display a "Content is cached for offline use." message.
                  console.log('Content is now available offline!');
                }
                break;

                case 'redundant':
                console.error('The installing service worker became redundant.');
                break;
              }
            };
          };
        }).catch(function(e) {
          console.error('Error during service worker registration:', e);
        });

      },2000);
    });
  }
}
