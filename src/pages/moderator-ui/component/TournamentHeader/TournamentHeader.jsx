import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import { FaUsers, FaEye, FaHeart } from 'react-icons/fa';
import './TournamentHeader.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCompetitionInfo } from '../../../../redux/actions/CompetitionAction';

const TournamentHeader = () => {
  const { tournamentId, competitionId } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabs = [
    { name: "TÙY CHỈNH", key: "customize" },
  ];

  // Lấy thông tin từ Redux store
  const competitionInfo = useSelector((state) => state.infoCompetition?.infoCompetition?.data);
  const loading = useSelector((state) => state.infoTournament.loading);
  const error = useSelector((state) => state.infoTournament.error);

  useEffect(() => {
      if (competitionId) {
          dispatch(getCompetitionInfo(competitionId));
      }
  }, [competitionId, dispatch]);

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
              <img
                src={competitionInfo?.image || "https://ohstem.vn/wp-content/uploads/2022/01/lap-trinh-thi-dau-robot-1024x768.jpg"} // Hiển thị ảnh từ API hoặc ảnh mặc định
                alt={competitionInfo?.name || "Tournament"}
              />
            </div>
            <div className="tournaments-detail">
              <h2>{competitionInfo?.tournamentName || "Tournament Name"}</h2>
              <p>
                {competitionInfo?.name || "Loại Trực Tiếp"} || {competitionInfo?.location || "Location"}
              </p>
              <div className="tournaments-stats">
                <span><FaUsers /> {competitionInfo?.numberTeam || 0} Đội</span>
                {/* <span><FaEye /> 0 lượt xem</span>
                <FaHeart className="favorite-icon" /> */}
              </div>
            </div>
            <div className="activation-section">
              <button className="activate-button">Kích hoạt</button>
              <div className="progress-bar">
                <span>0 / 2</span>
              </div>
            </div>
          </div>

          {/* Điều hướng Tab */}
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
