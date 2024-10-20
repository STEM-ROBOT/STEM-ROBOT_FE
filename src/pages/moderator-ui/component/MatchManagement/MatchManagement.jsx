import React, { useState } from 'react';
import './MatchManagement.css'; // Import your CSS

// Fake data for rounds, tables, and matches
const fakeData = {
    group: {
        rounds: [
            {
                roundNumber: 1,
                tables: [
                    {
                        tableName: 'Bảng A',
                        matches: [
                            { matchId: 1, teamA: 'Đội #5', teamB: 'Đội #1', location: '', date: '', time: '', referee: '' },
                            { matchId: 2, teamA: 'Đội #4', teamB: 'Đội #8', location: '', date: '', time: '', referee: '' },
                        ],
                    },
                    {
                        tableName: 'Bảng B',
                        matches: [
                            { matchId: 3, teamA: 'Đội #7', teamB: 'Đội #3', location: '', date: '', time: '', referee: '' },
                            { matchId: 4, teamA: 'Đội #2', teamB: 'Đội #6', location: '', date: '', time: '', referee: '' },
                        ],
                    },
                ],
            },
            {
                roundNumber: 2,
                tables: [
                    {
                        tableName: 'Bảng A',
                        matches: [
                            { matchId: 5, teamA: 'Đội #1', teamB: 'Đội #8', location: '', date: '', time: '', referee: '' },
                            { matchId: 6, teamA: 'Đội #5', teamB: 'Đội #4', location: '', date: '', time: '', referee: '' },
                        ],
                    },
                    {
                        tableName: 'Bảng B',
                        matches: [
                            { matchId: 7, teamA: 'Đội #7', teamB: 'Đội #2', location: '', date: '', time: '', referee: '' },
                            { matchId: 8, teamA: 'Đội #3', teamB: 'Đội #6', location: '', date: '', time: '', referee: '' },
                        ],
                    },
                ],
            },
        ],
    },
    knockout: {
        rounds: [
            {
                roundNumber: 1,
                tables: [
                    {
                        tableName: 'Bảng Knockout A',
                        matches: [
                            { matchId: 1, teamA: 'Đội #1', teamB: 'Đội #2', location: '', date: '', time: '', referee: '' },
                        ],
                    },
                ],
            },
        ],
    },
};

const MatchManagement = () => {
    const [data, setData] = useState(fakeData);
    const [currentStage, setCurrentStage] = useState('group'); 
    const [currentRound, setCurrentRound] = useState(1); // Default round number is 1

    // Function to handle updating location, date, time, and referee
    const handleUpdate = (roundIndex, tableIndex, matchIndex, field, value) => {
        const updatedData = { ...data };
       
        updatedData[currentStage].rounds[roundIndex].tables[tableIndex].matches[matchIndex][field] = value;
        setData(updatedData);
    };

  
    const stageData = data[currentStage]?.rounds || [];

    return (
        <div className="match-management-container">
            <h2>Quản lý lịch đấu</h2>
            <p>Bạn có thể quản lý địa điểm thi đấu của toàn giải đấu.</p>

          
            <div className="file-buttons">
                <button className="download-sample">Tải về tệp tin mẫu</button>
                <button className="upload-file">Nhập tệp tin</button>
            </div>

           
            <div className="navbar">
                <button className={`navbar-btn ${currentStage === 'group' ? 'active' : ''}`} onClick={() => setCurrentStage('group')}>
                    Giai đoạn đấu vòng bảng
                </button>
                <button className={`navbar-btn ${currentStage === 'knockout' ? 'active' : ''}`} onClick={() => setCurrentStage('knockout')}>
                    Giai đoạn loại trực tiếp
                </button>
            </div>

          
            <div className="round-navbar">
                {stageData.map((round) => (
                    <button
                        key={round.roundNumber}
                        className={`round-btn ${currentRound === round.roundNumber ? 'active' : ''}`}
                        onClick={() => setCurrentRound(round.roundNumber)}
                    >
                        {`Vòng ${round.roundNumber}`}
                    </button>
                ))}
            </div>

            {/* Render the matches of the current selected round */}
            {stageData
                .filter((round) => round.roundNumber === currentRound)
                .map((round) => (
                    <div key={round.roundNumber} className="round">
                        <h3>{`VÒNG ${round.roundNumber}`}</h3>

                        {round.tables.map((table, tableIndex) => (
                            <div key={table.tableName} className="table-container">
                                <h4>{table.tableName}</h4>

                                {table.matches.map((match, matchIndex) => (
                                    <div key={match.matchId} className="match-row">
                                        <span>{`#${match.matchId}`}</span>
                                        <span>{`${match.teamA} - ${match.teamB}`}</span>

                                        {/* Input fields for location, date, time, and referee */}
                                        <input
                                            type="text"
                                            placeholder="Địa điểm"
                                            value={match.location || ''}
                                            onChange={(e) =>
                                                handleUpdate(round.roundNumber - 1, tableIndex, matchIndex, 'location', e.target.value)
                                            }
                                        />
                                        <input
                                            type="date"
                                            value={match.date || ''}
                                            onChange={(e) =>
                                                handleUpdate(round.roundNumber - 1, tableIndex, matchIndex, 'date', e.target.value)
                                            }
                                        />
                                        <input
                                            type="time"
                                            value={match.time || ''}
                                            onChange={(e) =>
                                                handleUpdate(round.roundNumber - 1, tableIndex, matchIndex, 'time', e.target.value)
                                            }
                                        />
                                        {/* <input
                                            type="text"
                                            placeholder="Trọng tài"
                                            value={match.referee || ''}
                                            onChange={(e) =>
                                                handleUpdate(round.roundNumber - 1, tableIndex, matchIndex, 'referee', e.target.value)
                                            }
                                        /> */}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}

            {/* Save button */}
            <button className="save-btn">Lưu</button>
        </div>
    );
};

export default MatchManagement;
