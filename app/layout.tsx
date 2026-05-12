import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ballparklopedia — The Baseball Stadium Encyclopedia",
  description:
    "The encyclopedia of baseball stadiums. Stats, history, trip planning, and bucket lists for every MLB and minor league ballpark.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-gray-50 text-gray-900 antialiased`}>
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              {/* Baseball diamond SVG */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-5 h-5 flex-shrink-0"
                aria-hidden="true"
              >
                <path
                  d="M12 2L22 12L12 22L2 12Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <line
                  x1="12" y1="2" x2="12" y2="22"
                  stroke="currentColor" strokeWidth="1" strokeDasharray="2 2"
                />
                <line
                  x1="2" y1="12" x2="22" y2="12"
                  stroke="currentColor" strokeWidth="1" strokeDasharray="2 2"
                />
                <circle cx="12" cy="2.5" r="1.3" fill="currentColor" />
                <circle cx="21.5" cy="12" r="1.3" fill="currentColor" />
                <circle cx="12" cy="21.5" r="1.3" fill="currentColor" />
                <circle cx="2.5" cy="12" r="1.3" fill="currentColor" />
              </svg>
              <span className="text-lg tracking-tight">Ballparklopedia</span>
            </Link>
            <nav className="flex items-center gap-5 text-sm text-gray-500">
              <Link href="/browse" className="hover:text-gray-900 transition-colors">
                Browse
              </Link>
              <Link href="/aaa" className="hover:text-gray-900 transition-colors">
                AAA
              </Link>
              <Link href="/international" className="hover:text-gray-900 transition-colors">
                International
              </Link>
              <Link href="/" className="hover:text-gray-900 transition-colors">
                Map
              </Link>
              <Link href="/trip-planner" className="hover:text-gray-900 transition-colors">
                Trip Planner
              </Link>
              <Link
                href="/bucket-list"
                className="flex items-center gap-1.5 hover:text-amber-600 transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
                Bucket List
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-gray-100 mt-20 py-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-sm text-gray-400">
            <p className="font-semibold text-gray-600 mb-1">⚾ Ballparklopedia</p>
            <p>The encyclopedia of baseball stadiums — MLB, minor leagues, and beyond.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
