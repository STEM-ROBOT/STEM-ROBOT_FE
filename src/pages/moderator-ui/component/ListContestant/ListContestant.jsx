import React, { useEffect, useState } from 'react';
import { FaDownload, FaFileImport, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import './ListContestant.css';
import AddContestant from '../AddContestant/AddContestant';
import { useDispatch, useSelector } from 'react-redux';
import { addContestant, getListContestant } from '../../../../redux/actions/ContestantAction';
import { useParams } from 'react-router-dom';

const ListContestant = () => {
    const { id: tournamentId } = useParams();
    const schoolName = "Trường Di Linh";

    const dispatch = useDispatch();
    const contestantData = useSelector((state) => state.getContestants);
    const contestants = Array.isArray(contestantData?.listContestant?.data?.data) ? contestantData.listContestant.data.data : [];
    const [updatedContestants, setUpdatedContestants] = useState([]);
    const [newContestantsToAdd, setNewContestantsToAdd] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const contestantsPerPage = 5;
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        dispatch(getListContestant(tournamentId));
    }, [dispatch, tournamentId]);

    useEffect(() => {
        // Only update if contestants array has changed
        if (JSON.stringify(updatedContestants) !== JSON.stringify(contestants)) {
            setUpdatedContestants(contestants);
        }
    }, [contestants]);

    useEffect(() => {
        setUpdatedContestants(updatedContestants);
    }, [updatedContestants]);

    const uniqueContestantsWithDetails = updatedContestants.map(contestant => ({
        tournamentId,
        name: contestant.name,
        email: contestant.email,
        gender: contestant.gender,
        phone: contestant.phone,
        image: contestant.image,
        schoolName
    }));

    const totalPages = Math.ceil(uniqueContestantsWithDetails.length / contestantsPerPage);
    const indexOfLastContestant = currentPage * contestantsPerPage;
    const indexOfFirstContestant = indexOfLastContestant - contestantsPerPage;
    const currentContestants = uniqueContestantsWithDetails.slice(indexOfFirstContestant, indexOfLastContestant);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const downloadTemplate = () => {
        const templateData = [
            ["STT", "Ảnh", "Tên thí sinh", "Email", "Giới tính", "Số điện thoại"],
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
        if (!file) return;
    
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
    
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
            const importedData = jsonData.map((item, index) => ({
                stt: index + 1,
                image: item["Ảnh"] || "https://via.placeholder.com/100",
                name: item["Tên thí sinh"] || "N/A",
                email: item["Email"] || "N/A",
                gender: item["Giới tính"] || "N/A",
                phone: item["Số điện thoại"] || "N/A",
                tournamentId,
                schoolName
            }));
    
            const newContestants = importedData.filter(
                newContestant => !updatedContestants.some(existing => existing.email === newContestant.email)
            );
            if (newContestants.length > 0) {
                const mappedNewContestants = newContestants.map((item) => ({
                    name: item.name,
                    email: item.email,
                    gender: item.gender,
                    phone: item.phone,
                    image: item.image,
                    schoolName
                }));
                console.log("mappedNewContestants", mappedNewContestants);
    
                // Dùng spread operator để thêm vào updatedContestants
                setUpdatedContestants(prev => [...prev, ...mappedNewContestants]);
                setNewContestantsToAdd(mappedNewContestants);
                setHasChanges(true);
            }
        };
    
        reader.readAsArrayBuffer(file);
    };
    
    console.log(updatedContestants)
    console.log(newContestantsToAdd)

    const saveContestantsToDB = () => {
        const payload = newContestantsToAdd.map(contestant => ({
            name: contestant.name,
            email: contestant.email,
            gender: contestant.gender,
            phone: contestant.phone ? String(contestant.phone) : "",
            image: contestant.image,
            schoolName: contestant.schoolName,
        }));

        console.log("Payload sent:", payload);
        dispatch(addContestant(tournamentId,payload));
        setHasChanges(false);
        setNewContestantsToAdd([]);
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
                        <th>STT</th>
                        <th>Hình ảnh</th>
                        <th>Tên thí sinh</th>
                        <th>Email</th>
                        <th>Giới tính</th>
                        <th>Số điện thoại</th>
                        <th>Trường</th>
                    </tr>
                </thead>
                <tbody>
                    {currentContestants.map((contestant, index) => (
                        <tr key={index}>
                            <td>{indexOfFirstContestant + index + 1}</td>
                            <td>
                                <img src={contestant.image} alt={contestant.name} className="contestant-image" />
                            </td>
                            <td>{contestant.name}</td>
                            <td>{contestant.email}</td>
                            <td>{contestant.gender}</td>
                            <td>{contestant.phone}</td>
                            <td>{contestant.schoolName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination-controls">
                <button onClick={handlePreviousPage} disabled={currentPage === 1} className="pagination-btn">
                    <FaArrowLeft /> Trước
                </button>
                <span>Trang {currentPage} / {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className="pagination-btn">
                    Tiếp <FaArrowRight />
                </button>
            </div>

            {hasChanges && (
                <button className="btn-save" onClick={saveContestantsToDB}>Lưu thí sinh</button>
            )}

            {isModalOpen && <AddContestant onClose={toggleModal} />}
        </div>
    );
};

export default ListContestant;
