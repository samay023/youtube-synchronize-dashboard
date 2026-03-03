import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Youtube Video sync dashboard",
  description: "YouTube Video sync expirimental dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen w-screen`}>
        <nav className="flex items-center justify-between flex-wrap bg-white shadow-md border-b border-gray-200 p-6">
          <div className="flex items-center flex-shrink-0 text-gray-900 mr-6">
            <Link className="font-semibold text-xl tracking-tight" href="/">
              YouTube Sync Dashboard
            </Link>
          </div>

          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-md lg:flex-grow">
              <Link
                href="/channel"
                className="block mt-4 lg:inline-block lg:mt-0 text-blue-600 hover:text-blue-800 font-medium mr-4"
              >
                Add / View Channels
              </Link>
              <Link
                href="/videos/sync"
                className="block mt-4 lg:inline-block lg:mt-0 text-blue-600 hover:text-blue-800 font-medium mr-4"
              >
                Sync Videos
              </Link>
              <Link
                href="/videos"
                className="block mt-4 lg:inline-block lg:mt-0 text-blue-600 hover:text-blue-800 font-medium mr-4"
              >
                All Videos
              </Link>
            </div>
          </div>
        </nav>

        <div className="m-6">{children}</div>
      </body>
    </html>
  );
}
