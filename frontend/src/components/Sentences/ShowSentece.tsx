import React from "react";
import axios from "axios";
import { API_URL } from "../../utils/settings";
import { truncate } from "../../utils/strings";

function ShowSentence() {
  const [sentences, setSentences] = React.useState<SentenceType[]>([]);

  React.useEffect(() => {
    axios.get(API_URL + "/sentences").then((resp) => {
      setSentences(resp.data);
    });
  }, []);

  return (
    <>
      {sentences.length > 0 && (
        <table className="table-auto w-full text-slate-800">
          <thead className="border-b border-slate-900">
            <tr>
              <th>Id</th>
              <th>Text</th>
              <th>Translation</th>
            </tr>
          </thead>

          <tbody>
            {sentences.map((sentence) => (
              <tr key={sentence.id} className="border-b border-slate-600">
                <td className="text-center">{sentence.id}</td>
                <td className="text-center">{truncate(sentence.text)}</td>
                <td className="text-center">
                  {truncate(sentence.translation)}
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
