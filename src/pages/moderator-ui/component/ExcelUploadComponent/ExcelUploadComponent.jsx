import React, { useState } from "react";
import * as XLSX from "xlsx";
import "./ExcelUploadComponent.css"; // Import the CSS file
import { useDispatch } from "react-redux";
import { addScoreCompetition } from "../../../../redux/actions/ScoreAction";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { MdOutlineCloudDownload, MdOutlineCloudUpload } from "react-icons/md";

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
      const workbook = XLSX.read(binaryStr, { type: "binary" });

      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
      setData(jsonData);
    };

    reader.readAsBinaryString(file);
  };

  // Function to convert the parsed data to JSON format and save it
  const convertToJson = () => {
    const formattedData = data.map((row) => ({
      description: row["MÔ TẢ"],
      point: row["ĐIỂM"],
      type: row["KIỂU"] || "",
    }));

    dispatch(addScoreCompetition(competitionId, formattedData))
      .then(() => {
        // Reset data and clear file input upon successful save
        setData([]);
        if (fileInput) fileInput.value = ""; // Reset file input value
        toast.success("Lưu thành công!");
      })
      .catch(() => toast.error("Đã xảy ra lỗi khi lưu!"));
  };

  return (
    <div className="excel-upload-container-main-wrapper">
      <div className="excel-upload-container_action">
        <div className="excel-upload-download">
          <a
            href="https://firebasestorage.googleapis.com/v0/b/fine-acronym-438603-m5.firebasestorage.app/o/stem-sever%2FFA24SE121.STEM.xlsx?alt=media&token=c923f4d7-6f1e-4654-b698-f100b38cbf45"
            className="excel-upload-container-download-link"
            style={{ textDecoration: "none" }}
          >
            <div className="excel_container_competition upload">
              <MdOutlineCloudDownload className="excel_upload_container_icon" />
              Tham Khảo
              {/* File Của Bạn */}
            </div>
          </a>
          <label>
            <div className="excel_container_competition download">
              <MdOutlineCloudUpload className="excel_upload_container_icon" />
              <input
                style={{ display: "none" }}
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
                ref={(input) => setFileInput(input)} // Set ref for input
              />
              File Của Bạn
            </div>
          </label>
        </div>

        <button
          onClick={convertToJson}
          className="excel-upload-container-save-button"
        >
         Hoàn Tất
        </button>
      </div>

      {data.length > 0 && (
        <div className="excel-upload-container-data-display">
          <h3 className="excel-upload-container-heading">
            Nội dung từ file Excel:
          </h3>
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
                  <td className="excel-upload-container-table-data">
                    {row["STT"]}
                  </td>
                  <td className="excel-upload-container-table-data">
                    {row["MÔ TẢ"]}
                  </td>
                  <td className="excel-upload-container-table-data">
                    {row["ĐIỂM"]}
                  </td>
                  <td className="excel-upload-container-table-data">
                    {row["KIỂU"] || ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExcelUploadComponent;
