import React, { useState } from 'react';
import './MatchManagement.css';

const fakeData = {
    group: {
        rounds: [
            {
                roundId: 1,
                round: 'Vòng 1',
                matchrounds: [
                    {
                        tableName: 'Bảng A',
                        matches: [
                            { matchId: 1, teamA: 'Đội #5', teamB: 'Đội #1', date: '', time: '', field: '' },
                            { matchId: 2, teamA: 'Đội #4', teamB: 'Đội #8', date: '', time: '', field: '' },
                        ],
                    },
                    {
                        tableName: 'Bảng B',
                        matches: [
                            { matchId: 3, teamA: 'Đội #7', teamB: 'Đội #3', date: '', time: '', field: '' },
                            { matchId: 4, teamA: 'Đội #2', teamB: 'Đội #6', date: '', time: '', field: '' },
                        ],
                    },

                ],
            },
            {
                roundId: 2,
                round: 'Vòng 2',
                matchrounds: [
                    {
                        tableName: 'Bảng A',
                        matches: [
                            { matchId: 5, teamA: 'Đội #1', teamB: 'Đội #8', date: '', time: '', field: '' },
                            { matchId: 6, teamA: 'Đội #5', teamB: 'Đội #4', date: '', time: '', field: '' },
                        ],
                    },
                    {
                        tableName: 'Bảng B',
                        matches: [
                            { matchId: 7, teamA: 'Đội #7', teamB: 'Đội #2', date: '', time: '', field: '' },
                            { matchId: 8, teamA: 'Đội #3', teamB: 'Đội #6', date: '', time: '', field: '' },
                        ],
                    },
                ],
            },

        ],
    },
    knockout: {
        rounds: [
            {
                roundId: 3,
                round: 'Tứ kết',
                matchrounds: [
                    {
                        tableName: '',
                        matches: [
                            { matchId: 1, teamA: 'Đội #1', teamB: 'Đội #8', date: '', time: '', field: '' },
                            { matchId: 2, teamA: 'Đội #2', teamB: 'Đội #7', date: '', time: '', field: '' },
                            { matchId: 3, teamA: 'Đội #3', teamB: 'Đội #6', date: '', time: '', field: '' },
                            { matchId: 4, teamA: 'Đội #4', teamB: 'Đội #5', date: '', time: '', field: '' },
                        ],
                    },
                ],
            },
            {
                roundId: 4,
                round: 'Bán kết',
                matchrounds: [
                    {
                        tableName: '',
                        matches: [
                            { matchId: 5, teamA: 'Winner #1', teamB: 'Winner #2', date: '', time: '', field: '' },
                            { matchId: 6, teamA: 'Winner #3', teamB: 'Winner #4', date: '', time: '', field: '' },
                        ],
                    },
                ],
            },
            {
                roundId: 5,
                round: 'Chung kết',
                matchrounds: [
                    {
                        tableName: '',
                        matches: [
                            { matchId: 7, teamA: 'Winner #5', teamB: 'Winner #6', date: '', time: '', field: '' },
                        ],
                    },
                ],
            },
        ],
    },
    isAssign: false,
};


const MatchManagement = () => {
    const [data, setData] = useState(fakeData);

    const [currentStage, setCurrentStage] = useState('group');
    const [currentRound, setCurrentRound] = useState(fakeData.group.rounds[0].round);

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Tháng tính từ 0, nên cần +1
        const day = String(today.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };
    const [config, setConfig] = useState({
        fieldCount: 2, // Số sân
        startDate: getCurrentDate(), // Ngày bắt đầu
        startTime: '06:00', // Thời gian bắt đầu
        endTime: '18:00', // Thời gian kết thúc
        matchDuration: 90, // Thời gian cho một trận đấu (phút)
        breakTime: 60, // Thời gian nghỉ giữa các trận đấu (phút)
    });
    const handleStageChange = (stage) => {
        setCurrentStage(stage);

        // Khi thay đổi stage, lấy vòng đầu tiên của stage đó
        if (stage === 'group') {
            setCurrentRound(data.group.rounds[0].round); // Lấy vòng đầu tiên của group
        } else if (stage === 'knockout') {
            setCurrentRound(data.knockout.rounds[0].round); // Lấy vòng đầu tiên của knockout
        }
    };


    const handleAutoAssign = () => {
        const updatedData = { ...data };
        const { startDate, startTime, matchDuration, breakTime, fieldCount, endTime } = config;

        let currentDate = startDate;
        let fieldTimes = Array(fieldCount).fill(startTime); // Thời gian bắt đầu cho từng sân

        // Hàm thêm phút vào thời gian
        const addTime = (time, minutesToAdd) => {
            let [hours, minutes] = time.split(':').map(Number);
            minutes += minutesToAdd;
            if (minutes >= 60) {
                hours += Math.floor(minutes / 60);
                minutes = minutes % 60;
            }
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        };

        // Hàm kiểm tra nếu thời gian vượt quá thời gian kết thúc
        const exceedsEndTime = (time, endTime) => {
            const [hours, minutes] = time.split(':').map(Number);
            const [endHours, endMinutes] = endTime.split(':').map(Number);
            return hours > endHours || (hours === endHours && minutes > endMinutes);
        };

        // Hàm tăng ngày
        const incrementDate = (dateString) => {
            const date = new Date(dateString);
            date.setDate(date.getDate() + 1);
            return date.toISOString().split('T')[0];
        };

        // Hàm sắp xếp lịch cho từng vòng đấu
        const assignRoundMatches = (stage) => {
            stage.rounds.forEach((round) => {
                let currentField = 0;

                round.matchrounds.forEach((table) => {
                    table.matches.forEach((match) => {
                        let assigned = false;

                        while (!assigned) {
                            const matchTime = fieldTimes[currentField];
                            const matchEndTime = addTime(matchTime, matchDuration);

                            if (!exceedsEndTime(matchEndTime, endTime)) {
                                match.field = `Sân ${currentField + 1}`;
                                match.date = currentDate;
                                match.time = matchTime;

                                fieldTimes[currentField] = addTime(matchTime, matchDuration + breakTime);

                                currentField = (currentField + 1) % fieldCount;

                                assigned = true;
                            } else {
                                currentDate = incrementDate(currentDate);
                                fieldTimes = Array(fieldCount).fill(startTime);
                                currentField = 0;
                            }
                        }
                    });
                });
            });
        };

        // Sắp xếp cho vòng bảng
        assignRoundMatches(updatedData.group);

        // Sắp xếp cho vòng loại trực tiếp
        assignRoundMatches(updatedData.knockout);

        setData(updatedData);
    };

    const stageData = data[currentStage]?.rounds || [];

    return (
        <div className="match-management-container">
            <h2>Quản lý lịch đấu</h2>
            <p>Cài đặt chung cho các trận đấu</p>
            {!data.isAssign && (
                <div className="match-management-config-section-standard match-management-config-input-container">
                    <div className="match-management-config-input-grid">
                        <div className="match-management-config-column-left">
                            <label className="match-management-input-label">Số sân</label>
                            <input
                                type="number"
                                placeholder="Số sân"
                                value={config.fieldCount}
                                onChange={(e) => setConfig({ ...config, fieldCount: e.target.value })}
                                className="match-management-input-field match-management-field-standard"
                            />

                            <label className="match-management-input-label">Ngày bắt đầu</label>
                            <input
                                type="date"
                                placeholder="Ngày bắt đầu"
                                value={config.startDate}
                                onChange={(e) => setConfig({ ...config, startDate: e.target.value })}
                                className="match-management-input-field match-management-field-standard"
                            />

                            <label className="match-management-input-label">Thời gian nghỉ giữa các trận đấu (phút)</label>
                            <input
                                type="number"
                                placeholder="Thời gian nghỉ giữa các trận đấu (phút)"
                                value={config.breakTime}
                                onChange={(e) => setConfig({ ...config, breakTime: e.target.value })}
                                className="match-management-input-field match-management-field-standard"
                            />
                        </div>

                        <div className="match-management-config-column-right">
                            <label className="match-management-input-label">Thời gian bắt đầu</label>
                            <input
                                type="time"
                                placeholder="Thời gian bắt đầu"
                                value={config.startTime}
                                onChange={(e) => setConfig({ ...config, startTime: e.target.value })}
                                className="match-management-input-field match-management-field-standard"
                            />

                            <label className="match-management-input-label">Thời gian kết thúc</label>
                            <input
                                type="time"
                                placeholder="Thời gian kết thúc"
                                value={config.endTime}
                                onChange={(e) => setConfig({ ...config, endTime: e.target.value })}
                                className="match-management-input-field match-management-field-standard"
                            />

                            <label className="match-management-input-label">Thời gian một trận đấu (phút)</label>
                            <input
                                type="number"
                                placeholder="Thời gian một trận đấu (phút)"
                                value={config.matchDuration}
                                onChange={(e) => setConfig({ ...config, matchDuration: e.target.value })}
                                className="match-management-input-field match-management-field-standard"
                            />
                        </div>
                    </div>
                    <button className="match-management-auto-assign-button match-management-primary-button" onClick={handleAutoAssign}>
                        Sắp xếp tự động
                    </button>
                </div>
            )}

            <div className="navbar">
                <button
                    className={`navbar-btn ${currentStage === 'group' ? 'active' : ''}`}
                    onClick={() => handleStageChange('group')}
                >
                    Giai đoạn đấu vòng bảng
                </button>
                <button
                    className={`navbar-btn ${currentStage === 'knockout' ? 'active' : ''}`}
                    onClick={() => handleStageChange('knockout')}
                >
                    Giai đoạn loại trực tiếp
                </button>
            </div>

            {/* Navigation bar for switching between rounds */}
            <div className="round-navbar">
                {stageData.map((round) => (
                    <button
                        key={round.round}
                        className={`round-btn ${currentRound === round.round ? 'active' : ''}`}
                        onClick={() => setCurrentRound(round.round)}  // Sử dụng chuỗi cho round
                    >
                        {round.round}
                    </button>
                ))}
            </div>

            {/* Render matches for the selected round */}
            {stageData
                .filter((round) => round.round === currentRound)  // Sử dụng chuỗi để lọc round
                .map((round) => (
                    <div key={round.round} className="round">
                        <h3>{round.round}</h3>
                        {round.matchrounds.map((table, tableIndex) => (
                            <div key={table.tableName} className="table-container">
                                <h4>{table.tableName}</h4>
                                {table.matches.map((match, matchIndex) => (
                                    <div key={match.matchId} className="match-row">
                                        <span>{`#${match.matchId}`}</span>
                                        <span>{`${match.teamA} - ${match.teamB}`}</span>

                                        <input
                                            type="date"
                                            value={match.date || ''}
                                            onChange={(e) =>
                                                handleUpdate(round.round, tableIndex, matchIndex, 'date', e.target.value)
                                            }
                                        />
                                        <input
                                            type="time"
                                            value={match.time || ''}
                                            onChange={(e) =>
                                                handleUpdate(round.round, tableIndex, matchIndex, 'time', e.target.value)
                                            }
                                        />
                                        <input
                                            type="text"
                                            placeholder="Sân"
                                            value={match.field || ''}
                                            onChange={(e) =>
                                                handleUpdate(round.round, tableIndex, matchIndex, 'field', e.target.value)}
                                        />
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
