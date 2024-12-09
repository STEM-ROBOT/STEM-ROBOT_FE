import React, { useState } from 'react';
import './Payment.css';
import { toast } from 'react-toastify';
import api from '../../../../config';


const Payments = ({ isOpen, onClose, packageDetails }) => {
    console.log(packageDetails)
    const [discountCode, setDiscountCode] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [totalAmount, setTotalAmount] = useState(packageDetails?.price || 0);

    if (!isOpen) return null;

    const handlePayment = async () => {
        setIsProcessing(true);
        setErrorMessage('');
        const paymentPayload = {
            packageId: packageDetails.id,
            discountCode,
        };

        try {
            // Gọi API trực tiếp
            const { data } = await api.post(`/api/orders`, paymentPayload);

            if (data) {
                window.open(data, '_blank'); 
                onClose();
            } else {
                setErrorMessage('Không nhận được link thanh toán.');
                toast.error("Không nhận được link thanh toán.");
            }
        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
            setErrorMessage(`Thanh toán thất bại: ${message}`);
            toast.error(`Thanh toán thất bại: ${message}`);
            console.error('Error processing payment:', error);
        } finally {
            setIsProcessing(false);
        }
    };

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
                            {packageDetails.description || 'Không có mô tả.'}
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
                            <div className="price-row">
                                <span>Giá tiền:</span>
                                <span className="discount-price">{packageDetails.price}đ</span>
                            </div>
                        </div>
                        <div className="discount-code">
                            <input
                                type="text"
                                placeholder="Nhập mã giảm giá"
                                value={discountCode}
                                onChange={(e) => setDiscountCode(e.target.value)}
                                disabled={isProcessing}
                            />
                            <button onClick={() => toast.info('Mã giảm giá chưa được hỗ trợ')} disabled={isProcessing}>
                                Áp dụng
                            </button>
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <div className="total">
                            <span>TỔNG</span>
                            <span>{packageDetails.price}đ</span>
                        </div>
                        <button
                            className="pay-button"
                            onClick={handlePayment}
                            disabled={isProcessing}
                        >
                            {isProcessing ? 'Đang xử lý...' : 'Tiếp tục thanh toán'}
                        </button>
                        <p className="sepay-info">Thanh toán an toàn với PayOS</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payments;
