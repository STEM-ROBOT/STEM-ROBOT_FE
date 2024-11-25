import React, { useEffect, useState } from "react";
import "./TeamList.css";
import { useParams } from "react-router-dom";
import api from "../../../../config";

const TeamList = ({ isPublic }) => {
  const { league_id } = useParams();
  const [teamRegister, setTeamRegister] = useState();
  const getStatusClass = (status) => {
    switch (status) {
      case "Đang xử lý":
        return "status review";
      case "Chấp nhận":
        return "status accepted";
      case "Từ chối":
        return "status rejected";
      case "Được mời":
        return "status invited";
      case "Từ chối lời mời":
        return "status declined";
      default:
        return "";
    }
  };
  useEffect(() => {
    api
      .get(`/api/teams-register/by-tournament/${league_id}`)
      .then((response) => {
        setTeamRegister(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    const targetPosition = 285;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 500;
    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const scrollY = Math.min(
        startPosition + (distance * progress) / duration,
        targetPosition
      );
      window.scrollTo(0, scrollY);
      if (scrollY < targetPosition) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, []);
  return (
    <div className="team_list_container">
      <div className="status_overview">
        <span className="status_info">
          <i className="status_icon">ℹ️</i> Ở trạng thái <b>Chấp nhận</b> thì
          đội thi đấu sẽ không thể thay đổi được thông tin đăng ký.
        </span>
        <button className="guide_button">Hướng dẫn</button>
      </div>
      <div className="status_badges">
        <span className="badge review">Đang xét: 0</span>
        <span className="badge accepted">Chấp nhận: 0</span>
        <span className="badge rejected">Từ chối: 0</span>
      </div>
      <div className="team_table">
        <div className="table_header">
          <div className="column_header">#</div>
          <div className="column_header">Tên Đội</div>
          <div className="column_header">Thành Viên</div>
          <div className="column_header">Nội Dung Thi</div>
          <div className="column_header">Người Liên Hệ</div>
          <div className="column_header">SĐT Liên Hệ</div>
          <div className="column_header">T/G Đăng Ký</div>
          <div className="column_header">Trạng Thái</div>
        </div>
        <div className="table_body">
          {teamRegister?.length > 0 ? (
            teamRegister?.map((team, i) => (
              <div key={team.id} className="table_row">
                <div className="table_cell">{i + 1}</div>
                <div className="table_cell">{team.name}</div>
                <div className="table_cell">{team.members}</div>
                <div className="table_cell">{team.competition}</div>
                <div className="table_cell">{team.contactPerson}</div>
                <div className="table_cell">{team.contactPhone}</div>
                <div className="table_cell">
                  {team.registerTime.replace("T", " ").slice(0, -3)}
                </div>
                <div className={`table_cell ${getStatusClass(team.status)}`}>
                  {team.status}
                </div>
              </div>
            ))
          ) : (
            <div className="no_data_message">Chưa có Đội đăng ký</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamList;
