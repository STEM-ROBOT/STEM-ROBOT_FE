import React, { useEffect, useState } from "react";
import "./ImportRule.css";
import { useDispatch, useSelector } from "react-redux";
import { addRuleCompetition, getRuleCompetition } from "../../../../redux/actions/RuleAction";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { MdOutlineCloudDownload, MdOutlineCloudUpload } from "react-icons/md";
import FirebaseUpload from "../../../../config/firebase";
import LoadingComponent from "../../../system-ui/component/Loading/LoadingComponent";

const ImportRule = () => {
  const { competitionId } = useParams();
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const filefromDB = useSelector((state) => state.getRule?.rule?.data?.regulation);
  const hintfromDB = useSelector((state) => state.getRule?.rule?.data?.regulationExample);  
  const addSuccess =useSelector((state)=> state.addRule.success);
  const laodingAdd =useSelector((state)=> state.addRule.loading);
  const suggestedFileUrl = hintfromDB;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRuleCompetition(competitionId));
  }, [competitionId, dispatch,addSuccess]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      const fileUrl = URL.createObjectURL(selectedFile);
      setFileUrl(fileUrl);
    } else {
      alert("Vui lòng chọn một tệp PDF!");
      setFile(null);
      setFileUrl(null);
    }
  };

  const handleImport = async () => {
    if (file) {
      const uploadedFileUrl = await FirebaseUpload(file);
      if (uploadedFileUrl) {
        const newfiletoDB = {
          file : uploadedFileUrl
        }
        dispatch(addRuleCompetition(competitionId, newfiletoDB))
      }
    } else {
      toast.error("Vui lòng chọn một tệp PDF!");
    }
  };

  const handleSuggestedFilePreview = () => {
    setFileUrl(suggestedFileUrl);
  };

  return (
    <div className="import-rule-container">
      {
        laodingAdd && (<LoadingComponent position="fixed" borderRadius="8px" backgroundColor="rgba(0, 0, 0, 0.5)" />)
      }
      {filefromDB ? (
        <div className="pdf-preview">
          <iframe
            src={filefromDB}
            title="PDF Preview"
            width="100%"
            height="600px"
          />
        </div>
      ) : (
        <div className="excel-upload-container_action">
          <div className="excel-upload-download">
            <div
              className="excel_container_competition upload"
              onClick={handleSuggestedFilePreview}
            >
              <MdOutlineCloudDownload className="excel_upload_container_icon" />
              Tham Khảo
            </div>

            <label>
              <div className="excel_container_competition download">
                <MdOutlineCloudUpload className="excel_upload_container_icon" />
                <input
                  style={{ display: "none" }}
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf"
                  className="import-rule-input-file"
                />
                File Của Bạn
              </div>
            </label>
          </div>

          <button
            onClick={handleImport}
            className="excel-upload-container-save-button"
          >
            Hoàn Tất
          </button>
        </div>
      )}
      
      {/* Display PDF preview if a file or suggested file is selected */}
      {fileUrl && !filefromDB && (
        <div className="pdf-preview">
          <iframe
            src={fileUrl}
            title="PDF Preview"
            width="100%"
            height="600px"
          />
        </div>
      )}
    </div>
  );
};

export default ImportRule;
