import React, { useState } from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';
import './GroupAllocation.css';

// Initial teams list as objects
const initialTeams = [
    { id: 1, name: 'Đội #1' },
    { id: 2, name: 'Đội #2' },
    { id: 3, name: 'Đội #3' },
    { id: 4, name: 'Đội #4' },
    { id: 5, name: 'Đội #5' },
    { id: 6, name: 'Đội #6' },
    { id: 7, name: 'Đội #7' },
    { id: 8, name: 'Đội #8' },
  
];

const GroupAllocation = () => {
    const [groupCount, setGroupCount] = useState(3); // Number of groups
    const [groups, setGroups] = useState([]); // Empty groups initially
    const [teamsToNextRound, setTeamsToNextRound] = useState(Array(groupCount).fill(1)); // Teams going to next round
    const [error, setError] = useState(''); // Error message for validation
    const [totalTeamsToNextRound, setTotalTeamsToNextRound] = useState(2); // Total teams advancing to next round

    // Function to divide teams into groups
    const divideTeamsIntoGroups = (teams, groupCount) => {
        let shuffledTeams = [...teams].sort(() => Math.random() - 0.5); // Shuffle teams
        let groupSize = Math.floor(shuffledTeams.length / groupCount); // Base group size
        let extraTeams = shuffledTeams.length % groupCount; // Remaining teams to distribute
        let dividedGroups = [];
        let teamIndex = 0;

        for (let i = 0; i < groupCount; i++) {
            // Distribute the remaining teams across the first few groups
            let currentGroupSize = groupSize + (extraTeams > 0 ? 1 : 0);
            let group = shuffledTeams.slice(teamIndex, teamIndex + currentGroupSize);
            dividedGroups.push(group);
            teamIndex += currentGroupSize;
            extraTeams--; // Reduce extra teams after assigning
        }
        return dividedGroups;
    };

    // Function to randomize teams into the empty groups
    const randomizeGroups = () => {
        const newGroups = divideTeamsIntoGroups(initialTeams, groupCount);
        setGroups(newGroups);
    };

    // Function to move teams between groups
    const moveTeam = (team, fromGroupIndex, toGroupIndex) => {
        const newGroups = [...groups];
        newGroups[fromGroupIndex] = newGroups[fromGroupIndex].filter(t => t.id !== team.id);
        newGroups[toGroupIndex].push(team);
        setGroups(newGroups);
    };

    const handleTeamsToNextRoundChange = (groupIndex, value) => {
        const newTeamsToNextRound = [...teamsToNextRound];
        newTeamsToNextRound[groupIndex] = parseInt(value, 10);
        setTeamsToNextRound(newTeamsToNextRound);
    };

    // Validation: Ensure each group has at least 3 teams
    const validateGroups = () => {
        let totalSelectedTeams = teamsToNextRound.reduce((acc, val) => acc + val, 0);

        if (totalSelectedTeams > totalTeamsToNextRound) {
            setError(`Số đội đi tiếp không được vượt quá ${totalTeamsToNextRound} đội.`);
            return false;
        }

        for (let group of groups) {
            if (group.length < 3) {
                setError('Mỗi bảng phải có ít nhất 3 đội.');
                return false;
            }
        }

        setError('');
        return true;
    };

    // Handle save button click
    const handleSave = () => {
        if (validateGroups()) {
            // Proceed with saving if validation passes
            console.log('Groups are valid, proceed with saving...');
        }
    };

    return (
        <div className="custom-group-allocation-container">
            <h2>Sắp xếp bảng đấu</h2>

            <div className="custom-form-group">
                <label htmlFor="teamsToNextRound">
                    Số đội vào vòng trong <span className="required">*</span>
                    <small>Số lượng đội vượt qua được vòng bảng.</small>
                </label>
                <select
                    id="teamsToNextRound"
                    value={totalTeamsToNextRound}
                    onChange={(e) => setTotalTeamsToNextRound(parseInt(e.target.value, 10))}
                >
                    <option value="2">2</option>
                    <option value="4">4</option>
                    <option value="8">8</option>
                </select>
            </div>

            <div className="custom-info-box">
                <p>Giải đấu gồm {groupCount} bảng.</p>
                <p>Bạn có thể thay đổi bảng đấu cho đội bằng cách kéo thả hoặc xóa đấu thủ, hay bạn có thể thay đổi số đội đi tiếp ở vòng đấu loại trực tiếp.</p>
            </div>

            <button className="custom-randomize-btn" onClick={randomizeGroups}>
                Chia đội ngẫu nhiên
            </button>

            {error && <div className="custom-error-message">{error}</div>} 

            <div className="custom-groups-container">
                {groups.map((group, groupIndex) => (
                    <div key={groupIndex} className="custom-group">
                        <h3>{`Bảng ${String.fromCharCode(65 + groupIndex)}`}</h3>

                        <div className="custom-group-header">
                            <label>Chọn</label>
                            <select
                                value={teamsToNextRound[groupIndex]}
                                onChange={(e) => handleTeamsToNextRoundChange(groupIndex, e.target.value)}
                            >
                                {[...Array(groups[groupIndex].length).keys()].map(i => (
                                    <option key={i} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                            đội đi tiếp
                        </div>

                        {group.length === 0 ? (
                            <p>Bảng rỗng</p> // Display "Empty group" text when no teams are assigned
                        ) : (
                            group.map((team) => (
                                <div key={team.id} className="custom-team-item">
                                    {team.name}
                                    <div className="custom-team-controls">
                                        {groupIndex > 0 && (
                                            <FaPlus onClick={() => moveTeam(team, groupIndex, groupIndex - 1)} />
                                        )}
                                        {groupIndex < groups.length - 1 && (
                                            <FaPlus onClick={() => moveTeam(team, groupIndex, groupIndex + 1)} />
                                        )}
                                        <FaTrash onClick={() => setGroups(groups.map((g, idx) =>
                                            idx === groupIndex ? g.filter(t => t.id !== team.id) : g
                                        ))} />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                ))}
            </div>

            <button className="custom-save-btn" onClick={handleSave}>Lưu</button>
        </div>
    );
};

export default GroupAllocation;
