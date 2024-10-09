import React from "react";
import "./TeamList.css";
const fakeTeams = [
  {
    id: 1,
    name: "Team Alpha",
    members: 10,
    competition: "Soccer",
    contactPerson: "Nguyễn Văn A",
    contactPhone: "0909123456",
    registrationTime: "2024-10-05 12:00",
    status: "Đang xét",
  },
  {
    id: 2,
    name: "Team Beta",
    members: 8,
    competition: "Soccer",
    contactPerson: "Trần Thị B",
    contactPhone: "0909234567",
    registrationTime: "2024-10-06 15:30",
    status: "Chấp nhận",
  },
  {
    id: 3,
    name: "Team Gamma",
    members: 12,
    competition: "Soccer",
    contactPerson: "Lê Văn C",
    contactPhone: "0909345678",
    registrationTime: "2024-10-07 10:45",
    status: "Được mời",
  },
  {
    id: 4,
    name: "Team Gamma",
    members: 12,
    competition: "Soccer",
    contactPerson: "Lê Văn C",
    contactPhone: "0909345678",
    registrationTime: "2024-10-07 10:45",
    status: "Từ chối lời mời",
  },
];

const TeamList = ({ isPublic }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case "Đang xét":
        return "status review";
      case "Chấp nhận":
        return "status accepted";
      case "Từ chối":
        return "status rejected";
      case "Được mời":
        return "status invited";
      case "Từ chối lời mời":
        return "status declined";
      case "Được mời":
        return "status invited";
      case "Từ chối lời mời":
        return "Từ chối lời mời";
      default:
        return "";
    }
  };
  return (
    <div className="team_list_container">
      <div className="status_overview">
        <span className="status_info">
          <i className="status_icon">ℹ️</i> Ở trạng thái <b>Chấp nhận</b> thì
          đội thi đấu sẽ không thể thay đổi được thông tin đăng ký.
        </span>
        <button className="guide_button">Hướng dẫn</button>
      </div>
      {isPublic ? (
        <div className="status_badges">
          <span className="badge review">Đang xét: 0</span>
          <span className="badge accepted">Chấp nhận: 0</span>
          <span className="badge rejected">Từ chối: 0</span>
        </div>
      ) : (
        <div className="status_badges">
          <span className="badge invited">Được mời: 0</span>
          <span className="badge declined">Từ chối lời mời: 0</span>
        </div>
      )}
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
          {fakeTeams.length > 0 ? (
            fakeTeams.map((team) => (
              <div key={team.id} className="table_row">
                <div className="table_cell">{team.id}</div>
                <div className="table_cell">{team.name}</div>
                <div className="table_cell">{team.members}</div>
                <div className="table_cell">{team.competition}</div>
                <div className="table_cell">{team.contactPerson}</div>
                <div className="table_cell">{team.contactPhone}</div>
                <div className="table_cell">{team.registrationTime}</div>
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
