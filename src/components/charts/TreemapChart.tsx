"use client";

import { useRef, useState, useEffect } from "react";
import { Treemap, ResponsiveContainer, Tooltip } from "recharts";

interface ChartData {
  name: string;
  value: number;
}

interface Props {
  data: ChartData[];
  title: string;
  color: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomContent(props: any) {
  const { x, y, width, height, name, value, color, index, visible } = props;
  if (width < 30 || height < 20) return null;

  const delay = (index ?? 0) * 80;

  return (
    <g
      style={{
        opacity: visible ? 1 : 0,
        transition: `opacity 0.4s ease ${delay}ms`,
      }}
    >
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={color}
        fillOpacity={0.2 + (value / (props.maxValue || 1)) * 0.6}
        stroke="#0F172A"
        strokeWidth={2}
        rx={4}
      />
      {width > 50 && height > 35 && (
        <>
          <text
            x={x + 8}
            y={y + 18}
            fill="#F8FAFC"
            fontSize={11}
            fontWeight={600}
          >
            {name.length > width / 7 ? name.slice(0, Math.floor(width / 7)) + "..." : name}
          </text>
          <text
            x={x + 8}
            y={y + 33}
            fill="#94A3B8"
            fontSize={10}
            fontFamily="var(--font-mono)"
          >
            {value.toLocaleString()}
          </text>
        </>
      )}
    </g>
  );
}

export default function TreemapChart({ data, title, color }: Props) {
  const maxValue = Math.max(...data.map((d) => d.value));
  const treemapData = data.map((d) => ({ ...d, color, maxValue }));
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="bg-slate-800/50 rounded-xl p-4 border border-white/5 flex flex-col">
      <h4 className="text-sm font-semibold text-slate-200 mb-2">{title}</h4>
      <div className="flex-1 min-h-0">
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          data={treemapData}
          dataKey="value"
          nameKey="name"
          content={<CustomContent visible={visible} />}
          isAnimationActive={false}
        >
          <Tooltip
            isAnimationActive={false}
            cursor={false}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            content={({ active, payload, coordinate }: any) => {
              if (!active || !payload?.[0]) return null;
              const { name, value } = payload[0].payload;
              return (
                <div
                  style={{
                    position: "absolute",
                    left: coordinate?.x ?? 0,
                    top: coordinate?.y ?? 0,
                    transform: "translate(10px, -50%)",
                    pointerEvents: "none",
                    backgroundColor: "#0F172A",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                    whiteSpace: "nowrap",
                  }}
                >
                  <div style={{ color: "#F8FAFC", fontSize: "13px", fontWeight: 600 }}>{name}</div>
                  <div style={{ color: "#94A3B8", fontSize: "12px" }}>{Number(value || 0).toLocaleString()}</div>
                </div>
              );
            }}
          />
        </Treemap>
      </ResponsiveContainer>
      </div>
    </div>
  );
}
