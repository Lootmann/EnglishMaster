import axios from "axios";
import { API_URL } from "../utils/settings";
import { initSentenceType } from "../utils/initializer";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/fonts.css";

export function SentenceRandom() {
  const [sentence, setSentence] = useState<SentenceType>(initSentenceType());

  const [numRange, setNumRange] = useState<numOfWordRangeType>({
    low: 0,
    high: 30,
  });
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { name, value } = e.target;
    setNumRange({ ...numRange, [name]: Number(value) });
  }

  function handleSetRange(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    rangeString: string
  ) {
    e.preventDefault();
    switch (rangeString) {
      case "short": {
        setNumRange({ low: 0, high: 30 });
        break;
      }
      case "middle": {
        setNumRange({ low: 30, high: 60 });
        break;
      }
      case "long": {
        setNumRange({ low: 60, high: 9999 });
        break;
      }
    }
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
        console.log(">>> useEffect");
        if (resp.data.length > 0) setSentence(resp.data[0]);
        else setSentence(initSentenceType());
      });
  }, [refresh]);

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    axios.post(API_URL + `/sentences/${sentence.id}/counter`).then((resp) => {
      setSentence(resp.data);
      console.log(">>> Sentences/RandomSentence.tsx", resp);
      console.log(resp.data);
    });
  }

  return (
    <>
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
          {sentence.id != 0 ? (
            isFlip ? (
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
            )
          ) : (
            <p className="text-3xl">No Records D:</p>
          )}
        </div>

        <div className="flex justify-center gap-8">
          {sentence.id !== 0 && (
            <Link
              to={`/sentences/${sentence.id}`}
              className="text-3xl bg-slate-600 hover:bg-rose-600 hover:text-slate-900 transition-all duration-200 px-3 py-1 rounded-md"
              onClick={() => setRefresh(!refresh)}
            >
              Move To Detail
            </Link>
          )}

          <Link
            to={{}}
            className="text-3xl bg-slate-600 hover:bg-teal-600 hover:text-slate-900 transition-all duration-200 px-3 py-1 rounded-md"
            onClick={() => setRefresh(!refresh)}
          >
            Next Random
          </Link>

          {sentence.id !== 0 && (
            <button
              type="submit"
              className="text-3xl bg-slate-600 hover:bg-indigo-500 hover:text-slate-900 transition-all duration-200 px-3 py-1 rounded-md"
              onClick={(e) => handleClick(e)}
            >
              Read Count ({sentence.counters.length})
            </button>
          )}
        </div>

        <div className="ml-auto mr-auto flex flex-col gap-4 mt-2">
          <div className="flex justify-center gap-4">
            {/* NOTE: num range */}
            <input
              type="number"
              name="low"
              id="low"
              className="w-32 text-center rounded-md text-2xl text-black px-1"
              value={numRange.low}
              step={10}
              onChange={(e) => handleChange(e)}
            />
            <input
              type="number"
              name="high"
              id="high"
              className="w-32 text-center rounded-md text-2xl text-black px-1"
              value={numRange.high}
              step={10}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="flex justify-center gap-4">
            {/* NOTE: set num range */}
            <button
              className="w-32 text-center rounded-md text-2xl text-black bg-slate-400 hover:bg-green-700 px-1"
              onClick={(e) => handleSetRange(e, "short")}
            >
              short
            </button>
            <button
              className="w-32 text-center rounded-md text-2xl text-black bg-slate-400 hover:bg-green-700 px-1"
              onClick={(e) => handleSetRange(e, "middle")}
            >
              middle
            </button>
            <button
              className="w-32 text-center rounded-md text-2xl text-black bg-slate-400 hover:bg-green-700 px-1"
              onClick={(e) => handleSetRange(e, "long")}
            >
              long
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
