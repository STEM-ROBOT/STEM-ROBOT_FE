import React, { useEffect, useState } from "react";
import "./ViewCompetitions.css";
import { IoLogoGameControllerB } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../../../config";
import { competitions_tournament } from "../../../api/ApiFlowView/ApiFlowView";

const ViewCompetitions = () => {
  const { tournamentAdhesionId } = useParams();

  const navigate = useNavigate();
  const [competitions, setCompetitions] = useState([]);
  useEffect(() => {
    api
      .get(`/api/competitions/competition-adhesion/${tournamentAdhesionId}`)
      .then((competition) => {
        console.log(competition);
        setCompetitions(competition.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
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
  const GoCompetition = (competition) => {
    // if (competition.isActive === true) {
    navigate(`${competition.id}`);
    // }
  };
  return (
    <div className="competition_container">
      <div className="introduction_header">
        <IoLogoGameControllerB className="icon_competition" />
        <span className="header_text">Nội dung tham gia thi đấu</span>
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
            {/* <div className={activeStatuses(competition)}>
              {tagStatuses(competition)}
            </div> */}
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

export default ViewCompetitions;
