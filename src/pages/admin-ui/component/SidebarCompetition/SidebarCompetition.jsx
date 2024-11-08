import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUsers, FaListAlt, FaMapMarkerAlt, FaSitemap, FaUserShield, FaProjectDiagram, FaPlay, FaAngleDown, FaAngleRight, FaCheck } from "react-icons/fa";
import { IoSettingsSharp } from 'react-icons/io5';
import { CiLogout } from 'react-icons/ci';
import { activeCompetition, getCompetitionInfo } from '../../../../redux/actions/CompetitionAction';
import { HiOutlineLogin } from 'react-icons/hi';
import './SidebarCompetition.css'
import TokenService from '../../../../config/tokenservice';
import { getActive } from '../../../../redux/actions/FormatAction';



const SidebarCompetition = () => {
  const dispatch = useDispatch();
  const { tournamentId, competitionId } = useParams();
  const activeFormatData = useSelector((state) => state.getActiveFormat);
  const activeData = activeFormatData?.data?.data;
  TokenService.setFormatId(activeData?.formatId);
  const competitionInfo = useSelector((state) => state.infoCompetition?.infoCompetition?.data);
  const loading = useSelector((state) => state.infoTournament.loading);
  const error = useSelector((state) => state.infoTournament.error);
  const [selectedRule, setSelectedRule] = useState("CreateFormat");
  const [selectedSubmenu, setSelectedSubmenu] = useState("");
  const [selectedNestedSubmenu, setSelectedNestedSubmenu] = useState("");
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [openNestedSubmenu, setOpenNestedSubmenu] = useState(null);
  const audioRef = React.useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (competitionId) {
      dispatch(getCompetitionInfo(competitionId));
      dispatch(getActive(competitionId));
    }
  }, [competitionId, dispatch]);



  const submenu = [
    { key: "CreateFormat", path: "create-format", label: "Thêm hình thức", icon: <FaListAlt />, isActive: activeData?.isFormat },
    { key: "CreateTeam", path: "create-team", label: "Thêm đội", icon: <FaUsers />, isActive: activeData?.isTeam },
    { key: "CreateLocation", path: "create-location", label: "Thêm sân", icon: <FaMapMarkerAlt />, isActive: activeData?.isLocation }, 
  ]
  {
    activeData?.formatId === 2 &&( menuItems.push({ key: "create-table", label: "Thêm bảng", icon: <FaTable />, isActive: activeIcon?.isTable }))
  }
  submenu.push(
    { key: "CreateMatchups", path: "create-matchups", label: "Thêm cặp đấu", icon: <FaProjectDiagram />, isActive: activeData?.isTeamMatch },
    { key: "CreateSchedule", path: "create-schedule", label: "Thêm lịch trình", icon: <FaPlay />, isActive: activeData?.isMatch },
    { key: "CreateRoleReferee", path: "create-rolereferee", label: "Phân quyền trọng tài", icon: <FaUserShield />, isActive: activeData?.isReferee },
    { key: "CreateReferee", path: "create-referee", label: "Phân trọng tài vào trận", icon: <FaUserShield />, isActive: activeData?.isSchedule },
  )

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
    // dispatch(logout(navigate));
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
  const handleBack = () => {
    navigate(`/admin/tournament/${tournamentId}/competitions`);
  };
  const handleActive = () => {
    dispatch(activeCompetition(competitionId))
  }
  return (
    <div className="admin_sidebar_container">
      {/* <audio ref={audioRef} loop>
        <source src={audio} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio> */}
      <div className="admin_sidebar_layout">
        {/* <div className="admin_sidebar_header">
          <img src={logoImg} alt="logo" className="admin_logo_image" />
          <IoSettingsSharp onClick={() => audioRef.current.play()} className="admin_settings_icon" />
          <CiLogout style={{fontSize:"24px",color:"#000"}} onClick={handleBack} />
          <div className="admin_name">{competitionInfo?.name}</div>
        </div> */}
        <div className="sidebar_home_admin">
          <div className="sidebar_home_referee_info">
            <div className="sidebar_referee_info_home">
              <img src={competitionInfo?.image} alt="" className="referee_info_avatar" />
              <div className="referee_info_name">{competitionInfo?.name}</div>
              <div className="admin_info_role_btnLogOut">
                <HiOutlineLogin className="admin_head_btnLogOut" onClick={handleBack} />
                {
                  !competitionInfo?.isActive && (
                    <button className='admin_button_active' onClick={handleActive}>Active</button>
                  )
                }

              </div>
            </div>
          </div>
        </div>
        <div className="admin_sidebar_actions">
          {submenu.map((action) => (
            <div key={action.key}>
              <div
                className={`admin_action_item ${selectedRule === action.key ? "admin_active" : ""}`}
                onClick={() => handleRuleClick(action.key, action.path, action.hasSubmenu)}
              >
                <div>{action.icon}</div>
                <div>{action.label}</div>
                {action.isActive && <FaCheck className="check-icon" />} 
              </div>
          
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SidebarCompetition