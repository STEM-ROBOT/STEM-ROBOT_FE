import React, { useState } from 'react';
import './GroupStage.css';

const GroupStage = () => {
  const [teams] = useState(Array.from({ length: 13 }, (_, i) => `Đội #${i + 1}`)); // 9 teams

  // Function to divide teams unevenly across groups, ensuring a minimum of 3 teams per group
  const divideTeamsIntoGroups = (teams, groupCount) => {
    const baseGroupSize = Math.floor(teams.length / groupCount);
    const extraTeams = teams.length % groupCount;
    const groups = [];
    let teamIndex = 0;

    for (let i = 0; i < groupCount; i++) {
      // Add baseGroupSize teams to each group, and if extraTeams are available, add one more to the earlier groups
      const groupSize = baseGroupSize + (i < extraTeams ? 1 : 0);
      const group = teams.slice(teamIndex, teamIndex + groupSize);
      groups.push(group);
      teamIndex += groupSize;
    }
    return groups;
  };

  // Divide teams into groups, here we are dividing into 2 groups as an example
  const groups = divideTeamsIntoGroups(teams, 3);

  // Function to generate matches for each group (round-robin)
  const generateGroupMatches = (group) => {
    const matches = [];
    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        matches.push({ teamA: group[i], teamB: group[j] });
      }
    }
    return matches;
  };

  return (
    <div className="group-stage-container">
      <h2>Vòng bảng</h2>
      
      {groups.map((group, groupIndex) => (
        <div key={groupIndex} className="group-container">
          <h3>Bảng {String.fromCharCode(65 + groupIndex)}</h3>
          <div className="group-teams">
            {group.map((team, index) => (
              <div key={index} className="team-name">{team}</div>
            ))}
          </div>

          {/* Generate matches for the group */}
          <div className="group-matches">
            {generateGroupMatches(group).map((match, matchIndex) => (
              <div key={matchIndex} className="match-row">
                <span>{match.teamA}</span> <span>vs</span> <span>{match.teamB}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupStage;
