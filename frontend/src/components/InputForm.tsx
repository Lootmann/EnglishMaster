import axios from "axios";
import { API_URL } from "../utils/settings";
import { useState } from "react";

export function InputForm({
  isModalOpen,
  handleModal,
  handleRefresh,
}: ModalProp) {
  const [form, setForm] = useState<SentenceFormType>({
    text: "",
    translation: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();

    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    e.preventDefault();

    axios
      .post(API_URL + "/sentences", {
        text: form.text,
        translation: form.translation,
      })
      .then((resp) => {
        console.log(">>> Sentence/InputForm.tsx handleSubmit()", resp);
        console.log(resp.data);
      });

    setForm({ text: "", translation: "" });
    handleModal(false);
    handleRefresh();
  }

  return (
    <>
      {isModalOpen && (
        <div
          className="absolute flex inset-0 bg-black bg-opacity-30 h-screen w-full"
          onClick={() => handleModal(false)}
        >
          <div
            className="flex flex-col relative top-24 left-32 h-2/3 w-1/3 gap-2 p-4 bg-slate-400 border-b rounded-md text-slate-800 text-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex justify-evenly items-baseline">
              <h2 className="text-center border-b border-slate-800 text-3xl">
                Create Sentence
              </h2>
              <input
                type="button"
                value="Create"
                className="text-2xl px-2 bg-slate-300 hover:bg-green-600 transition-all rounded-md"
                onClick={(e) => handleSubmit(e)}
              />
            </header>

            <form method="post" className="flex flex-col gap-4 h-full w-full">
              <textarea
                name="text"
                id="text"
                onChange={(e) => handleChange(e)}
                className="flex-1 bg-slate-500 rounded-md p-2 outline-none text-2xl"
              ></textarea>

              <textarea
                name="translation"
                id="translation"
                onChange={(e) => handleChange(e)}
                className="flex-1 bg-slate-500 rounded-md p-2 outline-none text-2xl"
              ></textarea>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
