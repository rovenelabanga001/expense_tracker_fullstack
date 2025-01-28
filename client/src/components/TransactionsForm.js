import React from "react";

const TransactonsForm = ({ onAddTransaction }) => {
  const [formData, setFormData] = React.useState({
    type: "",
    category: "",
    date: "",
    amount: "",
    description: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      type: formData.type,
      category: formData.category,
      date: formData.date,
      amount: formData.amount,
      description: formData.description,
    };

    fetch(" https://expense-tracker-z3wf.onrender.com/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newTransaction),
    })
      .then((response) => response.json())
      .then((data) => {
        onAddTransaction(data);
        setFormData({
          type: "",
          category: "",
          date: "",
          amount: "",
          description: "",
        });
      });
  };
  return (
    <section className="not-header">
      <div className="transaction-form-container">
        <h3 className="heading-big">Add Transaction</h3>
        <form
          className="transaction-form"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <select
            name="type"
            value={formData.type}
            onChange={handleOnChange}
            required
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
            id="category"
            value={formData.category}
            placeholder="Category"
            onChange={handleOnChange}
            required
          />
          <input
            type="date"
            name="date"
            id="date"
            value={formData.date}
            placeholder="date"
            onChange={handleOnChange}
            required
          />
          <input
            type="number"
            name="amount"
            id="amount"
            value={formData.amount}
            placeholder="Amount in Ksh"
            onChange={handleOnChange}
            required
          />
          <textarea
            name="description"
            id="description"
            value={formData.description}
            placeholder="Description"
            onChange={handleOnChange}
            required
          />
          <button type="submit" className="btn">
            Add
          </button>
        </form>
      </div>
    </section>
  );
};

export default TransactonsForm;
