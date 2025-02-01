import React from "react";
import edit from "../assets/edit.svg";
import remove from "../assets/delete.png";

const TransactionList = ({
  transactions,
  setTransactions,
  onDeleteTransaction,
  onEdit,
}) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const handleClickDelete = (transactionId) => {
    fetch(
      ` /transactions/${transactionId}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete transaction");
        }
        return response.json();
      })
      .then(() => onDeleteTransaction(transactionId))
      .catch((error) => console.error("Error deleting transaction", error));
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const { transaction_type, category, date } = transaction;
    const searchText = searchTerm.toLowerCase();
    return (
      transaction_type.toLowerCase().includes(searchText) ||
      category.toLowerCase().includes(searchText) ||
      date.includes(searchText)
    );
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const transactionsToRender = filteredTransactions.map((transaction) => {
    return (
      <tr key={transaction.id}>
        <td>{transaction.transaction_type}</td>
        <td>{transaction.category}</td>
        <td>{transaction.date}</td>
        <td>{transaction.amount}</td>
        <td>{transaction.description}</td>
        <td>
          <button className="btn-image-btn">
            <img
              src={edit}
              alt="edit-icon"
              className="btn-image"
              onClick={() => onEdit(transaction)}
            />
          </button>
        </td>
        <td>
          <button className="btn-image-btn">
            <img
              src={remove}
              alt="delete-icon"
              className="btn-image"
              onClick={() => handleClickDelete(transaction.id)}
            />
          </button>
        </td>
      </tr>
    );
  });
  return (
    <section className="not-header">
      <div className="table-container">
        <form className="search-transactions-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchTerm}
            placeholder="Search for transactions"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Category</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>{transactionsToRender}</tbody>
        </table>
      </div>
    </section>
  );
};

export default TransactionList;
