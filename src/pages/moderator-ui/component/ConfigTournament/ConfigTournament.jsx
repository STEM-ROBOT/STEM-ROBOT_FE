import React, { useState } from 'react';
import './ConfigTournament.css';
import logo from '../../../../assets/images/header.png'
import TournamentForm from '../TournamentForm/TournamentForm';
import CreateTournamentInfo from '../CreateTournamentInfo/CreateTournamentInfo';
import CreateTournamentCompetition from '../CreateTournamentCompetition/CreateTournamentCompetition';
import ExcelUploadComponent from '../ExcelUploadComponent/ExcelUploadComponent';
import ImportRule from '../ImportRule/ImportRule';
import CreateTournamentFormat from '../CreateTournamentFormat/CreateTournamentFormat';
const sections = [
    { title: "Tạo Hình Thức", content: <CreateTournamentFormat/> },
    // { title: "Thể thức và môn thi đấu", content: <CreateTournamentCompetition/> },
    { title: "Thêm luật lệ", content: <ImportRule/>},
    { title: "Thêm bảng điểm", content: <ExcelUploadComponent/>},
];

const ConfigTournament = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="config-tournament">
            {/* <div className="image-container">
                <img src={logo} alt="Cấu hình giải đấu" />              
            </div> */}

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
