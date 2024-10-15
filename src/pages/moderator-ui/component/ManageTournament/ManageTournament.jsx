import React, { useState } from 'react';
import { FaPencilAlt, FaUsers, FaHeart, FaFlag, FaAngleLeft, FaAngleRight, FaTableTennis } from 'react-icons/fa';
import './ManageTournament.css';
import TournamentList from '../TournamentList/TournamentList';

const ManageTournament = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("created");
  const sidebarItems = [
    { key: "created", icon: <FaPencilAlt />, label: "Giải đấu đã tạo", component: <TournamentList/> },
    { key: "assigned", icon: <FaUsers />, label: "Được phân công", component: <div>Component for Được phân công</div> },
    { key: "interested", icon: <FaHeart />, label: "Đang quan tâm", component: <div>Component for Đang quan tâm</div> },
    { key: "participating", icon: <FaFlag />, label: "Đang tham gia", component: <div>Component for Đang tham gia</div> },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClick = (key) => {
    setActiveItem(key);
  };

  const renderContent = () => {
    const activeComponent = sidebarItems.find(item => item.key === activeItem);
    return activeComponent ? activeComponent.component : null;
  };

  return (
    <div className="manage-tournament-container">
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {isSidebarOpen ? <FaAngleLeft /> : <FaAngleRight />}
        </button>
        <ul>
          {sidebarItems.map((item) => (
            <li
              key={item.key}
              className={activeItem === item.key ? 'active' : ''}
              onClick={() => handleSidebarClick(item.key)}
            >
              <span className="icon">{item.icon}</span> 
              <span className="sidebar-title">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default ManageTournament;