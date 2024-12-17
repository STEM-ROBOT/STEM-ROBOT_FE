import React, { useEffect, useState } from "react";
import images from "/src/assets/images/images.png";
import { useParams } from "react-router-dom";
import { FirebaseUpload } from "../../../../config/firebase";
import api from "../../../../config";
import LoadingComponent from "../../../system-ui/component/Loading/LoadingComponent";
import SignIn from "../../../system-ui/component/Author/SignIn/SignIn";
import SignUp from "../../../system-ui/component/Author/SignUp/SignUp";
import TokenService from "../../../../config/tokenservice";
import "./RegisterContestant.css";
const RegisterContestant = () => {
  const { league_id } = useParams();
  const [phoneError, setPhoneError] = useState("");
  const [phone, setPhone] = useState("");
  const [contestantName, setContestantName] = useState("");
  const [nameError, setNameError] = useState("");
  const [gender, setGender] = useState("");
  const [genderError, setGenderError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [contestantList, setContestant] = useState([]);
  const [avatarView, setAvatarView] = useState(images);
  const [avatar, setAvatar] = useState(null);
  const [avatarError, setAvatarError] = useState("");
  const [loadApi, setLoadApi] = useState(true);
  const [loading, setLoading] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const fetchedUserId = TokenService.getUserId();
  const schoolName = TokenService.getSchoolName();
  const [NotRegistered, setNotRegistered] = useState(false);
  useEffect(() => {
    const loadApi = () => {
      api
        .get(
          `/api/tournaments/check-register-moderator?tournamentId=${league_id}`
        )
        .then((response) => {
          if (response.data == "accept") {
            console.log(response.data);

            api
              .get(
                `/api/contestants/public-tournament-moderator?tournamentId=${league_id}`
              )
              .then((response) => {
                setLoadApi(false);
                setContestant(response.data);
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            setNotRegistered(true);
            setLoadApi(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (loadApi && fetchedUserId) {
      loadApi();
    } else {
      setSignIn(true);
    }
  }, [loadApi, fetchedUserId]);
  useEffect(() => {
    const targetPosition = 285;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 500;
    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const scrollY = Math.min(
        startPosition + (distance * progress) / duration,
        targetPosition
      );
      window.scrollTo(0, scrollY);
      if (scrollY < targetPosition) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [fetchedUserId]);
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    if (file) {
      setAvatarError(""); // Reset error if a file is selected
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarView(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    let hasError = false;

    if (!contestantName) {
      setNameError("Họ và Tên không được để trống.");
      hasError = true;
    } else {
      setNameError("");
    }

    if (!email) {
      setEmailError("Email không được để trống.");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (!phone) {
      setPhoneError("Số điện thoại không được để trống.");
      hasError = true;
    }

    if (!gender) {
      setGenderError("Vui lòng chọn giới tính.");
      hasError = true;
    } else {
      setGenderError("");
    }

    if (!avatar) {
      setAvatarError("Vui lòng tải lên ảnh thí sinh.");
      hasError = true;
    } else {
      setAvatarError("");
    }

    if (hasError) return;
    setLoading(true);
    // Proceed with submission if no errors
    const image = await FirebaseUpload(avatar);
    const data = {
      name: contestantName,
      email: email,
      schoolName:schoolName,
      gender: gender,
      phone: phone,
      image: image,
    };
    api
      .post(
        `/api/contestants/public-tournament?tournamentId=${league_id}`,
        data
      )
      .then(() => {
        setLoadApi(true);
        setContestantName("");
        setEmail("");
        setGender("");
        setPhone("");
        setAvatar(null);
        setAvatarView(images);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error adding contestant:", error);
      });
  };
  return (
    <>
      {signIn === true && <SignIn setSignIn={setSignIn} />}
      {signUp === true && <SignUp setSignUp={setSignUp} />}
      {NotRegistered ? (
        <div className="competition_container none">
          <div className="countdown_container " style={{ height: "60vh" }}>
            <div className="label_create_none">Xin lỗi!</div>
            <div className="label_create_none">
              Trường của bạn không thuộc phạm vi đăng ký của giải đấu
            </div>
          </div>
        </div>
      ) : (
        <div className="competition_container">
          <div className="label_create">Thông tin thí sinh</div>
          {loading ? (
            <div className="loading-overlay">
              <LoadingComponent
                position={""}
                borderRadius={"13px"}
                backgroundColor={"#0285ffb9"}
              />
            </div>
          ) : (
            <div className="view_layout_componentLoad">
              <div className="info_create">
                <div className="avatar_tournament">
                  <label>
                    <div className="label_avatar">Ảnh thí sinh</div>
                    <img className="avatar_view" src={avatarView} alt="" />
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                    {avatarError && (
                      <div className="error_message">{avatarError}</div>
                    )}
                  </label>
                </div>

                <div className="info_tournament">
                  <div className="name_tournament">
                    <div className="label_info">Họ và Tên</div>
                    <input
                      type="text"
                      className="input_tournament"
                      value={contestantName}
                      onChange={(e) => setContestantName(e.target.value)}
                    />
                    {nameError && (
                      <div className="error_message">{nameError}</div>
                    )}
                  </div>

                  <div className="name_tournament">
                    <div className="label_info">Email</div>
                    <input
                      type="text"
                      className="input_tournament"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && (
                      <div className="error_message">{emailError}</div>
                    )}
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
                      {phoneError && (
                        <div className="error_message">{phoneError}</div>
                      )}
                    </div>

                    <div className="status_tournament">
                      <div className="label_info">Giới tính</div>
                      <select
                        className="option_tournament"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option value="">Chọn giới tính</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Nam">Nam</option>
                      </select>
                      {genderError && (
                        <div className="error_message">{genderError}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="apply_create_tournament">
                <div className="btn_create_tournament" onClick={handleSubmit}>
                  Hoàn Tất
                </div>
              </div>
            </div>
          )}

          <div className="label_create">Danh sách thí sinh của bạn</div>
          <div style={{ padding: " 20px 2% 10px 2%" }}>
            <div className="team_table">
              <div className="table_header">
                <div className="column_header">#</div>
                <div className="column_header">Hình Ảnh</div>
                <div className="column_header">Tên Thí Sinh</div>
                <div className="column_header">SĐT Liên Hệ</div>
                <div className="column_header">Giới Tính</div>
                <div className="column_header">Trường</div>
                <div className="column_header">T/G Đăng Ký</div>
              </div>
              <div
                className="table_body"
                style={{ maxHeight: "300px", overflowY: "scroll" }}
              >
                {contestantList?.length > 0 ? (
                  contestantList?.map((contestant, i) => (
                    <div key={i} className="table_row">
                      <div className="table_cell">{i + 1}</div>
                      <div className="table_cell">
                        <img
                          src={contestant.image}
                          style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "100px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div className="table_cell">{contestant.name}</div>
                      <div className="table_cell">{contestant.phone}</div>
                      <div className="table_cell">{contestant.gender}</div>
                      <div className="table_cell">
                        {contestant.schoolName
                        // .split("SchoolName: ")[1].trim()
                        }
                      </div>
                      <div className="table_cell">{contestant.startTime}</div>
                    </div>
                  ))
                ) : (
                  <div className="no_data_message">Chưa có thí sinh</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterContestant;
