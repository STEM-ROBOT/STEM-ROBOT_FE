import React, { useState } from 'react';
import './KnockoutTournament.css';
import CountdownPopup from '../CountdownPopup/CountdownPopup';


const KnockoutTournament = ({ tournamentData }) => {
  const [rounds, setRounds] = useState(tournamentData.rounds); 
  const [showPopup, setShowPopup] = useState(false); 
  const [successMessage, setSuccessMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false); // To handle saving state

  // Lấy tên đội dựa trên ID
  const getTeamName = (teamId) => {
    const team = tournamentData.teams.find((t) => t.id === teamId);
    return team ? team.name : teamId; 
  };

  const randomizeMatches = () => {
    const updatedRounds = { ...rounds };

    Object.keys(updatedRounds).forEach((roundKey) => {
      let currentRound = { ...updatedRounds[roundKey] };

      let availableTeams = currentRound.matches
        .flatMap((match) => [match.team1Id, match.team2Id])
        .filter((teamId) => !teamId.toString().includes("w#"));

      availableTeams = availableTeams.sort(() => Math.random() - 0.5);

      currentRound.matches.forEach((match) => {
        if (!match.team1Id.toString().includes("w#")) {
          match.team1Id = availableTeams.pop(); 
        }
        if (!match.team2Id.toString().includes("w#")) {
          match.team2Id = availableTeams.pop();
        }
      });

      updatedRounds[roundKey] = currentRound;
    });

    setRounds(updatedRounds); 
    setSuccessMessage('Cập nhật thành công!');
  };

  const handleRandomDraw = () => {
    setShowPopup(true); 
  };

  const handleCountdownComplete = () => {
    setShowPopup(false);
    randomizeMatches();  
  };

  // Function to handle saving rounds to the database
  const saveMatchesToDB = async () => {
    setIsSaving(true); // Mark as saving
    
     
      const dataToSave = {
        tournamentId: tournamentData.id, 
        rounds: rounds,
      };
      console.log(dataToSave)

     
  };

  return (
    <div className="knockout-tournament-container-custom">
      <div className="knockout-tournament-content-custom">
        <h2 className="tournament-title-custom">Sắp xếp cặp đấu - Hình thức loại trực tiếp</h2>
        
        {!tournamentData.status && (
          <button className="random-draw-button-custom" onClick={handleRandomDraw}>
            Bốc thăm ngẫu nhiên 
          </button>
        )}

        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>

      {/* Hiển thị các vòng đấu */}
      {Object.keys(rounds).map((roundKey, roundIndex) => (
        <div key={roundIndex} className="round-container-custom">
          <h3 className="round-title-custom">
            {`Vòng ${roundKey}`}{" "}
            <span className="match-count-custom">({rounds[roundKey].matches.length} trận đấu)</span>
          </h3>
          <div className="match-round-container-custom">
            {rounds[roundKey].matches.map((match, matchIndex) => (
              <div key={matchIndex} className={`match-container-custom match-number-${matchIndex + 1}`}>
                <span className="match-number-custom"># {matchIndex + 1}</span>
                <div className="team-selection-container-custom">
                  <span className="team-name-custom">{getTeamName(match.team1Id)}</span>
                </div>
                <span className="vs-custom"> - </span>
                <div className="team-selection-container-custom">
                  <span className="team-name-custom">{getTeamName(match.team2Id)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <button className="save-button-custom" onClick={saveMatchesToDB} disabled={isSaving}>
        {isSaving ? 'Đang lưu...' : 'Lưu'}
      </button>

      {showPopup && <CountdownPopup onComplete={handleCountdownComplete} />}
    </div>
  );
};

export default KnockoutTournament;
