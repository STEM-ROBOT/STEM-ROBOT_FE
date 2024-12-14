import React, { useEffect, useRef, useState } from "react";
import "./MatchDetailView.css";
import { IoClose, IoLocationOutline } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import connectHub from "../../../../config/connectHub";
import api from "../../../../config";
import MatchProgess from "./MatchProgess";
import Parameter from "../Parameter/Parameter";

const MatchDetailView = ({ setShowMatchDetail, matchData }) => {
  const [activeTab, setActiveTab] = useState("score");
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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

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
              {matchData.startTime.replace("T", " ").slice(0, -3) ||
                "Chưa có lịch thi đấu"}
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
              <div style={{ display: "flex", alignItems: "center" }}>
                {matchData.statusView == "done" && (
                  <div
                    className={`item_team_result_play ${
                      matchData.homeTeamResult === "Win"
                        ? "win"
                        : matchData.homeTeamResult === "Lose"
                        ? "lose"
                        : matchData.homeTeamResult === "Draw"
                        ? "draw"
                        : ""
                    }
                            `}
                  >
                    {matchData.homeTeamResult === "Win"
                      ? "Thắng"
                      : matchData.homeTeamResult === "Lose"
                      ? "Thua"
                      : matchData.homeTeamResult === "Draw"
                      ? "Hòa"
                      : ""}
                  </div>
                )}
                {matchData.homeTeam}{" "}
              </div>
            </div>
            <div className="match_team_item_score">
              {`${team1Score ? team1Score : 0} - ${
                team2Score ? team2Score : 0
              }`}
            </div>
            <div className="match_team_item">
              <img
                className="item_team_logo"
                src={matchData.awayTeamLogo}
                alt={`Logo ${matchData.awayTeam}`}
              />
              <div style={{ display: "flex", alignItems: "center" }}>
                {matchData.awayTeam}{" "}
                {matchData.statusView == "done" && (
                  <div
                    className={`item_team_result_play ${
                      matchData.awayTeamResult === "Win"
                        ? "win"
                        : matchData.awayTeamResult === "Lose"
                        ? "lose"
                        : matchData.awayTeamResult === "Draw"
                        ? "draw"
                        : ""
                    }
                            }`}
                  >
                    {matchData.awayTeamResult === "Win"
                      ? "Thắng"
                      : matchData.awayTeamResult === "Lose"
                      ? "Thua"
                      : matchData.awayTeamResult === "Draw"
                      ? "Hòa"
                      : ""}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="match-detail-tab-buttons">
          <button
            className={`match-detail-tab-button ${
              activeTab === "score" ? "active" : ""
            }`}
            onClick={() => handleTabChange("score")}
          >
            Điểm số
          </button>
          <button
            className={`match-detail-tab-button ${
              activeTab === "stats" ? "active" : ""
            }`}
            onClick={() => handleTabChange("stats")}
          >
            Thông số
          </button>
        </div>

        <div className="match-detail-content">
          {activeTab === "score" ? (
            <div className="match-detail-score-section">
              <MatchProgess
                timeCountDown={timeCountDown}
                noPlayMatch={noPlayMatch}
                timeLeft={timeLeft}
                scoreTeamDetailApi={scoreTeamDetailApi}
                setActive={setActive}
              />
            </div>
          ) : (
            <div className="match-detail-stats-section">
              <Parameter />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchDetailView;
