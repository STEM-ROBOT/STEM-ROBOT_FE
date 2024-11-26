import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './InfoTournament.css';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoTournament } from '../../../../redux/actions/TournamentAction';
import { FaArrowLeft } from 'react-icons/fa';

const InfoTournament = () => {
    const { tournamentId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // Tab cấu hình
    const tabs = [
        { name: "QUẢN LÍ NỘI DUNG", key: "mycompetition" },
        { name: "DANH SÁCH THÍ SINH", key: "contestant" },
        { name: "DANH SÁCH TRỌNG TÀI", key: "refee" },
        // { name: "TÙY CHỈNH", key: "settings" },
    ];

    const [activeTab, setActiveTab] = useState("");


    const tournamentInfo = useSelector((state) => state.infoTournament?.tournamentInfo?.data);
    const loading = useSelector((state) => state.infoTournament.loading);
    const error = useSelector((state) => state.infoTournament.error);

    useEffect(() => {
        if (tournamentId) {
            dispatch(getInfoTournament(tournamentId));
        }
    }, [tournamentId, dispatch]);

    useEffect(() => {
        const currentPath = location.pathname.split("/").pop();
        const matchedTab = tabs.find(tab => tab.key === currentPath);
        if (matchedTab) {
            setActiveTab(matchedTab.key);
        }
    }, [location.pathname]);

    const handleTabClick = (tab) => {
        setActiveTab(tab.key);
        navigate(`/mytournament/${tournamentId}/${tab.key}`);
    };

    return (
        <div className="info_tournaments">
            <div className='info_tournament_container'>

                <div className="info_tournament_content">
                    <div className="tournaments-back" onClick={() => navigate(`/account/mytournament`)}>
                        <FaArrowLeft className="back-icon" />
                    </div>
                    <div className="tournament_bar">
                        <div className="bar_content">
                            <div className="bar_content_img">
                                <img
                                    // src={tournamentInfo?.image || "https://th.bing.com/th/id/OIP.hxGHyd4kfFtlAo7snGkXLgAAAA?rs=1&pid=ImgDetMain"} 
                                    src={tournamentInfo?.image || "https://th.bing.com/th/id/OIP.hxGHyd4kfFtlAo7snGkXLgAAAA?rs=1&pid=ImgDetMain"}
                                    alt={tournamentInfo?.name || "Tournament"}
                                    className="bar_img"
                                />
                            </div>
                            <div className="bar_content_info">
                                <div className="bar_title">
                                    <span>{tournamentInfo?.name || "Tournament Name"}</span>
                                </div>
                                <div className="bar_detail">
                                    <span>
                                        {tournamentInfo?.location || "Tournament Location"}
                                    </span>
                                </div>
                                <div className="bar_stats">
                                    <div className="tooltip">
                                        <span>👥 {tournamentInfo?.numberTeam || 0}</span>
                                        <div className="tooltip_text">Số đội trong giải</div>
                                    </div>

                                    <div className="tooltip">
                                        <span>👁️ 191</span>
                                        <div className="tooltip_text">Lượt xem</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tab điều hướng */}
                    <div className="tab-navigation">
                        {tabs.map((tab) => (
                            <div
                                key={tab.key}
                                className={`tab-item ${activeTab === tab.key ? "active" : ""}`}
                                onClick={() => handleTabClick(tab)}
                            >
                                {tab.name}
                                {activeTab === tab.key && <div className="indicator"></div>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoTournament;
