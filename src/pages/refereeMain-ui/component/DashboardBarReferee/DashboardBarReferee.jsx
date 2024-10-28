import React, { useState } from "react";
import "./DashboardBarReferee.css";
import logoImg from "~/assets/images/logo-dask.png";
import { IoSettingsSharp } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import { GrScorecard } from "react-icons/gr";
import { FaCalendarMinus } from "react-icons/fa";
import audio from "~/assets/tp--theres-no-one-at-all-another-version--karaoke-beat-intrumental--prod-sơn-seven.mp3";
import { useNavigate } from "react-router-dom";
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
    key: "Rule",
    label: "Quy định",
    path: "rule-competition",
    icon: <AiOutlineDeliveredProcedure className="action_referee_icon" />,
  },
  {
    key: "Score",
    path: "score-competition",
    label: "Điểm số",
    icon: <GrScorecard className="action_referee_icon" />,
  },
];
const DashboardBarReferee = () => {
  const [selectedRule, setSelectedRule] = useState("Rule");
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = React.useRef(null);
  const navigate = useNavigate();
  const handleRuleClick = (key) => {
    setSelectedRule(key.key);
    navigate(`${key.path}`);
  };
  const handleAudioPlay = () => {
    if (audioRef.current) {
      if (audioPlaying) {
        audioRef.current.pause(); // Tạm dừng nhạc
      } else {
        audioRef.current.play(); // Phát nhạc
      }
      setAudioPlaying(!audioPlaying); // Đảo ngược trạng thái audioPlaying
    }
  };
  return (
    <div className="sidebar_referee_container">
      <audio ref={audioRef} loop>
        <source src={audio} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <div className="sidebar_referee_layout">
        <div className="sidebar_referee_head">
          <img src={logoImg} alt="logo" className="referee_head_logo" />
          <IoSettingsSharp
            onClick={handleAudioPlay}
            className="referee_head_icon"
          />
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
              onClick={() => handleRuleClick(action)}
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

export default DashboardBarReferee;
