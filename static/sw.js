if(!self.define){let e,a={};const s=(s,i)=>(s=new URL(s+".js",i).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,c)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(a[r])return;let n={};const u=e=>s(e,r),l={module:{uri:r},exports:n,require:u};a[r]=Promise.all(i.map((e=>l[e]||u(e)))).then((e=>(c(...e),n)))}}define(["./workbox-06098c79"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"_app/immutable/assets/_layout.BHJYfmgt.css",revision:"79ec1cbda82b22117219bfc47317cc4a"},{url:"_app/immutable/assets/_page.CzZYxYpJ.css",revision:"0930ca32337e69f594266ecbb988675a"},{url:"_app/immutable/assets/_page.MuT0lOQd.css",revision:"66c68597187a8bcd21ecb11e79ccdb54"},{url:"_app/immutable/assets/0.BHJYfmgt.css",revision:"79ec1cbda82b22117219bfc47317cc4a"},{url:"_app/immutable/assets/2.MuT0lOQd.css",revision:"66c68597187a8bcd21ecb11e79ccdb54"},{url:"_app/immutable/assets/3.CzZYxYpJ.css",revision:"0930ca32337e69f594266ecbb988675a"},{url:"_app/immutable/chunks/disclose-version.BCqYwiIS.js",revision:"861490905001c26d7aadbebb82a85273"},{url:"_app/immutable/chunks/entry.C1N2vQL9.js",revision:"94e3c606271d6017187af84c4813a73f"},{url:"_app/immutable/chunks/if.DxaunPJj.js",revision:"a14705be70292250f41affbbe82d5f9a"},{url:"_app/immutable/chunks/index-client.DuqBytrP.js",revision:"cb54989418f1d5dec5def46aae773594"},{url:"_app/immutable/chunks/legacy.No5F1ZFr.js",revision:"bb4c45a5083f7d18a24482ac95a7dbee"},{url:"_app/immutable/chunks/lifecycle.CAuZPhIZ.js",revision:"6efee561ae7e69cd1e7ea8d9a1706fa6"},{url:"_app/immutable/chunks/render.4jEexG5m.js",revision:"741619d8d2d1bca8afa27669be8af153"},{url:"_app/immutable/chunks/runtime.tAaEQ5YY.js",revision:"90a55e2daaa426e35b9af1f4cf7fe743"},{url:"_app/immutable/entry/app.DeUOCASX.js",revision:"6f3b1819761440c1866777eb09a3a81b"},{url:"_app/immutable/entry/start.eG0f1t81.js",revision:"98f7e5ba108cfd1f5f868032f05ef394"},{url:"_app/immutable/nodes/0.4Dd_XKcE.js",revision:"b54b4b994c70f170d2f29f878e4348ca"},{url:"_app/immutable/nodes/1.BeBJGvAY.js",revision:"5540f182c8328e35c6d5b6a84b69e4e9"},{url:"_app/immutable/nodes/2.BZtIJwnx.js",revision:"fa07c90aa73c9d81fdc0071fa8850fd4"},{url:"_app/immutable/nodes/3.hvHuVxH-.js",revision:"86036ef47e24283a4994b2a23826bfac"},{url:"_app/version.json",revision:"890ced29e531ac0253457246a54b845f"},{url:"favicon.png",revision:"3a387408ecc6cc283f724b39ca5fffb4"},{url:"icons/google.png",revision:"ca2f7db280e9c773e341589a81c15082"},{url:"manifest.json",revision:"4ad7e314aa762f431fb4ed20dbe18c6a"},{url:"sw.js",revision:"02c919f42e54851ddbbce5c91e12e006"},{url:"workbox-2d01f212.js",revision:"a61987aca08eea2fbb44845f17419a41"}],{}),e.registerRoute(/^https:\/\/jsonplaceholder\.typicode\.com\/posts/,new e.NetworkFirst({cacheName:"api-cache",plugins:[new e.ExpirationPlugin({maxEntries:50,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>e.origin===self.location.origin),new e.CacheFirst({cacheName:"static-cache",plugins:[new e.ExpirationPlugin({maxEntries:50,maxAgeSeconds:604800})]}),"GET")}));
//# sourceMappingURL=sw.js.map