"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts"

const data = [
  {
    month: "Jan",
    requests: 15,
    fulfilled: 12,
  },
  {
    month: "Feb",
    requests: 20,
    fulfilled: 15,
  },
  {
    month: "Mar",
    requests: 18,
    fulfilled: 14,
  },
  {
    month: "Apr",
    requests: 25,
    fulfilled: 18,
  },
  {
    month: "May",
    requests: 22,
    fulfilled: 16,
  },
  {
    month: "Jun",
    requests: 30,
    fulfilled: 22,
  },
]

export function HospitalStats() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip
            cursor={{ fill: "transparent" }}
            contentStyle={{ background: "#fff", border: "1px solid #ccc", borderRadius: "4px" }}
          />
          <Legend />
          <Bar dataKey="requests" name="Requests" fill="#264653" radius={[4, 4, 0, 0]} />
          <Bar dataKey="fulfilled" name="Fulfilled" fill="#2A9D8F" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
