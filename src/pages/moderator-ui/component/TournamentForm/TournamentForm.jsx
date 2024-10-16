import React from 'react';
import './TournamentForm.css';
import logo from '../../../../assets/images/header.png';

const TournamentForm = () => {
    return (
        <div className="form-content">
            <div className="form-left">
                <div className="image-upload">
                    <img src={logo} alt="Đổi hình giải đấu" className="tournament-logo" />
                    <button className="edit-button">
                        <i className="fa fa-pencil"></i>
                    </button>
                </div>
            </div>
            <div className="form-right">
                <div className="form-group">
                    <label>Tên giải đấu <span className="required">*</span></label>
                    <input type="text" value="World Cup 2024" />
                </div>
                <div className="form-group">
                    <label>Số điện thoại <span className="required">*</span></label>
                    <input type="text" value="0937588244" />
                </div>
                <div className="form-group">
                    <label>Chế độ</label>
                    <select>
                        <option value="private">Riêng tư</option>
                        <option value="public">Công khai</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Địa điểm <span className="required">*</span></label>
                    <input type="text" value="Qatar" />
                </div>
                <button className="update-button">Cập nhật ảnh bìa</button>
            </div>
        </div>
    );
};

export default TournamentForm;
