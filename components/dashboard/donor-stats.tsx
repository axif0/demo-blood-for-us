"use client"

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"

const data = [
  {
    month: "Jun",
    donations: 1,
  },
  {
    month: "Jul",
    donations: 0,
  },
  {
    month: "Aug",
    donations: 0,
  },
  {
    month: "Sep",
    donations: 0,
  },
  {
    month: "Oct",
    donations: 1,
  },
  {
    month: "Nov",
    donations: 0,
  },
  {
    month: "Dec",
    donations: 0,
  },
  {
    month: "Jan",
    donations: 0,
  },
  {
    month: "Feb",
    donations: 1,
  },
  {
    month: "Mar",
    donations: 0,
  },
  {
    month: "Apr",
    donations: 0,
  },
  {
    month: "May",
    donations: 0,
  },
]

export function DonorStats() {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis
            dataKey="month"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip
            cursor={{ fill: "transparent" }}
            contentStyle={{
              background: "#fff",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <Bar dataKey="donations" fill="#B83227" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
