"use client";

import { useState, useEffect, useMemo } from "react";
import { Stadium, stadiums as allStadiums, divisions } from "@/lib/stadiums";
import { getBucketList } from "@/lib/bucketList";
import StadiumCard from "./StadiumCard";

export default function SearchAndFilter() {
  const [query, setQuery] = useState("");
  const [selectedDivision, setSelectedDivision] = useState<string>("");
  const [selectedRoof, setSelectedRoof] = useState<string>("");
  const [selectedSurface, setSelectedSurface] = useState<string>("");
  const [showBucketListOnly, setShowBucketListOnly] = useState(false);
  const [bucketList, setBucketList] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"name" | "capacity" | "year">("name");

  useEffect(() => {
    setBucketList(getBucketList());
    const handler = () => setBucketList(getBucketList());
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const filtered = useMemo(() => {
    let result = allStadiums;

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.team.toLowerCase().includes(q) ||
          s.city.toLowerCase().includes(q) ||
          s.state.toLowerCase().includes(q)
      );
    }

    if (selectedDivision) {
      result = result.filter((s) => s.division === selectedDivision);
    }

    if (selectedRoof) {
      result = result.filter((s) => s.roofType === selectedRoof);
    }

    if (selectedSurface) {
      result = result.filter((s) => s.surface === selectedSurface);
    }

    if (showBucketListOnly) {
      result = result.filter((s) => bucketList.includes(s.slug));
    }

    result = [...result].sort((a, b) => {
      if (sortBy === "capacity") return b.capacity - a.capacity;
      if (sortBy === "year") return a.yearOpened - b.yearOpened;
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [query, selectedDivision, selectedRoof, selectedSurface, showBucketListOnly, bucketList, sortBy]);

  const hasFilters = query || selectedDivision || selectedRoof || selectedSurface || showBucketListOnly;

  function clearFilters() {
    setQuery("");
    setSelectedDivision("");
    setSelectedRoof("");
    setSelectedSurface("");
    setShowBucketListOnly(false);
  }

  return (
    <div>
      {/* Search bar */}
      <div className="relative mb-4">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search stadiums, teams, or cities…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        {query && (
          <button onClick={() => setQuery("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap gap-2 mb-6">
        <FilterSelect
          value={selectedDivision}
          onChange={setSelectedDivision}
          placeholder="All Divisions"
          options={divisions.map((d) => ({ value: d, label: d }))}
        />
        <FilterSelect
          value={selectedRoof}
          onChange={setSelectedRoof}
          placeholder="All Roof Types"
          options={[
            { value: "Open", label: "Open Air" },
            { value: "Retractable", label: "Retractable" },
            { value: "Fixed Dome", label: "Fixed Dome" },
          ]}
        />
        <FilterSelect
          value={selectedSurface}
          onChange={setSelectedSurface}
          placeholder="All Surfaces"
          options={[
            { value: "Natural Grass", label: "Natural Grass" },
            { value: "Artificial Turf", label: "Artificial Turf" },
          ]}
        />
        <FilterSelect
          value={sortBy}
          onChange={(v) => setSortBy(v as typeof sortBy)}
          placeholder="Sort by Name"
          options={[
            { value: "name", label: "Sort: Name" },
            { value: "capacity", label: "Sort: Capacity" },
            { value: "year", label: "Sort: Year Opened" },
          ]}
        />

        <button
          onClick={() => setShowBucketListOnly(!showBucketListOnly)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm transition-all ${
            showBucketListOnly
              ? "bg-amber-50 border-amber-300 text-amber-700"
              : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
          }`}
        >
          <svg className={`w-3.5 h-3.5 ${showBucketListOnly ? "text-amber-500 fill-amber-500" : "text-gray-400"}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={showBucketListOnly ? 0 : 1.5} fill={showBucketListOnly ? "currentColor" : "none"}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg>
          Bucket List {bucketList.length > 0 && <span className="ml-0.5 text-xs font-semibold">{bucketList.length}</span>}
        </button>

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="px-3 py-1.5 rounded-lg text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          {filtered.length === allStadiums.length
            ? `All ${allStadiums.length} MLB stadiums`
            : `${filtered.length} of ${allStadiums.length} stadiums`}
        </p>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">⚾</div>
          <p className="text-gray-500 font-medium">No stadiums match your filters</p>
          <button onClick={clearFilters} className="mt-2 text-sm text-blue-600 hover:underline">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((stadium) => (
            <StadiumCard key={stadium.slug} stadium={stadium} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  placeholder,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`px-3 py-1.5 rounded-lg border text-sm transition-all appearance-none cursor-pointer pr-7 bg-[right_0.5rem_center] bg-no-repeat focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        value
          ? "bg-blue-50 border-blue-300 text-blue-700"
          : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
      }`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
      }}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
