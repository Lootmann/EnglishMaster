import axios from "axios";
import React from "react";

import { API_URL } from "../../utils/settings";
import { truncate } from "../../utils/strings";

function ShowSentence({ refresh }: { refresh: boolean }) {
  const [sentences, setSentences] = React.useState<SentenceType[]>([]);

  React.useEffect(() => {
    axios.get(API_URL + "/sentences").then((resp) => {
      setSentences(resp.data);
    });
  }, [refresh]);

  return (
    <>
      {sentences.length > 0 && (
        <table className="table-fixed w-full text-slate-800">
          <thead className="border-b border-slate-900">
            <tr>
              <th className="w-10">Id</th>
              <th className="w-16">Count</th>
              <th>Text</th>
              <th>Translation</th>
            </tr>
          </thead>

          <tbody>
            {sentences.map((sentence) => (
              <tr
                key={sentence.id}
                className="text-xl border-b border-slate-600 hover:bg-slate-400 cursor-pointer"
              >
                <td className="text-center">{sentence.id}</td>
                <th className="text-center">{sentence.counter}</th>
                <td className="text-center">{truncate(sentence.text, 20)}</td>
                <td className="text-center">
                  {truncate(sentence.translation, 15)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default ShowSentence;
