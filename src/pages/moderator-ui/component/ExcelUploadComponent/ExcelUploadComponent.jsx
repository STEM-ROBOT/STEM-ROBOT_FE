import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './ExcelUploadComponent.css'; // Import the CSS file

const ExcelUploadComponent = () => {
    const [data, setData] = useState([]); // State to hold parsed Excel data

    // Function to handle file upload and parsing
    const handleFileUpload = (e) => {
        const file = e.target.files[0]; // Get the uploaded file
        const reader = new FileReader();

        reader.onload = (event) => {
            const binaryStr = event.target.result;
            const workbook = XLSX.read(binaryStr, { type: 'binary' });

            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];

            const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' }); // Parse sheet to JSON
            setData(jsonData); // Update the state with the parsed data
        };

        reader.readAsBinaryString(file); // Read file as binary string
    };

    // Function to convert the parsed data to JSON format (for DB submission)
    const convertToJson = () => {
        const formattedData = data.map((row, index) => ({
            stt: row['STT'],
            hanhDong: row['HÀNH ĐỘNG'],
            diem: row['ĐIỂM'],
            ghiChu: row['GHI CHÚ'] || '',
        }));

        // Log the formatted JSON data for further use
        console.log('Formatted JSON Data:', formattedData);

        // Optionally: Send this JSON to your backend or API for database storage
        // axios.post('/api/saveData', formattedData);
    };

    return (
        <div className="excel-upload-container-main-wrapper">
            <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
                className="excel-upload-container-input-file"
            />

            {data.length > 0 && (
                <div className="excel-upload-container-data-display">
                    <h3 className="excel-upload-container-heading">Nội dung từ file Excel:</h3>
                    <table className="excel-upload-container-table" border="1">
                        <thead>
                            <tr>
                                <th className="excel-upload-container-table-header">STT</th>
                                <th className="excel-upload-container-table-header">HÀNH ĐỘNG</th>
                                <th className="excel-upload-container-table-header">ĐIỂM</th>
                                <th className="excel-upload-container-table-header">GHI CHÚ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index} className="excel-upload-container-table-row">
                                    <td className="excel-upload-container-table-data">{row['STT']}</td>
                                    <td className="excel-upload-container-table-data">{row['HÀNH ĐỘNG']}</td>
                                    <td className="excel-upload-container-table-data">{row['ĐIỂM']}</td>
                                    <td className="excel-upload-container-table-data">{row['GHI CHÚ'] || ''}</td>
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
