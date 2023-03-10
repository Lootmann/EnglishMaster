import React from "react";
import axios from "axios";
import { API_URL } from "../../utils/settings";

export function RandomSentence() {
  const [sentence, setSentence] = React.useState<SentenceType>({
    id: 0,
    text: "",
    translation: "",
  });

  React.useEffect(() => {
    axios.get(API_URL + "/sentences/random").then((resp) => {
      setSentence(resp.data);
    });
  }, []);

  return (
    <>
      {sentence.id !== 0 && (
        <div className="h-full flex gap-2">
          <div className="p-4 text-xl">Random Sentence</div>
        </div>
      )}
    </>
  );
}
