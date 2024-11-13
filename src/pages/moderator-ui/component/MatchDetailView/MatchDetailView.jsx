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
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [showScrollArrow, setShowScrollArrow] = useState("down");
  const previousDataRef = useRef(null);
  const previousResultDataRef = useRef(null);
  const containerRef = useRef(null);
  const hubConnectionRef = useRef(null);
  const hubConnectionResultRef = useRef(null);
  const [loadApiConnectClient, setLoadApiConnectClient] = useState(true);
  const [timeCountDown, setTimeCountDown] = useState(null);
  const storedImage = sessionStorage.getItem("ImageCompetition");
  const [noPlayMatch, setNoPlayMatch] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  useEffect(() => {
    const handleData = (data) => {
      const dataString = JSON.stringify(data);
      const previousDataString = JSON.stringify(previousDataRef.current);

      if (dataString !== previousDataString) {
        console.log(data);
        setScoreTeamDetailApi(data);
        previousDataRef.current = data;
      }
    };
    const handleResultData = (data) => {
      const dataString = JSON.stringify(data);
      const previousDataString = JSON.stringify(previousResultDataRef.current);

      if (dataString !== previousDataString) {
        console.log(data);
        setTeam1Score(data[0].tolalScore);
        setTeam2Score(data[1].tolalScore);
        previousResultDataRef.current = data;
      }
    };

    const connectHubClient = () => {
      setLoadApiConnectClient(false);
      connectHub({
        client: `match-deatail/${matchData.matchId}`,
        onDataReceived: handleData,
      }).then((hubConnection) => {
        hubConnectionRef.current = hubConnection;
      });
      connectHub({
        client: `team-match-result/${matchData.matchId}`,
        onDataReceived: handleResultData,
      }).then((hubConnection) => {
        hubConnectionResultRef.current = hubConnection;
      });
    };

    const connectClient = () => {
      setLoadApiConnectClient(false);
      //connectClient ResultPlayClient
      api
        .get(`/api/matches/match-total-point?matchId=${matchData.matchId}`)
        .then((response) => {
          console.log(response.data);
          if (response.data === "timeout") {
            if (hubConnectionResultRef.current) {
              hubConnectionResultRef.current.stop();
              hubConnectionResultRef.current = null;
            }
          } else if (
            response.data !== "notstarted" &&
            Array.isArray(response.data) &&
            response.data.length > 0
          ) {
            console.log(response.data);
            setTeam1Score(response.data[0].tolalScore);
            setTeam2Score(response.data[1].tolalScore);
            previousDataRef.current = response.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
      //connectClient MatchDetail
      api
        .get(`/api/matches/match-detail-action?matchID=${matchData.matchId}`)
        .then((response) => {
          console.log(response.data);

          if (response.data === "timeout") {
            setLoadApiConnectClient(true);
            if (hubConnectionRef.current) {
              hubConnectionRef.current.stop();
              hubConnectionRef.current = null;
            }
          } else if (
            response.data !== "notstarted" &&
            Array.isArray(response.data) &&
            response.data.length > 0
          ) {
            console.log(response.data);
            setScoreTeamDetailApi(response.data);
            previousDataRef.current = response.data;
          } else if (response.data === "notstarted") {
            setNoPlayMatch(true);
            if (hubConnectionRef.current) {
              hubConnectionRef.current.stop();
              hubConnectionRef.current = null;
            }
            if (hubConnectionResultRef.current) {
              hubConnectionResultRef.current.stop();
              hubConnectionResultRef.current = null;
            }
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
      if (hubConnectionResultRef.current) {
        hubConnectionResultRef.current.stop();

      }
    };
  }, [loadApiConnectClient]);
  useEffect(() => {
    if (timeCountDown != null) {
      if (hubConnectionRef.current) {
        hubConnectionRef.current.stop();
      }
      const calculateTimeLeft = () => {
        // Parse the target timeInMatch
        const [hours, minutes, seconds] = timeCountDown.timeInMatch
          .split(":")
          .map(Number);
        const targetTime = new Date();
        targetTime.setHours(hours, minutes, seconds);

        // Calculate the difference between target time and current time
        const now = new Date();
        const difference = targetTime - now;

        if (difference > 0) {
          // Convert remaining time to hours, minutes, and seconds
          setTimeLeft({
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          });
        } else {
          setTimeCountDown(null);
          setLoadApiConnectClient(true);
          setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        }
      };

      // Update every second
      const timer = setInterval(calculateTimeLeft, 1000);

      // Cleanup the interval on component unmount
      return () => clearInterval(timer);
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
      style={popupActive ? { backgroundImage: `url(${storedImage})` } : {}}
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
              {`${team1Score} - ${team2Score}`}
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
          {timeCountDown ? (
            <div className="match_display_match_play">
              Trận đấu sắp bắt đầu
              <div className="countdown_display_match_play">
                <div className="time_block match_action">
                  <div className="time_value">{timeLeft?.minutes || 0}</div>
                  <div className="time_label match_action">Phút</div>
                </div>
                <div className="time_block match_action">
                  <div className="time_value">{timeLeft?.seconds || 0}</div>
                  <div className="time_label match_action">Giây</div>
                </div>
              </div>
            </div>
          ) : noPlayMatch ? (
            <div className="match_display_match_play not">
              Trận đấu chưa sẵn sàng
              <div className="countdown_display_match_play">
                <div className="time_block match_action">
                  <div className="time_value">{timeLeft?.minutes || 0}</div>
                  <div className="time_label match_action">Phút</div>
                </div>
                <div className="time_block match_action">
                  <div className="time_value">{timeLeft?.seconds || 0}</div>
                  <div className="time_label match_action">Giây</div>
                </div>
              </div>
            </div>
          ) : scoreTeamDetailApi?.length < 1 ? (
            <img
              className="match_score_team_detail_load"
              src="https://i.gifer.com/embedded/download/PG23.gif"
            />
          ) : (
            <div className="match_score_team_detail">
              {scoreTeamDetailApi?.map((haft, i) => (
                <div key={i} className="haft_match">
                  <div className="info_haft_match">
                    {`HIỆP ${haft.haftName}`}
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
          {scoreTeamDetailApi?.length > 0 && (
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
