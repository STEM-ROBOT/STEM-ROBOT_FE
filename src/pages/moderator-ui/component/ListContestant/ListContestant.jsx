import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaDownload, FaFileImport } from 'react-icons/fa';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import './ListContestant.css';
import AddContestant from '../AddContestant/AddContestant';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getListContestant } from '../../../../redux/actions/ContestantAction';
import { useParams } from 'react-router-dom';

const ListContestant = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const contestantData = useSelector((state) => state.getContestants);
    const contestants = Array.isArray(contestantData?.listContestant?.data?.Ok) ? contestantData.listContestant.data.Ok : [];
    
    const [importedContestants, setImportedContestants] = useState([]); // Store newly imported contestants
    const [currentPage, setCurrentPage] = useState(1);
    const contestantsPerPage = 3;
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(getListContestant(id));
    }, [dispatch, id]);

    const indexOfLastContestant = currentPage * contestantsPerPage;
    const indexOfFirstContestant = indexOfLastContestant - contestantsPerPage;
    const currentContestants = [...contestants, ...importedContestants].slice(indexOfFirstContestant, indexOfLastContestant);
    const totalPages = Math.ceil((contestants.length + importedContestants.length) / contestantsPerPage);

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

    const downloadTemplate = () => {
        const templateData = [
            ["ID", "Ảnh", "Tên thí sinh", "Email", "Giới tính", "Số điện thoại", "Trường"],
            ...contestants.map(contestant => [
                contestant.id,
                contestant.image, 
                contestant.name, 
                contestant.email, 
                contestant.gender, 
                contestant.phone, 
                contestant.school
            ])
        ];

        const worksheet = XLSX.utils.aoa_to_sheet(templateData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Contestants");
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, "contestant_data.xlsx");
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

            const importedData = jsonData.map((item, index) => ({
                id: item["ID"] || index + 1,
                image: item["Ảnh"] || "https://via.placeholder.com/100", // Fallback if no image URL provided
                name: item["Tên thí sinh"] || "N/A",
                email: item["Email"] || "N/A",
                gender: item["Giới tính"] || "N/A",
                phone: item["Số điện thoại"] || "N/A",
                school: item["Trường"] || "N/A",
            }));

            setImportedContestants(importedData); // Set imported data as additional contestants
        };
        reader.readAsArrayBuffer(file);
    };

    const saveContestantsToDB = async () => {
        try {
            const allContestants = [...contestants, ...importedContestants];
            await axios.post('/api/contestants', { contestants: allContestants });
            alert('Thí sinh đã được lưu thành công!');
        } catch (error) {
            console.error('Lỗi khi lưu thí sinh:', error);
            alert('Lỗi khi lưu thí sinh!');
        }
    };

    return (
        <div className="contestant-container">
            <div className="contestant-header">
                <div className='contestant-header-left'>
                    <button className="btn-add" onClick={toggleModal}>Thêm thí sinh</button>
                </div>
                <div className='contestant-header-right'>
                    <button className="btn-import" onClick={downloadTemplate}>
                        <FaDownload className="icon-download" /> Tải file Excel
                    </button>
                    <label htmlFor="file-upload" className="btn-import">
                        <FaFileImport className="icon-import" /> Nhập từ Excel
                    </label>
                    <input id="file-upload" type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className="input-file-hidden" />
                </div>
            </div>

            <table className="contestant-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Hình ảnh</th>
                        <th>Tên thí sinh</th>
                        <th>Email</th>
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
                            <td>{contestant.gender}</td>
                            <td>{contestant.phone}</td>
                            <td>{contestant.school}</td>
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

            <button className="btn-save" onClick={saveContestantsToDB}>Lưu thí sinh</button>

            {isModalOpen && <AddContestant onClose={toggleModal} />}
        </div>
    );
};

export default ListContestant;
