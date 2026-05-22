import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

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

export const description = "A bar chart with a label"

const chartData = [
  { serviceType: "Manutenção", completedServices: 89 },
  { serviceType: "Instalação", completedServices: 56 },
  { serviceType: "Reparação", completedServices: 142 },
  { serviceType: "Emergência", completedServices: 34 }
];

const chartConfig = {
  serviceType: {
    label: "Desktop",
    color: "var(--foreground)",
  },
} satisfies ChartConfig

export function ChartBarLabel() {
  return (
    <Card className="rounded-2xl ring-1 ring-[#091B3D]/20 shadow-md">
      <CardHeader>
        <CardTitle>Ganhos por Tipo de Serviço</CardTitle>
        <CardDescription>Quantidade de Serviços prestados pela natureza do serviço</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="serviceType"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="completedServices" fill="#4A72BC" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="primary"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
