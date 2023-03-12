import axios from "axios";
import { API_URL } from "../utils/settings";
import { DeleteModal } from "./DeleteModal";
import { initNotificationBarType } from "../utils/initializer";
import { NotificationBar } from "../components/NotificationBar";
import { useEffect, useState } from "react";
import "../styles/fonts.css";
import {
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from "react-router-dom";

export async function loader({ params }: LoaderFunctionArgs) {
  const resp = await axios.get(API_URL + `/sentences/${params.sentenceId}`);
  const sentence: SentenceType = await resp.data;
  return sentence;
}

export function SentenceDetail() {
  // set Notification
  const [toggleNotification, setToggleNotification] = useState<boolean>(false);
  const [notificationInfo, setNotificationInfo] = useState<NotificationBarType>(
    initNotificationBarType()
  );

  function handleNotification() {
    setToggleNotification(false);
  }

  function showNotification(
    message: string,
    color: string,
    durationMs: number
  ) {
    setToggleNotification(true);

    setNotificationInfo({
      handleNotification: () => {},
      message: message,
      color: color,
      durationMs: durationMs,
    });
  }

  // sentence
  const sentence = useLoaderData() as SentenceType;
  const [sentenceForm, setSentenceForm] = useState<SentenceType>(sentence);
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();

    const { name, value } = e.target;
    setSentenceForm({ ...sentenceForm, [name]: value });
    setIsUpdated(true);
  }

  function handleUpdate(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | KeyboardEvent
  ) {
    e.preventDefault();

    axios
      .patch(API_URL + `/sentences/${sentence.id}`, {
        text: sentenceForm.text,
        translation: sentenceForm.translation,
      })
      .then((resp) => {
        if (resp.status === 200) {
          console.log(resp.data);
          setIsUpdated(false);
          showNotification("updated :^)", "green", 2000);
        } else {
          console.log(resp.data);
          showNotification("error D:", "red", 2000);
        }
      })
      .catch((error) => {
        console.log(error);
        showNotification("server error D:", "red", 2000);
      });
  }

  // redirect to top page
  const navigate = useNavigate();

  function handleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    axios.delete(API_URL + `/sentences/${sentence.id}`).then((resp) => {
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

  // NOTE: global key event: 'ctrl+s' updated Sentence
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  function handleCtrlSKeyPress(e: KeyboardEvent) {
    if (e.key == "s" && e.ctrlKey) {
      // NOTE: ensures that this form is updated with the latest information
      if (isUpdated) handleUpdate(e);
      e.preventDefault();
    }
  }

  useEffect(() => {
    // add Keyboard Event
    document.addEventListener("keydown", handleCtrlSKeyPress);
    return () => document.removeEventListener("keydown", handleCtrlSKeyPress);
  }, [toggleNotification, isUpdated]);

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
      </header>

      <div className="py-2 flex flex-col flex-1 gap-4">
        <textarea
          name="text"
          id="text"
          className="textarea flex-1 p-2 bg-slate-400 text-2xl text-black rounded-md outline-none"
          onChange={(e) => handleChange(e)}
          value={sentenceForm.text}
        ></textarea>

        <textarea
          name="translation"
          id="translation"
          className="textarea flex-1 p-2 bg-slate-400 text-2xl text-black rounded-md outline-none"
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

      {toggleNotification && (
        <NotificationBar
          handleNotification={handleNotification}
          message={notificationInfo.message}
          color={notificationInfo.color}
          durationMs={notificationInfo.durationMs}
        />
      )}
    </div>
  );
}
