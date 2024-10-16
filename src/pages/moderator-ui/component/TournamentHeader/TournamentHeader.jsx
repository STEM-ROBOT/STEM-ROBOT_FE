import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams to get tournament ID
import { FaUsers, FaEye, FaHeart } from 'react-icons/fa';
import './TournamentHeader.css';

const TournamentHeader = () => {
  const { id } = useParams(); // Get the tournament ID from URL params
  const tabs = [
    { name: "TIN CHUNG", key: "dashboard" },
    { name: "LỊCH THI ĐẤU", key: "schedule" },
    { name: "BẢNG XẾP HẠNG", key: "ranking" },
    { name: "TÙY CHỈNH", key: "customize" },
  ];

  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab.key);
    navigate(`/competition/${id}/${tab.key}`);
  };

  return (
    <div className="tournament-header-outer">
      <div className="tournament-header-container">
        <div className='tournament-header-content'>
          <div className="tournament-header">
            <div className="tournament-image">
              <img src="your-image-url" alt="Tournament" />
            </div>
            <div className="tournament-details">
              <h2>World Cup 2024</h2>
              <p>Loại Trực Tiếp || Bóng Bàn || Thành Lê Đình || Qatar</p>
              <div className="tournament-stats">
                <span><FaUsers /> 3 Đội</span>
                <span><FaEye /> 0 lượt xem</span>
                <FaHeart className="favorite-icon" />
              </div>
            </div>
            <div className="activation-section">
              <button className="activate-button">Kích hoạt</button>
              <div className="progress-bar">
                <span>0 / 2</span>
              </div>
            </div>
          </div>
          <div className="tab-navigation">
            {tabs.map((tab) => (
              <div
                key={tab.key}
                className={`tab-item ${activeTab === tab.key ? "active" : ""}`}
                onClick={() => handleTabClick(tab)}
              >
                {tab.name}
                {activeTab === tab.key && <div className="indicator"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentHeader;
