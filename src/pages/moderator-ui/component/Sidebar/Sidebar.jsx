import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCogs, FaUsers, FaLayerGroup, FaCalendarAlt, FaTable } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ activeItem, onMenuClick, isGroupStage }) => {
    const navigate = useNavigate();
    const menuItems = [
        { key: "format", label: "Cấu hình nội dung", icon: <FaCogs /> },
        { key: "permissions", label: "Quản lí trọng tài", icon: <FaUsers /> },
        { key: "teams", label: "Quản lý đội", icon: <FaLayerGroup /> },
        { key: "arena", label: "Quản lý sân đấu", icon: <FaLayerGroup /> },
    ];

    if (isGroupStage) {
        menuItems.push({ key: "groupstage", label: "Quản lý bảng đấu", icon: <FaTable /> });
    }

    menuItems.push(
        { key: "matchups", label: "Sắp xếp cặp đấu", icon: <FaLayerGroup /> },
        { key: "schedule", label: "Sắp xếp lịch đấu", icon: <FaCalendarAlt /> },
        { key: "referee", label: "Sắp xếp trọng tài", icon: <FaLayerGroup /> },
    );

    const handleMenuClick = (key) => {
        onMenuClick(key);
        navigate(key);
    };

    return (
        <div className="sidebar">
            <ul>
                {menuItems.map((item, index) => (
                    <li
                        key={index}
                        className={activeItem === item.key ? 'active' : ''}
                        onClick={() => handleMenuClick(item.key)}
                    >
                        {item.icon} <span>{item.label}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
