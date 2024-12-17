import React from "react";
import { useNavigate } from "react-router-dom";

const ListTournamentComponent = ({ data }) => {
    const navigate = useNavigate();
  const tournamentAdhesionDetail = (id) => {
    navigate("/tournament-adhesion/" + id);
  };
  return (
    <>
      {data?.map((item, index) => (
        <div
          key={index}
          className="competition-card adhesion"
          onClick={() => tournamentAdhesionDetail(item.id)}
        >
          <div className="competition-image">
            <img src={item.image} alt={item.name} />
          </div>
          <div className="competition-info">
            <h3>{item.name}</h3>
            <p>
              {item.location} || {item.createDate} ||
              {item.tournamentLevel}
            </p>
            <span
              className="status-competition-tag"
              // data-status={getStatus(item.startTime, item.endTime)}
            >
              {/* {getStatus(item.startTime, item.endTime)} */}
            </span>

            <div className="competition-progress">
              Đã tham gia
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${
                      (item.competitionActivateNumber /
                        item.competitionNumber) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
              <span>
                {item.competitionActivateNumber}/{item.competitionNumber} Nội
                dung
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ListTournamentComponent;
