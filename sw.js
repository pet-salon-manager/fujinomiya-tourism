const C='fujinomiya-v28';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==C).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(
    u.pathname.endsWith('/') ||
    u.pathname.endsWith('/index.html') ||
    u.pathname.endsWith('/spots.json') ||
    u.pathname.endsWith('/manifest.webmanifest')
  ){
    e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>caches.match(e.request)));
  }
});
