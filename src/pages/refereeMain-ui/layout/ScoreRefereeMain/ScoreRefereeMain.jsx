import React, { useEffect, useState } from "react";
import "./ScoreRefereeMain.css";
const scoreCompetition = [
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
const ScoreRefereeMain = () => {
  const [listViewMode, setListViewMode] = useState([]);
  const [viewMode, setViewMode] = useState();
  const [scoreApi, setScoreApi] = useState([]);
  const [scoreData, setScoreData] = useState([]);
  useEffect(() => {
    if (listViewMode?.length < 1) {
      setScoreApi(scoreCompetition);
      setViewMode(scoreCompetition[0].type);
      setScoreData(scoreCompetition[0]);
      for (let i = 0; i < scoreCompetition.length; i++) {
        listViewMode.push({ mode: scoreCompetition[i].type });
      }
    }
  }, [scoreApi]);
  const changeViewMode = (key) => {
    for (let i = 0; i < scoreApi.length; i++) {
      if (scoreApi[i].type === key) {
        setScoreData(scoreApi[i]);
      }
    }

    setViewMode(key);
  };
  return (
    <div className="rule_competition_referee">
      <div className="score_competition_referee_layout">
        <div className="score_competition_referee_item_layout">
          <div className="rule_competition_referee_head">
            <div className="rule_referee_head">
              Hạng mục tính điểm của nội dung thi đấu
            </div>
          </div>

          <div className="rule_score_referee_container">
            <div className="rule_score_referee_view">
              <div className="referee_score_option">
                <>
                  {listViewMode?.map((round, i) => (
                    <div
                      key={i}
                      onClick={() => changeViewMode(round.mode)}
                      className={
                        round.mode == viewMode
                          ? "match_mode active"
                          : "match_mode"
                      }
                    >
                      {round.mode}
                    </div>
                  ))}
                </>
              </div>
              <div className="rule_score_body_referee">
                <div className="rule_score_title">{scoreData?.type}</div>
                <div className="rule_score_view">
                  {scoreData.score?.map((score, i) => (
                    <div key={i} className="score_item">
                      <div className="match_item_stt">{i + 1}</div>
                      <div className="score_item_description">
                        {score.description}
                      </div>
                      <div className="score_item_point">
                        <div
                          className={
                            scoreData?.type == "Điểm Cộng"
                              ? "score_item_point_item plus"
                              : scoreData?.type == "Điểm Trừ"
                              ? "score_item_point_item minus"
                              : "score_item_point_item "
                          }
                        >
                          {scoreData?.type == "Điểm Cộng"
                            ? `+${score.point}`
                            : scoreData?.type == "Điểm Trừ"
                            ? `-${score.point}`
                            : "Xử Thua Trực Tiếp"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreRefereeMain;
