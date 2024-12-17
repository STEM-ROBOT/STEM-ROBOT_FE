import './TournamentSteps.css';
import robotImage from '/src/assets/images/service-reboticon.png'; // Replace with the correct path to the robot image

const TournamentSteps = () => {
    return (
        <div className="tournament-steps-wrapper">
            <div className="tournament-steps-header">
                <h2 className="tournament-title">Điều hành giải</h2>
                <p className="tournament-subtitle">Có 3 giai đoạn để điều hành một giải đấu</p>
            </div>
            <div className="tournament-steps">
                <div className="tournament-step tournament-step-1">
                    <div className="step-content">
                        <h3 className="step-title">1. Tạo Giải</h3>
                        <ul className="step-list">
                            <li>Thông tin giải đấu</li>
                            <li>Chọn nội dung thi đấu</li>
                            <li>Giới thiệu về giải đấu</li>
                            <li>Hoàn tất</li>
                          
                        </ul>
                    </div>
                </div>

                <div className="tournament-step tournament-step-2">
                    <div className="image-containers">
                        <img src={robotImage} alt="Robot" className="robot-image" />
                    </div>
                    <div className="step-content">
                        <h3 className="step-title">2. Tuỳ chỉnh nội dung thi đấu</h3>
                        <ul className="step-list">
                            <li>Chọn hình thức thi đấu / quy định / hạng mục tính điểm</li>
                            <li>Cấu hình đội</li>
                            <li>Cấu hình cặp đấu</li>
                            <li>Thiết lập lịch đấu</li>
                            <li>Phân công trọng tài</li>
                            <li>Sắp xếp trọng tài vào trận</li>
                            <li>Hoàn tất</li>
                           
                        </ul>
                    </div>
                </div>

                <div className="tournament-step tournament-step-3">
                    <div className="step-content">
                        <h3 className="step-title">3. Điều hành trận đấu</h3>
                        <ul className="step-list">
                            <li>Truy cập hệ thống</li>
                            <li>Theo giỏi lịch trình</li>
                            <li>Xác thực quyền điều hành</li>
                            <li>Xử lí quá trình trận đấu</li>
                            <li>Kết Thúc</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TournamentSteps;
