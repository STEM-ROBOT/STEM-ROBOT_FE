import React, { useEffect, useState } from "react";
import "./DetailBar.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
const DetailBar = ({ league, setTabActive, tabActive }) => {
  const navigate = useNavigate();
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
  const progressPercentage =
    (league?.competitionActivateNumber / league?.competitionNumber) * 100;
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
            <div className={"league_status_level bar"}>
              CẤP {league?.tournamentLevel}
            </div>
            <div
              className="bar_detail"
              style={{
                marginBottom: "10px",
              }}
            >
              <span
                style={{
                  backgroundColor: "#fff",
                  color: "#024a70",
                  borderRadius: "7px",
                  padding: "0 5px",
                  marginBottom: "5px",
                }}
              >
                {league?.location}
              </span>
            </div>
            <div
              className={`league_detail`}
              style={{
                marginBottom: "10px",
              }}
            >
              <span
                style={{
                  backgroundColor: "#fff",
                  color: "#024a70",
                  borderRadius: "7px",
                  padding: "0 5px",
                }}
              >
                {league?.createDate?.replace("T", " ").slice(0, -3)}'
              </span>
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
          <div className={`progress_bar_container_detail`}>
            <div
              className={`progress_bar ${"list"}`}
              style={{
                border: "1px solid #000",
              }}
            >
              <div
                className={`progress_fill ${"list"}`}
                style={{
                  width: `${progressPercentage}%`,
                }}
              ></div>

              <div className={`progress_text ${"list"}`}>
                {league?.competitionActivateNumber} /{" "}
                {league?.competitionNumber}
              </div>
            </div>
            <div className={`progress_detail ${"list"}`}>
              Số nội dung thi đấu đã kích hoạt
            </div>
          </div>
        </div>
      </div>
      <div className="tab_navigation">
        {tabs.map((tab, i) => {        
          if (
            (tab.path === "register-contestant" &&
              league?.status !== "Public") ||
            (league?.status !== "Public" && tab.path === "team-list")
          ) {
            return null;
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
