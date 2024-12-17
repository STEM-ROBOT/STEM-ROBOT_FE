import React, { useEffect, useState } from "react";
import "./ScoreRefereeMain.css";
import api from "/src/config";

const ScoreRefereeMain = () => {
  const storedCompetitionId = sessionStorage.getItem("competitionId");
  const [listViewMode, setListViewMode] = useState([]);
  const [viewMode, setViewMode] = useState();
  const [scoreApi, setScoreApi] = useState([]);
  const [scoreData, setScoreData] = useState([]);

  useEffect(() => {
    api
      .get(
        `/api/competitions/score-competition?competitionID=${storedCompetitionId}`
      )
      .then((response) => {
        const scoreCompetition = response.data.data.data.scoreCompetition;
        console.log(scoreCompetition);

        if (listViewMode?.length < 1) {
          setScoreApi(scoreCompetition);
          setViewMode(scoreCompetition[0].type);
          setScoreData(scoreCompetition[0]);
          for (let i = 0; i < scoreCompetition.length; i++) {
            listViewMode.push({ mode: scoreCompetition[i].type });
          }
        }
      })
      .catch((error) => {
        alert("Đã xảy ra sự cố", error);
      });
  }, []);
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
                            scoreData?.type.toLowerCase() == "điểm cộng"
                              ? "score_item_point_item plus"
                              : scoreData?.type.toLowerCase() == "điểm trừ"
                              ? "score_item_point_item minus"
                              : "score_item_point_item "
                          }
                        >
                          {scoreData?.type.toLowerCase() == "điểm cộng"
                            ? `+${score.point}`
                            : scoreData?.type.toLowerCase() == "điểm trừ"
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
