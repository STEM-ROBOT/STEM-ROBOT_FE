import { useNavigate } from "react-router-dom";
import SignIn from "../Author/SignIn/SignIn";
import SignUp from "../Author/SignUp/SignUp";
import "./Header.css";
import { useState, useEffect, useRef } from "react";

const Header = () => {
  const [isVisible, setIsVisible] = useState(false); // State to track scroll position for background
  const [tournamentDropdownOpen, setTournamentDropdownOpen] = useState(false);
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const tournamentRef = useRef(null);
  const pagesRef = useRef(null);
  const navigate = useNavigate();
  const toggleTournamentDropdown = () => {
    setTournamentDropdownOpen(!tournamentDropdownOpen);
    setPagesDropdownOpen(false);
  };

  const togglePagesDropdown = () => {
    setPagesDropdownOpen(!pagesDropdownOpen);
    setTournamentDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        tournamentRef.current &&
        !tournamentRef.current.contains(event.target) &&
        pagesRef.current &&
        !pagesRef.current.contains(event.target)
      ) {
        setTournamentDropdownOpen(false);
        setPagesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.01) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const OpenSignIn = () => {
    setSignIn(true);
  };
  const OpenSignUp = () => {
    setSignUp(true);
  };
  return (
    <div className={`header-outer ${isVisible ? "header-visible" : ""}`}>
      <div className="header-container">
        <div className="logo-container">
          <img
            src="/src/assets/images/logo.png"
            alt="STEM Logo"
            className="logo-image"
            onClick={() => navigate("/home")}
          />
        </div>

        <nav className="nav-links">
          <a href="/" className="nav-link">
            {" "}
            Trang Chủ{" "}
          </a>

          <div className="nav-dropdown" ref={tournamentRef}>
            <button
              className="nav-link dropdown-button"
              onClick={toggleTournamentDropdown}
            >
              Giải Đấu ▾
            </button>
            {tournamentDropdownOpen && (
              <div className="dropdown-content">
                <a href="/league" className="dropdown-item">
                  Tìm Giải Đấu
                </a>
                <a href="/league/create-tournament" className="dropdown-item">
                  Tạo Giải Đấu
                </a>
              </div>
            )}
          </div>

          <div className="nav-dropdown" ref={pagesRef}>
            <button
              className="nav-link dropdown-button"
              onClick={togglePagesDropdown}
            >
              Đội Thi Đấu ▾
            </button>
            {pagesDropdownOpen && (
              <div className="dropdown-content">
                <a href="" className="dropdown-item">
                  Tìm Đội
                </a>
                <a href="" className="dropdown-item">
                  Tạo Đội
                </a>
              </div>
            )}
          </div>

          <a href="/pricing" className="nav-link">
            Bảng Giá
          </a>
          <a href="/contact" className="nav-link">
            Liên Hệ
          </a>
        </nav>

        <div className="cta-buttons">
          <button className="styled-button" onClick={OpenSignUp}>
            Đăng Kí
          </button>
          <button
            className="styled-button register-button"
            onClick={OpenSignIn}
          >
            Đăng Nhập
          </button>
        </div>
      </div>
      {signIn === true && <SignIn setSignIn={setSignIn} />}
      {signUp === true && <SignUp setSignUp={setSignUp} />}
    </div>
  );
};

export default Header;
