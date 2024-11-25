import React, { useEffect, useState } from 'react';
import './MatchManagement.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addTimeAssignMatch, getTeamAssignMatch } from '../../../../redux/actions/TeamAction';
import { toast } from 'react-toastify';
import { getActive } from '../../../../redux/actions/FormatAction';
import LoadingComponent from '../../../system-ui/component/Loading/LoadingComponent';

const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

const MatchManagement = () => {
    const { competitionId } = useParams();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(0);
    const roundsPerPage = 8;
    const teamMatchAssign = useSelector((state) => state.getTeamAssignMatch);
    const dataTeamMatch = teamMatchAssign.listTeamAssignMatch?.data;

    const [data, setData] = useState({});
    const [currentStage, setCurrentStage] = useState();
    const [currentRound, setCurrentRound] = useState('group');
    const [fieldCount, setFiledCount] = useState(1);
    const [startDate, setStartDate] = useState();
    const [isAssigned, setIsAssigned] = useState(false);
    const isAddSuccess = useSelector((state) => state.addTimeAssignMatch?.success);
    const loadingGet = useSelector((state) => state.getTeamAssignMatch.loading);



    useEffect(() => {
        dispatch(getTeamAssignMatch(competitionId));
        dispatch(getActive(competitionId))
    }, [dispatch, competitionId, isAddSuccess]);

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
            if (clonedData?.startTime) {
                const date = new Date(clonedData.startTime);
                date.setDate(date.getDate() + 1); 
                
                setStartDate(date.toISOString().split('T')[0]); 
            }
        }
    }, [dataTeamMatch]);

    const getCurrentDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return !isNaN(date) ? date.toISOString().split('T')[0] : '';
    };
    console.log(startDate)
    const [config, setConfig] = useState({
        fieldCount,
        startDate: getCurrentDate(startDate),
        startTime: '06:00',
        endTime: '18:00',
        breakTimeMatch: 30,
        breakTimeHaft: 15,
        numberHaft: 1,
        haftDuration: 60,
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
        setCurrentPage(0); // Reset to the first page

        // Set the first round of the new stage as active
        const firstRound = data[stage]?.rounds?.[0]?.round || null;
        setCurrentRound(firstRound);
    };
    console.log(currentRound)

    const handleAutoAssign = () => {
        const updatedData = deepClone(data);
        const { startTime, endTime, breakTimeMatch, breakTimeHaft, haftDuration, numberHaft } = config;
        const matchDuration = (numberHaft * haftDuration) + ((numberHaft - 1) * breakTimeHaft);
        const availableLocations = updatedData.locations || [];
        const locationCount = availableLocations.length;

        let currentDate = config.startDate;
        let locationTimes = Array.from({ length: locationCount || 1 }, () => startTime);
        let lastGroupEndTime = null; // Track end time of last group stage match

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

        const assignRoundMatches = (stage, startFromEndTime = null) => {
            if (startFromEndTime) {
                currentDate = startFromEndTime.date;
                locationTimes = Array.from({ length: locationCount || 1 }, () => startFromEndTime.time);
            }

            (stage.rounds || []).forEach((round) => {
                let locationIndex = 0;
                round.matchrounds?.forEach((table) => {
                    table.matches?.forEach((match) => {
                        let assigned = false;
                        while (!assigned) {
                            const currentLocation = availableLocations[locationIndex];
                            const matchTime = locationTimes[locationIndex];
                            const matchEndTime = addTime(matchTime, matchDuration);

                            if (!exceedsEndTime(matchEndTime, endTime)) {
                                // Assign location and time
                                match.locationId = currentLocation?.locationId || 1;
                                match.date = currentDate;
                                match.time = matchTime;

                                // Update the field's time for the next match
                                locationTimes[locationIndex] = addTime(matchTime, matchDuration + breakTimeMatch);
                                assigned = true;
                            } else {
                                // Move to the next day and reset location times if no more matches can fit today
                                currentDate = incrementDate(currentDate);
                                locationTimes = Array.from({ length: locationCount || 1 }, () => startTime);
                            }

                            // Move to the next location for the next match if available
                            locationIndex = (locationIndex + 1) % locationCount;
                        }
                    });
                });

                // Update lastGroupEndTime after assigning all matches in the group stage
                if (stage === updatedData.group) {
                    lastGroupEndTime = {
                        date: currentDate,
                        time: locationTimes.reduce((latest, time) => (latest > time ? latest : time), locationTimes[0]),
                    };
                }
            });
        };

        // Assign group stage matches and capture the end time
        assignRoundMatches(updatedData.group || {});

        // Assign knockout stage matches starting from the last group stage end time
        assignRoundMatches(updatedData.knockout || {}, lastGroupEndTime);

        setData(updatedData);
        setIsAssigned(true);
    };



    const handleUpdate = (roundId, tableIndex, matchIndex, field, value) => {
        // Use deep cloning here to ensure immutability
        const updatedData = deepClone(data);
        const round = updatedData[currentStage]?.rounds?.find((r) => r.roundId === roundId);

        if (round) {
            // Create a new array for matchrounds to avoid direct mutation
            const updatedMatchRounds = round.matchrounds.map((table, idx) => {
                if (idx !== tableIndex) return table;

                // Create a new array for matches
                const updatedMatches = table.matches.map((match, mIdx) => {
                    if (mIdx !== matchIndex) return match;

                    // Return a new match object with the updated field
                    return {
                        ...match,
                        [field]: value,
                    };
                });

                // Return the updated table with new matches array
                return {
                    ...table,
                    matches: updatedMatches,
                };
            });

            // Update the round with the new matchrounds array
            round.matchrounds = updatedMatchRounds;

            // Set the updated data to state
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

        const { startDate, startTime, endTime, breakTimeMatch, breakTimeHaft, haftDuration, numberHaft } = config;
        console.log(config)
        const matchDuration = (numberHaft * haftDuration) + ((numberHaft - 1) * breakTimeHaft);

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
            timeBreak: convertMinutesToTimeSpan(breakTimeMatch),
            timeOfHaft: convertMinutesToTimeSpan(haftDuration),
            numberHaft,
            breakTimeHaft,
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
                            startDate: match.date ? new Date(match.date).toISOString() : new Date(match.date).toISOString(),
                            locationId: match.locationId || 0,
                            timeIn: convertTimeToTimeSpan(match.time || startTime),
                            timeOut: convertTimeToTimeSpan(addTime(match?.time || startTime, matchDuration))
                        });
                    });
                });
            });
        });
        console.log(mappedData)

        dispatch(addTimeAssignMatch(competitionId, mappedData));
    };

    const stageData = data[currentStage]?.rounds || [];

    const startRoundIndex = currentPage * roundsPerPage;
    const endRoundIndex = startRoundIndex + roundsPerPage;
    const paginatedRounds = stageData.slice(startRoundIndex, endRoundIndex);

    const handleNextPage = () => {
        if (endRoundIndex < stageData.length) {
            setCurrentPage((prevPage) => {
                const newPage = prevPage + 1;
                const newStartRoundIndex = newPage * roundsPerPage;
                const newEndRoundIndex = newStartRoundIndex + roundsPerPage;
                const newPaginatedRounds = stageData.slice(newStartRoundIndex, newEndRoundIndex);

                // Set the first round of the next page as active
                if (newPaginatedRounds.length > 0) {
                    setCurrentRound(newPaginatedRounds[0].round);
                }

                return newPage;
            });
        }
    };

    const handlePrevPage = () => {
        if (startRoundIndex > 0) {
            setCurrentPage((prevPage) => {
                const newPage = prevPage - 1;
                const newStartRoundIndex = newPage * roundsPerPage;
                const newEndRoundIndex = newStartRoundIndex + roundsPerPage;
                const newPaginatedRounds = stageData.slice(newStartRoundIndex, newEndRoundIndex);

                // Set the first round of the previous page as active
                if (newPaginatedRounds.length > 0) {
                    setCurrentRound(newPaginatedRounds[0].round);
                }

                return newPage;
            });
        }
    };


    return (
        <div className="match-management-container-main">

            <h2 className="match-management-title">Quản lý lịch đấu</h2>
            <p>Cài đặt chung cho các trận đấu</p>

            {loadingGet ? <LoadingComponent borderRadius="8px" backgroundColor="rgba(0, 0, 0, 0.0)" /> :
                <>
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
                                        value={config.breakTimeMatch}
                                        onChange={(e) => setConfig({ ...config, breakTimeMatch: parseInt(e.target.value, 10) })}
                                        className="match-management-input-field"
                                    />

                                    <label className="match-management-label">Thời gian nghỉ giữa các hiệp đấu (phút)</label>
                                    <input
                                        type="number"
                                        placeholder="Thời gian nghỉ giữa các trận đấu (phút)"
                                        value={config.breakTimeHaft}
                                        onChange={(e) => setConfig({ ...config, breakTimeHaft: parseInt(e.target.value, 10) })}
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



                                    <label className="match-management-label">Số hiệp trong 1 trận</label>
                                    <input
                                        type="number"
                                        placeholder="Thời gian một trận đấu (phút)"
                                        value={config.numberHaft}
                                        onChange={(e) => setConfig({ ...config, numberHaft: parseInt(e.target.value, 10) })}
                                        className="match-management-input-field"
                                    />

                                    <label className="match-management-label">Thời gian một hiệp đấu (phút)</label>
                                    <input
                                        type="number"
                                        placeholder="Thời gian một trận đấu (phút)"
                                        value={config.haftDuration}
                                        onChange={(e) => setConfig({ ...config, haftDuration: parseInt(e.target.value, 10) })}
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

                    {stageData.length > roundsPerPage ? (
                        <div className="round-nav-container">
                            <div onClick={handlePrevPage} disabled={startRoundIndex === 0} className="roundsitem-nav-arrow">
                                <div className='round-icon'>←</div>
                            </div>

                            <div className="match-management-round-navbar">
                                {paginatedRounds.map((round) => (
                                    <button
                                        key={round.roundId}
                                        className={`match-management-round-button ${currentRound === round.round ? 'match-management-round-button-active' : ''}`}
                                        onClick={() => setCurrentRound(round.round)}
                                    >
                                        Vòng {round.round}
                                    </button>
                                ))}
                            </div>

                            <div onClick={handleNextPage} disabled={endRoundIndex >= stageData.length} className="roundsitem-nav-arrow">
                                <div className='round-icon'>→</div>
                            </div>
                        </div>
                    ) : <div className="match-management-round-navbar">
                        {paginatedRounds.map((round) => (
                            <button
                                key={round.roundId}
                                className={`match-management-round-button ${currentRound === round.round ? 'match-management-round-button-active' : ''}`}
                                onClick={() => setCurrentRound(round.round)}
                            >
                                Vòng {round.round}
                            </button>
                        ))}
                    </div>}



                    {/* Round Details */}
                    {paginatedRounds
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
                                                    value={
                                                        match.date
                                                            ? new Date(
                                                                new Date(match.date).setDate(
                                                                    new Date(match.date).getDate() + (dataTeamMatch?.isMatch ? 1 : 0)
                                                                )
                                                            )
                                                                .toISOString()
                                                                .split('T')[0]
                                                            : ''
                                                    }
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

                </>

            }

        </div>
    );
};

export default MatchManagement;
