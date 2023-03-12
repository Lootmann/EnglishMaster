import axios from "axios";
import { API_URL } from "../utils/settings";
import { DeleteModal } from "./DeleteModal";
import { Link, useParams } from "react-router-dom";
import { NotificationBar } from "../components/NotificationBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/fonts.css";
import {
  initNotificationBarType,
  initSentenceType,
} from "../utils/initializer";

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
  const [sentenceForm, setSentenceForm] = useState<SentenceType>(
    initSentenceType()
  );
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
      .patch(API_URL + `/sentences/${sentenceForm.id}`, {
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

  // NOTE: global key event: 'ctrl+s' updated Sentence
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  function handleCtrlSKeyPress(e: KeyboardEvent) {
    if (e.key == "s" && e.ctrlKey) {
      // NOTE: ensures that this form is updated with the latest information
      if (isUpdated) handleUpdate(e);
      e.preventDefault();
    }
  }

  // NOTE: get neighbor: sentence next id, previous id
  const [neighbors, setNeighbors] = useState<SentenceNeighborType>({
    nextId: 0,
    previousId: 0,
  });

  // url params '/sentences/:sentenceId'
  const urlParam = useParams();
  useEffect(() => {
    // After the page has transitioned, check that it has loaded successfully.
    if (Number(urlParam.sentenceId) === sentenceForm.id) {
      return;
    }

    axios.get(API_URL + `/sentences/${urlParam.sentenceId}`).then((resp) => {
      setSentenceForm(resp.data);
    });

    axios
      .get(API_URL + `/sentences/${urlParam.sentenceId}/neighbors`)
      .then((resp) => {
        setNeighbors({
          nextId: resp.data.next_id,
          previousId: resp.data.previous_id,
        });
      });

    // add Keyboard Event
    document.addEventListener("keydown", handleCtrlSKeyPress);
    return () => document.removeEventListener("keydown", handleCtrlSKeyPress);
  }, [toggleNotification, isUpdated, urlParam]);

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
          {/* Previous  */}
          {neighbors.previousId !== null ? (
            <Link
              to={`/sentences/${neighbors.previousId}`}
              className="text-2xl bg-yellow-800 px-2 rounded-md"
            >
              Previous :D
            </Link>
          ) : (
            <div className="text-2xl px-2 rounded-md">D:</div>
          )}

          {/* Next */}
          {neighbors.nextId !== null ? (
            <Link
              to={`/sentences/${neighbors.nextId}`}
              className="text-2xl bg-yellow-800 px-2 rounded-md"
            >
              Next :D
            </Link>
          ) : (
            <div className="text-2xl px-2 rounded-md">D:</div>
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
