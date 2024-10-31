import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaDownload, FaFileImport } from 'react-icons/fa';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import './ListReferee.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addReferee, getListReferee } from '../../../../redux/actions/RefereeAction';

const ListReferee = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const getReferees = useSelector((state) => state.getReferee);
    const refereesList = Array.isArray(getReferees?.listReferee?.data?.success.data) ? getReferees?.listReferee?.data?.success.data : [];

    const [referees, setReferees] = useState([]);
    const [newRefereesToAdd, setNewRefereesToAdd] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1);
    const refereesPerPage = 3;
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        dispatch(getListReferee(id));
    }, [ dispatch]);

    useEffect(() => {
        setReferees(refereesList);
    }, [refereesList]);

    const totalPages = Math.ceil(referees.length / refereesPerPage);
    const indexOfLastReferee = currentPage * refereesPerPage;
    const indexOfFirstReferee = indexOfLastReferee - refereesPerPage;
    const currentReferees = referees.slice(indexOfFirstReferee, indexOfLastReferee);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
    };

    const downloadTemplate = () => {
        const templateData = [
            ["STT", "Tên trọng tài", "Email", "Số điện thoại", "Hình ảnh"],
        ];

        const worksheet = XLSX.utils.aoa_to_sheet(templateData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Referees");
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, "referee_data.xlsx");
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];

            const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
            const importedReferees = jsonData.map(item => ({
                name: item["Tên trọng tài"],
                email: item["Email"],
                phoneNumber: item["Số điện thoại"],
                image: item["Hình ảnh"] || "https://via.placeholder.com/50",
            }));
          
            // Lọc trọng tài không trùng
            const newReferees = importedReferees.filter(
                newReferee => !referees.some(existing => existing.email === newReferee.email)
            );

            // Nếu có trọng tài không trùng, thêm vào danh sách hiển thị và cập nhật danh sách mới
            if (newReferees.length > 0) {
                setReferees((prev) => [...prev, ...newReferees]);
                setNewRefereesToAdd(newReferees); // Lưu trọng tài không trùng vào biến riêng
                setHasChanges(true); // Đánh dấu có thay đổi để hiển thị nút lưu
            }
        };

        reader.readAsArrayBuffer(file);
    };

    const saveRefereesToDB = () => {
        // Chỉ lưu trọng tài mới từ `newRefereesToAdd`
        const payload = newRefereesToAdd.map(referee => ({
            tournamentId:id,
            name: referee.name,
            email: referee.email,
            phoneNumber: referee.phoneNumber ? String(referee.phoneNumber) : "",
            image: referee.image,
            status:"active",
        }));

        console.log("Payload gửi đi:", payload);
        dispatch(addReferee(payload));
        setHasChanges(false);
        setNewRefereesToAdd([]); // Xóa danh sách trọng tài mới sau khi lưu
    };

    return (
        <div className="referee-container">
            <div className="referee-header">
                <div className='referee-header-left'>
                    <button className="btn-add" onClick={() => { }}>Thêm trọng tài</button>
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
                        <th>STT</th>
                        <th>Hình ảnh</th>
                        <th>Tên trọng tài</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                    </tr>
                </thead>
                <tbody>
                    {currentReferees.map((referee, index) => (
                        <tr key={referee.id || index}>
                            <td>{indexOfFirstReferee + index + 1}</td>
                            <td>
                                <img src={referee.image} alt={referee.name} className="referee-image" />
                            </td>
                            <td>{referee.name}</td>
                            <td>{referee.email}</td>
                            <td>{referee.phoneNumber}</td>
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

            {hasChanges && (
                <button className="btn-save" onClick={saveRefereesToDB}>Lưu trọng tài</button>
            )}
        </div>
    );
};

export default ListReferee;
