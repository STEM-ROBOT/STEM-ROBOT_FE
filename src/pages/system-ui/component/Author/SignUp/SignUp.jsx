import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoClose } from "react-icons/io5";
import logoImg from "~/assets/images/logo-dask.png";
import "./SignUp.css";
import SchoolAccount from "../../SchoolAccount/SchoolAccount";
import api from "../../../../../config";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../../../redux/actions/AuthenAction";

const SignUp = ({ setSignUp,setSignIn }) => {
  const [googleInfo, setGoogleInfo] = useState(null);
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");
  const [UserName, SetUserName] = useState("");
  const [Cfpass, SetCfpass] = useState("");
  const [btnSp, SetBtnSp] = useState("Đăng Kí");
  const [showPassword, setShowPassword] = useState(false);
  const [IdCity, setIdCity] = useState();
  const [IdDistrict, setIdDistrict] = useState();
  const [IdShool, setIdShool] = useState();
  const dispatch = useDispatch();
  const CloseSignUp = () => {
    setSignUp(false);
  };
  const SignUpModerator = () => {


    if (Password !== Cfpass) {
      alert("Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }
    const formattedSchoolId = parseInt(IdShool, 10);

    if (isNaN(formattedSchoolId)) {
      alert("Mã trường phải là một số hợp lệ.");
      return;
    }

    const data = {
      name: "Giáo Viên",
      email: Email,
      password: Password,
      schoolId: formattedSchoolId,
      provinceCode: IdCity,
      districtCode: IdDistrict,
      phoneNumber: "0300000000",
      image:
        "https://static.vecteezy.com/system/resources/previews/009/734/564/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg",
    };
    dispatch(registerUser(data, setSignUp,setSignIn));
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="author_modal">
      <div className="login_view">
        <div className="close_logo_signUp_layout">
          <div className="close_logo_signUp">
            <img className="logo_view" src={logoImg} />

            <div className="login_view_close" onClick={CloseSignUp}>
              <IoClose className="close_click" />
            </div>
          </div>
        </div>

        <div className="login_Welcome">STEM xin chào</div>
        <div className="sign_up_layout_view">
          <div className="sign_up_layout1">
            <SchoolAccount
              IdCity={IdCity}
              setIdCity={setIdCity}
              IdDistrict={IdDistrict}
              setIdDistrict={setIdDistrict}
              IdShool={IdShool}
              setIdShool={setIdShool}
            />
          </div>
          <div className="sign_up_layout2">
            <div className="login_info">
              <div className="login_input">
                <div className="login_input_name">Email</div>
                <div className="login_input_text">
                  <input
                    aria-invalid="false"
                    autoComplete="email"
                    spellCheck="false"
                    className="login_value"
                    placeholder="Email"
                    type="email"
                    value={Email}
                    onChange={(e) => {
                      SetEmail(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="login_input">
                <div className="login_input_name">Mật Khẩu</div>
                <div className="login_input_text">
                  <input
                    className="login_value"
                    placeholder="Mật Khẩu"
                    type={showPassword ? "text" : "password"}
                    value={Password}
                    onChange={(e) => {
                      SetPassword(e.target.value);
                    }}
                  />
                  <button
                    className="password-toggle-icon"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <div className="login_input">
                <div className="login_input_name">Xác Nhận Mật Khẩu</div>
                <div className="login_input_text">
                  <input
                    className="login_value"
                    placeholder="Nhập lại mật khẩu của bạn"
                    type={showPassword ? "text" : "password"}
                    value={Cfpass}
                    onChange={(e) => {
                      SetCfpass(e.target.value);
                    }}
                  />
                  <button
                    className="password-toggle-icon"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>
            <div className="login_btn">
              <button
                className="btn_log_user"
                onClick={() => {
                  SignUpModerator();
                }}
              >
                {btnSp}
              </button>
            </div>
            <div className="or_login">Hoặc</div>
            <div className="login_btn">
              <button
                className="btn_log_gg"
                onClick={() => {
                  handleLoginGoogle();
                }}
              >
                Đăng Kí với Google
                <FcGoogle className="btn_log_gg_logo" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
