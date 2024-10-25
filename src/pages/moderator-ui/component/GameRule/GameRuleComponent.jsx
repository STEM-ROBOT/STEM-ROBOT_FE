import React, { useEffect, useState } from "react";
import "./GameRuleComponent.css";
import { FaRobot } from "react-icons/fa";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import { TiWarning } from "react-icons/ti";
import { GrScorecard } from "react-icons/gr";
import { RiTeamFill } from "react-icons/ri";
import GameRuleScore from "../GameRuleScore/GameRuleScore";
const scoreCompetitions = [
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
];
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
            style={{ width: "100%", height: "70vh", borderRadius: "13px" }}
          >
            <embed
              src={
                "https://storage.googleapis.com/stem-system-storage/gogo?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=stem-system-storage-upload%40stem-system.iam.gserviceaccount.com%2F20241020%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20241020T154208Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&X-Goog-Signature=a3570c39e4adf05dc29e6874038c721b5e58a1ded3eca8065b441135d013bb772ccef61fb40c04ca53e658be894c04057b5fe467c994a3d243beb492b083d35bfb12dd97db9482a7fb62843d75eb5c39453d8cbe1d79690487dd9d3f75493435d2b3f910c7c950282232cbffe1a4d77fe333af7760d6e5544bbf6c85ea4a54659e4b80e00c532c3973e054ad4e96057a90bc828a70052b9bbf336eff6f43eaaee0c755b50d01b01ba98817e5c9bf1da26bde6acebc4380ea5b6f081128dbb4b618fe8e43e9470ad8137fcc1e6888bc9b801e46ebfb4567bfd68c4cbf2f9054e642f82faa98bb04c26deed7583478e1d72d3f8f068e2e623429e8cfcb95096db9"
              }
              type="application/pdf"
              border-radius="13px"
              width="100%"
              height="100%"
            />
          </div>
        ) : (
          <GameRuleScore data={scoreCompetitions} type={"view"} />
        )}
      </div>
    </div>
  );
};
export default GameRuleComponent;
