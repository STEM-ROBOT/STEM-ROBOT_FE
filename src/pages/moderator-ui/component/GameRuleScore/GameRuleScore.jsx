import React, { useEffect, useState } from "react";
import "./GameRuleScore.css";
import { IoCreate } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

const GameRuleScore = ({ data, type }) => {
  const [listViewMode, setListViewMode] = useState([]);
  const [viewMode, setViewMode] = useState();
  const [scoreApi, setScoreApi] = useState([]);
  const [scoreData, setScoreData] = useState([]);
  useEffect(() => {
    if (listViewMode?.length < 1) {
      setScoreApi(data);
      setViewMode(data[0].type);
      setScoreData(data[0]);
      for (let i = 0; i < data.length; i++) {
        listViewMode.push({ mode: data[i].type });
        console.log(listViewMode);
      }
    }
  }, [data]);
  const changeViewMode = (key) => {
    for (let i = 0; i < scoreApi.length; i++) {
      if (scoreApi[i].type === key) {
        setScoreData(scoreApi[i]);
      }
    }

    setViewMode(key);
  };
  return (
    <div className="game_rule_score">
      <div className="rule_score_head">
        Điểm số được trọng tài sử dụng chung cho các trận đấu của nội dung thi
        đấu
      </div>
      <div className="rule_score_option">
        <div className="schedule_match_layout_mode">
          {listViewMode?.map((round, i) => (
            <div
              key={i}
              onClick={() => changeViewMode(round.mode)}
              className={
                round.mode == viewMode ? "match_mode active" : "match_mode"
              }
            >
              {round.mode}
            </div>
          ))}
        </div>
      </div>

      <div className="rule_score_body">
        <div className="rule_score_title">{scoreData?.type}</div>
        <div className="rule_score_view">
          {scoreData.score?.map((score, i) => (
            <div key={i} className="score_item">
              <div className="match_item_stt">{i + 1}</div>
              <div className="score_item_description">{score.description}</div>
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
              {type == "setup" && (
                <div className="score_item_action">
                  <div className="score_item_action_item">
                    <IoCreate className="action_item update" />
                    <MdDelete className="action_item delete" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameRuleScore;
