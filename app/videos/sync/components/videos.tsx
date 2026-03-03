import type { youtube_v3 } from "googleapis/build/src/apis/youtube/v3";
import Link from "next/link";
import Image from "next/image";

interface Props {
  videos: youtube_v3.Schema$SearchResult[];
}

export default function Videos({ videos }: Props) {
  if (!videos.length)
    return (
      <div className="mt-4 text-3xl text-black">No videos found and synced</div>
    );

  return (
    <div className="mt-8">
      <div className="flex flex-row flex-wrap max-w-6xl gap-6">
        {videos.map((video) => (
          <Link
            key={video.id?.videoId}
            className="w-[300px] rounded-lg overflow-hidden shadow-lg border-2 border-gray-200 cursor-pointer hover:bg-blue-50 hover:border-blue-300 hover:shadow-2xl transition-all duration-200 max-h-96 bg-white"
            href={`/videos/${video.id?.videoId}`}
          >
            <div className="overflow-hidden">
              <Image
                className="w-full hover:scale-105 transition-transform duration-300"
                width={480}
                height={360}
                src={video.snippet?.thumbnails?.high?.url ?? ""}
                alt=""
              />
            </div>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 text-black">
                {video.snippet?.title ?? ""}
              </div>
              <p
                className="text-gray-700 text-ellipsis overflow-hidden text-sm"
                title={video.snippet?.description ?? ""}
              >
                {video.snippet?.description ?? ""}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
