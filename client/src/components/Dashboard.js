import React from "react";
import Welcome from "./Welcome";
import RecentTransactions from "./RecentTransactions";
import WeeklyExpenseChart from "./WeeklyExpenseChart";

const Dashboard = ({ transactions, user }) => {
  return (
    <main>
      <Welcome user={user}/>
      <WeeklyExpenseChart transactions={transactions} />
      <RecentTransactions transactions={transactions} />
    </main>
  );
};

export default Dashboard;
