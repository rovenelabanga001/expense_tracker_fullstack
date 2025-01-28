import React from "react";

const RecentTransactions = ({ transactions }) => {
  const recentTransactions = transactions.slice(-5);
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
            {recentTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.category}</td>
                <td>{transaction.description}</td>
                <td>{transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RecentTransactions;
