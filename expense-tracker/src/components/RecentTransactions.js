import React from "react";

const RecentTransactions = () => {
  return (
    <section className="not-header">
      <h1 className="heading-big">Recent Transactions</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Income</td>
              <td>November salary</td>
              <td>100000</td>
            </tr>
            <tr>
              <td>Income</td>
              <td>November salary</td>
              <td>100000</td>
            </tr>
            <tr>
              <td>Income</td>
              <td>November salary</td>
              <td>100000</td>
            </tr>
            <tr>
              <td>Income</td>
              <td>November salary</td>
              <td>100000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RecentTransactions;
