import React, { useState } from "react";
import "./DetailBar.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
const DetailBar = ({ id }) => {
  const endDate = new Date("2024-10-13T23:59:59");
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
    navigate(`/league/${id}/${tab.path}`, { state: { endDate } });
  };
  return (
    <div className="detail_bar">
      <div className="detail_bar_content">
        <div className="bar_content">
          <div className="bar_content_img">
            <img
              src="https://th.bing.com/th/id/OIP.7HSEMd30tk4S_tCOunvBXAHaEK?w=331&h=186&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt="League Image"
              className="bar_img"
            />
          </div>
          <div className="bar_content_info">
            <div className="bar_title">
              <span>ROBOCON THPT VIP PRO - 2024</span>
            </div>
            <div className="bar_detail">
              <span>
                Chia bảng đấu || Khu công nghiệp Quốc tế Protrade, Đường tỉnh
                744, An Tây, Bến Cát, Bình Dương, Việt Nam
              </span>
            </div>
            <div className="bar_stats">
              <div className="tooltip">
                <span>👥 14</span>
                <div className="tooltip_text">Số đội trong giải</div>
              </div>

              {/* Tooltip for views */}
              <div className="tooltip">
                <span>👁️ 191</span>
                <div className="tooltip_text">Lượt xem</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tab_navigation">
        {tabs.map((tab, i) => (
          <div
            key={i}
            className={`tab_item ${
              currentSubPath === tab.path ? "active" : ""
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab.name}
            {currentSubPath === tab.path && <div className="indicator"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailBar;
