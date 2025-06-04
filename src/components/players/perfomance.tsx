'use client';

import { IconScubaDiving } from '@tabler/icons-react';
import { Bar, BarChart, XAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export const description = 'A stacked bar chart with a legend';
export const iframeHeight = '600px';
export const containerClassName =
  '[&>div]:w-full [&>div]:max-w-md flex items-center justify-center min-h-svh';

const chartData = [
  {
    gw: 'GW1',
    goals: 2,
    assists: 1,
    yellowCards: 0,
    redCards: 0,
    notPlayed: 0,
    keyPasses: 4,
    saves: 0,
    clearances: 3,
  },
  {
    gw: 'GW2',
    goals: 0,
    assists: 2,
    yellowCards: 1,
    redCards: 0,
    notPlayed: 0,
    keyPasses: 5,
    saves: 0,
    clearances: 1,
  },
  {
    gw: 'GW3',
    goals: 1,
    assists: 0,
    yellowCards: 1,
    redCards: 1,
    notPlayed: 0,
    keyPasses: 2,
    saves: 0,
    clearances: 2,
  },
  {
    gw: 'GW4',
    goals: 0,
    assists: 0,
    yellowCards: 0,
    redCards: 0,
    notPlayed: 1,
    keyPasses: 0,
    saves: 0,
    clearances: 0,
  },
  {
    gw: 'GW5',
    goals: 3,
    assists: 1,
    yellowCards: 0,
    redCards: 0,
    notPlayed: 0,
    keyPasses: 6,
    saves: 0,
    clearances: 4,
  },
  {
    gw: 'GW6',
    goals: 6,
    assists: 3,
    yellowCards: 0,
    redCards: 0,
    notPlayed: 0,
    keyPasses: 6,
    saves: 0,
    clearances: 4,
  },
  {
    gw: 'GW7',
    goals: 3,
    assists: 1,
    yellowCards: 0,
    redCards: 0,
    notPlayed: 0,
    keyPasses: 6,
    saves: 0,
    clearances: 4,
  },
  {
    gw: 'GW8',
    goals: 3,
    assists: 1,
    yellowCards: 0,
    redCards: 0,
    notPlayed: 0,
    keyPasses: 6,
    saves: 0,
    clearances: 4,
  },
  {
    gw: 'GW9',
    goals: 3,
    assists: 1,
    yellowCards: 0,
    redCards: 0,
    notPlayed: 0,
    keyPasses: 6,
    saves: 0,
    clearances: 4,
  },
  {
    gw: 'GW10',
    goals: 3,
    assists: 1,
    yellowCards: 0,
    redCards: 0,
    notPlayed: 0,
    keyPasses: 6,
    saves: 0,
    clearances: 4,
  },
  {
    gw: 'GW11',
    goals: 3,
    assists: 1,
    yellowCards: 0,
    redCards: 0,
    notPlayed: 0,
    keyPasses: 6,
    saves: 0,
    clearances: 4,
  },
];

const chartConfig = {
  goals: {
    label: 'Goals',
    color: '#16a34a', // green - success
  },
  assists: {
    label: 'Assists',
    color: '#3b82f6', // blue - support
  },
  /* yellowCards: {
    label: 'Yellow Cards',
    color: '#facc15', 
  },
  redCards: {
    label: 'Red Cards',
    color: '#ef4444', // red - danger
  },
  notPlayed: {
    label: 'Not Played',
    color: '#9ca3af', // gray - inactive
  },
  keyPasses: {
    label: 'Key Passes',
    color: '#8b5cf6', // purple - vision
  },
  saves: {
    label: 'Saves',
    color: '#0ea5e9', // sky blue - goalkeeping
  },
  clearances: {
    label: 'Clearances',
    color: '#10b981', // teal - defense
  },*/
} satisfies ChartConfig;

export function Perfomance() {
  return (
    <div className="px-2">
      <h3 className="mb-3 text-lg font-semibold">Perfomance</h3>
      <div className="overflow-hidden rounded-xl border p-2">
        <ChartContainer config={chartConfig} className="">
          <BarChart accessibilityLayer data={chartData}>
            <XAxis
              dataKey="gw"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />

            {/*} <Bar
              dataKey="running"
              stackId="a"
              fill="var(--color-running)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="swimming"
              stackId="a"
              fill="var(--color-swimming)"
              radius={[4, 4, 0, 0]}
            />*/}
            <Bar
              dataKey="goals"
              fill={chartConfig.goals.color}
              stackId={'a'}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="assists"
              fill={chartConfig.assists.color}
              radius={[4, 4, 0, 0]}
              stackId={'a'}
            />
            {/*<Bar
             dataKey="yellowCards"
              fill={chartConfig.yellowCards.color}
              radius={[4, 4, 0, 0]}
              barSize={10}
              stackId={'a'}
            />
            <Bar
              dataKey="redCards"
              fill={chartConfig.redCards.color}
              radius={[4, 4, 0, 0]}
              barSize={20}
              stackId={'a'}
            />*/}

            <ChartTooltip
              content={<ChartTooltipContent />}
              cursor={false}
              defaultIndex={1}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}
