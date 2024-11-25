import React, { useEffect, useState } from "react";
import "./DashboardBarReferee.css";
import logoImg from "~/assets/images/z5737981778524_de68f5540147c7bd63cfbc811efc8633.jpg";
import { IoSettingsSharp } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import { GrScorecard } from "react-icons/gr";
import { FaCalendarMinus } from "react-icons/fa";
import audio from "~/assets/tp--theres-no-one-at-all-another-version--karaoke-beat-intrumental--prod-sơn-seven.mp3";
import { useNavigate, useParams } from "react-router-dom";
import { HiOutlineLogin } from "react-icons/hi";
import api from "/src/config";

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
  const path = useParams();
  const [selectedRule, setSelectedRule] = useState("schedule");
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = React.useRef(null);
  const navigate = useNavigate();
  const [competitionSchedule, setCompetitionSchedule] = useState();
  const storedCompetitionId = sessionStorage.getItem("competitionId");
  useEffect(() => {
    api
      .get(`/api/refereecompetition?competitionId=${storedCompetitionId}`)
      .then((response) => {
        console.log(response);
        setCompetitionSchedule(response.data.data);
      });
  }, [storedCompetitionId]);
  const handleRuleClick = (key) => {
    setSelectedRule(key.path);
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
          <HiOutlineLogin
            className="referee_head_logo"
            onClick={() => navigate("/referee-main")}
          />
          <IoSettingsSharp
            onClick={handleAudioPlay}
            className="referee_head_icon"
          />
          <div className="referee_head_name">
            {competitionSchedule?.competitionName}
          </div>
        </div>
        <div className="sidebar_referee_info">
          <div className="referee_info_role">
            <MdManageAccounts className="referee_info_role_icon" />
            <div className="referee_role">
              {competitionSchedule?.roleRefereeCompetition}
            </div>
          </div>
          <img
            src={competitionSchedule?.avatar}
            alt=""
            className="referee_info_avatar"
          />
          <div className="referee_info_name">{competitionSchedule?.name}</div>
          <div className="referee_info_email">{competitionSchedule?.email}</div>
        </div>
        <div className="sidebar_referee_action">
          {actionReferee.map((action, index) => (
            <div
              key={action.key}
              className={`action_referee_item ${
                selectedRule === action.path ? "active" : ""
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
