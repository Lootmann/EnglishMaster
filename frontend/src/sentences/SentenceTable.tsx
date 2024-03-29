import axios from "axios";
import React from "react";
import { API_URL, LIMIT } from "../utils/settings";
import { truncate } from "../utils/strings";
import { useNavigate } from "react-router-dom";

export function SentenceTable({
  refresh,
  currentPage,
}: {
  refresh: boolean;
  currentPage: number;
}) {
  const navigate = useNavigate();
  const goSentenceId = (sentence_id: number) => {
    navigate(`/sentences/${sentence_id}`);
  };

  const [sentences, setSentences] = React.useState<SentenceType[]>([]);

  React.useEffect(() => {
    const offset: number = (currentPage - 1) * LIMIT;
    axios
      .get(API_URL + `/sentences?limit=${LIMIT}&offset=${offset}`)
      .then((resp) => {
        setSentences(resp.data);
      });
  }, [refresh]);

  return (
    <>
      {sentences.length > 0 && (
        <table className="table-fixed w-full border-spacing-y-10 text-slate-800">
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
                className="text-xl border-b border-slate-600 hover:bg-slate-300 cursor-pointer"
                onClick={() => goSentenceId(sentence.id)}
              >
                <td className="text-center">{sentence.id}</td>
                <td className="text-center">{sentence.counters.length}</td>
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
