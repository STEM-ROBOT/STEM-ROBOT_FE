import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoClose } from "react-icons/io5";
import logoImg from "~/assets/images/logo-dask.png";
import "./SignIn.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../../../redux/actions/AuthenAction";

const SignIn = ({ setSignIn,setSignUp }) => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      email: Email,
      password: Password,
    };
   
    dispatch(login(newUser, navigate, setSignIn));  // Truyền setSignIn để tắt popup
  };

  const CloseLogin = () => {
    setSignIn(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="author_modal">
      <div className="login">
        <div className="login_view">
          <div className="close_logo">
            <div className="login_view_logo">
              <img className="logo_view" src={logoImg} alt="Logo" />
            </div>
            <div className="login_view_close" onClick={CloseLogin}>
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
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="password-toggle-icon"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="forgot_pass">Quên mật khẩu?</div>
          </div>

          <div className="login_btn">
            <button
              className="btn_log_user"
              onClick={handleSubmit}
            >
              Đăng nhập
            </button>
          </div>
          <div className="or_login">Hoặc</div>
          <div className="login_btn">
            <button
              type="submit"
              className="btn_log_gg"
              // onClick={handleLoginGoogle}
            >
              Đăng nhập với Google
              <FcGoogle className="btn_log_gg_logo" />
            </button>
          </div>
          <div className="or_sigUp">
            <div className="signUp_btn" onClick={()=>setSignUp(true)}>Đăng Kí Tài Khoản Mới</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
