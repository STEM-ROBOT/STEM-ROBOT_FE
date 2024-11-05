import React, { useEffect, useState } from "react";
import "./TeamCompetition.css";
import { IoClose } from "react-icons/io5";
import api from "../../../../config";
import { useParams } from "react-router-dom";
import { team_competitions } from "../../api/ApiFlowView/ApiFlowView";

const TeamCompetition = () => {
  const pram = useParams();
  console.log(pram);

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
      .get(`${team_competitions + pram.competitionId}`)
      .then((response) => {
        setTeams(response.data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
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

export default TeamCompetition;
