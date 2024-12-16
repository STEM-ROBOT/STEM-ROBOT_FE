import React, { useState, useEffect } from "react";
import "./RandomTeamWinner.css";
import api from "../../../../config";
import { useNavigate, useParams } from "react-router-dom";
const teams = [
  {
    id: 18441,
    teamName: "Đội #5",
    teamImage:
      "https://www.pngmart.com/files/22/Manchester-United-Transparent-Images-PNG.png",
    teamMatchResultPlay: "0",
    tolalScore: 1,
    averageMinus: 1,
    averageBonus: 2,
  },
  {
    id: 18442,
    teamName: "Đội #6",
    teamImage:
      "https://th.bing.com/th/id/R.21cb08ff62b3208df56c62f757f23af3?rik=rGpjNFUtqu73vw&riu=http%3a%2f%2ftous-logos.com%2fwp-content%2fuploads%2f2017%2f06%2fManchester-City-logo.png&ehk=6huTPTynrb3KWgriG1H7%2fzwSkam0KhU%2bYd2Kug8FPws%3d&risl=&pid=ImgRaw&r=0",
    teamMatchResultPlay: "0",
    tolalScore: 1,
    averageMinus: 1,
    averageBonus: 2,
  },
];
const RandomTeamWinner = ({ teams, teamMatchWinId }) => {
  const teamMatchWinIdAPI =teamMatchWinId;
  const navigate = useNavigate();
  const { schedule_Id } = useParams();
  const [randomTeam, setRandomTeam] = useState(null);
  const [isRandomizing, setIsRandomizing] = useState(false);
  const [roundResults, setRoundResults] = useState([]);
  const [finalWinner, setFinalWinner] = useState(null);
  const [teamRandom, setTeamRandom] = useState(
    teams?.map((team) => ({
      id: team.teamMatchId,
      hitCount: 0, // Thêm trường hitCount mặc định là 0
    }))
  );
  const startRandomization = () => {
    if (roundResults.length >= 3) return; // Stop after 3 randomizations

    setIsRandomizing(true);

    const interval = setInterval(() => {
      setRandomTeam(teams[Math.floor(Math.random() * teams?.length)]);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      const winner = teams[Math.floor(Math.random() * teams?.length)];
      setRandomTeam(winner);
      setRoundResults((prev) => [...prev, winner]);
      console.log(teamRandom);
      setTeamRandom((prev) =>
        prev.map((team) =>
          team.id === winner.id ? { ...team, hitCount: 1 } : team
        )
      );
      setIsRandomizing(false);

      // Determine the final winner after 3 rounds
      if (roundResults.length >= 2) {
        const counts = {};
        [...roundResults, winner].forEach((team) => {
          counts[team.id] = (counts[team.id] || 0) + 1;
        });

        const final = teams?.reduce((max, team) =>
          counts[team.id] > (counts[max.id] || 0) ? team : max
        );

        setFinalWinner(final);
      }
    }, 4000);
  };

  useEffect(() => {
    console.log(finalWinner);
  }, [finalWinner]);
  const SaveResultMatch = () => {
    const dataApi = {
      teamMatchWinId: teamMatchWinIdAPI,
      teamMatchRandomId: finalWinner.teamMatchId,
      teamId: finalWinner.teamId,
      TeamMatchs: teamRandom,
    };
    api
      .put(
        `/api/schedules/schedule-confirm-random?scheduleId=${schedule_Id}`,
        dataApi
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.message == "success") {
          console.log(response.data.message);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log("cập nhật lỗi", error);
      });
  };
  return (
    <div className="match_display_match_play">
      <div className="result_display_team_list">
        <div className="team_list_random">Các đội cần được xử lí</div>
        <div className="team_list_random_item">
          {teams.map((team) => (
            <div key={team.id} className="team-card_random">
              <img src={team.teamImage} alt={team.teamName} />
              <div className="team-names">{team.teamName}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="result-display">
        {roundResults.length < 3 && (
          <div className="winner">
            <div className={`winner-box ${isRandomizing ? "active" : ""}`}>
              {randomTeam && (
                <img
                  src={randomTeam.teamImage}
                  alt={randomTeam.teamName}
                  className="winner-image"
                />
              )}
            </div>
            {randomTeam && (
              <div className="winner-label">{randomTeam.teamName}</div>
            )}

            <button
              className="random-button"
              style={{ marginTop: "10px" }}
              onClick={startRandomization}
            >
              Chọn ngẫu nhiên - Lượt {roundResults.length + 1}
            </button>
          </div>
        )}
      </div>
      <div
        style={{
          marginBottom: "10px",
          width: "100%",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="winner-label" style={{ marginBottom: "10px" }}>
          Kết quả
        </div>
        <div className="team-grid">
          {roundResults.map((team, index) => (
            <div key={team.id} className="team-card_random">
              <div className="team-names">Lượt {index + 1}</div>
              <img src={team.teamImage} alt={team.teamName} />
              <div className="team-names">{team.teamName}</div>
            </div>
          ))}
        </div>
        {roundResults.length == 3 && (
          <div
            style={{ marginTop: "10px" }}
            className={`btn_manager_head active`}
            onClick={SaveResultMatch}
          >
            Lưu Kết Quả và Thoát
          </div>
        )}
      </div>
    </div>
  );
};

export default RandomTeamWinner;
