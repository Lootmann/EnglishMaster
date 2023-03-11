import axios from "axios";
import { API_URL } from "../utils/settings";
import { initSentenceType } from "../utils/initializer";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/fonts.css";

export async function loader({ params }: LoaderFunctionArgs) {
  let sentence: SentenceType = initSentenceType();

  await axios.get(API_URL + `/sentences/${params.sentenceId}`).then((resp) => {
    sentence = resp.data;
  });

  return sentence;
}

// TODO: ctrl + s -> save and popup when save is success
export function SentenceDetail() {
  const sentence = useLoaderData() as SentenceType;

  const [form, setForm] = useState<SentenceType>(initSentenceType());
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  // FIXME: when updated is success, show popup - success or fail
  function handleUpdate(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    axios
      .patch(API_URL + `/sentences/${sentence.id}`, {
        text: form.text,
        translation: form.translation,
      })
      .then((resp) => {
        console.log(resp);
        console.log(resp.data);
      });
  }

  function handleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
  }

  useEffect(() => {
    setForm(sentence);
  }, []);

  // NOTE: text color black - Readable?
  return (
    <div className="h-full flex flex-col gap-4 p-4">
      <header className="flex gap-6">
        <div>
          <h2 className="text-2xl bg-slate-600 px-6 rounded-md">
            SentenceID: {sentence.id}
          </h2>
        </div>

        <button
          className="text-2xl bg-green-800  hover:bg-green-600 transition-all duration-200 px-2 rounded-md"
          onClick={(e) => handleUpdate(e)}
        >
          Update
        </button>

        {/* TODO: show Modal - Are you sure to delete this sentence? */}
        <button
          className="text-2xl bg-red-800 hover:bg-red-600 transition-all duration-200 px-2 rounded-md"
          onClick={(e) => handleDelete(e)}
        >
          Delete
        </button>
      </header>

      <div className="py-2 flex flex-col flex-1 gap-4">
        {/* FIXME: which is better(readable) flex-col or flex-row? */}
        <textarea
          name="text"
          id="text"
          className="textarea flex-1 p-2 bg-slate-400 text-2xl text-black rounded-md"
          onChange={(e) => handleChange(e)}
          value={form.text}
        ></textarea>

        <textarea
          name="translation"
          id="translation"
          className="textarea flex-1 p-2 bg-slate-400 text-2xl text-black rounded-md"
          onChange={(e) => handleChange(e)}
          value={form.translation}
        ></textarea>
      </div>
    </div>
  );
}
