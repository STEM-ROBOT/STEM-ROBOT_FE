import React, { useState } from "react";
import logo from "/src/assets/images/logo.png";
import { useLocation, useParams } from "react-router-dom";
const RegisterContestant = () => {
  const location = useLocation();
  const pram = useParams();
  console.log(location, pram);

  const [contestantList, setContestant] = useState([]);
  return (
    <div className="competition_container">
      <div className="label_create">Thông tin thí sinh</div>
      <div className="info_create">
        <div className="avatar_tournament ">
          <label>
            <div className="label_avatar">Ảnh thí sinh</div>
            <img className="avatar_view" src={logo} alt="" />
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
            <div className="label_info">Họ và Tên</div>
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
            <div className="status_tournament">
              <div className="label_info">Giới tính</div>
              {/* Thêm select */}
              <select
                className="option_tournament"
                //  value={mode}
                //  onChange={handleModeChange}
              >
                <option value="Private">Nữ</option>
                <option value="Public">Nam</option>
                <option value="Public">Bê đê</option>
              </select>
            </div>
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
      <div className="apply_create_tournament">
        <div className="btn_create_tournament">Hoàn Tất</div>
      </div>
      <div className="label_create">Danh sách thí sinh của bạn</div>
      <div style={{ padding: " 20px 10% 10px 10%" }}>
        <div className="team_table">
          <div className="table_header">
            <div className="column_header">#</div>
            <dataiv className="column_header">Hình Ảnh</dataiv>
            <div className="column_header">Tên Thí Sinh</div>
            <div className="column_header">SĐT Liên Hệ</div>
            <div className="column_header">Giới Tính</div>
            <div className="column_header">T/G Đăng Ký</div>
          </div>
          <div className="table_body">
            {contestantList.length > 0 ? (
              contestantList?.map((contestant) => (
                <div key={contestant.id} className="table_row">
                  <div className="table_cell">{contestant.id}</div>
                  <div className="table_cell">{contestant.avatar}</div>
                  <div className="table_cell">{contestant.name}</div>
                  <div className="table_cell">{contestant.phone}</div>
                  <div className="table_cell">{contestant.gender}</div>
                  <div className="table_cell">{contestant.registerTime}</div>
                </div>
              ))
            ) : (
              <div className="no_data_message">Chưa có thí sinh</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterContestant;
