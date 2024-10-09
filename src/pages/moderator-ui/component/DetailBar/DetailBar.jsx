import React, { Component, useState } from "react";
import "./DetailBar.css";
import Countdown from "../Countdown/Countdown";
const DetailBar = ({ setPageView }) => {
  const tabs = [
    { name: "ĐĂNG KÝ THI ĐẤU", key: "register", component: <Countdown endDate="2024-10-13T23:59:59" /> },
    { name: "NỘI DUNG THI ĐẤU", key: "competitions", component: <Countdown endDate="2024-10-13T23:59:59" /> },
    {
      name: "DANH SÁCH ĐĂNG KÝ",
      key: "participants",
      component: <Countdown endDate="2024-10-13T23:59:59"/>,
    },
  ];
  const [activeTab, setActiveTab] = useState("register");

  // Function to handle tab click
  const handleTabClick = (tab) => {
    setActiveTab(tab.key);
    setPageView(tab.component);
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

              {/* Tooltip for time left */}
              <div className="tooltip">
                <span>⏱️ Còn lại 11 ngày</span>
                <div className="tooltip_text">Thời gian đăng ký</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tab_navigation">
        {tabs.map((tab) => (
          <div
            key={tab.key}
            className={`tab_item ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab.name}
            {activeTab === tab.key && <div className="indicator"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailBar;
