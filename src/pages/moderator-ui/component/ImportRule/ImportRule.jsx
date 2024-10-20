import React, { useState } from 'react';
import './ImportRule.css';

const ImportRule = () => {
    const [url, setUrl] = useState(''); // State to store the URL input

    // Function to handle URL input
    const handleUrlChange = (event) => {
        setUrl(event.target.value); // Update state with the entered URL
    };

    // Function to handle the import process (can be used to fetch data from the URL)
    const handleImport = () => {
        if (url) {
            // Perform your URL handling logic here
            console.log('URL entered:', url);
            // You can fetch or send this URL to an API for further processing
            // Example: axios.post('/api/uploadUrl', { url });
        } else {
            alert('Vui lòng nhập một URL!');
        }
    };

    return (
        <div className="import-rule-container">       
            <input
                type="text"
                value={url}
                onChange={handleUrlChange}
                className="import-rule-input-url"
                placeholder="Nhập URL của bạn"
            />

            {/* Button to trigger import process */}
            <button
                onClick={handleImport}
                className="import-rule-button"
            >
                Import
            </button>
        </div>
    );
};

export default ImportRule;
