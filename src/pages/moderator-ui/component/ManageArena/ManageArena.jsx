import React, { useState } from 'react';
import './ManageArena.css';

const ManageArena = () => {
    const fakeData = [
        { id: 1, name: "Sân 1" },
        { id: 2, name: "Sân 2" },
        { id: 3, name: "Sân 3" },
        { id: 4, name: "Sân 4" }
    ];

    const [arenas, setArenas] = useState(fakeData);
    const [inputValue, setInputValue] = useState("");

    // Handle setting new arenas based on user input
    const handleConfirmClick = () => {
        const num = parseInt(inputValue);
        if (num > 0) {
            const newArenas = Array.from({ length: num }, (_, index) => ({
                id: index + 1,
                name: `Sân ${index + 1}`
            }));
            setArenas(newArenas);
        }
    };

    // Handle name change for each arena
    const handleNameChange = (e, id) => {
        const updatedArenas = arenas.map((arena) =>
            arena.id === id ? { ...arena, name: e.target.value } : arena
        );
        setArenas(updatedArenas);
    };

    // Placeholder save function
    const saveArenas = () => {
        console.log("Saving arenas to database:", arenas);
        alert("Arena data saved successfully!");
    };

    return (
        <div className="manage-arena-main-container">
            <h2 className="manage-arena-title">Quản Lý Sân Đấu</h2>
            <div className="manage-arena-input-section">
                <div className="manage-arena-input-group">
                    <label className="manage-arena-label">Nhập số sân:</label>
                    <input
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Nhập số sân"
                        className="manage-arena-input-field"
                    />
                </div>
                <button className="manage-arena-confirm-button" onClick={handleConfirmClick}>Xác nhận</button>
            </div>

            {/* Render arenas with editable names */}
            <div className="manage-arena-grid-container">
                {arenas.map((arena) => (
                    <div key={arena.id} className="manage-arena-individual-container">
                        <div className="manage-arena-center-circle"></div>
                        <input
                            type="text"
                            value={arena.name}
                            onChange={(e) => handleNameChange(e, arena.id)}
                            className="manage-arena-name-input"
                        />
                    </div>
                ))}
            </div>
            <button className="manage-arena-save-button" onClick={saveArenas}>Lưu</button>
        </div>
    );
};

export default ManageArena;
