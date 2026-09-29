const C='bv-v1',F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
  e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request)));
});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  const s=e.notification.data&&e.notification.data.s;
  if(s)e.waitUntil(clients.openWindow('https://www.tradingview.com/chart/?symbol=BINANCE%3A'+s+'&interval=1'));
});
