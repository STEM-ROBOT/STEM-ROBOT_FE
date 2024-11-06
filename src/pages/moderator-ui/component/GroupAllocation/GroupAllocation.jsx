import React, { useEffect, useState } from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';
import './GroupAllocation.css';
import { useDispatch, useSelector } from 'react-redux';
import { AddTeamsTable, getTeamsTable } from '../../../../redux/actions/TeamAction';
import { useParams } from 'react-router-dom';

const GroupAllocation = () => {
    const { competitionId } = useParams();
    const dispatch = useDispatch();

    const getTeams = useSelector((state) => state.getTeamTable);
    const data = getTeams?.listTeams?.data;

    const [tables, setTables] = useState([]);
    const [teams, setTeams] = useState([]);
    const [teamsToNextRound, setTeamsToNextRound] = useState([]);
    const [totalTeamsToNextRound, setTotalTeamsToNextRound] = useState(2);
    const [error, setError] = useState('');
    const [randomizeEnabled, setRandomizeEnabled] = useState(false);

    const teamOptions = Array.from({ length: 6 }, (_, i) => Math.pow(2, i + 1));

    useEffect(() => {
        dispatch(getTeamsTable(competitionId));
    }, [competitionId, dispatch]);

    useEffect(() => {
        if (Array.isArray(data?.tables) && Array.isArray(data?.teams)) {
            setTables(data.tables);
            setTeams(data.teams);
            setTeamsToNextRound(Array(data.tables.length).fill(1));
           
            if (randomizeEnabled) {
                randomizeGroups(data.teams, data.tables);
            }
        }
        setRandomizeEnabled(data?.isTable)
    }, [data, randomizeEnabled,data?.isTable]);

    const randomizeGroups = (teams, tables) => {
        const shuffledTeams = [...teams].sort(() => Math.random() - 0.5);
        const groupSizes = calculateGroupSizes(shuffledTeams.length, tables.length);

        const newTables = tables.map((table, index) => {
            const assignedTeams = shuffledTeams.splice(0, groupSizes[index]).map((team) => ({
                teamId: team.teamId,
                teamName: team.teamName,
            }));
            return { ...table, teams: assignedTeams };
        });

        setTables(newTables);
    };

    const calculateGroupSizes = (totalTeams, numGroups) => {
        const baseSize = Math.floor(totalTeams / numGroups);
        const extra = totalTeams % numGroups;

        const sizes = Array(numGroups).fill(baseSize);
        for (let i = 0; i < extra; i++) {
            sizes[i]++;
        }

        return sizes;
    };

    const moveTeam = (team, fromTableIndex, toTableIndex) => {
        setTables((prevTables) => {
            const newTables = prevTables.map((table, index) => {
                if (index === fromTableIndex) {
                    return {
                        ...table,
                        teams: table.teams.filter((t) => t.teamId !== team.teamId),
                    };
                }
                if (index === toTableIndex) {
                    return {
                        ...table,
                        teams: [...table.teams, { teamId: team.teamId, teamName: team.teamName }],
                    };
                }
                return table;
            });
            return newTables;
        });
    };

    const handleTeamsToNextRoundChange = (tableIndex, value) => {
        const newTeamsToNextRound = [...teamsToNextRound];
        newTeamsToNextRound[tableIndex] = parseInt(value, 10);
        setTeamsToNextRound(newTeamsToNextRound);
        setError(''); // Reset error on change
    };

    const validateGroups = () => {
        const totalSelectedTeams = teamsToNextRound.reduce((acc, val) => acc + val, 0);

        if (totalSelectedTeams !== totalTeamsToNextRound) {
            setError(`Tổng số đội đi tiếp trong các bảng phải bằng ${totalTeamsToNextRound}`);
            return false;
        }

        for (let table of tables) {
            if (table.teams.filter((team) => team.teamId).length < 3) {
                setError('Mỗi bảng phải có ít nhất 3 đội.');
                return false;
            }
        }

        setError('');
        return true;
    };

    const handleSave = () => {
        if (validateGroups()) {
            const dataToSave = {       
                tableAssign: tables.map((table, index) => ({
                    teamNextRound: teamsToNextRound[index] || 1, 
                    tableGroupId: table.tableId,
                    tableGroupName: table.tableName,
                    teams: table.teams.map((team) => team.teamId)
                })),
            };
            console.log(dataToSave)
            dispatch(AddTeamsTable(competitionId, dataToSave));
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
                    disabled={!randomizeEnabled}
                    onChange={(e) => setTotalTeamsToNextRound(parseInt(e.target.value, 10))}
                >
                    {teamOptions.map((value) => (
                        <option key={value} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
            </div>

            {randomizeEnabled && (
                <button className="custom-randomize-btn" onClick={() => randomizeGroups(teams, tables)}>
                    Chia đội ngẫu nhiên
                </button>
            )}

            {error && <div className="custom-error-message">{error}</div>}

            <div className="custom-groups-container">
                {tables.map((table, tableIndex) => (
                    <div key={table.tableId} className="custom-group">
                        <h3>Bảng {table.tableName}</h3>

                        <div className="custom-group-header">
                            <label>Chọn</label>
                            <select
                                value={teamsToNextRound[tableIndex]}
                                onChange={(e) => handleTeamsToNextRoundChange(tableIndex, e.target.value)}
                            >
                                {[...Array(table.teams.filter((t) => t.teamId).length).keys()].map((i) => (
                                    <option key={i} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>
                            đội đi tiếp
                        </div>

                        {table.teams.map((team, teamIndex) => (
                            <div key={teamIndex} className="custom-team-item">
                                {team.teamName || 'Chưa có đội'}
                                <div className="custom-team-controls">
                                    {tableIndex > 0 && team.teamId && (
                                        <FaPlus onClick={() => moveTeam(team, tableIndex, tableIndex - 1)} />
                                    )}
                                    {tableIndex < tables.length - 1 && team.teamId && (
                                        <FaPlus onClick={() => moveTeam(team, tableIndex, tableIndex + 1)} />
                                    )}
                                    {team.teamId && (
                                        <FaTrash
                                            onClick={() =>
                                                setTables((prevTables) =>
                                                    prevTables.map((tbl, idx) =>
                                                        idx === tableIndex
                                                            ? {
                                                                  ...tbl,
                                                                  teams: tbl.teams.filter((_, i) => i !== teamIndex),
                                                              }
                                                            : tbl
                                                    )
                                                )
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
          {randomizeEnabled && (
                <button className="custom-save-btn" onClick={handleSave}>
                Lưu
            </button>
          )}
           
        </div>
    );
};

export default GroupAllocation;
