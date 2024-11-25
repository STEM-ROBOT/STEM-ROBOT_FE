// TeamRegister.js
import React, { useEffect, useState } from "react";
import "./TeamRegister.css";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // import icons from react-icons
import { useDispatch, useSelector } from "react-redux";
import { getTeamRegister, updateTeamRegister } from "../../../../redux/actions/TeamAction";
import { useParams } from "react-router-dom";

const teams = [
    {
        id: 1,
        image: "https://ephoto360.com/uploads/w450/2018/08/16/logo-avat-min5b7543d71cf6d_14dfbfa7e7fd2d65c95470c8cd01c651.jpg",
        name: "Team Alpha",
        members: 10,
        competition: "Soccer",
        contactPerson: "Nguyễn Văn A",
        contactPhone: "0909123456",
        registrationTime: "2024-10-05 12:00",
        status: false,
        isSetup: true,
    },
    {
        id: 2,
        image: "https://ephoto360.com/uploads/w450/2018/08/16/logo-avat-min5b7543d71cf6d_14dfbfa7e7fd2d65c95470c8cd01c651.jpg",
        name: "Team Beta",
        members: 8,
        contactPerson: "Trần Thị B",
        contactPhone: "0909234567",
        registrationTime: "2024-10-06 15:30",
        status: false,
        isSetup: false,
    },
    {
        id: 3,
        image: "https://ephoto360.com/uploads/w450/2018/08/16/logo-avat-min5b7543d71cf6d_14dfbfa7e7fd2d65c95470c8cd01c651.jpg",
        name: "Team Gamma",
        members: 12,
        contactPerson: "Lê Văn C",
        contactPhone: "0909345678",
        registrationTime: "2024-10-07 10:45",
        status: true,
        isSetup: false,
    },
    {
        id: 4,
        image: "https://ephoto360.com/uploads/w450/2018/08/16/logo-avat-min5b7543d71cf6d_14dfbfa7e7fd2d65c95470c8cd01c651.jpg",
        name: "Team Delta",
        members: 12,
        contactPerson: "Lê Văn C",
        contactPhone: "0909345678",
        registrationTime: "2024-10-07 10:45",
        status: true,
        isSetup: true,
    },
];

const TeamRegister = () => {
    const {competitionId} = useParams();
    const dispatch = useDispatch();

    const fetchedTeams = useSelector((state) => state.getTeamRegister.listTeamRegister?.data);
    const loading = useSelector((state) => state.getTeamRegister.loading);
    const isAddSuccess = useSelector((state)=>state.updateTeamRegister?.success)
  
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        dispatch(getTeamRegister(competitionId));
    }, [competitionId, dispatch,isAddSuccess]);

    useEffect(() => {
        if (fetchedTeams) {
            setTeams(fetchedTeams);
        }
    }, [fetchedTeams]);
    const getStatusClass = (status) => {
        switch (status) {
            case "Chấp nhận":
                return "accepted-team";
            case "Từ chối":
                return "rejected-team";
            default:
                return "";
        }
    };
    const handleUpdate =(id,status)=>{
         const updateStatus = {
            status:status
         }
        dispatch(updateTeamRegister(id,competitionId,updateStatus));
    }

    return (
        <div className="team-register-container">
            <div className="team-register-status-overview">
                <span className="team-register-status-info">
                    <i className="team-register-status-icon">ℹ️</i> Ở trạng thái <b>Chấp nhận</b> thì đội thi đấu sẽ không thể thay đổi được thông tin đăng ký.
                </span>
            </div>

            <div className="team-register-table">
                <div className="team-register-table-header">
                    <div className="team-register-column-header">#</div>
                    <div className="team-register-column-header">Ảnh</div>
                    <div className="team-register-column-header">Tên Đội</div>
                    <div className="team-register-column-header">Thành Viên</div>
                    <div className="team-register-column-header">Người Liên Hệ</div>
                    <div className="team-register-column-header">SĐT Liên Hệ</div>
                    <div className="team-register-column-header">T/G Đăng Ký</div>
                    <div className="team-register-column-header">Thao tác</div>
                </div>
                <div className="team-register-table-body">
                    {teams.length > 0 ? (
                        teams.map((team,index) => (
                            <div key={team.id} className="team-register-table-row">
                                <div className="team-register-table-cell">{index+1}</div>
                                <div className="team-register-table-cell">
                                    <img src={team.image} alt={team.name} className="team-register-image" />
                                </div>
                                <div className="team-register-table-cell">{team.name}</div>
                                <div className="team-register-table-cell">{team.member}</div>
                                <div className="team-register-table-cell">{team.contactInfo}</div>
                                <div className="team-register-table-cell">{team.phoneNumber}</div>
                                <div className="team-register-table-cell"> {team.registerTime ? new Date(team.registerTime).toISOString().split('T')[0] : ""}</div>
                                {team.teamId !== null || team.status === "Từ chối" ? (
                                    team.status !== "Từ chối" ? (
                                        <div className={`team-register-table-cell ${getStatusClass("Chấp nhận")}`}>
                                            Chấp nhận
                                        </div>
                                    ) : (
                                        <div className={`team-register-table-cell ${getStatusClass("Từ chối")}`}>
                                            Từ chối
                                        </div>
                                    )
                                ) : (
                                    <div className="team-register-table-cell team-register-actions">
                                        <button className="action-button accept-button" title="Accept" onClick={()=> handleUpdate(team.id,"Chấp nhận")}>
                                            <FaCheckCircle />
                                        </button>
                                        <button className="action-button cancel-button" title="Cancel" onClick={()=>handleUpdate(team.id,"Từ chối")}>
                                            <FaTimesCircle />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="team-register-no-data-message">Chưa có Đội đăng ký</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeamRegister;
