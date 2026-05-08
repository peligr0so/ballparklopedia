"use client";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";

const DIVISION_COLORS: Record<string, string> = {
  "AL East": "#1d4ed8",
  "AL Central": "#dc2626",
  "AL West": "#16a34a",
  "NL East": "#7c3aed",
  "NL Central": "#d97706",
  "NL West": "#0891b2",
};

export type MapStadium = {
  slug: string;
  name: string;
  team: string;
  coordinates: { lat: number; lng: number };
  division: string;
  status?: "active" | "former";
};

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
      const isFormer = stadium.status === "former";
      const color = isFormer ? "#9ca3af" : (DIVISION_COLORS[stadium.division] ?? "#3b82f6");
      const size = isFormer ? "20px" : "26px";
      const border = isFormer ? "1.5px solid #d1d5db" : "2.5px solid white";
      const shadow = isFormer ? "0 1px 3px rgba(0,0,0,0.15)" : "0 2px 6px rgba(0,0,0,0.25)";
      const opacity = isFormer ? "0.75" : "1";

      const el = document.createElement("div");
      el.style.cssText =
        `width:${size};height:${size};background:${color};border:${border};` +
        `border-radius:50%;cursor:pointer;box-shadow:${shadow};opacity:${opacity};` +
        `display:flex;align-items:center;justify-content:center;font-size:${isFormer ? "8px" : "11px"};`;
      el.textContent = isFormer ? "●" : "⚾";
      el.title = stadium.name;

      const yearLabel = isFormer ? `<span style="font-size:10px;color:#9ca3af;margin-left:4px">(former)</span>` : "";
      const popup = new mapboxgl.Popup({ offset: 16, closeButton: false, maxWidth: "200px" })
        .setHTML(
          `<div style="font-family:system-ui,sans-serif;padding:2px">` +
          `<p style="font-weight:600;font-size:13px;margin:0 0 2px;color:${isFormer ? "#6b7280" : "#111"}">${stadium.name}${yearLabel}</p>` +
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
  }, [stadiums]);

  return (
    <div
      ref={containerRef}
      className="w-full rounded-2xl overflow-hidden border border-gray-100 bg-gray-50"
      style={{ height }}
    />
  );
}
