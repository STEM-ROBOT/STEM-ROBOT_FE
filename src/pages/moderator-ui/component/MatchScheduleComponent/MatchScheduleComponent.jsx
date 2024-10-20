import React, { useEffect, useState } from "react";
import "./MatchScheduleComponent.css";
// vong 1/8
const roundMatch = [
  {
    round: "1/8",
    matches: [
      {
        homeTeam: "FC NHƯ THANH",
        awayTeam: "FC TRIỆU SƠN",
        homeScore: 4,
        awayScore: 7,
        time: "16:00 15/09/2024",
      },
      {
        homeTeam: "FC THIỆU HÓA",
        awayTeam: "FC NÔNG CỐNG",
        homeScore: 1,
        awayScore: 1,
        time: "17:30 15/09/2024",
      },
      {
        homeTeam: "FC THIỆU HÓA",
        awayTeam: "FC NHƯ THANH",
        homeScore: 3,
        awayScore: 0,
        time: "16:00 22/09/2024",
      },
      {
        homeTeam: "FC TRIỆU SƠN",
        awayTeam: "FC NÔNG CỐNG",
        homeScore: 4,
        awayScore: 3,
        time: "17:30 22/09/2024",
      },
      {
        homeTeam: "FC TRIỆU SƠN",
        awayTeam: "FC THIỆU HÓA",
        homeScore: 1,
        awayScore: 2,
        time: "16:00 29/09/2024",
      },
      {
        homeTeam: "FC NÔNG CỐNG",
        awayTeam: "FC NHƯ THANH",
        homeScore: 8,
        awayScore: 1,
        time: "16:00 29/09/2024",
      },
      {
        homeTeam: "FC NÔNG CỐNG",
        awayTeam: "FC NHƯ THANH",
        homeScore: 8,
        awayScore: 1,
        time: "16:00 29/09/2024",
      },
      {
        homeTeam: "FC NÔNG CỐNG",
        awayTeam: "FC NHƯ THANH",
        homeScore: 8,
        awayScore: 1,
        time: "",
      },
    ],
  },
  {
    round: "TK",

    matches: [
      {
        homeTeam: "FC NHƯ THANH",
        awayTeam: "FC TRIỆU SƠN",
        homeScore: 4,
        awayScore: 7,
        time: "16:00 15/09/2024",
      },
      {
        homeTeam: "FC THIỆU HÓA",
        awayTeam: "FC NÔNG CỐNG",
        homeScore: 1,
        awayScore: 1,
        time: "17:30 15/09/2024",
      },
      {
        homeTeam: "FC THIỆU HÓA",
        awayTeam: "FC NHƯ THANH",
        homeScore: 3,
        awayScore: 0,
        time: "16:00 22/09/2024",
      },
      {
        homeTeam: "FC TRIỆU SƠN",
        awayTeam: "FC NÔNG CỐNG",
        homeScore: 4,
        awayScore: 3,
        time: "17:30 22/09/2024",
      },
    ],
  },
  {
    round: "BK",
    matches: [
      {
        homeTeam: "FC NHƯ THANH",
        awayTeam: "FC TRIỆU SƠN",
        homeScore: 4,
        awayScore: 7,
        time: "16:00 15/09/2024",
      },
      {
        homeTeam: "FC THIỆU HÓA",
        awayTeam: "FC NÔNG CỐNG",
        homeScore: 1,
        awayScore: 1,
        time: "17:30 15/09/2024",
      },
    ],
  },
  {
    round: "CK",
    matches: [
      {
        homeTeam: "FC THIỆU HÓA",
        awayTeam: "FC NHƯ THANH",
        homeScore: 3,
        awayScore: 0,
        time: "16:00 22/09/2024",
      },
      {
        homeTeam: "FC TRIỆU SƠN",
        awayTeam: "FC NÔNG CỐNG",
        homeScore: 4,
        awayScore: 3,
        time: "17:30 22/09/2024",
      },
    ],
  },
];
const roundMode = [
  { id: 1, mode: "Vòng Đấu" },
  { id: 2, mode: "Thời Gian" },
];
const MatchScheduleComponent = () => {
  const [viewMode, setViewMode] = useState("Vòng Đấu");
  const [matchApi, setMatchApi] = useState([]);
  const [matchView, setMatchView] = useState([]);
  const [optionViewMode, setOptionViewMode] = useState([]);
  const [optionViewModeDefault, setOptionViewModeDefault] = useState("TẤT");

  useEffect(() => {
    setMatchApi(roundMatch);
    setMatchView(roundMatch);
    if (optionViewMode.length < 1) {
      optionViewMode.push({ mode: "TẤT" });
      for (let i = 0; i < roundMatch.length; i++) {
        optionViewMode.push({ mode: roundMatch[i].round });
      }
    }
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
      for (let i = 0; i < roundMatch.length; i++) {
        if (roundMatch[i].round == viewMode.mode) {
          setMatchView([roundMatch[i]]);
        }
      }
    } else {
      setMatchView(matchApi);
    }
    setOptionViewModeDefault(viewMode.mode);
  };
  return (
    <div className="schedule_match_component">
      <div className="schedule_match_layout_info">
        <div className="schedule_match_intro">
          {`Có ${matchApi?.length} và `}
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
                  <div key={i} className={"match_item"}>
                    <div className="match_item_layer">
                      <div className="match_item_stt">{i + 1}</div>
                      <div className="match_item_team_left">
                        <div className="item_team_name">{match.homeTeam}</div>
                        <img
                          className="item_team_img"
                          src="https://tse3.mm.bing.net/th?id=OIP.hPyNI8PW91vjiuEZwyPq0gHaHa&pid=Api&P=0&h=220"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="match_item_score">
                      <div className="item_score">
                        {`${match.homeScore} - ${match.awayScore}`}
                      </div>
                    </div>
                    <div className="match_item_layer">
                      <div className="match_item_team_right">
                        <img
                          className="item_team_img"
                          src="https://tse3.mm.bing.net/th?id=OIP.hPyNI8PW91vjiuEZwyPq0gHaHa&pid=Api&P=0&h=220"
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchScheduleComponent;
