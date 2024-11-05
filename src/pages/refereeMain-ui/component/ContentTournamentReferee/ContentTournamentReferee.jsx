import React from "react";
import "./ContentTournamentReferee.css";

const fakeData = {
  referees: ["THANH", "LAM", "DUONG", "NHAT"],
  matchReferees: ["PHU 1", "PHU 2", "PHU 3"],
  rounds: [
    {
      roundId: 1,
      roundName: "Tứ kết",
      matches: [
        {
          matchId: 1,
          teamA: "Team A1",
          teamB: "Team B1",
          mainReferee: "",
          matchReferees: [],
          date: "2023-10-30",
          timeIn: "14:00",
          arena: "",
        },
        {
          matchId: 2,
          teamA: "Team A2",
          teamB: "Team B2",
          mainReferee: "",
          matchReferees: [],
          date: "2023-10-30",
          timeIn: "15:30",
          arena: "",
        },
      ],
    },
    {
      roundId: 2,
      roundName: "Bán kết",
      matches: [
        {
          matchId: 3,
          teamA: "Team A3",
          teamB: "Team B3",
          mainReferee: "",
          matchReferees: [],
          date: "2023-11-01",
          timeIn: "14:00",
          arena: "",
        },
        {
          matchId: 4,
          teamA: "Team A4",
          teamB: "Team B4",
          mainReferee: "",
          matchReferees: [],
          date: "2023-11-01",
          timeIn: "15:30",
          arena: "",
        },
      ],
    },
    {
      roundId: 3,
      roundName: "Chung kết",
      matches: [
        {
          matchId: 5,
          teamA: "Team A5",
          teamB: "Team B5",
          mainReferee: "",
          matchReferees: [],
          date: "2023-11-03",
          timeIn: "16:00",
          arena: "",
        },
      ],
    },
  ],
};

const ContentTournamentReferee = () => {
  return <div className="content_home_referee_container"></div>;
};

export default ContentTournamentReferee;
