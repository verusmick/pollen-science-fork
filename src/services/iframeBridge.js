let iframeWindow = null;
let isReady = false;
let messageQueue = [];

export function registerIframe(win) {
  iframeWindow = win;
}

export function initIframeListener(expectedOrigin = null) {
  window.addEventListener("message", (event) => {
    if (expectedOrigin && event.origin !== expectedOrigin) {
      return;
    }

    const data = event.data;
    if (!data || !data.type) return;

    if (data.type === "READY") {
      isReady = true;

      messageQueue.forEach((msg) => {
        iframeWindow?.postMessage(msg, "*");
      });

      messageQueue = [];
      return;
    }
  });
}

// Send message to iframe
export function sendToIframe(message) {
  if (!iframeWindow) return;

  if (!isReady) {
    messageQueue.push(message);
    return;
  }

  iframeWindow.postMessage(message, "*");
}
