import React from "react";
import { isMonth, isToday, isWeek } from "../../utils/date";
import { ResponsivePie } from "@nivo/pie";

export function Pie({ sentences }: any) {
  function createPieData(sentences: SentenceType[]) {
    let [count_today, count_week, count_month] = [0, 0, 0];

    // FIXME: O(N^2) seems shit :^)
    // FIXME: create a dedicated API?
    for (const sentence of sentences) {
      for (const counter of sentence.counters) {
        if (isMonth(counter.created_at)) count_month += 1;
        if (isWeek(counter.created_at)) count_week += 1;
        if (isToday(counter.created_at)) count_today += 1;
      }
    }

    return [
      {
        id: "Today",
        label: "Today",
        value: count_today,
        color: "hsl(48, 70%, 50%)",
      },
      {
        id: "Week",
        label: "Week",
        value: count_week,
        color: "hsl(229, 70%, 50%)",
      },
      {
        id: "Month",
        label: "Month",
        value: count_month,
        color: "hsl(297, 70%, 50%)",
      },
    ];
  }

  function createPieFill() {
    return [{ match: { id: "counts" }, id: "dots" }];
  }

  return (
    <ResponsivePie
      data={createPieData(sentences)}
      theme={{
        fontSize: 24,
        axis: {
          ticks: {
            text: { fontSize: 20, fill: "#ffffff" },
          },
        },
        grid: {
          line: { stroke: "#586688", strokeWidth: 1 },
        },
        legends: {
          text: { fontSize: 20, fill: "#ffffff" },
        },
      }}
      fill={createPieFill()}
      margin={{ top: 60, right: 60, bottom: 40, left: 60 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={2}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#ffffff"
      arcLinkLabelsThickness={3}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
    />
  );
}
