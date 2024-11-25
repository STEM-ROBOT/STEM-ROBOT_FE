import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaCogs, FaUsers, FaLayerGroup, FaCalendarAlt, FaTable, FaCheck } from 'react-icons/fa';
import './Sidebar.css';
import { useDispatch, useSelector } from 'react-redux';
import { getActive as fetchActiveFormat } from '../../../../redux/actions/FormatAction'; // Rename to avoid conflicts
import TokenService from '../../../../config/tokenservice';

const Sidebar = ({ activeItem, onMenuClick, isGroupStage }) => {
    console.log(isGroupStage)
    const navigate = useNavigate();
    const { competitionId } = useParams();
    const dispatch = useDispatch();
    const [activeIcon, setActiveIcon] = useState();

    
    const activeFormatData = useSelector((state) => state.getActiveFormat);
    const activeData = activeFormatData?.data?.data;
    TokenService.setFormatId(activeData?.formatId);

   
    useEffect(() => {
        dispatch(fetchActiveFormat(competitionId));
    }, [competitionId, dispatch]);

  
    useEffect(() => {
        setActiveIcon(activeData);
    }, [activeData]);

   
    const menuItems = [
        { key: "format", label: "Cấu hình nội dung", icon: <FaCogs />, isActive: activeIcon?.isFormat },
        { key: "teams", label: "Quản lý đội", icon: <FaLayerGroup />, isActive: activeIcon?.isTeam },
        { key: "arena", label: "Quản lý sân đấu", icon: <FaLayerGroup />, isActive: activeIcon?.isLocation },
    ];

   {
      isGroupStage === 2&&( menuItems.push({ key: "groupstage", label: "Quản lý bảng đấu", icon: <FaTable />, isActive: activeIcon?.isTable }))
   }
       
    

    menuItems.push(
        { key: "matchups", label: "Sắp xếp cặp đấu", icon: <FaLayerGroup />, isActive: activeIcon?.isTeamMatch },
        { key: "schedule", label: "Sắp xếp lịch đấu", icon: <FaCalendarAlt />, isActive: activeIcon?.isMatch },
        { key: "permissions", label: "Quản lí trọng tài", icon: <FaUsers />, isActive: activeIcon?.isReferee },
        { key: "referee", label: "Sắp xếp trọng tài", icon: <FaLayerGroup />, isActive: activeIcon?.isSchedule },
    );

    // Handle menu item click
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
                        {item.isActive && <FaCheck className="check-icon" />} {/* Add check icon */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
