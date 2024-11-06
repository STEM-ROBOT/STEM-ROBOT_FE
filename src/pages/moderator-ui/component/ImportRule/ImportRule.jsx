import React, { useState } from 'react';
import './ImportRule.css';
import { useDispatch } from 'react-redux';
import { addRuleCompetition } from '../../../../redux/actions/RuleAction';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ImportRule = () => {
    const { competitionId } = useParams();
    const [file, setFile] = useState(null); // State to store the selected file
    const [fileUrl, setFileUrl] = useState(null); // State to store the URL of the selected file
    const suggestedFileUrl = "https://storage.googleapis.com/stem-system-storage/tjajh%20dsadsa?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=stem-system-storage-upload%40stem-system.iam.gserviceaccount.com%2F20241030%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20241030T103846Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&X-Goog-Signature=c146b9c0620c1f7454e5a87f20769c5d03c3c06595fb27f56a58febad3472574676f44e9913d2719447b49dd10aab6f675c829dbde1f05abdcd4e3787273424ea8add67c415a1a6558b8847defac00982bb94e31881a94389cbb681ba8601cb403ec782950d9aad1d54a961e9b4a9ce375bfe4c2d175527a9e56fe8e1c209a58131050591526daca63dde89efa522421fa0e64f8c33bae093b6a7e8837d831db034dbef15f0460896029bbf9aacbbb7953210d7ace389c7c18b14ee08b8259ebec4e7c5e1d0d93c9f1b31502d4653dbeebff74cd9afcfe7b05907e721ea5e0eaeb9a54c592ae02debae7c12c5e160363de4f93ee509e87b7b62d2ac8ae81aa4f";
    const dispatch = useDispatch();

    // Function to handle file selection
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            const fileUrl = URL.createObjectURL(selectedFile);
            setFileUrl(fileUrl);
        } else {
            alert('Vui lòng chọn một tệp PDF!');
            setFile(null);
            setFileUrl(null);
        }
    };

    // Function to handle the import process (can be used to upload the file)
    const handleImport = () => {
        if (file) {
            dispatch(addRuleCompetition(competitionId, file))
                .then(() => {
                    // Reset file input on successful import
                    setFile(null);
                    setFileUrl(null);
                    toast.success('Import thành công!');
                })
                .catch(() => toast.error('Đã xảy ra lỗi khi import!'));
        } else {
            toast.error('Vui lòng chọn một tệp PDF!');
        }
    };

    // Function to preview the suggested file in the iframe
    const handleSuggestedFilePreview = () => {
        setFileUrl(suggestedFileUrl);
    };

    return (
        <div className="import-rule-container">
            <div onClick={handleSuggestedFilePreview} className='import-rule-title'>
                Xem tệp gợi ý
            </div>
            <div className="import-rule-content">
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf"
                    className="import-rule-input-file"
                />

                <button onClick={handleImport} className="import-rule-buttons">
                    Import
                </button>
            </div>

            {/* Display PDF preview if a file or suggested file is selected */}
            {fileUrl && (
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
