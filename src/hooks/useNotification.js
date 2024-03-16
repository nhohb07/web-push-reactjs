import { useEffect } from "react";

function checkServiceWorkerAvailable() {
  if (!("serviceWorker" in navigator)) {
    throw new Error("Your browser doesn't support service worker!");
  }

  if (!("Notification" in window)) {
    throw new Error("Your browser doesn't support for show notification!");
  }

  if (!("PushManager" in window)) {
    throw new Error("Your browser doesn't support for push notificaiton API!");
  }
}

async function requestNotificationPermission() {
  if (Notification.permission === "granted") {
    return;
  }

  const permission = await Notification.requestPermission();
  if (permission === "denied") {
    throw new Error("Your browser doesn't support Allow to show notification!");
  }
}

async function registerServiceWorker() {
  return navigator.serviceWorker.register("service-worker.js");
}

export const useNotification = () => {
  useEffect(() => {
    try {
      checkServiceWorkerAvailable();
      requestNotificationPermission().then(() => registerServiceWorker());
    } catch (error) {
      alert(error.message);
    }
  }, []);
};
