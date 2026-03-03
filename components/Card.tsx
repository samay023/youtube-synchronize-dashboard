import Image from "next/image";
import Link from "next/link";

interface Props {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export default function Card({ id, title, description, imageUrl }: Props) {
  return (
    <Link
      className="w-56 rounded-lg overflow-hidden shadow-lg border-2 border-gray-200 cursor-pointer hover:bg-blue-50 hover:border-blue-300 hover:shadow-2xl transition-all duration-200 max-h-96 bg-white"
      href={`/videos/${id}`}
    >
      <div className="overflow-hidden">
        <Image
          className="w-full h-36 hover:scale-105 transition-transform duration-300"
          width={480}
          height={360}
          src={imageUrl}
          alt=""
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-black">{title}</div>
        <p
          className="text-gray-700 text-ellipsis overflow-hidden text-sm"
          title={description}
        >
          {description}
        </p>
      </div>
    </Link>
  );
}
