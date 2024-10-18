import React, { useEffect, useState } from "react";
import "./MatchRoundComponent.css";

const roundsData = [
  {
    round: "Vòng 1",
    groups: [
      {
        groupName: "BẢNG A",
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
        ],
      },
      {
        groupName: "BẢNG B",
        matches: [
          {
            homeTeam: "FC YÊN ĐỊNH",
            awayTeam: "FC THÀNH PHỐ - ĐÔNG SƠN",
            homeScore: 0,
            awayScore: 2,
            time: "16:00 29/09/2024",
          },
          {
            homeTeam: "FC THỌ XUÂN",
            awayTeam: "FC CẨM THỦY BÌNH DƯƠNG",
            homeScore: 1,
            awayScore: 2,
            time: "17:30 29/09/2024",
          },
        ],
      },
    ],
  },
  {
    round: "Vòng 2",
    groups: [
      {
        groupName: "BẢNG A",
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
    ],
  },
];

const MatchRoundComponent = () => {
  const [selectedRound, setSelectedRound] = useState("Tất cả");

  const filteredRounds =
    selectedRound === "Tất cả"
      ? roundsData
      : roundsData.filter((round) => round.round === selectedRound);
  useEffect(() => {
    const targetPosition = 245;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 500; // Thời gian (ms) cho hiệu ứng scroll, bạn có thể tăng để làm chậm hơn
    let start = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const scrollY = Math.min(
        startPosition + (distance * progress) / duration,
        targetPosition
      );
      window.scrollTo(0, scrollY);
      if (scrollY < targetPosition) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, []);

  return (
    <div className="match-round-container">
      <div className="round-selection">
        <button
          onClick={() => setSelectedRound("Tất cả")}
          className={selectedRound === "Tất cả" ? "active" : ""}
        >
          TẤT
        </button>
        {roundsData.map((round) => (
          <button
            key={round.round}
            onClick={() => setSelectedRound(round.round)}
            className={selectedRound === round.round ? "active" : ""}
          >
            {round.round}
          </button>
        ))}
      </div>

      <div className="rounds-display">
        {filteredRounds.map((round) => (
          <div key={round.round} className="round-group">
            {round.groups.map((group) => (
              <div key={group.groupName}>
                <h3 className="group-title">{group.groupName}</h3>
                <table className="match-table">
                  <thead>
                    <tr>
                      <th>Vòng</th>
                      <th>Trận đấu</th>
                      <th>Tỉ số</th>
                      <th>Thời gian</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.matches.map((match, index) => (
                      <tr key={index}>
                        <td>{round.round}</td>
                        <td>
                          {match.homeTeam} vs {match.awayTeam}
                        </td>
                        <td>
                          {match.homeScore}-{match.awayScore}
                        </td>
                        <td>{match.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchRoundComponent;
