import axios from "axios";
import { API_URL } from "../utils/settings";
import { Bar } from "./aggregates/bar";
import { isMonth, isToday, isWeek } from "../utils/date";
import { Pie } from "./aggregates/pie";
import { useEffect, useState } from "react";

export function Aggregates() {
  const [sentences, setSentences] = useState<SentenceType[]>([]);

  useEffect(() => {
    axios.get(API_URL + "/sentences").then((resp) => {
      setSentences(resp.data);
    });
  }, []);

  return (
    <>
      <div className="h-full flex flex-col">
        <h2 className="text-2xl">Counts Aggregates</h2>
        {sentences.length > 0 && (
          <div className="flex-1">
            <Bar sentences={sentences} />
          </div>
        )}

        {sentences.length > 0 && (
          <div className="flex-1">
            <Pie sentences={sentences} />
          </div>
        )}
      </div>
    </>
  );
}
