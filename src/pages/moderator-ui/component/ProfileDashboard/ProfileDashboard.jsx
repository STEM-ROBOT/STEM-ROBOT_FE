import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ProfileDashboard.css';
import { useDispatch, useSelector } from 'react-redux';
import { InforAccountID } from '../../../../redux/actions/AccountAction';
import { FaEnvelope, FaPhone, FaSchool, FaUser } from 'react-icons/fa';

const ProfileDashboard = () => {
    const [profileInfo, setProfileInfo] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        image: ''
    });
    const tabs = [   
        { name: "QUẢN LÍ GIẢI ĐẤU", key: "my-tournament" },
        { name: "GIẢI ĐẤU ĐÃ THAM GIA", key: "tournament-adhesion" },
        { name: "QUẢN LÝ GIAO DỊCH", key: "mytransaction" },     
    ];

    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState("");
    const dispatch = useDispatch();
    const InforAccountIDs = useSelector((state) => state.getAccountID);
    useEffect(() => {
        dispatch(InforAccountID());
    }, [dispatch]);

    useEffect(() => {
        if (InforAccountIDs.success) {
            setProfileInfo({
                name: InforAccountIDs.success.name || '',
                phoneNumber: InforAccountIDs.success.phoneNumber || '',
                email: InforAccountIDs.success.email || '',
                image: InforAccountIDs.success.image || ''
            });
        }
    }, [InforAccountIDs.success]);
    const getInitial = (name) => {
        if (!name) return '';
        return name.charAt(0).toUpperCase();
    };
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
                            {profileInfo.image ? (
                                <img
                                    src={profileInfo.image}
                                    alt="Avatar"
                                    className="avatar-image"
                                />
                            ) : (
                                <span className="avatar-initial">
                                    {getInitial(profileInfo.name || profileInfo.email)}
                                </span>
                            )}
                        </div>
                        <div className="profile-details">
                            {profileInfo.name && (
                                <h3>
                                    <FaUser /> {profileInfo.name}
                                    <span className="edit-icon" onClick={()=>{navigate("/profile")}}>✎</span>
                                </h3>
                            )}
                            {profileInfo.email && (
                                <p>
                                    <FaEnvelope /> {profileInfo.email}
                                </p>
                            )}
                            {profileInfo.phoneNumber && (
                                <p>
                                    <FaPhone /> {profileInfo.phoneNumber}
                                </p>
                            )}
                            {profileInfo.schoolName ? (
                                <p>
                                    <FaSchool /> {profileInfo.schoolName}
                                </p>
                            ) : (
                                <p>
                                    <FaSchool /> Chưa có thông tin trường
                                </p>
                            )}
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
