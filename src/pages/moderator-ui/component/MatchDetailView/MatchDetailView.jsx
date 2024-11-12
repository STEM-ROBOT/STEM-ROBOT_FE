import React, { useEffect, useRef, useState } from "react";
import "./MatchDetailView.css";
import { IoClose, IoLocationOutline } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import connectHub from "../../../../config/connectHub";
import api from "../../../../config";

const MatchDetailView = ({ setShowMatchDetail, matchData }) => {
  const [popupActive, setActive] = useState(false);
  const [scoreTeamDetailApi, setScoreTeamDetailApi] = useState([]);
  const [showScrollArrow, setShowScrollArrow] = useState("down");
  const previousDataRef = useRef(null);
  const containerRef = useRef(null);
  const hubConnectionRef = useRef(null);
  const [loadApiConnectClient, setLoadApiConnectClient] = useState(true);
  const [timeCountDown, setTimeCountDown] = useState(null);
  useEffect(() => {
    const handleData = (data) => {
      const dataString = JSON.stringify(data);
      const previousDataString = JSON.stringify(previousDataRef.current);

      if (dataString !== previousDataString) {
        console.log(data);
        setScoreTeamDetailApi(data);
        previousDataRef.current = data; // Cập nhật dữ liệu cũ để so sánh ở lần sau
      }
    };

    const connectHubClient = () => {
      connectHub({
        client: `match-deatail/${2158}`,
        onDataReceived: handleData,
      }).then((hubConnection) => {
        hubConnectionRef.current = hubConnection;
      });
    };

    const connectClient = () => {
      const currentDate = new Date().toISOString();
      setLoadApiConnectClient(false);
      api
        .get(
          `/api/matches/match-detail-action?matchID=${2158}&date=${"2024-11-09T06:50:00"}`
        )
        .then((response) => {
          if (response.data === "timeout") {
            setLoadApiConnectClient(true);
            if (hubConnectionRef.current) {
              hubConnectionRef.current.stop(); // Dừng kết nối nếu timeout
              hubConnectionRef.current = null; // Xóa tham chiếu
            }
          } else if (response.data.length > 0) {
            console.log(response.data);
            setScoreTeamDetailApi(response.data);
            previousDataRef.current = response.data; // Lưu dữ liệu vào biến tham chiếu
          } else {
            setTimeCountDown(response.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (loadApiConnectClient) {
      connectHubClient();
      connectClient();
    }

    return () => {
      if (hubConnectionRef.current) {
        hubConnectionRef.current.stop();
      }
    };
  }, [loadApiConnectClient]);
  useEffect(() => {
    if (timeCountDown != null) {
      if (hubConnectionRef.current) {
        hubConnectionRef.current.stop();
      }
    }
  }, [timeCountDown]);
  useEffect(() => {
    if (containerRef.current && scoreTeamDetailApi.length > 0) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [scoreTeamDetailApi]);
  useEffect(() => {
    const timer = setTimeout(() => {}, 2000);
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
  }, []);
  useEffect(() => {
    if (containerRef.current && scoreTeamDetailApi.length > 0) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [scoreTeamDetailApi]);
  const CloseMatchDetail = () => {
    if (hubConnectionRef.current) {
      hubConnectionRef.current.stop();
    }
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

  function mergeAndSortActivities(activityTeam1, activityTeam2) {
    // Set teamType as "home" for team1 and "away" for team2
    const updatedActivityTeam1 = activityTeam1.map((activity) => ({
      ...activity,
      teamType: "home",
    }));

    const updatedActivityTeam2 = activityTeam2.map((activity) => ({
      ...activity,
      teamType: "away",
    }));

    // Merge the updated lists
    const mergedActivities = [...updatedActivityTeam1, ...updatedActivityTeam2];

    // Sort by timeScore in ascending order
    mergedActivities.sort((a, b) => {
      return parseInt(a.timeScore) - parseInt(b.timeScore);
    });
    return mergedActivities;
  }
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
          {scoreTeamDetailApi?.length < 1 ? (
            <img
              className="match_score_team_detail_load"
              src="https://i.gifer.com/embedded/download/PG23.gif"
            />
          ) : (
            <div className="match_score_team_detail">
              {scoreTeamDetailApi?.map((haft, i) => (
                <div key={i} className="haft_match">
                  <div className="info_haft_match">
                    {`HIỆP ${haft.haftMatch}`}
                  </div>
                  {mergeAndSortActivities(
                    haft.activity.activityTeam1,
                    haft.activity.activityTeam2
                  ).map((activity, i) => (
                    <div
                      key={i}
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
                                activity.type.toLowerCase() === "điểm cộng"
                                  ? "score_team_point bonus"
                                  : "score_team_point"
                              }
                            >
                              {activity.type.toLowerCase() === "điểm cộng"
                                ? `+${activity.point}`
                                : activity.type.toLowerCase() === "điểm trừ"
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
                                activity.type.toLowerCase() === "điểm cộng"
                                  ? "score_team_point bonus"
                                  : "score_team_point"
                              }
                            >
                              {activity.type.toLowerCase() === "điểm cộng"
                                ? `+${activity.point}`
                                : activity.type.toLowerCase() === "điểm trừ"
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
          {scoreTeamDetailApi?.length > 1 && (
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
