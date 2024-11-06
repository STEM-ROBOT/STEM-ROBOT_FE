import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoSettingsSharp } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FaBox, FaChartPie, FaShoppingCart, FaSignOutAlt, FaTrophy, FaAngleRight, FaAngleDown, } from "react-icons/fa";
import logoImg from "~/assets/images/logo-dask.png";
import audio from "~/assets/tp--theres-no-one-at-all-another-version--karaoke-beat-intrumental--prod-sơn-seven.mp3";
import './SidebarAdmin.css';
import { FaCog, FaUserPlus, FaUsers, FaGavel, FaCalendarPlus, FaListAlt, FaMapMarkerAlt, FaSitemap, FaUserShield, FaProjectDiagram, FaPlay } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../../../../redux/actions/AuthenAction";

const actionReferee = [
  { key: "Dashboard", path: "dashboard", label: "Thống kê", icon: <MdOutlineDashboard className="admin_sidebar_icon" /> },
  { key: "CreateTournament", path: "manage-tournament", label: "Quản lý giải đấu", icon: <FaTrophy className="admin_sidebar_icon" />, hasSubmenu: true },
  { key: "ManageUser", path: "manage-user", label: "Quản lý người dùng", icon: <AiOutlineUsergroupAdd className="admin_sidebar_icon" /> },
  { key: "ManagePackage", path: "manage-package", label: "Quản lý gói", icon: <FaBox className="admin_sidebar_icon" /> },
  { key: "ManageOrder", path: "manage-order", label: "Quản lý giao dịch", icon: <FaShoppingCart className="admin_sidebar_icon" /> },
  { key: "ManageGenre", path: "manage-genre", label: "Quản lý nội dung thi đấu", icon: <FaChartPie className="admin_sidebar_icon" /> },
  { key: "Logout", path: "logout", label: "Đăng xuất", icon: <FaSignOutAlt className="admin_sidebar_icon" /> },
];

const manageTournamentSubmenu = [

  {
    key: "CreateTournament",
    path: "create-tournaments-admin",
    label: "Tạo giải đấu",
    // icon: <FaCog />,
  },
  {
    key: "AdminTournament",
    path: "tournaments-admin",
    label: "Giải đấu đã tạo",
    // icon: <FaCog />,
  },

  // {
  //   key: "SettingTournament",
  //   path: "setting-tournament",
  //   label: "Giải đấu đã tạo",
  //   icon: <FaCog />,
  //   submenu: [
  //     { key: "CreateTournament", path: "create-tournaments", label: "Nội dung thi đấu", icon: <FaCalendarPlus /> },
  //     { key: "CreateContestant", path: "create-contestant", label: "Thêm thí sinh", icon: <FaUserPlus /> },
  //     { key: "CreateReferee", path: "create-referee", label: "Thêm trọng tài", icon: <FaGavel /> },
  //   ]
  // },
  // {
  //   key: "SettingCompetition",
  //   path: "setting-competition",
  //   label: "Cấu hình nội dung",
  //   icon: <FaCog />,
  //   submenu: [
  //     { key: "CreateFormat", path: "create-format", label: "Thêm hình thức", icon: <FaListAlt /> },
  //     { key: "CreateTeam", path: "create-team", label: "Thêm đội", icon: <FaUsers /> },
  //     { key: "CreateLocation", path: "create-location", label: "Thêm sân", icon: <FaMapMarkerAlt /> },
  //     { key: "CreateTable", path: "create-table", label: "Thêm bảng", icon: <FaSitemap /> },
  //     { key: "CreateMatchups", path: "create-matchups", label: "Thêm cặp đấu", icon: <FaProjectDiagram /> },
  //     { key: "CreateRoleReferee", path: "create-rolereferee", label: "Phân quyền trọng tài", icon: <FaUserShield /> },
  //     { key: "CreateSchedule", path: "create-schedule", label: "Thêm lịch trình", icon: <FaPlay /> },
  //   ]
  // },

];

const SidebarAdmin = () => {
  const dispatch = useDispatch();

  const [selectedRule, setSelectedRule] = useState("Dashboard");
  const [selectedSubmenu, setSelectedSubmenu] = useState("");
  const [selectedNestedSubmenu, setSelectedNestedSubmenu] = useState("");
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [openNestedSubmenu, setOpenNestedSubmenu] = useState(null);
  const audioRef = React.useRef(null);
  const navigate = useNavigate();

  const handleRuleClick = (key, path, hasSubmenu) => {
    if (key === "Logout") {
        handleLogout(navigate);
    } else {
        setSelectedRule(key);
        setSelectedSubmenu("");
        setSelectedNestedSubmenu("");
        if (hasSubmenu) {
            setOpenSubmenu(openSubmenu === key ? null : key);
        } else {
            setOpenSubmenu(null);
            navigate(path);
        }
    }
};

  const handleLogout = (navigate) => {
    dispatch(logout(navigate));
  };

  const handleSubmenuClick = (submenuItem) => {
    if (submenuItem.submenu) {
      setOpenNestedSubmenu(openNestedSubmenu === submenuItem.key ? null : submenuItem.key);
    } else {
      setSelectedSubmenu(submenuItem.key);
      setSelectedNestedSubmenu("");
      navigate(submenuItem.path);
    }
  };

  const handleNestedSubmenuClick = (nestedItem, parentKey) => {
    setSelectedSubmenu(parentKey); // Activate parent submenu
    // setSelectedNestedSubmenu(nestedItem.key); // Activate nested submenu
    navigate(nestedItem.path);
  };

  return (
    <div className="admin_sidebar_container">
      <audio ref={audioRef} loop>
        <source src={audio} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <div className="admin_sidebar_layout">
        <div className="admin_sidebar_header">
          <img src={logoImg} alt="logo" className="admin_logo_image" />
          <IoSettingsSharp onClick={() => audioRef.current.play()} className="admin_settings_icon" />
          <div className="admin_name">ADMIN</div>
        </div>
        <div className="admin_sidebar_actions">
          {actionReferee.map((action) => (
            <div key={action.key}>
              <div
                className={`admin_action_item ${selectedRule === action.key ? "admin_active" : ""}`}
                onClick={() => handleRuleClick(action.key, action.path, action.hasSubmenu)}
              >
                <div>{action.icon}</div>
                <div>{action.label}</div>
                {action.hasSubmenu && (
                  openSubmenu === action.key ? <FaAngleDown className="admin_submenu_arrow_icon" /> : <FaAngleRight className="admin_submenu_arrow_icon" />
                )}
              </div>
              {action.hasSubmenu && openSubmenu === action.key && (
                <div className="admin_submenu">
                  {manageTournamentSubmenu.map((submenuItem) => (
                    <div key={submenuItem.key}>
                      <div
                        className={`admin_submenu_item ${selectedSubmenu === submenuItem.key ? "admin_active_submenu" : ""}`}
                        onClick={() => handleSubmenuClick(submenuItem)}
                      >
                        {submenuItem.icon} <span>{submenuItem.label}</span>
                        {submenuItem.submenu && (
                          openNestedSubmenu === submenuItem.key ? <FaAngleDown className="admin_submenu_arrow_icon" /> : <FaAngleRight className="admin_submenu_arrow_icon" />
                        )}
                      </div>
                      {submenuItem.submenu && openNestedSubmenu === submenuItem.key && (
                        <div className="admin_nested_submenu">
                          {submenuItem.submenu.map((nestedItem) => (
                            <div
                              key={nestedItem.key}
                              className={`admin_nested_submenu_item ${selectedNestedSubmenu === nestedItem.key ? "admin_active_nested_submenu" : ""}`}
                              onClick={() => handleNestedSubmenuClick(nestedItem, submenuItem.key)}
                            >
                              {nestedItem.icon}<span>{nestedItem.label}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarAdmin;
