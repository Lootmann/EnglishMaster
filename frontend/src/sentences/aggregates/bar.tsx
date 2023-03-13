import React from "react";
import { isMonth, isToday, isWeek } from "../../utils/date";
import { ResponsiveBar } from "@nivo/bar";

export function Bar({ sentences }: any) {
  function createBarData(sentences: SentenceType[]): Array<any> {
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
        title: "Today",
        counts: count_today,
        countsColor: "hsl(48, 70%, 50%)",
      },
      {
        title: "Week",
        counts: count_week,
        countsColor: "hsl(229, 70%, 50%)",
      },
      {
        title: "Month",
        counts: count_month,
        countsColor: "hsl(297, 70%, 50%)",
      },
    ];
  }

  //  TODO: Bar Color
  function createBarKeys() {
    return ["counts"];
  }

  return (
    <ResponsiveBar
      data={createBarData(sentences)}
      keys={createBarKeys()}
      indexBy="title"
      // theme
      theme={{
        fontSize: 20,
        axis: {
          ticks: {
            text: { fontSize: 20, fill: "#cccccc" },
          },
        },
        grid: {
          line: { stroke: "#586688", strokeWidth: 1 },
        },
        legends: {
          text: { fontSize: 20, fill: "#dddddd" },
        },
      }}
      // FIXME: not working :^)
      fill={[{ match: { id: "counts" }, id: "dots" }]}
      colors={{ scheme: "nivo" }}
      margin={{ top: 100, right: 100, bottom: 100, left: 100 }}
      padding={0.3}
      innerPadding={5}
      groupMode="stacked"
      layout="horizontal"
      minValue={0}
      maxValue="auto"
      valueScale={{ type: "linear" }}
      // border
      borderRadius={5}
      borderWidth={1}
      // grid
      enableGridX={true}
      enableGridY={false}
      // axis
      axisTop={{
        tickValues: "every 1",
        tickSize: 6,
        tickPadding: 10,
        legendOffset: 5,
      }}
      axisRight={null}
      axisBottom={null}
      axisLeft={{
        tickSize: 6,
        tickPadding: 5,
        legendOffset: 10,
      }}
      // label
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 4.0]],
      }}
    />
  );
}
