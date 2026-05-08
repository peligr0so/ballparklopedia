import { notFound } from "next/navigation";
import Link from "next/link";
import { getStadiumBySlug, getAllSlugs, Stadium } from "@/lib/stadiums";
import BucketListButton from "@/components/BucketListButton";
export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/mlb/[slug]">) {
  const { slug } = await params;
  const stadium = getStadiumBySlug(slug);
  if (!stadium) return { title: "Not Found" };
  return {
    title: `${stadium.name} — Ballparklopedia`,
    description: stadium.description,
  };
}

export default async function StadiumPage({ params }: PageProps<"/mlb/[slug]">) {
  const { slug } = await params;
  const stadium = getStadiumBySlug(slug);
  if (!stadium) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-1.5">
        <Link href="/" className="hover:text-gray-600 transition-colors">
          MLB
        </Link>
        <span>/</span>
        <span className="text-gray-600">{stadium.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className={`h-1.5 w-16 rounded-full ${stadium.imageColor} mb-4`} />
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-1">
              {stadium.name}
            </h1>
            <p className="text-lg text-gray-500">{stadium.team}</p>
          </div>
          <div className="flex-shrink-0 pt-1">
            <BucketListButton
              slug={stadium.slug}
              stadiumName={stadium.name}
              size="lg"
            />
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge>{stadium.division}</Badge>
          <Badge>{stadium.city}, {stadium.state}</Badge>
          <Badge>{stadium.league === "AL" ? "American League" : "National League"}</Badge>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed mb-10 text-lg">{stadium.description}</p>

      {/* Stats grid */}
      <Section title="Stadium Stats">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard label="Capacity" value={stadium.capacity.toLocaleString()} />
          <StatCard label="Year Opened" value={stadium.yearOpened.toString()} />
          <StatCard label="Surface" value={stadium.surface} />
          <StatCard label="Roof Type" value={stadium.roofType} />
        </div>
      </Section>

      {/* Fun Facts */}
      <Section title="Did You Know?">
        <ul className="space-y-3">
          {stadium.funFacts.map((fact, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-blue-400 mt-0.5 flex-shrink-0">⚾</span>
              <p className="text-gray-600 leading-relaxed">{fact}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Trip Planning */}
      <Section title="Plan Your Trip">
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <TripCard
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
            }
            title="Getting There"
            body={stadium.gettingThere.transit}
            sub={[
              { label: "Parking", text: stadium.gettingThere.parking },
              { label: "Rideshare", text: stadium.gettingThere.rideshare },
            ]}
          />

          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 text-sm">Where to Stay</h3>
            </div>
            <div className="space-y-3">
              <HotelRow tier="Budget" hotel={stadium.stayNearby.budget} />
              <HotelRow tier="Mid-range" hotel={stadium.stayNearby.midRange} />
              <HotelRow tier="Luxury" hotel={stadium.stayNearby.luxury} />
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-1.5-.75m0 0l.75-4.5m15.75 4.5l-.75-4.5" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 text-sm">Nearby Food</h3>
            </div>
            <div className="space-y-3">
              {stadium.nearbyFood.map((place, i) => (
                <div key={i} className="border-b border-gray-50 pb-2.5 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between gap-1">
                    <p className="text-sm font-medium text-gray-800">{place.name}</p>
                    <span className="text-xs text-gray-400 flex-shrink-0">{place.distance}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{place.type}</p>
                  <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{place.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Back link */}
      <div className="mt-12 pt-8 border-t border-gray-100">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to all stadiums
        </Link>
      </div>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
      {children}
    </span>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
      {children}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5">
      <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{label}</p>
      <p className="text-xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

function TripCard({
  icon,
  title,
  body,
  sub,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  sub?: { label: string; text: string }[];
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <h3 className="font-semibold text-gray-800 text-sm">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed mb-3">{body}</p>
      {sub?.map((s) => (
        <div key={s.label} className="mb-2 last:mb-0">
          <p className="text-xs font-medium text-gray-500 mb-0.5">{s.label}</p>
          <p className="text-xs text-gray-500 leading-relaxed">{s.text}</p>
        </div>
      ))}
    </div>
  );
}

function HotelRow({
  tier,
  hotel,
}: {
  tier: string;
  hotel: { name: string; distance: string };
}) {
  return (
    <div className="border-b border-gray-50 pb-2.5 last:border-0 last:pb-0">
      <div className="flex items-start justify-between gap-1">
        <p className="text-sm font-medium text-gray-800 leading-snug">{hotel.name}</p>
        <span className="text-xs text-gray-400 flex-shrink-0">{hotel.distance}</span>
      </div>
      <p className="text-xs text-gray-400 mt-0.5">{tier}</p>
    </div>
  );
}
