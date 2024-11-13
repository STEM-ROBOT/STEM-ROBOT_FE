import React, { useEffect, useState } from "react";
import "./DetailBar.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
const DetailBar = ({ league, setTabActive, tabActive }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentSubPath = location.pathname.split("/").pop();
  const tabs = [
    {
      name: "NỘI DUNG THI ĐẤU",
      path: "competition",
    },
    {
      name: "ĐĂNG KÝ THÍ SINH",
      path: "register-contestant",
    },
    {
      name: "DANH SÁCH THAM GIA",
      path: "team-list",
    },
  ];
  const handleTabClick = (tab) => {
    setTabActive(tab.path);
    navigate(`${tab.path}`);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="detail_bar">
      <div className="detail_bar_content">
        <div
          className="back_view_leagues"
          onClick={() => {
            navigate("/league");
          }}
        >
          <BiLogOutCircle className="back_view_leagues_icon" /> Trở lại
        </div>
        <div className="bar_content">
          <div className="bar_content_img">
            <img src={league?.image} className="bar_img" />
          </div>
          <div className="bar_content_info">
            <div className="bar_title">
              <span>{league?.name}</span>
            </div>
            <div className="bar_detail">
              <span>{league?.location}</span>
            </div>
            <div className="bar_stats">
              <div className="tooltip">
                <span>👥 {league?.contestant}</span>
                <div className="tooltip_text"> Số thí sinh trong giải</div>
              </div>

              {/* Tooltip for views */}
              <div className="tooltip">
                <span>👁️ {league?.views}</span>
                <div className="tooltip_text">Lượt xem</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tab_navigation">
        {tabs.map((tab, i) => {
          // Kiểm tra điều kiện để hiển thị tab "ĐĂNG KÝ THÍ SINH"
          if (
            tab.path === "register-contestant" &&
            league?.status !== "Public"
          ) {
            return null; // Không render tab nếu điều kiện không phù hợp
          }

          return (
            <div
              key={i}
              className={`tab_item ${tabActive === tab.path ? "active" : ""}`}
              onClick={() => handleTabClick(tab)}
            >
              {tab.name}
              {tabActive === tab.path && <div className="indicator"></div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailBar;
