import axios from "axios";
import { API_URL } from "../utils/settings";
import { DeleteModal } from "./DeleteModal";
import { initSentenceType } from "../utils/initializer";
import { Link, useParams } from "react-router-dom";
import { Pagination } from "../components/Pagination";
import { toast, ToastContainer } from "react-toastify";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/fonts.css";
import "react-toastify/dist/ReactToastify.css";

export function SentenceDetail() {
  // notification
  const notifySuccess = () => {
    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const notifyFail = () => {
    toast.error("Error Notification !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  // sentence
  const [sentenceForm, setSentenceForm] = useState<SentenceType>(
    initSentenceType()
  );
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();

    const { name, value } = e.target;
    setSentenceForm({ ...sentenceForm, [name]: value });
  }

  function handleUpdate(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    axios
      .patch(API_URL + `/sentences/${sentenceForm.id}`, {
        text: sentenceForm.text,
        translation: sentenceForm.translation,
      })
      .then((resp) => {
        if (resp.status === 200) {
          console.log(resp.data);
          notifySuccess();
        } else {
          console.log(resp.data);
          notifyFail();
        }
      })
      .catch((error) => {
        console.log(error);
        notifyFail();
      });
  }

  // redirect to top page
  const navigate = useNavigate();

  function handleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    axios.delete(API_URL + `/sentences/${sentenceForm.id}`).then((resp) => {
      console.log(resp);
    });

    setModalOpen(false);
    // TODO: delete returns redirect, how to show the notification?
    navigate("/sentences");
  }

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  function handleModal(isOpen: boolean) {
    setModalOpen(isOpen);
  }

  // url params '/sentences/:sentenceId'
  const urlParam = useParams();
  useEffect(() => {
    console.log(urlParam, sentenceForm);

    axios.get(API_URL + `/sentences/${urlParam.sentenceId}`).then((resp) => {
      setSentenceForm(resp.data);
    });
  }, [urlParam]);

  return (
    <div className="h-full w-2/3 ml-auto mr-auto flex flex-col gap-4 p-4">
      <header className="flex gap-6">
        <div>
          <h2 className="text-2xl bg-slate-600 px-6 rounded-md">
            SentenceID: {sentenceForm.id}
          </h2>
        </div>

        <button
          className="text-2xl bg-green-800  hover:bg-green-600 transition-all duration-200 px-2 rounded-md"
          onClick={(e) => handleUpdate(e)}
        >
          Update
        </button>

        <button
          className="text-2xl bg-red-800 hover:bg-red-600 transition-all duration-200 px-2 rounded-md"
          onClick={() => handleModal(true)}
        >
          Delete
        </button>

        <div className="ml-auto mr-20 flex gap-6">
          {urlParam.sentenceId !== undefined && (
            <Pagination currentId={Number(urlParam.sentenceId)} />
          )}
        </div>
      </header>

      <div className="py-2 flex flex-col flex-1 gap-4">
        <textarea
          name="text"
          id="text"
          className="textarea flex-1 p-6 bg-slate-400 text-2xl text-black rounded-md outline-none"
          onChange={(e) => handleChange(e)}
          value={sentenceForm.text}
        ></textarea>

        <textarea
          name="translation"
          id="translation"
          className="textarea flex-1 p-6 bg-slate-400 text-2xl text-black rounded-md outline-none"
          onChange={(e) => handleChange(e)}
          value={sentenceForm.translation}
        ></textarea>
      </div>

      <DeleteModal
        isModalOpen={isModalOpen}
        handleModal={() => handleModal(false)}
        handleRefresh={() => {}}
        handleDelete={(e) => handleDelete(e)}
      />

      <ToastContainer />
    </div>
  );
}
