import React from "react";
import Welcome from "./Welcome";
import Category from "./Category";
import RecentTransactions from "./RecentTransactions";

const Dashboard = () => {
  return (
    <>
      <section className="not-header">
        <Welcome />
      </section>
      <section className=" not-header">
        <Category />
      </section>
        <RecentTransactions />
    </>
  );
};

export default Dashboard;
