import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";
import Login from "./pages/Login";
import routes from "./routes";

function App() {
  const [transactions, setTransactions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(null)
  const [isLoggedIn, setIsLoggedIn] = React.useState(() => {
    try {
      const storedValue = localStorage.getItem("isLoggedIn");
      return storedValue ? JSON.parse(storedValue) : false;
    } catch (error) {
      console.error("Error parsing isLoggedIn from localStorage", error);
      return false;
    }
  });
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    setIsLoggedIn(!!user);
  }, [user]);

  useEffect(() => {
    if (user) {
      const fetchTransactions = async () => {
        try {
          const response = await fetch(`/users/${user.id}/transactions`);
          if (!response.ok) throw new Error("Failed to fetch transactions");
          const data = await response.json();
          setTransactions(data);
        } catch (error) {
          console.error("Error fetching transactions", error);
        } finally {
          setLoading(false);
        }
      };

      fetchTransactions();
    }
  }, [user]);

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
    fetch(`/transactions/${updatedTransaction.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(updatedTransaction),
    })
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

  // React.useEffect(() => {
  //   fetch("/transactions")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data)
  //       setTransactions(data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error getting transactions", error);
  //       setLoading(false);
  //     });
  // }, []);

  React.useEffect(() => {
    // Update localStorage whenever isLoggedIn changes
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const PrivateRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/" />;
  };

  const routing = useRoutes(routes);
  return (
    <div className="App">
      <Navbar setIsLoggedIn={setIsLoggedIn} />
      {!isLoggedIn ? (
        <Login setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>
      ) : !loading ? (
        <Outlet
          context={{
            user,
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
