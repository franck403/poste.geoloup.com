// Files to cache
const cacheName = 'revu-Geoloup-V1';
const file = [
  '/app/',
  '/app/local/main.min.js',
  '/app/local/timer.js',
  '/app/local/session.js',
  '/app/local/load.js',
  '/local/dflip/js/libs/jquery.min.js',
  '/local/dflip/js/libs/dflip.min.js',
  '/local/dflip/js/libs/three.min.js?ver=1.7.3.5',
  '/local/dflip/js/libs/mockup.min.js?ver=1.7.3.5',
  '/local/dflip/js/libs/pdf.min.js?ver=1.7.3.5',
  '/app/reader.js',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/TweenMax.min.js',
  '/search.js',
  '/app/bar.css',
  '/app/style.css',
  '/app/blog.css',
  '/loading.mp3',
  '/image/maison.png',
  '/image/maison144.png',
  'https://cdn1.francoischouin1.repl.co/pdf/noel2022.pdf',
  'https://cdn1.francoischouin1.repl.co/pdf/Halloween.pdf',
  'https://cdn1.francoischouin1.repl.co/pdf/Humain.pdf',
  'https://cdn1.francoischouin1.repl.co/pdf/Olympique.pdf',
  'https://cdn1.francoischouin1.repl.co/pdf/Seth.pdf',
  '/local/page/2022/noel2022.html',
  '/local/page/2022/halloween2022.html',
  '/local/page/2022humain.html',
  '/local/page/2022/olympique.html',
  '/local/page/dieu/egypte/seth.html',
];


// Installing Service Worker
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    console.log('[Service Worker] Caching all: app shell and content');
    await cache.addAll(file);
  })());
});

// Fetching content using Service Worker
self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
    if (r) return r;
    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
    console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
    cache.put(e.request, response.clone());
    return response;
  })());
});