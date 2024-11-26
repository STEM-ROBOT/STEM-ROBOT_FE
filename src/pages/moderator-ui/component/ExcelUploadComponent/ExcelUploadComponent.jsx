import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import "./ExcelUploadComponent.css";
import { useDispatch, useSelector } from "react-redux";
import { addScoreCompetition, getScoreCompetition } from "../../../../redux/actions/ScoreAction";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { MdOutlineCloudDownload, MdOutlineCloudUpload } from "react-icons/md";
import LoadingComponent from "../../../system-ui/component/Loading/LoadingComponent";

const ExcelUploadComponent = () => {
  const { competitionId } = useParams();
  const [data, setData] = useState([]);
  const [fileInput, setFileInput] = useState(null); 
  const listScore = useSelector((state) => state.getScore?.listScore?.listScore);
  const hintScore = useSelector((state) => state.getScore?.listScore?.hintScore);
   
  const dispatch = useDispatch();
  const isAdd = useSelector((state)=>state.addScore.success)
  const loadingAdd = useSelector((state)=>state.addScore.loading)

  useEffect(() => {
    dispatch(getScoreCompetition(competitionId));
  }, [competitionId, dispatch,isAdd]);

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
      {loadingAdd && (<LoadingComponent  borderRadius="8px" backgroundColor="rgba(0, 0, 0, 0.0)" />)}
      {(listScore && listScore.length === 0) && (
        <div className="excel-upload-container_action">
          <div className="excel-upload-download">
            <a
              href={hintScore}
              className="excel-upload-container-download-link"
              style={{ textDecoration: "none" }}
            >
              <div className="excel_container_competition upload">
                <MdOutlineCloudDownload className="excel_upload_container_icon" />
                Tham Khảo
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
                  ref={(input) => setFileInput(input)}
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
      )}


      {/* Conditionally display listScore if it exists, otherwise display uploaded data */}
      {(listScore && listScore.length > 0) ? (
        <div className="excel-upload-container-data-display">
          <h3 className="excel-upload-container-heading">
            Danh sách điểm:
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
              {listScore.map((row, index) => (
                <tr key={index} className="excel-upload-container-table-row">
                  <td className="excel-upload-container-table-data">
                    {index + 1}
                  </td>
                  <td className="excel-upload-container-table-data">
                    {row.description}
                  </td>
                  <td className="excel-upload-container-table-data">
                    {row.point}
                  </td>
                  <td className="excel-upload-container-table-data">
                    {row.type || ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        data.length > 0 && (
          <div className="excel-upload-container-data-display">
            <h3 className="excel-upload-container-heading">
              Danh sách điểm:
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
                      {index + 1}
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
        )
      )}
    </div>
  );
};

export default ExcelUploadComponent;
