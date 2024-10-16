import React from "react";
import "./TeamCompetition.css";

const teams = [
  {
    id: 1,
    name: "FC 90&AE",
    played: 2,
    won: 1,
    draw: 0,
    lost: 1,
    members: "Chưa có thành viên",
    logo: "https://5sfashion.vn/storage/upload/images/ckeditor/4KG2VgKFDJWqdtg4UMRqk5CnkJVoCpe5QMd20Pf7.jpg", // Replace with actual URL
  },
  {
    id: 2,
    name: "FC TC GROUP",
    played: 2,
    won: 1,
    draw: 0,
    lost: 1,
    members: "Chưa có thành viên",
    logo: "https://5sfashion.vn/storage/upload/images/ckeditor/4KG2VgKFDJWqdtg4UMRqk5CnkJVoCpe5QMd20Pf7.jpg", // Replace with actual URL
  },
  {
    id: 3,
    name: "FC THÔN ĐỒNG",
    played: 2,
    won: 0,
    draw: 0,
    lost: 2,
    members: "Chưa có thành viên",
    logo: "https://5sfashion.vn/storage/upload/images/ckeditor/4KG2VgKFDJWqdtg4UMRqk5CnkJVoCpe5QMd20Pf7.jpg", // Replace with actual URL
  },
  {
    id: 4,
    name: "PHỦI VAR 88C1",
    played: 2,
    won: 2,
    draw: 0,
    lost: 0,
    members: "Chưa có thành viên",
    logo: "https://5sfashion.vn/storage/upload/images/ckeditor/4KG2VgKFDJWqdtg4UMRqk5CnkJVoCpe5QMd20Pf7.jpg", // Replace with actual URL
  },
  {
    id: 5,
    name: "PHỦI VAR 88C1",
    played: 2,
    won: 2,
    draw: 0,
    lost: 0,
    members: "Chưa có thành viên",
    logo: "https://5sfashion.vn/storage/upload/images/ckeditor/4KG2VgKFDJWqdtg4UMRqk5CnkJVoCpe5QMd20Pf7.jpg", // Replace with actual URL
  },
];

const TeamCompetition = () => {
  return (
    <div className="team-list-container">
      {teams.map((team) => (
        <div key={team.id} className="team-card">
          <div className="team-logo">
            <img src={team.logo} alt={`${team.name} logo`} />
          </div>
          <h3 className="team-name">{team.name}</h3>
          <p className="team-played">{team.played} Trận đã chơi</p>
          <div className="team-stats">
            <span className="won">{team.won} thắng</span>
            <span className="draw">{team.draw} hòa</span>
            <span className="lost">{team.lost} thua</span>
          </div>
          <div className="team-link">
            <button className="link-button">{team.status}</button>
          </div>
          <div className="hover-line"></div>
          <div className="hover-overlay"></div>
        </div>
      ))}
    </div>
  );
};

export default TeamCompetition;
