import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import LoadingComponent from "../../../system-ui/component/Loading/LoadingComponent";
const ManagerMatchAction = ({
  halfAction,
  view,
  handleClick,
  idLoadAction,
}) => {
  const sortedActions = halfAction?.halfActionTeam?.sort((a, b) => {
    if (
      a.status?.toLocaleLowerCase() === "pending" &&
      b.status?.toLocaleLowerCase() !== "pending"
    ) {
      return 1; // Đưa "pending" xuống dưới
    }
    if (
      a.status?.toLocaleLowerCase() !== "pending" &&
      b.status?.toLocaleLowerCase() === "pending"
    ) {
      return -1; // Đưa các trạng thái khác lên trên
    }
    return 0; // Giữ nguyên thứ tự nếu cả hai đều "pending" hoặc không
  });

  return (
    <div className="schedule_manager_body_item ">
      {view === "left" ? (
        <div className={`schedule_manager_head_body left`}>
          <img
            src={halfAction?.teamImage}
            alt=""
            className="manager_body_team_img"
          />
          <div className="manager_body_team_name">{halfAction?.teamName}</div>
          <div className="manager_body_team_result">
            {halfAction?.teamMatchResult}
          </div>
        </div>
      ) : (
        <div className={`schedule_manager_head_body right`}>
          <div className="manager_body_team_result">
            {halfAction?.teamMatchResult}
          </div>
          <div className="manager_body_team_name">{halfAction?.teamName}</div>
          <img
            src={halfAction?.teamImage}
            alt=""
            className="manager_body_team_img"
          />
        </div>
      )}

      <div className="schedule_body_view_action">
        <div className="schedule_view_action_item">
          <div className="view_action_name_referee">Gửi từ</div>
          <div className="view_action_time_referee">Thời gian</div>
          <div className="view_action_haft_referee">Hiệp</div>
          <div className="view_action_score_referee">Điểm</div>
          <div className="view_action_status_referee">Trạng thái</div>
        </div>
        <div className="view_action_body_table">
          {sortedActions?.map((action, i) => (
            <div key={i} className="schedule_view_action_item data">
              {idLoadAction == action.id ? (
                <img
                  className="action_confirm_load"
                  src="https://i.gifer.com/embedded/download/PG23.gif"
                />
              ) : (
                <>
                  <div
                    className="match_score_description"
                    style={{
                      top: "1px",
                      bottom: "none",
                      height: "fit-content",
                      width: "300px",
                      backgroundColor: "#fff",
                      color: "#000",
                    }}
                  >
                    {action.scoreDescription}
                  </div>
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
                      action.status?.toLocaleLowerCase() == "pending"
                        ? "view_action_status_referee pending"
                        : action.status?.toLocaleLowerCase() == "accept"
                        ? "view_action_status_referee accept"
                        : "view_action_status_referee cancel"
                    }
                  >
                    {action.status?.toLocaleLowerCase() == "pending"
                      ? "Đang chờ xử lí"
                      : action.status?.toLocaleLowerCase() == "accept"
                      ? "Đã công nhận"
                      : "Không công nhận"}
                  </div>
                  {action.status?.toLocaleLowerCase() == "pending" && (
                    <div className="view_action_haft_btn_layout">
                      <div className="btn_action_show_view">
                        <div className="btn_action_show_view_indicator"></div>
                      </div>
                      <FaCheckCircle
                        onClick={() => handleClick("accept", action.id)}
                        className="btn_action_haft_icon accept"
                      />
                      <ImCancelCircle
                        onClick={() => handleClick("cancel", action.id)}
                        className="btn_action_haft_icon cancel"
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManagerMatchAction;
