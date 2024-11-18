import React, { useEffect, useRef, useState } from "react";
import "./ManagerMatchRefereeMain.css";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import api from "../../../../config";
import { useNavigate, useParams } from "react-router-dom";
import connectHub from "../../../../config/connectHub";
import ManagerMatchAction from "./ManagerMatchAction";
import MatchWaitStart from "../../../moderator-ui/component/MatchDetailView/MatchWaitStart";
import MatchProgess from "../../../moderator-ui/component/MatchDetailView/MatchProgess";

const halfAction = [
  {
    teamMatchId: 1,
    teamMatchResult: 3,
    teamName: "Manchester United",
    teamImage:
      "https://logos-world.net/wp-content/uploads/2020/06/Manchester-United-emblem.png",
    halfActionTeam: [
      {
        halfId: 1,
        halfName: "1",
        refereeCompetitionId: 1,
        refereeCompetitionName: "Duong",
        Id: 1,
        status: "Accept",
        scorePoint: 1,
        scoreType: "Điểm cộng",
        scoreDescription: " Làm đối thủ lật ngửa",
        scoreTime: "03:40",
      },
      {
        refereeCompetitionId: 1,
        halfId: 1,
        halfName: "1",
        refereeCompetitionName: "Duong",
        Id: 2,
        status: "Cancel",
        scorePoint: 1,
        scoreType: "Điểm cộng",
        scoreDescription: " Làm đối thủ lật ngửa",
        scoreTime: "05:20",
      },
      {
        refereeCompetitionId: 2,
        halfId: 2,
        halfName: "2",
        refereeCompetitionName: "Thanh",
        Id: 1,
        status: "Pending",
        scorePoint: 1,
        scoreType: "Điểm trừ",
        scoreDescription: " Làm đối thủ lật ngửa",
        scoreTime: "10:20",
      },
      {
        refereeCompetitionId: 2,
        halfId: 2,
        halfName: "2",
        refereeCompetitionName: "Thanh",
        Id: 1,
        status: "Pending",
        scorePoint: 1,
        scoreType: "Điểm trừ",
        scoreDescription: " Làm đối thủ lật ngửa",
        scoreTime: "10:20",
      },
      {
        refereeCompetitionId: 2,
        halfId: 2,
        halfName: "2",
        refereeCompetitionName: "Thanh",
        Id: 1,
        status: "Pending",
        scorePoint: 1,
        scoreType: "Điểm trừ",
        scoreDescription: " Làm đối thủ lật ngửa",
        scoreTime: "10:20",
      },
      {
        refereeCompetitionId: 2,
        halfId: 2,
        halfName: "2",
        refereeCompetitionName: "Thanh",
        Id: 1,
        status: "Pending",
        scorePoint: 1,
        scoreType: "Điểm trừ",
        scoreDescription: " Làm đối thủ lật ngửa",
        scoreTime: "10:20",
      },
      {
        refereeCompetitionId: 2,
        halfId: 2,
        halfName: "2",
        refereeCompetitionName: "Thanh",
        Id: 1,
        status: "Pending",
        scorePoint: 1,
        scoreType: "Điểm trừ",
        scoreDescription: " Làm đối thủ lật ngửa",
        scoreTime: "10:20",
      },
      {
        refereeCompetitionId: 2,
        halfId: 2,
        halfName: "2",
        refereeCompetitionName: "Thanh",
        Id: 1,
        status: "Pending",
        scorePoint: 1,
        scoreType: "Điểm trừ",
        scoreDescription: " Làm đối thủ lật ngửa",
        scoreTime: "10:20",
      },
      {
        refereeCompetitionId: 2,
        halfId: 2,
        halfName: "2",
        refereeCompetitionName: "Thanh",
        Id: 1,
        status: "Pending",
        scorePoint: 1,
        scoreType: "Điểm trừ",
        scoreDescription: " Làm đối thủ lật ngửa",
        scoreTime: "10:20",
      },
      {
        refereeCompetitionId: 2,
        halfId: 2,
        halfName: "2",
        refereeCompetitionName: "Thanh",
        Id: 1,
        status: "Pending",
        scorePoint: 1,
        scoreType: "Điểm trừ",
        scoreDescription: " Làm đối thủ lật ngửa",
        scoreTime: "10:20",
      },
      {
        refereeCompetitionId: 2,
        halfId: 2,
        halfName: "2",
        refereeCompetitionName: "Thanh",
        Id: 1,
        status: "Pending",
        scorePoint: 1,
        scoreType: "Điểm trừ",
        scoreDescription: " Làm đối thủ lật ngửa",
        scoreTime: "10:20",
      },
      {
        refereeCompetitionId: 2,
        halfId: 2,
        halfName: "2",
        refereeCompetitionName: "Thanh",
        Id: 1,
        status: "Pending",
        scorePoint: 1,
        scoreType: "Điểm trừ",
        scoreDescription: " Làm đối thủ lật ngửa",
        scoreTime: "10:20",
      },
      {
        refereeCompetitionId: 2,
        halfId: 2,
        halfName: "2",
        refereeCompetitionName: "Thanh",
        Id: 1,
        status: "Pending",
        scorePoint: 1,
        scoreType: "Điểm trừ",
        scoreDescription: " Làm đối thủ lật ngửa",
        scoreTime: "10:20",
      },
      {
        refereeCompetitionId: 2,
        halfId: 2,
        halfName: "2",
        refereeCompetitionName: "Thanh",
        Id: 1,
        status: "Pending",
        scorePoint: 1,
        scoreType: "Điểm trừ",
        scoreDescription: " Làm đối thủ lật ngửa",
        scoreTime: "10:20",
      },
      {
        refereeCompetitionId: 2,
        halfId: 2,
        halfName: "2",
        refereeCompetitionName: "Thanh",
        Id: 1,
        status: "Pending",
        scorePoint: 1,
        scoreType: "Điểm trừ",
        scoreDescription: " Làm đối thủ lật ngửa",
        scoreTime: "10:20",
      },
      {
        refereeCompetitionId: 2,
        halfId: 2,
        halfName: "2",
        refereeCompetitionName: "Thanh",
        Id: 1,
        status: "Pending",
        scorePoint: 1,
        scoreType: "Điểm trừ",
        scoreDescription: " Làm đối thủ lật ngửa",
        scoreTime: "10:20",
      },
      {
        refereeCompetitionId: 2,
        halfId: 2,
        halfName: "2",
        refereeCompetitionName: "Thanh",
        Id: 1,
        status: "Pending",
        scorePoint: 1,
        scoreType: "Điểm trừ",
        scoreDescription: " Làm đối thủ lật ngửa",
        scoreTime: "10:20",
      },
      {
        refereeCompetitionId: 2,
        halfId: 2,
        halfName: "2",
        refereeCompetitionName: "Thanh",
        Id: 1,
        status: "Pending",
        scorePoint: 1,
        scoreType: "Điểm trừ",
        scoreDescription: " Làm đối thủ lật ngửa",
        scoreTime: "10:20",
      },
      {
        refereeCompetitionId: 2,
        halfId: 2,
        halfName: "2",
        refereeCompetitionName: "Thanh",
        Id: 1,
        status: "Pending",
        scorePoint: 1,
        scoreType: "Điểm trừ",
        scoreDescription: " Làm đối thủ lật ngửa",
        scoreTime: "10:20",
      },
      {
        refereeCompetitionId: 2,
        halfId: 2,
        halfName: "2",
        refereeCompetitionName: "Thanh",
        Id: 1,
        status: "Pending",
        scorePoint: 1,
        scoreType: "Điểm trừ",
        scoreDescription: " Làm đối thủ lật ngửa",
        scoreTime: "10:20",
      },
      {
        refereeCompetitionId: 2,
        halfId: 2,
        halfName: "2",
        refereeCompetitionName: "Thanh",
        Id: 1,
        status: "Pending",
        scorePoint: 1,
        scoreType: "Điểm trừ",
        scoreDescription: " Làm đối thủ lật ngửa",
        scoreTime: "10:20",
      },
      {
        refereeCompetitionId: 2,
        halfId: 2,
        halfName: "2",
        refereeCompetitionName: "Thanh",
        Id: 1,
        status: "Pending",
        scorePoint: 1,
        scoreType: "Điểm trừ",
        scoreDescription: " Làm đối thủ lật ngửa",
        scoreTime: "10:20",
      },
      {
        refereeCompetitionId: 2,
        halfId: 2,
        halfName: "2",
        refereeCompetitionName: "Thanh",
        Id: 1,
        status: "Pending",
        scorePoint: 1,
        scoreType: "Điểm trừ",
        scoreDescription: " Làm đối thủ lật ngửa",
        scoreTime: "10:20",
      },
    ],
  },
];
const ManagerMatchRefereeMain = () => {
  const { schedule_Id } = useParams();
  const [popupActive, setActive] = useState(false);
  const navigate = useNavigate();
  //luu trang thai ket noi
  const hubConnectionRef = useRef(null);
  const hubConnectionResultRef = useRef(null);
  const hubConnectionActionTeamOne = useRef(null);
  const hubConnectionActionTeamTow = useRef(null);
  //luu data check
  const previousDataRef = useRef(null);
  const previousResultDataRef = useRef(null);
  const previousActionTeamOneRef = useRef(null);
  const previousActionTeamTowRef = useRef(null);
  //data api view
  const [scoreTeamDetailApi, setScoreTeamDetailApi] = useState([]);
  const [actionTeamOneApi, setActionTeamOneApi] = useState([]);
  const [actionTeamTowApi, setActionTeamTowApi] = useState([]);
  //
  const competitionImage = sessionStorage.getItem("competitionImageReferee");
  const [currentTime, setCurrentTime] = useState("00:00");
  const [currentHalf, setCurrentHalf] = useState(1);
  const [timeCountDown, setTimeCountDown] = useState(null);
  const [isMatchOver, setIsMatchOver] = useState(false);
  const [matchProgress, setMatchProgress] = useState(0);
  const [matchDetail, setMatchDetail] = useState(null);
  const [loadApiConnectClient, setLoadApiConnectClient] = useState(false);
  const [teamMatchResult, setTeamMatchResult] = useState([]);
  const [noPlayMatch, setNoPlayMatch] = useState(false);

  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  useEffect(() => {
    const CallApi = () => {
      api
        .get(
          `/api/schedules/schedule-referee-main-match?scheduleID=${schedule_Id}`
        )
        .then((response) => {
          if (response.data !== "error") {
            setMatchDetail(response.data);
            console.log(response.data);

            setLoadApiConnectClient(true);
          } else {
            navigate(`/404error`);
          }
        });
    };
    if (matchDetail === null) {
      CallApi();
    }
  }, []);
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
        setTeamMatchResult(data);

        previousResultDataRef.current = data;
      }
    };
    const handleActionTeamOne = (data) => {
      const dataString = JSON.stringify(data);
      const previousDataString = JSON.stringify(
        previousActionTeamOneRef.current
      );

      if (dataString !== previousDataString) {
        console.log(data);
        setActionTeamOneApi(data);
        previousActionTeamOneRef.current = data;
      }
    };
    const handleActionTeamTow = (data) => {
      const dataString = JSON.stringify(data);
      const previousDataString = JSON.stringify(
        previousActionTeamTowRef.current
      );

      if (dataString !== previousDataString) {
        console.log(data);
        setActionTeamTowApi(data);
        previousActionTeamTowRef.current = data;
      }
    };
    const connectHubClient = () => {
      setLoadApiConnectClient(false);
      connectHub({
        client: `match-deatail/${matchDetail.matchId}`,
        onDataReceived: handleData,
      }).then((hubConnection) => {
        hubConnectionRef.current = hubConnection;
      });
      connectHub({
        client: `team-match-result/${matchDetail.matchId}`,
        onDataReceived: handleResultData,
      }).then((hubConnection) => {
        hubConnectionResultRef.current = hubConnection;
      });
      connectHub({
        client: `list-point/${matchDetail.scheduleData[0].teamMatchId}`,
        onDataReceived: handleActionTeamOne,
      }).then((hubConnection) => {
        hubConnectionActionTeamOne.current = hubConnection;
      });
      connectHub({
        client: `list-point/${matchDetail.scheduleData[1].teamMatchId}`,
        onDataReceived: handleActionTeamTow,
      }).then((hubConnection) => {
        hubConnectionActionTeamTow.current = hubConnection;
      });
    };

    const connectClient = () => {
      setLoadApiConnectClient(false);
      //connectClient ResultPlayClient
      api
        .get(`/api/matches/match-total-point?matchId=${matchDetail.matchId}`)
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
            setTeamMatchResult(response.data);
            previousDataRef.current = response.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
      //connectClient MatchDetail
      api
        .get(`/api/matches/match-detail-action?matchID=${matchDetail.matchId}`)
        .then((response) => {
          if (response.data === "timeout") {
            setLoadApiConnectClient(true);
            if (hubConnectionRef.current) {
              hubConnectionRef.current.stop();
              hubConnectionRef.current = null;
            }
            if (hubConnectionResultRef.current) {
              hubConnectionResultRef.current.stop();
              hubConnectionResultRef.current = null;
            }
          } else if (
            response.data !== "notstarted" &&
            Array.isArray(response.data) &&
            response.data.length > 0
          ) {
            if (hubConnectionRef.current) {
              hubConnectionRef.current.stop();
              hubConnectionRef.current = null;
            }
            if (hubConnectionResultRef.current) {
              hubConnectionResultRef.current.stop();
              hubConnectionResultRef.current = null;
            }
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
            if (hubConnectionRef.current) {
              hubConnectionRef.current.stop();
              hubConnectionRef.current = null;
            }
            if (hubConnectionResultRef.current) {
              hubConnectionResultRef.current.stop();
              hubConnectionResultRef.current = null;
            }
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
      if (hubConnectionActionTeamOne.current) {
        hubConnectionActionTeamOne.current.stop();
      }
      if (hubConnectionActionTeamTow.current) {
        hubConnectionActionTeamTow.current.stop();
      }
    };
  }, [loadApiConnectClient]);

  useEffect(() => {
    if (matchDetail !== null && matchProgress !== "error") {
      const calculateMatchTime = () => {
        const now = new Date();

        // Kiểm tra nếu `timeIn` và `timeOut` tồn tại
        const [hoursIn, minutesIn, secondsIn] = matchDetail.timeInMatch
          ? matchDetail.timeInMatch.split(":")
          : [0, 0, 0];
        const [hoursOut, minutesOut, secondsOut] = matchDetail.timeOutMatch
          ? matchDetail.timeOutMatch.split(":")
          : [0, 0, 0];

        const matchStartTime = new Date();
        matchStartTime.setHours(hoursIn, minutesIn, secondsIn);

        const matchEndTime = new Date();
        matchEndTime.setHours(hoursOut, minutesOut, secondsOut);

        // Kiểm tra nếu trận đấu đã kết thúc
        if (now > matchEndTime) {
          setIsMatchOver(true);
          setMatchProgress(100);
          return; // Dừng tính toán nếu trận đấu đã kết thúc
        }

        // Tính số giây đã trôi qua kể từ khi trận đấu bắt đầu
        const elapsedSeconds = Math.floor((now - matchStartTime) / 1000);
        const totalMatchSeconds = Math.floor(
          (matchEndTime - matchStartTime) / 1000
        );

        if (elapsedSeconds >= 0) {
          // Tính số phút và giây hiện tại
          const minutes = Math.floor(elapsedSeconds / 60);
          const seconds = elapsedSeconds % 60;

          setCurrentTime(
            `${minutes.toString().padStart(2, "0")}:${seconds
              .toString()
              .padStart(2, "0")}`
          );

          // Tính tổng thời gian cho mỗi hiệp đấu (bao gồm cả thời gian nghỉ)
          const minutesPerHalf =
            (50 - matchDetail.breakTimeHaft * (matchDetail.numberHaft - 1)) /
            matchDetail.numberHaft;

          // Tính hiệp đấu hiện tại
          let half = 1;
          let remainingMinutes = elapsedSeconds / 60;

          for (let i = 1; i <= matchDetail.numberHaft; i++) {
            if (remainingMinutes < minutesPerHalf) {
              half = i;
              break;
            }
            remainingMinutes -= minutesPerHalf + matchDetail.breakTimeHaft;
          }

          setCurrentHalf(half);

          // Tính toán phần trăm trận đấu đã diễn ra
          const progress = Math.min(
            (elapsedSeconds / totalMatchSeconds) * 100,
            100
          );
          setMatchProgress(progress);
        }
      };

      const timer = setInterval(calculateMatchTime, 1000);
      return () => clearInterval(timer);
    }

    // Dọn dẹp khi component bị unmount hoặc khi trận đấu kết thúc
  }, [matchDetail, isMatchOver]);
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
  return (
    <div
      className="schedule_referee_manager_container"
      style={
        timeCountDown
          ? {
              backgroundImage: `url(${competitionImage})`,
              justifyContent: "center",
            }
          : {
              backgroundImage: `url(${competitionImage})`,
              justifyContent: "space-between",
            }
      }
    >
      {timeCountDown ? (
        <MatchWaitStart timeLeft={timeLeft} />
      ) : (
        <>
          <div className="schedule_referee_manager_head">
            <div className="schedule_manager_head_team">
              {teamMatchResult?.map((teamMatch) => (
                <div className="manager_head_team_item" key={teamMatch.id}>
                  <img
                    src={teamMatch.teamImage}
                    alt="teamLogo"
                    className="manager_head_team_img"
                  />
                  <div className="manager_head_team_name">
                    {teamMatch.teamName}
                  </div>
                  <div className="manager_head_team_result">
                    {teamMatch.tolalScore}
                  </div>
                </div>
              ))}
            </div>
            <div className="schedule_manager_head_time">
              <div className="haft_name_view">Hiệp {currentHalf}</div>
            </div>
            <div className="schedule_manager_head_percent">
              <div className="progress_bar">
                <div
                  className="progress_bar_fill"
                  style={{ width: `${matchProgress + 5}%` }}
                ></div>
              </div>
              <div
                className="progress_bar_time"
                style={
                  !isMatchOver
                    ? { left: `${matchProgress}%` }
                    : { left: `${matchProgress - 5}%` }
                }
              >
                {currentTime}
              </div>
            </div>
            <div className="schedule_manager_head_action">
              {!isMatchOver ? (
                <div className="btn_manager_head_none">
                  Trận đấu đang diển ra
                </div>
              ) : (
                <div
                  className={`btn_manager_head ${isMatchOver ? "active" : ""}`}
                >
                  Lưu Kết Quả và Thoát
                </div>
              )}
            </div>
          </div>
          <div className="schedule_referee_manager_body">
            <ManagerMatchAction halfAction={actionTeamOneApi} view={"left"} />
            <div className="schedule_manager_detail_body">
              <div className="schedule_manager_detail_content">
                <MatchProgess
                  timeCountDown={timeCountDown}
                  noPlayMatch={noPlayMatch}
                  timeLeft={timeLeft}
                  scoreTeamDetailApi={scoreTeamDetailApi}
                  setActive={setActive}
                />
              </div>
            </div>
            <ManagerMatchAction halfAction={actionTeamTowApi} view={"right"} />
          </div>
        </>
      )}
    </div>
  );
};

export default ManagerMatchRefereeMain;
