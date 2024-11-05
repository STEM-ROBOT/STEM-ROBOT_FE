import React from "react";
import "./RenderSchedule.css";
import { FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const RenderSchedule = ({ week, scheduleData, setMatchView, setShowPopup }) => {
  const weekStart = week.start;
  const weekEnd = week.end;

  const scheduleForWeek = scheduleData.scheduleReferee.filter((schedule) => {
    const scheduleDate = new Date(schedule.scheduleTime);
    return scheduleDate >= weekStart && scheduleDate <= weekEnd;
  });

  const days = Array.from(
    { length: 7 },
    (_, index) => new Date(weekStart.getTime() + index * 24 * 60 * 60 * 1000)
  );

  // Tạo danh sách các giờ từ giờ bắt đầu đến giờ kết thúc
  const listTimePlay = (start, end) => {
    const startHour = parseInt(start.split(":")[0], 10);
    const endHour = parseInt(end.split(":")[0], 10);
    const timeList = [];

    for (let hour = startHour; hour <= endHour; hour++) {
      const timeString = hour < 10 ? `0${hour}:00` : `${hour}:00`;
      timeList.push({ time: timeString });
    }

    return timeList;
  };

  // Tính chiều cao mỗi giờ (đơn vị: pixel)
  const hourHeight = 120.8; // 120px cho mỗi giờ
  const totalDayHeight =
    (parseInt(scheduleData.hourEndInDay, 10) -
      parseInt(scheduleData.hourStartInDay, 10) +
      1) *
    hourHeight;
  console.log(totalDayHeight);
  const ShowMatchCard = (match) => {
    setMatchView(match);
    setShowPopup(true);
  };
  return (
    <div className="schedule_week">
      <div className="schedule_week_container">
        <div className="schedule_week_header">
          <div className="schedule_week_header_container">
            <div className="day_header_time_referee">
              <div className="day_header_time_item">
                <div className="day_header_time_item_data">
                  <FaClock className="day_header_time_icon" />
                </div>
              </div>
            </div>
            <div className="day_header_time_week">
              {days.map((day) => (
                <div key={day.toISOString()} className="day_header">
                  {day.toLocaleDateString("vi-VN", {
                    weekday: "long",
                    day: "numeric",
                    month: "numeric",
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="schedule_week_body">
          <div className="schedule_week_body_container">
            <div className="day_body_hour">
              {listTimePlay(
                scheduleData.hourStartInDay,
                scheduleData.hourEndInDay
              ).map((hour, i) => (
                <div
                  key={i}
                  style={{
                    height: `${hourHeight}px`,
                  }}
                  className="day_body_hour_item"
                >
                  <div className="day_body_hour_item_data">{hour.time}</div>
                </div>
              ))}
            </div>
            <div className="day_body_match_week">
              {days.map((day) => (
                <div
                  key={day.toISOString()}
                  className="schedule_day"
                  style={{
                    height: `${totalDayHeight - 0.2}px`,
                    maxHeight: `${totalDayHeight - 0.2}px`,
                  }}
                >
                  {listTimePlay(
                    scheduleData.hourStartInDay,
                    scheduleData.hourEndInDay
                  ).map((_, idx) => (
                    <div
                      key={idx}
                      className="schedule_day_hour_item_body"
                      style={{
                        height: `${hourHeight}px`,
                      }}
                    ></div>
                  ))}
                  <div className="day_matches">
                    {scheduleForWeek
                      .filter(
                        (schedule) =>
                          new Date(schedule.scheduleTime).toDateString() ===
                          day.toDateString()
                      )
                      .map((match) => {
                        const startTime = new Date(match.scheduleTime);
                        const endTime = new Date(
                          startTime.getTime() +
                            scheduleData.timePlayMatch * 60000
                        );

                        const startHour =
                          startTime.getHours() + startTime.getMinutes() / 60;
                        const endHour =
                          endTime.getHours() + endTime.getMinutes() / 60;

                        // Tính toán vị trí và chiều cao của thẻ match_card
                        const topPosition =
                          (startHour - scheduleData.hourStartInDay) *
                          hourHeight;
                        const matchHeight = (endHour - startHour) * hourHeight;
                        console.log(matchHeight);
                        return (
                          <div
                            key={match.scheduleId}
                            className="match_card"
                            style={{
                              top: `${topPosition}px`,
                              height: `${matchHeight}px`,
                            }}
                            onClick={() => ShowMatchCard(match)}
                          >
                            <div className="match_time_referee">
                              <div className="match_time_referee_item">
                                {startTime.toLocaleTimeString("vi-VN", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </div>
                              <div className="match_time_referee_item">
                                {endTime.toLocaleTimeString("vi-VN", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </div>
                            </div>

                            <div className="match_location_referee">
                              <div className="match_location_referee_item">
                                <FaLocationDot className="match_location_referee_icon" />
                                {match.location}
                              </div>
                            </div>
                            <div className="match_teams_referee">
                              <div className="match_teams_referee_item">
                                {match.teamMatch.map((team, idx) => (
                                  <img
                                    key={idx}
                                    src={team.teamLogo}
                                    alt={`Team ${team.teamType}`}
                                    className="team_logo"
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
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

export default RenderSchedule;
