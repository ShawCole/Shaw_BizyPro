"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface ChartData {
  name: string;
  value: number;
}

interface Props {
  data: ChartData[];
  title: string;
  colors: string[];
  isSemi?: boolean;
}

export default function DoughnutChart({
  data,
  title,
  colors,
  isSemi = false,
}: Props) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const top = data.reduce((a, b) => (a.value > b.value ? a : b), data[0]);
  const topPct = total > 0 ? ((top.value / total) * 100).toFixed(1) : "0";

  return (
    <div className="bg-slate-800/50 rounded-xl px-4 pt-4 pb-3 border border-white/5 flex flex-col min-h-[360px]">
      <h4 className="text-sm font-semibold text-slate-200 mb-2">{title}</h4>
      <div className="flex-1 min-h-0">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy={isSemi ? "80%" : "50%"}
            innerRadius={isSemi ? 60 : 55}
            outerRadius={isSemi ? 100 : 95}
            startAngle={isSemi ? 180 : 90}
            endAngle={isSemi ? 0 : -270}
            paddingAngle={2}
            cornerRadius={4}
            dataKey="value"
          >
            {data.map((_, i) => (
              <Cell key={i} fill={colors[i % colors.length]} stroke="none" />
            ))}
          </Pie>
          <Tooltip
            isAnimationActive={false}
            cursor={false}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            content={({ active, payload, coordinate }: any) => {
              if (!active || !payload?.[0]) return null;
              const { name, value } = payload[0];
              const pct = ((Number(value || 0) / total) * 100).toFixed(1);
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
                  <div style={{ color: "#94A3B8", fontSize: "12px" }}>{Number(value || 0).toLocaleString()} ({pct}%)</div>
                </div>
              );
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      </div>
      <div className="text-center -mt-2">
        <p className="font-[family-name:var(--font-mono)] text-xl font-bold text-white">
          {topPct}%
        </p>
        <p className="text-xs text-slate-400">{top.name}</p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-4 justify-center">
        {data.slice(0, 6).map((d, i) => (
          <div key={d.name} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: colors[i % colors.length] }}
            />
            <span className="text-xs text-slate-400">{d.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
