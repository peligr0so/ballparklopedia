import Link from "next/link";
import {
  npbCentralStadiums,
  npbPacificStadiums,
  kboStadiums,
  countrySlug,
  type InternationalStadium,
} from "@/lib/internationalStadiums";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "International Ballparks — Ballparklopedia",
  description:
    "Top-level professional baseball stadiums in Japan (NPB) and South Korea (KBO).",
};

export default function InternationalPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
          International Ballparks
        </h1>
        <p className="text-gray-500">
          Top-level professional stadiums across Japan and South Korea —{" "}
          {npbCentralStadiums.length + npbPacificStadiums.length} NPB parks and{" "}
          {kboStadiums.length} KBO parks.
        </p>
      </div>

      {/* Japan */}
      <div className="mb-14">
        <h2 className="text-sm font-bold text-gray-800 mb-1 flex items-center gap-2">
          <span className="text-base">🇯🇵</span> Japan · Nippon Professional Baseball
        </h2>
        <p className="text-xs text-gray-400 mb-6">
          12 teams across two leagues — Central and Pacific.
        </p>

        <LeagueSection
          title="Central League"
          stadiums={npbCentralStadiums}
          dotColor="#f97316"
        />
        <LeagueSection
          title="Pacific League"
          stadiums={npbPacificStadiums}
          dotColor="#f97316"
        />
      </div>

      {/* South Korea */}
      <div className="mb-14">
        <h2 className="text-sm font-bold text-gray-800 mb-1 flex items-center gap-2">
          <span className="text-base">🇰🇷</span> South Korea · Korea Baseball Organization
        </h2>
        <p className="text-xs text-gray-400 mb-6">
          10 teams in a single league. Jamsil Stadium is shared by the LG Twins and Doosan Bears.
        </p>

        <LeagueSection
          title="KBO"
          stadiums={kboStadiums}
          dotColor="#8b5cf6"
        />
      </div>
    </div>
  );
}

function LeagueSection({
  title,
  stadiums,
  dotColor,
}: {
  title: string;
  stadiums: InternationalStadium[];
  dotColor: string;
}) {
  return (
    <div className="mb-10">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
        <span
          className="inline-block w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: dotColor }}
        />
        {title}
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {stadiums.map((s) => (
          <StadiumCard key={s.slug} stadium={s} />
        ))}
      </div>
    </div>
  );
}

function StadiumCard({ stadium }: { stadium: InternationalStadium }) {
  const href = `/international/${countrySlug[stadium.country]}/${stadium.slug}`;
  return (
    <Link
      href={href}
      className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-gray-200 hover:shadow-sm transition-all group"
    >
      <div className="flex items-start gap-3">
        <div className={`w-1 self-stretch rounded-full flex-shrink-0 ${stadium.imageColor}`} />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 text-sm group-hover:text-orange-600 transition-colors">
            {stadium.name}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">{stadium.nameLocal}</p>
          <p className="text-xs text-gray-500 mt-1">{stadium.team}</p>
          <p className="text-xs text-gray-400 mt-0.5">{stadium.city}</p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
            <Stat label="Capacity" value={stadium.capacity.toLocaleString()} />
            <Stat label="Opened" value={stadium.yearOpened.toString()} />
          </div>
        </div>
        <svg
          className="w-4 h-4 text-gray-300 group-hover:text-orange-400 transition-colors flex-shrink-0 mt-0.5"
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
