import React, { useState } from 'react';
import './RefereeAssignment.css';

const fakeData = {
    referees: [
        { id: 1, name: 'THÀNH' },
        { id: 2, name: 'LÂM' },
        { id: 3, name: 'DƯƠNG' },
        { id: 4, name: 'NHẬT' },
    ],
    matchReferees: [
        { id: 1, name: 'PHỤ 1' },
        { id: 2, name: 'PHỤ 2' },
        { id: 3, name: 'PHỤ 3' },
    ],
    rounds: [
        {
            roundId: 1,
            roundName: 'Tứ kết',
            matches: [
                { matchId: 1, teamA: 'Team A1', teamB: 'Team B1', mainReferee: null, matchReferees: [], date: '2023-10-30', timeIn: '14:00', arena: 'Arena 1' },
                { matchId: 2, teamA: 'Team A2', teamB: 'Team B2', mainReferee: null, matchReferees: [], date: '2023-10-30', timeIn: '15:30', arena: 'Arena 2' },
            ],
        },
        {
            roundId: 2,
            roundName: 'Bán kết',
            matches: [
                { matchId: 3, teamA: 'Team A3', teamB: 'Team B3', mainReferee: null, matchReferees: [], date: '2023-11-01', timeIn: '14:00', arena: 'Arena 3' },
                { matchId: 4, teamA: 'Team A4', teamB: 'Team B4', mainReferee: null, matchReferees: [], date: '2023-11-01', timeIn: '15:30', arena: 'Arena 4' },
            ],
        },
        {
            roundId: 3,
            roundName: 'Chung kết',
            matches: [
                { matchId: 5, teamA: 'Team A5', teamB: 'Team B5', mainReferee: null, matchReferees: [], date: '2023-11-03', timeIn: '16:00', arena: 'Arena 5' },
            ],
        },
    ],
};

const RefereeAssignment = () => {
    const [data, setData] = useState(fakeData);
    const [numMatchReferees, setNumMatchReferees] = useState(1);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const randomizeReferees = () => {
        const updatedData = { ...data };
        let isNotEnoughReferees = false;

        updatedData.rounds.forEach((round) => {
            let availableMainRefs = shuffleArray([...data.referees]);
            let availableMatchRefs = shuffleArray([...data.matchReferees]);

            round.matches.forEach((match) => {
                if (availableMainRefs.length === 0) {
                    isNotEnoughReferees = true;
                    return;
                }
                // Assign a main referee
                match.mainReferee = availableMainRefs.pop();

                // Check if there are enough assistant referees
                if (availableMatchRefs.length < numMatchReferees) {
                    isNotEnoughReferees = true;
                    return;
                }

                // Assign assistant referees
                match.matchReferees = [];
                for (let i = 0; i < numMatchReferees; i++) {
                    match.matchReferees.push(availableMatchRefs.pop());
                }
            });
        });

        if (isNotEnoughReferees) {
            alert('Không đủ trọng tài để sắp xếp cho tất cả các trận đấu.');
        } else {
            setData(updatedData); // Update the component state with the assigned referees
        }
    };

    const handleUpdate = (roundIndex, matchIndex, field, value) => {
        const updatedData = { ...data };

        const refereesInUse = new Set(
            updatedData.rounds[roundIndex].matches.flatMap((m, idx) =>
                idx !== matchIndex ? [m.mainReferee?.id, ...m.matchReferees.map((ref) => ref.id)] : []
            )
        );

        if (!refereesInUse.has(value.id)) {
            if (field === 'mainReferee') {
                updatedData.rounds[roundIndex].matches[matchIndex][field] = value;
            } else {
                updatedData.rounds[roundIndex].matches[matchIndex].matchReferees[value.index] = value.ref;
            }
            setData(updatedData);
        } else {
            alert('Trọng tài này đã được chọn cho trận đấu khác trong vòng này!');
        }
    };

    return (
        <div className="referee-assignment-container">
            <h2 className="referee-assignment-title">Sắp xếp trọng tài</h2>

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

            <button className="random-btn" onClick={randomizeReferees}>Bốc thăm ngẫu nhiên trọng tài</button>

            {data.rounds.map((round, roundIndex) => (
                <div key={round.roundId} className="round">
                    <h3 className="round-title">{round.roundName}</h3>
                    
                    {round.matches.map((match, matchIndex) => (
                        <div key={match.matchId} >
                              <span className="match-info">{`#${match.matchId} ${match.teamA} - ${match.teamB}`}</span>
                           <div className="match-row">
                           <input
                                type="date"
                                value={match.date}
                                onChange={(e) =>
                                    handleUpdate(roundIndex, matchIndex, 'date', e.target.value)
                                }
                                className="match-date-input"
                                placeholder="mm/dd/yyyy"
                            />

                            <input
                                type="time"
                                value={match.timeIn}
                                onChange={(e) =>
                                    handleUpdate(roundIndex, matchIndex, 'timeIn', e.target.value)
                                }
                                className="match-time-input"
                                placeholder="--:--"
                            />

                            <input
                                type="text"
                                value={match.arena}
                                onChange={(e) =>
                                    handleUpdate(roundIndex, matchIndex, 'arena', e.target.value)
                                }
                                className="match-arena-input"
                                placeholder="Sân"
                            />

                            <div className="referee-selectors">
                                <select
                                    className="main-referee-select"
                                    value={match.mainReferee?.id || ''}
                                    onChange={(e) =>
                                        handleUpdate(roundIndex, matchIndex, 'mainReferee', data.referees.find(ref => ref.id === parseInt(e.target.value, 10)))
                                    }
                                >
                                    <option value="">Chọn trọng tài chính</option>
                                    {data.referees.map((ref) => (
                                        <option key={ref.id} value={ref.id}>
                                            {ref.name}
                                        </option>
                                    ))}
                                </select>

                                {/* Dynamically render match referee selectors based on numMatchReferees */}
                                {Array.from({ length: numMatchReferees }).map((_, refIndex) => (
                                    <select
                                        className="match-referee-select"
                                        key={refIndex}
                                        value={match.matchReferees[refIndex]?.id || ''}
                                        onChange={(e) =>
                                            handleUpdate(roundIndex, matchIndex, 'matchReferees', { index: refIndex, ref: data.matchReferees.find(ref => ref.id === parseInt(e.target.value, 10)) })
                                        }
                                    >
                                        <option value="">Chọn trọng tài trận</option>
                                        {data.matchReferees.map((ref) => (
                                            <option key={ref.id} value={ref.id}>
                                                {ref.name}
                                            </option>
                                        ))}
                                    </select>
                                ))}
                            </div>
                           </div>
                          
                        </div>
                    ))}
                </div>
            ))}
            <button className="save-btn">Lưu</button>
        </div>
    );
};

export default RefereeAssignment;
