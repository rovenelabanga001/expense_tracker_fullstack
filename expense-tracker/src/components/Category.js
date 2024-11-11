import React from "react";

const Category = () => {
  return (
    <div className="category-by-type">
      <h1 className="heading-big">Filter Transactions</h1>
      <div className="buttons">
        <button className="btn">Income</button>
        <button className="btn">Expenses</button>
      </div>
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
