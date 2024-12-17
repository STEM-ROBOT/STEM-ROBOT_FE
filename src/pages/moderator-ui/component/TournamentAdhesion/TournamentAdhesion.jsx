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


  return (
    <div className="tournament-adhesion">
      {/* <LoadingComponent /> */}
      <div className="tournament-adhesion-header">
        <h2 className="tournament-adhesion-title">Giải đấu đã tham gia</h2>
      </div>
      <div>
     { data?.tournamentRep.length > 0 &&  <ListTournamentComponent data={data?.tournamentRep}/>}    
      </div>
   


    </div>
  );
};

export default TournamentAdhesion;
