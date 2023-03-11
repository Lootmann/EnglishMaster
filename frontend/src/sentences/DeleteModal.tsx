import React from "react";

export function DeleteModal({
  isModalOpen,
  handleModal,
  handleDelete,
}: DeleteModelType) {
  return (
    <>
      {isModalOpen && (
        <div
          className="absolute flex inset-0 bg-black bg-opacity-40 h-screen w-full"
          onClick={() => handleModal(false)}
        >
          <div
            className="flex flex-col relative top-24 left-60 h-1/5 w-1/5 gap-2 p-4 bg-slate-400 border-b rounded-md text-slate-800 text-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl">Are you sure to delete this D:</h2>

              <input
                type="submit"
                value="Delete"
                className="text-2xl px-2 py-1 bg-red-600 hover:bg-red-500 hover:text-black text-slate-50 rounded-md transition-all duration-200"
                onClick={(e) => handleDelete(e)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
