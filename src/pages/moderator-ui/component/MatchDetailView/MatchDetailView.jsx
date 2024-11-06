import React, { useEffect, useRef, useState } from "react";
import "./MatchDetailView.css";
import { IoClose, IoLocationOutline } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
const scoreTeamDetail = [
  {
    haftMatch: "1",
    activity: [
      {
        teamName: "Đội #7",
        teamType: "home",
        type: "Điểm Trừ",
        description: "Robot bị bẫy búa đập trúng",
        point: 1,
        timeScore: "2",
      },
      {
        teamName: "Đội #8",
        teamType: "away",
        type: "Điểm Cộng",
        description:
          "Tấn công có chủ đích làm đối thủ văng ra khoảng cách lớn hơn 0,5 m.",
        point: 1,
        timeScore: "7",
      },
      {
        teamName: "Đội #8",
        teamType: "away",
        type: "Điểm Cộng",
        description: "làm đối thủ lật ngửa",
        point: 2,
        timeScore: "9",
      },
      {
        teamName: "Đội #8",
        teamType: "away",
        type: "Điểm Cộng",
        description: "Làm đối thủ văng ra khỏi khu vực thi đấu",
        point: 2,
        timeScore: "15",
      },
      {
        teamName: "Đội #7",
        teamType: "home",
        type: "Điểm Cộng",
        description: "Làm đối thủ văng ra khỏi khu vực thi đấu",
        point: 2,
        timeScore: "19",
      },
    ],
  },
  {
    haftMatch: "2",
    activity: [
      {
        teamName: "Đội #7",
        teamType: "home",
        type: "Điểm Trừ",
        description: "Robot bị bẫy búa đập trúng",
        point: 1,
        timeScore: "30",
      },
      {
        teamName: "Đội #8",
        teamType: "away",
        type: "Điểm Cộng",
        description:
          "Tấn công có chủ đích làm đối thủ văng ra khoảng cách lớn hơn 0,5 m.",
        point: 1,
        timeScore: "33",
      },
      {
        teamName: "Đội #8",
        teamType: "away",
        type: "Điểm Cộng",
        description: "làm đối thủ lật ngửa",
        point: 2,
        timeScore: "34",
      },
      {
        teamName: "Đội #8",
        teamType: "away",
        type: "Điểm Cộng",
        description: "Làm đối thủ văng ra khỏi khu vực thi đấu",
        point: 2,
        timeScore: "40",
      },
    ],
  },
];
const MatchDetailView = ({ setShowMatchDetail, matchData }) => {
  const [popupActive, setActive] = useState(false);
  const [scoreTeamDetailApi, setScoreTeamDetailApi] = useState([]);
  const [showScrollArrow, setShowScrollArrow] = useState("down");
  const containerRef = useRef(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      setScoreTeamDetailApi(scoreTeamDetail);
    }, 2000);
    setActive(true);

    const container = containerRef.current;

    // Hàm kiểm tra vị trí cuộn trang của view_data_match_container
    const handleScroll = () => {
      if (container.scrollTop === 0) {
        setShowScrollArrow("down"); // Khi người dùng ở đầu container
      } else if (
        container.scrollHeight - container.scrollTop <=
        container.clientHeight + 5
      ) {
        setShowScrollArrow("up"); // Khi người dùng cuộn đến cuối container (thêm sai số nhỏ)
      }
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      container.removeEventListener("scroll", handleScroll);
    };
  }, [scoreTeamDetailApi]);

  const CloseMatchDetail = () => {
    setActive(false);
    const timer = setTimeout(() => {
      setShowMatchDetail(false);
    }, 500);
    return () => clearTimeout(timer);
  };
  const handleArrowClick = () => {
    const container = containerRef.current;
    if (showScrollArrow === "down") {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    } else if (showScrollArrow === "up") {
      container.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return (
    <div
      className={
        popupActive
          ? "match_detail_container_popup active"
          : "match_detail_container_popup"
      }
    >
      <div className="match_detail_container">
        <div className="match_head_detail">
          <div className="match_head_content">Tóm Tắt Trận Đấu </div>
          <div className="match_head_close">
            <IoClose
              className="close_head_close"
              onClick={() => CloseMatchDetail()}
            />
          </div>
        </div>
        <div className="match_body_detail">
          <div className="match_detail_item">
            <div className="match_time_location_view">
              <MdAccessTime className="icon_match_time" />
              {matchData.startTime || "Chưa có lịch thi đấu"}
            </div>
            <div className="match_time_location_view">
              <IoLocationOutline className="icon_match_time" />
              {matchData.locationName || "Chưa cập nhật"}
            </div>
          </div>
          <div className="match_detail_item">
            <div className="match_team_item">
              <img
                className="item_team_logo"
                src={matchData.homeTeamLogo}
                alt={`Logo ${matchData.homeTeam}`}
              />
              <div>{matchData.homeTeam}</div>
            </div>
            <div className="match_team_item_score">
              {`${matchData.homeScore || "0"} - ${matchData.awayScore || "0"}`}
            </div>
            <div className="match_team_item">
              <img
                className="item_team_logo"
                src={matchData.awayTeamLogo}
                alt={`Logo ${matchData.awayTeam}`}
              />
              <div>{matchData.awayTeam}</div>
            </div>
          </div>
        </div>
        <div className="view_data_match_container" ref={containerRef}>
          {scoreTeamDetailApi.length < 1 ? (
            <img
              className="match_score_team_detail_load"
              src="https://i.gifer.com/embedded/download/PG23.gif"
            />
          ) : (
            <div className="match_score_team_detail">
              {scoreTeamDetailApi.map((scoreTeam, i) => (
                <div key={i} className="haft_match">
                  <div className="info_haft_match">
                    {`HIỆP ${scoreTeam.haftMatch}`}
                  </div>
                  {scoreTeam.activity.map((activity, i) => (
                    <div
                      className={
                        activity.teamType == "home"
                          ? "match_score_team_item home"
                          : "match_score_team_item away"
                      }
                    >
                      {activity.teamType == "home" ? (
                        <div className="match_score_team_item_detail">
                          <div className="match_score_description">
                            {activity.description}
                          </div>
                          <div className="score_team_item_time">
                            {activity.timeScore + "'"}
                          </div>
                          <div className="score_team_item_info">
                            <div className="score_team_name">
                              {activity.teamName}
                            </div>
                            <div
                              className={
                                activity.type == "Điểm Cộng"
                                  ? "score_team_point bonus"
                                  : "score_team_point"
                              }
                            >
                              {activity.type == "Điểm Cộng"
                                ? `+${activity.point}`
                                : activity.type == "Điểm Trừ"
                                ? `-${activity.point}`
                                : "Xử Thua Trực Tiếp"}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="match_score_team_item_detail">
                          <div className="match_score_description">
                            {activity.description}
                          </div>
                          <div className="score_team_item_info_away">
                            <div
                              className={
                                activity.type == "Điểm Cộng"
                                  ? "score_team_point bonus"
                                  : "score_team_point"
                              }
                            >
                              {activity.type == "Điểm Cộng"
                                ? `+${activity.point}`
                                : activity.type == "Điểm Trừ"
                                ? `-${activity.point}`
                                : "Xử Thua Trực Tiếp"}
                            </div>
                            <div className="score_team_name_away">
                              {activity.teamName}
                            </div>
                          </div>
                          <div className="score_team_item_time_away">
                            {activity.timeScore + "'"}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
          {showScrollArrow && (
            <div className="scroll-arrow" onClick={handleArrowClick}>
              {showScrollArrow === "down" ? (
                <FaArrowDown className="icon_scroll_arrow" />
              ) : (
                <FaArrowUp className="icon_scroll_arrow" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchDetailView;
