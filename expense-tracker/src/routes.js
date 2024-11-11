import React from "react";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import App from "./App";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/transactions",
    element: <Transactions />,
  },
];

export default routes;
