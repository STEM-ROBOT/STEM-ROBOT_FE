import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoClose } from "react-icons/io5";
import logoImg from "~/assets/images/logo-dask.png";
const SignUp = ({ setSignUp }) => {
  const [googleInfo, setGoogleInfo] = useState(null);
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");
  const [UserName, SetUserName] = useState("");
  const [Cfpass, SetCfpass] = useState("");
  const [btnSp, SetBtnSp] = useState("Đăng Kí");
  const [showPassword, setShowPassword] = useState(false);
  const CloseSignUp = () => {
     setSignUp(false);
  };
  return (
    <div className="author_modal">
      <div className="login">
        <div className="login_view">
          <div className="close_logo">
            <div className="login_view_logo">
              <img className="logo_view" src={logoImg} />
            </div>
            <div className="login_view_close" onClick={CloseSignUp}>
              <IoClose className="close_click" />
            </div>
          </div>
          <div className="login_Welcome">STEM xin chào</div>
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
                  //    onChange={(e) => {
                  //      ChangeEmail(e.target.value);
                  //    }}
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
                  //    onChange={(e) => {
                  //      ChangePassword(e.target.value);
                  //    }}
                />
                <button
                  className="password-toggle-icon"
                  //    onClick={togglePasswordVisibility}
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
                  //    onChange={(e) => {
                  //      ChangeCFPassword(e.target.value);
                  //    }}
                />
                <button
                  className="password-toggle-icon"
                  //    onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>
          <div className="login_btn">
            <button
              className="btn_log_user"
              //     onClick={() => {
              //       handleSignUp();
              //     }}
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
  );
};

export default SignUp;
