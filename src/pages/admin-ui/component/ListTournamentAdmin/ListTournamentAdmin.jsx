import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getListTournament } from '../../../../redux/actions/TournamentAction';
import { FaArrowLeft, FaArrowRight, FaTrophy } from 'react-icons/fa';

const ListTournamentAdmin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const tournamentsData = useSelector((state) => state.getTournamentList);
    const tournaments = Array.isArray(tournamentsData?.listTournament?.data) ? tournamentsData.listTournament.data : [];

    const [currentPage, setCurrentPage] = useState(1);
    const tournamentsPerPage = 3;

    useEffect(() => {
        dispatch(getListTournament()); // Dispatch the action to fetch tournaments
    }, [dispatch]);

    const indexOfLastTournament = currentPage * tournamentsPerPage;
    const indexOfFirstTournament = indexOfLastTournament - tournamentsPerPage;
    const currentTournaments = tournaments.slice(indexOfFirstTournament, indexOfLastTournament);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(tournaments.length / tournamentsPerPage);

    const handleTournamentClick = (tournamentId) => {
        navigate(`/admin/tournament/${tournamentId}/competitions`);
    };

    if (tournaments.length === 0) {
        return <div>Đang chờ giải đấu</div>;
    }
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
                            <p>{tournament.location}</p>
                            <div className={`tournament-status ${tournament.status === "Public" ? "status-public" : "status-private"}`}>
                                {tournament.status}
                            </div>
                        </div>
                        <div className="tournament-participants">
                            <div className="participants-bar">
                                <div
                                    className="participants-progress"
                                    style={{
                                        width: `${(tournament.isActive / tournament.genre) * 100}%`,
                                    }}
                                ></div>
                                <span className="participants-text">{tournament.isActive} / {tournament.genre}</span>
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
    )
}

export default ListTournamentAdmin