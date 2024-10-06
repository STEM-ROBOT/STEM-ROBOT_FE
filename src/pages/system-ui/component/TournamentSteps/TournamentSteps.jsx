import './TournamentSteps.css';
import robotImage from '/src/assets/images/service-reboticon.png'; // Replace with the correct path to the robot image

const TournamentSteps = () => {
    return (
        <div className="tournament-steps-wrapper">
            <div className="tournament-header">
                <h2 className="tournament-title">Điều hành giải</h2>
                <p className="tournament-subtitle">Có 3 giai đoạn để điều hành một giải đấu</p>
            </div>
            <div className="tournament-steps">
                <div className="tournament-step tournament-step-1">
                    <div className="step-content">
                        <h3 className="step-title">1. Tạo Giải</h3>
                        <ul className="step-list">
                            <li>Hệ thuỵ sĩ</li>
                            <li>Loại trực tiếp</li>
                            <li>Đấu vòng tròn</li>
                            <li>Chia bảng đấu</li>
                            <li>Thể thức hỗn hợp</li>
                            <li>Nhánh thắng & nhánh thua</li>
                        </ul>
                    </div>
                </div>

                <div className="tournament-step tournament-step-2">
                    <div className="image-container">
                        <img src={robotImage} alt="Robot" className="robot-image" />
                    </div>
                    <div className="step-content">
                        <h3 className="step-title">2. Tuỳ chỉnh giải đấu</h3>
                        <ul className="step-list">
                            <li>Nhập điều lệ, hình và địa điểm</li>
                            <li>Nhập thông tin của đội / vận động viên</li>
                            <li>Mời người tham gia</li>
                            <li>Lập lịch đấu</li>
                            <li>Tuỳ chỉnh giai đoạn</li>
                        </ul>
                    </div>
                </div>

                <div className="tournament-step tournament-step-3">
                    <div className="step-content">
                        <h3 className="step-title">3. Điều hành giải</h3>
                        <ul className="step-list">
                            <li>Kích hoạt</li>
                            <li>Nhập tỷ số</li>
                            <li>Xem thống kê</li>
                            <li>Chia sẻ với bạn bè</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TournamentSteps;
