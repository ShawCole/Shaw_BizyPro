"use client";

import { useState, useMemo, useRef } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import { scaleQuantile } from "d3-scale";

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

interface StateData {
  name: string;
  value: number;
}

interface Props {
  data: StateData[];
  title: string;
  color: string;
}

const STATE_FIPS: Record<string, string> = {
  "01": "Alabama", "02": "Alaska", "04": "Arizona", "05": "Arkansas",
  "06": "California", "08": "Colorado", "09": "Connecticut", "10": "Delaware",
  "11": "District of Columbia", "12": "Florida", "13": "Georgia", "15": "Hawaii",
  "16": "Idaho", "17": "Illinois", "18": "Indiana", "19": "Iowa",
  "20": "Kansas", "21": "Kentucky", "22": "Louisiana", "23": "Maine",
  "24": "Maryland", "25": "Massachusetts", "26": "Michigan", "27": "Minnesota",
  "28": "Mississippi", "29": "Missouri", "30": "Montana", "31": "Nebraska",
  "32": "Nevada", "33": "New Hampshire", "34": "New Jersey", "35": "New Mexico",
  "36": "New York", "37": "North Carolina", "38": "North Dakota", "39": "Ohio",
  "40": "Oklahoma", "41": "Oregon", "42": "Pennsylvania", "44": "Rhode Island",
  "45": "South Carolina", "46": "South Dakota", "47": "Tennessee", "48": "Texas",
  "49": "Utah", "50": "Vermont", "51": "Virginia", "53": "Washington",
  "54": "West Virginia", "55": "Wisconsin", "56": "Wyoming",
};

export default function USAChoroplethMap({ data, title, color }: Props) {
  const [tooltip, setTooltip] = useState<{ name: string; value: number; x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent, stateName: string, value: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setTooltip({
      name: stateName,
      value,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const dataMap = useMemo(() => {
    const m = new Map<string, number>();
    data.forEach((d) => m.set(d.name, d.value));
    return m;
  }, [data]);

  const colorScale = useMemo(() => {
    const values = data.map((d) => d.value).filter((v) => v > 0);
    return scaleQuantile<string>()
      .domain(values)
      .range([
        `${color}15`,
        `${color}30`,
        `${color}50`,
        `${color}70`,
        `${color}90`,
        color,
      ]);
  }, [data, color]);

  return (
    <div className="bg-slate-800/50 rounded-xl p-5 border border-white/5 col-span-full">
      <h4 className="text-sm font-semibold text-slate-200 mb-2">{title}</h4>
      <div className="relative" ref={containerRef}>
        <ComposableMap
          projection="geoAlbersUsa"
          projectionConfig={{ scale: 900 }}
          width={800}
          height={500}
          style={{ width: "100%", height: "auto" }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const stateName = STATE_FIPS[geo.id] || geo.properties.name;
                const value = dataMap.get(stateName) || 0;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={value > 0 ? colorScale(value) : "#1E293B"}
                    stroke="#0F172A"
                    strokeWidth={0.5}
                    onMouseMove={(e) => handleMouseMove(e as unknown as React.MouseEvent, stateName, value)}
                    onMouseLeave={() => setTooltip(null)}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none", fill: value > 0 ? color : "#334155" },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
        {tooltip && (
          <div
            className="absolute pointer-events-none bg-[#0F172A] border border-white/15 rounded-lg px-3 py-2 text-sm z-10"
            style={{
              left: tooltip.x + 12,
              top: tooltip.y - 8,
              boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
            }}
          >
            <p className="text-white font-medium">{tooltip.name}</p>
            <p className="text-slate-400">
              {tooltip.value > 0 ? tooltip.value.toLocaleString() : "No data"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
