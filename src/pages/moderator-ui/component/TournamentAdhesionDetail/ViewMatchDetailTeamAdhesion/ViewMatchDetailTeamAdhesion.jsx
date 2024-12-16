import React from "react";
import "./ViewMatchDetailTeamAdhesion.css";
import { FaCheckCircle } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import LoadingComponent from "../../../../system-ui/component/Loading/LoadingComponent";
const ViewMatchDetailTeamAdhesion = ({ halfActions, view }) => {
  const halfAction = {
    id:1,
    teamName: "Eagles United",
    teamImage: "https://th.bing.com/th/id/R.282a436ecbac6c3e756a1160d0067660?rik=HTebDQ6%2bKRcJ2g&pid=ImgRaw&r=0", // Placeholder image link
    teamMatchResult: "3-1",
    halfActionTeam: [
      {
        id: 1,
        scoreTime: "10:15",
        halfName: "1",
        scoreType: "Điểm cộng",
        scorePoint: 2,
        scoreDescription: "Cầu thủ A ghi bàn từ pha sút phạt.",
        status: "accept",
      },
      {
        id: 2,
        scoreTime: "25:30",
        halfName: "1",
        scoreType: "Điểm trừ",
        scorePoint: 1,
        scoreDescription: "Lỗi việt vị của cầu thủ B.",
        status: "cancel",
      },
      {
        id: 3,
        scoreTime: "40:05",
        halfName: "2",
        scoreType: "Điểm cộng",
        scorePoint: 3,
        scoreDescription: "Pha sút xa đẹp mắt từ cầu thủ C.",
        status: "accept",
      },
      {
        id: 4,
        scoreTime: "55:20",
        halfName: "2",
        scoreType: "Điểm cộng",
        scorePoint: 1,
        scoreDescription: "Pha phạt góc dẫn đến bàn thắng của cầu thủ D.",
        status: "pending",
      },
      {
        id: 5,
        scoreTime: "70:10",
        halfName: "2",
        scoreType: "Điểm trừ",
        scorePoint: 2,
        scoreDescription: "Lỗi phạm quy trong khu vực cấm địa.",
        status: "cancel",
      },
    ],
  };

  return (
    <div className="schedule_manager_body_item team">
      {view === "left" ? (
        <div className={`schedule_manager_head_body left`}>
          <img
            src={halfAction?.teamImage}
            alt=""
            className="manager_body_team_img team"
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
          {/* //<div className="view_action_name_referee">Gửi từ</div> */}
          <div
            className="view_action_time_referee"
            style={{
              width: "20%",
            }}
          >
            Thời gian
          </div>
          <div
            className="view_action_haft_referee"
            style={{
              width: "20%",
            }}
          >
            Hiệp
          </div>
          <div
            className="view_action_score_referee"
            style={{
              width: "20%",
            }}
          >
            Điểm
          </div>
          <div className="view_action_status_referee">Trạng thái</div>
        </div>
        <div className="view_action_body_table team">
          {halfAction?.halfActionTeam?.map((action, i) => (
            <div key={i} className="schedule_view_action_item data">
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
                {/* <div className="view_action_name_referee">
                    TT {action.refereeCompetitionName}
                  </div> */}
                <div
                  className="view_action_time_referee"
                  style={{
                    width: "20%",
                  }}
                >
                  {action.scoreTime}
                </div>
                <div
                  className="view_action_haft_referee"
                  style={{
                    width: "20%",
                  }}
                >
                  Hiệp {action.halfName}
                </div>
                <div
                  className="view_action_score_referee data"
                  style={{
                    width: "20%",
                  }}
                >
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
                {/* {action.status?.toLocaleLowerCase() == "pending" && (
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
                  )} */}
              </>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewMatchDetailTeamAdhesion;
