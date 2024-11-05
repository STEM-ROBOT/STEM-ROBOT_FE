// Settings.jsx
import React, { useState } from 'react';
import './PassWordAccount.css';
import { useDispatch } from 'react-redux';
import { ChangePasswordUser } from '../../../../redux/actions/AccountAction';

function Settings({ isOpen, onClose }) {
    if (!isOpen) return null; // Don't render if modal is not open
    const dispatch  = useDispatch();
    const [passwordOld, setPasswordOld] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple validation: check if new password and confirm password match
        if (newPassword !== confirmPass) {
            setErrorMessage("Mật khẩu mới và mật khẩu xác nhận không khớp.");
            return;
        }

        // Dispatch the action to change the password
        dispatch(ChangePasswordUser({
            passwordOld,
            newPassword,
            confirmPass
        }));

        // Optionally, close the modal after submitting
        onClose();
    };

    return (
        <div className="modal-overlay">
        <div className="settings-container">
            <button className="close-button" onClick={onClose}>×</button>
            
            <div className="content">
                <h2>Đổi Mật Khẩu</h2>
                <div className="profile-settings">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Mật khẩu hiện tại</label>
                            <input 
                                type="password" 
                                placeholder="Nhập mật khẩu hiện tại" 
                                value={passwordOld}
                                onChange={(e) => setPasswordOld(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Mật khẩu mới</label>
                            <input 
                                type="password" 
                                placeholder="Nhập mật khẩu mới" 
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Nhập lại mật khẩu mới</label>
                            <input 
                                type="password" 
                                placeholder="Nhập lại mật khẩu mới" 
                                value={confirmPass}
                                onChange={(e) => setConfirmPass(e.target.value)}
                                required
                            />
                        </div>
                        
                        {errorMessage && (
                            <p className="error-message">{errorMessage}</p>
                        )}

                        <button type="submit" className="save-changes-button">Lưu thay đổi</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Settings;
