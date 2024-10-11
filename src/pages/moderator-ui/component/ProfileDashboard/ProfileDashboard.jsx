import React, { useState } from 'react';
import './ProfileDashboard.css';
import Countdown from '../Countdown/Countdown';
import Pricing from '../../../system-ui/component/Pricing/Pricing';
import ManageTournament from '../ManageTournament/ManageTournament';

const ProfileDashboard = () => {
    const tabs = [
        { name: "QUẢN LÍ GIẢI ĐẤU", key: "mytournament", component: <ManageTournament endDate="2024-10-13T23:59:59" /> },
        { name: "QUẢN LÝ ĐỘI", key: "mycompetitor", component: <Pricing /> },
        { name: "QUẢN LÝ ĐƠN HÀNG", key: "myinvoice" },
    ];

    const [activeTab, setActiveTab] = useState("mytournament");

    const handleTabClick = (tab) => {
        setActiveTab(tab.key);
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
            <div className="content-area-outer">
                <div className="content-area">
                    <div className="tab-content">
                        {tabs.find((tab) => tab.key === activeTab).component}
                    </div>
                </div>
            </div>

        </div>

    );
};

export default ProfileDashboard;
