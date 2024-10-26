import React from "react";
import "./SearchFilter.css";
import { IoSearch } from "react-icons/io5";
const SearchFilter = () => {
  return (
    <div className="search_container">
      <div className="search_filter">
        <div className="search_input_container">
          <input
            type="text"
            placeholder="Tên giải đấu"
            className="search_input"
          />
          <div className="btn_search">
            <IoSearch className="icon_search" />
          </div>
        </div>

        <div className="filter_select_container">
          <select className="filter_select">
            <option>Loại giải</option>
          </select>
          <select className="filter_select">
            <option>Nội Dung Thi</option>
          </select>
          <select className="filter_select">
            <option>Xắp Xếp</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
