import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import { FaUsers, FaEye, FaHeart } from 'react-icons/fa';
import './TournamentHeader.css';

const TournamentHeader = () => {
  const { tournamentId, competitionId } = useParams(); 
  const tabs = [
    // { name: "TIN CHUNG", key: "dashboard" },
    // { name: "LỊCH THI ĐẤU", key: "schedule" },
    // { name: "ĐỘI THI ĐẤU", key: "teammatch" },
    { name: "TÙY CHỈNH", key: "customize" },
  ];

  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab.key);
    navigate(`/mytournament/${tournamentId}/mycompetition/${competitionId}/${tab.key}`); 
  };

  return (
    <div className="tournaments-header-outer">
      <div className="tournaments-header-container">
        <div className='tournaments-header-content'>
          <div className="tournaments-headers">
            <div className="tournaments-image">
              <img src="https://cdn.ketnoibongda.vn/upload/images/z2375109156954_20640964dfc1fcec8273197669fdc5c4(2)(1).jpg" alt="Tournament" />
            </div>
            <div className="tournaments-detail">
              <h2>World Cup 2024</h2>
              <p>Loại Trực Tiếp || Bóng Bàn || Thành Lê Đình || Qatar</p>
              <div className="tournaments-stats">
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
