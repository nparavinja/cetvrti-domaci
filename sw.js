
const staticCacheName = 'site-static';
////
const staticAssets = [
    '/cetvrti-domaci/',
    '/cetvrti-domaci/index.html',
    '/cetvrti-domaci/pages/restoran.html',
    '/cetvrti-domaci/manifest.json',
    '/cetvrti-domaci/js/app.js',
    '/cetvrti-domaci/img/android-icon-36x36.png',
    '/cetvrti-domaci/img/android-icon-48x48.png',
    '/cetvrti-domaci/img/android-icon-72x72.png',
    '/cetvrti-domaci/img/android-icon-96x96.png',
    '/cetvrti-domaci/img/android-icon-144x144.png',
    '/cetvrti-domaci/img/android-icon-192x192.png',
    '/cetvrti-domaci/img/icon.png',
    '/cetvrti-domaci/img/retro2.jpg',
    '/cetvrti-domaci/css/w3.css',
    '/cetvrti-domaci/css/styles.css',
    '/cetvrti-domaci/img/pizza.jpg',
    '/cetvrti-domaci/img/chef.jpg',
    '/cetvrti-domaci/img/onepage_restaurant.jpg',
    '/cetvrti-domaci/img/map.jpg',
    '/cetvrti-domaci/fonts/AmaticSC-Regular.ttf',
    '/cetvrti-domaci/fonts/AmaticSC-Bold.ttf',
];


self.addEventListener('install', async eventObject => {
   

    // kreiramo kes, ako postoji otvaramo
    const cache = await caches.open(staticCacheName);
    // dodajemo asete u kes
    await cache.addAll(staticAssets);
    return self.skipWaiting();
   
}); 


self.addEventListener('activate', eventObject => {
    //console.log("Service worker has been activated.");
});
//asdas
self.addEventListener('fetch', eventObject => {
   // console.log("Fetch event.", eventObject);
    // fetch event ima properti request - taj request se salje serveru
    const zahtev = eventObject.request;
    eventObject.respondWith(vratiIzKesMemorije(zahtev));
  
});


async function vratiIzKesMemorije(zahtev) {
    const kes = await caches.open(staticCacheName);
    const kesiraniPodaci = await kes.match(zahtev);
    // ako nemamo zahtevan resurs u kesu onda saljemo zahtev serveru
    // u ovom slucaju svi zahtevani podaci su vec u kes memoriji, ali bez fetch() dela 
    // dobijao sam gresku
    // GET chrome-extension://elgalmkoelokbchhkhacckoklkejnhcd/build/ng-validate.js net::ERR_FAILED
    return kesiraniPodaci || fetch(zahtev);
}


