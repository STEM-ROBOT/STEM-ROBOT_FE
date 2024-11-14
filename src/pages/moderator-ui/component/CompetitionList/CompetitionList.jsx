import React, { useEffect, useState } from "react";
import "./CompetitionList.css";
import { IoLogoGameControllerB } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import api from "/src/config";
import { competitions_tournament } from "../../api/ApiFlowView/ApiFlowView";

const CompetitionList = () => {
  const path = useParams();
  console.log(path);

  const navigate = useNavigate();
  const [competitions, setCompetitions] = useState([]);
  useEffect(() => {
    api
      .get(`${competitions_tournament + path.league_id}`)
      .then((competition) => {
        console.log(competition);
        setCompetitions(competition.data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const tagStatuses = (competition) => {
    const now = new Date(); // Lấy thời gian hiện tại
    const endDate = new Date(competition.endDate);
    if (competition.isActive === false) {
      return "Chưa kích hoạt";
    } else if (competition.isActive === true && now <= endDate) {
      return "Đang đăng ký";
    } else if (competition.isActive === true && now > endDate) {
      return "Đang diển ra";
    }
  };
  const activeStatuses = (competition) => {
    const now = new Date(); // Lấy thời gian hiện tại
    const endDate = new Date(competition.endDate);
    if (competition.isActive === false) {
      return "competition_status_competition";
    } else if (competition.isActive === true && now <= endDate) {
      return "competition_status_competition rg";
    } else if (competition.isActive === true && now > endDate) {
      return "competition_status_competition done";
    }
  };
  const GoCompetition = (competition) => {
    // if (competition.isActive === true) {
      localStorage.setItem("competitionName", competition.name),
        localStorage.setItem("competitionEndDate", competition.endDate),
        navigate(`${competition.id}`)}
  // };
  return (
    <div className="competition_container">
      <div className="introduction_header">
        <IoLogoGameControllerB className="icon_competition" />
        <span className="header_text">Nội dung thi đấu</span>
      </div>
      <div
        className={
          competitions.length >= 6 ? "competition_grid" : "competition_grid_1"
        }
      >
        {competitions.map((competition) => (
          <div
            key={competition.id}
            className="competition_item"
            onClick={() => GoCompetition(competition)}
          >
            <div className={activeStatuses(competition)}>
              {tagStatuses(competition)}
            </div>
            <img
              src={competition.image}
              alt={competition.name}
              className="competition_image"
            />

            <div className="competition_name">
              <div className="name">{competition.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompetitionList;
