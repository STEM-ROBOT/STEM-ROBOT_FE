import React, { useState } from 'react';
import './ImportRule.css';

const ImportRule = () => {
    const [file, setFile] = useState(null); // State to store the selected file
    const [fileUrl, setFileUrl] = useState(null); // State to store the URL of the selected file

    // Function to handle file selection
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0]; // Get the selected file
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile); // Only set file if it is a PDF

            // Create a URL for the selected file
            const fileUrl = URL.createObjectURL(selectedFile);
            setFileUrl(fileUrl);
        } else {
            alert('Vui lòng chọn một tệp PDF!');
            setFile(null); // Clear the file if it is not a PDF
            setFileUrl(null); // Clear the file URL
        }
    };

    // Function to handle the import process (can be used to upload the file)
    const handleImport = () => {
        if (file) {
            // Perform your file handling logic here
            console.log('File selected:', file);
            // You can upload this file to an API for further processing
            // Example: 
            // const formData = new FormData();
            // formData.append('file', file);
            // axios.post('/api/uploadFile', formData);
        } else {
            alert('Vui lòng chọn một tệp PDF!');
        }
    };

    return (
        <div className="import-rule-container">
            <div className="import-rule-content" >
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf" // Only allow PDF files
                    className="import-rule-input-file"
                />


                <div>
                <button
                    onClick={handleImport}
                    className="import-rule-buttons"
                >
                    Import
                </button>
                </div>
            </div>


            {/* Display PDF preview if file is selected */}
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
