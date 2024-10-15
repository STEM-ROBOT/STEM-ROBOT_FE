import React from "react";
import "./ComponentCreate.css";
import CreateTournamentInfo from "../CreateTournamentInfo/CreateTournamentInfo";
import CreateTournamentCompetition from "../CreateTournamentCompetition/CreateTournamentCompetition";

const ComponentCreate = () => {
  return (
    <div className="create_tournament_page">
      <div className="create_container">
        <div className="create_info_container">
          <CreateTournamentInfo />
          <CreateTournamentCompetition />
        </div>
      </div>
    </div>
  );
};

export default ComponentCreate;
