"use client";

import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";
import type { Bridge } from "@/lib/bridges";

export default function BridgeMiniMap(props: { bridge: Bridge }) {
  const b = props.bridge;
  const pos: [number, number] = [b.coordinates.lat, b.coordinates.lon];
  const zoom = b.coordinatesApprox ? 10 : 13;

  return (
    <div className="rounded-[28px] bg-paper/70 border border-black/10 overflow-hidden">
      <div className="relative">
        <div className="h-[260px] w-full">
          <MapContainer
            center={pos}
            zoom={zoom}
            scrollWheelZoom={true}
            dragging={true}
            zoomControl={false}
            attributionControl={false}
            className="h-full w-full bridge-mini-map"
          >
            <TileLayer
              // OpenStreetMap tiles (standard). We tint via CSS filter.
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <CircleMarker
              center={pos}
              radius={10}
              pathOptions={{
                color: "rgba(181,95,29,0.95)",
                weight: 3,
                fillColor: "rgba(217,118,39,0.85)",
                fillOpacity: 0.8,
              }}
            />
          </MapContainer>
        </div>

        {/* border overlay */}
        <div className="pointer-events-none absolute inset-0 border-2 border-accent/25" />

        {/* big city label */}
        <div className="pointer-events-none absolute left-4 bottom-4">
          <div className="rounded-[18px] bg-white/60 border border-black/10 px-4 py-2">
            <div className="text-[11px] font-semibold text-ink/60 tracking-wide">
              LOCATION
            </div>
            <div className="text-base font-extrabold text-accent leading-tight">
              {b.city ?? b.country}
            </div>
            {b.city ? (
              <div className="text-xs font-semibold text-accent/80">{b.country}</div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="px-5 py-4 text-xs text-ink/55">
        Map tiles © OpenStreetMap contributors
      </div>
    </div>
  );
}
