import React, { useState } from "react";
import "./ComponentCreate.css";
import CreateTournamentInfo from "../CreateTournamentInfo/CreateTournamentInfo";
import CreateTournamentCompetition from "../CreateTournamentCompetition/CreateTournamentCompetition";
import logo from "/src/assets/images/logo.png";
import { useDispatch } from "react-redux";
import { createTournament } from "../../../../redux/actions/TournamentAction";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { FirebaseUpload } from "/src/config/firebase";
import ReactQuill from "react-quill";
import QuillToolbar, { formats, modules } from "../EditorToolbar/EditorToolbar";

const ComponentCreate = () => {
  // Tournament Info
  const [avatarInputView, setAvatarInputView] = useState(logo);
  const [avatarInput, setAvatarInput] = useState();
  const [nameTournament, setNameTournament] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [mode, setMode] = useState("Private");
  const [nameError, setNameError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  // Competition List
  const [competitionList, setCompetitionList] = useState([]);
  const [competitionError, setCompetitionError] = useState("");
  const handleChange = (value) => {
    setValue(value);
  };
  // Validation and API Call
  const handleSubmit = async () => {
    let hasError = false;

    if (!nameTournament) {
      setNameError("Tên giải đấu không được để trống.");
      hasError = true;
    }
    if (!address) {
      setLocationError("Địa điểm không được để trống.");
      hasError = true;
    }
    if (!phone) {
      setPhoneError("Số điện thoại không được để trống.");
      hasError = true;
    }
    if (competitionList.length < 1) {
      setCompetitionError("Hãy chọn nội dung thi đấu cho giải");
      hasError = true;
    }

    // Stop if validation fails
    if (hasError) return;

    // Format competition list to match API structure
    const formattedCompetitions = competitionList.map((competition) => ({
      genreId: competition.id,
      mode: "", // Assuming each competition has an `id` field for genreId
    }));
    const image = await FirebaseUpload(avatarInput);

    const tournamentData = {
      tournamentLevel: "Cấp trường",
      name: nameTournament,
      location: address,
      image: image,
      status: mode,
      phone: phone,
      competition: formattedCompetitions,
    };

    await dispatch(createTournament(tournamentData, navigate))
      .then(() => {
        console.log(tournamentData);
        navigate("/account/mytournament");
      })
      .catch((error) => {
        console.error("Lỗi khi tạo giải đấu:", error);
      });
  };

  return (
    <div className="create_tournament_page">
      <div className="create_container">
        <div className="create_info_container">
          <div className="label_create"> Tạo Giải</div>

          <CreateTournamentInfo
            avatarInput={avatarInput}
            setAvatarInput={setAvatarInput}
            setAvatarInputView={setAvatarInputView}
            avatarInputView={avatarInputView}
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
          <div className="container_create_competition_tournament">
            <div className="competition_create">
              <div className="label_avatar">Giới thiệu giải </div>
              <div className="text-editor">
                <QuillToolbar/>
                <ReactQuill
                  theme="snow"
                  value={value}
                  onChange={handleChange}
                  placeholder={"Write something awesome..."}
                  modules={modules}
                  formats={formats}
                  style={{ height: "300px" }}
                />
              </div>
            </div>
          </div>
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
