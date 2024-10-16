import React, { useState } from 'react';
import './ConfigTournament.css';
import logo from '../../../../assets/images/header.png'
import TournamentForm from '../TournamentForm/TournamentForm';
const sections = [
    { title: "Thông tin cơ bản", content: <TournamentForm/> },
    { title: "Thể thức và môn thi đấu", content: "Nội dung về thể thức và môn thi đấu..." },
    { title: "Tranh hạng ba và đóng / mở đăng ký", content: "Nội dung về tranh hạng ba..." },
    { title: "Đường dẫn tới giải đấu", content: "Nội dung về đường dẫn..." },
];

const ConfigTournament = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="config-tournament">
            <div className="image-container">
                <img src={logo} alt="Cấu hình giải đấu" />              
            </div>

            <div className="accordion">
                {sections.map((section, index) => (
                    <div key={index} className="accordion-item">
                        <div className="accordion-title" onClick={() => handleToggle(index)}>
                            <span>{section.title}</span>
                            <span>{activeIndex === index ? '-' : '+'}</span>
                        </div>
                        {activeIndex === index && (
                            <div className="accordion-content">
                                {section.content}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ConfigTournament;
