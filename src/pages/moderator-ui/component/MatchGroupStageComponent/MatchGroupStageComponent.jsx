import React, { useEffect, useState } from "react";
import MatchDetailView from "../MatchDetailView/MatchDetailView";
import { match_group_stage_view } from "../../api/ApiFlowView/ApiFlowView";
import api from "../../../../config";
import { useParams } from "react-router-dom";

const roundMode = [
  { id: 1, mode: "Bảng Đấu" },
  { id: 2, mode: "Vòng Đấu" },
];
const MatchGroupStageComponent = () => {
  const path = useParams();
  const [viewMode, setViewMode] = useState("Bảng Đấu");
  const [optionViewModeDefault, setOptionViewModeDefault] = useState([]);
  const [matchApi, setMatchApi] = useState([]);
  const [matchView, setMatchView] = useState([]);
  const [showMatchDetail, setShowMatchDetail] = useState(false);
  const [matchDetailData, setMatchDetailData] = useState();
  useEffect(() => {
    if (matchApi.length < 1) {
      api
        .get(`${match_group_stage_view + path.competitionId}`)
        .then((response) => {
          response.data.forEach((group) => {
            let matchInGroups = {
              groupName: group.groupName,
              matchInGroup: [],
            };
            
            let matchCheck = []; // Initialize for each group
            group.round.forEach((round) => {
              round.matches.forEach((match) => {
                const updatedMatch = {
                  ...match,
                  roundName: round.roundNumber,
                };
                matchCheck.push(updatedMatch);
              });
            });
            
            matchInGroups.matchInGroup = matchCheck;
            setMatchView((prev) => [...prev, matchInGroups]);
          });
          
          setMatchApi(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [matchApi]);
  const CacuNumberMatch = () => {
    let numberMatch = 0;
    matchApi?.map((group) => {
      group.round.map((round) => {
        for (let i = 0; i < round.matches.length; i++) {
          numberMatch += 1;
        }
      });
    });
    return numberMatch;
  };

  const NumberRound = (rounds, index) => {
    const roundNumber = [];
    if (roundNumber.length < 1) {
      roundNumber.push({ mode: "TẤT" });
      for (let i = 0; i < rounds.length; i++) {
        roundNumber.push({ mode: rounds[i].roundNumber });
      }
    }
    optionViewModeDefault.push({ mode: "TẤT", index: index });
    return roundNumber;
  };

  // chọn vòng để xem
  const MatchToMode = (roundNumber, indexView, groupData) => {
    if (roundNumber !== "TẤT") {
      const matchInGroup = [];
      for (let i = 0; i < groupData.round.length; i++) {
        if (groupData.round[i].roundNumber == roundNumber) {
          groupData.round[i].matches.map((match) => {
            const updatedMatch = {
              ...match,
              roundName: groupData.round[i].roundNumber,
            };
            matchInGroup.push(updatedMatch);
          });
        }
      }
      const updatedMatchViewIndex = matchView.map((match2) => {
        if (match2.groupName === groupData.groupName) {
          return { ...match2, matchInGroup: matchInGroup };
        }
        return match2;
      });
      setMatchView(updatedMatchViewIndex);
    } else {
      const matchInGroup2 = [];
      groupData.round.map((round) => {
        round.matches.map((match) => {
          const updatedMatch = {
            ...match,
            roundName: round.roundNumber,
          };

          matchInGroup2.push(updatedMatch);
        });
      });

      const updatedMatchViewIndex = matchView.map((match) => {
        if (match.groupName === groupData.groupName) {
          return { ...match, matchInGroup: matchInGroup2 };
        }
        return match;
      });
      setMatchView(updatedMatchViewIndex);
    }
    const updatedOptions = optionViewModeDefault.map((option) => {
      if (option.index === indexView) {
        return { ...option, mode: roundNumber };
      }
      return option;
    });
    setOptionViewModeDefault(updatedOptions);
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
        <div
          className="schedule_match_intro"
          style={{
            display: "flex",
            fontWeight: "normal",
            marginBottom: "20px",
          }}
        >
          <div style={{ marginRight: "7px", fontWeight: "bold" }}>
            Giai đoạn đấu vòng bảng:
          </div>
          {`Có ${matchApi?.length} bảng đấu gồm `}
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
      {matchApi?.map((group, index) => (
        <div key={index} className="schedule_match_layout_view_match">
          <div className="view_match_option">
            Vòng
            {NumberRound(group.round, index)?.map((roundNumber, i) => (
              <div
                key={i}
                className={
                  roundNumber.mode == optionViewModeDefault[index]?.mode
                    ? "match_mode_option active"
                    : "match_mode_option"
                }
                onClick={() => MatchToMode(roundNumber.mode, index, group)}
              >
                {roundNumber?.mode}
              </div>
            ))}
          </div>
          <div className="view_match_to_option">
            <div className="match_option_item">
              <div className="match_to_option_head">Bảng {group.groupName}</div>
              <div className="match_to_option_body">
                {matchView[index]?.matchInGroup.map((match, matchIndex) => (
                  <div
                    key={matchIndex}
                    className={"match_item"}
                    onClick={() => ViewMatch(match)}
                  >
                    <div className="match_item_layer">
                      <div className="match_item_stt">{matchIndex + 1}</div>
                      <div>Vòng {match.roundName}</div>
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
                        {`${match.homeScore || "0"} - ${
                          match.awayScore || "0"
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
                      <div className="match_item_time">
                        {match.startTime ? match.startTime.replace("T", " ").slice(0, -3) : " Chưa có lịch thi đấu"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchGroupStageComponent;
