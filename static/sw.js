if(!self.define){let e,n={};const s=(s,i)=>(s=new URL(s+".js",i).href,n[s]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=n,document.head.appendChild(e)}else e=s,importScripts(s),n()})).then((()=>{let e=n[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,c)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(n[t])return;let o={};const r=e=>s(e,t),a={module:{uri:t},exports:o,require:r};n[t]=Promise.all(i.map((e=>a[e]||r(e)))).then((e=>(c(...e),o)))}}define(["./workbox-b445c9d2"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"favicon.png",revision:"3a387408ecc6cc283f724b39ca5fffb4"},{url:"icons/icon-192x192.png",revision:"ca2f7db280e9c773e341589a81c15082"},{url:"manifest.json",revision:"4ad7e314aa762f431fb4ed20dbe18c6a"}],{}),e.registerRoute(/^https:\/\/github-trending-api\.de\.a9sapp\.eu\/repositories/,new e.StaleWhileRevalidate({cacheName:"trending-repos-cache",plugins:[new e.ExpirationPlugin({maxEntries:50,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>e.origin===self.location.origin),new e.CacheFirst({cacheName:"static-cache",plugins:[new e.ExpirationPlugin({maxEntries:50,maxAgeSeconds:604800})]}),"GET")}));
//# sourceMappingURL=sw.js.map
