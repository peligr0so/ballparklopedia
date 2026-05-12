import Link from "next/link";
import { allStadiums, Stadium } from "@/lib/stadiums";
import { ilStadiums, pclStadiums, type AAAStadium } from "@/lib/aaaStadiums";
import {
  FRANCHISES,
  DIVISION_ORDER,
  getFranchiseId,
  type FranchiseId,
  type Franchise,
} from "@/lib/franchises";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Ballparks — Ballparklopedia",
  description: "Browse all MLB and AAA ballparks — current stadiums and every historic venue, organized by franchise lineage and league.",
};

const DIVISION_DOT: Record<string, string> = {
  "AL East": "#1d4ed8",
  "AL Central": "#dc2626",
  "AL West": "#16a34a",
  "NL East": "#7c3aed",
  "NL Central": "#d97706",
  "NL West": "#0891b2",
};

function buildGroups() {
  // Group all stadiums by franchise ID
  const byFranchise = new Map<FranchiseId, Stadium[]>();
  for (const s of allStadiums) {
    const fid = getFranchiseId(s.team);
    const list = byFranchise.get(fid) ?? [];
    list.push(s);
    byFranchise.set(fid, list);
  }

  // Organize into division buckets using the franchise's CURRENT division
  return DIVISION_ORDER.map((division) => {
    const franchisesInDivision = Object.values(FRANCHISES)
      .filter((f) => f.division === division)
      .sort((a, b) => a.currentName.localeCompare(b.currentName));

    const rows = franchisesInDivision.map((franchise) => {
      const stadiumList = byFranchise.get(franchise.id) ?? [];
      const active = stadiumList
        .filter((s) => s.status !== "former")
        .sort((a, b) => a.yearOpened - b.yearOpened);
      const former = stadiumList
        .filter((s) => s.status === "former")
        .sort((a, b) => a.yearOpened - b.yearOpened);
      return { franchise, active, former };
    });

    return { division, rows };
  });
}

export default function BrowsePage() {
  const groups = buildGroups();
  const alGroups = groups.slice(0, 3);
  const nlGroups = groups.slice(3);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
          Browse Ballparks
        </h1>
        <p className="text-gray-500">
          MLB franchises and AAA parks — current stadiums, historic venues, and all 30 Triple-A ballparks.
        </p>
      </div>

      {/* MLB section header */}
      <div className="mb-8">
        <h2 className="text-sm font-bold text-gray-800 mb-1">Major League Baseball</h2>
        <p className="text-xs text-gray-400">
          All 30 franchises — current and historic venues, organized by franchise lineage.
        </p>
      </div>

      <LeagueSection title="American League" groups={alGroups} />
      <LeagueSection title="National League" groups={nlGroups} />

      {/* Divider */}
      <div className="border-t border-gray-100 my-12" />

      {/* AAA section */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-gray-800 mb-1">Triple-A (AAA)</h2>
            <p className="text-xs text-gray-400">
              All 30 AAA ballparks by league. Affiliations change annually.
            </p>
          </div>
          <Link
            href="/aaa"
            className="text-xs text-green-700 hover:text-green-900 font-medium transition-colors"
          >
            View full AAA page →
          </Link>
        </div>
      </div>

      <AAALeagueSection title="International League" stadiums={ilStadiums} dotColor="#16a34a" />
      <AAALeagueSection title="Pacific Coast League" stadiums={pclStadiums} dotColor="#0891b2" />
    </div>
  );
}

function LeagueSection({
  title,
  groups,
}: {
  title: string;
  groups: ReturnType<typeof buildGroups>;
}) {
  return (
    <div className="mb-14">
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
        {title}
      </h2>
      <div className="space-y-10">
        {groups.map(({ division, rows }) => (
          <div key={division}>
            <h3 className="text-sm font-semibold text-gray-500 mb-4 flex items-center gap-2">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ background: DIVISION_DOT[division] }}
              />
              {division}
            </h3>
            <div className="space-y-3">
              {rows.map(({ franchise, active, former }) => (
                <FranchiseRow
                  key={franchise.id}
                  franchise={franchise}
                  active={active}
                  former={former}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FranchiseRow({
  franchise,
  active,
  former,
}: {
  franchise: Franchise;
  active: Stadium[];
  former: Stadium[];
}) {
  const accentColor = active[0]?.imageColor ?? "bg-gray-400";
  const hasFormer = former.length > 0;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
      {/* Franchise header */}
      <div className="flex items-start gap-3 px-5 py-3 border-b border-gray-50">
        <div className={`w-1 h-5 rounded-full ${accentColor} flex-shrink-0 mt-0.5`} />
        <div className="min-w-0">
          <p className="font-semibold text-gray-900 text-sm">{franchise.currentName}</p>
          {franchise.note && (
            <p className="text-xs text-gray-400 mt-0.5">{franchise.note}</p>
          )}
        </div>
      </div>

      {/* Active stadiums */}
      {active.map((s) => (
        <StadiumRow key={s.slug} stadium={s} variant="active" />
      ))}

      {/* Former stadiums */}
      {hasFormer && (
        <>
          <div className="px-5 py-1.5 bg-gray-50 border-t border-gray-50">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Former</p>
          </div>
          {former.map((s) => (
            <StadiumRow key={s.slug} stadium={s} variant="former" />
          ))}
        </>
      )}
    </div>
  );
}

function StadiumRow({
  stadium,
  variant,
}: {
  stadium: Stadium;
  variant: "active" | "former";
}) {
  const years =
    variant === "former"
      ? `${stadium.yearOpened}–${stadium.yearClosed ?? "?"}`
      : `${stadium.yearOpened}–present`;

  return (
    <Link
      href={`/mlb/${stadium.slug}`}
      className="flex items-center gap-4 px-5 py-3 border-t border-gray-50 hover:bg-gray-50 transition-colors group"
    >
      <span
        className={`w-2 h-2 rounded-full flex-shrink-0 ${
          variant === "active" ? "bg-green-400" : "bg-gray-300"
        }`}
      />
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium truncate group-hover:text-blue-600 transition-colors ${
            variant === "former" ? "text-gray-500" : "text-gray-900"
          }`}
        >
          {stadium.name}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">
          {stadium.city}, {stadium.state} · {years}
        </p>
      </div>
      <div className="text-right flex-shrink-0 hidden sm:block">
        <p className="text-xs font-medium text-gray-600">
          {stadium.capacity.toLocaleString()}
        </p>
        <p className="text-xs text-gray-400">capacity</p>
      </div>
      <svg
        className="w-4 h-4 text-gray-300 group-hover:text-blue-400 transition-colors flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}

function AAALeagueSection({
  title,
  stadiums,
  dotColor,
}: {
  title: string;
  stadiums: AAAStadium[];
  dotColor: string;
}) {
  return (
    <div className="mb-10">
      <h3 className="text-sm font-semibold text-gray-500 mb-4 flex items-center gap-2">
        <span
          className="inline-block w-2 h-2 rounded-full"
          style={{ background: dotColor }}
        />
        {title}
      </h3>
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        {stadiums.map((s, i) => (
          <Link
            key={s.slug}
            href={`/aaa/${s.slug}`}
            className={`flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition-colors group ${
              i > 0 ? "border-t border-gray-50" : ""
            }`}
          >
            <span className="w-2 h-2 rounded-full flex-shrink-0 bg-green-400" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate group-hover:text-green-700 transition-colors">
                {s.name}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {s.team} · {s.city}, {s.state} · {s.yearOpened}–present
              </p>
              <p className="text-xs text-gray-400 mt-0.5 truncate">{s.mlbAffiliate}</p>
            </div>
            <div className="text-right flex-shrink-0 hidden sm:block">
              <p className="text-xs font-medium text-gray-600">
                {s.capacity.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400">capacity</p>
            </div>
            <svg
              className="w-4 h-4 text-gray-300 group-hover:text-green-400 transition-colors flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}
