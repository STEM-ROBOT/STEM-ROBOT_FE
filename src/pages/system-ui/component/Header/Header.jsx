import { useNavigate } from "react-router-dom";
import SignIn from "../Author/SignIn/SignIn";
import SignUp from "../Author/SignUp/SignUp";
import "./Header.css";
import { useState, useEffect, useRef } from "react";
import { MdNotificationsActive } from "react-icons/md";
import TokenService from "../../../../config/tokenservice";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../redux/actions/AuthenAction";
import connectHub from "../../../../config/connectHub";
import api from "../../../../config";
import logo from "~/assets/images/logo.png";
import { InforAccountID } from "../../../../redux/actions/AccountAction";
// const user = {
//   accountId: "2",
//   moderatorName: "Hoàng Dương",
//   image:
//     "https://static-images.vnncdn.net/files/publish/2023/5/5/mmw-4-956.jpg",
// };
const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [tournamentDropdownOpen, setTournamentDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
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
  const useRole = TokenService.getUserRole();
  const hubConnectionRef = useRef(null);
  const [profileInfo, setProfileInfo] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    image: "",
  });
  const InforAccountIDs = useSelector((state) => state.getAccountID);
  const isLogin = useSelector((state) => state.userLogin.success);
  const isAdd = useSelector((state) => state.ChangeInfor.loading)
  console.log(isAdd)
  useEffect(() => {
    if (useRole === "AD") {
      navigate("/admin");
    } else if (useRole === "RF") {
      navigate("/referee-main");
    }
  }, [useRole]);
  const getInitial = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase();
  };
  const notificationRef = useRef(null);

  const toggleNotificationDropdown = () => {
    setNotificationDropdownOpen(!notificationDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (notificationRef.current && !notificationRef.current.contains(event.target)) {
      setNotificationDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  useEffect(() => {
    dispatch(InforAccountID());
  }, [isAdd, isLogin]);

  useEffect(() => {
    if (InforAccountIDs.success) {
      setProfileInfo({
        name: InforAccountIDs.success.name || "",
        phoneNumber: InforAccountIDs.success.phoneNumber || "",
        email: InforAccountIDs.success.email || "",
        image: InforAccountIDs.success.image || "",
      });
    }
  }, [InforAccountIDs.success, isAdd, isLogin]);
  useEffect(() => {
 

    const handleData = (data) => {
      setNotificationData(data)
      setNumberNotifications(data.length);
    };
    const connectHubClient = () => {
      connectHub({
        client: `notification/${fetchedUserId}`,
        onDataReceived: handleData,
      }).then((hubConnection) => {
        hubConnectionRef.current = hubConnection;
      });
    };
    const connectClient = () => {
      setLoadApiConnectClient(false);
      api
        .get("/api/notification/notification")
        .then((response) => {
          if (response.data == "timeout") {
            if (hubConnectionRef.current) {
              hubConnectionRef.current.stop();
            }
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
    return () => {
      if (hubConnectionRef.current) {
        hubConnectionRef.current.stop();
      }
    };
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
            src={logo}
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
        {fetchedUserId ? (
          <div className="cta-buttons">
            <div ref={pagesRef} className="account_action_header">
              {profileInfo.image ? (
                <img
                  src={profileInfo.image}
                  alt={profileInfo.email}
                  className="account_avatar"
                  onClick={togglePagesDropdown}
                />
              ) : (
                <div
                  className="account_avatar_placeholder"
                  onClick={togglePagesDropdown}
                >
                  {getInitial(profileInfo.email)}
                </div>
              )}
              <div
                className="account_name_moderator"
                onClick={togglePagesDropdown}
              >
                {profileInfo.name ? profileInfo.name : profileInfo.email} ▾
              </div>
              {pagesDropdownOpen && (
                <div className="dropdown-account-content">
                  <a href="/profile" className="dropdown-item">
                    Thông Tin Tài Khoản
                  </a>
                  <a href="/account/my-tournament" className="dropdown-item">
                    Quản Lí Giải Đấu
                  </a>
                  <a
                    href="/account/tournament-adhesion"
                    className="dropdown-item"
                  >
                    Giải Đấu Đã Tham Gia
                  </a>
                  <a href="" className="dropdown-item">
                    Quản Lý Giao Dịch
                  </a>
                  <div className="dropdown-item" onClick={() => handleLogout()}>
                    Đăng Xuất
                  </div>
                </div>
              )}
            </div>
            <div className="notification_action_header" ref={notificationRef}>
              <MdNotificationsActive
                className={`notification_action_icon ${shake ? "shake" : ""}`}
                onClick={toggleNotificationDropdown} // Gắn sự kiện click
              />
              <div className="notification_action_number">{numberNotifications}</div>
              {notificationDropdownOpen && (
                <div className="notification-dropdown">
                  <div className="notification-header">
                    <span>Thông báo</span>
                  
                  </div>
                  {notificationData.length > 0 ? (
                    notificationData.map((notification) => (
                      <div className="notification-item" key={notification.id} onClick={()=>navigate(`${notification.routerUi}`)}>
                        <div className="notification-message">
                          {notification.description}
                        </div>
                        <div className="notification-time">{notification.createDate}</div>
                      </div>
                    ))
                  ) : (
                    <div className="notification-empty">Không có thông báo</div>
                  )}
                </div>
              )}
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
      {signIn === true && <SignIn setSignIn={setSignIn} setSignUp={setSignUp} />}
      {signUp === true && <SignUp setSignUp={setSignUp} setSignIn={setSignIn} />}
    </div>
  );
};

export default Header;
