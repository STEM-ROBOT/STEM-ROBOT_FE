import React, { useState } from "react";
import "./RegisterTeam.css";
import { IoAlertCircleSharp, IoDisc } from "react-icons/io5";
import logo from "/src/assets/images/logo.png";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill styles
import { MdFormatListBulletedAdd, MdGroupAdd } from "react-icons/md";
import { FaCheckSquare } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";

const RegisterTeam = ({ setRegisterTeam }) => {
  const navigate = useNavigate();
  const path = useParams();
  const [stepLine, setStepLine] = useState(false);

  const [contestantList, setContestant] = useState([]);
  const [logoTeamView, setLogoTeamView] = useState(logo);
  const [logoTeam, setLogoTeam] = useState();
  const [teamName, setTeamName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [contactName, setContactName] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const handleTeamCreation = () => {
    const teamData = {
      logo,
      teamName,
      phone,
      email,
      contactName,
    };

    // You can send `teamData` to an API or store it as needed.
    console.log("Team Data Submitted:", teamData);

    // Proceed to the next step
    setStepLine(true);
  };
  const handleFileChange = (e) => {
    // setShowInputDesImg(true);
    // setImageIndex(e.target.files[0]);

    const file = e.target.files[0];
    setLogoTeam(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoTeamView(reader.result);
        console.log(e.target.files[0]);
      };
      reader.readAsDataURL(file);
    }
  };
  const handlePhoneChange = (e) => {
    const phoneNumber = e.target.value;
    const vietnamPhoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;

    if (vietnamPhoneRegex.test(phoneNumber)) {
      setPhoneError("");
    } else {
      setPhoneError(
        "Số điện thoại không hợp lệ. Số điện thoại Việt Nam phải có 10 chữ số và bắt đầu bằng 0 hoặc +84."
      );
    }
    setPhone(phoneNumber);
  };
  return (
    <div className="register_team_container">
      <div className="register_step_container">
        <div className="register_step">
          <div className="step_regis_number">Bước 1</div>
          <div className="step_regis_progress">
            <div className="step_regis_view">
              <IoDisc className="progress_icon_step" />
              <div
                className={stepLine ? "progress_step active" : "progress_step "}
              />
            </div>
          </div>
          <div className="step_regis_number">TẠO ĐỘI / CHỌN ĐỘI</div>
        </div>
        <div className="register_step">
          <div className="step_regis_number">Bước 2</div>
          <div className="step_regis_progress">
            <div className="step_regis_view">
              <div
                className={
                  stepLine
                    ? "progress_step_right active"
                    : "progress_step_right "
                }
              />

              <IoDisc
                className={
                  stepLine
                    ? "progress_icon_step_2 active"
                    : "progress_icon_step_2"
                }
              />
            </div>
          </div>
          <div className="step_regis_number">CHỌN THÀNH VIÊN CHO ĐỘI</div>
        </div>
      </div>
      {stepLine ? (
        <div className="register_config_team">
          <div className="register_warning">
            <IoAlertCircleSharp className="icon_contestant" />
            Để tiếp tục đăng ký cho một đội khác bạn phải hoàn thành đăng ký
            hoặc
            <div
              className="cancel_register_team"
              onClick={() => setRegisterTeam(false)}
            >
              hủy đăng ký
            </div>
            này.
          </div>
          <div className="register_warning">
            <IoAlertCircleSharp className="icon_contestant" />
            Giải đấu yêu cầu số lượng thành viên mỗi đội ít nhất là 5, nhiều
            nhất là 13.
          </div>
          <div className="register_action_option">
            <div
              className="btn_register_action"
              onClick={() =>
                navigate(`/league/${path.league_id}/register-contestant`)
              }
            >
              <MdGroupAdd className="register_action_icon" />
              Thêm thí sinh
            </div>
            <div className="btn_register_action">
              <FaCheckSquare className="register_action_icon" />
              Chọn thao tác
            </div>
          </div>
          <div className="label_create">Danh sách thí sinh của bạn</div>
          <div style={{ padding: " 20px 10% 10px 10%" }}>
            {contestantList.length > 0 ? (
              <div className="team_table">
                <div className="table_header">
                  <div className="column_header">#</div>
                  <div className="column_header">Hình Ảnh</div>
                  <div className="column_header">Tên Thí Sinh</div>
                  <div className="column_header">SĐT Liên Hệ</div>
                  <div className="column_header">Giới Tính</div>
                  <div className="column_header">T/G Đăng Ký</div>
                </div>
                <div className="table_body">
                  {contestantList?.map((contestant) => (
                    <div key={contestant.id} className="table_row">
                      <div className="table_cell">{contestant.id}</div>
                      <div className="table_cell">{contestant.avatar}</div>
                      <div className="table_cell">{contestant.name}</div>
                      <div className="table_cell">{contestant.phone}</div>
                      <div className="table_cell">{contestant.gender}</div>
                      <div className="table_cell">
                        {contestant.registerTime}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="no_data_message">
                Bạn đang chưa có thành viên nào trong danh sách.
                <br /> Bạn vui lòng thêm thành viên vào danh sách thí sinh của
                giải trước khi đăng ký tham gia nội dung thi đấu.
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="register_info_team">
            <div className="avatar_tournament" style={{ padding: "0" }}>
              <label>
                <div className="label_avatar">Logo</div>
                <img
                  className="avatar_view"
                  style={{
                    width: "250px",
                    height: "220px",
                    objectFit: "cover",
                    padding: "5px",
                    borderRadius: "7px",
                  }}
                  src={logoTeamView}
                  alt=""
                />
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    handleFileChange(e);
                  }}
                />
              </label>
            </div>

            <div
              className="info_tournament "
              style={{ justifyContent: "space-around" }}
            >
              <div className="name_tournament">
                <div className="label_info">Tên đội</div>
                <input
                  type="text"
                  className="input_tournament"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                />
                {/* //  {nameError && <div className="error_message">{nameError}</div>} */}
              </div>

              <div className="phone_tournament" style={{ width: "100%" }}>
                <div className="label_info">Số điện thoại</div>
                <input
                  type="text"
                  maxLength={10}
                  className="input_tournament"
                  value={phone}
                  onChange={(e) => handlePhoneChange(e)}
                />
                {phoneError && (
                  <div className="error_message">{phoneError}</div>
                )}
              </div>
              <div className="phone_tournament" style={{ width: "100%" }}>
                <div className="label_info">Email</div>
                <input
                  type="text"
                  maxLength={10}
                  className="input_tournament"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/* {phoneError && <div className="error_message">{phoneError}</div>} */}
              </div>
              <div className="phone_tournament" style={{ width: "100%" }}>
                <div className="label_info">Tên người liên hệ</div>
                <input
                  type="text"
                  maxLength={10}
                  className="input_tournament"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                />
                {/* {phoneError && <div className="error_message">{phoneError}</div>} */}
              </div>
            </div>
          </div>

          <div className="apply_create_tournament" onClick={handleTeamCreation}>
            <div className="btn_create_team">
              Tiếp Theo{" "}
              <IoIosLogOut
                style={{ width: "25px", height: "25px", marginLeft: "10px" }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RegisterTeam;
