import React from "react";
import Welcome from "./Welcome";
import RecentTransactions from "./RecentTransactions";
import WeeklyExpenseChart from "./WeeklyExpenseChart";

const Dashboard = ({ transactions }) => {
  return (
    <main>
      <Welcome />
      <WeeklyExpenseChart transactions={transactions} />
      <RecentTransactions transactions={transactions} />
    </main>
  );
};

export default Dashboard;
