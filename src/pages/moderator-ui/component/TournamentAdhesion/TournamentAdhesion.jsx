import React, { useEffect, useState } from "react";
import "./TournamentAdhesion.css";
import api from "../../../../config";
import LoadingComponent from "../../../system-ui/component/Loading/LoadingComponent";
import { useNavigate } from "react-router-dom";

const TournamentAdhesion = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    if (Loading) {
      api
        .get(`api/tournaments/tournament-adhesion?page=1&pageSize=10`)
        .then((response) => {
          console.log(response.data.data);
          setData(response.data.data.tournamentRep);
          setLoading(false);
        })
        .catch((error) => {
          alert("error", error);
        });
    }
  }, [Loading]);

  const tournamentAdhesionDetail = (id) => {
    navigate("/tournament-adhesion/" + id);
  };
  return (
    <div className="tournament-adhesion">
      {/* <LoadingComponent /> */}
      <div className="tournament-adhesion-header">
        <h2 className="tournament-adhesion-title">Giải đấu đã tham gia</h2>
        <button className="create-competition">Tạo Giải Đấu</button>
      </div>

      {data?.map((item) => (
        <div
          key={item.id}
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
      <div className="competition-pagination">
        {/* <button className="pagination-item pagination-disabled">◄</button>
                {[1, 2, 3, 4, 5].map((page) => (
                    <button
                        key={page}
                        className={`pagination-item ${page === 1 ? "active" : ""}`}
                    >
                        {page}
                    </button>
                ))}
                <button className="pagination-item">►</button> */}
      </div>
    </div>
  );
};

export default TournamentAdhesion;
