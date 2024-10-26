import React, { useState } from "react";
import "./DashboardBarReferee.css";
import logoImg from "~/assets/images/logo-dask.png";
import { IoSettingsSharp } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import { GrScorecard } from "react-icons/gr";
import { FaCalendarMinus } from "react-icons/fa";

const competitionSchedule = {
  competitionName: "Trồng Lúa",
  infoReferee: {
    name: "Lê Tùng Nhật",
    avatar:
      "https://images.genius.com/b6c44f836516ce8f33d539e140300a55.1000x1000x1.jpg",
    roleRefereeCompetition: "TRỌNG TÀI CHÍNH",
    email: "letungnhat@gmail.com",
  },
  schedule: [],
};
const actionReferee = [
  {
    key: "Schedule",
    path: "schedule",
    label: "Lịch Trình",
    icon: <FaCalendarMinus className="action_referee_icon" />,
  },
  {
    key: "Process",
    label: "Quy định",
    path: "schedule",
    icon: <AiOutlineDeliveredProcedure className="action_referee_icon" />,
  },
  {
    key: "Score",
    path: "schedule",
    label: "Điểm số",
    icon: <GrScorecard className="action_referee_icon" />,
  },
];
const DashboardBarReferee = () => {
  const [selectedRule, setSelectedRule] = useState("Schedule");

  const handleRuleClick = (key) => {
    setSelectedRule(key);
  };
  return (
    <div className="sidebar_referee_container">
      <div className="sidebar_referee_layout">
        <div className="sidebar_referee_head">
          <img src={logoImg} alt="logo" className="referee_head_logo" />
          <IoSettingsSharp className="referee_head_icon" />
          <div className="referee_head_name">
            {competitionSchedule.competitionName}
          </div>
        </div>
        <div className="sidebar_referee_info">
          <div className="referee_info_role">
            <MdManageAccounts className="referee_info_role_icon" />
            <div className="referee_role">
              {competitionSchedule.infoReferee.roleRefereeCompetition}
            </div>
          </div>
          <img
            src={competitionSchedule.infoReferee.avatar}
            alt=""
            className="referee_info_avatar"
          />
          <div className="referee_info_name">
            {competitionSchedule.infoReferee.name}
          </div>
          <div className="referee_info_email">
            {competitionSchedule.infoReferee.email}
          </div>
        </div>
        <div className="sidebar_referee_action">
          {actionReferee.map((action, index) => (
            <div
              key={action.key}
              className={`action_referee_item ${
                selectedRule === action.key ? "active" : ""
              } ${index === 0 ? "firstItem" : ""} ${
                index === actionReferee.length - 1 ? "lastItem" : ""
              }`}
              onClick={() => handleRuleClick(action.key)}
            >
              <div>{action.icon}</div>
              <div >{action.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardBarReferee;
