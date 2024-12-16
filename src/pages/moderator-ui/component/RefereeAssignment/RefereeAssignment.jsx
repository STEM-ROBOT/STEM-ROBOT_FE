import React, { useEffect, useState } from 'react';
import './RefereeAssignment.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addRefereeSchedule, getRefereeSchedule } from '../../../../redux/actions/RefereeAction';
import { getActive } from '../../../../redux/actions/FormatAction';
import CountdownPopup from '../CountdownPopup/CountdownPopup';
import { toast } from 'react-toastify';

const RefereeAssignment = () => {
    const { competitionId } = useParams();
    const dispatch = useDispatch();
    const getScheduleReferee = useSelector((state) => state.getScheduleReferee);
    const refereeData = getScheduleReferee?.listRefereeSchedule;

    const [data, setData] = useState();
    const [numMatchReferees, setNumMatchReferees] = useState(1);
    const isAddSuccess = useSelector((state) => state.addScheduleReferee?.success);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        dispatch(getRefereeSchedule(competitionId));
        dispatch(getActive(competitionId));
    }, [competitionId, dispatch, isAddSuccess]);

    useEffect(() => {
        if (refereeData?.rounds && refereeData.rounds[0]?.matches) {
            setData(refereeData);
            setNumMatchReferees(1);
        }
    }, [refereeData]);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };
    const handleRandomizeWithPopup = () => {
        setShowPopup(true);
    };

    const handleCountdownComplete = () => {
        setShowPopup(false);
        randomizeReferees();

    };


    const checkTimeConflict = (round, matchDate, matchTime, refereeId, isMainReferee) => {
        return round.matches.some(match => {
            const isSameDateTime = match.date === matchDate && match.timeIn === matchTime;
            const isMainConflict = isMainReferee && match.mainReferee?.id === refereeId;
            const isSubConflict = !isMainReferee && match.matchRefereesdata?.some(ref => ref.id === refereeId);
            return isSameDateTime && (isMainConflict || isSubConflict);
        });
    };


    const randomizeReferees = () => {
        const updatedData = JSON.parse(JSON.stringify(data)); // Deep clone the data

        updatedData.rounds.forEach((round) => {
            let availableMainRefs = shuffleArray([...data.referees]);
            let availableMatchRefs = shuffleArray([...data.matchReferees]);

            round.matches.forEach((match) => {
                if (availableMainRefs.length === 0) {
                    availableMainRefs = shuffleArray([...data.referees]);
                }
                if (availableMatchRefs.length < numMatchReferees) {
                    availableMatchRefs = shuffleArray([...data.matchReferees]);
                }

                // Assign a main referee if no time conflict
                while (availableMainRefs.length > 0) {
                    const mainReferee = availableMainRefs.pop();
                    if (!checkTimeConflict(round, match.date, match.timeIn, mainReferee.id, true)) {
                        match.mainReferee = mainReferee;
                        break;
                    }
                }

                // Assign assistant referees, checking for conflicts
                match.matchRefereesdata = [];
                for (let i = 0; i < numMatchReferees; i++) {
                    while (availableMatchRefs.length > 0) {
                        const matchReferee = availableMatchRefs.pop();
                        if (!checkTimeConflict(round, match.date, match.timeIn, matchReferee.id, false)) {
                            match.matchRefereesdata.push(matchReferee);
                            break;
                        }
                    }
                }
            });
        });

        setData(updatedData);
    };

    const handleUpdate = (roundIndex, matchIndex, field, value) => {
        const updatedData = JSON.parse(JSON.stringify(data)); // Deep clone data
        const selectedMatch = updatedData.rounds[roundIndex].matches[matchIndex];
    
        // Kiểm tra nếu trọng tài đã được gán trong trận đấu
        const isAlreadyAssigned =
            selectedMatch.mainReferee?.id === value?.id || // Đã là trọng tài chính
            selectedMatch.matchRefereesdata.some((ref) => ref.id === value?.id); // Đã là trọng tài phụ
    
        if (isAlreadyAssigned) {
            toast.error('Trọng tài này đã được gán cho trận đấu này!');
            return;
        }
    
        // Kiểm tra xung đột thời gian trước khi cập nhật
        const isMainReferee = field === 'mainReferee';
        const matchTime = selectedMatch.timeIn;
    
        if (checkTimeConflict(updatedData.rounds[roundIndex], selectedMatch.date, matchTime, value.id, isMainReferee)) {
            toast.error('Trọng tài này đã bị trùng lịch tại trận khác!');
            return;
        }
    
        // Cập nhật nếu không có xung đột
        if (isMainReferee) {
            updatedData.rounds[roundIndex].matches[matchIndex][field] = value;
        } else {
            updatedData.rounds[roundIndex].matches[matchIndex].matchRefereesdata[value.index] = value.ref;
        }
    
        setData(updatedData);
    };
    
    

    const prepareDataForSave = () => {
        if (!data || data.rounds.some(round => round.matches.some(match => !match.mainReferee || match.matchRefereesdata.length < numMatchReferees))) {
            toast.error('Vui lòng bốc thăm trọng tài trước khi lưu!');
            return;
        }
        const result = [];

        data?.rounds.forEach((round) => {
            round.matches.forEach((match) => {
                if (match.mainReferee) {
                    result.push({
                        refereeCompetitionId: match.mainReferee.id,
                        matchId: match.matchId,
                    });
                }

                match.matchRefereesdata.forEach((referee) => {
                    result.push({
                        refereeCompetitionId: referee.id,
                        matchId: match.matchId,
                    });
                });
            });
        });
        dispatch(addRefereeSchedule(competitionId, result));
    };

    return (
        <div className="referee-assignment-container-main">
            <h2 className="referee-assignment-title-main">Sắp xếp trọng tài</h2>

            {data?.isSchedule !== true && (
                <button className="referee-assignment-randomize-button" onClick={handleRandomizeWithPopup}>
                    Bốc thăm ngẫu nhiên trọng tài
                </button>

            )}

            {data?.rounds.map((round, roundIndex) => (
                <div key={round.roundId} className="referee-assignment-round">
                    <h3 className="referee-assignment-round-title">Vòng {round.roundName}</h3>

                    {round.matches.map((match, matchIndex) => (
                        <div key={match.matchId} className="referee-assignment-match-row">
                            <span className="referee-assignment-match-info">{`#${match.matchId}`}</span>

                            <input
                                type="date"
                                value={
                                    match.date
                                        ? new Date(new Date(match.date).setDate(new Date(match.date).getDate() + 1))
                                            .toISOString()
                                            .split('T')[0]
                                        : ''
                                }
                                onChange={(e) => handleUpdate(roundIndex, matchIndex, 'date', e.target.value)}
                                className="referee-assignment-date-input"
                            />

                            <input
                                type="time"
                                value={match.timeIn}
                                onChange={(e) => handleUpdate(roundIndex, matchIndex, 'timeIn', e.target.value)}
                                className="referee-assignment-time-input"
                            />

                            <input
                                type="text"
                                value={match?.arena || ''}
                                onChange={(e) => handleUpdate(roundIndex, matchIndex, 'arena', e.target.value)}
                                className="referee-assignment-arena-input"
                            />

                            <select
                                className="referee-assignment-main-referee-select"
                                value={match.mainReferee?.id || ''}
                                disabled
                                onChange={(e) =>
                                    handleUpdate(roundIndex, matchIndex, 'mainReferee', data.referees.find(ref => ref.id === parseInt(e.target.value, 10)))
                                }
                            >
                                <option value="">{match.mainRefereeName ? match.mainRefereeName : "Trọng tài chính"}</option>
                                {data.referees.map((ref) => (
                                    <option key={ref.id} value={ref.id}>
                                        {ref.name}
                                    </option>
                                ))}
                            </select>

                            {Array.from({ length: numMatchReferees }).map((_, refIndex) => (
                                <select
                                    className="referee-assignment-match-referee-select"
                                    key={refIndex}
                                    disabled
                                    value={match.matchRefereesdata[refIndex]?.id || ''}
                                    onChange={(e) =>
                                        handleUpdate(roundIndex, matchIndex, 'matchRefereesdata', { index: refIndex, ref: data.matchReferees.find(ref => ref.id === parseInt(e.target.value, 10)) })
                                    }
                                >
                                    <option value="">{match.matchRefereesdata[refIndex]?.subRefereeName ? match.matchRefereesdata[refIndex]?.subRefereeName : "Trọng tài viên"}</option>
                                    {data.matchReferees.map((ref) => (
                                        <option key={ref.id} value={ref.id}>
                                            {ref.name}
                                        </option>
                                    ))}
                                </select>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
            {
                refereeData?.isSchedule !== true && (
                    <button className="referee-assignment-save-button" onClick={prepareDataForSave}>Lưu</button>
                )
            }
            {showPopup && <CountdownPopup onComplete={handleCountdownComplete} />}
        </div>
    );
};

export default RefereeAssignment;
