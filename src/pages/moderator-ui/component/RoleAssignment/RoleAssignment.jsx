import React, { useState } from 'react';
import './RoleAssignment.css';

const RoleAssignment = () => {
  const [referees, setReferees] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      role: "Trọng tài chính",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthib@example.com",
      role: "Trọng tài viên",
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "levanc@example.com",
      role: "Trọng tài viên",
    },
    {
      id: 4,
      name: "Hoàng Thị D",
      email: "hoangthid@example.com",
      role: "Trọng tài chính",
    },
    {
      id: 5,
      name: "Phạm Văn E",
      email: "phamvane@example.com",
      role: "Trọng tài viên",
    },
  ]);

  const handleRoleChange = (id, newRole) => {
    const updatedReferees = referees.map((referee) =>
      referee.id === id ? { ...referee, role: newRole } : referee
    );
    setReferees(updatedReferees);
  };

  const handleConfirm = (id) => {
    const updatedReferee = referees.find((referee) => referee.id === id);
    console.log('Confirmed Role:', updatedReferee);
  };

  return (
    <div className="role-assignment-container">
      <div className="role-assignment-header">
        <h2>Quản lí trọng tài</h2>
        <div className="header-buttons">
          <button className="import-button">Import</button>
          <button className="create-button">Tạo</button>
        </div>
      </div>

      <table className="role-assignment-table">
        <thead>
          <tr>
            <th>Tài khoản Email</th>
            <th>Vai trò</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {referees.map((referee) => (
            <tr key={referee.id}>
              <td>
                <span>{referee.name} - {referee.email}</span>
              </td>
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
              <td>
                <button className="confirm-button" onClick={() => handleConfirm(referee.id)}>
                  Xác nhận
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleAssignment;
