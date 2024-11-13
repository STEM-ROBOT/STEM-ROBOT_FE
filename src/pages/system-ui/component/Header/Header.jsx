import { useNavigate } from "react-router-dom";
import SignIn from "../Author/SignIn/SignIn";
import SignUp from "../Author/SignUp/SignUp";
import "./Header.css";
import { useState, useEffect, useRef } from "react";
import { MdNotificationsActive } from "react-icons/md";
import TokenService from "../../../../config/tokenservice";
import { useDispatch } from "react-redux";
import { logout } from "../../../../redux/actions/AuthenAction";
import connectHub from "../../../../config/connectHub";
import api from "../../../../config";
// const user = {
//   accountId: "2",
//   moderatorName: "Hoàng Dương",
//   image:
//     "https://static-images.vnncdn.net/files/publish/2023/5/5/mmw-4-956.jpg",
// };
const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [tournamentDropdownOpen, setTournamentDropdownOpen] = useState(false);
  const [auInfo, setAuInfo] = useState(TokenService.getUser());
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [shake, setShake] = useState(true);
  const [loadApiConnectClient, setLoadApiConnectClient] = useState(false);
  const tournamentRef = useRef(null);
  const [notificationData, setNotificationData] = useState([]);
  const [numberNotifications, setNumberNotifications] = useState(0);
  const pagesRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const fetchedUserId = TokenService.getUserId();
  const hubConnectionRef = useRef(null);
  useEffect(() => {
    console.log(fetchedUserId);

    const handleData = (data) => {
      setNumberNotifications(data.length);
    };
    const connectHubClient = () => {
      connectHub({
        client: `notification/${fetchedUserId}`,
        onDataReceived: handleData,
      }).then((hubConnection) => {
        hubConnectionRef.current = hubConnection; // Lưu hubConnection vào useRef
      });
    };
    const connectClient = () => {
      api
        .get("/api/notification/notification")
        .then((response) => {
          if (response.data == "timeout") {
            setLoadApiConnectClient(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (loadApiConnectClient) {
      setUserId(fetchedUserId);
      connectHubClient();
      connectClient();
    }
    if (fetchedUserId && fetchedUserId !== userId) {
      setLoadApiConnectClient(true);
    }
  }, [fetchedUserId, loadApiConnectClient]);

  const toggleTournamentDropdown = () => {
    setTournamentDropdownOpen(!tournamentDropdownOpen);
    setPagesDropdownOpen(false);
  };

  const togglePagesDropdown = () => {
    setPagesDropdownOpen(!pagesDropdownOpen);
    setTournamentDropdownOpen(false);
  };

  useEffect(() => {
    if (numberNotifications > 0) {
      setShake(true);
    }
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
  }, [numberNotifications]);

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
  const filterName = (name) => {
    if (name && name.length > 0) {
      return name[0].toUpperCase();
    } else {
      return null;
    }
  };
  const handleLogout = () => {
    if (hubConnectionRef.current) {
      hubConnectionRef.current.stop();
      setLoadApiConnectClient(false);
    }
    dispatch(logout(navigate));
    setAuInfo(null);
    setPagesDropdownOpen(false);
  };
  useEffect(() => {
    setAuInfo(TokenService.getUser());
  }, [signIn]);

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
          {/* 
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
          </div> */}

          <a href="/pricing" className="nav-link">
            Bảng Giá
          </a>
          <a href="/contact" className="nav-link">
            Liên Hệ
          </a>
        </nav>
        {auInfo ? (
          <div className="cta-buttons">
            <div ref={pagesRef} className="account_action_header">
              <img
                src="https://static-images.vnncdn.net/files/publish/2023/5/5/mmw-4-956.jpg"
                alt={TokenService.getUserName()}
                className="account_avatar"
                onClick={togglePagesDropdown}
              />
              <div
                className="account_name_moderator"
                onClick={togglePagesDropdown}
              >
                {TokenService.getUserName()}▾
              </div>
              {pagesDropdownOpen && (
                <div className="dropdown-account-content">
                  <a href="/account/profile" className="dropdown-item">
                    Thông Tin Tài Khoản
                  </a>
                  <a href="/account/mytournament" className="dropdown-item">
                    Quản Lí Giải Đấu
                  </a>
                  <a href="" className="dropdown-item">
                    Quản Lý Đơn hàng
                  </a>
                  <div className="dropdown-item" onClick={() => handleLogout()}>
                    Đăng Xuất
                  </div>
                </div>
              )}
            </div>
            <div className="notification_action_header">
              <MdNotificationsActive
                className={`notification_action_icon ${shake ? "shake" : ""}`}
              />
              <div className="notification_action_number">
                {numberNotifications}
              </div>
            </div>
          </div>
        ) : (
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
        )}
      </div>
      {signIn === true && <SignIn setSignIn={setSignIn} />}
      {signUp === true && <SignUp setSignUp={setSignUp} />}
    </div>
  );
};

export default Header;
