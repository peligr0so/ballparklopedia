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

const AAA_COLORS: Record<string, string> = {
  IL: "#16a34a",
  PCL: "#0891b2",
};

export type MapStadium = {
  slug: string;
  name: string;
  team: string;
  coordinates: { lat: number; lng: number };
  division: string; // MLB division, or "IL"/"PCL" for AAA
  status?: "active" | "former";
  type?: "mlb" | "aaa"; // default "mlb"
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
      const isAAA = stadium.type === "aaa";
      const isFormer = stadium.status === "former";

      let color: string;
      let size: string;
      let border: string;
      let shadow: string;
      let opacity: string;
      let label: string;

      if (isAAA) {
        color = AAA_COLORS[stadium.division] ?? "#16a34a";
        size = "20px";
        border = "2px solid white";
        shadow = "0 1px 4px rgba(0,0,0,0.2)";
        opacity = "1";
        label = "◆";
      } else if (isFormer) {
        color = "#9ca3af";
        size = "20px";
        border = "1.5px solid #d1d5db";
        shadow = "0 1px 3px rgba(0,0,0,0.15)";
        opacity = "0.75";
        label = "●";
      } else {
        color = DIVISION_COLORS[stadium.division] ?? "#3b82f6";
        size = "26px";
        border = "2.5px solid white";
        shadow = "0 2px 6px rgba(0,0,0,0.25)";
        opacity = "1";
        label = "⚾";
      }

      const el = document.createElement("div");
      el.style.cssText =
        `width:${size};height:${size};background:${color};border:${border};` +
        `border-radius:50%;cursor:pointer;box-shadow:${shadow};opacity:${opacity};` +
        `display:flex;align-items:center;justify-content:center;font-size:${isAAA ? "8px" : isFormer ? "8px" : "11px"};`;
      el.textContent = label;
      el.title = stadium.name;

      const linkPath = isAAA ? `/aaa/${stadium.slug}` : `/mlb/${stadium.slug}`;
      const yearLabel = isFormer
        ? `<span style="font-size:10px;color:#9ca3af;margin-left:4px">(former)</span>`
        : "";
      const leagueTag = isAAA
        ? `<span style="font-size:10px;color:#16a34a;margin-left:4px">AAA · ${stadium.division}</span>`
        : "";

      const popup = new mapboxgl.Popup({ offset: 16, closeButton: false, maxWidth: "210px" })
        .setHTML(
          `<div style="font-family:system-ui,sans-serif;padding:2px">` +
          `<p style="font-weight:600;font-size:13px;margin:0 0 2px;color:${isFormer ? "#6b7280" : "#111"}">${stadium.name}${yearLabel}${leagueTag}</p>` +
          `<p style="font-size:11px;color:#6b7280;margin:0 0 6px">${stadium.team}</p>` +
          `<a href="${linkPath}" style="font-size:11px;color:#2563eb;font-weight:500;text-decoration:none">` +
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
