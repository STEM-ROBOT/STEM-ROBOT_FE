import React, { useEffect, useState } from 'react';
import { FaDownload, FaEdit, FaArrowLeft, FaArrowRight, FaFileExport, FaFileUpload } from 'react-icons/fa';
import * as XLSX from 'xlsx'; // Import thư viện để xuất/nhập Excel
import './ManageTeam.css';
import EditTeamPopup from '../EditTeamPopup/EditTeamPopup';
import { useDispatch, useSelector } from 'react-redux';
import { getListTeam } from '../../../../redux/actions/TeamAction';
import { useParams } from 'react-router-dom';

const ManageTeam = () => {
  const { competitionId } = useParams();
  const dispatch = useDispatch();
  const getteams = useSelector((state) => state.getTeams);

  // Ensure teams is always an array
  const teams = Array.isArray(getteams?.listTeam?.data?.success?.data) ? getteams.listTeam.data.success.data : [];

  useEffect(() => {
    dispatch(getListTeam(competitionId));
  }, [dispatch, competitionId]);

  const [currentPage, setCurrentPage] = useState(1);
  const [teamsPerPage] = useState(6);
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

  // Function to export teams data to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      teams.map((team) => ({
        "#": team.id,
        'Tên đội': team.name,
        'SĐT Liên hệ': team.phoneNumber,
        'Người liên hệ': team.contactInfo,
        'Thành viên': (team.member || []).map(m => `${m.contestantName} (ID: ${m.contestantId})`).join(', '),
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Danh sách đội');
    XLSX.writeFile(wb, 'DanhSachDoi.xlsx');
  };

  // Function to handle file upload and merging data
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });

      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      const importedData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

      const formattedImportedData = importedData.map((row) => ({
        id: row['#'],
        name: row['Tên đội'],
        phoneNumber: row['SĐT Liên hệ'],
        contactInfo: row['Người liên hệ'],
        members: row['Thành viên'] 
          ? row['Thành viên'].split(', ').map((member, index) => ({
              contestantId: index + 1,
              contestantName: member,
            })) 
          : [],
        logo: 'https://t3.ftcdn.net/jpg/07/68/91/92/360_F_768919266_4OfllVFjsr99DPeFCATa0jrTOjKnUshK.jpg', // Default logo
      }));

      const updatedTeams = [...teams];
      formattedImportedData.forEach((importedTeam) => {
        const existingIndex = updatedTeams.findIndex((team) => team.id === importedTeam.id);
        if (existingIndex !== -1) {
          updatedTeams[existingIndex] = importedTeam;
        } else {
          updatedTeams.push(importedTeam);
        }
      });

      setTeams(updatedTeams); // Update state with imported data
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="team-list-container">
      <div className="team-list-header">
        <span>
          Có {teams.length} đội và {teams.reduce((acc, team) => acc + (team.member?.length || 0), 0)} người chơi tham gia giải
        </span>
        <div className="header-buttons">
          <button className="import-button-team" onClick={() => document.getElementById('hidden-file-input').click()}>
            <FaFileUpload /> Nhập tệp tin
          </button>
          <input
            type="file"
            id="hidden-file-input"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
          <button className="export-button-team" onClick={exportToExcel}>
            <FaFileExport /> Xuất ra file Excel
          </button>
        </div>
      </div>
      <div className="team-list-grid">
        {currentTeams.map((team) => (
          <div key={team.id} className="team-card">
            <div className="team-card-header">
              <img src={team.image} alt={team.name} className="team-logo" />
              <FaEdit className="edit-icon" onClick={() => handleEditClick(team)} />
            </div>
            <div className="team-name">{team.name}</div>
            <div className="team-members">
              <p>Thành viên</p>
              <div className="members-list">
                {(team.member || []).length > 0 ? (
                  (team.member || [])
                    .slice(0, team.contestantInTeam || team.member.length)
                    .map((m) => (
                      <div key={m.contestantId} className="member-name">
                        {m.contestantName}
                      </div>
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
