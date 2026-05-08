"use client";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import type { Stadium } from "@/lib/stadiums";

const DIVISION_COLORS: Record<string, string> = {
  "AL East": "#1d4ed8",
  "AL Central": "#dc2626",
  "AL West": "#16a34a",
  "NL East": "#7c3aed",
  "NL Central": "#d97706",
  "NL West": "#0891b2",
};

type MapStadium = Pick<Stadium, "slug" | "name" | "team" | "coordinates" | "division">;

interface Props {
  stadiums: MapStadium[];
  height?: string;
}

export default function StadiumMap({ stadiums, height = "480px" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!containerRef.current || !token) return;

    mapboxgl.accessToken = token;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-96, 38],
      zoom: 3.5,
    });

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");

    stadiums.forEach((stadium) => {
      const color = DIVISION_COLORS[stadium.division] ?? "#3b82f6";

      const el = document.createElement("div");
      el.style.cssText =
        `width:26px;height:26px;background:${color};border:2.5px solid white;` +
        `border-radius:50%;cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,0.25);` +
        `display:flex;align-items:center;justify-content:center;font-size:11px;`;
      el.textContent = "⚾";

      const popup = new mapboxgl.Popup({ offset: 16, closeButton: false, maxWidth: "200px" })
        .setHTML(
          `<div style="font-family:system-ui,sans-serif;padding:2px">` +
          `<p style="font-weight:600;font-size:13px;margin:0 0 2px;color:#111">${stadium.name}</p>` +
          `<p style="font-size:11px;color:#6b7280;margin:0 0 6px">${stadium.team}</p>` +
          `<a href="/mlb/${stadium.slug}" style="font-size:11px;color:#2563eb;font-weight:500;text-decoration:none">` +
          `View details →</a>` +
          `</div>`
        );

      new mapboxgl.Marker({ element: el })
        .setLngLat([stadium.coordinates.lng, stadium.coordinates.lat])
        .setPopup(popup)
        .addTo(map);
    });

    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={containerRef}
      className="w-full rounded-2xl overflow-hidden border border-gray-100 bg-gray-50"
      style={{ height }}
    />
  );
}
