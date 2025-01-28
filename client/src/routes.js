import React from "react";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import App from "./App";
import Login from "./pages/Login";

const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/transactions",
        element: <Transactions />,
      },
    ],
  },
];

export default routes;
