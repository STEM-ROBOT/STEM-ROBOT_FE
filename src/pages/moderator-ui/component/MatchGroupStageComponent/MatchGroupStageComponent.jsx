import React, { useEffect, useState } from "react";
import MatchDetailView from "../MatchDetailView/MatchDetailView";
const groupMatch = [
  {
    groupName: "A",
    round: [
      {
        roundNumber: "1",
        matches: [
          {
            homeTeam: "Đội #4",
            homeTeamLogo:
              "https://www.pngmart.com/files/22/Manchester-United-Transparent-Images-PNG.png",
            awayTeamLogo:
              "https://www.pngmart.com/files/22/Manchester-United-Transparent-Images-PNG.png",

            awayTeam: "Đội #3",
            homeScore: "",
            awayScore: "",
            time: "",
            location: "Sân 1",
          },
          {
            homeTeam: "Đội #1",
            homeTeamLogo:
              "https://www.pngmart.com/files/22/Manchester-United-Transparent-Images-PNG.png",
            awayTeamLogo:
              "https://www.pngmart.com/files/22/Manchester-United-Transparent-Images-PNG.png",

            awayTeam: "Đội #2",
            homeScore: "",
            awayScore: "",
            time: "",
            location: "Sân 1",
          },
        ],
      },
      {
        roundNumber: "2",
        matches: [
          {
            homeTeam: "Đội #4",
            homeTeamLogo:
              "https://www.pngmart.com/files/22/Manchester-United-Transparent-Images-PNG.png",
            awayTeamLogo:
              "https://www.pngmart.com/files/22/Manchester-United-Transparent-Images-PNG.png",

            awayTeam: "Đội #2",
            homeScore: "",
            awayScore: "",
            time: "",
            location: "Sân 1",
          },
          {
            homeTeam: "Đội #3",
            homeTeamLogo:
              "https://www.pngmart.com/files/22/Manchester-United-Transparent-Images-PNG.png",
            awayTeamLogo:
              "https://www.pngmart.com/files/22/Manchester-United-Transparent-Images-PNG.png",

            awayTeam: "Đội #1",
            homeScore: "",
            awayScore: "",
            time: "",
            location: "Sân 1",
          },
        ],
      },
      {
        roundNumber: "3",
        matches: [
          {
            homeTeam: "Đội #4",
            homeTeamLogo:
              "https://www.pngmart.com/files/22/Manchester-United-Transparent-Images-PNG.png",
            awayTeamLogo:
              "https://www.pngmart.com/files/22/Manchester-United-Transparent-Images-PNG.png",

            awayTeam: "Đội #1",
            homeScore: "",
            awayScore: "",
            time: "",
            location: "Sân 1",
          },
          {
            homeTeam: "Đội #2",
            homeTeamLogo:
              "https://www.pngmart.com/files/22/Manchester-United-Transparent-Images-PNG.png",
            awayTeamLogo:
              "https://www.pngmart.com/files/22/Manchester-United-Transparent-Images-PNG.png",

            awayTeam: "Đội #3",
            homeScore: "",
            awayScore: "",
            time: "",
            location: "Sân 2",
          },
        ],
      },
    ],
  },
  {
    groupName: "B",
    round: [
      {
        roundNumber: "1",
        matches: [
          {
            homeTeam: "Đội #6",
            homeTeamLogo:
              "https://www.pngmart.com/files/22/Manchester-United-Transparent-Images-PNG.png",
            awayTeamLogo:
              "https://www.pngmart.com/files/22/Manchester-United-Transparent-Images-PNG.png",

            awayTeam: "Đội #7",
            homeScore: "",
            awayScore: "",
            time: "",
            location: "Sân 1",
          },
          {
            homeTeam: "Đội #5",
            homeTeamLogo:
              "https://www.pngmart.com/files/22/Manchester-United-Transparent-Images-PNG.png",
            awayTeamLogo:
              "https://www.pngmart.com/files/22/Manchester-United-Transparent-Images-PNG.png",

            awayTeam: "Đội #7",
            homeScore: "",
            awayScore: "",
            time: "",
            location: "Sân 2",
          },
        ],
      },
      {
        roundNumber: "2",
        matches: [
          {
            homeTeam: "Đội #6",
            homeTeamLogo:
              "https://www.pngmart.com/files/22/Manchester-United-Transparent-Images-PNG.png",
            awayTeamLogo:
              "https://www.pngmart.com/files/22/Manchester-United-Transparent-Images-PNG.png",

            awayTeam: "Đội #7",
            homeScore: "",
            awayScore: "",
            time: "",
            location: "Sân 1",
          },
          {
            homeTeam: "Đội #8",
            homeTeamLogo:
              "https://www.pngmart.com/files/22/Manchester-United-Transparent-Images-PNG.png",
            awayTeamLogo:
              "https://www.pngmart.com/files/22/Manchester-United-Transparent-Images-PNG.png",

            awayTeam: "Đội #5",
            homeScore: "",
            awayScore: "",
            time: "",
            location: "Sân 1",
          },
        ],
      },
      {
        roundNumber: "3",
        matches: [
          {
            homeTeam: "Đội #6",
            homeTeamLogo:
              "https://www.pngmart.com/files/22/Manchester-United-Transparent-Images-PNG.png",
            awayTeamLogo:
              "https://www.pngmart.com/files/22/Manchester-United-Transparent-Images-PNG.png",
            awayTeam: "Đội #5",
            homeScore: "",
            awayScore: "",
            time: "",
            location: "Sân 1",
          },
          {
            homeTeam: "Đội #7",
            homeTeamLogo:
              "https://www.pngmart.com/files/22/Manchester-United-Transparent-Images-PNG.png",
            awayTeamLogo:
              "https://www.pngmart.com/files/22/Manchester-United-Transparent-Images-PNG.png",

            awayTeam: "Đội #8",
            homeScore: "",
            awayScore: "",
            time: "",
            location: "Sân 1",
          },
        ],
      },
    ],
  },
];
const roundMode = [
  { id: 1, mode: "Bảng Đấu" },
  { id: 2, mode: "Vòng Đấu" },
];
const MatchGroupStageComponent = () => {
  const [viewMode, setViewMode] = useState("Bảng Đấu");
  const [optionViewModeDefault, setOptionViewModeDefault] = useState([]);
  const [matchView, setMatchView] = useState([]);
  const [showMatchDetail, setShowMatchDetail] = useState(false);
  const [matchDetailData, setMatchDetailData] = useState();
  useEffect(() => {
    if (matchView.length < 1) {
      let matchInGroup;
      for (let i = 0; i < groupMatch.length; i++) {
        matchInGroup = {
          groupName: groupMatch[i].groupName,
          matchInGroup: [],
        };
        groupMatch[i].round.map((round, i) => {
          round.matches.map((match, i) => {
            const updatedMatch = {
              ...match,
              roundName: round.roundNumber,
            };

            matchInGroup.matchInGroup.push(updatedMatch);
          });
        });
        setMatchView((prev) => [...prev, matchInGroup]);
      }
    }
  }, []);
  const CacuNumberMatch = () => {
    let numberMatch = 0;
    groupMatch?.map((group) => {
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
          {`Có ${groupMatch?.length} bảng đấu và `}
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
      {groupMatch?.map((group, index) => (
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
                        {match.time ? match.time : " Chưa có lịch thi đấu"}
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