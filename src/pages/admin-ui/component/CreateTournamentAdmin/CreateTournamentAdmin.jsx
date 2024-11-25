import React, { useEffect, useRef, useState } from "react";
import CreateTournamentInfo from "../../../moderator-ui/component/CreateTournamentInfo/CreateTournamentInfo";
import CreateTournamentCompetition from "../../../moderator-ui/component/CreateTournamentCompetition/CreateTournamentCompetition";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTournament } from "../../../../redux/actions/TournamentAction";
import logo from "/src/assets/images/logo.png";
import "./CreateTournamentAdmin.css";
import api from "../../../../config";
import QuillToolbar, {
  formats,
  modules,
} from "../../../moderator-ui/component/EditorToolbar/EditorToolbar";
import ReactQuill from "react-quill";
import SelectAddress from "../../../system-ui/component/SelectAddress/SelectAddress";
import { FirebaseUpload } from "../../../../config/firebase";
import LoadingComponent from "../../../system-ui/component/Loading/LoadingComponent";

const CreateTournamentAdmin = () => {
  const [avatarInputView, setAvatarInputView] = useState(logo);
  const [avatarInput, setAvatarInput] = useState();
  const [nameTournament, setNameTournament] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [mode, setMode] = useState("Private");
  const [nameError, setNameError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [competitionError, setCompetitionError] = useState("");
  const [tournamentLevel, setTournamentLevel] = useState("");
  const [tournamentFocusLevel, setTournamentFocusLevel] = useState("");
  const loadingAdd = useSelector((state)=>state.createTournamnet.loading)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Competition List
  const [competitionList, setCompetitionList] = useState([]);

  const [provinceCode, setProvinceCode] = useState("");
  const [districtCode, setDistrictCode] = useState("");

  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  const [Area, setArea] = useState(null);
  const [AreaData, setAreaData] = useState([]);
  const [Province, setProvince] = useState(null);
  const [ProvinceData, setProvinceData] = useState([]);
  const [IdCity, setIdCity] = useState();
  const [IdArea, setIdArea] = useState();
  const [Provincetag, setProvincetag] = useState(1);
  const [introduce, setIntroduce] = useState("");

  // Validation and API Call

  useEffect(() => {
    setIsExpanded(mode.toLowerCase() === "public");
  }, [mode]);
  useEffect(() => {
    const ApiArea = () => {
      api
        .get("/api/areas/area")
        .then((response) => {
          console.log(response);
          const result = response.data.data;
          setAreaData(result);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (tournamentLevel === "khu vực" || tournamentLevel == "tỉnh") {
      setProvince();
      setIdArea();
      setIdCity();
      setAreaData([]);
      setProvinceData([]);
      ApiArea();
      console.log(IdCity, IdArea);
    }
  }, [tournamentLevel]);

  useEffect(() => {
    const apiProvince = () => {
      api
        .get(`/api/areas/province/areaId?areaId=${IdArea}`)
        .then((response) => {
          const result = response.data.data;
          setProvinceData(result);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (Provincetag == 2) {
      apiProvince();
      setProvincetag(1);
    }
  }, [Provincetag]);
  const handleArea = (data) => {
    const areaId = data.id;

    const AreaName = data.name;
    setIdArea(areaId);
    setArea(AreaName);
    setTournamentFocusLevel(null);
    setProvince(null);

    setProvinceData([]);

    setProvincetag(2);

    // setIdDistrict(100000);
    // setIdCity(1000000);
  };
  const handleSubmit = async () => {
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
    if (tournamentLevel === "khu vực" && mode.toLocaleLowerCase() == "public") {
      if (!IdArea) {
        setTournamentFocusLevel("Thông tin không được để trống !");
        hasError = true;
      }
    }
    if (tournamentLevel === "tỉnh" && mode.toLocaleLowerCase() == "public") {
      if (!IdCity) {
        setTournamentFocusLevel("Thông tin không được để trống !");
        hasError = true;
      }
    }
    // Stop if validation fails
    if (hasError) return;

    // Format competition list to match API structure
    const formattedCompetitions = competitionList.map((competition) => ({
      genreId: competition.id,
      mode: mode, // Assuming each competition has an `id` field for genreId
    }));
    const image = await FirebaseUpload(avatarInput);
    // Tournament data to be sent
    const tournamentData = {
      tournamentLevel: tournamentLevel,
      name: nameTournament,
      location: address,
      image: image,
      status: mode, // Set status as needed
      phone: phone,
      introduce: introduce,
      provinceCode: IdCity ? IdCity.toString() : null,
      areaCode: IdArea ? IdArea.toString() : null,
      competition: formattedCompetitions,
    };
    console.log(tournamentData);

    // Dispatch action to create tournament/admin/tournaments-admin
    await dispatch(createTournament(tournamentData, navigate))
      .then(() => {
        navigate("/admin/tournaments-admin");
      })
      .catch((error) => {
        console.error("Lỗi khi tạo giải đấu:", error);
      });
  };
  return (
    <div className="admin_create_tournament_container">
      {loadingAdd && (
                <LoadingComponent position="fixed" borderRadius="8px" backgroundColor="rgba(0, 0, 0, 0.5)" />
            )}
      <div
        className="label_create"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        Tạo Giải
        <div className="btn_create_tournament" onClick={() => handleSubmit()}>
          Hoàn Tất
        </div>
      </div>
      <div style={{ maxHeight: "85vh", overflowY: "scroll" }}>
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
        {isExpanded && (
          <div className="container_create_competition_tournament level">
            <div className="competition_create">
              <div className="competition_list">
                <div className="label_avatar">
                  Phạm vi giải đấu{" "}
                  {tournamentFocusLevel && (
                    <div className="error_message">{tournamentFocusLevel}</div>
                  )}
                </div>
                <div className="status_tournament">
                  <select
                    className="option_tournament"
                    value={tournamentLevel}
                    onChange={(e) => setTournamentLevel(e.target.value)}
                  >
                    <option value={""}>--Phạm vi giải đấu--</option>
                    <option value="quốc gia">Cấp Quốc Gia</option>
                    <option value="khu vực">Cấp Khu Vực</option>
                    <option value="tỉnh">Cấp Tỉnh</option>
                  </select>
                </div>
              </div>

              {tournamentLevel === "quốc gia" && (
                <div className="competition_list">
                  <div className="label_avatar">Mở đăng ký trên toàn quốc</div>
                </div>
              )}
              {tournamentLevel === "khu vực" && (
                <div className="competition_list">
                  <div className="label_avatar">Mở đăng ký trong khu vực</div>
                  <div
                    className="lish_area_accout"
                    style={{
                      justifyContent: "space-evenly",
                      marginTop: "30px",
                    }}
                  >
                    {AreaData.map((data) => (
                      <div
                        key={data.id}
                        onClick={() => handleArea(data)}
                        className={
                          IdArea == data.id
                            ? "area_accout_item active"
                            : "area_accout_item "
                        }
                      >
                        {data.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {tournamentLevel === "tỉnh" && (
                <div className="competition_list">
                  <div className="label_avatar">Mở đăng ký trong tỉnh</div>
                  <div
                    className="lish_area_accout"
                    style={{
                      justifyContent: "space-between",
                      marginTop: "20px",
                      width: "400px",
                    }}
                  >
                    {AreaData.map((data) => (
                      <div
                        key={data.id}
                        onClick={() => handleArea(data)}
                        className={
                          IdArea == data.id
                            ? "area_accout_item active"
                            : "area_accout_item "
                        }
                      >
                        {data.name}
                      </div>
                    ))}
                  </div>
                  <SelectAddress
                    label="Tỉnh/Thành Phố"
                    // data hiển thị
                    ProvinceData={ProvinceData}
                    //luu lua chon cua nguoi dung
                    setIdCity={setIdCity}
                    setProvince={setProvince}
                    //reset du lieu
                  />
                </div>
              )}
            </div>
          </div>
        )}

        <CreateTournamentCompetition
          competitionList={competitionList}
          setCompetitionList={setCompetitionList}
          competitionError={competitionError}
          setCompetitionError={setCompetitionError}
        />
        <div className="container_create_competition_tournament">
          <div className="competition_create">
            <div className="competition_list">
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
        </div>
      </div>
    </div>
  );
};

export default CreateTournamentAdmin;
