import React, { useEffect, useState } from "react";
import "./ManagerMatchRefereeMain.css";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";

const teamMatchResult = [
  {
    id: 1,
    teamMatchResultPlay: 3,
    teamName: "Manchester United",
    teamImage:
      "https://logos-world.net/wp-content/uploads/2020/06/Manchester-United-emblem.png",
  },
  {
    id: 2,
    teamMatchResultPlay: 0,
    teamName: "Manchester City",
    teamImage:
      "https://th.bing.com/th/id/R.28ef82cde8a6e5a407808eca8d9e0d3d?rik=SoHbleJsdLHSaQ&pid=ImgRaw&r=0",
  },
];

const matchDetail = {
  timeIn: "12:40:00",
  timeOut: "13:00:00",
  numberHaft: 3,
  breakTimeHaft: 5,
};
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
  const [currentTime, setCurrentTime] = useState("00:00");
  const [currentHalf, setCurrentHalf] = useState(1);
  const [isMatchOver, setIsMatchOver] = useState(false);
  const [matchProgress, setMatchProgress] = useState(0);

  useEffect(() => {
    const calculateMatchTime = () => {
      const now = new Date();
      const [hoursIn, minutesIn, secondsIn] = matchDetail.timeIn.split(":");
      const [hoursOut, minutesOut, secondsOut] = matchDetail.timeOut.split(":");

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

    // Dọn dẹp khi component bị unmount hoặc khi trận đấu kết thúc
    return () => clearInterval(timer);
  }, [isMatchOver]);

  return (
    <div className="schedule_referee_manager_container">
      <div className="schedule_referee_manager_head">
        <div className="schedule_manager_head_team">
          {teamMatchResult?.map((teamMatch) => (
            <div className="manager_head_team_item" key={teamMatch.id}>
              <img
                src={teamMatch.teamImage}
                alt=""
                className="manager_head_team_img"
              />
              <div className="manager_head_team_name">{teamMatch.teamName}</div>
              <div className="manager_head_team_result">
                {teamMatch.teamMatchResultPlay}
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
            <div className="btn_manager_head_none">Trận đấu đang diển ra</div>
          ) : (
            <div className={`btn_manager_head ${isMatchOver ? "active" : ""}`}>
              Lưu Kết Quả và Thoát
            </div>
          )}
        </div>
      </div>
      <div className="schedule_referee_manager_body">
        <div className="schedule_manager_body_item ">
          <div className="schedule_manager_head_body left">
            <img
              src={halfAction[0].teamImage}
              alt=""
              className="manager_body_team_img"
            />
            <div className="manager_body_team_name">
              {halfAction[0].teamName}
            </div>
            <div className="manager_body_team_result">
              {halfAction[0].teamMatchResult}
            </div>
          </div>
          <div className="schedule_body_view_action">
            <div className="schedule_view_action_item">
              <div className="view_action_name_referee">Gửi từ</div>
              <div className="view_action_time_referee">Thời gian</div>
              <div className="view_action_haft_referee">Hiệp</div>
              <div className="view_action_score_referee">Điểm</div>
              <div className="view_action_status_referee">Trạng thái</div>
            </div>
            <div className="view_action_body_table">
              {halfAction[0].halfActionTeam.map((action, i) => (
                <div key={i} className="schedule_view_action_item data">
                  <div className="view_action_name_referee">
                    TT {action.refereeCompetitionName}
                  </div>
                  <div className="view_action_time_referee">
                    {action.scoreTime}
                  </div>
                  <div className="view_action_haft_referee">
                    Hiệp {action.halfName}
                  </div>
                  <div className="view_action_score_referee data">
                    {action.scoreType.toLocaleLowerCase() == "điểm cộng" ? (
                      <div className="score_point_action  bonus">
                        +{action.scorePoint}
                      </div>
                    ) : (
                      <div className="score_point_action minus">
                        -{action.scorePoint}
                      </div>
                    )}
                  </div>
                  <div
                    className={
                      action.status.toLocaleLowerCase() == "pending"
                        ? "view_action_status_referee pending"
                        : action.status.toLocaleLowerCase() == "accept"
                        ? "view_action_status_referee accept"
                        : "view_action_status_referee cancel"
                    }
                  >
                    {action.status.toLocaleLowerCase() == "pending"
                      ? "Đang chờ xử lí"
                      : action.status.toLocaleLowerCase() == "accept"
                      ? "Đã công nhận"
                      : "Không công nhận"}
                  </div>
                  {action.status.toLocaleLowerCase() == "pending" && (
                    <div className="view_action_haft_btn_layout">
                      <div className="btn_action_show_view">
                        <div className="btn_action_show_view_indicator"></div>
                      </div>
                      <FaCheckCircle className="btn_action_haft_icon accept" />
                      <ImCancelCircle className="btn_action_haft_icon cancel" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="schedule_manager_detail_body">asdasdsadsadsad</div>
        <div className="schedule_manager_body_item">
          <div className="schedule_manager_head_body right">
            <div className="manager_body_team_result">
              {halfAction[0].teamMatchResult}
            </div>
            <div className="manager_body_team_name">
              {halfAction[0].teamName}
            </div>

            <img
              src={halfAction[0].teamImage}
              alt=""
              className="manager_body_team_img"
            />
          </div>
          <div className="schedule_body_view_action">
            <div className="schedule_view_action_item">
              <div className="view_action_name_referee">Gửi từ</div>
              <div className="view_action_time_referee">Thời gian</div>
              <div className="view_action_haft_referee">Hiệp</div>
              <div className="view_action_score_referee">Điểm</div>
              <div className="view_action_status_referee">Trạng thái</div>
            </div>
            <div className="view_action_body_table">
              {halfAction[0].halfActionTeam.map((action, i) => (
                <div key={i} className="schedule_view_action_item data">
                  <div className="view_action_name_referee">
                    TT {action.refereeCompetitionName}
                  </div>
                  <div className="view_action_time_referee">
                    {action.scoreTime}
                  </div>
                  <div className="view_action_haft_referee">
                    Hiệp {action.halfName}
                  </div>
                  <div className="view_action_score_referee data">
                    {action.scoreType.toLocaleLowerCase() == "điểm cộng" ? (
                      <div className="score_point_action  bonus">
                        +{action.scorePoint}
                      </div>
                    ) : (
                      <div className="score_point_action minus">
                        -{action.scorePoint}
                      </div>
                    )}
                  </div>
                  <div
                    className={
                      action.status.toLocaleLowerCase() == "pending"
                        ? "view_action_status_referee pending"
                        : action.status.toLocaleLowerCase() == "accept"
                        ? "view_action_status_referee accept"
                        : "view_action_status_referee cancel"
                    }
                  >
                    {action.status.toLocaleLowerCase() == "pending"
                      ? "Đang chờ xử lí"
                      : action.status.toLocaleLowerCase() == "accept"
                      ? "Đã công nhận"
                      : "Không công nhận"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerMatchRefereeMain;
