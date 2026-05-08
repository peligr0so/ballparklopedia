import MapLoader from "@/components/MapLoader";
import { stadiums } from "@/lib/stadiums";

export default function HomePage() {
  const totalCapacity = stadiums.reduce((sum, s) => sum + s.capacity, 0);
  const oldest = stadiums.reduce((a, b) => (a.yearOpened < b.yearOpened ? a : b));
  const newest = stadiums.reduce((a, b) => (a.yearOpened > b.yearOpened ? a : b));

  const mapStadiums = stadiums.map((s) => ({
    slug: s.slug,
    name: s.name,
    team: s.team,
    coordinates: s.coordinates,
    division: s.division,
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Hero */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
          Every MLB Ballpark,<br className="sm:hidden" /> in One Place
        </h1>
        <p className="text-gray-500 text-lg max-w-xl">
          Stats, trip planning, and bucket lists for every Major League Baseball stadium.
        </p>

        {/* Quick stats */}
        <div className="mt-6 flex flex-wrap gap-3">
          <QuickStat label="Stadiums" value={stadiums.length.toString()} />
          <QuickStat label="Total Capacity" value={totalCapacity.toLocaleString()} />
          <QuickStat
            label="Oldest Park"
            value={`${oldest.name.split(" ")[0]} (${oldest.yearOpened})`}
          />
          <QuickStat
            label="Newest Park"
            value={`${newest.name.split(" ")[0]} (${newest.yearOpened})`}
          />
        </div>
      </div>

      {/* Interactive map */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            All 30 MLB Stadiums
          </h2>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {DIVISION_LEGEND.map((d) => (
              <span key={d.label} className="flex items-center gap-1 text-xs text-gray-500">
                <span
                  className="inline-block w-2.5 h-2.5 rounded-full"
                  style={{ background: d.color }}
                />
                {d.label}
              </span>
            ))}
          </div>
        </div>
        <MapLoader stadiums={mapStadiums} />
        <p className="text-xs text-gray-400 mt-2">
          Click any marker to see stadium details.
        </p>
      </div>
    </div>
  );
}

const DIVISION_LEGEND = [
  { label: "AL East", color: "#1d4ed8" },
  { label: "AL Central", color: "#dc2626" },
  { label: "AL West", color: "#16a34a" },
  { label: "NL East", color: "#7c3aed" },
  { label: "NL Central", color: "#d97706" },
  { label: "NL West", color: "#0891b2" },
];

function QuickStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl px-4 py-2.5">
      <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-gray-800">{value}</p>
    </div>
  );
}
