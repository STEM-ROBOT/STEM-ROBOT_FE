import React, { useEffect, useState } from 'react';
import './Pricing.css';
import Payments from '../Payments/Payments';
import api from '../../../../config';

const Pricing = () => {
    const [packagesFromApi, setPackagesFromApi] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState(null);

    useEffect(() => {
        api
            .get("api/packages")
            .then((response) => {
                if (response.data.success.data) {
                    const packages = response.data.success.data.map((pkg) => ({
                        ...pkg,
                        features: [
                            'Thêm, sửa, xóa đội thi đấu ở trong giải không giới hạn',
                            'Bốc thăm ngẫu nhiên với nhiều tùy chỉnh khác nhau',
                            'Mời không giới hạn các đội tham gia vào giải đấu qua Email',
                            'Cho phép nhập dữ liệu đội thi đấu, vận động viên, lịch thi đấu bằng Excel',
                            'Không giới hạn số lượng tài khoản được phân quyền trong giải đấu',
                            'Cập nhật tỷ số của trận đấu theo thời gian thực',
                            'Tải về danh sách vận động viên tùy chỉnh',
                        ],
                        icon: '💎', // Thêm icon mặc định cho tất cả các gói
                    }));
                    setPackagesFromApi(packages); // Lưu dữ liệu từ API vào state
                } else {
                    console.error("Không có dữ liệu từ API.");
                }
            })
            .catch((error) => {
                console.error("Lỗi khi gọi API:", error);
            });
    }, []);

    const handleBuyClick = (pkg) => {
        setSelectedPackage(pkg);
    };

    const handleClose = () => {
        setSelectedPackage(null);
    };

    return (
        <div className="pricing-outer-container">
            <div className="pricing-container">
                <h2>Bảng Giá</h2>
                <div className="pricing-cards">
                    {packagesFromApi.map((pkg, id) => (
                        <div
                            key={id}
                            className={`pricing-card ${pkg.highlighted ? 'highlighted' : ''}`}
                        >
                            <div className="icon">{pkg.icon}</div>
                            <h3>{pkg.name}</h3>
                            <ul>
                                <li>✔️ Hỗ trợ tổ chức tối đa {pkg.maxMatch} trận đấu trong giải đấu .</li>
                                <li>✔️ Hỗ trợ tối đa {pkg.maxTeam} đội tham gia .</li>
                                <li>✔️ Hỗ trợ tạo tối đa {pkg.maxTournament} giải đấu,quản lý và tổ chức giải đấu đa dạng.</li>
                                {pkg.features.map((feature, idx) => (
                                    <li key={idx}>✔️ {feature}</li>
                                ))}
                            </ul>
                            <div className="price-section">
                                <span className="price">{pkg.price.toLocaleString()}đ</span>
                                <span className="currency"> / giải đấu</span>
                            </div>
                            <button
                                className={`buy-button ${id === 0 ? 'disabled' : ''}`}
                                onClick={() => id !== 0 && handleBuyClick(pkg)} // Prevent click for first package
                                disabled={id === 0} // Disable button for the first package
                            >
                                {id === 0 ? "Miễn phí" : "Mua ngay"}
                            </button>

                        </div>
                    ))}
                </div>
            </div>
            <Payments isOpen={!!selectedPackage} onClose={handleClose} packageDetails={selectedPackage} />
        </div>
    );
};

export default Pricing;
