import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trip Planner — Ballparklopedia",
  description: "Plan a multi-city baseball road trip across MLB stadiums.",
};

export default function TripPlannerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
      <div className="text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 mb-6">
          <svg
            className="w-8 h-8 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
          Trip Planner
        </h1>
        <p className="text-gray-500 text-lg max-w-md mx-auto mb-3">
          Plan a multi-stadium baseball road trip — coming soon.
        </p>
        <p className="text-gray-400 text-sm max-w-sm mx-auto mb-10">
          Build a route, estimate drive times, and get hotel recommendations
          for a full baseball tour of the country.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/browse"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            Browse Stadiums
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white border border-gray-200 text-gray-700 text-sm font-medium hover:border-gray-300 transition-colors"
          >
            View Map
          </Link>
        </div>
      </div>

      {/* Teaser cards */}
      <div className="mt-16 grid sm:grid-cols-3 gap-4">
        {[
          {
            title: "Build a Route",
            body: "Select stadiums and get an optimized driving route between them.",
          },
          {
            title: "Estimate Costs",
            body: "Rough estimates for tickets, hotels, gas, and food per stop.",
          },
          {
            title: "Share Your Trip",
            body: "Export or share your bucket-list road trip with other fans.",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="bg-white border border-gray-100 rounded-2xl p-5 opacity-60"
          >
            <p className="font-semibold text-gray-800 text-sm mb-1">{card.title}</p>
            <p className="text-xs text-gray-500 leading-relaxed">{card.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
