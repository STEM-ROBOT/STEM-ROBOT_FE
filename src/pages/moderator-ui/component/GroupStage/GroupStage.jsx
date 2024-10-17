import React, { useState } from 'react';
import './GroupStage.css';

const GroupStage = () => {
  const [teams] = useState(Array.from({ length: 8 }, (_, i) => `ĐỘI #${i + 1}`));

  // Divide teams into groups, ensuring a minimum of 4 teams per group
  const divideTeamsIntoGroups = (teams, groupCount) => {
    const baseGroupSize = Math.floor(teams.length / groupCount);
    const extraTeams = teams.length % groupCount;
    const groups = [];
    let teamIndex = 0;

    for (let i = 0; i < groupCount; i++) {
      const groupSize = baseGroupSize + (i < extraTeams ? 1 : 0);
      const group = teams.slice(teamIndex, teamIndex + groupSize);
      groups.push(group);
      teamIndex += groupSize;
    }
    return groups;
  };

  const groups = divideTeamsIntoGroups(teams, 2); // For example, dividing into 2 groups

  // Function to generate matches for each group and round
  const generateGroupMatches = (group, round) => {
    const matches = [];
    const half = Math.ceil(group.length / 2);
    
    for (let i = 0; i < half; i++) {
      const teamA = group[i];
      const teamB = group[group.length - i - 1];
      matches.push({ teamA, teamB });
    }
    return matches;
  };

  const rounds = [1, 2, 3]; // Example rounds
  return (
    <div className="group-stage-container">
      <h2>Vòng bảng - Hình thức vòng tròn</h2>
      {groups.map((group, groupIndex) => (
        <div key={groupIndex} className="group-container">
          <div className="group-header">
            <h3>BẢNG {String.fromCharCode(65 + groupIndex)}</h3>
            {rounds.map((round) => (
              <div key={round} className="round-container">
                <h4>VÒNG {round}</h4>
                <div className="match-container">
                  {generateGroupMatches(group, round).map((match, matchIndex) => (
                    <div key={matchIndex} className="match-row">
                      <span>{matchIndex + 1}</span>
                      <span>{match.teamA}</span>
                      <span className="vs">vs</span>
                      <span>{match.teamB}</span>
                      <span className="status">Chưa có lịch thi đấu</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupStage;
