let cacheDate="appV1";

this.addEventListener("install",(event)=>{
    event.waitUntil(
        caches.open(cacheDate).then((cache)=>{
            cache.addAll([
                "/static/js/bundle.js",
                "/manifest.json",
                "/index.html",
                "/"
            ])
        })
    )
})

self.addEventListener('fetch',() => console.log("fetch"));