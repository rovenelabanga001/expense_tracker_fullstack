import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  const [transactions, setTransactions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
 
  const handleAddTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  const handleDeleteTransaction = (transactionId) => {
    const updatedTransactions = transactions.filter((transaction) => {
      return transaction.id !== transactionId;
    });

    setTransactions(updatedTransactions);
  };

  const handleEditTransaction = (updatedTransaction) => {
    setTransactions((prevTransactions) => {
      prevTransactions.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction
      );
    });
  };

 
  React.useEffect(() => {
    fetch("http://127.0.0.1:3001/transactions")
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

  return (
    <div className="App">
      <Navbar />
      {!loading ? (
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
