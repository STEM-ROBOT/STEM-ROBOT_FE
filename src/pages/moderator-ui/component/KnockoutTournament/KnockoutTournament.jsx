import React, { useEffect, useState } from 'react';
import './KnockoutTournament.css';
import CountdownPopup from '../CountdownPopup/CountdownPopup';

const KnockoutTournament = ({ tournamentData }) => {
  const [rounds, setRounds] = useState(tournamentData.rounds);
  const [showPopup, setShowPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!tournamentData.isAssign) {
      initialRandomAssignment(); // Initial randomization for empty slots if not assigned
    }
  }, [tournamentData.isAssign]);

  const getTeamName = (team) => {
    if (!tournamentData.teams || !team.teamId) return team.teamName || team.teamId;
    const foundTeam = tournamentData.teams.find((t) => t.teamId === team.teamId);
    return foundTeam ? foundTeam.name : team.teamName || team.teamId;
  };

  // Function to initially assign teams to empty matches
  const initialRandomAssignment = () => {
    setRounds((prevRounds) =>
      prevRounds.map((round) => {
        let availableTeams = [...tournamentData.teams].sort(() => Math.random() - 0.5); // Shuffle available teams
        const usedTeams = new Set();

        const newMatches = round.matches.map((match) => {
          const teamsmatch = match.teamsmatch.map((team) => {
            if (!team.teamId && !team.teamName && availableTeams.length > 0) {
              // Assign a unique team from the available list
              let uniqueTeam;
              while (availableTeams.length > 0) {
                uniqueTeam = availableTeams.pop();
                if (!usedTeams.has(uniqueTeam.teamId)) {
                  usedTeams.add(uniqueTeam.teamId);
                  break;
                }
              }
              return uniqueTeam ? { ...team, teamId: uniqueTeam.teamId, teamName: uniqueTeam.name } : team;
            }
            return team;
          });
          return { ...match, teamsmatch };
        });

        return { ...round, matches: newMatches };
      })
    );

    setSuccessMessage("Cập nhật thành công!");
  };

  // Function to randomize only the matches with pre-assigned teams, ensuring no duplicates within the round
  const randomizeFilledMatches = () => {
    setRounds((prevRounds) =>
      prevRounds.map((round) => {
        // Extract all teams currently assigned in this round
        let assignedTeams = round.matches.flatMap((match) =>
          match.teamsmatch.filter((team) => team.teamId && team.teamName)
        );

        // Shuffle assigned teams to randomize them within the round
        assignedTeams = assignedTeams.sort(() => Math.random() - 0.5);

        // Replace matches with the randomized teams
        const newMatches = round.matches.map((match) => {
          const teamsmatch = match.teamsmatch.map((team) => {
            if (team.teamId && team.teamName) {
              // Pop a randomized team from the list for reassignment
              const randomizedTeam = assignedTeams.pop();
              return randomizedTeam ? { ...team, teamId: randomizedTeam.teamId, teamName: randomizedTeam.teamName } : team;
            }
            return team;
          });
          return { ...match, teamsmatch };
        });

        return { ...round, matches: newMatches };
      })
    );

    setSuccessMessage("Bốc thăm thành công!");
  };

  const handleRandomDraw = () => {
    setShowPopup(true); // Show countdown popup
  };

  const handleCountdownComplete = () => {
    setShowPopup(false); // Close the popup
    randomizeFilledMatches(); // Randomize only filled slots after countdown and display immediately
  };

  const saveMatchesToDB = async () => {
    setIsSaving(true);

    const dataToSave = {
      tournamentId: tournamentData.id,
      rounds,
    };
    console.log(dataToSave);

    setTimeout(() => {
      setIsSaving(false);
      setSuccessMessage("Lưu thành công!");
    }, 1000);
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

      {rounds.map((round, roundIndex) => (
        <div key={roundIndex} className="round-container-custom">
          <h3 className="round-title-custom">
            {`Vòng ${round.roundName}`}{" "}
            <span className="match-count-custom">({round.matches.length} trận đấu)</span>
          </h3>
          <div className="match-round-container-custom">
            {round.matches.map((match, matchIndex) => (
              <div key={matchIndex} className={`match-container-custom match-number-${matchIndex + 1}`}>
                <span className="match-number-custom"># {matchIndex + 1}</span>
                <div className="team-selection-container-custom">
                  <span className="team-name-custom">{getTeamName(match.teamsmatch[0])}</span>
                </div>
                <span className="vs-custom"> - </span>
                <div className="team-selection-container-custom">
                  <span className="team-name-custom">{getTeamName(match.teamsmatch[1])}</span>
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
