import React, { useEffect, useState } from "react";
import "./TournamentAdhesion.css";
import api from "../../../../config";
import LoadingComponent from "../../../system-ui/component/Loading/LoadingComponent";
import { useNavigate } from "react-router-dom";
import ListTournamentComponent from "./ListTournamentComponent";

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
          setData(response.data.data);
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
      </div>
    <ListTournamentComponent data={data?.tournamentRep}/>

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
