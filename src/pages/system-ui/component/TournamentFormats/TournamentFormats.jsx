// eslint-disable-next-line no-unused-vars
import React from "react";
import "./TournamentFormat.css";
import format1 from "/src/assets/images/loai-truc-tiep.jpg"; // Replace with correct image paths
import format2 from "/src/assets/images/dau-vong-tron.jpg";
import format3 from "/src/assets/images/bang.png";
import format4 from "/src/assets/images/thang-thua.jpg";
import format5 from "/src/assets/images/dau-hon-hop.jpg";

const TournamentFormats = () => {
  return (
    <div className="tournament-formats-container">
      <div className="tournament-formats-wrapper">
        <div className="header-section">
          <h2>Hỗ trợ nhiều thể thức thi đấu</h2>
          <p>
            Stem Robot Competition giúp người dùng tạo ra các giải đấu có thể
            thức giống như với các giải đấu nổi tiếng thế giới như Champions
            League, World Cup, NBA, Laliga, ATP Cup...
          </p>
        </div>
        <div className="formats-section">
          <div className="format-block">
            {/* <img src={format1} alt="Format 1" /> */}
            <div
              className="format_option_img active"
              style={{
                width: "100%",
                height: "250px",
              }}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  width: "200px",
                  height: "200px",
                }}
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7 10H17V20H7L7 10ZM5 10C5 8.89543 5.89543 8 7 8H17C18.1046 8 19 8.89543 19 10V14H24.0667C24.619 14 25.0667 14.4477 25.0667 15V23H30V19C30 17.8954 30.8954 17 32 17H42C43.1046 17 44 17.8954 44 19V29C44 30.1046 43.1046 31 42 31H32C30.8954 31 30 30.1046 30 29V25H25.0667V33C25.0667 33.5523 24.619 34 24.0667 34H19V38C19 39.1046 18.1046 40 17 40H7C5.89543 40 5 39.1046 5 38V28C5 26.8954 5.89543 26 7 26H17C18.1046 26 19 26.8954 19 28V32H23.0667V16H19V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V10ZM7 28H17V38H7L7 28Z"
                  fill="#12cbecf5"
                />
              </svg>
            </div>

            <div className="title">Loại trực tiếp</div>
            <div className="description">
              Thể thức đấu loại trực tiếp. Chỉ có người chiến thắng được đi
              tiếp.
            </div>
          </div>
          {/* <div className="format-block">
                        <img src={format2} alt="Format 2" />
                        <div className="title">Đấu vòng tròn</div>
                        <div className="description">
                            Mỗi đội thi đấu với tất cả các đội còn lại để tính điểm.
                        </div>
                    </div> */}
          <div className="format-block">
            {/* <img src={format3} alt="Format 3" /> */}
            <div
              className="format_option_img active"
              style={{
                width: "100%",
                height: "250px",
              }}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  width: "200px",
                  height: "200px",
                }}
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7 10C7 8.34315 8.34315 7 10 7H38C39.6569 7 41 8.34315 41 10V38C41 39.6569 39.6569 41 38 41H10C8.34315 41 7 39.6569 7 38V10ZM10 9C9.44772 9 9 9.44772 9 10V15H23V9H10ZM25 9V15H39V10C39 9.44772 38.5523 9 38 9H25ZM39 17H25V23H39V17ZM39 25H25V31H39V25ZM39 33H25V39H38C38.5523 39 39 38.5523 39 38V33ZM23 39V33H9V38C9 38.5523 9.44772 39 10 39H23ZM9 31H23V25H9V31ZM9 23H23V17H9V23Z"
                  fill="#12cbecf5"
                />
              </svg>
            </div>
            <div className="title">Chia bảng đấu</div>
            <div className="description">
              Các đội được chia thành nhiều bảng đấu và thi đấu trong bảng của
              mình.
            </div>
          </div>
          {/* <div className="format-block">
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
                    </div> */}
        </div>
      </div>
    </div>
  );
};

export default TournamentFormats;
