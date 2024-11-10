import React, { useEffect, useState } from 'react';
import './MatchManagement.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addTimeAssignMatch, getTeamAssignMatch } from '../../../../redux/actions/TeamAction';
import { toast } from 'react-toastify';

const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

const MatchManagement = () => {
    const { competitionId } = useParams();
    const dispatch = useDispatch();
    const teamMatchAssign = useSelector((state) => state.getTeamAssignMatch);
    const dataTeamMatch = teamMatchAssign.listTeamAssignMatch?.data;

    const [data, setData] = useState({});
    const [currentStage, setCurrentStage] = useState();
    const [currentRound, setCurrentRound] = useState('group');
    const [fieldCount, setFiledCount] = useState(1);
    const [startDate, setStartDate] = useState();
    const [isAssigned, setIsAssigned] = useState(false);

    useEffect(() => {
        dispatch(getTeamAssignMatch(competitionId));
    }, [dispatch, competitionId]);

    useEffect(() => {
        if (dataTeamMatch) {
            const clonedData = deepClone(dataTeamMatch);
            setData(clonedData);
    
            // Set the initial stage based on availability
            const initialStage = clonedData.group ? 'group' : 'knockout';
            setCurrentStage(initialStage);
    
            // Set the initial round based on the stage
            const initialRound = Array.isArray(clonedData[initialStage]?.rounds) && clonedData[initialStage].rounds[0]?.round
                ? clonedData[initialStage].rounds[0].round
                : null;
            setCurrentRound(initialRound);
            
            setFiledCount(clonedData?.locations?.length || 1);
            setStartDate(clonedData?.startTime);
        }
    }, [dataTeamMatch]);

    const getCurrentDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return !isNaN(date) ? date.toISOString().split('T')[0] : '';
    };

    const [config, setConfig] = useState({
        fieldCount,
        startDate: getCurrentDate(startDate),
        startTime: '06:00',
        endTime: '18:00',
        matchDuration: 90,
        breakTime: 60,
    });

    useEffect(() => {
        setConfig((prevConfig) => ({
            ...prevConfig,
            fieldCount,
            startDate: getCurrentDate(startDate),
        }));
    }, [fieldCount, startDate]);

    const handleStageChange = (stage) => {
        setCurrentStage(stage);
        const firstRound = data[stage]?.rounds?.[0]?.round || [];
      
        setCurrentRound(firstRound);
    };
    console.log(currentRound)

    const handleAutoAssign = () => {
        const updatedData = deepClone(data);
        const { startDate, startTime, matchDuration, breakTime, endTime } = config;
    
        const availableLocations = updatedData.locations || [];
        const locationCount = availableLocations.length;
    
        let currentDate = startDate;
        let locationTimes = Array.from({ length: locationCount || 1 }, () => startTime); // Đảm bảo có ít nhất một vị trí
    
        const addTime = (time, minutesToAdd) => {
            let [hours, minutes] = time?.split(':').map(Number);
            minutes += minutesToAdd;
            hours += Math.floor(minutes / 60);
            minutes %= 60;
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        };
    
        const exceedsEndTime = (time, endTime) => {
            const [hours, minutes] = time.split(':').map(Number);
            const [endHours, endMinutes] = endTime.split(':').map(Number);
            return hours > endHours || (hours === endHours && minutes > endMinutes);
        };
    
        const incrementDate = (dateString) => {
            const date = new Date(dateString);
            date.setDate(date.getDate() + 1);
            return date.toISOString().split('T')[0];
        };
    
        const assignRoundMatches = (stage) => {
            (stage.rounds || []).forEach((round) => {
                round.matchrounds?.forEach((table) => {
                    table.matches?.forEach((match, index) => {
                        let assigned = false;
                        let locationIndex = index % (locationCount || 1); // Đảm bảo luôn có một vị trí hợp lệ
    
                        while (!assigned) {
                            const matchTime = locationTimes[locationIndex];
                            const matchEndTime = addTime(matchTime, matchDuration);
    
                            if (!exceedsEndTime(matchEndTime, endTime)) {
                                match.locationId = availableLocations[locationIndex]?.locationId || 1;
                                match.date = currentDate;
                                match.time = matchTime;
    
                                locationTimes[locationIndex] = addTime(matchTime, matchDuration + breakTime);
                                assigned = true;
                            } else {
                                currentDate = incrementDate(currentDate);
                                locationTimes = Array.from({ length: locationCount || 1 }, () => startTime);
                            }
                        }
                    });
                });
            });
        };
    
        assignRoundMatches(updatedData.group || {});
        assignRoundMatches(updatedData.knockout || {});
    
        setData(updatedData);
        setIsAssigned(true);
    };
    

    const handleUpdate = (roundId, tableIndex, matchIndex, field, value) => {
        const updatedData = deepClone(data);
        const round = updatedData[currentStage]?.rounds?.find((r) => r.roundId === roundId);
        if (round) {
            round.matchrounds[tableIndex].matches[matchIndex][field] = value;
            setData(updatedData);
        }
    };
    const addTime = (time, minutesToAdd) => {
        let [hours, minutes] = time?.split(':').map(Number);
        minutes += minutesToAdd;
        hours += Math.floor(minutes / 60);
        minutes %= 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    };

    const prepareDataForSave = () => {
        if (!isAssigned) {
            toast.error("Vui lòng sắp xếp trước khi lưu !");
            return;
        }

        const { startDate, startTime, endTime, matchDuration, breakTime } = config;

        const convertMinutesToTimeSpan = (minutes) => {
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;
            return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:00`;
        };

        const convertTimeToTimeSpan = (time) => {
            const [hours, minutes] = time.split(':').map(Number);
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
        };

        const mappedData = {
            timeOfMatch: convertMinutesToTimeSpan(matchDuration),
            timeBreak: convertMinutesToTimeSpan(breakTime),
            timeStartPlay: convertTimeToTimeSpan(startTime),
            timeEndPlay: convertTimeToTimeSpan(endTime),
            startTime: new Date(startDate).toISOString(),
            matchs: []
        };

        Object.keys(data).forEach((stageKey) => {
            const stage = data[stageKey];
            (stage.rounds || []).forEach((round) => {
                round.matchrounds.forEach((table) => {
                    table.matches.forEach((match) => {
                        mappedData.matchs.push({
                            id: match.matchId,
                            startDate: match.date ? new Date(match.date).toISOString() : new Date(startDate).toISOString(),
                            locationId: match.locationId || 0,
                            timeIn: convertTimeToTimeSpan(match.time || startTime),
                            timeOut: convertTimeToTimeSpan(addTime(match?.time || startTime, matchDuration))
                        });
                    });
                });
            });
        });

        dispatch(addTimeAssignMatch(competitionId, mappedData));
    };

    const stageData = data[currentStage]?.rounds || [];

    return (
        <div className="match-management-container-main">
            <h2 className="match-management-title">Quản lý lịch đấu</h2>
            <p>Cài đặt chung cho các trận đấu</p>
            {dataTeamMatch?.isMatch !== true && (
                <div className="match-management-config-section">
                    <div className="match-management-config-grid">
                        <div className="match-management-config-column-left">
                            <label className="match-management-label">Số sân</label>
                            <input
                                type="number"
                                placeholder="Số sân"
                                value={config.fieldCount}
                                min="1"
                                readOnly
                                className="match-management-input-field"
                            />

                            <label className="match-management-label">Ngày bắt đầu</label>
                            <input
                                type="date"
                                placeholder="Ngày bắt đầu"
                                value={config.startDate}
                                readOnly
                                className="match-management-input-field"
                            />

                            <label className="match-management-label">Thời gian nghỉ giữa các trận đấu (phút)</label>
                            <input
                                type="number"
                                placeholder="Thời gian nghỉ giữa các trận đấu (phút)"
                                value={config.breakTime}
                                onChange={(e) => setConfig({ ...config, breakTime: parseInt(e.target.value, 10) })}
                                className="match-management-input-field"
                            />
                        </div>

                        <div className="match-management-config-column-right">
                            <label className="match-management-label">Thời gian bắt đầu</label>
                            <input
                                type="time"
                                placeholder="Thời gian bắt đầu"
                                value={config.startTime}
                                onChange={(e) => setConfig({ ...config, startTime: e.target.value })}
                                className="match-management-input-field"
                            />

                            <label className="match-management-label">Thời gian kết thúc</label>
                            <input
                                type="time"
                                placeholder="Thời gian kết thúc"
                                value={config.endTime}
                                onChange={(e) => setConfig({ ...config, endTime: e.target.value })}
                                className="match-management-input-field"
                            />

                            <label className="match-management-label">Thời gian một trận đấu (phút)</label>
                            <input
                                type="number"
                                placeholder="Thời gian một trận đấu (phút)"
                                value={config.matchDuration}
                                onChange={(e) => setConfig({ ...config, matchDuration: parseInt(e.target.value, 10) })}
                                className="match-management-input-field"
                            />
                        </div>
                    </div>
                    <button className="match-management-primary-button" onClick={handleAutoAssign}>
                        Sắp xếp tự động
                    </button>
                </div>
            )}

            <div className="match-management-navbar">
                {data.group && (
                    <button
                        className={`match-management-navbar-button ${currentStage === 'group' ? 'match-management-navbar-button-active' : ''}`}
                        onClick={() => handleStageChange('group')}
                    >
                        Giai đoạn đấu vòng bảng
                    </button>
                )}
                <button
                    className={`match-management-navbar-button ${currentStage === 'knockout' ? 'match-management-navbar-button-active' : ''}`}
                    onClick={() => handleStageChange('knockout')}
                >
                    Giai đoạn loại trực tiếp
                </button>
            </div>

            <div className="match-management-round-navbar">
                {stageData.map((round) => (
                    <button
                        key={round.roundId}
                        className={`match-management-round-button ${currentRound === round.round ? 'match-management-round-button-active' : ''}`}
                        onClick={() => setCurrentRound(round.round)}
                    >
                        Vòng {round.round}
                    </button>
                ))}
            </div>

            {stageData
                .filter((round) => round.round === currentRound)
                .map((round) => (
                    <div key={round.roundId} className="match-management-round">
                        <h3>Vòng {round.round}</h3>
                        {round.matchrounds.map((table, tableIndex) => (
                            <div key={table.tableName} className="match-management-table-container">
                                <h4>Bảng {table.tableName}</h4>
                                {table.matches.map((match, matchIndex) => (
                                    <div key={match.matchId} className="match-management-match-row">
                                        <span>{`#${match.matchId}`}</span>
                                        <span>{`${match.teamA} - ${match.teamB}`}</span>

                                        <input
                                            type="date"
                                            value={match.date ? new Date(match.date).toISOString().split('T')[0] : ''}
                                            onChange={(e) =>
                                                handleUpdate(round.roundId, tableIndex, matchIndex, 'date', e.target.value)
                                            }
                                        />
                                        <input
                                            type="time"
                                            value={match.time || ''}
                                            onChange={(e) =>
                                                handleUpdate(round.roundId, tableIndex, matchIndex, 'time', e.target.value)
                                            }
                                        />
                                        <select
                                            className="match-management-select-location"
                                            value={match.locationId || ''}
                                            onChange={(e) =>
                                                handleUpdate(round.roundId, tableIndex, matchIndex, 'locationId', parseInt(e.target.value, 10))
                                            }
                                        >
                                            <option value="">Chọn sân</option>
                                            {data.locations?.map((location) => (
                                                <option key={location.locationId} value={location.locationId}>
                                                    {location.locationName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            {dataTeamMatch?.isMatch !== true && (
                <button className="match-management-save-button" onClick={prepareDataForSave}>Lưu</button>
            )}
        </div>
    );
};

export default MatchManagement;
