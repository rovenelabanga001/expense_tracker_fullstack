import React from "react";
import Dashboard from "../components/Dashboard";
import { useOutletContext } from "react-router-dom";

const Home = () => {
  const { transactions, setTransactions } = useOutletContext();
 
  return (
    <div>
      <main>
        <Dashboard />
      </main>
    </div>
  );
};

export default Home;
