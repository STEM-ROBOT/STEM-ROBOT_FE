import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaDownload, FaFileImport } from 'react-icons/fa';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx'; // Import XLSX for reading Excel files
import './ListReferee.css';

const ListReferee = () => {
    const [referees, setReferees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const refereesPerPage = 3;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const indexOfLastReferee = currentPage * refereesPerPage;
    const indexOfFirstReferee = indexOfLastReferee - refereesPerPage;
    const currentReferees = referees?.slice(indexOfFirstReferee, indexOfLastReferee);
    const totalPages = Math.ceil(referees?.length / refereesPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    // Function to download the Excel template
    const downloadTemplate = () => {
        const templateData = [
            ["ID", "Tên trọng tài", "Email", "Số điện thoại", "Hình ảnh"],
            ...referees.map(referee => [
                referee.id, 
                referee.name, 
                referee.email, 
                referee.phone, 
                referee.image
            ])
        ];
        
        const worksheet = XLSX.utils.aoa_to_sheet(templateData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Referees");
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, "referee_data.xlsx");
    };

    // Function to handle file input (import Excel)
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            const importedReferees = jsonData.map((item, index) => ({
                id: item["ID"] || index + 1,
                name: item["Tên trọng tài"],
                email: item["Email"],
                phone: item["Số điện thoại"],
                image: item["Hình ảnh"] || "https://via.placeholder.com/50" // Placeholder image
            }));

            setReferees(importedReferees);
        };
        reader.readAsArrayBuffer(file);
    };

    return (
        <div className="referee-container">
            <div className="referee-header">
                <div className='referee-header-left'>
                    <button className="btn-add" onClick={toggleModal}>Thêm trọng tài</button>
                </div>
                <div className='referee-header-right'>
                    <button className="btn-import" onClick={downloadTemplate}>
                        <FaDownload className="icon-download" /> Tải file Excel
                    </button>
                    <label htmlFor="file-upload" className="btn-import">
                        <FaFileImport className="icon-import" /> Nhập từ Excel
                    </label>
                    <input id="file-upload" type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className="input-file-hidden" />
                </div>
            </div>

            <table className="referee-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Hình ảnh</th>
                        <th>Tên trọng tài</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                    </tr>
                </thead>
                <tbody>
                    {currentReferees.map((referee) => (
                        <tr key={referee.id}>
                            <td>{referee.id}</td>
                            <td>
                                <img src={referee.image} alt={referee.name} className="referee-image" />
                            </td>
                            <td>{referee.name}</td>
                            <td>{referee.email}</td>
                            <td>{referee.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination-controls">
                <button onClick={handlePreviousPage} disabled={currentPage === 1} className="pagination-btn">
                    <FaArrowLeft />
                </button>
                <span className="page-info">Trang {currentPage} / {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className="pagination-btn">
                    <FaArrowRight />
                </button>
            </div>

            {isModalOpen && <AddContestant onClose={toggleModal} />} {/* Placeholder for modal */}
        </div>
    );
};

export default ListReferee;
