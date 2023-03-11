import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Index } from "./sentences";
import { SentenceRandom } from "./sentences/SentenceRandom";
import "./styles/index.css";

import {
  loader as DetailSentenceLoader,
  SentenceDetail,
} from "./sentences/SentenceDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/sentences",
        element: <Index />,
      },
      {
        path: "/sentences/random",
        element: <SentenceRandom />,
      },
      {
        path: "/sentences/:sentenceId",
        element: <SentenceDetail />,
        loader: DetailSentenceLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
