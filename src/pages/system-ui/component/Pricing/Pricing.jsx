import React from 'react';
import './Pricing.css';
import { FaCheckCircle } from 'react-icons/fa'; // Thêm icon cho dấu tích

const packages = [
    {
        name: ' Giải đấu hoàn toàn Miễn phí',
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
    return (
        <div className="pricing-outer-container">
            <div className="pricing-container">
                <h2>Bảng Giá</h2>
                <div className="pricing-cards">
                    {packages.map((pkg, index) => (
                        <div
                            key={index}
                            className={`pricing-card ${pkg.highlighted ? 'highlighted' : ''}`}
                        >
                            <div className="icon">{pkg.icon}</div>
                            <h3>{pkg.name}</h3>
                            <p className="type">{pkg.type}</p>
                            <ul>
                                {pkg.features.map((feature, idx) => (
                                    <li key={idx}>
                                        <FaCheckCircle className="check-icon" /> {feature}
                                    </li>
                                ))}
                            </ul>
                            <div className="price-section">
                                <span className="price">{pkg.price}đ</span>
                                <span className="currency">  / giải đấu</span>
                            </div>
                            <button className="buy-button">Mua ngay</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Pricing;
