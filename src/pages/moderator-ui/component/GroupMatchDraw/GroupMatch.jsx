import React, { useEffect, useState } from 'react';
import './GroupMatch.css';
import CountdownPopup from '../CountdownPopup/CountdownPopup';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addTeamAssignMatch, getTeamMatch } from '../../../../redux/actions/TeamAction';

const generateRoundRobinSchedule = (teams, tableId) => {
    const usedPairs = new Set();
    const totalTeams = teams.length;

    const clonedTeams = JSON.parse(JSON.stringify(teams));

    // If the number of teams is odd, add a 'Bye' team
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
                matches.push({
                    team1,
                    team2,
                });
                usedPairs.add(pairKey);
                usedPairs.add(reversePairKey);
            }
        }
        // Rotate the team list for the next round (Round-Robin technique)
        teamList.splice(1, 0, teamList.pop());
    }

    // Return the desired structure with all matches for the given tableId
    return { tableId, matches };
};


const GroupMatch = () => {
    const { competitionId } = useParams();
    const dispatch = useDispatch();
    const listTeamMatchs = useSelector((state) => state.getListTeamMatch);
    const teamMatchs = listTeamMatchs.listTeamMatch?.data;

    const [data, setData] = useState();
    const [currentRoundName, setCurrentRoundName] = useState();
    const [showPopup, setShowPopup] = useState(false);
    const [groupSchedules, setGroupSchedules] = useState({});

    useEffect(() => {
        dispatch(getTeamMatch(competitionId));
    }, [competitionId, dispatch]);

    // useEffect(() => {

    //     if (teamMatchs) {
    //         setData(teamMatchs);
    //     }

    // }, [teamMatchs]);


    useEffect(() => {

        if (teamMatchs) {
            setCurrentRoundName(teamMatchs.rounds[0]?.roundName);

            if (!teamMatchs.isTeamMatch) {
                const dataUse = teamMatchs
                const updatedData = { ...dataUse };

                // Cache to store generated schedules by tableId, ensuring each table uses the same schedule across all rounds


                updatedData.rounds.forEach((round, indexroud) => {
                    const scheduleCache = {};

                    round.tables.forEach((table) => {
                        // Find teams associated with the current tableId
                        const tableGroupData = teamMatchs.tableGroup.find((group) => group.team_tableId === table.tableId);
                        const teams = tableGroupData ? tableGroupData.team_table : [];
                        const tableId = tableGroupData ? tableGroupData.team_tableId : null;

                        // Check if the schedule for this tableId is already in the cache


                        // Generate and cache the schedule if it hasn't been generated yet
                        const schedule = generateRoundRobinSchedule(teams, tableId);

                        // Assign team pairs to teamMatches in `table.matches` for each round based on the cached schedule
                        table.matches.forEach((match, index) => {
                            // console.log(generatedMatches[index])
                            const generatedMatch = schedule.matches[table.matches.length * indexroud + index];

                            if (generatedMatch) {
                                // Set team1 details from the cached matches
                                match.teamMatches[0].teamId = generatedMatch.team1.teamId || null;
                                match.teamMatches[0].teamName = generatedMatch.team1.teamName || "Unknown";

                                // Set team2 details from the cached matches
                                match.teamMatches[1].teamId = generatedMatch.team2.teamId || null;
                                match.teamMatches[1].teamName = generatedMatch.team2.teamName || "Unknown";
                            }
                        });


                    });
                });
                console.log(updatedData);

                setData(updatedData);
            }

        }
    }, [teamMatchs]);




    // Shuffle function (Fisher-Yates algorithm)

    const randomizeMatches = () => {
        if (!data.isTeamMatch) {
            setCurrentRoundName(teamMatchs.rounds[0]?.roundName);
            const dataUse = JSON.parse(JSON.stringify(teamMatchs));
            const updatedData = { ...dataUse };

            // Cache to store generated schedules by tableId, ensuring each table uses the same schedule across all rounds

            const shuffleArray = (array) => {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
            };
            updatedData.rounds.forEach((round, indexroud) => {

                round.tables.forEach((table) => {
                    // Find teams associated with the current tableId
                    const tableGroupData = teamMatchs.tableGroup.find((group) => group.team_tableId === table.tableId);
                    const teams = tableGroupData ? tableGroupData.team_table : [];
                    const tableId = tableGroupData ? tableGroupData.team_tableId : null;

                    // Check if the schedule for this tableId is already in the cache
                    shuffleArray(teams);
                    // Generate and cache the schedule if it hasn't been generated yet
                    const schedule = generateRoundRobinSchedule(teams, tableId);

                    // Assign team pairs to teamMatches in `table.matches` for each round based on the cached schedule
                    table.matches.forEach((match, index) => {
                        // console.log(generatedMatches[index])
                        const generatedMatch = schedule.matches[table.matches.length * indexroud + index];

                        if (generatedMatch) {
                            // Set team1 details from the cached matches
                            match.teamMatches[0].teamId = generatedMatch.team1.teamId || null;
                            match.teamMatches[0].teamName = generatedMatch.team1.teamName || "Unknown";

                            // Set team2 details from the cached matches
                            match.teamMatches[1].teamId = generatedMatch.team2.teamId || null;
                            match.teamMatches[1].teamName = generatedMatch.team2.teamName || "Unknown";
                        }
                    });


                });
            });
            setData(updatedData);
            setGroupSchedules(updatedData);
        }
    };

    const handleRandomDraw = () => {
        if (!data.isTeamMatch) {
            setShowPopup(true);
        }
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
        if (!data.isTeamMatch) {
            const matchData = [];
            data.rounds.forEach((round) => {
                round.tables.forEach((table) => {
                    table.matches.forEach((match) => {
                        // Prepare each team in the required format
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
            console.log(matchData)
            dispatch(addTeamAssignMatch(competitionId, matchData))
     
        }
      

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
                    {data?.rounds.map((round) => (
                        <button
                            key={round.roundName}
                            className={`round-tab-btn ${currentRoundName === round.roundName ? 'active' : ''}`}
                            onClick={() => setCurrentRoundName(round.roundName)}
                        >
                            {round.roundName}
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

            <button className="save-btn" onClick={saveMatchesToDatabase}>Lưu</button>

            {showPopup && <CountdownPopup onComplete={handleCountdownComplete} />}
        </div>
    );
};

export default GroupMatch;
