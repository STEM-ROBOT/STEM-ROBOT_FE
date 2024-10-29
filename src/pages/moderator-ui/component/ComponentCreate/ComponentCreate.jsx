import React, { useState } from "react";
import "./ComponentCreate.css";
import CreateTournamentInfo from "../CreateTournamentInfo/CreateTournamentInfo";
import CreateTournamentCompetition from "../CreateTournamentCompetition/CreateTournamentCompetition";
import CreateTournamentFormat from "../CreateTournamentFormat/CreateTournamentFormat";
import logo from "/src/assets/images/logo.png";
const ComponentCreate = ({}) => {
  //info Tournament
  const [avatarInput, setAvatarInput] = useState(logo);
  const [nameTournament, setNameTournament] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [mode, setMode] = useState("Private");
  const [nameError, setNameError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  //Competition
  const [competitionList, setCompetitionList] = useState([]);
  const [competitionError, setCompetitionError] = useState("");

  //format Tournament
  const handleSubmit = () => {
    if (!nameTournament) setNameError("Tên giải đấu không được để trống.");
    if (!address) setLocationError("Địa điểm không được để trống.");
    if (!phone) setPhoneError("Số điện thoại không được để trống.");
    if (competitionList.length < 1)
      setCompetitionError("Hãy chọn nội dung thi đấu cho giải");
  };
  return (
    <div className="create_tournament_page">
      <div className="create_container">
        <div className="create_info_container">
          <CreateTournamentInfo
            avatarInput={avatarInput}
            setAvatarInput={setAvatarInput}
            nameTournament={nameTournament}
            setNameTournament={setNameTournament}
            phone={phone}
            setPhone={setPhone}
            address={address}
            setAddress={setAddress}
            mode={mode}
            setMode={setMode}
            nameError={nameError}
            setNameError={setNameError}
            locationError={locationError}
            setLocationError={setLocationError}
            phoneError={phoneError}
            setPhoneError={setPhoneError}
          />
          <CreateTournamentCompetition
            competitionList={competitionList}
            setCompetitionList={setCompetitionList}
            competitionError={competitionError}
            setCompetitionError={setCompetitionError}
          />
          <div className="format_create">
            <div className="apply_create_tournament">
              <div
                className="btn_create_tournament"
                onClick={() => handleSubmit()}
              >
                Hoàn Tất
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentCreate;
