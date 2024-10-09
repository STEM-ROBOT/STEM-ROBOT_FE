
import React from 'react';
import './Payment.css';

const Payments = ({ isOpen, onClose, packageDetails }) => {
    console.log(packageDetails)
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>×</button>
                <div className="modal-body">
                    <div className="modal-left">
                        <div className="modal-header">
                            <div className="course-icon">{packageDetails.icon}</div>
                            <h2>{packageDetails.name}</h2>
                        </div>
                        <p className="modal-description">
                            {packageDetails.description}
                        </p>
                        <div className="modal-benefits">
                            <h4>Bạn nhận được gì từ gói này?</h4>
                            <ul>
                                {packageDetails.features.map((feature, index) => (
                                    <li key={index}>✔️ {feature}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="modal-right">
                        <h4>Chi tiết thanh toán</h4>
                        <div className="price-details">
                            {/* <div className="price-row">
                                <span>Giá :</span>
                                <span className="original-price">2.500.000đ</span>
                            </div> */}
                            <div className="price-row">
                                <span>Giá tiền:</span>
                                <span className="discount-price">{packageDetails.price}đ</span>
                            </div>
                        </div>
                        <div className="discount-code">
                            <input type="text" placeholder="Nhập mã giảm giá" />
                            <button>Áp dụng</button>
                        </div>
                        <div className="total">
                            <span>TỔNG</span>
                            <span>{packageDetails.price}đ</span>
                        </div>
                        <button className="pay-button">Tiếp tục thanh toán</button>
                        <p className="sepay-info">Thanh toán an toàn với PayOS</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payments;
