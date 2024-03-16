const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
};

const saveSubscription = async (subscription) => {
  const response = await fetch(
    "https://web-push-nodejs-vert.vercel.app/subscriptions",
    {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(subscription),
    }
  );

  return response.json();
};

self.addEventListener("activate", async (e) => {
  const subscription = await self.registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(
      "BMprvbHT5b76swB8U3k81vqyX_OUk51mFny-oL5oPVyaoRgmhG_O0J4TOjYrzOfOiRpPP6sZrkMLd7XVWsCzS5U"
    ),
  });

  const response = await saveSubscription(subscription);
  console.log(response);
});

self.addEventListener("push", (e) => {
  const notification = e.data?.json();

  self.registration.showNotification(notification.title, {
    body: notification.message,
  });
});
