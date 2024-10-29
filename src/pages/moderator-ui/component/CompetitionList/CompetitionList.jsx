import React, { useEffect, useState } from "react";
import "./CompetitionList.css";
import { IoLogoGameControllerB } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../../Config";
const competitions = [
  {
    id: 1,
    name: "Bóng Đá",
    image:
      "https://image-cdn.essentiallysports.com/wp-content/uploads/imago0241552301h.jpg?width=600",
    endDate: "2024-10-20T23:59:59",
    status: true,
  },
  {
    id: 2,
    name: "Giải Mê Cung",
    image: "https://ohstem.vn/wp-content/uploads/2021/12/Lap-thuc-te-2.png",
    endDate: "2024-10-30T23:59:59",
    status: false,
  },
  {
    id: 3,
    name: "Di chuyển đồ vật",
    image: "https://tuyensinh.hueic.edu.vn/wp-content/uploads/2021/03/ro1.jpg",
    endDate: "2024-10-13T23:59:59",
    status: true,
  },
];

const CompetitionList = () => {
  const path = useParams();
  console.log(path);

  const navigate = useNavigate();
  const [competitions, setCompetitions] = useState([]);
  useEffect(() => {
    api
      .get(`/api/competitions/list-idtournament?id=${path.league_id}`)
      .then((competition) => {
        console.log(competition);
        setCompetitions(competition.data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const tagStatuses = (competition) => {
    const now = new Date(); // Lấy thời gian hiện tại
    const endDate = new Date(competition.endDate);
    if (competition.status === false) {
      return "Chưa kích hoạt";
    } else if (competition.status === true && now <= endDate) {
      return "Đang đăng ký";
    } else if (competition.status === true && now > endDate) {
      return "Đang diển ra";
    }
  };
  const activeStatuses = (competition) => {
    const now = new Date(); // Lấy thời gian hiện tại
    const endDate = new Date(competition.endDate);
    if (competition.status === false) {
      return "competition_status_competition";
    } else if (competition.status === true && now <= endDate) {
      return "competition_status_competition rg";
    } else if (competition.status === true && now > endDate) {
      return "competition_status_competition done";
    }
  };
  return (
    <div className="competition_container">
      <div className="introduction_header">
        <IoLogoGameControllerB className="icon_competition" />
        <span className="header_text">Nội dung thi đấu</span>
      </div>
      <div
        className={
          competitions.length >= 6 ? "competition_grid" : "competition_grid_1"
        }
      >
        {competitions.map((competition) => (
          <div
            key={competition.id}
            className="competition_item"
            onClick={() => {
              {
                localStorage.setItem("competitionName", competition.name),
                  localStorage.setItem(
                    "competitionEndDate",
                    competition.endDate
                  ),
                  navigate(
                    `/league/${path.league_id}/competition/${competition.id}`,
                    {
                      state: {
                        names: competition.name,
                        endDate: competition.endDate,
                      },
                    }
                  );
              }
            }}
          >
            <div className={activeStatuses(competition)}>
              {tagStatuses(competition)}
            </div>
            <img
              src={competition.image}
              alt={competition.name}
              className="competition_image"
            />

            <div className="competition_name">
              <div className="name">{competition.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompetitionList;
