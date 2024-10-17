import React, { useState } from "react";
import "./GameRuleComponent.css";
import { FaRobot } from "react-icons/fa";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import { TiWarning } from "react-icons/ti";
import { GrScorecard } from "react-icons/gr";
import { RiTeamFill } from "react-icons/ri";

// Create Document Component

const GameRuleComponent = () => {
  const [selectedRule, setSelectedRule] = useState("Process");

  const rules = [
    {
      key: "Process",
      label: "Quy trình thi đấu",
      icon: <AiOutlineDeliveredProcedure />,
    },
    { key: "Violations", label: "Các lỗi vi phạm", icon: <TiWarning /> },
    { key: "Score", label: "Điểm số", icon: <GrScorecard /> },
    { key: "Team", label: "Đội thi đấu", icon: <RiTeamFill /> },
    { key: "Robot", label: "Robot thi đấu", icon: <FaRobot /> },
  ];

  const handleRuleClick = (key) => {
    setSelectedRule(key);
  };

  return (
    <div className="game_rule_container">
      <div className="game_rule_sidebar">
        <div className="rule_list">
          {rules.map((rule) => (
            <div
              key={rule.key}
              className={`rule_item ${
                selectedRule === rule.key ? "active" : ""
              }`}
              onClick={() => handleRuleClick(rule.key)}
            >
              <div className="icon">{rule.icon}</div>
              <div className="label">{rule.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="game_rule_content">
        {/* <div className="rule_title">
          {rules.find((rule) => rule.key === selectedRule)?.label}
        </div> */}
        <div className="rule_description">
          <div
            className="view_contract"
            style={{ width: "100%", height: "70vh" }}
          >
            <embed
              src={"https://storage.cloud.google.com/stem-system-storage/mau-hop-dong-dat-coc.pdf?authuser=1"}
              type="application/pdf"
              width="100%"
              height="100%"
            />
          </div>
          {/* <PDFViewer fileUrl={"/signed_document.pdf"} /> */}
        </div>
      </div>
    </div>
  );
};
export default GameRuleComponent;
