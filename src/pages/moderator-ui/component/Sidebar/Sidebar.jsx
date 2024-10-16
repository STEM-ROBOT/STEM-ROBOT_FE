import React from 'react';
import { FaQuestionCircle, FaBell, FaHistory, FaCogs, FaShieldAlt, FaUsers, FaLayerGroup, FaCalendarAlt, FaFileAlt, FaSitemap, FaMoneyBill } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
    const menuItems = [                   
        { label: "Cấu hình giải đấu", icon: <FaCogs /> },
        { label: "Trạng thái", icon: <FaShieldAlt /> },
        { label: "Phân quyền", icon: <FaUsers /> },
        { label: "Quản lý đội", icon: <FaLayerGroup /> },
        { label: "Sắp xếp cặp đấu", icon: <FaLayerGroup /> },
        { label: "Quản lý lịch đấu", icon: <FaCalendarAlt /> },     
        { label: "Ban tổ chức", icon: <FaSitemap /> },
        { label: "Nhà tài trợ", icon: <FaMoneyBill /> },
    ];

    return (
        <div className="sidebar">
            <ul>
                {menuItems.map((item, index) => (
                    <li key={index} className={index === 0 ? 'active' : ''}>
                        {item.icon} <span>{item.label}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
