import React, { useState } from 'react';
import './KnockoutTournament.css';

const initialTeams = Array.from({ length: 5 }, (_, i) => `Team #${i + 1}`); // You can set this to any number of teams

const KnockoutTournament = () => {
  const [matches, setMatches] = useState([]);
  const [isDrawn, setIsDrawn] = useState(false);

  // Function to generate empty rounds based on the number of teams
  const generateEmptyRounds = (teamCount) => {
    let rounds = [];
    let matchCount = teamCount / 2;

    while (matchCount >= 1) {
      const round = Array.from({ length: matchCount }, () => [null, null]);
      rounds.push(round);
      matchCount = Math.floor(matchCount / 2);
    }

    return rounds;
  };

  // Function to generate matches with teams randomly assigned and winners for the next rounds
  const generateRoundsWithTeamsAndRandomWinners = (teams) => {
    let currentTeams = [...teams];
    let rounds = [];

    while (currentTeams.length > 1) {
      const round = [];
      for (let i = 0; i < currentTeams.length; i += 2) {
        round.push([currentTeams[i], currentTeams[i + 1]]);
      }
      rounds.push(round);

      // Shuffle the winners for the next round
      const winnersInRound = round.map((match, index) => `W#${index + 1} (Vòng ${rounds.length})`);
      currentTeams = winnersInRound.sort(() => Math.random() - 0.5); // Randomize the winners for the next round
    }

    return rounds;
  };

  const handleRandomDraw = () => {
    const shuffledTeams = initialTeams.sort(() => Math.random() - 0.5);
    const generatedMatches = generateRoundsWithTeamsAndRandomWinners(shuffledTeams);
    setMatches(generatedMatches);
    setIsDrawn(true);
  };

  // Initialize empty matches at the start
  React.useEffect(() => {
    setMatches(generateEmptyRounds(initialTeams.length)); // Generate empty rounds
  }, []);

  return (
    <div className="knockout-tournament-container">
      <div className="knockout-tournament-content">
        <h2>Sắp xếp cặp đấu - Hình thức loại trực tiếp</h2>
        {!isDrawn && (
          <button className="random-draw-btn" onClick={handleRandomDraw}>
            Bốc thăm ngẫu nhiên
          </button>
        )}
      </div>

      {matches.map((round, roundIndex) => (
        <div key={roundIndex} className="round">
          <h3>
            {`Vòng ${roundIndex + 1}`}{" "}
            <span className="match-count">({round.length} trận đấu)</span>
          </h3>
          <div className="match-round">
            {round.map((match, matchIndex) => (
              <div key={matchIndex} className="match">
                <span className="match-number">#{matchIndex + 1}</span> {/* Add match number */}
                <select value={match[0] || ''}>
                  <option value="">{match[0] || 'Chọn đội'}</option>
                </select>
                <span> - </span>
                <select value={match[1] || ''}>
                  <option value="">{match[1] || 'Chọn đội'}</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      ))}

      {isDrawn && (
        <button className="save-btn">
          Lưu
        </button>
      )}
    </div>
  );
};

export default KnockoutTournament;
