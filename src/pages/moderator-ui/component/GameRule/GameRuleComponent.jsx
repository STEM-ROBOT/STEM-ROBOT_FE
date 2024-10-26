import React, { useEffect, useState } from "react";
import "./GameRuleComponent.css";
import { FaRobot } from "react-icons/fa";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import { TiWarning } from "react-icons/ti";
import { GrScorecard } from "react-icons/gr";
import { RiTeamFill } from "react-icons/ri";
import GameRuleScore from "../GameRuleScore/GameRuleScore";
const scoreRuleCompetitions = {
  ruleCompetition:
    "https://storage.cloud.google.com/stem-system-storage/mau-hop-dong-dat-coc.pdf?authuser=1",
  scoreCompetition: [
    {
      type: "Điểm Cộng",
      score: [
        {
          id: 1,
          description: "làm đối thủ đối thủ bay lên khỏi mặt sàn",
          point: 1,
        },
        {
          id: 2,
          description: "làm đối thủ lật ngửa",
          point: 2,
        },
        {
          id: 3,
          description: "Làm đối thủ văng ra khỏi khu vực thi đấu",
          point: 2,
        },
        {
          id: 4,
          description:
            "Tấn công có chủ đích làm đối thủ văng ra khoảng cách lớn hơn 0,5 m.",
          point: 1,
        },
        {
          id: 5,
          description:
            "Đánh, đẩy đối thủ rơi xuống hố (hơn 1/2 thân robot đối thủ nằm trong hố)",
          point: 1,
        },
      ],
    },
    {
      type: "Điểm Trừ",
      score: [
        {
          id: 6,
          description: "Robot bị bẫy búa đập trúng",
          point: 1,
        },
        {
          id: 7,
          description:
            "Robot bị kẹt bẫy hố không thoát ra quá 10s (bao gồm cả trường hợp kênh tại cạnh bẫy hố)",
          point: 1,
        },
        {
          id: 8,
          description:
            "Robot bị lật ngửa, nghiêng hoặc không di chuyển được.Trọng tài cho đếm ngược 10s để kiểm tra khả năng di chuyển của robot.",
          point: 1,
        },
        {
          id: 9,
          description:
            "Thi đấu tiêu cực: Robot không có hành động tấn công đối phương sẽ bị trọng tài chính nhắc nhở.Khi trọng tài chính đếm ngược 10s để yêu cầu robot tấn công đối thủ, sau 10s đếm ngược robot vẫn không tấn công sẽ bị trừ 1 điểm.",
          point: 1,
        },
      ],
    },
    {
      type: "KnockOut",
      score: [
        {
          id: 6,
          description:
            "Trong trường hợp robot bất động: bánh xe không quay, vũ khí chính không hoạt động (bất kể động cơ bên trong còn hoạt động hay không).Trọng tài chính cho đếm ngược 10s để kiểm tra tính bất động của robot, sau 10s đếm ngược nếu robot vẫn bất động sẽ xử thua knock out hiệp đấu, robot còn lại sẽ thắng knockout hiệp đấu",
          point: 1,
        },
      ],
    },
  ],
};

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
            style={{ width: "100%", height: "70vh", borderRadius: "13px" }}
          >
            <embed
              src={scoreRuleCompetitions.ruleCompetition}
              type="application/pdf"
              border-radius="13px"
              width="100%"
              height="100%"
            />
          </div>
        ) : (
          <GameRuleScore
            data={scoreRuleCompetitions.scoreCompetition}
            type={"view"}
          />
        )}
      </div>
    </div>
  );
};
export default GameRuleComponent;
