import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaTrophy } from 'react-icons/fa';

import './ListContestant.css';
import AddContestant from '../component/AddContestant/AddContestant';

const ListContestant = () => {
    // Fake Vietnamese contestants data
    const contestants = [
        {
            id: 1,
            name: "Nguyễn Văn A",
            email: "nguyenvana@example.com",
            status: "Đang hoạt động",
            gender: "Nam",
            phone: "0912345678",
            image: "https://5sfashion.vn/storage/upload/images/ckeditor/4KG2VgKFDJWqdtg4UMRqk5CnkJVoCpe5QMd20Pf7.jpg",
            school: "THPT Hà Nội",
        },
        {
            id: 2,
            name: "Trần Thị B",
            email: "tranthib@example.com",
            status: "Ngưng hoạt động",
            gender: "Nữ",
            phone: "0987654321",
            image: "https://5sfashion.vn/storage/upload/images/ckeditor/4KG2VgKFDJWqdtg4UMRqk5CnkJVoCpe5QMd20Pf7.jpg",
            school: "THPT Hồ Chí Minh",
        },
        {
            id: 3,
            name: "Lê Văn C",
            email: "levanc@example.com",
            status: "Đang hoạt động",
            gender: "Nam",
            phone: "0912123456",
            image: "https://5sfashion.vn/storage/upload/images/ckeditor/4KG2VgKFDJWqdtg4UMRqk5CnkJVoCpe5QMd20Pf7.jpg",
            school: "THPT Đà Nẵng",
        },
        // Add more contestants here if needed
    ];

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const contestantsPerPage = 2;

    // State to manage modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Logic to display the current page contestants
    const indexOfLastContestant = currentPage * contestantsPerPage;
    const indexOfFirstContestant = indexOfLastContestant - contestantsPerPage;
    const currentContestants = contestants.slice(indexOfFirstContestant, indexOfLastContestant);

    // Pagination controls
    const totalPages = Math.ceil(contestants.length / contestantsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    // Function to toggle modal visibility
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="contestant-container">
            <div className="contestant-header">
                <button className="btn-add" onClick={toggleModal}>Thêm thí sinh</button>
                <button className="btn-import">Import từ Excel</button>
            </div>

            <table className="contestant-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Hình ảnh</th>
                        <th>Tên thí sinh</th>
                        <th>Email</th>
                        <th>Trạng thái</th>
                        <th>Giới tính</th>
                        <th>Số điện thoại</th>
                        <th>Trường</th>
                    </tr>
                </thead>
                <tbody>
                    {currentContestants.map((contestant) => (
                        <tr key={contestant.id}>
                            <td>{contestant.id}</td>
                            <td>
                                <img src={contestant.image} alt={contestant.name} className="contestant-image" />
                            </td>
                            <td>{contestant.name}</td>
                            <td>{contestant.email}</td>
                            <td>{contestant.status}</td>
                            <td>{contestant.gender}</td>
                            <td>{contestant.phone}</td>
                            <td>{contestant.school}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination controls with arrow icons */}
            <div className="pagination-controls">
                <button onClick={handlePreviousPage} disabled={currentPage === 1} className="pagination-btn">
                    <FaArrowLeft /> {/* Left Arrow Icon */}
                </button>
                <span className="page-info">Trang {currentPage} / {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className="pagination-btn">
                    <FaArrowRight /> {/* Right Arrow Icon */}
                </button>
            </div>

            {/* AddContestant modal */}
            {isModalOpen && <AddContestant onClose={toggleModal} />}
        </div>
    );
};

export default ListContestant;
