import axios from "axios";
import React from "react";
import { API_URL } from "../utils/settings";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";

export async function loader({ params }: LoaderFunctionArgs) {
  let sentence: SentenceType = {
    id: 0,
    text: "",
    translation: "",
    counter: 0,
  };

  await axios.get(API_URL + `/sentences/${params.sentenceId}`).then((resp) => {
    sentence = resp.data;
  });

  return sentence;
}

export function SentenceDetail() {
  const sentence = useLoaderData() as SentenceType;
  return (
    <div className="h-full p-4">
      <h2 className="text-2xl">Hello World</h2>

      <div>
        <p>{sentence.id}</p>
        <p>{sentence.text}</p>
        <p>{sentence.translation}</p>
      </div>
    </div>
  );
}
