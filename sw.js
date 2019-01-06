'use strict';
importScripts('sw-toolbox.js'); 

toolbox.precache(["2_1077_DOBRIN_George.html","2_1077_DOBRIN_George.css","2_1077_DOBRIN_George.js"]); 
toolbox.router.get('/media/*', toolbox.cacheFirst); 
toolbox.router.get('/lib/*', toolbox.cacheFirst); 
toolbox.router.get('/*', toolbox.networkFirst, { networkTimeoutSeconds: 5});