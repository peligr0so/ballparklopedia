import Link from "next/link";
import { allStadiums, Stadium } from "@/lib/stadiums";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Ballparks — Ballparklopedia",
  description: "Browse all 30 MLB stadiums organized by franchise, with current and historic venues.",
};

// Ordered as AL then NL, within each by East/Central/West
const divisionOrder = [
  "AL East", "AL Central", "AL West",
  "NL East", "NL Central", "NL West",
] as const;

function buildGroups() {
  return divisionOrder.map((division) => {
    const divStadiums = allStadiums.filter((s) => s.division === division);
    const teamNames = [...new Set(divStadiums.map((s) => s.team))].sort();

    const franchises = teamNames.map((team) => {
      const ts = divStadiums.filter((s) => s.team === team);
      return {
        team,
        active: ts.filter((s) => s.status !== "former"),
        former: ts.filter((s) => s.status === "former"),
      };
    });

    return { division, franchises };
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
          All 30 MLB franchises — current stadiums and historic venues.
        </p>
      </div>

      <LeagueSection title="American League" groups={alGroups} />
      <LeagueSection title="National League" groups={nlGroups} />
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
        {groups.map(({ division, franchises }) => (
          <div key={division}>
            <h3 className="text-sm font-semibold text-gray-500 mb-4 flex items-center gap-2">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ background: DIVISION_DOT[division] }}
              />
              {division}
            </h3>
            <div className="space-y-3">
              {franchises.map(({ team, active, former }) => (
                <FranchiseRow
                  key={team}
                  team={team}
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

const DIVISION_DOT: Record<string, string> = {
  "AL East": "#1d4ed8",
  "AL Central": "#dc2626",
  "AL West": "#16a34a",
  "NL East": "#7c3aed",
  "NL Central": "#d97706",
  "NL West": "#0891b2",
};

function FranchiseRow({
  team,
  active,
  former,
}: {
  team: string;
  active: Stadium[];
  former: Stadium[];
}) {
  const teamColor = active[0]?.imageColor ?? "bg-gray-400";
  const hasFormer = former.length > 0;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
      {/* Franchise header */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-50">
        <div className={`w-1 h-5 rounded-full ${teamColor} flex-shrink-0`} />
        <p className="font-semibold text-gray-900 text-sm">{team}</p>
      </div>

      {/* Active stadiums */}
      {active.map((s) => (
        <StadiumRow key={s.slug} stadium={s} variant="active" />
      ))}

      {/* Former stadiums */}
      {hasFormer && (
        <>
          <div className="px-5 py-1.5 bg-gray-50 border-t border-gray-50">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
              Former
            </p>
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
      {/* Status dot */}
      <span
        className={`w-2 h-2 rounded-full flex-shrink-0 ${
          variant === "active" ? "bg-green-400" : "bg-gray-300"
        }`}
      />

      {/* Name + meta */}
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

      {/* Capacity */}
      <div className="text-right flex-shrink-0 hidden sm:block">
        <p className="text-xs font-medium text-gray-600">
          {stadium.capacity.toLocaleString()}
        </p>
        <p className="text-xs text-gray-400">capacity</p>
      </div>

      {/* Arrow */}
      <svg
        className="w-4 h-4 text-gray-300 group-hover:text-blue-400 transition-colors flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </Link>
  );
}
