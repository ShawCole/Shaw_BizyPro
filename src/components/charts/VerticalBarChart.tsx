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

export default function VerticalBarChart({ data, title, color }: Props) {
  const approxSlotWidth = 260 / data.length;
  const maxLabelPx = Math.max(...data.map((d) => d.name.length)) * 6.5;
  const needsAngle = maxLabelPx > approxSlotWidth;

  const maxVal = Math.max(...data.map((d) => d.value));
  const yAxisWidth = Math.max(String(maxVal).length * 8 + 4, 30);

  return (
    <div className="bg-slate-800/50 rounded-xl px-4 pt-4 pb-0 border border-white/5 flex flex-col min-h-[360px]">
      <h4 className="text-sm font-semibold text-slate-200 mb-2">{title}</h4>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 4, bottom: 0, left: 0 }}
          >
            <XAxis
              dataKey="name"
              tick={{ fill: "#94A3B8", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              interval={0}
              angle={needsAngle ? -30 : 0}
              textAnchor={needsAngle ? "end" : "middle"}
              dy={5}
              height={needsAngle ? 40 : 18}
            />
            <YAxis
              tick={{ fill: "#94A3B8", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              width={yAxisWidth}
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
            <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={44}>
              {data.map((_, i) => (
                <Cell key={i} fill={color} fillOpacity={0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
