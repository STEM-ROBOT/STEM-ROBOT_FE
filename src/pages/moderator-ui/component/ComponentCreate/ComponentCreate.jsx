import React, { useState , useEffect} from "react";
import "./ComponentCreate.css";
import CreateTournamentInfo from "../CreateTournamentInfo/CreateTournamentInfo";
import CreateTournamentCompetition from "../CreateTournamentCompetition/CreateTournamentCompetition";
import logo from "/src/assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { createTournament } from "../../../../redux/actions/TournamentAction";
import {  InforAccountID } from '../../../../redux/actions/AccountAction';
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { FirebaseUpload } from "/src/config/firebase";
import ReactQuill from "react-quill";
import QuillToolbar, { formats, modules } from "../EditorToolbar/EditorToolbar";
import LoadingComponent from "../../../system-ui/component/Loading/LoadingComponent";
import { toast } from "react-toastify";

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
  // Competition List
  const [competitionList, setCompetitionList] = useState([]);
  const [competitionError, setCompetitionError] = useState("");
  const loadingAdd = useSelector((state)=>state.createTournamnet.loading)
  const [introduce, setIntroduce] = useState("");
  const InforAccountIDs = useSelector((state) => state.getAccountID);
  const [tournamentPackage, setTournamentPackage] = useState({
    maxTournatment: 0,
    maxTeam: 0,
    maxMatch: 0,
  });
  useEffect(() => {
    dispatch(InforAccountID());
  }, [dispatch]);

  // Đồng bộ thông tin tài khoản vào state
  useEffect(() => {
    if (InforAccountIDs.success) {
      setTournamentPackage({
        maxTournatment: InforAccountIDs.success.maxTournatment || 0,
        maxTeam: InforAccountIDs.success.maxTeam || 0,
        maxMatch: InforAccountIDs.success.maxMatch || 0,
      });
    }
  }, [InforAccountIDs.success]);
  console.log(tournamentPackage)
  // Validation and API Call
  const handleSubmit = async () => {
    let hasError = false;
    if(tournamentPackage.maxTournatment < 1){
      toast.error("Vui lòng mua thêm gói. Bạn đã sử dụng hết lượt tạo giải đấu !")
      return;
    }
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
      tournamentLevel: "trường",
      name: nameTournament,
      location: address,
      image: image,
      status: mode,
      introduce: introduce,
      phone: phone,
      competition: formattedCompetitions,
    };

    // await dispatch(createTournament(tournamentData, navigate))
    //   .then(() => {
    //     console.log(tournamentData);
    //     navigate("/account/my-tournament");
    //   })
    //   .catch((error) => {
    //     console.error("Lỗi khi tạo giải đấu:", error);
    //   });
  };

  return (
    <div className="create_tournament_page">
      {loadingAdd && (<LoadingComponent position="fixed" borderRadius="8px" backgroundColor="rgba(0, 0, 0, 0.5)" />)}
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
                <QuillToolbar />
                <ReactQuill
                  theme="snow"
                  value={introduce}
                  onChange={(value) => setIntroduce(value)}
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
