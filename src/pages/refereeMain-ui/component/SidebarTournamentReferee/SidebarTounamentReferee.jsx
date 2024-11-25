import React, { useEffect, useState } from "react";
import "./SidebarTournamentReferee.css";
import { MdManageAccounts } from "react-icons/md";
import { HiOutlineLogin } from "react-icons/hi";
import { IoLocationSharp } from "react-icons/io5";

import axios from "axios";
import api from "/src/config";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../../redux/actions/AuthenAction";
const SidebarTournamentReferee = ({ setSchedules }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [scheduleData, setScheduleData] = useState();
  const [dataReferee, setDataReferee] = useState();
  useEffect(() => {
    api
      .get("/api/referees/referee-tournament")
      .then((tournament) => {
        setDataReferee(tournament.data.data);
        setSchedules(tournament.data.data.referee);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // useEffect(() => {
  //   api
  //     .get("/api/refereecompetition/list-referee-competition?competitionID=2")
  //     .then((referee) => {
  //       console.log(referee);
  //       setScheduleData(referee.data.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);
  const handleLogout = (navigate) => {
    dispatch(logout(navigate));
  };

  return (
    <div className="sidebar_home_referee_container">
      <div className="sidebar_home_referee_info_tournament">
        <div className="sidebar_home_referee">
          <div className="sidebar_home_referee_info">
            <div className="sidebar_referee_info_home">
              <div className="referee_info_role">
                <MdManageAccounts className="referee_info_role_icon" />
                <div className="referee_role">{dataReferee?.role}</div>
              </div>
              <img
                src={dataReferee?.avatar}
                alt=""
                className="referee_info_avatar"
              />
              <div className="referee_info_name">{dataReferee?.name}</div>
              <div className="referee_info_email">{dataReferee?.email}</div>
              <div
                className="referee_info_role_btnLogOut"
                onClick={() => {
                  handleLogout(navigate);
                }}
              >
                <HiOutlineLogin className="referee_head_btnLogOut" />
                ĐĂNG XUẤT
              </div>
            </div>
          </div>
        </div>
        <div className="sidebar_home_referee_layout">
          <div className="sidebar_home_referee_tournament">
            <img
              src={dataReferee?.imageTournament}
              alt="Logo giải"
              className="referee_tournament_logo"
            />
            <div className="referee_tournament_name">
              {dataReferee?.nameTournament}
            </div>
            <div className="referee_tournament_location">
              <IoLocationSharp className="referee_tournament_location_icon" />{" "}
              {dataReferee?.location}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarTournamentReferee;
