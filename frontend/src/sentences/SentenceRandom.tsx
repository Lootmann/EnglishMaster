import axios from "axios";
import { API_URL } from "../utils/settings";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/fonts.css";

export function SentenceRandom() {
  const [sentence, setSentence] = useState<SentenceType>({
    id: 0,
    text: "",
    translation: "",
    counter: 0,
  });

  const [numRange, setNumRange] = useState<numOfWordRangeType>({
    low: 0,
    high: 9999,
  });
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { name, value } = e.target;
    setNumRange({ ...numRange, [name]: Number(value) });
  }

  const [isFlip, setFlip] = useState<boolean>(true);

  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    console.log(numRange);
    axios
      .get(
        API_URL +
          `/sentences?random=true&low=${numRange.low}&high=${numRange.high}`
      )
      .then((resp) => {
        setSentence(resp.data[0]);
      });
  }, [refresh]);

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    axios.post(API_URL + `/sentences/${sentence.id}/counter`).then((resp) => {
      setSentence({ ...sentence, counter: sentence.counter + 1 });
      console.log(">>> Sentences/RandomSentence.tsx", resp);
      console.log(resp.data);
    });
  }

  return (
    <>
      {sentence.id !== 0 && (
        <div className="h-full w-3/5 ml-auto mr-auto flex flex-col gap-2 p-4">
          <header className="flex gap-4 mb-4 items-baseline text-2xl">
            <h2 className="text-2xl">Random Sentence</h2>
          </header>

          {/* FIXME: flip card with animation */}
          <div
            onClick={() => setFlip(!isFlip)}
            className="h-1/2 mb-4 flex flex-col gap-4 p-4 border-2 border-slate-400 rounded-md"
            onMouseDown={(e) => e.preventDefault()}
          >
            {isFlip ? (
              <p
                className="text-3xl transition-all"
                onMouseDown={(e) => e.stopPropagation()}
              >
                {sentence.text}
              </p>
            ) : (
              <p className="text-3xl" onMouseDown={(e) => e.stopPropagation()}>
                {sentence.translation}
              </p>
            )}
          </div>

          <div className="flex justify-center gap-8">
            <Link
              to={`/sentences/${sentence.id}`}
              className="text-3xl bg-slate-600 hover:bg-teal-500 hover:text-slate-900 transition-all duration-200 px-3 py-1 rounded-md"
              onClick={() => setRefresh(!refresh)}
            >
              Move To Detail
            </Link>

            <button
              type="submit"
              className="text-3xl bg-slate-600 hover:bg-indigo-400 hover:text-slate-900 transition-all duration-200 px-3 py-1 rounded-md"
              onClick={(e) => handleClick(e)}
            >
              Read Count ({sentence.counter})
            </button>

            <Link
              to={{}}
              className="text-3xl bg-slate-600 hover:bg-teal-500 hover:text-slate-900 transition-all duration-200 px-3 py-1 rounded-md"
              onClick={() => setRefresh(!refresh)}
            >
              Next Random
            </Link>
          </div>

          <div className="ml-auto mr-auto flex gap-2 mt-2">
            <input
              type="number"
              name="low"
              id="low"
              className="w-32 text-center rounded-md text-xl text-black px-1"
              value={numRange.low}
              step={10}
              onChange={(e) => handleChange(e)}
            />
            <input
              type="number"
              name="high"
              id="high"
              className="w-32 text-center rounded-md text-xl text-black px-1"
              value={numRange.high}
              step={10}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
      )}
    </>
  );
}
