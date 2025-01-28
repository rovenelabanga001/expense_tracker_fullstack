import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Outlet, Navigate, useRoutes } from "react-router-dom";
import Login from "./pages/Login";
import routes from "./routes";

function App() {
  const [transactions, setTransactions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    () => JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );

  const handleAddTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  const handleDeleteTransaction = (transactionId) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== transactionId
    );
    setTransactions(updatedTransactions);
  };

  const handleEditTransaction = (updatedTransaction) => {
    fetch(
      `https://expense-tracker-z3wf.onrender.com/transactions/${updatedTransaction.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(updatedTransaction),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update transaction");
        }
        return response.json();
      })
      .then((updatedTransaction) => {
        setTransactions((prevTransactions) =>
          prevTransactions.map((transaction) =>
            transaction.id === updatedTransaction.id
              ? updatedTransaction
              : transaction
          )
        );
      })
      .catch((error) => console.error("Error updating transaction", error));
  };

  React.useEffect(() => {
    fetch("https://expense-tracker-z3wf.onrender.com/transactions")
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error getting transactions", error);
        setLoading(false);
      });
  }, []);

  React.useEffect(() => {
    // Update localStorage whenever isLoggedIn changes
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const PrivateRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/" />;
  };

  const routing = useRoutes(routes(setIsLoggedIn));
  return (
    <div className="App">
      <Navbar setIsLoggedIn={setIsLoggedIn} />
      {!isLoggedIn ? (
        <Login setIsLoggedIn={setIsLoggedIn} />
      ) : !loading ? (
        <Outlet
          context={{
            transactions,
            setTransactions,
            handleAddTransaction,
            handleDeleteTransaction,
            handleEditTransaction,
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
