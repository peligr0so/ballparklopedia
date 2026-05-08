"use client";

import { useState } from "react";
import MapLoader from "./MapLoader";

const DIVISION_COLORS: Record<string, string> = {
  "AL East": "#1d4ed8",
  "AL Central": "#dc2626",
  "AL West": "#16a34a",
  "NL East": "#7c3aed",
  "NL Central": "#d97706",
  "NL West": "#0891b2",
};

type MapStadium = {
  slug: string;
  name: string;
  team: string;
  coordinates: { lat: number; lng: number };
  division: string;
  status?: "active" | "former";
};

interface Props {
  currentStadiums: MapStadium[];
  formerStadiums: MapStadium[];
}

type Layer = "current" | "former";

export default function MapSection({ currentStadiums, formerStadiums }: Props) {
  const [activeLayers, setActiveLayers] = useState<Set<Layer>>(new Set(["current"]));

  function toggleLayer(layer: Layer) {
    setActiveLayers((prev) => {
      const next = new Set(prev);
      if (next.has(layer)) {
        // Don't allow deselecting both
        if (next.size > 1) next.delete(layer);
      } else {
        next.add(layer);
      }
      return next;
    });
  }

  const visibleStadiums = [
    ...(activeLayers.has("current") ? currentStadiums : []),
    ...(activeLayers.has("former") ? formerStadiums : []),
  ];

  const showingFormer = activeLayers.has("former");
  const showingCurrent = activeLayers.has("current");

  return (
    <div>
      {/* Layer toggles */}
      <div className="flex items-center justify-between mb-3 gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <LayerToggle
            label="Current MLB"
            active={showingCurrent}
            count={currentStadiums.length}
            dotColor="#3b82f6"
            onClick={() => toggleLayer("current")}
          />
          <LayerToggle
            label="Former MLB"
            active={showingFormer}
            count={formerStadiums.length}
            dotColor="#9ca3af"
            onClick={() => toggleLayer("former")}
          />
          {/* Future leagues will go here */}
        </div>

        {/* Division legend — only show when current is active */}
        {showingCurrent && (
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {Object.entries(DIVISION_COLORS).map(([div, color]) => (
              <span key={div} className="flex items-center gap-1 text-xs text-gray-500">
                <span
                  className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: color }}
                />
                {div}
              </span>
            ))}
          </div>
        )}
      </div>

      <MapLoader stadiums={visibleStadiums} />

      <p className="text-xs text-gray-400 mt-2">
        {visibleStadiums.length} stadium{visibleStadiums.length !== 1 ? "s" : ""} shown.
        Click any marker to see details.
      </p>
    </div>
  );
}

function LayerToggle({
  label,
  active,
  count,
  dotColor,
  onClick,
}: {
  label: string;
  active: boolean;
  count: number;
  dotColor: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${
        active
          ? "bg-white border-gray-300 text-gray-800 shadow-sm"
          : "bg-transparent border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600"
      }`}
    >
      <span
        className={`inline-block w-2.5 h-2.5 rounded-full transition-opacity ${active ? "opacity-100" : "opacity-40"}`}
        style={{ background: dotColor }}
      />
      {label}
      <span className={`text-xs font-normal ${active ? "text-gray-500" : "text-gray-300"}`}>
        {count}
      </span>
    </button>
  );
}
