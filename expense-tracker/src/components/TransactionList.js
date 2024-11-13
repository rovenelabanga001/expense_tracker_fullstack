import React from "react";
import edit from "../assets/edit.svg";
import remove from "../assets/delete.png";

const TransactionList = ({
  transactions,
  setTransactions,
  onDeleteTransaction,
  onEdit,
}) => {
  const handleClickDelete = (transactionId) => {
    fetch(`http://127.0.0.1:3001/transactions/${transactionId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete transaction");
        }
        return response.json();
      })
      .then(() => onDeleteTransaction(transactionId))
      .catch((error) => console.error("Error deleting transaction", error));
  };

  const handleClickEdit = (transaction) => {
    onEdit(transaction);
  };
  const transactionsToRender = transactions.map((transaction) => {
    console.log(transaction.id);
    return (
      <tr key={transaction.id}>
        <td>{transaction.type}</td>
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
              onClick={() => handleClickEdit(transaction)}
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
