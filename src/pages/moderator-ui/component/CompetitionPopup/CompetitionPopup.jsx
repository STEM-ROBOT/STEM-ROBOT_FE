import React, { useEffect, useState } from "react";
import { IoClose, IoSearch } from "react-icons/io5";
import "./CompetitionPopup.css";
import { TbLayoutGridAdd } from "react-icons/tb";
import api from "../../../../config";
import { moderator_create_tournament_competition } from "../../api/ApiFlowCreate/ApiFlowCreate";

const CompetitionPopup = ({
  setShowCompetition,
  competitionList,
  setCompetitionList,
  setCompetitionError,
}) => {
  const [selectedCompetitions, setSelectedCompetitions] =
    useState(competitionList);
  const [games, setGame] = useState();
  useEffect(() => {
    api.get(moderator_create_tournament_competition).then((response) => {
      console.log(response.data);

      setGame(response.data);
    });
  }, []);
  const CloseCompetitionPopup = () => {
    setShowCompetition(false);
  };

  const toggleSelection = (game) => {
    const isAlreadySelected = selectedCompetitions.some(
      (selected) => selected.id === game.id
    );
    if (isAlreadySelected) {
      setSelectedCompetitions(
        selectedCompetitions.filter((selected) => selected.id !== game.id)
      );
    } else {
      setSelectedCompetitions([...selectedCompetitions, game]);
      setCompetitionError("");
    }
  };
  const isGameSelected = (gameId) => {
    return selectedCompetitions.some((selected) => selected.id === gameId);
  };
  const ConfirmCompetition = () => {
    setCompetitionList(selectedCompetitions);

    setShowCompetition(false);
  };
  return (
    <div className="popup-modal">
      <div className="competition_list_view">
        <div className="competition_layout_close">
          <div className="login_view_close" onClick={CloseCompetitionPopup}>
            <IoClose className="close_click" />
          </div>
        </div>

        <div className="competition_layout">
          <div className="search_competition_container">
            <input
              type="text"
              placeholder="Tên Nội Dung"
              className="search_competition_input"
            />
            <div className="btn_search_competition">
              <IoSearch className="icon_search" />
            </div>
          </div>
        </div>
        <div className="competition_layout">
          <div className="competition_select_option">
            {games?.map((game) => (
              <div
                key={game.id}
                className="competition_choice"
                onClick={() => toggleSelection(game)}
              >
                <img
                  className={
                    isGameSelected(game.id)
                      ? `img_competition active`
                      : `img_competition `
                  }
                  src={game.image}
                  alt={game.name}
                />
                <div className="competition_name_option">{game.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="competition_layout">
          <div className="btn_cf_competition" onClick={ConfirmCompetition}>
            Đồng ý
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitionPopup;
