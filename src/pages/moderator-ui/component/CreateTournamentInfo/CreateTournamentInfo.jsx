import React, { useState } from "react";
import "./CreateTournamentInfo.css";
import logo from "/src/assets/images/logo.png";
const CreateTournamentInfo = () => {
  const [avatarInput, setAvatarInput] = useState(logo);
  const [mode, setMode] = useState("Private");

  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  const handleFileChange = (e) => {
    // setShowInputDesImg(true);
    // setImageIndex(e.target.files[0]);

    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setAvatarInput(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="container_create_info_tournament">
      <div className="label_create">Tạo Giải</div>
      <div className="info_create">
        <div className="avatar_tournament ">
          <label>
            <div className="label_avatar">Hình giải đấu</div>
            <img className="avatar_view" src={avatarInput} alt="" />
            <input
              type="file"
              style={{ display: "none" }}
              onChange={(e) => {
                handleFileChange(e);
              }}
            />
          </label>
        </div>

        <div className="info_tournament ">
          <div className="name_tournament">
            <div className="label_info">Tên giải đấu</div>
            <input type="text" className="input_tournament" />
          </div>
          <div className="phone_status_tournament">
            <div className="phone_tournament">
              <div className="label_info">Số điện thoại</div>
              <input type="text" className="input_tournament" />
            </div>
            <div className="status_tournament">
              <div className="label_info">Chế độ</div>
              {/* Thêm select */}
              <select
                className="option_tournament"
                value={mode}
                onChange={handleModeChange}
              >
                <option value="Private">Riêng tư</option>
                <option value="Public">Công khai</option>
              </select>
            </div>
          </div>
          <div className="name_tournament">
            <div className="label_info">Địa điểm chi tiết</div>
            <input type="text" className="input_tournament" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTournamentInfo;
