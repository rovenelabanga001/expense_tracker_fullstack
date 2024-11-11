import React from "react";
import Welcome from "./Welcome";
import Category from "./Category";

const Dashboard = () => {
  return (
    <>
      <section className="welcome-container not-header">
        <Welcome />
      </section>
      <section className=" not-header">
        <Category />
      </section>
    </>
  );
};

export default Dashboard;
