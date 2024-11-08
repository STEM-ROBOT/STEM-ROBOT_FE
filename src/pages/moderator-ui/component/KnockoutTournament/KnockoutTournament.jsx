import React, { useEffect, useState } from 'react';
import './KnockoutTournament.css';
import CountdownPopup from '../CountdownPopup/CountdownPopup';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addTeamAssignMatch, getListTeamsKnockout } from '../../../../redux/actions/TeamAction';

const KnockoutTournament = () => {
  const dispatch = useDispatch();
  const { competitionId } = useParams();
  const getTeamsmatch = useSelector((state) => state.getTeamknockout);
  const tournamentData = getTeamsmatch?.listTeams?.data?.data;
 console.log(tournamentData)
  const [rounds, setRounds] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    dispatch(getListTeamsKnockout(competitionId));
  }, [competitionId, dispatch]);

  useEffect(() => {
    if (Array.isArray(tournamentData?.rounds)) {
      setRounds(tournamentData.rounds);
    }
  }, [tournamentData]);

  const getTeamName = (team) => {
    if (!tournamentData?.teams || !team?.teamId) return team?.teamName || "Chưa xác định";
    const foundTeam = tournamentData.teams.find((t) => t.teamId === team.teamId);
    return foundTeam ? foundTeam.name : team.teamName || "Chưa xác định";
  };

  const initialRandomAssignment = () => {

    const shuffledTeams = [...tournamentData.teams].sort(() => Math.random() - 0.5);

    setRounds((prevRounds) => {

      let availableTeams = [...shuffledTeams];

      return prevRounds.map((round) => {
        const newMatches = round.matches.map((match) => {
          const teamMatches = match.teamMatches.map((team) => {
            if (!team.teamId && !team.teamName && availableTeams.length > 0) {
              const uniqueTeam = availableTeams.pop(); // Assign team and remove from availableTeams
              return uniqueTeam ? { ...team, teamId: uniqueTeam.teamId, teamName: uniqueTeam.name } : team;
            }
            return team;
          });
          return { ...match, teamMatches };
        });

        return { ...round, matches: newMatches };
      });
    });
  };



  useEffect(() => {
    if (tournamentData && !tournamentData.isAssign) {
      initialRandomAssignment();
    }
  }, [tournamentData]);

  const randomizeFilledMatches = () => {
    setRounds((prevRounds) =>
      prevRounds.map((round) => {
        let assignedTeams = round.matches.flatMap((match) =>
          match.teamMatches.filter((team) => team.teamId && team.teamName)
        );

        assignedTeams = assignedTeams.sort(() => Math.random() - 0.5);

        const newMatches = round.matches.map((match) => {
          const teamMatches = match.teamMatches.map((team) => {
            if (team.teamId && team.teamName) {
              const randomizedTeam = assignedTeams.pop();
              return randomizedTeam ? { ...team, teamId: randomizedTeam.teamId, teamName: randomizedTeam.teamName } : team;
            }
            return team;
          });
          return { ...match, teamMatches };
        });

        return { ...round, matches: newMatches };
      })
    );

    setSuccessMessage("Bốc thăm thành công!");
  };

  const handleRandomDraw = () => {
    setShowPopup(true);
  };

  const handleCountdownComplete = () => {
    setShowPopup(false);
    randomizeFilledMatches();
  };

  const saveMatchesToDB = () => {
    setIsSaving(true);
    const dataToSave = rounds.flatMap((round) =>
      round.matches.flatMap((match) =>
        [
          {
            matchId: match.matchId,
            teamId: match.teamMatches[0]?.teamId || 0,
            teamName: match.teamMatches[0]?.teamName || "Unknown",
            teamMatchId: match.teamMatches[0]?.teamMatchId || 0,
          },
          {
            matchId: match.matchId,
            teamId: match.teamMatches[1]?.teamId || 0,
            teamName: match.teamMatches[1]?.teamName || "Unknown",
            teamMatchId: match.teamMatches[1]?.teamMatchId || 0,
          },
        ].filter((team) => team.teamId !== 0)
      )
    );
    
    console.log(dataToSave);
    dispatch(addTeamAssignMatch(competitionId, dataToSave))
    setTimeout(() => {
      setIsSaving(false);
      setSuccessMessage("Lưu thành công!");
    }, 1000);
  };

  return (
    <div className="knockout-tournament-container-custom">
      <div className="knockout-tournament-content-custom">
        <h2 className="tournament-title-custom">Sắp xếp cặp đấu - Hình thức loại trực tiếp</h2>
        {
          !tournamentData?.isTeamMatch && (
            <button className="random-draw-button-custom" onClick={handleRandomDraw}>
            Bốc thăm ngẫu nhiên
          </button>
          )
        }
       

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
                  <span className="team-name-custom">{getTeamName(match.teamMatches[0])}</span>
                </div>
                <span className="vs-custom"> - </span>
                <div className="team-selection-container-custom">
                  <span className="team-name-custom">{getTeamName(match.teamMatches[1])}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {
          !tournamentData?.isTeamMatch && (
            <button className="save-button-custom" onClick={saveMatchesToDB} disabled={isSaving}>
        {isSaving ? 'Đang lưu...' : 'Lưu'}
      </button>
          )
        }
     

      {showPopup && <CountdownPopup onComplete={handleCountdownComplete} />}
    </div>
  );
};

export default KnockoutTournament;
