import React, { useEffect } from 'react'
import { IoLogoGameControllerB } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getCompetitionbyTournament } from '../../../../redux/actions/CompetitionAction';

const ListCompetitionAdmin = () => {
  const navigate = useNavigate();
  const { tournamentId } = useParams();

  const competitionData = useSelector((state) => state.getCompetition.listCompetition);
  const competitions = Array.isArray(competitionData?.data?.data) ? competitionData.data.data : [];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompetitionbyTournament(tournamentId));
  }, [dispatch, tournamentId]);

  const handleCompetitionClick = (competitionId) => {
    navigate(`/admin/tournament/${tournamentId}/competition/${competitionId}/create-format`);
  };

  const activeStatuses = (competition) => {
    const now = new Date();
    const endDate = new Date(competition.endDate);

    if (!competition.isActive) return "competition_status_competition";
    if (competition.isActive && now <= endDate && competition.mode === "public") return "competition_status_competition rg";
    if (competition.isActive && (competition.mode === "Private" || now > endDate)) return "competition_status_competition done";
  };

  const tagStatuses = (competition) => {
    const now = new Date();
    const endDate = new Date(competition.endDate);

    if (!competition.isActive) return "Chưa kích hoạt";
    if (competition.isActive && now <= endDate && competition.mode === "Public") return "Đang đăng ký";
    return "Đang diễn ra";
  };
  return (
  
    <div
      className="manage_competition_grid"
      style={{ gridTemplateColumns: `repeat(${Math.min(competitions.length, 5)}, 1fr)` }}
    >
      {competitions.map((competition) => (
        <div
          key={competition.id}
          className="manage_competition_item"
          onClick={() => handleCompetitionClick(competition.id)}
        >
          <div className={activeStatuses(competition)}>{tagStatuses(competition)}</div>
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
  )
}

export default ListCompetitionAdmin