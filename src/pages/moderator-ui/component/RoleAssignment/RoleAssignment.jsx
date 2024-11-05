import React, { useEffect, useState } from 'react';
import './RoleAssignment.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getListRefereeFreeTime } from '../../../../redux/actions/RefereeAction';

const RoleAssignment = () => {
  const { tournamentId } = useParams();
  const dispatch = useDispatch();

  const [chiefReferees, setChiefReferees] = useState(1); 
  const [referees, setReferees] = useState(2); 
  const [simultaneousReferees, setSimultaneousReferees] = useState(3); 
  const [selectAll, setSelectAll] = useState(false);

  const getRefereesFreeTimes = useSelector((state) => state.getFreetimeReferee);
  const refereeList = Array.isArray(getRefereesFreeTimes?.listRefereefreetime?.data)
    ? getRefereesFreeTimes.listRefereefreetime.data
    : [];

  const [updatedRefereeList, setUpdatedRefereeList] = useState([]);
  useEffect(() => {
    dispatch(getListRefereeFreeTime(tournamentId));
  }, [dispatch, tournamentId]);

  useEffect(() => {
    // Only set `updatedRefereeList` if it is different from `refereeList`
    if (JSON.stringify(updatedRefereeList) !== JSON.stringify(refereeList)) {
      setUpdatedRefereeList(
        refereeList?.map(referee => ({
          ...referee,
          role: 'Staff', 
          selected: false,
        }))
      );
    }
  }, [refereeList]);

  const handleRoleChange = (id, newRole) => {
    setUpdatedRefereeList(prevList =>
      prevList.map(referee =>
        referee.id === id ? { ...referee, role: newRole } : referee
      )
    );
  };

  const handleConfirm = () => {
    const requiredChiefReferees = chiefReferees * simultaneousReferees;
    const requiredRegularReferees = referees * simultaneousReferees;

    const selectedChiefReferees = updatedRefereeList.filter(
      referee => referee.selected && referee.role === 'Manage'
    ).length;
    const selectedRegularReferees = updatedRefereeList.filter(
      referee => referee.selected && referee.role === 'Staff'
    ).length;

    const chiefRefereesRemaining = requiredChiefReferees - selectedChiefReferees;
    const regularRefereesRemaining = requiredRegularReferees - selectedRegularReferees;

    if (chiefRefereesRemaining <= 0 && regularRefereesRemaining <= 0) {
      saveRefereesToDB(); 
    } else {
      alert(
        `Invalid selection!\n- Trọng tài chính: cần ${requiredChiefReferees}, đã chọn ${selectedChiefReferees}, còn thiếu ${chiefRefereesRemaining > 0 ? chiefRefereesRemaining : 0}\n` +
        `- Trọng tài viên: cần ${requiredRegularReferees}, đã chọn ${selectedRegularReferees}, còn thiếu ${regularRefereesRemaining > 0 ? regularRefereesRemaining : 0}`
      );
    }
  };

  const saveRefereesToDB = () => {
    const selectedReferees = updatedRefereeList
      .filter(referee => referee.selected)
      .map(referee => ({
        refereeId: referee.id,
        role: referee.role,
      }));
    console.log(competitionId,selectedReferees)
    dispatch();
  };

  const toggleSelection = (id) => {
    setUpdatedRefereeList(prevList =>
      prevList.map(referee =>
        referee.id === id ? { ...referee, selected: !referee.selected } : referee
      )
    );
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setUpdatedRefereeList(prevList =>
      prevList.map(referee => ({
        ...referee,
        selected: newSelectAll,
      }))
    );
  };

  return (
    <div className="role-assignment-container">
      <div className="role-assignment-header">
        <h2>Quản lí trọng tài</h2>
        <div className="header-buttons">
          {/* <button className="import-button">Import</button> */}
          <button className="create-button" onClick={handleConfirm}>Lưu</button>
        </div>
      </div>

      <div className="role-assignment-inputs">
        <div className="input-group">
          <label>Số trọng tài chính:</label>
          <input type="number" value={chiefReferees} disabled />
        </div>
        <div className="input-group">
          <label>Số trọng tài viên:</label>
          <input
            type="number"
            value={referees}
            onChange={(e) => setReferees(Number(e.target.value))}
          />
        </div>
        <div className="input-group">
          <label>Số đội ngũ trọng tài :</label>
          <input
            type="number"
            value={simultaneousReferees}
            onChange={(e) => setSimultaneousReferees(Number(e.target.value))}
          />
        </div>
      </div>

      <table className="role-assignment-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>Ảnh</th>
            <th>Email</th>
            <th>Tên</th>
            <th>Vai trò</th>
          </tr>
        </thead>
        <tbody>
          {updatedRefereeList.map((referee) => (
            <tr key={referee.id}>
              <td>
                <input
                  type="checkbox"
                  checked={referee.selected}
                  onChange={() => toggleSelection(referee.id)}
                />
              </td>
              <td><img src={referee.image} alt={referee.name} className="referee-image" /></td>
              <td>{referee.email}</td>
              <td>{referee.name}</td>
              <td>
                <select
                  value={referee.role}
                  onChange={(e) => handleRoleChange(referee.id, e.target.value)}
                  className="role-select"
                >
                  <option value="Manage">Trọng tài chính</option>
                  <option value="Staff">Trọng tài viên</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleAssignment;
