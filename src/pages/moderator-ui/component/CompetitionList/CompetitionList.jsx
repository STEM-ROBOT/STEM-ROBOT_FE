import React from "react";
import "./CompetitionList.css";
import { IoLogoGameControllerB } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
const competitions = [
  {
    id: 1,
    name: "Bóng Đá",
    image:
      "https://image-cdn.essentiallysports.com/wp-content/uploads/imago0241552301h.jpg?width=600",
    endDate: "2024-10-20T23:59:59",
  },
  {
    id: 2,
    name: "Giải Mê Cung",
    image: "https://ohstem.vn/wp-content/uploads/2021/12/Lap-thuc-te-2.png",
    endDate: "2024-10-30T23:59:59",
  },
  {
    id: 3,
    name: "Di chuyển đồ vật",
    image: "https://tuyensinh.hueic.edu.vn/wp-content/uploads/2021/03/ro1.jpg",
    endDate: "2024-11-13T23:59:59",
  },
];

const CompetitionList = () => {
  const path = useParams();
  console.log(path);

  const navigate = useNavigate();
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
              localStorage.setItem("competitionName", competition.name),
              localStorage.setItem("competitionEndDate", competition.endDate),
                navigate(
                  `/league/${path.league_id}/competition/${competition.id}`,
                  {
                    state: {
                      names: competition.name,
                      endDate: competition.endDate,
                    },
                  }
                );
            }}
          >
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
