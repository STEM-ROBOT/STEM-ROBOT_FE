import React, { useState, useEffect } from 'react';
import { FaPencilAlt, FaUsers, FaHeart, FaFlag, FaAngleLeft, FaAngleRight, FaTableTennis } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom'; // Import navigation and location hooks
import './ManageTournament.css';
import TournamentList from '../TournamentList/TournamentList';

const ManageTournament = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation(); 

  const sidebarItems = [
    { key: "my-tournament", icon: <FaPencilAlt />, label: "Giải đấu đã tạo", component: <TournamentList /> },
    { key: "assigned", icon: <FaUsers />, label: "Được phân công", component: <div>Component for Được phân công</div> },
    { key: "interested", icon: <FaHeart />, label: "Đang quan tâm", component: <div>Component for Đang quan tâm</div> },
    { key: "participating", icon: <FaFlag />, label: "Đang tham gia", component: <div>Component for Đang tham gia</div> },
  ];

  
  const [activeItem, setActiveItem] = useState("created"); 

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClick = (key) => {
    setActiveItem(key);
    navigate(`/account/${key}`); 
  };

  useEffect(() => {
    const currentPath = location.pathname.split("/").pop();
    setActiveItem(currentPath);
  }, [location.pathname]);

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
              {isSidebarOpen && <span className="sidebar-title">{item.label}</span>}
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
