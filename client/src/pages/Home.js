import React from "react";
import Dashboard from "../components/Dashboard";
import { useOutletContext } from "react-router-dom";
import TransactionSummary from "../components/TransactionSummary";

const Home = () => {
  const { transactions, setTransactions } = useOutletContext();
 
  return (
    <div>
        <Dashboard transactions={transactions} setTransactions={setTransactions} />
        <TransactionSummary transactions={transactions} />
    </div>
  );
};

export default Home;
