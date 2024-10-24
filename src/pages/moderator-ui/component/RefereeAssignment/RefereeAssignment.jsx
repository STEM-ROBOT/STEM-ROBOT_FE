import React, { useState } from 'react';
import './RefereeAssignment.css'; // Include your existing CSS file

const fakeData = {
    referees: ['THÀNH', 'LÂM', 'DƯƠNG', 'NHẬT'],
    matchReferees: ['PHỤ 1', 'PHỤ 2', 'PHỤ 3'],
    rounds: [
        {
            roundNumber: 1,
            matches: [
                { matchId: 1, teamA: 'Team A1', teamB: 'Team B1', mainReferee: '', matchReferees: [] },
                { matchId: 2, teamA: 'Team A2', teamB: 'Team B2', mainReferee: '', matchReferees: [] },
            ],
        },
        {
            roundNumber: 2,
            matches: [
                { matchId: 3, teamA: 'Team A3', teamB: 'Team B3', mainReferee: '', matchReferees: [] },
                { matchId: 4, teamA: 'Team A4', teamB: 'Team B4', mainReferee: '', matchReferees: [] },
            ],
        },
        {
            roundNumber: 3,
            matches: [
                { matchId: 5, teamA: 'Team A5', teamB: 'Team B5', mainReferee: '', matchReferees: [] },
                { matchId: 6, teamA: 'Team A6', teamB: 'Team B6', mainReferee: '', matchReferees: [] },
            ],
        },
    ],
};

const RefereeAssignment = () => {
    const [data, setData] = useState(fakeData);
    const [currentRound, setCurrentRound] = useState(1); // To track the selected round
    const [numMatchReferees, setNumMatchReferees] = useState(1); // Default number of match referees is 1

    // Fisher-Yates shuffle function to randomize arrays
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    // Randomly assign referees across all rounds without repetition within a round
    const randomizeReferees = () => {
        const updatedData = { ...data };
        let isNotEnoughReferees = false;

        updatedData.rounds.forEach((round) => {
            let availableMainRefs = shuffleArray([...data.referees]); // Shuffle and clone referees
            let availableMatchRefs = shuffleArray([...data.matchReferees]); // Shuffle and clone match referees

            round.matches.forEach((match) => {
                if (availableMainRefs.length === 0) {
                    isNotEnoughReferees = true;
                    return;
                }

                match.mainReferee = availableMainRefs.pop(); // Assign and remove from available pool

                // Check if there are enough match referees
                if (availableMatchRefs.length < numMatchReferees) {
                    isNotEnoughReferees = true;
                    return;
                }

                // Assign the match referees dynamically based on the number set by the user
                match.matchReferees = [];
                for (let i = 0; i < numMatchReferees; i++) {
                    match.matchReferees.push(availableMatchRefs.pop()); // Assign and remove from available pool
                }
            });
        });

        if (isNotEnoughReferees) {
            alert('Không đủ trọng tài để sắp xếp cho tất cả các trận đấu.');
        } else {
            setData(updatedData);
        }
    };

    const handleUpdate = (roundIndex, matchIndex, field, value) => {
        const updatedData = { ...data };

        // Ensure no duplicate referees in the same round
        const currentRoundMatches = updatedData.rounds[roundIndex].matches;
        const refereesInUse = new Set(
            currentRoundMatches.flatMap((m, idx) =>
                idx !== matchIndex ? [m.mainReferee, ...m.matchReferees] : []
            )
        );

        if (!refereesInUse.has(value)) {
            updatedData.rounds[roundIndex].matches[matchIndex][field] = value;
            setData(updatedData);
        } else {
            alert('Trọng tài này đã được chọn cho trận đấu khác trong vòng này!');
        }
    };

    const stageData = data.rounds; // Current stage data

    return (
        <div className="referee-assignment-container">
            <h2 className="referee-assignment-title">Sắp xếp trọng tài</h2>               
            <div className='referee-assignment-title-detail'>Vòng</div>
           
            {/* Round Selector */}
            <div className="round-selector">
                {stageData.map((round) => (
                    <button
                        key={round.roundNumber}
                        className={`round-btn ${currentRound === round.roundNumber ? 'active' : ''}`}
                        onClick={() => setCurrentRound(round.roundNumber)}
                    >
                        {round.roundNumber}
                    </button>
                ))}
            </div>
            <div className="num-referees-input">
                <label className="input-label">Số lượng trọng tài trận:</label>
                <input
                    className="input-field"
                    type="number"
                    min="1"
                    max={data.matchReferees.length}
                    value={numMatchReferees}
                    onChange={(e) => setNumMatchReferees(Number(e.target.value))}
                />
            </div>

            {/* Button to randomize referees */}
            <button className="random-btn" onClick={randomizeReferees}>Bốc thăm ngẫu nhiên trọng tài</button>

            {/* Show the matches for the selected round */}
            {stageData
                .filter((round) => round.roundNumber === currentRound) // Filter to show only the selected round
                .map((round) => (
                    <div key={round.roundNumber} className="round">
                        <h3 className="round-title">{`VÒNG ${round.roundNumber}`}</h3>
                        {round.matches.map((match, matchIndex) => (
                            <div key={match.matchId} className="match-row">
                                <span className="match-info">{`#${match.matchId}: ${match.teamA} - ${match.teamB}`}</span>

                                {/* Dropdown for main referee */}
                                <select
                                    className="main-referee-select"
                                    value={match.mainReferee}
                                    onChange={(e) =>
                                        handleUpdate(currentRound - 1, matchIndex, 'mainReferee', e.target.value)
                                    }
                                >
                                    <option value="">Chọn trọng tài chính</option>
                                    {data.referees.map((ref, index) => (
                                        <option key={index} value={ref}>
                                            {ref}
                                        </option>
                                    ))}
                                </select>

                                {/* Dynamic dropdowns for match referees */}
                                {match.matchReferees.map((matchRef, refIndex) => (
                                    <select
                                        className="match-referee-select"
                                        key={refIndex}
                                        value={matchRef || ''}
                                        onChange={(e) => {
                                            handleUpdate(currentRound - 1, matchIndex, `matchReferees[${refIndex}]`, e.target.value);
                                        }}
                                    >
                                        <option value="">Chọn trọng tài trận</option>
                                        {data.matchReferees.map((ref, index) => (
                                            <option key={index} value={ref}>
                                                {ref}
                                            </option>
                                        ))}
                                    </select>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}

            <button className="save-btn">Lưu</button>
        </div>
    );
};

export default RefereeAssignment;
