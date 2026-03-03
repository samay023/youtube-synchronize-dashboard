"use client";
import { Formik, Form, Field } from "formik";
import type { youtube_v3 } from "googleapis/build/src/apis/youtube/v3";

interface Props {
  setVideos: (videos: youtube_v3.Schema$SearchResult[]) => void;
}

export default function SyncForm({ setVideos }: Props) {
  return (
    <Formik
      enableReinitialize
      initialValues={{
        searchKey: "",
        channelId: "",
        videoUrl: "",
      }}
      onSubmit={async (values) => {
        const formData = new FormData();
        formData.append("searchKey", values.searchKey);
        formData.append("channelId", values.channelId);
        formData.append("videoUrl", values.videoUrl);

        const result = await fetch("/videos/sync/search-and-sync/", {
          method: "POST",
          body: formData,
        });
        const data = await result.json();

        if (data?.videos) setVideos(data.videos);
      }}
    >
      {({ handleReset }) => (
        <Form className="mt-6 flex flex-col w-full max-w-lg bg-white border-2 border-gray-200 rounded-lg shadow-md p-6">
          <div className="flex flex-wrap mx-3 mb-6">
            <label
              className="block text-blue-700 text-sm font-semibold mb-2"
              htmlFor="searchKey"
            >
              Search Keyword
            </label>
            <Field
              className="appearance-none block w-full bg-white text-gray-900 border-2 border-gray-300 rounded-lg py-3 px-4 mb-4 leading-tight focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              id="searchKey"
              name="searchKey"
              type="text"
              placeholder="Enter search keyword"
            />
            <label
              className="block text-blue-700 text-sm font-semibold mb-2"
              htmlFor="channelId"
            >
              Channel ID
            </label>
            <Field
              className="appearance-none block w-full bg-white text-gray-900 border-2 border-gray-300 rounded-lg py-3 px-4 mb-4 leading-tight focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              id="channelId"
              name="channelId"
              type="text"
              placeholder="Enter channel ID"
            />
            <label
              className="block text-blue-700 text-sm font-semibold mb-2"
              htmlFor="videoUrl"
            >
              YouTube Video URL / Video ID (Optional)
            </label>
            <Field
              className="appearance-none block w-full bg-white text-gray-900 border-2 border-gray-300 rounded-lg py-3 px-4 mb-4 leading-tight focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              id="videoUrl"
              name="videoUrl"
              type="text"
              placeholder="https://www.youtube.com/watch?v=..."
            />

            <div className="w-full flex flex-row mt-4 gap-x-4">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold cursor-pointer rounded-lg w-40 py-2 px-4 transition-colors shadow-md hover:shadow-lg"
                type="submit"
              >
                Search
              </button>
              <button
                className="bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm font-semibold cursor-pointer rounded-lg w-40 py-2 px-4 transition-colors"
                type="button"
                onClick={handleReset}
              >
                Cancel
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
