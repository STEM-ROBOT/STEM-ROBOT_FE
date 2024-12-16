import React, { useEffect, useState } from "react";
import "./TeamCompetitionAdhesion.css";
import { IoClose } from "react-icons/io5";
import api from "../../../../../config";
import { useNavigate, useParams } from "react-router-dom";

const TeamCompetitionAdhesion = () => {
  const navigate = useNavigate();
  const { competitionId } = useParams();
  const { tournamentAdhesionId } = useParams();
  const [teams, setTeams] = useState([]);
  const [showMember, setShowMember] = useState(false);
  const [memberView, setMemberView] = useState([]);
  const ViewMember = (team) => {
    if (team.length > 0) {
      setMemberView(team);
      setShowMember(true);
    }
  };
  const CloseMemberPopup = () => {
    setShowMember(false);
  };
  useEffect(() => {
    api
      .get(`/api/competitions/team-competition-adhesion/${competitionId}`)
      .then((response) => {
        console.log(response.data);

        setTeams(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const ViewDetail = (id) => {
    navigate(
      `/tournament-adhesion/${tournamentAdhesionId}/team-competition-adhesion/${id}/`
    );
  };
  return (
    <div className="team-list-container-outer" style={{ minHeight: "80vh" ,backgroundColor:"#fff"}}>
      {teams?.map((team) => (
        <div
          key={team.id}
          className="team-card-view"
          onClick={() => ViewDetail(team.id)}
          style={{ maxHeight: "270px" }}
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
              <img key={i} className="member_view" src={member.avatar} alt="" />
            ))}
          </div>
        </div>
      ))}
      {showMember == true > 0 && (
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

export default TeamCompetitionAdhesion;
