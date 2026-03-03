export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  p-10 gap-y-3">
      <p className="text-black">Welcome to YT sync dashboard</p>
      <p className="text-black">
        To get started, click on Sync Videos and search for a video
      </p>
      <p className="text-black">
        This will then sync the video into the db for future use
      </p>
      <p className="text-black">
        You can also force any of the channels that were added part of the sync
        to use
        <a
          href="https://pubsubhubbub.appspot.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 font-medium ml-1"
        >
          GooglePubSubHubBub
        </a>
        push
      </p>
      <p className="text-black">
        it calls a webhook thats part of this server and syncs all the public
        videos under the channel
      </p>
    </main>
  );
}
