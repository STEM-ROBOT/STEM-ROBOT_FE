import React, { useState } from 'react';
import './AddContestant.css';

const AddContestant = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        status: '',
        gender: '',
        phone: '',
        school: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Contestant added:', formData);
        onClose(); // Close the modal after submitting
    };

    return (
        <div className="modal-overlay">
            <div className="modal-contents">
                <h2>Thêm thí sinh mới</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Tên thí sinh:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Trạng thái:</label>
                        <input type="text" name="status" value={formData.status} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Giới tính:</label>
                        <select name="gender" value={formData.gender} onChange={handleChange} required>
                            <option value="">Chọn</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Số điện thoại:</label>
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Trường:</label>
                        <input type="text" name="school" value={formData.school} onChange={handleChange} required />
                    </div>
                    <div className="modal-actions">
                        <button type="submit" className="btn-submit">Thêm</button>
                        <button type="button" className="btn-cancel" onClick={onClose}>Hủy</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddContestant;
