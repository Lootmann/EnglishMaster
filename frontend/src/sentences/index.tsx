import { Aggregates } from "./Aggregates";
import { InputForm } from "../components/InputForm";
import { SentenceTable } from "./SentenceTable";
import { useState } from "react";

export function Index() {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  function handleModal(isOpened: boolean) {
    setModalOpen(isOpened);
  }

  const [refresh, setRefresh] = useState<boolean>(false);
  function handleRefresh() {
    setRefresh(!refresh);
  }

  return (
    <div className="h-full flex gap-2">
      <div className="flex flex-col gap-2 flex-1 p-4 rounded-md text-2xl">
        <div className="flex items-baseline gap-6">
          <h2 className="text-3xl">Sencentes</h2>
          <button
            className="text-2xl bg-slate-600 hover:bg-green-700 px-2 rounded-md"
            onClick={() => handleModal(true)}
          >
            Create
          </button>
        </div>

        <div className="flex-1 bg-slate-400 rounded-md p-2">
          <SentenceTable refresh={refresh} />
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4 rounded-md">
        <Aggregates />
      </div>

      {/* Modal */}
      <InputForm
        isModalOpen={isModalOpen}
        handleModal={() => handleModal(false)}
        handleRefresh={() => handleRefresh()}
      />
    </div>
  );
}
