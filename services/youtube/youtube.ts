import { youtube_v3 } from "googleapis";

export const youtubeService = {
  getVideo: async (id: string) => {
    if (!process.env.YT_API_KEY) throw new Error("Missing YT_API_KEY");

    const result = await new youtube_v3.Youtube({
      key: process.env.YT_API_KEY,
    }).videos.list({
      id: [id],
      part: ["snippet"],
      key: process.env.YT_API_KEY,
    });

    return result.data.items?.[0];
  },

  searchVideos: async (searchKey: string, channelId?: string) => {
    if (!process.env.YT_API_KEY) throw new Error("Missing YT_API_KEY");

    const normalizedSearchKey = searchKey.trim();
    const normalizedChannelId = channelId?.trim();

    const result = await new youtube_v3.Youtube({}).search.list({
      ...(normalizedSearchKey ? { q: normalizedSearchKey } : {}),
      ...(normalizedChannelId ? { channelId: normalizedChannelId } : {}),
      type: ["video"],
      order: "date",
      part: ["snippet"],
      maxResults: 10,
      key: process.env.YT_API_KEY,
    });

    return result.data?.items ?? [];
  },
};
