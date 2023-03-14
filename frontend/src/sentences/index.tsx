import axios from "axios";
import { Aggregates } from "./Aggregates";
import { API_URL, LIMIT } from "../utils/settings";
import { InputForm } from "../components/InputForm";
import { SentenceTable } from "./SentenceTable";
import { useEffect, useState } from "react";

export function Index() {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  function handleModal(isOpened: boolean) {
    setModalOpen(isOpened);
  }

  const [refresh, setRefresh] = useState<boolean>(false);
  function handleRefresh() {
    setRefresh(!refresh);
  }

  const [paginationCurrentPage, setPaginationCurrentPage] = useState<number>(0);
  const [itemNumbers, setItemNumbers] = useState<number[]>([]);
  function handleClickPagination(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    num: number
  ) {
    e.preventDefault();
    setPaginationCurrentPage(num);
    handleRefresh();
  }

  useEffect(() => {
    // TODO: this api gets all sentences that has tons of CounterModels - very poor performance
    // TODO: get just number of sentences
    axios.get(API_URL + "/sentences").then((resp) => {
      // setSentenceCount(resp.data.length);
      const nums: number[] = [];
      for (let i = 0; i < resp.data.length / LIMIT; i++) {
        nums.push(i + 1);
      }
      setItemNumbers(nums);
    });
  }, [paginationCurrentPage]);

  return (
    <div className="h-full flex gap-2">
      {/* Left Column */}
      <div className="flex flex-col gap-2 flex-1 p-4 rounded-md text-2xl">
        <header className="flex items-baseline gap-6">
          <h2 className="text-3xl">Sencentes</h2>
          <button
            className="text-2xl bg-slate-600 hover:bg-green-700 px-2 rounded-md"
            onClick={() => handleModal(true)}
          >
            Create
          </button>
        </header>

        {/* SentenceTable Pagination */}
        <div className="flex-1 flex flex-col bg-slate-400 rounded-md p-2">
          {itemNumbers.length > 0 && (
            <div className="ml-auto mr-auto flex gap-2 text-slate-800">
              {itemNumbers.map((num) => (
                <button
                  key={num}
                  onClick={(e) => handleClickPagination(e, num)}
                  value={num}
                  className="bg-slate-300 hover:bg-blue-500 rounded-md px-2"
                >
                  {num}
                </button>
              ))}
            </div>
          )}

          <SentenceTable
            refresh={refresh}
            currentPage={paginationCurrentPage}
          />
        </div>
      </div>

      {/* Right Column */}
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
