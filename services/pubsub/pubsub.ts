const normalizeCallbackBaseUrl = (url: string) => {
  const trimmed = url.trim();
  if (!trimmed) throw new Error("Missing NGROK_URL");

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  return `https://${trimmed}`;
};

const toHubResult = async (response: Response) => {
  const body = await response.text();
  return {
    ok: response.ok,
    status: response.status,
    body,
  };
};

export const pubsubService = {
  subscribeToChannel: async (channelId: string) => {
    const callbackBaseUrl = normalizeCallbackBaseUrl(
      process.env.NGROK_URL ?? "",
    );

    const response = await fetch(
      new URL("https://pubsubhubbub.appspot.com/subscribe"),
      {
        method: "POST",
        body: new URLSearchParams({
          "hub.callback": `${callbackBaseUrl}/webhooks/youtube-pub-sub`,
          "hub.topic": `https://www.youtube.com/xml/feeds/videos.xml?channel_id=${channelId}`,
          "hub.verify": "sync",
          "hub.mode": "subscribe",
        }),
      },
    );

    return toHubResult(response);
  },

  forcePublish: async (channelId: string) => {
    const response = await fetch(
      new URL("https://pubsubhubbub.appspot.com/publish"),
      {
        method: "POST",
        body: new URLSearchParams({
          "hub.url": `https://www.youtube.com/xml/feeds/videos.xml?channel_id=${channelId}`,
          "hub.mode": "publish",
        }),
      },
    );

    return toHubResult(response);
  },
};
