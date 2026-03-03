import prisma from "@/prisma/client";
import ResyncButton from "./components/resync-button";

const getAllExistingChannels = () => {
  return prisma.youtubeChannel.findMany({});
};

export default async function Channel() {
  const channels = await getAllExistingChannels();
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-6 text-black">Channels</h1>
      <table className="table-auto shadow-lg w-full text-sm text-left border-collapse">
        <thead className="text-sm text-black font-semibold bg-blue-100">
          <tr>
            <th className="px-6 py-4 border-b-2 border-gray-300">Id</th>
            <th className="px-6 py-4 border-b-2 border-gray-300">Author</th>
            <th className="px-6 py-4 border-b-2 border-gray-300">
              Resync from Google Pubsubhubub
            </th>
          </tr>
        </thead>
        <tbody>
          {channels.map((channel, index) => (
            <tr
              key={channel.id}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-blue-50"
              } hover:bg-blue-100 transition-colors`}
            >
              <td className="px-6 py-4 border-b border-gray-200 text-black">
                {channel.id}
              </td>
              <td className="px-6 py-4 border-b border-gray-200 text-black">
                {channel.author}
              </td>
              <td className="px-6 py-4 border-b border-gray-200">
                <ResyncButton id={channel.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
