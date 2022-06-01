import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { Provider, teamsTheme } from "@fluentui/react-northstar";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider theme={teamsTheme}>
    <App />
  </Provider>
);
