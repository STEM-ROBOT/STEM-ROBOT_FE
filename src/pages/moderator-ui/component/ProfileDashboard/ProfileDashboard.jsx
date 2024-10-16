import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ProfileDashboard.css';

const ProfileDashboard = () => {
    const tabs = [
        { name: "QUẢN LÍ GIẢI ĐẤU", key: "mytournament" },
        { name: "QUẢN LÝ GÓI", key: "myinvoice" },
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
    }, [location.pathname, navigate]);

    const handleTabClick = (tab) => {
        setActiveTab(tab.key);
        navigate(`/account/${tab.key}`);
    };

    return (
        <div className="profile-dashboard-outer">
            <div className="profile-dashboard">
                <div className='profile-dashboard-content'>
                <div className="profile-info">
                        <div className="profile-avatar">
                            <span className="avatar-initial">T</span>
                        </div>
                        <div className="profile-details">
                            <h3>Thành Lê Đình <span className="edit-icon">✎</span></h3>
                            <p><i className="fa fa-envelope"></i> xuanthanh01122003@gmail.com</p>
                            <p><i className="fa fa-phone"></i> Chưa cập nhật</p>
                            <p><i className="fa fa-calendar"></i> Chưa cập nhật</p>
                            <div className="email-warning">
                                <i className="fa fa-exclamation-triangle"></i> Chưa kích hoạt email
                                <button className="resend-email-btn">Gửi lại Email</button>
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

export default ProfileDashboard;
