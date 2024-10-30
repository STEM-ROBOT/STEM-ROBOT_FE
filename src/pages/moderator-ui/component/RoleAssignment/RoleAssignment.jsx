import React, { useState } from 'react';
import './RoleAssignment.css';

const RoleAssignment = () => {
  const [chiefReferees, setChiefReferees] = useState(1); // Fixed at 1
  const [referees, setReferees] = useState(2); // Number of regular referees
  const [simultaneousReferees, setSimultaneousReferees] = useState(3); // Total referees needed at the same time
  const [selectAll, setSelectAll] = useState(false); // State to track select all checkbox

  const [refereeList, setRefereeList] = useState([
    { id: 1, name: "Nguyễn Văn A", email: "nguyenvana@example.com", role: "Trọng tài chính", selected: false, image: "https://i.pravatar.cc/100?img=1" },
    { id: 2, name: "Trần Thị B", email: "tranthib@example.com", role: "Trọng tài viên", selected: false, image: "https://i.pravatar.cc/100?img=2" },
    { id: 3, name: "Lê Văn C", email: "levanc@example.com", role: "Trọng tài viên", selected: false, image: "https://i.pravatar.cc/100?img=3" },
    { id: 4, name: "Hoàng Thị D", email: "hoangthid@example.com", role: "Trọng tài chính", selected: false, image: "https://i.pravatar.cc/100?img=4" },
    { id: 5, name: "Phạm Văn E", email: "phamvane@example.com", role: "Trọng tài viên", selected: false, image: "https://i.pravatar.cc/100?img=5" },
  ]);

  const handleRoleChange = (id, newRole) => {
    const updatedReferees = refereeList.map((referee) =>
      referee.id === id ? { ...referee, role: newRole } : referee
    );
    setRefereeList(updatedReferees);
  };

  const handleConfirm = () => {
    const requiredChiefReferees = chiefReferees * simultaneousReferees;
    const requiredRegularReferees = referees * simultaneousReferees;

    const selectedChiefReferees = refereeList.filter(
      (referee) => referee.selected && referee.role === "Trọng tài chính"
    ).length;
    const selectedRegularReferees = refereeList.filter(
      (referee) => referee.selected && referee.role === "Trọng tài viên"
    ).length;

    const chiefRefereesRemaining = requiredChiefReferees - selectedChiefReferees;
    const regularRefereesRemaining = requiredRegularReferees - selectedRegularReferees;

    if (chiefRefereesRemaining <= 0 && regularRefereesRemaining <= 0) {
      alert("Valid selection! Referee roles confirmed.");
    } else {
      alert(
        `Invalid selection!\n- Trọng tài chính: cần ${requiredChiefReferees}, đã chọn ${selectedChiefReferees}, còn thiếu ${chiefRefereesRemaining > 0 ? chiefRefereesRemaining : 0}\n` +
        `- Trọng tài viên: cần ${requiredRegularReferees}, đã chọn ${selectedRegularReferees}, còn thiếu ${regularRefereesRemaining > 0 ? regularRefereesRemaining : 0}`
      );
    }
  };

  const toggleSelection = (id) => {
    const updatedReferees = refereeList.map((referee) =>
      referee.id === id ? { ...referee, selected: !referee.selected } : referee
    );
    setRefereeList(updatedReferees);
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    const updatedReferees = refereeList.map((referee) => ({
      ...referee,
      selected: newSelectAll,
    }));
    setRefereeList(updatedReferees);
  };

  return (
    <div className="role-assignment-container">
      <div className="role-assignment-header">
        <h2>Quản lí trọng tài</h2>
        <div className="header-buttons">
          <button className="import-button">Import</button>
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
          {refereeList.map((referee) => (
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
                  <option value="Trọng tài chính">Trọng tài chính</option>
                  <option value="Trọng tài viên">Trọng tài viên</option>
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
