import React, { useState, useEffect } from "react";
import "./RandomTeamWinner.css";
const teams = [
  {
    id: 18441,
    teamName: "Đội #5",
    teamImage:
      "https://www.pngmart.com/files/22/Manchester-United-Transparent-Images-PNG.png",
    teamMatchResultPlay: "0",
    tolalScore: 1,
    averageMinus:1,
    averageBonus:2,
  },
  {
    id: 18442,
    teamName: "Đội #6",
    teamImage:
      "https://th.bing.com/th/id/R.21cb08ff62b3208df56c62f757f23af3?rik=rGpjNFUtqu73vw&riu=http%3a%2f%2ftous-logos.com%2fwp-content%2fuploads%2f2017%2f06%2fManchester-City-logo.png&ehk=6huTPTynrb3KWgriG1H7%2fzwSkam0KhU%2bYd2Kug8FPws%3d&risl=&pid=ImgRaw&r=0",
    teamMatchResultPlay: "0",
    tolalScore: 1,
    averageMinus:1,
    averageBonus:2,
  },
];
const RandomTeamWinner = () => {
  const [randomTeam, setRandomTeam] = useState(null);
  const [isRandomizing, setIsRandomizing] = useState(false);
  const [roundResults, setRoundResults] = useState([]);
  const [finalWinner, setFinalWinner] = useState(null);
  const startRandomization = () => {
    if (roundResults.length >= 3) return; // Stop after 3 randomizations

    setIsRandomizing(true);

    const interval = setInterval(() => {
      setRandomTeam(teams[Math.floor(Math.random() * teams.length)]);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      const winner = teams[Math.floor(Math.random() * teams.length)];
      setRandomTeam(winner);
      setRoundResults((prev) => [...prev, winner]);

      setIsRandomizing(false);

      // Determine the final winner after 3 rounds
      if (roundResults.length === 2) {
        const counts = {};
        [...prev, winner].forEach((team) => {
          counts[team.id] = (counts[team.id] || 0) + 1;
        });

        const final = teams.reduce((max, team) =>
          counts[team.id] > (counts[max.id] || 0) ? team : max
        );
        setFinalWinner(final);
      }
    }, 4000);
  };

  return (
    <div className="match_display_match_play">
      <div className="result-display">
        <div className="team-left">
          <img src={teams[0].teamImage} alt={teams[0].teamName} />
          <div className="team-name">{teams[0].teamName}</div>
        </div>
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
          <div className="winner-label">WINNER</div>
        </div>
        <div className="team-right">
          <img src={teams[1].teamImage} alt={teams[1].teamName} />
          <div className="team-name">{teams[1].teamName}</div>
        </div>
      </div>
      <button className="random-button" onClick={startRandomization}>
        Randomize Winner
      </button>
      <div className="team-grid">
        {roundResults.map((team) => (
          <div key={team.id} className="team-card">
            <img src={team.teamImage} alt={team.teamName} />
            <div className="team-name">{team.teamName}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RandomTeamWinner;
