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
            genre: "Bóng Bàn",
            location:"Quater",
            status: "Private",
            image:"https://th.bing.com/th/id/R.e3ac59766e285f0fbcae869b1f65c555?rik=AKlFpX0Q%2femKQA&pid=ImgRaw&r=0",
            participants: "0 / 2"
        },
        {
            id: 2,
            name: "World Cup 2024",
            genre: "Bóng Bàn",
            location:"Quater",
            status: "Private",
            image:"https://th.bing.com/th/id/R.e3ac59766e285f0fbcae869b1f65c555?rik=AKlFpX0Q%2femKQA&pid=ImgRaw&r=0",
            participants: "0 / 2"
        },
        {
            id: 3,
            name: "World Cup 2024",
            genre: "Bóng Bàn",
            location:"Quater",
            status: "Public",
            image:"https://th.bing.com/th/id/R.e3ac59766e285f0fbcae869b1f65c555?rik=AKlFpX0Q%2femKQA&pid=ImgRaw&r=0",
            participants: "0 / 2"
        },
        {
            id: 4,
            name: "World Cup 2024",
            genre: "Bóng Bàn",
            location:"Quater",
            status: "Private",
            image:"https://th.bing.com/th/id/R.e3ac59766e285f0fbcae869b1f65c555?rik=AKlFpX0Q%2femKQA&pid=ImgRaw&r=0",
            participants: "0 / 2"
        },
        {
            id: 5,
            name: "World Cup 2024",
            genre: "Bóng Bàn",
            location:"Quater",
            status: "Public",
            image:"https://th.bing.com/th/id/R.e3ac59766e285f0fbcae869b1f65c555?rik=AKlFpX0Q%2femKQA&pid=ImgRaw&r=0",
            participants: "0 / 2"
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
                    <FaTrophy className="trophy-icon" /> Giải đấu đã tạo
                </h2>
                <button className="create-tournament-btn">Tạo Giải Đấu</button>
            </div>

            <div className="tournament-list">
                {currentTournaments.map((tournament) => (
                    <div 
                        key={tournament.id} 
                        className="tournament-card" 
                        onClick={() => handleTournamentClick(tournament.id)} 
                    >
                        <img 
                            src={tournament.image} 
                            alt={tournament.name} 
                            className="tournament-image" 
                        />
                        <div className="tournament-info">
                            <h3>{tournament.name}</h3>
                            <p>{tournament.genre} || {tournament.location}</p>
                            <div className={`tournament-status ${tournament.status === "Public" ? "status-public" : "status-private"}`}>
                                {tournament.status}
                            </div>
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