import React, { useEffect } from "react";
import "./TournamentAdhesion.css";
import api from "../../../../config";

const TournamentAdhesion = () => {
  const data = [
    {
      competitionId: 1,
      image:
        "https://firebasestorage.googleapis.com/v0/b/fine-acronym-438603-m5.firebasestorage.app/o/stem-sever%2FDALL%C2%B7E%202024-11-11%2011.51.21%20-%20A%20vibrant%20scene%20of%20a%20STEM%20robot%20soccer%20competition%20set%20in%20a%20spacious%20arena.%20The%20field%20is%20designed%20with%20a%20large%20green%20and%20yellow%20soccer%20pitch%2C%20with%20cle.webp?alt=media&token=af66e483-0009-4652-8d4d-7c473e314f8c",
      competitionName: "FSoft Thu Đông 2024",
      tournamentId: 1,
      tournamnetName: "STEM-ROBOT 2024",
      formatName: "Chia Bảng Đấu",
      organizer: "Tú Nguyễn Văn",
      location: "Sân Bóng Mỹ Trì",
      slot: 32,
      numberTeam: 28,
      status: "Hoạt động",
      startTime: "2024-11-26T00:00:00",
      endTime: "2024-11-29T00:00:00",
    },
    {
      competitionId: 2,
      image:
        "https://firebasestorage.googleapis.com/v0/b/fine-acronym-438603-m5.firebasestorage.app/o/stem-sever%2FDALL%C2%B7E%202024-11-11%2011.51.21%20-%20A%20vibrant%20scene%20of%20a%20STEM%20robot%20soccer%20competition%20set%20in%20a%20spacious%20arena.%20The%20field%20is%20designed%20with%20a%20large%20green%20and%20yellow%20soccer%20pitch%2C%20with%20cle.webp?alt=media&token=af66e483-0009-4652-8d4d-7c473e314f8c",
      competitionName: "Tiên Lệ League",
      tournamentId: 1,
      tournamnetName: "STEM-ROBOT 2024",
      formatName: "Đấu Vòng Tròn",
      organizer: "Nguyen Khac Chuc",
      location: "Tiên Lệ, Tiên Yên, Hoài Đức, Hà Nội, Việt Nam",
      slot: 15,
      numberTeam: 15,
      startTime: "2024-12-05T00:00:00",
      endTime: "2024-12-10T00:00:00",
    },
  ];
  useEffect(() => {
    api
      .get(`api/tournaments/tournament-adhesion?page=1&pageSize=10`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        alert("error", error);
      });
  }, []);
  const getStatus = (startTime, endTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (now < start) {
      return "Chưa diễn ra";
    } else if (now >= start && now <= end) {
      return "Đang diễn ra";
    } else {
      return "Đã kết thúc";
    }
  };

  return (
    <div className="tournament-adhesion">
      <div className="tournament-adhesion-header">
        <h2 className="tournament-adhesion-title">
          Nội dung thi đấu đã tham gia
        </h2>
        <button className="create-competition">Tạo Giải Đấu</button>
      </div>

      {data.map((item) => (
        <div key={item.competitionId} className="competition-card">
          <div className="competition-image">
            <img src={item.image} alt={item.competitionName} />
          </div>
          <div className="competition-info">
            <h3>{item.competitionName}</h3>
            <p>
              {item.tournamnetName} || {item.formatName} || {item.organizer} ||{" "}
              {item.location}
            </p>
            <span
              className="status-competition-tag"
              data-status={getStatus(item.startTime, item.endTime)}
            >
              {getStatus(item.startTime, item.endTime)}
            </span>

            <div className="competition-progress">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${(item.numberTeam / item.slot) * 100}%`,
                  }}
                ></div>
              </div>
              <span>
                {item.numberTeam}/{item.slot} Đội
              </span>
            </div>
          </div>
        </div>
      ))}
      <div className="competition-pagination">
        {/* <button className="pagination-item pagination-disabled">◄</button>
                {[1, 2, 3, 4, 5].map((page) => (
                    <button
                        key={page}
                        className={`pagination-item ${page === 1 ? "active" : ""}`}
                    >
                        {page}
                    </button>
                ))}
                <button className="pagination-item">►</button> */}
      </div>
    </div>
  );
};

export default TournamentAdhesion;
