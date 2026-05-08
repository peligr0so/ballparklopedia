import MapSection from "@/components/MapSection";
import { stadiums, formerStadiums } from "@/lib/stadiums";

export default function HomePage() {
  const totalCapacity = stadiums.reduce((sum, s) => sum + s.capacity, 0);
  const oldest = stadiums.reduce((a, b) => (a.yearOpened < b.yearOpened ? a : b));
  const newest = stadiums.reduce((a, b) => (a.yearOpened > b.yearOpened ? a : b));

  const currentMapData = stadiums.map((s) => ({
    slug: s.slug,
    name: s.name,
    team: s.team,
    coordinates: s.coordinates,
    division: s.division,
    status: "active" as const,
  }));

  const formerMapData = formerStadiums.map((s) => ({
    slug: s.slug,
    name: s.name,
    team: s.team,
    coordinates: s.coordinates,
    division: s.division,
    status: "former" as const,
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Hero */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
          Every MLB Ballpark,<br className="sm:hidden" /> in One Place
        </h1>
        <p className="text-gray-500 text-lg max-w-xl">
          Stats, trip planning, and bucket lists for every Major League Baseball stadium — past and present.
        </p>

        {/* Quick stats */}
        <div className="mt-6 flex flex-wrap gap-3">
          <QuickStat label="Active Stadiums" value={stadiums.length.toString()} />
          <QuickStat label="Former Stadiums" value={formerStadiums.length.toString()} />
          <QuickStat label="Total Capacity" value={totalCapacity.toLocaleString()} />
          <QuickStat
            label="Oldest Active Park"
            value={`${oldest.name.split(" ")[0]} (${oldest.yearOpened})`}
          />
          <QuickStat
            label="Newest Active Park"
            value={`${newest.name.split(" ")[0]} (${newest.yearOpened})`}
          />
        </div>
      </div>

      {/* Interactive map with layer toggle */}
      <MapSection currentStadiums={currentMapData} formerStadiums={formerMapData} />
    </div>
  );
}

function QuickStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl px-4 py-2.5">
      <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-gray-800">{value}</p>
    </div>
  );
}
