import { AppLogger } from "./services/AppLogger";

export default function swDev() {
    const swUrl = `${process.env.PUBLIC_URL}/sw.js`;
    navigator.serviceWorker.register(swUrl).then((response) => {
        console.warn("response", response)
    })
}
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js', {
        scope: '.' // <--- THIS BIT IS REQUIRED
    }).then(function (registration) {
        // Registration was successful
        AppLogger('ServiceWorker registration successful with scope: ', registration.scope);
    }, function (err) {
        // registration failed :(
        AppLogger('ServiceWorker registration failed: ', err);
    });
}