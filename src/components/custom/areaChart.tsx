import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
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
    color: "#4A72BC",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartAreaAxes() {
  return (
    <Card className="rounded-2xl ring-1 ring-[#091B3D]/20 shadow-md">
      <CardHeader>
        <CardTitle>Ganhos Mensais</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
          >

            <defs>
              <linearGradient id="areaColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4A72BC)" stopOpacity={.75} />
                <stop offset="100%" stopColor="#4A72BC" stopOpacity={.25} />
              </linearGradient>
            </defs>

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
              fill="url(#areaColor)"
              fillOpacity={0.4}
              stroke="#4A72BC"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
