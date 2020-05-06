if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/cetvrti-domaci/sw.js')
        .then((reg) => console.log('Service worker registered.', reg))
        .catch((err) => console.log("Service worker not registered.", err));
}