import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ballparklopedia — MLB Stadium Directory",
  description:
    "Your complete guide to every MLB stadium. Stats, trip planning, and bucket lists for baseball fans.",
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
              <span className="text-xl">⚾</span>
              <span className="text-lg tracking-tight">Ballparklopedia</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm text-gray-500">
              <Link href="/" className="hover:text-gray-900 transition-colors">
                MLB
              </Link>
              <Link
                href="/?bucket=1"
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
            <p>A fan&apos;s guide to every MLB ballpark. Plan your stadium tour.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
