import { youtubeService } from "@/services/youtube";
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

const extractVideoId = (value: string) => {
  const input = value.trim();
  if (!input) return "";

  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;

  try {
    const parsedUrl = new URL(input);
    const hostname = parsedUrl.hostname.toLowerCase();

    if (hostname.includes("youtube.com")) {
      const videoIdFromQuery = parsedUrl.searchParams.get("v") ?? "";
      if (/^[a-zA-Z0-9_-]{11}$/.test(videoIdFromQuery)) return videoIdFromQuery;
    }

    if (hostname === "youtu.be") {
      const videoIdFromPath =
        parsedUrl.pathname.replace("/", "").split("/")[0] ?? "";
      if (/^[a-zA-Z0-9_-]{11}$/.test(videoIdFromPath)) return videoIdFromPath;
    }
  } catch {
    return "";
  }

  return "";
};

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;

  const id = searchParams.get("id");
  if (id) {
    const video = await youtubeService.getVideo(id);

    if (!video?.id || !video?.snippet)
      return NextResponse.json({ message: "Video not found" }, { status: 404 });

    await prisma.youtubeVideo.upsert({
      where: {
        id: video.id,
      },
      create: {
        id: video.id,
        description: video.snippet.description ?? "",
        title: video.snippet.title ?? "",
        publishedAt: video.snippet.publishedAt ?? "",
        thumbnailUrl: video.snippet.thumbnails?.default?.url ?? "",
        channel: {
          connectOrCreate: {
            where: {
              id: video.snippet.channelId ?? "",
            },
            create: {
              id: video.snippet.channelId ?? "",
              author: video.snippet.channelTitle ?? "",
            },
          },
        },
      },
      update: {
        description: video.snippet.description ?? "",
        title: video.snippet.title ?? "",
        publishedAt: video.snippet.publishedAt ?? "",
        thumbnailUrl: video.snippet.thumbnails?.default?.url ?? "",
      },
    });
  }

  return NextResponse.json({ message: "Success" }, { status: 200 });
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const searchKey = formData.get("searchKey") ?? "";
  const channelId = formData.get("channelId") ?? "";
  const videoUrl = formData.get("videoUrl") ?? "";

  let effectiveChannelId = channelId.toString().trim();

  if (!effectiveChannelId && videoUrl.toString().trim()) {
    const videoId = extractVideoId(videoUrl.toString());
    if (!videoId) {
      return NextResponse.json(
        { message: "Invalid YouTube video URL/ID." },
        { status: 400 },
      );
    }

    const video = await youtubeService.getVideo(videoId);
    effectiveChannelId = video?.snippet?.channelId ?? "";

    if (!effectiveChannelId) {
      return NextResponse.json(
        { message: "Could not resolve channel from the provided video." },
        { status: 404 },
      );
    }
  }

  const searchResult = await youtubeService.searchVideos(
    searchKey.toString(),
    effectiveChannelId,
  );

  const operations = searchResult.flatMap((video) => {
    if (!video?.id?.videoId) return [];

    return [
      prisma.youtubeVideo.upsert({
        where: {
          id: video.id.videoId,
        },
        create: {
          id: video.id.videoId,
          description: video.snippet?.description ?? "",
          title: video.snippet?.title ?? "",
          publishedAt: video.snippet?.publishedAt ?? "",
          thumbnailUrl: video.snippet?.thumbnails?.high?.url ?? "",
          channel: {
            connectOrCreate: {
              where: {
                id: video.snippet?.channelId ?? "",
              },
              create: {
                id: video.snippet?.channelId ?? "",
                author: video.snippet?.channelTitle ?? "",
              },
            },
          },
        },
        update: {
          description: video.snippet?.description ?? "",
          publishedAt: video.snippet?.publishedAt ?? "",
          thumbnailUrl: video.snippet?.thumbnails?.default?.url ?? "",
          title: video.snippet?.title ?? "",
        },
      }),
    ];
  });

  await prisma.$transaction(operations);
  return NextResponse.json({ videos: searchResult }, { status: 200 });
}
