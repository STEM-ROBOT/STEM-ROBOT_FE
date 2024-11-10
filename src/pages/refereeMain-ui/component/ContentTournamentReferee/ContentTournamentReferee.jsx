import React from "react";
import "./ContentTournamentReferee.css";
import { useNavigate } from "react-router-dom";

const ContentTournamentReferee = ({ schedules }) => {
  const navigate = useNavigate();
  const GoSchedule = (schedule) => {
    navigate(`${schedule.id}`);
    sessionStorage.setItem("competitionId", schedule.competitionId);
  };
  return (
    <div className="content_home_referee_container">
      <div className="content_home_referee_layout">
        <div className="content_referee_layout_view">
          {schedules?.map((schedule) => (
            <div
              key={schedule.id}
              className="competition_item_referee"
              onClick={() => GoSchedule(schedule)}
            >
              <div
                className={
                  schedule.role.toLowerCase() == "mrf"
                    ? "competition_status_competition done"
                    : "competition_status_competition rg"
                }
              >
                {schedule.role.toLowerCase() == "mrf"
                  ? "Trọng Tài Chính"
                  : "Trọng Tài Viên"}
              </div>
              <img
                src={schedule.imageGenre}
                alt={schedule.nameGenre}
                className="competition_image_referee"
              />

              <div className="competition_name">
                <div className="name" style={{ color: "#fff" }}>
                  {schedule.nameGenre}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentTournamentReferee;
