import React, { useState } from "react";
import "./GameRuleComponent.css";
import { FaRobot } from "react-icons/fa";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import { TiWarning } from "react-icons/ti";
import { GrScorecard } from "react-icons/gr";
import { RiTeamFill } from "react-icons/ri";

// Create Document Component

const GameRuleComponent = () => {
  const [selectedRule, setSelectedRule] = useState("Score");

  const rules = [
    {
      key: "Process",
      label: "Quy định giải đấu",
      icon: <AiOutlineDeliveredProcedure />,
    },
    { key: "Score", label: "Điểm số", icon: <GrScorecard /> },
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
        {selectedRule == "Process" ? (
          <div
            className="rule_description"
            style={{ width: "100%", height: "70vh" }}
          >
            <embed
              src={
                "https://storage.cloud.google.com/stem-system-storage/mau-hop-dong-dat-coc.pdf?authuser=1"
              }
              type="application/pdf"
              width="100%"
              height="100%"
            />
          </div>
        ) : (
          <div className="game_rule_score">
            <div></div>
          </div>
        )}
      </div>
    </div>
  );
};
export default GameRuleComponent;
