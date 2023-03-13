import axios from "axios";
import { API_URL } from "../utils/settings";
import { isMonth, isToday, isWeek } from "../utils/date";
import { ResponsiveBar } from "@nivo/bar";
import { useEffect, useState } from "react";

// FIXME: O(N^2) seems shit :^)
function aggregateMonth(sentences: SentenceType[]) {
  let counts = 0;

  for (const sentence of sentences) {
    for (const counter of sentence.counters) {
      if (isMonth(counter.created_at)) {
        counts += 1;
      }
    }
  }

  return { title: "Month", counts: counts };
}

function aggregateWeek(sentences: SentenceType[]) {
  let counts = 0;

  for (const sentence of sentences) {
    for (const counter of sentence.counters) {
      if (isWeek(counter.created_at)) {
        counts += 1;
      }
    }
  }

  return { title: "Week", counts: counts };
}

function aggregateToday(sentences: SentenceType[]) {
  let counts = 0;

  for (const sentence of sentences) {
    for (const counter of sentence.counters) {
      if (isToday(counter.created_at)) {
        counts += 1;
      }
    }
  }

  return { title: "Today", counts: counts };
}

export function Aggregates() {
  const [sentences, setSentences] = useState<SentenceType[]>([]);

  function createData(sentences: SentenceType[]): Array<any> {
    const res = [
      aggregateToday(sentences),
      aggregateWeek(sentences),
      aggregateMonth(sentences),
    ];
    console.log(res);
    return res;
  }

  function createKeys() {
    return ["counts"];
  }

  useEffect(() => {
    axios.get(API_URL + "/sentences").then((resp) => {
      console.log(resp.data);
      setSentences(resp.data);
    });
  }, []);

  return (
    <div className="h-1/2">
      <h2 className="text-xl">Aggregates</h2>

      {sentences.length > 0 && (
        <ResponsiveBar
          data={createData(sentences)}
          keys={createKeys()}
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
          // legends
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom",
              direction: "row",
              itemWidth: 100,
              itemHeight: 0,
              translateY: 20,
              symbolSize: 20,
            },
          ]}
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
      )}
    </div>
  );
}
