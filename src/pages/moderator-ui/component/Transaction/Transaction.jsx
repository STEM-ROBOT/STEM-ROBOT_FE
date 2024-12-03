import React, { useEffect, useState } from "react";
import "./Transaction.css";
import api from "../../../../config";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", options);
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const ITEMS_PER_PAGE = 5; // Số lượng giao dịch trên mỗi trang

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại

  useEffect(() => {
    api
      .get(`/api/orders/byAccountId`)
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          setTransactions(response.data);
        } else {
          console.error("Data format is unexpected:", response.data);
          setTransactions([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching available contestants:", error);
        setTransactions([]);
      });
  }, []);

  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE); // Tổng số trang

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const currentData = transactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="transaction-container">
      <table className="transaction-table">
        <thead className="transaction-thead">
          <tr>
            <th>Mã Giao Dịch</th>
            <th>Tên Gói</th>
            <th>Ngày Thanh Toán</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody className="transaction-tbody">
          {currentData.map((transaction, index) => (
            <tr key={index} className="transaction-row">
              <td># {transaction.id}</td>
              <td>{transaction.packageName}</td>
              <td>{formatDate(transaction.orderDate)}</td>
              <td>{formatCurrency(transaction.amount)}</td>
              <td>
                <span
                  className={`transaction-status-badge ${
                    transaction.status === "Fail"
                      ? "transaction-status-fail"
                      : transaction.status === "Success"
                      ? "transaction-status-success"
                      : "transaction-status-fail"
                  }`}
                >
                  {transaction.status === "Success" ? "Thành Công" : "Thất bại"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Phân trang */}
      <div className="pagination">
        <button
          className="pagination-button"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          &laquo; Trang trước
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`pagination-button ${
              currentPage === index + 1 ? "active" : ""
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="pagination-button"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Trang sau &raquo;
        </button>
      </div>
    </div>
  );
};

export default Transaction;
