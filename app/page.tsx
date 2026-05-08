import SearchAndFilter from "@/components/SearchAndFilter";
import { stadiums } from "@/lib/stadiums";

export default function HomePage() {
  const totalCapacity = stadiums.reduce((sum, s) => sum + s.capacity, 0);
  const oldest = stadiums.reduce((a, b) => (a.yearOpened < b.yearOpened ? a : b));
  const newest = stadiums.reduce((a, b) => (a.yearOpened > b.yearOpened ? a : b));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Hero */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
          Every MLB Ballpark,<br className="sm:hidden" /> in One Place
        </h1>
        <p className="text-gray-500 text-lg max-w-xl">
          Stats, trip planning, and bucket lists for every Major League Baseball stadium.
        </p>

        {/* Quick stats bar */}
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

      <SearchAndFilter />
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
