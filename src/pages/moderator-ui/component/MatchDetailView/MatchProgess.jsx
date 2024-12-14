import React, { useEffect, useRef, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import RandomTeamWinner from "../../../system-ui/component/RandomTeamWinner/RandomTeamWinner";
const MatchProgess = ({
  timeCountDown,
  noPlayMatch,
  timeLeft,
  scoreTeamDetailApi,
  setActive,
}) => {
  const containerRef = useRef(null);
  const [showScrollArrow, setShowScrollArrow] = useState("down");
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
      return parseInt(a.timeScore.replace(":", "")) - parseInt(b.timeScore.replace(":", ""));
    });
    return mergedActivities;
    
  }
  return (
    <div className="view_data_match_container" ref={containerRef}>
      {/* <RandomTeamWinner/> */}
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
              <div className="info_haft_match">{`HIỆP ${haft.haftName}`}</div>
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
  );
};

export default MatchProgess;
