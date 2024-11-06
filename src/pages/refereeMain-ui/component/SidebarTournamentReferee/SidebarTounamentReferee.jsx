import React, { useEffect, useState } from "react";
import "./SidebarTournamentReferee.css";
import { MdManageAccounts } from "react-icons/md";
import { HiOutlineLogin } from "react-icons/hi";
import { IoLocationSharp } from "react-icons/io5";
import axios from "axios";
import api from "../../../../config";
// const data = {
//   id: 1,
//   nameTournament: "Giải Đấu STEMROBOT",
//   location: "Khu Công Nghệ Cao",
//   image:
//     "https://inuvdp.com/wp-content/uploads/2023/07/Download-File-Vector-Logo-MU-Manchester-United-02.jpg",
//   name: "Sweety ♥️🍙",
//   avatar:
//     "https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/462935228_2029932680804981_1490596864120002068_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeE1euKwzpwz2b0q_5uBtZDvAmfZeFKqrmMCZ9l4UqquY9HnweNObUXnk9hc1jUfFQ5eVRdhduR6SrOGr5Y7p3cF&_nc_ohc=CeJg3vRx8-4Q7kNvgFuiss-&_nc_zt=23&_nc_ht=scontent.fsgn2-5.fna&_nc_gid=AOgEdoeptj7GI4FqvgCad2k&oh=00_AYCqgiqXxrUJcc-AsoIpjpr5lK6u4G7fUIE1q7SIDLcdZw&oe=672A1647",
//   role: "TRỌNG TÀI",
//   email: "Sweety ♥️🍙@gmail.com",
// };


const SidebarTournamentReferee = () => {
  const [scheduleData,setScheduleData] = useState(); 
  const [dataReferee,setDataReferee] = useState();    
    useEffect(() => {
      api
        .get("/api/referees/referee-tournament")
        .then((tournament) => {
     //     console.log(tournament.data.data);
          setDataReferee(tournament.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
     
    }, []);
    useEffect(()=>{
      api
      .get("/api/refereecompetition/list-referee-competition?competitionID=1")
      .then((referee) => {
        console.log(referee);
        setScheduleData(referee.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  
    },[]);
  
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
              <img src={dataReferee?.avatar} alt="" className="referee_info_avatar" />
              <div className="referee_info_name">{dataReferee?.name}</div>
              <div className="referee_info_email">{dataReferee?.email}</div>
              <div className="referee_info_role_btnLogOut">
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
            <div className="referee_tournament_name">{dataReferee?.nameTournament}</div>
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
