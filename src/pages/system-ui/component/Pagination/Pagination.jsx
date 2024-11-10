import React from "react";
import "./Pagination.css";
import { IoCaretBackCircleSharp, IoCaretForwardCircle } from "react-icons/io5";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <div className="pagination-container">
      <button
        className="pagination-arrow"
        disabled={currentPage === 1}
        onClick={() => handlePageClick(currentPage - 1)}
      >
        <IoCaretBackCircleSharp className="icon_next_page_view" />
      </button>
      {getPageNumbers().map((page, index) => (
        <div
          key={index}
          className={`pagination-number ${
            page === currentPage ? "active" : ""
          }`}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </div>
      ))}
      <button
        className="pagination-arrow"
        disabled={currentPage === totalPages}
        onClick={() => handlePageClick(currentPage + 1)}
      >
        <IoCaretForwardCircle className="icon_next_page_view" />
      </button>
    </div>
  );
};

export default Pagination;
