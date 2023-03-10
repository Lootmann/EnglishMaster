import React from "react";

import InputForm from "./InputForm";
import ShowSentence from "./ShowSentece";

export function Index() {
  const [isModalOpen, setModalOpen] = React.useState<boolean>(false);
  function handleModal(isOpened: boolean) {
    setModalOpen(isOpened);
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

        <div className="flex-1 bg-slate-500 rounded-md p-2">
          <ShowSentence />
        </div>
      </div>

      <div className="flex-1 p-4 rounded-md">
        <h2 className="text-2xl">Aggreates</h2>
      </div>

      {/* Modal */}
      <InputForm
        isModalOpen={isModalOpen}
        handleModal={() => handleModal(false)}
      />
    </div>
  );
}
