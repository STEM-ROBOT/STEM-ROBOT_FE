import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './InfoTournament.css';

const InfoTournament = () => {
    const { id } = useParams(); 
    const tabs = [
        { name: "QUẢN LÍ NỘI DUNG", key: "mycompetition" },
        { name: "DANH SÁCH THÍ SINH", key: "contestant" },
    ];

    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState("");

    useEffect(() => {
        const currentPath = location.pathname.split("/").pop();
        const matchedTab = tabs.find(tab => tab.key === currentPath);
        if (matchedTab) {
            setActiveTab(matchedTab.key);
        } else {
          
        }
    }, [location.pathname, navigate, id]);

    const handleTabClick = (tab) => {
        setActiveTab(tab.key);
        navigate(`/mytournament/${id}/${tab.key}`); 
    };

    return (
        <div className="info_tournament">
            <div className='info_tournament_container'>
                <div className="info_tournament_content">
                    <div className="tournament_bar">
                        <div className="bar_content">
                            <div className="bar_content_img">
                                <img
                                    src="https://th.bing.com/th/id/OIP.7HSEMd30tk4S_tCOunvBXAHaEK?w=331&h=186&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                                    alt="Tournament"
                                    className="bar_img"
                                />
                            </div>
                            <div className="bar_content_info">
                                <div className="bar_title">
                                    <span>ROBOCON THPT VIP PRO - 2024</span>
                                </div>
                                <div className="bar_detail">
                                    <span>
                                        Chia bảng đấu || Khu công nghiệp Quốc tế Protrade, Đường tỉnh
                                        744, An Tây, Bến Cát, Bình Dương, Việt Nam
                                    </span>
                                </div>
                                <div className="bar_stats">
                                    <div className="tooltip">
                                        <span>👥 14</span>
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
