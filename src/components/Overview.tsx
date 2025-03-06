
import React from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  {
    name: 'Jan',
    total: 4000,
  },
  {
    name: 'Feb',
    total: 5100,
  },
  {
    name: 'Mar',
    total: 4200,
  },
  {
    name: 'Apr',
    total: 3800,
  },
  {
    name: 'May',
    total: 5200,
  },
  {
    name: 'Jun',
    total: 4800,
  },
  {
    name: 'Jul',
    total: 6300,
  },
  {
    name: 'Aug',
    total: 5900,
  },
  {
    name: 'Sep',
    total: 7200,
  },
  {
    name: 'Oct',
    total: 6500,
  },
  {
    name: 'Nov',
    total: 7500,
  },
  {
    name: 'Dec',
    total: 8200,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
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
          tickFormatter={(value) => `₹${value}`}
        />
        <Tooltip 
          cursor={false}
          contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
          formatter={(value) => [`₹${value}`, 'Revenue']}
        />
        <Bar 
          dataKey="total" 
          fill="hsl(var(--primary))" 
          radius={[4, 4, 0, 0]} 
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
