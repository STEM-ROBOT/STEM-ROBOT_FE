import React, { useState } from 'react'
import CreateTournamentInfo from '../../../moderator-ui/component/CreateTournamentInfo/CreateTournamentInfo'
import CreateTournamentCompetition from '../../../moderator-ui/component/CreateTournamentCompetition/CreateTournamentCompetition'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createTournament } from '../../../../redux/actions/TournamentAction';
import './CreateTournamentAdmin.css'

const CreateTournamentAdmin = () => {
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

  // Competition List
  const [competitionList, setCompetitionList] = useState([]);
  const [competitionError, setCompetitionError] = useState("");

  // Validation and API Call
  const handleSubmit = () => {
    let hasError = false;

    // Validate fields
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
      mode: ""// Assuming each competition has an `id` field for genreId
    }));

    // Tournament data to be sent
    const tournamentData = {
      tournamentLevel: "Cấp trường",
      name: nameTournament,
      location: address,
      image: avatarInput,
      status: mode, // Set status as needed
      phone: phone,
      competition: formattedCompetitions,
    };

    // Dispatch action to create tournament/admin/tournaments-admin
    dispatch(createTournament(tournamentData, navigate))
    .then(() => {
      navigate('/admin/tournaments-admin'); 
    })
    .catch((error) => {
      console.error("Lỗi khi tạo giải đấu:", error); 
    });;
  };
  return (
    <div className='admin_create_tournament_container'>
      <div className="label_create" style={{ display: "flex", justifyContent: "space-between" }}>
        Tạo Giải
        <div
          className="btn_create_tournament"
          onClick={() => handleSubmit()}
        >
          Hoàn Tất
        </div>
      </div>
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
    </div>
  )
}

export default CreateTournamentAdmin