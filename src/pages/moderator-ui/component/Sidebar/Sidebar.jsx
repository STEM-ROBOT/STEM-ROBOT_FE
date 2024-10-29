import React from 'react';
import { FaCogs, FaShieldAlt, FaUsers, FaLayerGroup, FaCalendarAlt, FaSitemap, FaMoneyBill, FaTable  } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ activeItem, onMenuClick, isGroupStage }) => {
    const menuItems = [
        { key: "config", label: "Cấu hình nội dung", icon: <FaCogs /> },
        // { key: "status", label: "Trạng thái", icon: <FaShieldAlt /> },
        { key: "permissions", label: "Quản lí trọng tài", icon: <FaUsers /> },
        { key: "teams", label: "Quản lý đội", icon: <FaLayerGroup /> }, 
    ];

  
    if (isGroupStage) {
        menuItems.push({ key: "groupstage", label: "Quản lý bảng đấu", icon: <FaTable /> });
    }

    menuItems.push(
        { key: "matchups", label: "Sắp xếp cặp đấu", icon: <FaLayerGroup /> },
        { key: "schedule", label: "Sắp xếp lịch đấu", icon: <FaCalendarAlt /> },
        { key: "referee", label: "Sắp xếp trọng tài", icon: <FaLayerGroup /> },
     
        // { key: "organizers", label: "Ban tổ chức", icon: <FaSitemap /> },
        // { key: "sponsors", label: "Nhà tài trợ", icon: <FaMoneyBill /> }
    );

    return (
        <div className="sidebar">
            <ul>
                {menuItems.map((item, index) => (
                    <li 
                        key={index} 
                        className={activeItem === item.key ? 'active' : ''} 
                        onClick={() => onMenuClick(item.key)}
                    >
                        {item.icon} <span>{item.label}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
