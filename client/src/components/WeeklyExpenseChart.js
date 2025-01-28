import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const WeeklyExpenseChart = ({ transactions }) => {
  // Get today's date and the date for 7 days ago
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7); // Subtract 7 days from today

  // Filter the transactions to get only expenses from the past 7 days
  const expenseTransactions = transactions
    .filter(
      (transaction) =>
        transaction.type.toLowerCase() === "expense" &&
        new Date(transaction.date) >= sevenDaysAgo // Filter by date within the last 7 days
    )
    .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date

  // Map the dates, amounts, and categories for the filtered transactions
  const dates = expenseTransactions.map((transaction) => transaction.date);
  const amounts = expenseTransactions.map((transaction) =>
    parseFloat(transaction.amount)
  );
  const categories = expenseTransactions.map(
    (transaction) => transaction.category
  );

  // Define the data object for the chart
  const data = {
    labels: dates, // Dates for the x-axis labels
    datasets: [
      {
        label: "Expenses", // Label for the dataset
        data: amounts, // Data for the y-axis (amounts)
        backgroundColor: "rgb(3, 22, 38)", // Bar color
        borderColor: "rgb(3, 22, 38)", // Border color for the bars
        borderWidth: 1, // Border width
      },
    ],
  };

  // Define the chart options with customized tooltips
  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Date", // Label for the x-axis
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount (Ksh)", // Label for the y-axis
        },
        beginAtZero: true, // Start the y-axis at 0
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Weekly Expenses", // Chart title
      },
      tooltip: {
        callbacks: {
          // Custom label for the tooltip
          label: function (tooltipItem) {
            const amount = tooltipItem.raw; // Amount for the hovered bar
            const date = tooltipItem.label; // Date for the hovered bar
            const category = categories[tooltipItem.dataIndex]; // Category for the hovered bar
            // Return custom information to display in the tooltip
            return ` ${category} : Ksh ${amount.toFixed(
              2
            )}`;
          },
        },
      },
    },
  };

  // Render the chart
  return (
    <section className="not-header">
      <Bar data={data} options={options} />
    </section>
  );
};

export default WeeklyExpenseChart;
