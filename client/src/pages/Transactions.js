import React from "react";
import TransactionsForm from "../components/TransactionsForm";
import TransactionList from "../components/TransactionList";
import { useOutletContext } from "react-router-dom";
import EditTransactionModal from "../components/EditTransactionModal";
import TransactionSummary from "../components/TransactionSummary";

const Transactions = () => {
  const {
    transactions,
    setTransactions,
    handleAddTransaction,
    handleDeleteTransaction,
    handleEditTransaction,
  } = useOutletContext();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [transactionToEdit, setTransactionToEdit] = React.useState(null);

  const openEditModal = (transaction) => {
    setTransactionToEdit(transaction);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setTransactionToEdit(null);
  };
  return (
    <>
      {transactions ? (
        <>
          <TransactionsForm
            transactions={transactions}
            onAddTransaction={handleAddTransaction}
          />
          <TransactionList
            transactions={transactions}
            onDeleteTransaction={handleDeleteTransaction}
            onEdit={openEditModal}
          />
          {isModalOpen && (
            <EditTransactionModal
              transaction={transactionToEdit}
              onClose={closeEditModal}
              onSave={handleEditTransaction}
            />
          )}
          <TransactionSummary transactions={transactions}/>
        </>
      ) : (
        <p>Loading transactions</p>
      )}
    </>
  );
};

export default Transactions;
