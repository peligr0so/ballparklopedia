"use client";

import dynamic from "next/dynamic";
import type { MapStadium } from "./StadiumMap";

const StadiumMap = dynamic(() => import("./StadiumMap"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full rounded-2xl bg-gray-100 animate-pulse border border-gray-100"
      style={{ height: "var(--map-height, 480px)" }}
    />
  ),
});

export default function MapLoader({
  stadiums,
  height,
}: {
  stadiums: MapStadium[];
  height?: string;
}) {
  return (
    <div style={{ "--map-height": height ?? "480px" } as React.CSSProperties}>
      <StadiumMap stadiums={stadiums} height={height} />
    </div>
  );
}
