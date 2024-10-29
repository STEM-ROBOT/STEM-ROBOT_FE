import React, { useEffect, useState } from "react";
import "./ScheduleRefereeMain.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import RenderSchedule from "../../component/RenderSchedule/RenderSchedule";
import ConfirmPopupReferee from "../../component/ConfirmPopupReferee/ConfirmPopupReferee";

const scheduleData = {
  refereeId: "123",
  refereeEmail: "lethanhnhat@gmail.com",
  dateStartCompetition: "2024-10-20",
  dateEndCompetition: "2024-11-10",
  hourStartInDay: "8",
  hourEndInDay: "18",
  timePlayMatch: "165",
  scheduleReferee: [
    {
      scheduleId: "1",
      scheduleTime: "2024-10-27T09:10:00",
      location: "Sân 1",
      matchId: "1",
      teamMatch: [
        {
          teamId: "1",
          teamLogo:
            "https://upload.wikimedia.org/wikipedia/vi/thumb/a/a1/Man_Utd_FC_.svg/2021px-Man_Utd_FC_.svg.png",
          teamType: "home",
        },
        {
          teamId: "2",
          teamLogo:
            "https://upload.wikimedia.org/wikipedia/vi/thumb/a/a1/Man_Utd_FC_.svg/2021px-Man_Utd_FC_.svg.png",
          teamType: "away",
        },
      ],
    },
    {
      scheduleId: "2",
      scheduleTime: "2024-10-27T15:00:00",
      location: "Sân 1",
      matchId: "2",
      teamMatch: [
        {
          teamId: "3",
          teamLogo:
            "https://upload.wikimedia.org/wikipedia/vi/thumb/a/a1/Man_Utd_FC_.svg/2021px-Man_Utd_FC_.svg.png",
          teamType: "home",
        },
        {
          teamId: "4",
          teamLogo:
            "https://upload.wikimedia.org/wikipedia/vi/thumb/a/a1/Man_Utd_FC_.svg/2021px-Man_Utd_FC_.svg.png",
          teamType: "away",
        },
      ],
    },
    {
      scheduleId: "3",
      scheduleTime: "2024-10-28T13:00:00",
      location: "Sân 1",
      matchId: "2",
      teamMatch: [
        {
          teamId: "3",
          teamLogo:
            "https://upload.wikimedia.org/wikipedia/vi/thumb/a/a1/Man_Utd_FC_.svg/2021px-Man_Utd_FC_.svg.png",
          teamType: "home",
        },
        {
          teamId: "4",
          teamLogo:
            "https://upload.wikimedia.org/wikipedia/vi/thumb/a/a1/Man_Utd_FC_.svg/2021px-Man_Utd_FC_.svg.png",
          teamType: "away",
        },
      ],
    },
    {
      scheduleId: "4",
      scheduleTime: "2024-10-29T10:00:00",
      location: "Sân 1",
      matchId: "2",
      teamMatch: [
        {
          teamId: "3",
          teamLogo:
            "https://upload.wikimedia.org/wikipedia/vi/thumb/a/a1/Man_Utd_FC_.svg/2021px-Man_Utd_FC_.svg.png",
          teamType: "home",
        },
        {
          teamId: "4",
          teamLogo:
            "https://upload.wikimedia.org/wikipedia/vi/thumb/a/a1/Man_Utd_FC_.svg/2021px-Man_Utd_FC_.svg.png",
          teamType: "away",
        },
      ],
    },
    // Thêm dữ liệu lịch trình
  ],
};

const ScheduleRefereeMain = () => {
  const [weeks, setWeeks] = useState([]);
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const [currentWeek, setCurrentWeek] = useState([]);
  const [matchView, setMatchView] = useState();
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    const splitIntoWeeks = (start, end) => {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const weeksArray = [];

      while (startDate <= endDate) {
        const weekStart = new Date(startDate);
        const weekEnd = new Date(
          Math.min(
            startDate.getTime() + 6 * 24 * 60 * 60 * 1000,
            endDate.getTime()
          )
        );

        weeksArray.push({
          start: weekStart,
          end: weekEnd,
        });

        // Move to next week
        startDate.setDate(startDate.getDate() + 7);
      }

      return weeksArray;
    };

    const weeksList = splitIntoWeeks(
      scheduleData.dateStartCompetition,
      scheduleData.dateEndCompetition
    );

    setWeeks(weeksList);

    // Tính toán tuần hiện tại khi thi đấu đã bắt đầu
    const today = new Date();
    const initialWeekIndex = weeksList.findIndex(
      (week) => week.start <= today && week.end >= today
    );

    // Nếu tìm thấy tuần hiện tại, đặt `currentWeekIndex` là tuần đó
    if (initialWeekIndex !== -1) {
      setCurrentWeekIndex(initialWeekIndex);
    } else {
      // Nếu không tìm thấy (ngày hiện tại nằm ngoài khoảng thời gian thi đấu)
      setCurrentWeekIndex(0);
    }
  }, []);

  const handlePreviousWeek = () => {
    if (currentWeekIndex > 0) {
      setCurrentWeekIndex(currentWeekIndex - 1);
    }
  };

  const handleNextWeek = () => {
    if (currentWeekIndex < weeks.length - 1) {
      setCurrentWeekIndex(currentWeekIndex + 1);
    }
  };

  return (
    <div className="rule_competition_referee">
      <div className="score_competition_referee_layout">
        <div className="score_competition_referee_item_layout">
          <div className="rule_competition_referee_head">
            <div className="rule_referee_head">
              Lịch trình điều hành trận đấu
            </div>
          </div>
          <div className="rule_score_referee_container">
            <div className="rule_score_referee_view">
              <div className="schedule_referee_view_head">
                {/* <div className="schedule_referee_note"></div> */}
                {weeks.length > 0 && (
                  <div className="week_navigation">
                    <button
                      onClick={handlePreviousWeek}
                      disabled={currentWeekIndex === 0}
                      className="navigation_button"
                    >
                      <FaArrowLeft />
                    </button>
                    <span className="week_display">
                      <span className="week_display">
                        {`Ngày ${weeks[
                          currentWeekIndex
                        ].start.toLocaleDateString("vi-VN", {
                          month: "numeric",
                          day: "numeric",
                        })} - ${weeks[currentWeekIndex].end.toLocaleDateString(
                          "vi-VN",
                          {
                            month: "numeric",
                            day: "numeric",
                          }
                        )}, ${weeks[currentWeekIndex].end.getFullYear()}`}
                      </span>
                    </span>
                    <button
                      onClick={handleNextWeek}
                      disabled={currentWeekIndex === weeks.length - 1}
                      className="navigation_button"
                    >
                      <FaArrowRight />
                    </button>
                  </div>
                )}
                {/* <div className="schedule_referee_note">
                  <div className="schedule_note happening" >Chuẩn bị</div>
                  <div className="schedule_note happened" >Đang </div>
                </div> */}
              </div>
              <div className="schedule_referee_view_body">
                {weeks.length > 0 && (
                  <RenderSchedule
                    week={weeks[currentWeekIndex]}
                    scheduleData={scheduleData}
                    setMatchView={setMatchView}
                    setShowPopup={setShowPopup}
                  />
                )}
                {showPopup && (
                  <ConfirmPopupReferee
                    match_view={matchView}
                    setShowPopup={setShowPopup}
                    email={scheduleData.refereeEmail}
                    refereeId={scheduleData.refereeId}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleRefereeMain;
