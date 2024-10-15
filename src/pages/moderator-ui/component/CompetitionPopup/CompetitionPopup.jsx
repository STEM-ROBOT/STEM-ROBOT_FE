import React from "react";
import { IoClose, IoSearch } from "react-icons/io5";
import "./CompetitionPopup.css";
import { TbLayoutGridAdd } from "react-icons/tb";
const games = [
  {
    id: 1,
    name: "AOE",
    image:
      "https://image-cdn.essentiallysports.com/wp-content/uploads/imago0241552301h.jpg?width=600",
  },
  {
    id: 2,
    name: "BattleBots",
    image:
      "https://image-cdn.essentiallysports.com/wp-content/uploads/imago0241552301h.jpg?width=600",
  },
  {
    id: 3,
    name: "Bi đá trên băng",
    image:
      "https://image-cdn.essentiallysports.com/wp-content/uploads/imago0241552301h.jpg?width=600",
  },
  {
    id: 4,
    name: "Bida",
    image:
      "https://image-cdn.essentiallysports.com/wp-content/uploads/imago0241552301h.jpg?width=600",
  },
  {
    id: 5,
    name: "Bowling",
    image:
      "https://image-cdn.essentiallysports.com/wp-content/uploads/imago0241552301h.jpg?width=600",
  },
];
const CompetitionPopup = ({ setShowCompetition }) => {
  const CloseCompetitionPopup = () => {
    setShowCompetition(false);
  };
  const ConfirmCompetition = () => {
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
              placeholder="Tên giải đấu"
              className="search_competition_input"
            />
            <div className="btn_search_competition">
              <IoSearch className="icon_search" />
            </div>
          </div>
        </div>
        <div className="competition_layout">
          <div className="competition_select_option">
            {games.map((game) => (
              <div key={game.id} className="competition_choice">
                <img
                  className={
                    game.id == 1 ? `img_competition active` : `img_competition `
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
