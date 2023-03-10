import React from "react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <div className="flex flex-col items-center w-36 py-4 bg-slate-800">
      <h1 className="text-2xl mb-4">
        <Link to={`/`}>Header</Link>
      </h1>

      <Link
        to={`random`}
        className="text-xl hover:bg-green-800 px-1 rounded-md"
      >
        Random
      </Link>
    </div>
  );
}
