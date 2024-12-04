import React, { useEffect, useState } from "react";
import "./StatusPayment.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import api from "../../../../config";
import { useNavigate } from "react-router-dom";

const SuccessPayment = () => {
    //   const orderDetails = {
    //     orderId: "82300",
    //     amount: "4,860,000đ",
    //     date: "04/02/2021 22:29:44",
    //     status: "Chưa thanh toán",
    //   };
    const navigate = useNavigate();
    const [orderDetails, setOrderDetails] = useState([]);
    useEffect(() => {
        api
            .get(
                `api/orders/951247`
            )
            .then((response) => {
                console.log(response.data);
                if (response.data) {
                    setOrderDetails(response.data); // Sử dụng dữ liệu từ API nếu tồn tại
                } else {
                    console.error("Data format is unexpected:", response.data);
                    setOrderDetails([]); // Gán mảng rỗng nếu dữ liệu không đúng định dạng
                }
            })
            .catch((error) => {
                console.error("Error fetching available contestants:", error);
                setOrderDetails([]); // Gán mảng rỗng khi gặp lỗi
            });
    }, []);

    return (
        <>
            <Header />
            <div className="success-payment-container">
                <div className="success-payment-card">
                    <div className="success-icon">
                        <span>✔</span>
                    </div>
                    <h2 className="success-title">MUA GÓI THÀNH CÔNG!</h2>
                    {/* <ul className="order-details">
          <li>
            <strong>Mã giao dịch:</strong> {orderDetails.id}
          </li>
          <li>
            <strong>Số tiền:</strong> {orderDetails.amount} đ
          </li>
          <li>
            <strong>Thời gian:</strong> {orderDetails.orderDate}
          </li>
          <li>
            <strong>Trạng thái thanh toán:</strong> {orderDetails.status}
          </li>
        </ul> */}
                    <p className="thank-you-message">
                        Cảm ơn bạn đã đăng ký khóa học. Chúng tôi sẽ gửi mã kích hoạt qua email
                        để bạn có thể vào học ngay sau khi nhận được thanh toán.
                    </p>
                    <button className="back-to-courses-button" onClick={()=> navigate("/home")}>← Trang chủ</button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SuccessPayment;
