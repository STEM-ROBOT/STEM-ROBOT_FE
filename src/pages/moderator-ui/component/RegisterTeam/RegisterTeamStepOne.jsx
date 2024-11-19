import React, { useState } from "react";
import FirebaseUpload from "../../../../config/firebase";
import logo from "/src/assets/images/logo.png";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
const RegisterTeamStepOne = ({ setStepLine, setLoading, setTeamInfo }) => {
  const navigate = useNavigate();
  const path = useParams();
  const [logoTeamView, setLogoTeamView] = useState(logo);
  const [logoTeam, setLogoTeam] = useState();
  const [teamName, setTeamName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [contactName, setContactName] = useState("");
  const [teamNameError, setTeamNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [contactNameError, setContactNameError] = useState("");
  const [logoError, setLogoError] = useState("");
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setLogoTeam(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoTeamView(reader.result);
      };
      reader.readAsDataURL(file);
      setLogoError(""); // Clear error when file is selected
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

  const handleTeamCreation = async () => {
    let hasError = false;

    if (!teamName) {
      setTeamNameError("Tên đội không được để trống.");
      hasError = true;
    } else {
      setTeamNameError("");
    }

    if (!phone) {
      setPhoneError("Số điện thoại không được để trống.");
      hasError = true;
    }

    if (!email) {
      setEmailError("Email không được để trống.");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (!contactName) {
      setContactNameError("Tên người liên hệ không được để trống.");
      hasError = true;
    } else {
      setContactNameError("");
    }

    if (!logoTeam) {
      setLogoError("Vui lòng tải lên ảnh logo đội.");
      hasError = true;
    } else {
      setLogoError("");
    }

    if (hasError) return; // Stop if there are validation errors
    setLoading(true);
    // Proceed with submission if no errors
    const image = await FirebaseUpload(logoTeam);
    const teamData = {
      logo: image,
      teamName: teamName,
      phone: phone,
      email: email,
      contactName: contactName,
    };

    console.log("Team Data Submitted:", teamData);
    setTeamInfo(teamData);
    setLoading(false);
    setStepLine(true);
  };
  return (
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
            {logoError && <div className="error_message">{logoError}</div>}
          </label>
        </div>

        <div
          className="info_tournament"
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
            {teamNameError && (
              <div className="error_message">{teamNameError}</div>
            )}
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
            {phoneError && <div className="error_message">{phoneError}</div>}
          </div>

          <div className="phone_tournament" style={{ width: "100%" }}>
            <div className="label_info">Email</div>
            <input
              type="text"
              className="input_tournament"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <div className="error_message">{emailError}</div>}
          </div>

          <div className="phone_tournament" style={{ width: "100%" }}>
            <div className="label_info">Tên người liên hệ</div>
            <input
              type="text"
              className="input_tournament"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
            />
            {contactNameError && (
              <div className="error_message">{contactNameError}</div>
            )}
          </div>
        </div>
      </div>

      <div className="apply_create_tournament" onClick={handleTeamCreation}>
        <div className="btn_create_team">
          Tiếp Theo{" "}
          <IoIosLogOut
            style={{
              width: "25px",
              height: "25px",
              marginLeft: "10px",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default RegisterTeamStepOne;
