'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "8011171cbd06e99518cff80b5c815761",
"index.html": "8d00e5e7d4a8c23bbe5a28ee29d4ea07",
"/": "8d00e5e7d4a8c23bbe5a28ee29d4ea07",
"main.dart.js": "0d5307aaed6b46ff5309d7ee54e85997",
"flutter.js": "7d69e653079438abfbb24b82a655b0a4",
".git/config": "48781d965a20e049acaf61c65ce4903a",
".git/objects/95/0a788d311dcfe1449ba4e8f54d12077267819b": "1b17b07c5e22ec27f7b0293c352c81b4",
".git/objects/50/10be1e9df9606fd92d88d253a2edfeb39da76b": "21c960eae6ad785ecb81a6c24aca8126",
".git/objects/03/eaddffb9c0e55fb7b5f9b378d9134d8d75dd37": "87850ce0a3dd72f458581004b58ac0d6",
".git/objects/9b/61920a5cb5a812654e9596c1a50961ee0b840a": "f94d5dbcc9b47d375b9bd6da203dd9dd",
".git/objects/04/e5efc15dc0c60ea2ffcc37c5bf25e96689f44d": "978222f47488835b92838c74cb5c684c",
".git/objects/69/dd618354fa4dade8a26e0fd18f5e87dd079236": "8cc17911af57a5f6dc0b9ee255bb1a93",
".git/objects/94/b52e13bf7919ae4ea7235d78019b592dde8611": "b79fa5ca1cdbf72f253763797850f314",
".git/objects/0e/e3590f4d74c3a4e4621a8d048d01f13436ec7a": "25939fd9f3cb53628d90cf3f4f9a026a",
".git/objects/60/cc2a5975f10c7fc5debd182412815c7e4fd315": "b28fd0e407ee8b5b15cb866a79fa4f0d",
".git/objects/34/caa3e684965acaa4f6fc0bd963d607efc2fde0": "2fbd2b9ffa7e3f755ed5b62bf49636c9",
".git/objects/5a/129f27d7174108d210352b2f7fa4be947b9b82": "a24349f5e3d81b7a40f318dd0c202b22",
".git/objects/33/9cfa4673f9f9ff6774bae9249104a4628031bd": "e90f48a20c1074a3336717f2d7548533",
".git/objects/05/a234ad98735da748f386d34334197cbf38ff3d": "c69f07a1d9c3bbdc394918526b97b6b2",
".git/objects/bb/3085876799532613a08c7ebe43f24f0cc46864": "1b6aa21800d948d5513c15e54d131215",
".git/objects/a5/d0486fd1f6a92605752bcaad4170cb68fe7c79": "9fc21c12a6b793e30982960c51f4f8c3",
".git/objects/bc/c4aa00d64be864c3d65d2d3c1f8d1079e80f06": "be315280e70abf4c8f4f39c5ae679acf",
".git/objects/bc/2698b05b52479cee8118bf5eb5ce2728610610": "b4fbaeafcc1b95687f4d7e810697860f",
".git/objects/bc/274ba84ef1fdedfe1fc1e77f36ea369c17e658": "a53ca5fa8b3aa402ad63642f4ea4cee4",
".git/objects/ae/13865f6faa6d9c70798878247cb10c873408b7": "816a354a21b71749f85a23a9813c16bc",
".git/objects/c8/6be2621afacaa744de3a60b47a36f06e5e7527": "ec09ac5d18d489e47c5334b1e5515d0f",
".git/objects/4e/3545aeb7e29d30f6e20c32a6945122ee8ef6e6": "548d030d72b3ff0d83059f4aa125c33a",
".git/objects/4e/ce63d05f059488382ea710559cae42e712a162": "cc2df8d3a99832245dd8d76e43effef2",
".git/objects/20/1afe538261bd7f9a38bed0524669398070d046": "82a4d6c731c1d8cdc48bce3ab3c11172",
".git/objects/4b/08c92a6448f807045994c6de22d8ee9093aaab": "73d0aae290bed3c22142aa1a7a3ba56f",
".git/objects/1f/1ee4c2d0313ffca33121aefd9e32cbe8fa4884": "e77986c4344e7e2db86da48c52c23662",
".git/objects/1f/45b5bcaac804825befd9117111e700e8fcb782": "7a9d811fd6ce7c7455466153561fb479",
".git/objects/8f/e7af5a3e840b75b70e59c3ffda1b58e84a5a1c": "e3695ae5742d7e56a9c696f82745288d",
".git/objects/43/e946e398d96aee466fa0aabb625f0889c3a4bd": "ac34520dee747f675e6e0a15c0bbd2be",
".git/objects/5c/c6b490a6d2abcb3104cd22d8091b93110b3719": "d4c8ffaa5603b7e1787b74cceb0cd761",
".git/objects/98/f3881ce6226f7f6c3975b645d2adaa1237ed0e": "947724f87f2eaaf8d850fa1491cee8fb",
".git/objects/30/d566b828afb18217b99a5faa82d1402a551c15": "aefc9cdafb0f54efae970d90049c470e",
".git/objects/5b/b5075aaa24d2c44f654f956caa88da0e099a5c": "70448be9df19eabfc3abe57d66b895be",
".git/objects/01/c26547579a43bac1d40fa1c275d809551d0054": "c36bd3479ae0a0dda7d86d11fa1ae5ca",
".git/objects/55/d1117af0e5b48eff20b115979784f33ce28590": "e109f3c3bf741b2ab0a83fdac8d3adbe",
".git/objects/90/13fede797b84d383f15ea0a08eb38dbeff9266": "bb5435ee4548c90d572f30d8d1cdec49",
".git/objects/ba/8cb00dd5231f1a55de0205c16445926a696526": "be8592f9341c9b01b70890c8614c6cf7",
".git/objects/ba/5317db6066f0f7cfe94eec93dc654820ce848c": "9b7629bf1180798cf66df4142eb19a4e",
".git/objects/a0/089f14e114b7a058a370449467d71d400d8123": "731c29d2d446bfeee4ca7dd979750bd0",
".git/objects/b1/2537d16d60e9777a43ddf1beac2d8c7e889414": "0597a600f0472e386d775eedfecec0f9",
".git/objects/d5/fea9ac0065b671363cd88ac5374a9b7e120a36": "4b6c8d3e06ec1b8416ed67e4a4f1fb0d",
".git/objects/d5/4e13351b1b19985d056c8ed4f51ca5d9d2a1c8": "853e73d155653a9df2044c76ff2be43a",
".git/objects/b0/2f5a04bc5240582432b6d4f11b5a64eb7bd5e9": "633fdea1db50b98717814621cd26970e",
".git/objects/c4/e981b3e89625c1885ddbc94aafa75abea1f262": "805f644375efbce0bc8c30fde1bcdd9c",
".git/objects/e1/06c3b9b813cd21c84e4ca49995ea66839b1d42": "4c7ed4af47638de88a6cb21388ffd6cf",
".git/objects/e9/94b9252cf6ddc0f8635b92cca265b505338675": "e9ef0015e342aef6d76bf1461334023e",
".git/objects/46/4ab5882a2234c39b1a4dbad5feba0954478155": "2e52a767dc04391de7b4d0beb32e7fc4",
".git/objects/79/edce8610a5b69b74bed2264c6d8293a4780af7": "5dc1b36c586327fecc3990d085d5d34f",
".git/objects/77/2c5f41187b5207091ea3c0af058d353019f122": "b3c55c2b395017f1906ce4a62e6cc428",
".git/objects/48/33fcf9ba677d3df448c90e63368e50f8bfc8d6": "a5b926fccf641f8e2a09e52478c0d37a",
".git/objects/84/e0ad75a5244b10fc672ac894c64b7bc5db8fc1": "8f49e703925f06d9ae0036f9f6819e86",
".git/objects/4f/d0e51f345ee398d4c56c9a2a36514cfdc54f3e": "d8e976b7b97437231f01681fc40815a3",
".git/objects/85/ccd29fa9a031a8c55cd1c3f01755d2fa2b6c99": "d528dc10e2230befa722dc4b0c8dab54",
".git/objects/85/6a39233232244ba2497a38bdd13b2f0db12c82": "eef4643a9711cce94f555ae60fecd388",
".git/objects/71/8bd97d834ca7304ee9e9914bdda6be89afe76b": "6093d5542720c75947fcadf62e1b1f3f",
".git/objects/76/cd2869ddf8d49d65ab799edec563721c93a0c6": "64916563fb9d78f1af3eb2abad78c01f",
".git/objects/82/178b84d4c1b5114dcd42500a331bba0151135a": "5e363d48cb2eddfeea7523d17c71e7c3",
".git/objects/2b/e39c7fd3da441ddac9bea54fd12621dd39960a": "24031b20667d22ca8dba4debe8b9eab5",
".git/objects/8e/cb5a9c8bef361a78c83acf12c3bda6c6758166": "700ee651c29da9657ea57003855bc0a8",
".git/objects/25/8b3eee70f98b2ece403869d9fe41ff8d32b7e1": "05e38b9242f2ece7b4208c191bc7b258",
".git/HEAD": "cf7dd3ce51958c5f13fece957cc417fb",
".git/info/exclude": "036208b4a1ab4a235d75c181e685e5a3",
".git/logs/HEAD": "5b5fa14aa381a9d13fb53f516b276be5",
".git/logs/refs/heads/main": "5b5fa14aa381a9d13fb53f516b276be5",
".git/logs/refs/remotes/origin/main": "048fc891c06bc67cd17af7a17f64a585",
".git/description": "a0a7c3fff21f2aea3cfa1d0316dd816c",
".git/hooks/commit-msg.sample": "579a3c1e12a1e74a98169175fb913012",
".git/hooks/pre-rebase.sample": "56e45f2bcbc8226d2b4200f7c46371bf",
".git/hooks/pre-commit.sample": "305eadbbcd6f6d2567e033ad12aabbc4",
".git/hooks/applypatch-msg.sample": "ce562e08d8098926a3862fc6e7905199",
".git/hooks/fsmonitor-watchman.sample": "a0b2633a2c8e97501610bd3f73da66fc",
".git/hooks/pre-receive.sample": "2ad18ec82c20af7b5926ed9cea6aeedd",
".git/hooks/prepare-commit-msg.sample": "2b5c047bdb474555e1787db32b2d2fc5",
".git/hooks/post-update.sample": "2b7ea5cee3c49ff53d41e00785eb974c",
".git/hooks/pre-merge-commit.sample": "39cb268e2a85d436b9eb6f47614c3cbc",
".git/hooks/pre-applypatch.sample": "054f9ffb8bfe04a599751cc757226dda",
".git/hooks/pre-push.sample": "2c642152299a94e05ea26eae11993b13",
".git/hooks/update.sample": "647ae13c682f7827c22f5fc08a03674e",
".git/hooks/push-to-checkout.sample": "c7ab00c7784efeadad3ae9b228d4b4db",
".git/refs/heads/main": "433edd1625a5f46423de3f7ea43f9dcd",
".git/refs/remotes/origin/main": "433edd1625a5f46423de3f7ea43f9dcd",
".git/index": "a18703b09cff3ba3fe6ee1dced7360b0",
".git/COMMIT_EDITMSG": "45c9eb7fa6e6a781268f8a3b8d62d8b9",
"assets/AssetManifest.json": "2efbb41d7877d10aac9d091f58ccd7b9",
"assets/NOTICES": "d94e6c1c2a1b6522e921169c123a698b",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.bin.json": "69a99f98c8b1fb8111c5fb961769fcd8",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "4096b5150bac93c41cbc9b45276bd90f",
"assets/AssetManifest.bin": "693635b5258fe5f1cda720cf224f158c",
"assets/fonts/MaterialIcons-Regular.otf": "892a192bbf23694530e25d83d52ec115",
"canvaskit/skwasm.js": "87063acf45c5e1ab9565dcf06b0c18b8",
"canvaskit/skwasm.wasm": "2fc47c0a0c3c7af8542b601634fe9674",
"canvaskit/chromium/canvaskit.js": "0ae8bbcc58155679458a0f7a00f66873",
"canvaskit/chromium/canvaskit.wasm": "143af6ff368f9cd21c863bfa4274c406",
"canvaskit/canvaskit.js": "eb8797020acdbdf96a12fb0405582c1b",
"canvaskit/canvaskit.wasm": "73584c1a3367e3eaf757647a8f5c5989",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
