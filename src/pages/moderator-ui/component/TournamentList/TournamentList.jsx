import React, { useState } from 'react';
import { FaTableTennis, FaArrowLeft, FaArrowRight, FaTrophy } from 'react-icons/fa'; // Import FaTrophy for the icon
import { useNavigate } from 'react-router-dom'; 
import './TournamentList.css';

const TournamentList = () => {
    const navigate = useNavigate();

    const tournaments = [
        {
            id: 1,
            name: "World Cup 2024",
            type: "Loại Trực Tiếp || Bóng Bàn || Thành Lê Đình || Qatar",
            status: "Chưa kích hoạt",
            icon: <FaTableTennis />,
            participants: "0 / 2"
        },
        {
            id: 2,
            name: "Euro Cup 2024",
            type: "Loại Trực Tiếp || Bóng Đá || Thành Lê Đình || France",
            status: "Chưa kích hoạt",
            icon: <FaTableTennis />,
            participants: "0 / 4"
        },
        {
            id: 3,
            name: "Asia Cup 2024",
            type: "Loại Trực Tiếp || Bóng Chuyền || Thành Lê Đình || Japan",
            status: "Chưa kích hoạt",
            icon: <FaTableTennis />,
            participants: "0 / 6"
        },
        {
            id: 4,
            name: "Copa America 2024",
            type: "Loại Trực Tiếp || Bóng Đá || Thành Lê Đình || Brazil",
            status: "Chưa kích hoạt",
            icon: <FaTableTennis />,
            participants: "0 / 2"
        },
        {
            id: 5,
            name: "Olympics 2024",
            type: "Loại Trực Tiếp || Điền Kinh || Thành Lê Đình || USA",
            status: "Chưa kích hoạt",
            icon: <FaTableTennis />,
            participants: "0 / 5"
        }
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const tournamentsPerPage = 3;

    const indexOfLastTournament = currentPage * tournamentsPerPage;
    const indexOfFirstTournament = indexOfLastTournament - tournamentsPerPage;
    const currentTournaments = tournaments.slice(indexOfFirstTournament, indexOfLastTournament);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(tournaments.length / tournamentsPerPage);

    const handleTournamentClick = (id) => {
        navigate(`/mytournament/${id}/mycompetition`);
    };

    return (
        <div className="tournament-container">
            <div className="tournament-header">
                <h2>
                    <FaTrophy className="trophy-icon" /> {/* Add the trophy icon here */}
                    Giải đấu đã tạo
                </h2>
                <button className="create-tournament-btn">Tạo Giải Đấu</button>
            </div>

            <div className="tournament-list">
                {currentTournaments.map((tournament, index) => (
                    <div 
                        key={index} 
                        className="tournament-card" 
                        onClick={() => handleTournamentClick(tournament.id)} 
                    >
                        <div className="tournament-icon">{tournament.icon}</div>
                        <div className="tournament-info">
                            <h3>{tournament.name}</h3>
                            <p>{tournament.type}</p>
                            <span className="tournament-status">{tournament.status}</span>
                        </div>
                        <div className="tournament-participants">
                            <div className="participants-bar">
                                <span>{tournament.participants}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pagination">
                <button 
                    onClick={() => paginate(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className="pagination-arrow"
                >
                    <FaArrowLeft />
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`page-number ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button 
                    onClick={() => paginate(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                    className="pagination-arrow"
                >
                    <FaArrowRight />
                </button>
            </div>
        </div>
    );
};

export default TournamentList;
