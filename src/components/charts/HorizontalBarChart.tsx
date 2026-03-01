"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface ChartData {
  name: string;
  value: number;
}

interface Props {
  data: ChartData[];
  title: string;
  color: string;
}

export default function HorizontalBarChart({ data, title, color }: Props) {
  const maxLabelLength = Math.max(...data.map((d) => d.name.length));
  const labelWidth = Math.min(Math.max(maxLabelLength * 6.5, 70), 150);

  return (
    <div className="bg-slate-800/50 rounded-xl px-4 pt-4 pb-3 border border-white/5 flex flex-col min-h-[280px]">
      <h4 className="text-sm font-semibold text-slate-200 mb-2">{title}</h4>
      <div className="flex-1 min-h-0">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 12, bottom: 0, left: 0 }}
          barCategoryGap={4}
        >
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: "#94A3B8", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={labelWidth}
          />
          <Tooltip
            cursor={false}
            contentStyle={{
              backgroundColor: "#0F172A",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "8px",
              color: "#F8FAFC",
              fontSize: "13px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
            }}
            labelStyle={{ color: "#F8FAFC" }}
            itemStyle={{ color: "#94A3B8" }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter={(value: any) => [Number(value || 0).toLocaleString(), "Count"]}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={28}>
            {data.map((_, i) => (
              <Cell key={i} fill={color} fillOpacity={0.8 - i * 0.03} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
}
