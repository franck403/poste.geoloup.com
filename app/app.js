// Registering Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/app/sw.js');
  }