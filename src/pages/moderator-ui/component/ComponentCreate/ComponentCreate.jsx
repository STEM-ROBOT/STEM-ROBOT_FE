import React from "react";
import "./ComponentCreate.css";
import CreateTournamentInfo from "../CreateTournamentInfo/CreateTournamentInfo";
import CreateTournamentCompetition from "../CreateTournamentCompetition/CreateTournamentCompetition";
import CreateTournamentFormat from "../CreateTournamentFormat/CreateTournamentFormat";

const ComponentCreate = () => {
  return (
    <div className="create_tournament_page">
      <div className="create_container">
        <div className="create_info_container">
          <CreateTournamentInfo />
          <CreateTournamentCompetition />
          <CreateTournamentFormat />
        </div>
      </div>
    </div>
  );
};

export default ComponentCreate;
