import React, { useState } from "react";

import logoImg from "~/assets/images/logo-dask.png";
import { IoSettingsSharp } from "react-icons/io5";
import { MdManageAccounts, MdOutlineDashboard } from "react-icons/md";
import { AiOutlineDeliveredProcedure, AiOutlineUsergroupAdd } from "react-icons/ai";
import { GrScorecard } from "react-icons/gr";
import { FaBox, FaCalendarMinus, FaChartPie, FaShoppingCart, FaSignOutAlt, FaTrophy } from "react-icons/fa";
import audio from "~/assets/tp--theres-no-one-at-all-another-version--karaoke-beat-intrumental--prod-sơn-seven.mp3";
import './SidebarAdmin.css'
import { useNavigate } from "react-router-dom";


const actionReferee = [
  {
    key: "Dashboard",
    path: "dashboard",
    label: "Thống kê",
    icon: <MdOutlineDashboard className="admin_sidebar_action_icon" />,
  },
  {
    key: "Create-tournament",
    path: "create-tournament",
    label: "Quản lý giải đấu",
    icon: <FaTrophy className="admin_sidebar_action_icon" />,
  },
  {
    key: "Manage-user",
    path: "manage-user",
    label: "Quản lý người dùng",
    icon: <AiOutlineUsergroupAdd className="admin_sidebar_action_icon" />,
  },
  {
    key: "Manage-package",
    path: "manage-package",
    label: "Quản lý gói",
    icon: <FaBox className="admin_sidebar_action_icon" />,
  },
  {
    key: "Manage-order",
    path: "manage-order",
    label: "Quản lý đơn hàng",
    icon: <FaShoppingCart className="admin_sidebar_action_icon" />,
  },
  {
    key: "Manage-genre",
    path: "manage-genre",
    label: "Quản lý nội dung thi đấu",
    icon: <FaChartPie className="admin_sidebar_action_icon" />,
  },
  {
    key: "Logout",
    path: "logout",
    label: "Đăng xuất",
    icon: <FaSignOutAlt className="admin_sidebar_action_icon" />,
  },
];


const SidebarAdmin = () => {
  const [selectedRule, setSelectedRule] = useState("Dashboard");
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = React.useRef(null);
  const navigate = useNavigate();

  const handleRuleClick = (key,path) => {
    setSelectedRule(key);
    navigate(path)
  };

  const handleAudioPlay = () => {
    if (audioRef.current) {
      if (audioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setAudioPlaying(!audioPlaying);
    }
  };

  return (
    <div className="admin_sidebar_full_container">
      <audio ref={audioRef} loop>
        <source src={audio} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <div className="admin_sidebar_layout_container">
        <div className="admin_sidebar_header_section">
          <img src={logoImg} alt="logo" className="admin_header_logo_image" />
          <IoSettingsSharp
            onClick={handleAudioPlay}
            className="admin_header_settings_icon"
          />
          <div className="admin_header_competition_name">
             ADMIN
          </div>
        </div>
        {/* <div className="admin_sidebar_user_info_section">
          <div className="admin_user_role_info">
            <MdManageAccounts className="admin_user_role_icon" />
            <div className="admin_user_role_name">
              {competitionSchedule.infoReferee.roleRefereeCompetition}
            </div>
          </div>
          <img
            src={competitionSchedule.infoReferee.avatar}
            alt="avatar"
            className="admin_user_avatar_image"
          />
          <div className="admin_user_name_display">
            {competitionSchedule.infoReferee.name}
          </div>
          <div className="admin_user_email_display">
            {competitionSchedule.infoReferee.email}
          </div>
        </div> */}
        <div className="admin_sidebar_action_section">
          {actionReferee.map((action, index) => (
            <div
              key={action.key}
              className={`admin_action_item_container ${
                selectedRule === action.key ? "active" : ""
              } ${index === 0 ? "first_item" : ""} ${
                index === actionReferee.length - 1 ? "last_item" : ""
              }`}
              onClick={() => handleRuleClick(action.key,action.path)}
            >
              <div>{action.icon}</div>
              <div>{action.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarAdmin;
