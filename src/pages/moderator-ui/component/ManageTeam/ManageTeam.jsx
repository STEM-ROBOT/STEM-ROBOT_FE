import React, { useState } from 'react';
import { FaDownload, FaEdit, FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Import arrow icons
import './ManageTeam.css';
import EditTeamPopup from '../EditTeamPopup/EditTeamPopup';

const teamsData = [
  {
    id: 1,
    name: "Đội #1",
    logo: "https://t3.ftcdn.net/jpg/07/68/91/92/360_F_768919266_4OfllVFjsr99DPeFCATa0jrTOjKnUshK.jpg",
    contactPhone: "0123456789",
    contactPerson: "Nguyễn Văn A",
    members: ["Nguyễn Văn A", "Trần Thị B", "Phạm Văn C"],
  },
  {
    id: 2,
    name: "Đội #2",
    logo: "https://t3.ftcdn.net/jpg/07/68/91/92/360_F_768919266_4OfllVFjsr99DPeFCATa0jrTOjKnUshK.jpg",
    contactPhone: "0987654321",
    contactPerson: "Lê Văn D",
    members: ["Lê Văn D", "Võ Thị E"],
  },
];

const ManageTeam = () => {
  const [teams] = useState(teamsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [teamsPerPage] = useState(3);
  const [isEditing, setIsEditing] = useState(false);
  const [editTeam, setEditTeam] = useState(null);

  // Pagination logic
  const indexOfLastTeam = currentPage * teamsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
  const currentTeams = teams.slice(indexOfFirstTeam, indexOfLastTeam);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Open the edit popup
  const handleEditClick = (team) => {
    setEditTeam(team);
    setIsEditing(true);
  };

  // Close the popup
  const closePopup = () => {
    setIsEditing(false);
    setEditTeam(null);
  };

  return (
    <div className="team-list-container">
      <div className="team-list-header">
        <span>Có {teams.length} đội và {teams.reduce((acc, team) => acc + team.members.length, 0)} người chơi tham gia giải</span>
        <button className="download-button">
          <FaDownload /> Danh sách
        </button>
      </div>
      <div className="team-list-grid">
        {currentTeams.map((team) => (
          <div key={team.id} className="team-card">
            <div className="team-card-header">
              <img src={team.logo} alt={team.name} className="team-logo" />
              <FaEdit className="edit-icon" onClick={() => handleEditClick(team)} />
            </div>
            <div className="team-name">{team.name}</div>
            <div className="team-members">
              <p>Thành viên</p>
              <div className="members-list">
                {team.members.length > 0 ? (
                  team.members.map((member, index) => (
                    <div key={index} className="member-name">{member}</div>
                  ))
                ) : (
                  <span>Chưa có thành viên</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination controls with arrow icons */}
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-arrow"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(teams.length / teamsPerPage)}
          className="pagination-arrow"
        >
          <FaArrowRight />
        </button>
      </div>

      {isEditing && (
        <EditTeamPopup team={editTeam} closePopup={closePopup} />
      )}
    </div>
  );
};

export default ManageTeam;
