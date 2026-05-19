"use client"

import { TrendUpIcon } from "@phosphor-icons/react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"


const chartData = [
  { month: "Janeiro", earnings: 85000 },
  { month: "Fevereiro", earnings: 112500 },
  { month: "Março", earnings: 98000 },
  { month: "Abril", earnings: 145000 },
  { month: "Maio", earnings: 130000 },
  { month: "Junho", earnings: 175000 },
  { month: "Julho", earnings: 210000 },
  { month: "Agosto", earnings: 195000 },
  { month: "Setembro", earnings: 250000 },
  { month: "Outubro", earnings: 285000 },
  { month: "Novembro", earnings: 320000 },
  { month: "Dezembro", earnings: 415000 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartAreaAxes() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Area Chart - Axes</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 0,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickCount={5}
                tickFormatter={(value) => `${value/1000}mil`}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="earnings"
              type="natural"
              fill="var(--primary)"
              fillOpacity={0.4}
              stroke="var(--primary)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendUpIcon className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
