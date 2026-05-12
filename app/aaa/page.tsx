import Link from "next/link";
import { ilStadiums, pclStadiums, type AAAStadium } from "@/lib/aaaStadiums";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AAA Ballparks — Ballparklopedia",
  description:
    "All 30 Triple-A ballparks organized by league — International League and Pacific Coast League.",
};

export default function AAAPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
          AAA Ballparks
        </h1>
        <p className="text-gray-500">
          All 30 Triple-A stadiums — {ilStadiums.length} International League parks and{" "}
          {pclStadiums.length} Pacific Coast League parks.
        </p>
        <p className="text-xs text-gray-400 mt-1">
          MLB affiliate relationships change annually. Affiliations shown reflect the current season.
        </p>
      </div>

      <LeagueSection
        title="International League"
        abbr="IL"
        stadiums={ilStadiums}
        dotColor="#16a34a"
      />
      <LeagueSection
        title="Pacific Coast League"
        abbr="PCL"
        stadiums={pclStadiums}
        dotColor="#0891b2"
      />
    </div>
  );
}

function LeagueSection({
  title,
  abbr,
  stadiums,
  dotColor,
}: {
  title: string;
  abbr: string;
  stadiums: AAAStadium[];
  dotColor: string;
}) {
  return (
    <div className="mb-14">
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
        <span
          className="inline-block w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: dotColor }}
        />
        {title}
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {stadiums.map((s) => (
          <StadiumCard key={s.slug} stadium={s} />
        ))}
      </div>
    </div>
  );
}

function StadiumCard({ stadium }: { stadium: AAAStadium }) {
  return (
    <Link
      href={`/aaa/${stadium.slug}`}
      className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-gray-200 hover:shadow-sm transition-all group"
    >
      <div className="flex items-start gap-3">
        <div className={`w-1 self-stretch rounded-full flex-shrink-0 ${stadium.imageColor}`} />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 text-sm group-hover:text-green-700 transition-colors truncate">
            {stadium.name}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">{stadium.team}</p>
          <p className="text-xs text-gray-400 mt-0.5">
            {stadium.city}, {stadium.state}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
            <Stat label="Capacity" value={stadium.capacity.toLocaleString()} />
            <Stat label="Opened" value={stadium.yearOpened.toString()} />
          </div>
          <p className="mt-2 text-xs text-gray-400 truncate">{stadium.mlbAffiliate}</p>
        </div>
        <svg
          className="w-4 h-4 text-gray-300 group-hover:text-green-500 transition-colors flex-shrink-0 mt-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <span className="text-xs text-gray-500">
      <span className="text-gray-400">{label}: </span>
      {value}
    </span>
  );
}
