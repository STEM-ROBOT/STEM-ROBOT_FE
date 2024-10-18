import React, { useState } from "react";
import "./TeamCompetition.css";
import { IoClose } from "react-icons/io5";

const teams = [
  {
    id: 1,
    name: "FC 90&AE",
    played: 2,
    won: 1,
    draw: 0,
    lost: 1,
    members: [
      {
        id: 1,
        name: "Nguyễn Văn A",
        avatar:
          "https://5sfashion.vn/storage/upload/images/ckeditor/4KG2VgKFDJWqdtg4UMRqk5CnkJVoCpe5QMd20Pf7.jpg",
      },
      {
        id: 2,
        name: "Trần Văn B",
        avatar:
          "https://5sfashion.vn/storage/upload/images/ckeditor/4KG2VgKFDJWqdtg4UMRqk5CnkJVoCpe5QMd20Pf7.jpg",
      },
    ],
    logo: "https://s-media-cache-ak0.pinimg.com/originals/f8/fb/a5/f8fba5b8f10c3a5d53f47fda00b098fe.jpg",
  },
  {
    id: 2,
    name: "FC TC GROUP",
    played: 2,
    won: 1,
    draw: 0,
    lost: 1,
    members: [
      {
        id: 3,
        name: "Lê Văn C",
        avatar:
          "https://5sfashion.vn/storage/upload/images/ckeditor/4KG2VgKFDJWqdtg4UMRqk5CnkJVoCpe5QMd20Pf7.jpg",
      },
      {
        id: 4,
        name: "Phạm Văn D",
        avatar:
          "https://5sfashion.vn/storage/upload/images/ckeditor/4KG2VgKFDJWqdtg4UMRqk5CnkJVoCpe5QMd20Pf7.jpg",
      },
    ],
    logo: "https://logodix.com/logo/50703.jpg",
  },
  {
    id: 3,
    name: "FC THÔN ĐỒNG",
    played: 2,
    won: 0,
    draw: 0,
    lost: 2,
    members: [
      {
        id: 5,
        name: "Hoàng Văn E",
        avatar:
          "https://5sfashion.vn/storage/upload/images/ckeditor/4KG2VgKFDJWqdtg4UMRqk5CnkJVoCpe5QMd20Pf7.jpg",
      },
    ],
    logo: "https://static.vecteezy.com/system/resources/previews/000/602/694/original/basketball-team-logo-vector.jpg",
  },
  {
    id: 4,
    name: "PHỦI VAR 88C1",
    played: 2,
    won: 2,
    draw: 0,
    lost: 0,
    members: [
      {
        id: 6,
        name: "Nguyễn Thị F",
        avatar:
          "https://5sfashion.vn/storage/upload/images/ckeditor/4KG2VgKFDJWqdtg4UMRqk5CnkJVoCpe5QMd20Pf7.jpg",
      },
      {
        id: 7,
        name: "Trần Thị G",
        avatar:
          "https://5sfashion.vn/storage/upload/images/ckeditor/4KG2VgKFDJWqdtg4UMRqk5CnkJVoCpe5QMd20Pf7.jpg",
      },
    ],
    logo: "https://s-media-cache-ak0.pinimg.com/originals/21/06/3c/21063c00ec70fa900e1b487bbf847ba0.jpg",
  },
  {
    id: 5,
    name: "PHỦI VAR 88C1",
    played: 2,
    won: 2,
    draw: 0,
    lost: 0,
    members: [
      {
        id: 8,
        name: "Lê Thị H",
        avatar:
          "https://5sfashion.vn/storage/upload/images/ckeditor/4KG2VgKFDJWqdtg4UMRqk5CnkJVoCpe5QMd20Pf7.jpg",
      },
    ],
    logo: "https://www.pixelstalk.net/wp-content/uploads/images3/NFL-Team-Logo-Wallpaper.jpg",
  },
];

const TeamCompetition = () => {
  const [showMember, setShowMember] = useState(false);
  const [memberView, setMemberView] = useState([]);
  const ViewMember = (team) => {
    setMemberView(team);
    setShowMember(true);
  };
  const CloseMemberPopup = () => {
    setShowMember(false);
  };
  return (
    <div className="team-list-container">
      {teams.map((team) => (
        <div
          key={team.id}
          className="team-card"
          onClick={() => ViewMember(team.members)}
        >
          <div className="team-logo-competition">
            <img
              className="team-avatar-competition"
              src={team.logo}
              alt={`${team.name} logo`}
            />
          </div>
          <h3 className="team-name">{team.name}</h3>
          <p className="team-played">{team.played} Trận đã chơi</p>
          <div className="team-stats">
            <span className="won">{team.won} thắng</span>
            <span className="draw">{team.draw} hòa</span>
            <span className="lost">{team.lost} thua</span>
          </div>
          <div className="hover-line"></div>
          <div className="hover-overlay"></div>
          <div className="team-member-label">Thành viên</div>
          <div className="team-link">
            {team.members.map((member, i) => (
              <img className="member_view" src={member.avatar} alt="" />
            ))}
          </div>
        </div>
      ))}
      {showMember == true && (
        <div className="popup-modal">
          <div className="team-member-detail">
            <div className="competition_layout_close">
              <div className="login_view_close" onClick={CloseMemberPopup}>
                <IoClose className="close_click" />
              </div>
            </div>
            <div className="member_list_show">
              {memberView?.map((member, i) => (
                <div key={i} className="member_view_item">
                  <img className="member_avatar" src={member.avatar} alt="" />
                  <div>{member.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamCompetition;
