import React, { useEffect, useState } from "react";
import "./MatchScheduleComponent.css";
import MatchDetailView from "../MatchDetailView/MatchDetailView";
import { useParams } from "react-router-dom";
import api from "/src/Config";
import { match_schedule_view } from "../../api/ApiFlowView/ApiFlowView";

const roundMode = [
  { id: 1, mode: "Vòng Đấu" },
  { id: 2, mode: "Thời Gian" },
];
const MatchScheduleComponent = () => {
  const path = useParams();
  const [viewMode, setViewMode] = useState("Vòng Đấu");
  const [matchApi, setMatchApi] = useState([]);
  const [matchView, setMatchView] = useState([]);
  const [optionViewMode, setOptionViewMode] = useState([]);
  const [optionViewModeDefault, setOptionViewModeDefault] = useState("TẤT");
  const [showMatchDetail, setShowMatchDetail] = useState(false);
  const [matchDetailData, setMatchDetailData] = useState();
  useEffect(() => {
    api
      .get(`${match_schedule_view + path.competitionId}`)
      .then((response) => {
        console.log(response.data);
        setMatchApi(response.data);
        setMatchView(response.data);
        if (optionViewMode.length < 1) {
          optionViewMode.push({ mode: "TẤT" });
          for (let i = 0; i < response.data.length; i++) {
            optionViewMode.push({ mode: response.data[i].round });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const CacuNumberMatch = () => {
    let numberMatch = 0;
    matchApi?.map((round) => {
      for (let i = 0; i < round.matches.length; i++) {
        numberMatch += 1;
      }
    });
    return numberMatch;
  };
  const MatchToMode = (viewMode) => {
    if (viewMode.mode !== "TẤT") {
      for (let i = 0; i < matchApi?.length; i++) {
        if (matchApi[i].round == viewMode.mode) {
          setMatchView([matchApi[i]]);
        }
      }
    } else {
      setMatchView(matchApi);
    }
    setOptionViewModeDefault(viewMode.mode);
  };
  const ViewMatch = (data) => {
    setMatchDetailData(data);
    setShowMatchDetail(true);
  };
  return (
    <div className="schedule_match_component">
      {showMatchDetail && (
        <MatchDetailView
          setShowMatchDetail={setShowMatchDetail}
          matchData={matchDetailData}
        />
      )}
      <div className="schedule_match_layout_info">
        <div className="schedule_match_intro">
          {`Có ${matchApi?.length} vòng gồm `}
          {CacuNumberMatch()} trận đấu
        </div>
        <div className="schedule_match_"></div>
      </div>
      <div className="schedule_match_layout_mode">
        {roundMode?.map((round, i) => (
          <div
            key={i}
            onClick={() => setViewMode(round.mode)}
            className={
              round.mode == viewMode ? "match_mode active" : "match_mode"
            }
          >
            {round.mode}
          </div>
        ))}
      </div>
      <div className="schedule_match_layout_view_match">
        <div className="view_match_option">
          Vòng
          {optionViewMode?.map((viewMode, i) => (
            <div
              key={i}
              className={
                viewMode.mode == optionViewModeDefault
                  ? "match_mode_option active"
                  : "match_mode_option"
              }
              onClick={() => MatchToMode(viewMode)}
            >
              {viewMode?.mode}
            </div>
          ))}
        </div>
        <div className="view_match_to_option">
          {matchView?.map((matchData, i) => (
            <div key={i} className="match_option_item">
              <div className="match_to_option_head">Vòng {matchData.round}</div>
              <div className="match_to_option_body">
                {matchData.matches.map((match, i) => (
                  <div
                    key={i}
                    className={"match_item"}
                    onClick={() => ViewMatch(match)}
                  >
                    <div className="match_item_layer">
                      <div className="match_item_stt">{i + 1}</div>
                      <div className="match_item_team_left">
                        <div className="item_team_name">{match.homeTeam}</div>
                        <img
                          className="item_team_img"
                          src={match.homeTeamLogo}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="match_item_score">
                      <div className="item_score">
                        {`${match.homeScore ? match.homeScore : ""} - ${
                          match.awayScore ? match.awayScore : ""
                        }`}
                      </div>
                    </div>
                    <div className="match_item_layer">
                      <div className="match_item_team_right">
                        <img
                          className="item_team_img"
                          src={match.awayTeamLogo}
                          alt=""
                        />
                        <div className="item_team_name">{match.awayTeam}</div>
                      </div>
                      <div className="match_item_startDate">
                        {match.startTime
                          ? match.startTime
                          : " Chưa có lịch thi đấu"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchScheduleComponent;
