import React from "react";
import "./ErrorPage.css";
import imageView from "/src/assets/pageNotFound.jpg";
import imageView2 from "/src/assets/images/banner-image.png";
import logo from "/src/assets/images/logo.png";
import { useNavigate } from "react-router-dom";
const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="error_container">
      <div className="error_page_head">
        <img src={logo} alt="logo" className="logo_page_error" />
      </div>
      <div className="error_content">
        <div className="error_log_content">
          <div className="error_text_1">404-error</div>
          <div className="error_text_2">Page Not Found</div>
          <div className="error_text_3">
            Your search has ventured beyond the known universe.
          </div>
          <div className="back-home-btn_error" onClick={() => navigate("/")}>
            Back To Home
          </div>
        </div>

        <div className="astronaut">
          <img src={imageView2} className="banner_error" />
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
