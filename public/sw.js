if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,t)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let c={};const r=e=>n(e,a),o={module:{uri:a},exports:c,require:r};s[a]=Promise.all(i.map((e=>o[e]||r(e)))).then((e=>(t(...e),c)))}}define(["./workbox-9b4d2a02"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"4ee56a1073f084211ee9ff960d551ed8"},{url:"/_next/static/DjOzRk9kLm14-OrIqBMjT/_buildManifest.js",revision:"a1b7599199e2e8c82f2c6bcf8d8aca61"},{url:"/_next/static/DjOzRk9kLm14-OrIqBMjT/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/0e5ce63c-1ac634d9ea077328.js",revision:"DjOzRk9kLm14-OrIqBMjT"},{url:"/_next/static/chunks/256-bfc0ceecabfe5c4d.js",revision:"DjOzRk9kLm14-OrIqBMjT"},{url:"/_next/static/chunks/553-387a2565b6c166c6.js",revision:"DjOzRk9kLm14-OrIqBMjT"},{url:"/_next/static/chunks/641-d8bd97fab87d2f79.js",revision:"DjOzRk9kLm14-OrIqBMjT"},{url:"/_next/static/chunks/710-27e01188b5d0e2b4.js",revision:"DjOzRk9kLm14-OrIqBMjT"},{url:"/_next/static/chunks/938-f3782ec6ef3c7d53.js",revision:"DjOzRk9kLm14-OrIqBMjT"},{url:"/_next/static/chunks/app/(afterLogin)/layout-c3614d882fd97999.js",revision:"DjOzRk9kLm14-OrIqBMjT"},{url:"/_next/static/chunks/app/(afterLogin)/main/page-03dc754728fcdbf1.js",revision:"DjOzRk9kLm14-OrIqBMjT"},{url:"/_next/static/chunks/app/(beforeLogin)/page-141dcd65800e6388.js",revision:"DjOzRk9kLm14-OrIqBMjT"},{url:"/_next/static/chunks/app/_not-found-3e36275fba01325d.js",revision:"DjOzRk9kLm14-OrIqBMjT"},{url:"/_next/static/chunks/app/layout-d8b28bc1f293f565.js",revision:"DjOzRk9kLm14-OrIqBMjT"},{url:"/_next/static/chunks/bc9e92e6-3edf7ce9788ed89d.js",revision:"DjOzRk9kLm14-OrIqBMjT"},{url:"/_next/static/chunks/e37a0b60-2f3267e3651da033.js",revision:"DjOzRk9kLm14-OrIqBMjT"},{url:"/_next/static/chunks/f4e5f4e1-0bc69c6b0be17e37.js",revision:"DjOzRk9kLm14-OrIqBMjT"},{url:"/_next/static/chunks/fd9d1056-ac2c2568773ffb66.js",revision:"DjOzRk9kLm14-OrIqBMjT"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"DjOzRk9kLm14-OrIqBMjT"},{url:"/_next/static/chunks/main-app-c1e1cd3ca6a6ea6d.js",revision:"DjOzRk9kLm14-OrIqBMjT"},{url:"/_next/static/chunks/main-e7344548cdb27893.js",revision:"DjOzRk9kLm14-OrIqBMjT"},{url:"/_next/static/chunks/pages/_app-98cb51ec6f9f135f.js",revision:"DjOzRk9kLm14-OrIqBMjT"},{url:"/_next/static/chunks/pages/_error-e87e5963ec1b8011.js",revision:"DjOzRk9kLm14-OrIqBMjT"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-fe2b9203e839d2a9.js",revision:"DjOzRk9kLm14-OrIqBMjT"},{url:"/_next/static/css/b30cda19ed738596.css",revision:"b30cda19ed738596"},{url:"/images/icons/icon-192x192.png",revision:"e67820b84b2b886b11c06e5191954585"},{url:"/images/icons/icon-256x256.png",revision:"d2b64eeea6550be342e20b593ac7b1cd"},{url:"/images/icons/icon-384x384.png",revision:"3bce9088a46b836da099fdd3a10feaca"},{url:"/images/icons/icon-512x512.png",revision:"7c9f27c47b81925c69a305aa6a1d4d03"},{url:"/manifest.json",revision:"0cd49f71a8544a76700e267d7278ddfb"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
