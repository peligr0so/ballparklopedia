import Link from "next/link";
import { Stadium } from "@/lib/stadiums";
import BucketListButton from "./BucketListButton";

interface Props {
  stadium: Stadium;
}

const divisionColors: Record<string, string> = {
  "AL East": "bg-blue-50 text-blue-700",
  "AL Central": "bg-sky-50 text-sky-700",
  "AL West": "bg-indigo-50 text-indigo-700",
  "NL East": "bg-rose-50 text-rose-700",
  "NL Central": "bg-orange-50 text-orange-700",
  "NL West": "bg-violet-50 text-violet-700",
};

export default function StadiumCard({ stadium }: Props) {
  return (
    <Link href={`/mlb/${stadium.slug}`} className="group block">
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-200">
        {/* Color band header */}
        <div className={`h-2 w-full ${stadium.imageColor}`} />

        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-gray-900 text-base leading-snug group-hover:text-blue-600 transition-colors truncate">
                {stadium.name}
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">{stadium.team}</p>
            </div>
            <BucketListButton slug={stadium.slug} stadiumName={stadium.name} />
          </div>

          <div className="flex items-center gap-1.5 mb-4">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${divisionColors[stadium.division]}`}>
              {stadium.division}
            </span>
            <span className="text-xs text-gray-400">{stadium.city}, {stadium.state}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <Stat label="Capacity" value={stadium.capacity.toLocaleString()} />
            <Stat label="Opened" value={stadium.yearOpened.toString()} />
            <Stat label="Surface" value={stadium.surface} />
            <Stat label="Roof" value={stadium.roofType} />
          </div>
        </div>
      </div>
    </Link>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">{label}</p>
      <p className="text-gray-700 font-medium text-xs">{value}</p>
    </div>
  );
}
