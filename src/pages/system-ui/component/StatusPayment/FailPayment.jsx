import React from "react";
import "./FailPayment.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";

const FailPayment = () => {
    const navigate = useNavigate();

    return (
        <>
            <Header />
            <div className="fail-payment-container">
                <div className="fail-payment-card">
                    <div className="fail-icon">
                        <span>✖</span>
                    </div>
                    <h2 className="fail-titile">THANH TOÁN THẤT BẠI</h2>
                    {/* <ul className="error-details">
                        <li>
                            <strong>Mã đơn hàng:</strong> {errorDetails.orderId}
                        </li>
                        <li>
                            <strong>Số tiền:</strong> {errorDetails.amount}
                        </li>
                        <li>
                            <strong>Thời gian:</strong> {errorDetails.date}
                        </li>
                        <li>
                            <strong>Trạng thái:</strong> {errorDetails.status}
                        </li>
                    </ul> */}
                    <p className="error-message">
                        Đã xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại hoặc liên hệ
                        với bộ phận hỗ trợ để được trợ giúp.
                    </p>
                    <button className="try-again-button" onClick={()=>navigate("/home")}>← Trang chủ</button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default FailPayment;
