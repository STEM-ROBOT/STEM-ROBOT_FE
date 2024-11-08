import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './ExcelUploadComponent.css'; // Import the CSS file
import { useDispatch } from 'react-redux';
import { addScoreCompetition } from '../../../../redux/actions/ScoreAction';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ExcelUploadComponent = () => {
    const { competitionId } = useParams();
    const [data, setData] = useState([]); 
    const [fileInput, setFileInput] = useState(null); // Reference for file input
    
    const dispatch = useDispatch();

    // Function to handle file upload and parsing
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const binaryStr = event.target.result;
            const workbook = XLSX.read(binaryStr, { type: 'binary' });

            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];

            const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
            setData(jsonData);
        };

        reader.readAsBinaryString(file);
    };

    // Function to convert the parsed data to JSON format and save it
    const convertToJson = () => {
        const formattedData = data.map((row) => ({
            description: row['MÔ TẢ'],
            point: row['ĐIỂM'],
            type: row['KIỂU'] || '',
        }));

        dispatch(addScoreCompetition(competitionId, formattedData))
            .then(() => {
                // Reset data and clear file input upon successful save
                setData([]);
                if (fileInput) fileInput.value = ""; // Reset file input value
                toast.success('Lưu thành công!');
            })
            .catch(() => toast.error('Đã xảy ra lỗi khi lưu!'));
    };

    return (
        <div className="excel-upload-container-main-wrapper">
            <a
                href="https://storage.googleapis.com/stem-system-storage/fadssdfa?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=stem-system-storage-upload%40stem-system.iam.gserviceaccount.com%2F20241031%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20241031T032511Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&X-Goog-Signature=8e032a71a9d9b8e66ec0ee17de7d49dcbec5d5b26d686e2a0bdf23059ec911d999c86b82701fa33ec2c7874a9cbf51e327cc4c204fe8425296157098872b12d5fb2d9f1a4db270e53c204ef358a601adda563a5194db3e6a1827363a25b264a971fdf42433980da6e993b91795d195c8b30a71db853096603a452e61dce456e94ae921d13a6d66016a49522092125b6c506bfd8272a5c5792ba7bade8d81e65f9825aa4a9d04e1fcef6ca7f4d7e7d64400e061aac964d1c8a4bdced269e4940abb4f6839cad76ac709433c17763d5ccb1a9b1cbf1b3b89cfa2c60655a1b8a36f8f8a89bea4b5bec8edfe2f3882e975326535109e50e35d8a6c3d8e96cdbc6ca5"
                download="SampleTemplate.xlsx"
                className="excel-upload-container-download-link"
            >
                 File Mẫu
            </a>
            <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
                ref={(input) => setFileInput(input)} // Set ref for input
                className="excel-upload-container-input-file"
            />

            {data.length > 0 && (
                <div className="excel-upload-container-data-display">
                    <h3 className="excel-upload-container-heading">Nội dung từ file Excel:</h3>
                    <table className="excel-upload-container-table" border="1">
                        <thead>
                            <tr>
                                <th className="excel-upload-container-table-header">STT</th>
                                <th className="excel-upload-container-table-header">MÔ TẢ</th>
                                <th className="excel-upload-container-table-header">ĐIỂM</th>
                                <th className="excel-upload-container-table-header">Kiểu</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index} className="excel-upload-container-table-row">
                                    <td className="excel-upload-container-table-data">{row['STT']}</td>
                                    <td className="excel-upload-container-table-data">{row['MÔ TẢ']}</td>
                                    <td className="excel-upload-container-table-data">{row['ĐIỂM']}</td>
                                    <td className="excel-upload-container-table-data">{row['KIỂU'] || ''}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button
                        onClick={convertToJson}
                        className="excel-upload-container-save-button"
                    >
                        Lưu
                    </button>
                </div>
            )}
        </div>
    );
};

export default ExcelUploadComponent;
