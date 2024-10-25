import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaDownload, FaFileImport } from 'react-icons/fa';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx'; // Import XLSX for reading Excel files
import './ListContestant.css';
import AddContestant from '../component/AddContestant/AddContestant';
import { useDispatch, useSelector } from 'react-redux';
import { getListContestant } from '../../../redux/actions/ContestantAction';

const ListContestant = () => {
    const dispatch =useDispatch();
    useEffect(()=>{
      dispatch(getListContestant())
    },[dispatch])
    
    // const listContestant = useSelector((state) => state.getOrder.listOrders);


    const [contestants, setContestants] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const contestantsPerPage = 3;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const indexOfLastContestant = currentPage * contestantsPerPage;
    const indexOfFirstContestant = indexOfLastContestant - contestantsPerPage;
    const currentContestants = contestants?.slice(indexOfFirstContestant, indexOfLastContestant);
    const totalPages = Math.ceil(contestants?.length / contestantsPerPage);

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
        // Map data from contestants to Excel format (without status)
        const templateData = [
            ["ID", "Tên thí sinh", "Email", "Giới tính", "Số điện thoại", "Trường"],
            ...contestants?.map(contestant => [
                contestant.id, 
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

            // Map imported data to the contestant structure (without status)
            const importedContestants = jsonData.map((item, index) => ({
                id: item["ID"] || index + 1, // Assign ID if missing
                name: item["Tên thí sinh"],
                email: item["Email"],
                gender: item["Giới tính"],
                phone: item["Số điện thoại"],
                school: item["Trường"],
                image: "https://5sfashion.vn/storage/upload/images/ckeditor/4KG2VgKFDJWqdtg4UMRqk5CnkJVoCpe5QMd20Pf7.jpg" // Placeholder image
            }));

            // Update the contestants state with imported data
            setContestants(importedContestants);
        };
        reader.readAsArrayBuffer(file);
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
                    {currentContestants?.map((contestant) => (
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
                    <FaArrowLeft /> {/* Left Arrow Icon */}
                </button>
                <span className="page-info">Trang {currentPage} / {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className="pagination-btn">
                    <FaArrowRight /> {/* Right Arrow Icon */}
                </button>
            </div>

            {isModalOpen && <AddContestant onClose={toggleModal} />}
        </div>
    );
};

export default ListContestant;
