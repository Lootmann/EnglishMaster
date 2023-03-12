import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../utils/settings";
import { Link } from "react-router-dom";

export function Pagination({ currentId }: { currentId: number }) {
  const [neighbors, setNeighbors] = useState<SentenceNeighborType>({
    nextId: 0,
    previousId: 0,
  });

  useEffect(() => {
    if (currentId !== undefined)
      axios.get(API_URL + `/sentences/${currentId}/neighbors`).then((resp) => {
        setNeighbors({
          nextId: resp.data.next_id,
          previousId: resp.data.previous_id,
        });
      });
  }, [currentId]);

  return (
    <>
      {neighbors.previousId !== null && neighbors.previousId !== 0 ? (
        <Link
          to={`/sentences/${neighbors.previousId}`}
          className="text-2xl bg-yellow-800 px-2 rounded-md"
        >
          Previous ({neighbors.previousId})
        </Link>
      ) : (
        <div className="text-2xl px-2 rounded-md">D:</div>
      )}

      {/* Next */}
      {neighbors.nextId !== null && neighbors.nextId !== 0 ? (
        <Link
          to={`/sentences/${neighbors.nextId}`}
          className="text-2xl bg-yellow-800 px-2 rounded-md"
        >
          Next ({neighbors.nextId})
        </Link>
      ) : (
        <div className="text-2xl px-2 rounded-md">D:</div>
      )}
    </>
  );
}
