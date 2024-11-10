import React, { useEffect, useState } from "react";
import "./SearchFilter.css";
import { IoSearch } from "react-icons/io5";
import api from "/src/config";
import {
  list_genner_filter,
  list_province_filter,
} from "../../api/ApiFlowView/ApiFlowView";

const SearchFilter = ({
  setLoadApi,
  search,
  setGennerId,
  setStatus,
  setProvinceCode,
  setSearch,
}) => {
  const [province, setProvince] = useState([]);
  const [geners, setGeners] = useState([]);

  useEffect(() => {
    api
      .get(list_province_filter)
      .then((response) => {
        const sortedProvinces = response.data.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setProvince(sortedProvinces);
      })
      .catch((error) => {
        console.log(error);
      });

    api
      .get(list_genner_filter)
      .then((response) => {
        const sortedGenner = response.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setGeners(sortedGenner);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Hàm xử lý sự kiện thay đổi cho các input và select
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setLoadApi(true);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setLoadApi(true);
  };

  const handleGennerChange = (e) => {
    setGennerId(e.target.value);
    setLoadApi(true);
  };

  const handleProvinceChange = (e) => {
    setProvinceCode(e.target.value);
    setLoadApi(true);
  };

  return (
    <div className="search_container">
      <div className="search_filter">
        <div className="search_input_container">
          <input
            type="text"
            placeholder="Tên giải đấu"
            className="search_input"
            value={search}
            onChange={handleSearchChange}
          />
          <div className="btn_search">
            <IoSearch className="icon_search" />
          </div>
        </div>

        <div className="filter_select_container">
          <select className="filter_select" onChange={handleStatusChange}>
            <option value="">Loại giải</option>
            <option value="public">Có mở đăng ký</option>
            <option value="private">Không mở đăng ký</option>
          </select>
          <select className="filter_select" onChange={handleGennerChange}>
            <option value="">Nội Dung Thi</option>
            {geners?.map((result) => (
              <option
                key={result.id}
                value={result.id}
                data-genner-id={result.id}
              >
                {result.name}
              </option>
            ))}
          </select>
          <select className="filter_select" onChange={handleProvinceChange}>
            <option value="">Khu vực</option>
            {province?.map((result) => (
              <option
                key={result.id}
                value={result.provinceCode}
                data-province-code={result.provinceCode}
              >
                {result.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
