import React, { useEffect, useState } from "react";
import "./LeagueView.css";
import { useNavigate } from "react-router-dom";
const LeagueView = ({ viewMode, league }) => {
  const navigate = useNavigate();

  const images = [
    "https://istema.vn/wp-content/uploads/2023/03/p.png",
    "https://th.bing.com/th/id/OIP.7HSEMd30tk4S_tCOunvBXAHaEK?w=331&h=186&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    "https://istema.vn/wp-content/uploads/2023/03/s.png",
    // Add more image URLs
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === league.images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // 2000ms = 2 seconds

    return () => clearInterval(intervalId); // Clean up the interval
  }, [images.length]);
  const progressPercentage = (league.matchesPlayed / league.totalMatches) * 100;
  const calculateDaysLeft = (endDate) => {
    // Lấy thời gian hiện tại
    const now = new Date();
    // Lấy thời gian hết hạn
    const end = new Date(endDate);
    // Tính chênh lệch thời gian (đơn vị: milliseconds)
    const difference = end - now;

    // Tính số ngày còn lại
    const daysLeft = Math.floor(difference / (1000 * 60 * 60 * 24));

    // Nếu đã qua hạn, trả về 0
    return daysLeft > 0 ? daysLeft : 0;
  };

  // Sử dụng hàm
  const endDate = "2024-10-13T23:59:59";
  return (
    <div
      onClick={() =>( navigate(`/league/${league.id}`))}
      className={`league_card ${viewMode}`}
      style={{
        "--background-image": `url(${images[currentImageIndex]})`,
      }}
    >
      {viewMode == "list" && <div className="league_card_overlay"></div>}
      <div
        className={`league_image_container ${viewMode}`}
        style={{
          "--background-image": `url(${images[currentImageIndex]})`,
        }}
      >
        <img
          src="https://th.bing.com/th/id/OIP.7HSEMd30tk4S_tCOunvBXAHaEK?w=331&h=186&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          alt="League Image"
          className={`league_thumbnail ${viewMode}`}
        />
      </div>
      <div className={`league_content ${viewMode}`}>
        <div className={`league_title ${viewMode}`}>
          <span>{league.name}</span>
        </div>
        <div className={`league_detail ${viewMode}`}>
          <span>{league.location}</span>
        </div>
        <div className={`league_stats ${viewMode}`}>
          <div className={`tooltip ${viewMode}`}>
            <span>👥 {league.teams}</span>
            <div className={`tooltip_text ${viewMode}`}>Số đội trong giải</div>
          </div>

          {/* Tooltip for views */}
          <div className={`tooltip ${viewMode}`}>
            <span>👁️ {league.views}</span>
            <div className={`tooltip_text ${viewMode}`}>Lượt xem</div>
          </div>

          {/* Tooltip for time left */}
          {calculateDaysLeft(league.endDate) > 0 && (
            <div className={`tooltip ${viewMode}`}>
              <span>⏱️Còn lại {calculateDaysLeft(league.endDate)} ngày </span>
              <div className={`tooltip_text ${viewMode}`}>
                Thời gian đăng kí
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar Section */}
      <div className={`progress_bar_container ${viewMode}`}>
        <div className={`progress_bar ${viewMode}`}>
          <div
            className={`progress_fill ${viewMode}`}
            style={{ width: `${progressPercentage}%` }}
          ></div>

          <div className={`progress_text ${viewMode}`}>
            {league.matchesPlayed} / {league.totalMatches}
          </div>
        </div>
        <div className={`progress_detail ${viewMode}`}>
          Số nội dung thi đấu đã kích hoạt
        </div>
      </div>
    </div>
  );
};

export default LeagueView;
