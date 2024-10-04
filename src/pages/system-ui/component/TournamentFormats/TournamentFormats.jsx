// eslint-disable-next-line no-unused-vars
import React from 'react';
import './TournamentFormat.css';
import format1 from '/src/assets/images/loai-truc-tiep.jpg'; // Replace with correct image paths
import format2 from '/src/assets/images/dau-vong-tron.jpg';
import format3 from '/src/assets/images/bang.png';
import format4 from '/src/assets/images/thang-thua.jpg';
import format5 from '/src/assets/images/dau-hon-hop.jpg';

const TournamentFormats = () => {
    return (
        <div className="tournament-formats-container">
            <div className="tournament-formats-wrapper">
                <div className="header-section">
                    <h2>Hỗ trợ nhiều thể thức thi đấu</h2>
                    <p>
                        Myleague giúp người dùng tạo ra các giải đấu có thể thức giống như với các giải đấu nổi tiếng thế giới
                        như Champions League, World Cup, NBA, Laliga, ATP Cup...
                    </p>
                </div>
                <div className="formats-section">
                    <div className="format-block">
                        <img src={format1} alt="Format 1" />
                        <div className="title">Loại trực tiếp</div>
                        <div className="description">
                            Thể thức đấu loại trực tiếp. Chỉ có người chiến thắng được đi tiếp.
                        </div>
                    </div>
                    <div className="format-block">
                        <img src={format2} alt="Format 2" />
                        <div className="title">Đấu vòng tròn</div>
                        <div className="description">
                            Mỗi đội thi đấu với tất cả các đội còn lại để tính điểm.
                        </div>
                    </div>
                    <div className="format-block">
                        <img src={format3} alt="Format 3" />
                        <div className="title">Chia bảng đấu</div>
                        <div className="description">
                            Các đội được chia thành nhiều bảng đấu và thi đấu trong bảng của mình.
                        </div>
                    </div>
                    <div className="format-block">
                        <img src={format4} alt="Format 4" />
                        <div className="title">Nhánh thắng - Nhánh thua</div>
                        <div className="description">
                            Thể thức phân nhánh giữa người thắng và thua, tạo ra sự cạnh tranh thú vị.
                        </div>
                    </div>
                    <div className="format-block">
                        <img src={format5} alt="Format 5" />
                        <div className="title">Thể thức hỗn hợp</div>
                        <div className="description">
                            Kết hợp giữa vòng tròn và đấu loại trực tiếp để chọn đội xuất sắc nhất.
                        </div>
                    </div>
                 
                </div>
            </div>
        </div>

    );
};

export default TournamentFormats;
