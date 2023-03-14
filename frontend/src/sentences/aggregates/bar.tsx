import React from "react";
import { dateToString, isMonth, withinWeek } from "../../utils/date";
import { ResponsiveBar } from "@nivo/bar";

function initDateMap(): Map<string, number> {
  const map = new Map<string, number>();
  const date = new Date();
  date.setDate(date.getDate() - 7);
  for (let i = 0; i < 7; i++) {
    date.setDate(date.getDate() + 1);
    map.set(dateToString(date), 0);
  }
  return map;
}

export function Bar({ sentences }: any) {
  /**
   * bar data = [
   *  {title: "", counts: <number>},
   *  {title: "", counts: <number>},
   *  ...
   * ]
   * @param sentences
   * @returns Array
   */
  function createBarData(sentences: SentenceType[]): Array<any> {
    let count_month = 0;

    // create key by date between 7 days ago and today
    // map has { "MM-DD": <number>, "MM-DD": <number>, }
    const map = initDateMap();

    // FIXME: O(N^2) seems shit :^)
    // FIXME: create a dedicated API?
    for (const sentence of sentences) {
      for (const counter of sentence.counters) {
        if (withinWeek(counter.created_at)) {
          const date = dateToString(counter.created_at);
          const value = map.get(date);
          if (value !== undefined) {
            map.set(date, value + 1);
          } else {
            map.set(date, 1);
          }
        }

        if (isMonth(counter.created_at)) count_month += 1;
      }
    }

    const res = [];
    for (const [key, value] of map.entries()) {
      res.push({ title: key, counts: value });
    }
    res.push({ title: "Month", counts: count_month });

    return res;
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
      colorBy="id"
      margin={{ top: 100, right: 100, bottom: 100, left: 100 }}
      padding={0.3}
      innerPadding={5}
      groupMode="stacked"
      layout="vertical"
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
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 3,
        tickPadding: 15,
        legendOffset: 5,
      }}
      axisLeft={{
        tickValues: "every 1",
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
