import MapSection from "@/components/MapSection";
import { stadiums, formerStadiums } from "@/lib/stadiums";
import { aaaStadiums } from "@/lib/aaaStadiums";

export default function HomePage() {
  const totalMLB = stadiums.length;
  const totalParks = stadiums.length + formerStadiums.length + aaaStadiums.length;

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

  const aaaMapData = aaaStadiums.map((s) => ({
    slug: s.slug,
    name: s.name,
    team: s.team,
    coordinates: s.coordinates,
    division: s.minorLeague,
    type: "aaa" as const,
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Hero */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
          Every Baseball Ballpark,<br className="sm:hidden" /> One Place
        </h1>
        <p className="text-gray-500 text-lg max-w-xl">
          The encyclopedia of baseball stadiums — stats, history, trip planning, and bucket lists across MLB, the minor leagues, and beyond.
        </p>

        {/* Quick stats */}
        <div className="mt-6 flex flex-wrap gap-3">
          <QuickStat label="MLB Parks" value={totalMLB.toString()} />
          <QuickStat label="AAA Parks" value={aaaStadiums.length.toString()} />
          <QuickStat label="Total Parks" value={totalParks.toString()} />
        </div>
      </div>

      {/* Interactive map with layer toggle */}
      <MapSection
        currentStadiums={currentMapData}
        formerStadiums={formerMapData}
        aaaStadiums={aaaMapData}
      />
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
