import React, { useState } from "react";
import "./CreateTournamentInfo.css";
import logo from "/src/assets/images/logo.png";
const CreateTournamentInfo = ({
  avatarInput,
  setAvatarInput,
  nameTournament,
  setNameTournament,
  phone,
  setPhone,
  address,
  setAddress,
  mode,
  setMode,
  nameError,
  setNameError,
  locationError,
  setLocationError,
  phoneError,
  setPhoneError,
}) => {
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
  const handleNameChange = (e) => {
    setNameTournament(e.target.value);
    setNameError("");
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    setLocationError("");
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
            <input
              type="text"
              className="input_tournament"
              value={nameTournament}
              onChange={handleNameChange}
            />
            {nameError && <div className="error_message">{nameError}</div>}
          </div>
          <div className="phone_status_tournament">
            <div className="phone_tournament">
              <div className="label_info">Số điện thoại</div>
              <input
                type="text"
                maxLength={10}
                className="input_tournament"
                value={phone}
                onChange={handlePhoneChange}
              />
              {phoneError && <div className="error_message">{phoneError}</div>}
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
            <input
              type="text"
              className="input_tournament"
              value={address}
              onChange={handleAddressChange}
            />
            {locationError && (
              <div className="error_message">{locationError}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTournamentInfo;
