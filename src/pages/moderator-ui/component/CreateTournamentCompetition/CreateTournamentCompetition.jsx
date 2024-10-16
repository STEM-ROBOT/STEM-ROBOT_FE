import React, { useState } from "react";
import "./CreateTournamentCompetition.css";
import { TbLayoutGridAdd } from "react-icons/tb";
import { IoSearch } from "react-icons/io5";
import CompetitionPopup from "../CompetitionPopup/CompetitionPopup";

const competitionList = [];
const CreateTournamentCompetition = () => {
  const [showCompetition, setShowCompetition] = useState(false);
  const [competition, setCompetition] = useState(competitionList);
  const maxSelectedCompetition = 3;
  const viewCompetition = () => {
    setShowCompetition(true);
  };
  return (
    <div className="container_create_competition_tournament">
      <div className="competition_create">
        <div className="competition_list">
          <div className="label_avatar">Nội dung thi đấu</div>
          <div className="competition_select">
            {competition.map((competition, i) => {
              <div className="competition_option_choice">
                <img className="avatar_view" src="" alt="" />
                <label className="name_competition">Tên giải đấu</label>
              </div>;
            })}
            {competition.length <= maxSelectedCompetition && (
              <div
                className="competition_null"
                onClick={() => viewCompetition()}
              >
                <TbLayoutGridAdd className="competition_null_icon" />
              </div>
            )}
          </div>
        </div>
      </div>
      {showCompetition === true && (
        <CompetitionPopup setShowCompetition={setShowCompetition} />
      )}
    </div>
  );
};

export default CreateTournamentCompetition;
