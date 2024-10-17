import React, { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa'; // Import icons for adding/removing members
import './EditTeamPopup.css';

const EditTeamPopup = ({ team, closePopup }) => {
  const [teamDetails, setTeamDetails] = useState({
    name: team.name,
    contactPhone: team.contactPhone,
    contactPerson: team.contactPerson,
    members: team.members || [],
    logo: team.logo,
  });

  // Handle changes for inputs
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setTeamDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  // Handle adding new members
  const handleAddMember = () => {
    setTeamDetails((prevDetails) => ({
      ...prevDetails,
      members: [...prevDetails.members, ""], // Add an empty string for a new member
    }));
  };

  // Handle removing members
  const handleRemoveMember = (index) => {
    const updatedMembers = teamDetails.members.filter((_, i) => i !== index);
    setTeamDetails((prevDetails) => ({
      ...prevDetails,
      members: updatedMembers,
    }));
  };

  // Handle member input changes
  const handleMemberChange = (index, value) => {
    const updatedMembers = [...teamDetails.members];
    updatedMembers[index] = value;
    setTeamDetails((prevDetails) => ({
      ...prevDetails,
      members: updatedMembers,
    }));
  };

  // Handle logo change
  const handleLogoChange = (e) => {
    const newLogo = URL.createObjectURL(e.target.files[0]);
    setTeamDetails((prevDetails) => ({ ...prevDetails, logo: newLogo }));
  };

  const handleSave = () => {
    console.log('Updated Team Details:', teamDetails);
    closePopup();
  };

  return (
    <div className="edit-popup">
      <div className="popup-content">
        <h3>Chỉnh sửa đội</h3>

        <div className="popup-main-content">
          {/* Team logo with the option to change */}
          <div className="edit-logo-section">
            <img src={teamDetails.logo} alt={teamDetails.name} className="edit-logo" />
            <input type="file" accept="image/*" onChange={handleLogoChange} />
          </div>

          {/* Team name and contact info */}
          <div className="edit-info-section">
            <label>Tên đội</label>
            <input
              type="text"
              name="name"
              value={teamDetails.name}
              onChange={handleFieldChange}
              placeholder="Tên đội"
            />
            <label>Số điện thoại</label>
            <input
              type="text"
              name="contactPhone"
              value={teamDetails.contactPhone}
              onChange={handleFieldChange}
              placeholder="SĐT liên hệ"
            />
            <label>Đại diện</label>
            <input
              type="text"
              name="contactPerson"
              value={teamDetails.contactPerson}
              onChange={handleFieldChange}
              placeholder="Tên người liên hệ"
            />
          </div>
        </div>

        {/* Team Members */}
        <div className="team-members-section">
          <label>Thành viên</label>
          <div className="members-scroll">
            {teamDetails.members.map((member, index) => (
              <div key={index} className="member-input">
                <input
                  type="text"
                  value={member}
                  onChange={(e) => handleMemberChange(index, e.target.value)}
                  placeholder={`Thành viên ${index + 1}`}
                />
                <FaTrash
                  className="remove-member-btn"
                  onClick={() => handleRemoveMember(index)}
                />
              </div>
            ))}
          </div>

          {/* Add New Member */}
          <button className="add-member-btn" onClick={handleAddMember}>
            <FaPlus /> Thêm thành viên
          </button>
        </div>

        <button className="save-button" onClick={handleSave}>
          Lưu
        </button>
        <button className="cancel-button" onClick={closePopup}>
          Hủy
        </button>
      </div>
    </div>
  );
};

export default EditTeamPopup;
