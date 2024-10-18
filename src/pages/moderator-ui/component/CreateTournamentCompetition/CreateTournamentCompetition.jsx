import React, { useEffect, useState } from "react";
import "./CreateTournamentCompetition.css";
import { TbLayoutGridAdd } from "react-icons/tb";
import { IoClose, IoSearch } from "react-icons/io5";
import CompetitionPopup from "../CompetitionPopup/CompetitionPopup";
import { AiFillDelete } from "react-icons/ai";

const CreateTournamentCompetition = ({
  competitionList,
  setCompetitionList,
  competitionError,
  setCompetitionError,
}) => {
  const [showCompetition, setShowCompetition] = useState(false);

  const maxSelectedCompetition = 4;
  const viewCompetition = () => {
    setShowCompetition(true);
  };
  const toggleSelection = (game) => {
    const isAlreadySelected = competitionList.some(
      (selected) => selected.id === game.id
    );
    if (isAlreadySelected) {
      setCompetitionList(
        competitionList.filter((selected) => selected.id !== game.id)
      );
    } else {
      setCompetitionList([...competitionList, game]);
    }
  };
  return (
    <div className="container_create_competition_tournament">
      <div className="competition_create">
        <div className="competition_list">
          <div className="label_avatar">Nội dung thi đấu</div>
          <div className="competition_select">
            {competitionList?.map((competition, i) => (
              <div key={i} className="competition_choice">
                <div
                  className="competition_delete"
                  onClick={() => toggleSelection(competition)}
                >
                  <AiFillDelete className="delete_icon_click" />
                </div>
                <img
                  className="img_competition"
                  src={competition.image}
                  alt=""
                />
                <div className="competition_name_option">
                  {competition.name}
                </div>
              </div>
            ))}
            {competitionList.length <= maxSelectedCompetition && (
              <div
                className="competition_null"
                onClick={() => viewCompetition()}
              >
                <TbLayoutGridAdd className="competition_null_icon" />
              </div>
            )}
          </div>
          {competitionError && (
            <div className="error_message">{competitionError}</div>
          )}
        </div>
      </div>
      {showCompetition === true && (
        <CompetitionPopup
          setShowCompetition={setShowCompetition}
          competitionList={competitionList}
          setCompetitionList={setCompetitionList}
          setCompetitionError={setCompetitionError}
        />
      )}
    </div>
  );
};

export default CreateTournamentCompetition;
