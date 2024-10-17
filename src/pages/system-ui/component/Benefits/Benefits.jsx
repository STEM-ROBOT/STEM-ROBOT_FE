/* eslint-disable no-unused-vars */
import React from 'react';
import './Benefits.css';
import icon1 from '/src/assets/images/schedule.svg';
import icon2 from '/src/assets/images/convinent.svg';
import icon3 from '/src/assets/images/camera.svg';
import icon4 from '/src/assets/images/sinple.svg';

const Benefits = () => {
    return (
        <div className="benefits-container">
            <div className="benefits-content">
                <div className="text-sections">
                    <h3>STEM</h3>
                    <h2>Lợi ích STEM mang lại</h2>
                    <p>Số hóa thể thao không chỉ là một xu hướng phát triển tất yếu mà còn là bước chuyển mình mạnh mẽ giúp cải thiện toàn diện quá trình tổ chức, quản lý và vận hành các giải đấu. </p>
                    <button className="read-more-btn">Đọc Thêm </button>
                </div>

                <div className="cards-section">
                    <div className="card">
                        <img src={icon1} alt="Thời gian" />
                        <h4>Thời gian</h4>
                        <p>Tiết kiệm tới 90% thời gian gọi điện, email, gặp gỡ, sắp xếp lịch, cập nhật kết quả...</p>
                    </div>
                    <div className="card">
                        <img src={icon2} alt="Tài nguyên giấy" />
                        <h4>Tài nguyên giấy</h4>
                        <p>Tổ chức giải đấu hoàn toàn không in ấn, không lãng phí tài nguyên giấy...</p>
                    </div>
                    <div className="card">
                        <img src={icon3} alt="Sự tiện lợi" />
                        <h4>Sự tiện lợi</h4>
                        <p>Thông tin luôn sẵn sàng để truy cập mọi lúc, mọi nơi qua máy tính, điện thoại thông minh...</p>
                    </div>
                    <div className="card highlighted-card">
                        <img src={icon4} alt="Khả năng lưu trữ" />
                        <h4>Khả năng lưu trữ</h4>
                        <p>Mọi thông tin của giải đấu sẽ được lưu lại làm kỷ niệm, phục vụ tra cứu hoặc tái sử dụng...</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Benefits;