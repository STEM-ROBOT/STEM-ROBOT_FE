import React, { useEffect, useState } from 'react';
import './RefereeAssignment.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addRefereeSchedule, getRefereeSchedule } from '../../../../redux/actions/RefereeAction';

const RefereeAssignment = () => {
    const { competitionId } = useParams();
    const dispatch = useDispatch();
    const getScheduleReferee = useSelector((state) => state.getScheduleReferee);
    const refereeData = getScheduleReferee?.listRefereeSchedule;
    

    const [data, setData] = useState();
    const [numMatchReferees, setNumMatchReferees] = useState(1);
    

    useEffect(() => {
        dispatch(getRefereeSchedule(competitionId));
    }, [competitionId]);
    
  
    useEffect(() => {
        if (refereeData?.rounds && refereeData.rounds[0]?.matches) {
            setData(refereeData);
            setNumMatchReferees(refereeData.rounds[0].matches.length);
        }
      
    }, [refereeData]);
    console.log(refereeData?.isSchedule)
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const randomizeReferees = () => {
        const fieldCount = 3;
        const updatedData = JSON.parse(JSON.stringify(data));
        let isNotEnoughReferees = false;

        updatedData.rounds.forEach((round) => {
            let availableMainRefs = shuffleArray([...data.referees]);
            let availableMatchRefs = shuffleArray([...data.matchReferees]);

            // Count matches by time slots to check against field count
            const timeSlotMatches = {};

            round.matches.forEach((match) => {
                // Check if there are enough main referees
                if (availableMainRefs.length === 0) {
                    isNotEnoughReferees = true;
                    return;
                }

                // Assign a main referee
                match.mainReferee = availableMainRefs.pop();

                // Check if there are enough match referees
                if (availableMatchRefs.length < numMatchReferees) {
                    isNotEnoughReferees = true;
                    return;
                }

                // Check field count for the match time
                const matchTime = match.timeIn || 'default';
                if (!timeSlotMatches[matchTime]) {
                    timeSlotMatches[matchTime] = 0;
                }
                timeSlotMatches[matchTime]++;

                // If matches at this time exceed fields, stop assignment
                if (timeSlotMatches[matchTime] > fieldCount) {
                    alert(`Số trận đấu diễn ra tại ${matchTime} vượt quá số lượng sân có sẵn.`);
                    isNotEnoughReferees = true;
                    return;
                }

                // Assign assistant referees
                match.matchRefereesdata = [];
                for (let i = 0; i < numMatchReferees; i++) {
                    match.matchRefereesdata.push(availableMatchRefs.pop());
                }
            });
        });

        if (isNotEnoughReferees) {
            alert('Không đủ trọng tài hoặc số lượng sân không đáp ứng được các trận đấu cùng lúc.');
        } else {
            setData(updatedData);
        }
    };


    const handleUpdate = (roundIndex, matchIndex, field, value) => {
        const updatedData = JSON.parse(JSON.stringify(data));

        const selectedMatch = updatedData.rounds[roundIndex].matches[matchIndex];
        const selectedTime = selectedMatch.timeIn;

        // Check for time conflicts with other matches
        const hasTimeConflict = updatedData.rounds.some((round) =>
            round.matches.some((match, idx) => {
                if (idx !== matchIndex) {
                    const isSameMainReferee = field === 'mainReferee' && match.mainReferee?.id === value.id;
                    const isSameMatchReferee = field === 'matchRefereesdata' && match.matchRefereesdata.some(ref => ref.id === value.id);
                    return (isSameMainReferee || isSameMatchReferee) && match.timeIn === selectedTime;
                }
                return false;
            })
        );

        if (hasTimeConflict) {
            alert('Trọng tài này đã được chọn cho trận đấu khác tại cùng thời gian!');
            return;
        }

        // Assign the referee if no conflict is found
        if (field === 'mainReferee') {
            updatedData.rounds[roundIndex].matches[matchIndex][field] = value;
        } else {
            updatedData.rounds[roundIndex].matches[matchIndex].matchRefereesdata[value.index] = value.ref;
        }

        setData(updatedData);
    };

    const prepareDataForSave = () => {
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
        dispatch(addRefereeSchedule(competitionId, result))
    };
    return (
        <div className="referee-assignment-container-main">
            <h2 className="referee-assignment-title-main">Sắp xếp trọng tài</h2>

            <div className="referee-assignment-num-referees-input-container">
                <label className="referee-assignment-input-label">Số lượng trọng tài trận:</label>
                <input
                    className="referee-assignment-input-field"
                    type="number"
                    min="1"
                    max="3"
                    value={numMatchReferees}
                    onChange={(e) => setNumMatchReferees(Number(e.target.value))}
                />
            </div>
            {
                data?.isSchedule !== true && (
                    <button className="referee-assignment-randomize-button" onClick={randomizeReferees}>Bốc thăm ngẫu nhiên trọng tài</button>
                )
            }
           

            {data?.rounds.map((round, roundIndex) => (
                <div key={round.roundId} className="referee-assignment-round">
                    <h3 className="referee-assignment-round-title">Vòng {round.roundName}</h3>

                    {round.matches.map((match, matchIndex) => (
                        <div key={match.matchId} className="referee-assignment-match-row">
                            <span className="referee-assignment-match-info">{`#${match.matchId}`}</span>

                            <input
                                type="date"
                                value={match.date ? new Date(match.date).toISOString().split('T')[0] : ''}
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
                                value={match?.arena}
                                onChange={(e) => handleUpdate(roundIndex, matchIndex, 'arena', e.target.value)}
                                className="referee-assignment-arena-input"
                            />

                            <select
                                className="referee-assignment-main-referee-select"
                                value={match.mainReferee || ''}
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


                            {Array.from({ length: numMatchReferees }).map((_, refIndex) => (
                                <select
                                    className="referee-assignment-match-referee-select"
                                    key={refIndex}
                                    value={match.matchRefereesdata[refIndex]?.subRefereeId || ''}
                                    onChange={(e) =>
                                        handleUpdate(roundIndex, matchIndex, 'matchRefereesdata', { index: refIndex, ref: data.matchReferees.find(ref => ref.id === parseInt(e.target.value, 10)) })
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
                    ))}
                </div>
            ))}
            {
                refereeData?.isSchedule !== true && (
                    <button className="referee-assignment-save-button" onClick={prepareDataForSave}>Lưu</button>
                )
            }
         
        </div>
    );
};

export default RefereeAssignment;
