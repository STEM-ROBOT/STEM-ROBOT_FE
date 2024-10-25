import React, { useState } from "react";
import "./RegisterTeam.css";
import { IoAlertCircleSharp, IoDisc } from "react-icons/io5";
import logo from "/src/assets/images/logo.png";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill styles
import { MdFormatListBulletedAdd, MdGroupAdd } from "react-icons/md";
import { FaCheckSquare } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const RegisterTeam = () => {
  const navigate = useNavigate();
  const path = useParams();
  const [stepLine, setStepLine] = useState(true);
  const [value, setValue] = useState("");
  const [contestantList, setContestant] = useState([]);
  console.log(path);

  const modules = {
    toolbar: [
      [{ font: [] }, { size: [] }], // custom dropdown
      ["bold", "italic", "underline", "strike"], // toggled buttons
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "blockquote", "code-block"],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      ["clean"], // remove formatting button
    ],
  };

  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "align",
    "list",
    "bullet",
    "link",
    "image",
    "blockquote",
    "code-block",
    "color",
    "background",
  ];
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
            hoặc <div className="cancel_register_team"> hủy đăng ký </div> này.
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
            <div className="avatar_tournament">
              <label>
                <div className="label_avatar">Logo</div>
                <img
                  className="avatar_view"
                  style={{ width: "270px", height: "" }}
                  src={logo}
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
                  //     value={nameTournament}
                  //     onChange={handleNameChange}
                />
                {/* //  {nameError && <div className="error_message">{nameError}</div>} */}
              </div>
              <div
                className="phone_status_tournament"
                style={{ flexDirection: "column" }}
              >
                <div className="phone_tournament">
                  <div className="label_info">Số điện thoại</div>
                  <input
                    type="text"
                    maxLength={10}
                    className="input_tournament"
                    //  value={phone}
                    //  onChange={handlePhoneChange}
                  />
                  {/* {phoneError && <div className="error_message">{phoneError}</div>} */}
                </div>
                <div className="phone_tournament">
                  <div className="label_info">Email</div>
                  <input
                    type="text"
                    maxLength={10}
                    className="input_tournament"
                    //  value={phone}
                    //  onChange={handlePhoneChange}
                  />
                  {/* {phoneError && <div className="error_message">{phoneError}</div>} */}
                </div>
                <div className="phone_tournament">
                  <div className="label_info">Tên người liên hệ</div>
                  <input
                    type="text"
                    maxLength={10}
                    className="input_tournament"
                    //  value={phone}
                    //  onChange={handlePhoneChange}
                  />
                  {/* {phoneError && <div className="error_message">{phoneError}</div>} */}
                </div>
                {/* <div className="status_tournament">
            <div className="label_info">Giới tính</div>

            <select className="option_tournament">
              <option value="Private">Nữ</option>
              <option value="Public">Nam</option>
            </select>
          </div> */}
              </div>
              {/* <div className="name_tournament">
          <div className="label_info">Email</div>
          <input
            type="text"
            className="input_tournament"
            //     value={address}
            //     onChange={handleAddressChange}
          /> */}
              {/* {locationError && (
            <div className="error_message">{locationError}</div>
          )} */}
              {/* </div> */}
            </div>
          </div>
          <div className="register_info_intro_team">
            <ReactQuill
              value={value}
              onChange={setValue}
              modules={modules}
              formats={formats}
              theme="snow"
              style={{ height: "300px", marginBottom: "50px" }}
            />
          </div>
          <div className="apply_create_tournament">
            <div className="btn_create_tournament">Tiếp Theo</div>
          </div>
        </>
      )}
    </div>
  );
};

export default RegisterTeam;
