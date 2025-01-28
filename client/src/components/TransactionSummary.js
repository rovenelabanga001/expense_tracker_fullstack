import React from "react";
import visibilityOn from "../assets/visibility_on.png";
import visibilityOff from "../assets/visibility_off.png";

const TransactionSummary = ({ transactions }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const totalIncome = transactions
    .filter((transaction) => transaction.type.toLowerCase() === "income")
    .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type.toLowerCase() === "expense")
    .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);

  const balance = totalIncome - totalExpenses;

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <section className="not-header transaction-summary-container">
      <h1 className="heading-big">Transactions Summary</h1>
      <button className="btn-image-btn" onClick={handleToggleVisibility}>
        <img
          src={isVisible ? visibilityOff : visibilityOn}
          alt="toggle-visibility-icon"
          className="btn-image"
        />
      </button>
      {isVisible && (
        <div className="transaction-summary">
          <h1>
            Income: <span>{totalIncome.toFixed(2)}</span>
          </h1>
          <h1>
            Expenses: <span>{totalExpenses.toFixed(2)}</span>
          </h1>
          <h1>
            Balance: <span className={balance < 0 ? "negative-balance":""}>{balance.toFixed(2)}</span>
          </h1>
        </div>
      )}
    </section>
  );
};

export default TransactionSummary;
