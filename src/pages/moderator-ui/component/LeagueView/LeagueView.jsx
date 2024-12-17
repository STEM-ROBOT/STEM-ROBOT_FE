import React, { useEffect, useState } from "react";
import "./LeagueView.css";
import { useNavigate } from "react-router-dom";
import api from "../../../../config";
import { update_viewer_filter } from "../../api/ApiFlowView/ApiFlowView";
const LeagueView = ({ viewMode, league }) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === league.imagesCompetition.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // 2000ms = 2 seconds
    console.log(league);

    return () => clearInterval(intervalId); // Clean up the interval
  }, [league.imagesCompetition.length]);
  const progressPercentage =
    (league.competitionActivateNumber / league.competitionNumber) * 100;
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
  const GoLeague = () => {
    if (league) {
      api
        .put(update_viewer_filter + league.id)
        .then((response) => {
          console.log(response);
          navigate(`${league.id}/`);
        })
        .catch((error) => {
          alert("Đã xảy ra sự cố", error);
        });
    } else {
      console.error("league is undefined or null");
    }
  };
  const truncateText = (text, maxLines = 2, lineHeight = 20) => {
    const maxHeight = maxLines * lineHeight;
    const dummyDiv = document.createElement("div");
    dummyDiv.style.lineHeight = `${lineHeight}px`;
    dummyDiv.style.width = "400px";
    dummyDiv.innerText = text;
    document.body.appendChild(dummyDiv);

    if (dummyDiv.offsetHeight > maxHeight) {
      let truncated = text;
      while (dummyDiv.offsetHeight > maxHeight) {
        truncated = truncated.slice(0, -1);
        dummyDiv.innerText = truncated + "...";
      }
      document.body.removeChild(dummyDiv);
      return truncated + "...";
    }
    document.body.removeChild(dummyDiv);
    return text;
  };
  return (
    <div
      onClick={() => GoLeague()}
      className={`league_card ${viewMode}`}
      style={{
        "--background-image": `url(${league.imagesCompetition[currentImageIndex]?.imageCompetition})`,
      }}
    >
      {viewMode == "list" && <div className="league_card_overlay"></div>}
      <div
        className={`league_image_container ${viewMode}`}
        style={{
          "--background-image": `url(${league.imagesCompetition[currentImageIndex]})`,
        }}
      >
        <div
          className={
            league.status == "Private"
              ? "competition_status_competition done "
              : "competition_status_competition rg"
          }
        >
          {league.status == "Public" ? "Mở đăng ký" : "Không mở đăng ký"}
        </div>
        <div className={"league_status_level"}>
          {" "}
          CẤP {league.tournamentLevel}
        </div>
        <img
          src={league.image}
          alt="League Image"
          className={`league_thumbnail ${viewMode}`}
        />
      </div>
      <div className={`league_content ${viewMode}`}>
        <div className={`league_title ${viewMode}`}>
          <span>{league.name}</span>
        </div>
        <div className={`league_detail ${viewMode} location`}>
          <span>
            {viewMode === "grid"
              ? truncateText(league.location)
              : league.location}
          </span>
        </div>
        <div className={`league_detail ${viewMode} `}>
          <span
            style={{
              backgroundColor: "#0864b9",
              color: "#fff",
              width: "fit-content",
              borderRadius: "7px",
              padding: "0 5px",
            }}
          >
            {league.createDate.replace("T", " ").slice(0, -3)}
          </span>
        </div>
        <div className={`league_stats ${viewMode}`}>
          <div className={`tooltip ${viewMode}`}>
            <span>👥 {league.contestant}</span>
            <div className={`tooltip_text ${viewMode}`}>
              Số thí sinh trong giải
            </div>
          </div>

          {/* Tooltip for views */}
          <div className={`tooltip ${viewMode}`}>
            <div>👁️ {league.views}</div>
            <div className={`tooltip_text ${viewMode}`}>Lượt xem</div>
          </div>

          {/* Tooltip for time left */}
          {/* {calculateDaysLeft(league.endDate) > 0 && (
            <div className={`tooltip ${viewMode}`}>
              <span>⏱️Còn lại {calculateDaysLeft(league.endDate)} ngày </span>
              <div className={`tooltip_text ${viewMode}`}>
                Thời gian đăng kí
              </div>
            </div>
          )} */}
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
            {league.competitionActivateNumber} / {league.competitionNumber}
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
