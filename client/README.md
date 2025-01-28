# Expense Tracker App

This is an Expense Tracker application built with React that allows users to manage and track their financial transactions. The app helps users monitor their expenses, add new transactions, update or delete existing transactions, and view a graphical summary of their financial data.

## Features

The app provides the following functionalities:

- **Add a Transaction**: Users can add new transactions to track their expenses.
- **Delete a Transaction**: Users can delete transactions they no longer need.
- **Edit a Transaction**: Users can edit the details of an existing transaction.
- **Search for Transactions**: Users can search for transactions by various criteria (e.g., date, amount, description).
- **Display Transactions in a Graph**: The app visualizes transaction data in the form of graphs, making it easier for users to see their spending patterns.
- **Summary of Transactions**: Users can view a summary of their transactions, including total income, total expenses, and remaining balance.
- **User Authentication**: Users can sign up, log in, and have their own personalized transaction dashboard.

## Technology Stack

- **Frontend**: React.js
- **Backend**: JSON Server (db.json for data storage)

## How It Works

This application uses a `db.json` file to store both user and transaction data in the backend. The app interacts with this file through API calls (GET, POST, PATCH, DELETE).

The `db.json` file simulates a simple database for user authentication and transaction management.

### Endpoints

- **Users Endpoint**: `/users`

  - `GET /users`: Retrieve all users
  - `POST /users`: Create a new user (sign up)
  - `GET /users/:id`: Retrieve a specific user by their ID
  - `PATCH /users/:id`: Update a user's details
  - `DELETE /users/:id`: Delete a user

- **Transactions Endpoint**: `/transactions`
  - `GET /transactions`: Retrieve all transactions
  - `POST /transactions`: Create a new transaction
  - `GET /transactions/:id`: Retrieve a specific transaction by its ID
  - `PATCH /transactions/:id`: Update a transaction
  - `DELETE /transactions/:id`: Delete a transaction
## Installation

Install my-project with npm

```bash
  npm install 
  cd expense-tracker
```
    

## Authors

- [Rovenel Abanga](https://github.com/rovenelabanga001)

