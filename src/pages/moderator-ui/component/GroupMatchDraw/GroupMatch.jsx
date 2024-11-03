import React, { useEffect, useState } from 'react';
import './GroupMatch.css';
import CountdownPopup from '../CountdownPopup/CountdownPopup';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getTeamMatch } from '../../../../redux/actions/TeamAction';

const data = {
    tableGroup: [
        {
            team_tableId: 1,
            team_table: [
                { teamId: 4, teamName: "Đội #4" },
                { teamId: 5, teamName: "Đội #5" },
                { teamId: 6, teamName: "Đội #6" },
                { teamId: 3, teamName: "Đội #3" }
            ]
        },
        {
            team_tableId: 2,
            team_table: [
                { teamId: 7, teamName: "Đội #7" },
                { teamId: 8, teamName: "Đội #8" },
                { teamId: 9, teamName: "Đội #9" },
                { teamId: 10, teamName: "Đội #10" }
            ]
        }
    ],
    rounds: [
        {
            roundId: 1,
            roundName: "Vòng 1",
            tables: [
                {
                    tableId: 1,
                    tableName: "Bảng A",
                    matches: [
                        {
                            matchId: 1,
                            teamMatches: [
                                { teamMatchId: 1, teamId: null, teamName: null },
                                { teamMatchId: 2, teamId: null, teamName: null }
                            ]
                        }, {
                            matchId: 2,
                            teamMatches: [
                                { teamMatchId: 1, teamId: null, teamName: null },
                                { teamMatchId: 2, teamId: null, teamName: null }
                            ]
                        }
                    ]
                },
                {
                    tableId: 2,
                    tableName: "Bảng B",
                    matches: [
                        {
                            matchId: 4,
                            teamMatches: [
                                { teamMatchId: 7, teamId: null, teamName: null },
                                { teamMatchId: 8, teamId: null, teamName: null }
                            ]
                        }
                        , {
                            matchId: 5,
                            teamMatches: [
                                { teamMatchId: 1, teamId: null, teamName: null },
                                { teamMatchId: 2, teamId: null, teamName: null }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            roundId: 2,
            roundName: "Vòng 2",
            tables: [
                {
                    tableId: 1,
                    tableName: "Bảng A",
                    matches: [
                        {
                            matchId: 2,
                            teamMatches: [
                                { teamMatchId: 3, teamId: null, teamName: null },
                                { teamMatchId: 4, teamId: null, teamName: null }
                            ]
                        },
                        {
                            matchId: 1,
                            teamMatches: [
                                { teamMatchId: 1, teamId: null, teamName: null },
                                { teamMatchId: 2, teamId: null, teamName: null }
                            ]
                        }
                    ]
                },
                {
                    tableId: 2,
                    tableName: "Bảng B",
                    matches: [
                        {
                            matchId: 5,
                            teamMatches: [
                                { teamMatchId: 9, teamId: null, teamName: null },
                                { teamMatchId: 10, teamId: null, teamName: null }
                            ]
                        },
                        {
                            matchId: 1,
                            teamMatches: [
                                { teamMatchId: 1, teamId: null, teamName: null },
                                { teamMatchId: 2, teamId: null, teamName: null }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            roundId: 3,
            roundName: "Vòng 3",
            tables: [
                {
                    tableId: 1,
                    tableName: "Bảng A",
                    matches: [
                        {
                            matchId: 3,
                            teamMatches: [
                                { teamMatchId: 5, teamId: null, teamName: null },
                                { teamMatchId: 6, teamId: null, teamName: null }
                            ]
                        },
                        {
                            matchId: 1,
                            teamMatches: [
                                { teamMatchId: 1, teamId: null, teamName: null },
                                { teamMatchId: 2, teamId: null, teamName: null }
                            ]
                        }
                    ]
                },
                {
                    tableId: 2,
                    tableName: "Bảng B",
                    matches: [
                        {
                            matchId: 6,
                            teamMatches: [
                                { teamMatchId: 11, teamId: null, teamName: null },
                                { teamMatchId: 12, teamId: null, teamName: null }
                            ]
                        },
                        {
                            matchId: 1,
                            teamMatches: [
                                { teamMatchId: 1, teamId: null, teamName: null },
                                { teamMatchId: 2, teamId: null, teamName: null }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    isAssign: false
};

// Helper function to generate a round-robin schedule for each group without duplicate pairs
const generateRoundRobinSchedule = (teams) => {
    const rounds = [];
    const totalTeams = teams.length;

    if (totalTeams % 2 !== 0) {
        teams.push({ teamId: null, teamName: 'Bye' }); // Add a "Bye" if odd number of teams
    }

    const numRounds = teams.length - 1;
    const halfSize = teams.length / 2;

    const teamList = [...teams];
    const usedPairs = new Set(); // Track pairs to avoid duplicates

    for (let round = 0; round < numRounds; round++) {
        const matches = [];
        for (let i = 0; i < halfSize; i++) {
            const team1 = teamList[i];
            const team2 = teamList[teamList.length - 1 - i];
            const pairKey = `${team1.teamId}-${team2.teamId}`;

            // Skip if this pair was already used
            if (team1.teamName !== 'Bye' && team2.teamName !== 'Bye' && !usedPairs.has(pairKey)) {
                matches.push([team1, team2]);
                usedPairs.add(pairKey); // Mark this pair as used
            }
        }
        rounds.push(matches);

        // Rotate teams but keep the first team fixed
        teamList.splice(1, 0, teamList.pop());
    }

    return rounds;
};

const GroupMatch = () => {
    const {competitionId} = useParams();
    const dispatch =useDispatch();

   
    const [currentRound, setCurrentRound] = useState(1);
    const [showPopup, setShowPopup] = useState(false);
    const [groupSchedules, setGroupSchedules] = useState(
        data.rounds.reduce((acc, round) => {
            round.tables.forEach((table) => {
                const teams = data.tableGroup.find(group => group.team_tableId === table.tableId)?.team_table || [];
                acc[`${round.roundName}-${table.tableName}`] = generateRoundRobinSchedule(teams);
            });
            return acc;
        }, {})
    );
    useEffect(()=>{
        dispatch(getTeamMatch(competitionId));
    },[competitionId])

    const randomizeMatches = () => {
        const newSchedules = data.rounds.reduce((acc, round) => {
            round.tables.forEach((table) => {
                const teams = data.tableGroup.find(group => group.team_tableId === table.tableId)?.team_table || [];
                acc[`${round.roundName}-${table.tableName}`] = generateRoundRobinSchedule(teams).sort(() => Math.random() - 0.5);
            });
            return acc;
        }, {});
        setGroupSchedules(newSchedules);
    };

    const handleRandomDraw = () => {
        setShowPopup(true);
    };

    const handleCountdownComplete = () => {
        setShowPopup(false);
        randomizeMatches();
    };

    const renderMatchesForRound = (roundName, tableName) => {
        const key = `${roundName}-${tableName}`;
        const matchesInRound = groupSchedules[key] && groupSchedules[key][currentRound - 1];
        if (!matchesInRound) return <p>Không có trận đấu</p>;

        return matchesInRound.map((match, index) => (
            <div key={index} className="match-pair">
                <select
                    className="match-team-select"
                    value={match[0].teamName}
                    onChange={(e) => console.log(`Selected team ${e.target.value} for match`)}
                >
                    <option>{match[0].teamName}</option>
                </select>
                <span className="match-vs"> - </span>
                <select
                    className="match-team-select"
                    value={match[1].teamName}
                    onChange={(e) => console.log(`Selected team ${e.target.value} for match`)}
                >
                    <option>{match[1].teamName}</option>
                </select>
            </div>
        ));
    };

    return (
        <div className="group-match-container">
            <h2 className="group-match-title">Sắp xếp cặp đấu</h2>
            <p className="group-match-description">Bạn có thể thay đổi cấu hình cho từng trận đấu.</p>

            <div className="button-container">
                <button className="random-btn" onClick={handleRandomDraw}>Bốc thăm ngẫu nhiên</button>
            </div>

            <div className="group-stage">
                <div className="round-tabs">
                    {data.rounds.map((round) => (
                        <button
                            key={round.roundId}
                            className={`round-tab-btn ${currentRound === round.roundId ? 'active' : ''}`}
                            onClick={() => setCurrentRound(round.roundId)}
                        >
                            {round.roundName}
                        </button>
                    ))}
                </div>

                <div className="group-matches">
                    {data.rounds
                        .filter(round => round.roundId === currentRound)
                        .map((round) =>
                            round.tables.map((table) => (
                                <div key={`${round.roundId}-${table.tableId}`} className="group-container">
                                    <h3 className="group-title">{`${round.roundName} - ${table.tableName}`}</h3>
                                    {renderMatchesForRound(round.roundName, table.tableName)}
                                </div>
                            ))
                        )}
                </div>
            </div>

            <button className="save-btn">Lưu</button>

            {showPopup && <CountdownPopup onComplete={handleCountdownComplete} />}
        </div>
    );
};

export default GroupMatch;
