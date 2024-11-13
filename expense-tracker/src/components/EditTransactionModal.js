import React from "react";
import "./EditTransactionModal.css";

const EditTransactionModal = ({ transaction, isOpen, onClose, onSave }) => {
  const [editedTransaction, setEditedTransaction] = React.useState(transaction);

  React.useEffect(() => {
    setEditedTransaction(transaction);
  }, [transaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTransaction({ ...editedTransaction, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedTransaction);
    onClose();
  };
  const handleCloseClick = () => {
    onClose();
  };
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="heading big">Edit Transaction</h2>
        <form onSubmit={handleSubmit}>
          <select
            value={editedTransaction.type}
            name="type"
            onChange={handleChange}
          >
            <option value="" disabled hidden>
              Transaction Type
            </option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={editedTransaction.category}
            onChange={handleChange}
          />
          <input
            type="date"
            name="date"
            value={editedTransaction.date}
            onChange={handleChange}
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={editedTransaction.amount}
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Category"
            value={editedTransaction.description}
            onChange={handleChange}
          />
          <div className="buttons">
          <button type="submit" className="btn">
            Save
          </button>
          <button type="button" className="btn" onClick={handleCloseClick}>
            Close
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTransactionModal;
