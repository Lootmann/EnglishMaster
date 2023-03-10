import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

import { API_URL } from "../../utils/settings";
import "../../styles/fonts.css";

export function RandomSentence() {
  const [sentence, setSentence] = React.useState<SentenceType>({
    id: 0,
    text: "",
    translation: "",
  });

  const [isFlip, setFlip] = React.useState<boolean>(false);

  const [refresh, setRefresh] = React.useState<boolean>(false);

  React.useEffect(() => {
    axios.get(API_URL + "/sentences?random=true").then((resp) => {
      setSentence(resp.data[0]);
      console.log(resp.data[0]);
    });
  }, [refresh]);

  return (
    <>
      {sentence.id !== 0 && (
        <div className="h-full w-2/3 ml-auto mr-auto flex flex-col gap-2 p-4">
          <header className="flex gap-4 mb-4 items-baseline text-2xl">
            <h2 className="text-2xl">Random Sentence</h2>
          </header>

          {/* TODO: flip card */}
          <div
            onClick={() => setFlip(!isFlip)}
            className="h-1/2 mb-4 flex flex-col gap-4 p-4 border-2 border-slate-400 rounded-md"
            onMouseDown={(e) => e.preventDefault()}
          >
            {isFlip ? (
              <p
                className="text-2xl transition-all"
                onMouseDown={(e) => e.stopPropagation()}
              >
                {sentence.text}
              </p>
            ) : (
              <p className="text-2xl" onMouseDown={(e) => e.stopPropagation()}>
                {sentence.translation}
              </p>
            )}
          </div>

          <div className="flex justify-center gap-8">
            <p className="text-3xl bg-slate-600 hover:bg-indigo-400 hover:text-slate-900 transition-all duration-200 px-3 py-1 rounded-md">
              Read Count?
            </p>

            <Link
              to={{}}
              className="text-3xl bg-slate-600 hover:bg-teal-500 hover:text-slate-900 transition-all duration-200 px-3 py-1 rounded-md"
              onClick={() => setRefresh(!refresh)}
            >
              Next Random
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
