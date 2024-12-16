import React, { useEffect } from "react";
import "./ManageCompetition.css";
import { IoLogoGameControllerB } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCompetitionbyTournament } from "../../../../redux/actions/CompetitionAction";

const ManageCompetition = () => {
  const navigate = useNavigate();
  const { tournamentId } = useParams();

  const competitionData = useSelector((state) => state.getCompetition.listCompetition);
  const competitions = Array.isArray(competitionData?.data?.data) ? competitionData.data.data : [];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompetitionbyTournament(tournamentId));
  }, [dispatch, tournamentId]);

  const handleCompetitionClick = (competitionId) => {
    navigate(`/my-tournament/${tournamentId}/mycompetition/${competitionId}/settings/format`);
  };

  const activeStatuses = (competition) => {
    const now = new Date(); // Lấy thời gian hiện tại
    const endDate = new Date(competition.registerTime);
    const startDate = new Date(competition.startTime);
    if (competition.isActive === false) {
      return "competition_status_competition";
    } else if (competition.isActive === true && now <= endDate) {
      return "competition_status_competition rg";
    } else if (
      competition.isActive === true &&
      now >= startDate &&
      now <= endDate
    ) {
      return "competition_status_competition done";
    } else if (competition.isActive === true && now > endDate) {
      return "competition_status_competition done";
    }
  };

  const tagStatuses = (competition) => {
    const now = new Date(); // Lấy thời gian hiện tại
    const endDate = new Date(competition.endTime);
    const startDate = new Date(competition.startTime);
    const registerTimeDate = new Date(competition.registerTime);
    if (competition.isActive === false) {
      return "Chưa kích hoạt";
    } else if (
      competition.isActive === true &&
      now <= registerTimeDate &&
      competition.mode.toString().toLowerCase() === "public"
    ) {
      return "Đang đăng ký";
    } else if (
      competition.isActive === true &&
      now >= startDate &&
      now <= endDate
    ) {
      return "Đang diễn ra";
    } else if (competition.isActive === true && now < startDate) {
      return "Đã kích hoạt";
    }
    return "Đang diễn ra";
  };

  return (
    <div className="manage_competition_container">
      <div className="manage_competition_header">
        <IoLogoGameControllerB className="manage_competition_icon" />
        <span className="manage_competition_title">Nội dung thi đấu</span>
      </div>
      <div
       className={
        competitions.length >= 6 ? "competition_grid" : "competition_grid_1"
      }
      >
        {competitions.map((competition) => (
          <div
            key={competition.id}
            className="manage_competition_item"
            onClick={() => handleCompetitionClick(competition.id)}
          >
            <div className={activeStatuses(competition)}>
              {tagStatuses(competition)}
            </div>
            <img
              src={competition.image || "https://via.placeholder.com/230x200"}
              alt={competition.name}
              className="manage_competition_image"
              onError={(e) => { e.target.src = "https://via.placeholder.com/230x200"; }}
            />
            <div className="manage_competition_name">
              <div className="manage_competition_name_text">{competition.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCompetition;
