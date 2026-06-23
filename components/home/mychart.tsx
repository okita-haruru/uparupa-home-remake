"use client";

import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "next-themes";
import { useI18n } from "@/components/i18n/i18n-provider";
import { useChartData } from "./useChartData";

const formatData = (data: { login_time: string; count: number }[]) => {
  return data.map(({ login_time, count }) => ({ login_time, count }));
};

const generateTicks = (dataMax: number) => {
  const max = Math.max(5, Math.ceil((dataMax * 1.1) / 5) * 5);
  const ticks: number[] = [];

  for (let tick = 0; tick <= max; tick += 5) {
    ticks.push(tick);
  }

  return ticks;
};

interface MyChartProps {
  height?: number | string;
}

export const MyChart = ({ height = 480 }: MyChartProps) => {
  const { t } = useI18n();
  const { data } = useChartData();
  const { theme } = useTheme();
  const formattedData = formatData(data);
  const dataMax =
    formattedData.length > 0 ? Math.max(...formattedData.map((item) => item.count)) : 0;

  if (!theme) {
    return null;
  }

  const getColor = (lightColor: string, darkColor: string) => {
    return theme === "dark" ? darkColor : lightColor;
  };

  const chartAccent = "#8ca8e7";

  return (
    <div className="chart-container" style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <AreaChart data={formattedData}>
          <defs>
            <linearGradient id="homeChartFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={chartAccent} stopOpacity={0.26} />
              <stop offset="65%" stopColor={chartAccent} stopOpacity={0.12} />
              <stop offset="100%" stopColor={chartAccent} stopOpacity={0.03} />
            </linearGradient>
          </defs>
          <CartesianGrid
            horizontal
            vertical={false}
            strokeDasharray="3 3"
            stroke={getColor("rgba(15, 23, 42, 0.09)", "rgba(255, 255, 255, 0.08)")}
          />
          <XAxis
            dataKey="login_time"
            tick={{
              fontSize: 13,
              fill: getColor("rgba(17, 24, 39, 0.72)", "rgba(226, 232, 240, 0.72)"),
            }}
            axisLine={{
              stroke: getColor("rgba(15, 23, 42, 0.16)", "rgba(255, 255, 255, 0.14)"),
            }}
            tickLine={{
              stroke: getColor("rgba(15, 23, 42, 0.16)", "rgba(255, 255, 255, 0.14)"),
            }}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis
            tick={{
              fill: getColor("rgba(17, 24, 39, 0.72)", "rgba(226, 232, 240, 0.72)"),
            }}
            axisLine={{
              stroke: getColor("rgba(15, 23, 42, 0.16)", "rgba(255, 255, 255, 0.14)"),
            }}
            tickLine={{
              stroke: getColor("rgba(15, 23, 42, 0.16)", "rgba(255, 255, 255, 0.14)"),
            }}
            domain={[0, Math.max(5, Math.ceil((dataMax * 1.1) / 5) * 5)]}
            ticks={generateTicks(dataMax)}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload || payload.length === 0) {
                return null;
              }

              return (
                <div className="home-chart-tooltip">
                  <p>
                    {t("chart.date")}: {payload[0].payload.login_time}
                  </p>
                  <p>
                    {t("chart.dailyActivePlayers")}: {payload[0].value}
                  </p>
                </div>
              );
            }}
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke={chartAccent}
            strokeWidth={2.5}
            fill="url(#homeChartFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
