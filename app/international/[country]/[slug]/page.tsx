import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getInternationalStadiumBySlug,
  getAllInternationalSlugs,
  slugToCountry,
  countrySlug,
} from "@/lib/internationalStadiums";

export async function generateStaticParams() {
  return getAllInternationalSlugs();
}

export async function generateMetadata({
  params,
}: PageProps<"/international/[country]/[slug]">) {
  const { slug } = await params;
  const stadium = getInternationalStadiumBySlug(slug);
  if (!stadium) return { title: "Not Found" };
  return {
    title: `${stadium.name} — Ballparklopedia`,
    description: stadium.description,
  };
}

export default async function InternationalStadiumPage({
  params,
}: PageProps<"/international/[country]/[slug]">) {
  const { country: countryParam, slug } = await params;

  // Validate the country param matches the stadium's actual country
  const expectedCountry = slugToCountry[countryParam];
  if (!expectedCountry) notFound();

  const stadium = getInternationalStadiumBySlug(slug);
  if (!stadium || countrySlug[stadium.country] !== countryParam) notFound();

  const countryFlag = stadium.country === "Japan" ? "🇯🇵" : "🇰🇷";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-1.5">
        <Link href="/international" className="hover:text-gray-600 transition-colors">
          International
        </Link>
        <span>/</span>
        <span className="text-gray-600">{stadium.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className={`h-1.5 w-16 rounded-full ${stadium.imageColor} mb-4`} />
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-1">
            {stadium.name}
          </h1>
          <p className="text-lg text-gray-500">{stadium.nameLocal}</p>
          <p className="text-base text-gray-500 mt-0.5">{stadium.team}</p>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge>{countryFlag} {stadium.country}</Badge>
          <Badge>{stadium.league}</Badge>
          <Badge>{stadium.city}</Badge>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed mb-8 text-lg">{stadium.description}</p>

      {/* Satellite aerial image */}
      {process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY && (
        <div className="mb-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://maps.googleapis.com/maps/api/staticmap?center=${stadium.coordinates.lat},${stadium.coordinates.lng}&zoom=16&size=800x400&maptype=satellite&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`}
            alt={`Satellite aerial view of ${stadium.name}`}
            className="w-full rounded-2xl"
            width={800}
            height={400}
            loading="lazy"
          />
          <p className="text-xs text-gray-400 mt-1.5 text-right">
            Aerial view · Google Maps
          </p>
        </div>
      )}

      {/* Stats grid */}
      <Section title="Stadium Stats">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard label="Capacity" value={stadium.capacity.toLocaleString()} />
          <StatCard label="Year Opened" value={stadium.yearOpened.toString()} />
          <StatCard label="League" value={stadium.league.split(" · ")[1] ?? stadium.league} />
          <StatCard label="Country" value={stadium.country} />
        </div>
      </Section>

      {/* Fun Facts */}
      <Section title="Did You Know?">
        <ul className="space-y-3">
          {stadium.funFacts.map((fact, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-orange-400 mt-0.5 flex-shrink-0">⚾</span>
              <p className="text-gray-600 leading-relaxed">{fact}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Back link */}
      <div className="mt-12 pt-8 border-t border-gray-100">
        <Link
          href="/international"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to international parks
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
