import React, { useState } from 'react';
import './GroupMatch.css';
import CountdownPopup from '../CountdownPopup/CountdownPopup';
import KnockoutStage from '../KnockoutStage/KnockoutStage';

// Initial teams for groups, can be modified dynamically
const initialGroups = {
    A: ['Đội #1', 'Đội #2', 'Đội #3', 'Đội #4'],
    B: ['Đội #5', 'Đội #6', 'Đội #7'],
};

// Round-robin scheduling function
const generateRoundRobinSchedule = (teams) => {
    const rounds = [];
    const totalTeams = teams.length;

    if (totalTeams % 2 !== 0) {
        teams.push('Bye');
    }

    const numRounds = teams.length - 1;
    const halfSize = teams.length / 2;

    const teamList = [...teams];
    for (let round = 0; round < numRounds; round++) {
        const matches = [];
        for (let i = 0; i < halfSize; i++) {
            const team1 = teamList[i];
            const team2 = teamList[teamList.length - 1 - i];
            if (team1 !== 'Bye' && team2 !== 'Bye') {
                matches.push([team1, team2]);
            }
        }
        rounds.push(matches);

        // Rotate teams but keep the first team fixed
        teamList.splice(1, 0, teamList.pop());
    }

    return rounds;
};

const GroupMatch = () => {
    const [groups] = useState(initialGroups); // Dynamically handles multiple groups
    const [currentStage, setCurrentStage] = useState('group'); // "group" or "knockout"
    const [currentRound, setCurrentRound] = useState(1);
    const [groupSchedules, setGroupSchedules] = useState(
        Object.keys(groups).reduce((acc, groupKey) => {
            acc[groupKey] = generateRoundRobinSchedule(groups[groupKey]);
            return acc;
        }, {})
    );
    const [showPopup, setShowPopup] = useState(false); // Control when to show the popup
    const [successMessage, setSuccessMessage] = useState('');

    // Handle round randomization (re-randomize matches for all groups)
    const randomizeMatches = () => {
        const newSchedules = Object.keys(groups).reduce((acc, groupKey) => {
            acc[groupKey] = generateRoundRobinSchedule(groups[groupKey]).sort(() => Math.random() - 0.5);
            return acc;
        }, {});
        setGroupSchedules(newSchedules);
        setSuccessMessage('Cập nhật thành công!');
    };

    // Handle random draw button click
    const handleRandomDraw = () => {
        setShowPopup(true); // Show the popup with the countdown
    };

    // Handle countdown completion
    const handleCountdownComplete = () => {
        setShowPopup(false); // Hide the popup after countdown finishes
        randomizeMatches(); // Perform the randomization after popup disappears
    };

    // Render matches for the current round
    const renderMatchesForRound = (group) => {
        const matchesInRound = groupSchedules[group][currentRound - 1]; // Get matches for the current round
        return matchesInRound.map((match, index) => (
            <div key={index} className="match-pair">
                <select className="match-team-select" value={match[0]}>
                    <option>{match[0]}</option>
                </select>
                <span className="match-vs"> - </span>
                <select className="match-team-select" value={match[1]}>
                    <option>{match[1]}</option>
                </select>
            </div>
        ));
    };

    return (
        <div className="group-match-container">
            <h2 className="group-match-title">Sắp xếp cặp đấu</h2>

            <p className="group-match-description">Bạn có thể thay đổi cấu hình cho từng trận đấu.</p>

            <div className="navbar">
                <button className={`navbar-btn ${currentStage === 'group' ? 'active' : ''}`} onClick={() => setCurrentStage('group')}>
                    Giai đoạn đấu vòng bảng
                </button>
                <button className={`navbar-btn ${currentStage === 'knockout' ? 'active' : ''}`} onClick={() => setCurrentStage('knockout')}>
                    Giai đoạn loại trực tiếp
                </button>
            </div>

            <div className="button-container">
                <button className="random-btn" onClick={handleRandomDraw}>Bốc thăm ngẫu nhiên</button>
            </div>

           

            {currentStage === 'group' && (
                <div className="group-stage">
                    <div className="round-tabs">
                        {[...Array(groupSchedules.A.length).keys()].map((round) => (
                            <button key={round} className={`round-tab-btn ${currentRound === round + 1 ? 'active' : ''}`} onClick={() => setCurrentRound(round + 1)}>
                                {round + 1}
                            </button>
                        ))}
                    </div>

                    <div className="group-matches">
                        {Object.keys(groups).map((groupKey) => (
                            <div key={groupKey} className="group-container">
                                <h3 className="group-title">{`Bảng ${groupKey}`}</h3>
                                {renderMatchesForRound(groupKey)}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {currentStage === 'knockout' && (
                <div className="knockout-stage">
                    <KnockoutStage />
                </div>
            )}

            <button className="save-btn">Lưu</button>

           
            {showPopup && <CountdownPopup onComplete={handleCountdownComplete} />}
        </div>
    );
};

export default GroupMatch;
