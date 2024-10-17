import React from 'react';
import './KnockoutStage.css';

// Example data for advancing teams
const advancingTeams = [
    { id: 1, name: 'Nhất Bảng A = Chưa xác định' },
    { id: 2, name: 'Nhì Bảng A = Chưa xác định' },
    { id: 3, name: 'Nhất Bảng C = Chưa xác định' },
    { id: 4, name: 'Nhì Bảng D = Chưa xác định' },
];

// Function to generate matches based on advancing teams
const generateKnockoutRounds = (teams) => {
    const rounds = [];
    let currentRoundTeams = [...teams];

    // Generate rounds until we have 1 match left (final)
    while (currentRoundTeams.length > 1) {
        const roundMatches = [];
        for (let i = 0; i < currentRoundTeams.length; i += 2) {
            roundMatches.push([currentRoundTeams[i], currentRoundTeams[i + 1]]);
        }
        rounds.push(roundMatches);
        currentRoundTeams = roundMatches.map(() => 'Chưa xác định');
    }
    return rounds;
};

const KnockoutStage = () => {
    const knockoutRounds = generateKnockoutRounds(advancingTeams);

    return (
        <div className="knockout-stage-container">
            {knockoutRounds.map((round, roundIndex) => (
                <div key={roundIndex} className="knockout-round">
                    <h3>Vòng {roundIndex + 1}</h3>
                    {round.map((match, matchIndex) => (
                        <div key={matchIndex} className="match-pair">
                            <select value={match[0].name}>
                                <option>{match[0].name}</option>
                            </select>
                            <span> - </span>
                            <select value={match[1].name}>
                                <option>{match[1].name}</option>
                            </select>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default KnockoutStage;
