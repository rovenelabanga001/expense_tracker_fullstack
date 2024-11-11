import React from "react";
import Home from "./pages/Home"
import Transactions from "./pages/Transactions"

const routes = [
    {
        path:"/",
        element: <Home />
    },
    {
        path:"/transactions",
        element: <Transactions />
    }
]

export default routes