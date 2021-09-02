(async function () {
  if (process.client) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();

      for (const registration of registrations) {
        registration.unregister();
      }
    } catch (e) {
      console.error(e);
      console.error(`Service Worker. Remove failed with error: ` + e.message);
    }
  }
})();
