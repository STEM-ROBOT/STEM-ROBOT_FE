import React, { useState } from 'react';
import './Pricing.css';
import Payments from '../Payments/Payments';

const packages = [
    {
        id: "0",
        name: 'Giải đấu hoàn toàn Miễn phí',
        type: 'Dưới 5 trận đấu',
        price: '0',
        currency: 'đ',
        features: [
            'Thêm, sửa, xóa đội thi đấu ở trong giải không giới hạn',
            'Bốc thăm ngẫu nhiên với nhiều tùy chỉnh khác nhau',
            'Mời không giới hạn các đội tham gia vào giải đấu qua Email',
            'Cho phép nhập dữ liệu đội thi đấu, vận động viên, lịch thi đấu bằng Excel',
            'Không giới hạn số lượng tài khoản được phân quyền trong giải đấu',
            'Cập nhật tỷ số của trận đấu theo thời gian thực',
            'Tải về danh sách vận động viên tùy chỉnh',
        ],
        highlighted: false,
        icon: '🆓',
    },
    {
        id: "1",
        name: 'Giải đấu đồng đội Cơ bản',
        type: 'Từ 5 - 19 trận đấu',
        price: '199,000',
        currency: 'đ',
        features: [
            'Thêm, sửa, xóa đội thi đấu ở trong giải không giới hạn',
            'Bốc thăm ngẫu nhiên với nhiều tùy chỉnh khác nhau',
            'Mời không giới hạn các đội tham gia vào giải đấu qua Email',
            'Cho phép nhập dữ liệu đội thi đấu, vận động viên, lịch thi đấu bằng Excel',
            'Không giới hạn số lượng tài khoản được phân quyền trong giải đấu',
            'Cập nhật tỷ số của trận đấu theo thời gian thực',
            'Tải về danh sách vận động viên tùy chỉnh',
        ],
        highlighted: false,
        icon: '💰',
    },
    {
        id: "2",
        name: 'Giải đấu đồng đội Tiêu chuẩn',
        type: 'Từ 20 - 49 trận đấu',
        price: '499,000',
        currency: 'đ',
        features: [
            'Thêm, sửa, xóa đội thi đấu ở trong giải không giới hạn',
            'Bốc thăm ngẫu nhiên với nhiều tùy chỉnh khác nhau',
            'Mời không giới hạn các đội tham gia vào giải đấu qua Email',
            'Cho phép nhập dữ liệu đội thi đấu, vận động viên, lịch thi đấu bằng Excel',
            'Không giới hạn số lượng tài khoản được phân quyền trong giải đấu',
            'Cập nhật tỷ số của trận đấu theo thời gian thực',
            'Tải về danh sách vận động viên tùy chỉnh',
        ],
        highlighted: false,
        icon: '💎',
    },
    {
        id: "3",
        name: 'Giải đấu đồng đội Nâng cao',
        type: 'Từ 50 trận đấu trở lên',
        price: '999,000',
        currency: 'đ',
        features: [
            'Thêm, sửa, xóa đội thi đấu ở trong giải không giới hạn',
            'Bốc thăm ngẫu nhiên với nhiều tùy chỉnh khác nhau',
            'Mời không giới hạn các đội tham gia vào giải đấu qua Email',
            'Cho phép nhập dữ liệu đội thi đấu, vận động viên, lịch thi đấu bằng Excel',
            'Không giới hạn số lượng tài khoản được phân quyền trong giải đấu',
            'Cập nhật tỷ số của trận đấu theo thời gian thực',
            'Tải về danh sách vận động viên tùy chỉnh',
        ],
        highlighted: false,
        icon: '🔥',
    },
];

const Pricing = () => {
    const [selectedPackage, setSelectedPackage] = useState(null);

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
                    {packages.map((pkg, id) => (
                        <div
                            key={id}
                            className={`pricing-card ${pkg.highlighted ? 'highlighted' : ''}`}
                        >
                            <div className="icon">{pkg.icon}</div>
                            <h3>{pkg.name}</h3>
                            <p className="type">{pkg.type}</p>
                            <ul>
                                {pkg.features.map((feature, idx) => (
                                    <li key={idx}>✔️ {feature}</li>
                                ))}
                            </ul>
                            <div className="price-section">
                                <span className="price">{pkg.price}đ</span>
                                <span className="currency"> / giải đấu</span>
                            </div>
                            <button
                                className="buy-button"
                                onClick={() => handleBuyClick(pkg)}
                                disabled={pkg.id === "0"} // Disable nút cho gói miễn phí
                            >
                                {pkg.id === "0" ? "Miễn phí" : "Mua ngay"}
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
