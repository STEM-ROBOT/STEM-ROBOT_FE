import React, { useEffect, useState } from 'react';
import './GroupMatch.css';
import CountdownPopup from '../CountdownPopup/CountdownPopup';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addTeamAssignMatch, getTeamMatch } from '../../../../redux/actions/TeamAction';
import { getActive } from '../../../../redux/actions/FormatAction';
import LoadingComponent from '../../../system-ui/component/Loading/LoadingComponent';

const generateRoundRobinSchedule = (teams, tableId) => {
    const clonedTeams = JSON.parse(JSON.stringify(teams)); // Deep clone
    const usedPairs = new Set();
    const totalTeams = clonedTeams.length;

    // Add a "Bye" team if the number of teams is odd
    if (totalTeams % 2 !== 0) {
        clonedTeams.push({ teamId: null, teamName: 'Bye' });
    }

    const numRounds = clonedTeams.length - 1;
    const halfSize = clonedTeams.length / 2;
    const teamList = [...clonedTeams];
    const matches = [];

    for (let round = 0; round < numRounds; round++) {
        for (let i = 0; i < halfSize; i++) {
            const team1 = teamList[i];
            const team2 = teamList[teamList.length - 1 - i];
            const pairKey = `${team1.teamId}-${team2.teamId}`;
            const reversePairKey = `${team2.teamId}-${team1.teamId}`;

            if (
                team1.teamName !== 'Bye' &&
                team2.teamName !== 'Bye' &&
                !usedPairs.has(pairKey) &&
                !usedPairs.has(reversePairKey)
            ) {
                matches.push({ team1, team2 });
                usedPairs.add(pairKey);
                usedPairs.add(reversePairKey);
            }
        }
        teamList.splice(1, 0, teamList.pop());
    }
    return { tableId, matches };
};

const GroupMatch = () => {
    const { competitionId } = useParams();
    const dispatch = useDispatch();
    const listTeamMatchs = useSelector((state) => state.getListTeamMatch);
    const loadingGet = useSelector((state) => state.getListTeamMatch.loading);
    const teamMatchs = listTeamMatchs.listTeamMatch?.data;

    const [initialTeamMatches, setInitialTeamMatches] = useState(null);
    const [data, setData] = useState();
    const [currentRoundName, setCurrentRoundName] = useState();
    const [showPopup, setShowPopup] = useState(false);
    const [groupSchedules, setGroupSchedules] = useState({});
    const isAddSuccess = useSelector((state) => state.addTeamAssignMatch?.success);

    useEffect(() => {
        dispatch(getTeamMatch(competitionId));
        dispatch(getActive(competitionId));
    }, [competitionId, dispatch, isAddSuccess]);

    useEffect(() => {
        if (teamMatchs) {
            const clonedMatches = JSON.parse(JSON.stringify(teamMatchs));
            setInitialTeamMatches(clonedMatches);
            setCurrentRoundName(clonedMatches.rounds[0]?.roundName);

            const updatedData = { ...clonedMatches };
            updatedData.rounds.forEach((round, indexRound) => {
                round.tables.forEach((table) => {
                    const tableGroupData = clonedMatches.tableGroup.find((group) => group.team_tableId === table.tableId);
                    const teams = tableGroupData ? JSON.parse(JSON.stringify(tableGroupData.team_table)) : [];
                    const tableId = tableGroupData ? tableGroupData.team_tableId : null;
                    const schedule = generateRoundRobinSchedule(teams, tableId);

                    table.matches.forEach((match, index) => {
                        const generatedMatch = schedule.matches[table.matches.length * indexRound + index];
                        if (generatedMatch) {
                            match.teamMatches[0].teamId = generatedMatch.team1.teamId || null;
                            match.teamMatches[0].teamName = generatedMatch.team1.teamName || "Unknown";
                            match.teamMatches[1].teamId = generatedMatch.team2.teamId || null;
                            match.teamMatches[1].teamName = generatedMatch.team2.teamName || "Unknown";
                        }
                    });
                });
            });
            setData(updatedData);
        }
    }, [teamMatchs]);

    const randomizeMatches = () => {
        const clonedInitialMatches = JSON.parse(JSON.stringify(initialTeamMatches));
        const dataUse = clonedInitialMatches;

        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        };

        if (!initialTeamMatches.isTeamMatch) {
            dataUse.rounds.forEach((round) => {
                round.tables.forEach((table) => {
                    const tableGroupData = dataUse.tableGroup.find((group) => group.team_tableId === table.tableId);
                    const teams = tableGroupData ? JSON.parse(JSON.stringify(tableGroupData.team_table)) : [];
                    shuffleArray(teams);

                    if (tableGroupData) {
                        tableGroupData.team_table = teams;
                    }
                });
            });

            dataUse.rounds.forEach((round, indexRound) => {
                round.tables.forEach((table) => {
                    const tableGroupData = dataUse.tableGroup.find((group) => group.team_tableId === table.tableId);
                    const teams = tableGroupData ? JSON.parse(JSON.stringify(tableGroupData.team_table)) : [];
                    const tableId = tableGroupData ? tableGroupData.team_tableId : null;
                    const schedule = generateRoundRobinSchedule(teams, tableId);

                    table.matches.forEach((match, index) => {
                        const generatedMatch = schedule.matches[table.matches.length * indexRound + index];
                        if (generatedMatch) {
                            match.teamMatches[0].teamId = generatedMatch.team1.teamId || null;
                            match.teamMatches[0].teamName = generatedMatch.team1.teamName || "Unknown";
                            match.teamMatches[1].teamId = generatedMatch.team2.teamId || null;
                            match.teamMatches[1].teamName = generatedMatch.team2.teamName || "Unknown";
                        }
                    });
                });
            });
        }
        setData(dataUse);
        setGroupSchedules(dataUse);
    };

    const handleRandomDraw = () => {
        setShowPopup(true);
    };

    const handleCountdownComplete = () => {
        setShowPopup(false);
        randomizeMatches();
    };

    const renderMatchesForRound = (roundName, tableId, matches) => {
        if (!Array.isArray(matches) || matches.length === 0) {
            return <p>Không có trận đấu</p>;
        }

        return matches.map((match, index) => (
            <div key={index} className="match-pair">
                <select
                    className="match-team-select"
                    value={match.teamMatches[0]?.teamName || ""}
                    onChange={(e) => console.log(`Selected team ${e.target.value} for match`)}
                >
                    <option value={match.teamMatches[0]?.teamName || ""}>
                        {match.teamMatches[0]?.teamName || "N/A"}
                    </option>
                </select>
                <span className="match-vs"> - </span>
                <select
                    className="match-team-select"
                    value={match.teamMatches[1]?.teamName || ""}
                    onChange={(e) => console.log(`Selected team ${e.target.value} for match`)}
                >
                    <option value={match.teamMatches[1]?.teamName || ""}>
                        {match.teamMatches[1]?.teamName || "N/A"}
                    </option>
                </select>
            </div>
        ));
    };

    const saveMatchesToDatabase = async () => {
        if (!teamMatchs.isTeamMatch) {
            const matchData = [];
            const clonedData = JSON.parse(JSON.stringify(data));

            clonedData.rounds.forEach((round) => {
                round.tables.forEach((table) => {
                    table.matches.forEach((match) => {
                        const team1Data = {
                            matchId: match.matchId,
                            teamId: match.teamMatches[0]?.teamId || 0,
                            teamName: match.teamMatches[0]?.teamName || "Unknown",
                            teamMatchId: match.teamMatches[0]?.teamMatchId || 0,
                        };
                        const team2Data = {
                            matchId: match.matchId,
                            teamId: match.teamMatches[1]?.teamId || 0,
                            teamName: match.teamMatches[1]?.teamName || "Unknown",
                            teamMatchId: match.teamMatches[1]?.teamMatchId || 0,
                        };
                        matchData.push(team1Data);
                        matchData.push(team2Data);
                    });
                });
            });

            dispatch(addTeamAssignMatch(competitionId, matchData));
        }
    };

    return (
        <div className="group-match-container">
            <h2 className="group-match-title">Sắp xếp cặp đấu</h2>
            <p className="group-match-description">Bạn có thể thay đổi cấu hình cho từng trận đấu.</p>

            {loadingGet ? (
                <LoadingComponent borderRadius="8px" backgroundColor="rgba(0, 0, 0, 0.0)" />
            ) : (
                <>
                    {!teamMatchs?.isTeamMatch && (
                        <div className="button-container">
                            <button className="random-btn" onClick={handleRandomDraw}>Bốc thăm ngẫu nhiên</button>
                        </div>
                    )}
                    <div className="group-stage">
                        <div className="round-tabs">
                            {data?.rounds.map((round) => (
                                <button
                                    key={round.roundName}
                                    className={`round-tab-btn ${currentRoundName === round.roundName ? 'active' : ''}`}
                                    onClick={() => setCurrentRoundName(round.roundName)}
                                >
                                    Vòng {round.roundName}
                                </button>
                            ))}
                        </div>
                        <div className="group-matches">
                            {data?.rounds
                                .filter((round) => round.roundName === currentRoundName)
                                .map((round) =>
                                    round.tables.map((table) => (
                                        <div key={`${round.roundName}-${table.tableId}`} className="group-container">
                                            <h3 className="group-title">{`Vòng ${round.roundName} - Bảng ${table.tableName}`}</h3>
                                            {renderMatchesForRound(round.roundName, table.tableId, table.matches)}
                                        </div>
                                    ))
                                )}
                        </div>
                    </div>
                    {!teamMatchs?.isTeamMatch && (
                        <button className="save-btn" onClick={saveMatchesToDatabase}>Lưu</button>
                    )}
                </>
            )}


            {showPopup && <CountdownPopup onComplete={handleCountdownComplete} />}
        </div>
    );
};

export default GroupMatch;
