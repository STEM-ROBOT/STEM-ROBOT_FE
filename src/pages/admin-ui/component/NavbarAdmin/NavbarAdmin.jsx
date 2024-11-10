import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './NavbarAdmin.css'

const NavbarAdmin = () => {
    
    const [active, setActive] = useState('competitions'); 
    const navigate = useNavigate(); 
    const { tournamentId } = useParams(); 
  
    const handleNavigation = (path, tab) => {
      setActive(tab); 
      navigate(path); 
    };
    return (
        <nav className="navbar-container-component">
            <ul className="navbar-list-items-container">
                <li
                    className={`navbar-list-item-link ${active === 'competitions' ? 'navbar-item-link-active' : ''}`}
                    onClick={() => handleNavigation(`/admin/tournament/${tournamentId}/competitions`, 'competitions')}
                >
                    Nội dung thi đấu
                </li>
                <li
                    className={`navbar-list-item-link ${active === 'contestants' ? 'navbar-item-link-active' : ''}`}
                    onClick={() => handleNavigation(`/admin/tournament/${tournamentId}/contestants`, 'contestants')}
                >
                    Danh sách thí sinh
                </li>
                <li
                    className={`navbar-list-item-link ${active === 'referees' ? 'navbar-item-link-active' : ''}`}
                    onClick={() => handleNavigation(`/admin/tournament/${tournamentId}/referees`, 'referees')}
                >
                    Danh sách trọng tài
                </li>
            </ul>
        </nav>
    )
}

export default NavbarAdmin