import React, { useEffect, useState } from 'react';
import { FaDownload, FaFileImport, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import './ListContestant.css';
import AddContestant from '../AddContestant/AddContestant';
import { useDispatch, useSelector } from 'react-redux';
import { addContestant, getListContestant } from '../../../../redux/actions/ContestantAction';
import { useParams } from 'react-router-dom';
import TokenService from '../../../../config/tokenservice';
import NoItem from '../../../system-ui/component/NoItems/NoItem';
import LoadingComponent from '../../../system-ui/component/Loading/LoadingComponent';
import { toast } from 'react-toastify';

const ListContestant = () => {
    const { tournamentId } = useParams();
    const schoolName = TokenService.getSchoolName();
    const role = TokenService.getUserRole();

    const dispatch = useDispatch();
    const { listContestant, loading: loadingList } = useSelector((state) => state.getContestants);
    const { success: isAddSuccess, loading: loadingAdd } = useSelector((state) => state.addContestant);

    const [updatedContestants, setUpdatedContestants] = useState([]);
    const [newContestantsToAdd, setNewContestantsToAdd] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasChanges, setHasChanges] = useState(false);

    const contestantsPerPage = 5;

    useEffect(() => {
        dispatch(getListContestant(tournamentId));
    }, [dispatch, tournamentId, isAddSuccess]);

    useEffect(() => {
        if (listContestant?.data?.data) {
            setUpdatedContestants(listContestant.data.data);
        }
    }, [listContestant]);

    const handlePagination = (direction) => {
        setCurrentPage((prev) => prev + direction);
    };

    const downloadTemplate = () => {
        const commonTemplateData = [
            ["STT", "Ảnh", "Tên thí sinh", "Email", "Giới tính", "Số điện thoại"],
        ];
        const adminAdditionalFields = ["Trường"];
        const templateData =
            role === "AD"
                ? [...commonTemplateData[0], ...adminAdditionalFields]
                : commonTemplateData[0];
    
        const worksheet = XLSX.utils.aoa_to_sheet([templateData]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Contestants");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "contestant_data.xlsx");
    };
    

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;
    
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const workbook = XLSX.read(new Uint8Array(e.target.result), { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
    
                // Define expected headers based on role
                const baseHeaders = ["STT", "Ảnh", "Tên thí sinh", "Email", "Giới tính", "Số điện thoại"];
                const adminHeaders = ["Trường"];
                const expectedHeaders = role === "AD" ? [...baseHeaders, ...adminHeaders] : baseHeaders;
    
                // Get headers from the file
                const fileHeaders = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0] || [];
    
                // Normalize headers to lowercase and trim spaces for robust comparison
                const normalizedExpectedHeaders = expectedHeaders.map((header) => header.toLowerCase().trim());
                const normalizedFileHeaders = fileHeaders.map((header) => String(header).toLowerCase().trim());
    
                // Check if file headers match the expected headers
                const isValidFile = normalizedExpectedHeaders.every((header) => normalizedFileHeaders.includes(header));
    
                if (!isValidFile) {
                    toast.error("File Excel không đúng định dạng! Vui lòng sử dụng tệp mẫu được cung cấp.");
                    return;
                }
    
                // Process the valid data
                const importedData = jsonData.map((item, index) => ({
                    stt: index + 1,
                    image: item["Ảnh"] || "https://via.placeholder.com/100",
                    name: item["Tên thí sinh"] || "N/A",
                    email: item["Email"] || "N/A",
                    gender: item["Giới tính"] || "N/A",
                    phone: item["Số điện thoại"] || "N/A",
                    schoolName: role === "AD" ? item["Trường"] || "N/A" : schoolName,
                    tournamentId,
                }));
    
                // Filter out existing contestants to prevent duplicates
                const newContestants = importedData.filter(
                    (newContestant) => !updatedContestants.some((existing) => existing.email === newContestant.email)
                );
    
                if (newContestants.length > 0) {
                    setUpdatedContestants((prev) => [...prev, ...newContestants]);
                    setNewContestantsToAdd(newContestants);
                    setHasChanges(true);
                } else {
                    toast.info("Không có thí sinh mới nào được thêm.");
                }
            } catch (error) {
                toast.error("Đã xảy ra lỗi khi xử lý tệp. Vui lòng thử lại.");
                console.error("File upload error:", error);
            }
        };
    
        reader.readAsArrayBuffer(file);
    };
    
    

    const saveContestantsToDB = () => {
        const payload = newContestantsToAdd.map(({ name, email, gender, phone, image, schoolName }) => ({
            name, email, gender, phone: String(phone), image, schoolName,
        }));
        dispatch(addContestant(tournamentId, payload));
        setHasChanges(false);
    };

    const totalPages = Math.ceil(updatedContestants.length / contestantsPerPage);
    const indexOfLastContestant = currentPage * contestantsPerPage;
    const indexOfFirstContestant = indexOfLastContestant - contestantsPerPage;
    const currentContestants = updatedContestants.slice(indexOfFirstContestant, indexOfLastContestant);

    return (
        <div className="contestant-container">
            {loadingAdd && <LoadingComponent position="fixed" borderRadius="8px" backgroundColor="rgba(0, 0, 0, 0.5)" />}
            
            <div className="contestant-header">
                <div className="contestant-header-left"></div>
                <div className="contestant-header-right">
                    <label className="btn-import" onClick={downloadTemplate}>
                        <FaDownload className="icon-download" /> Tải file Excel
                    </label>
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
                    {currentContestants.length > 0 ? (
                        currentContestants.map((contestant, index) => (
                            <tr key={index}>
                                <td>{indexOfFirstContestant + index + 1}</td>
                                <td><img src={contestant.image} alt={contestant.name} className="contestant-image" /></td>
                                <td>{contestant.name}</td>
                                <td>{contestant.email}</td>
                                <td>{contestant.gender}</td>
                                <td>{contestant.phone}</td>
                                <td>{contestant.schoolName}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="no-data">Không có dữ liệu để hiển thị.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {currentContestants.length === 0 && <NoItem message="Chưa có thí sinh" />}

            {updatedContestants.length > 0 && (
                <div className="pagination-controls">
                    <button onClick={() => handlePagination(-1)} disabled={currentPage === 1} className="pagination-btn">
                        <FaArrowLeft /> Trước
                    </button>
                    <span>Trang {currentPage} / {totalPages}</span>
                    <button onClick={() => handlePagination(1)} disabled={currentPage === totalPages} className="pagination-btn">
                        Tiếp <FaArrowRight />
                    </button>
                </div>
            )}

            {hasChanges && <button className="btn-save-contestant" onClick={saveContestantsToDB}>Lưu thí sinh</button>}

            {isModalOpen && <AddContestant onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

export default ListContestant;
