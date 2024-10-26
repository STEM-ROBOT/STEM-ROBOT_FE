import React from "react";
import "./ManageCompetition.css";
import { IoLogoGameControllerB } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams to get tournament ID

const competitions = [
  {
    id: 1,
    name: "Bóng Đá",
    image:
      "https://image-cdn.essentiallysports.com/wp-content/uploads/imago0241552301h.jpg?width=600",
    endDate: "2024-10-20T23:59:59",
    status: true,
    mode: "public"
  },
  {
    id: 2,
    name: "Giải Mê Cung",
    image: "https://ohstem.vn/wp-content/uploads/2021/12/Lap-thuc-te-2.png",
    endDate: "",
    status: false,
    mode: "public"
  },
  {
    id: 3,
    name: "Di chuyển đồ vật",
    image: "https://tuyensinh.hueic.edu.vn/wp-content/uploads/2021/03/ro1.jpg",
    endDate: "2024-10-22T23:59:59",
    status: true,
    mode: "public"
  },
];

const ManageCompetition = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleCompetitionClick = (competitionId) => {

    navigate(`/mytournament/${id}/mycompetition/${competitionId}/customize`);
  };
  const activeStatuses = (competition) => {
    const now = new Date(); // Lấy thời gian hiện tại
    const endDate = new Date(competition.endDate);
    if (competition.status === false) {
      return "competition_status_competition";
    } else if (competition.status === true && now <= endDate && competition.mode === "public") {
      return "competition_status_competition rg";
    } else if ((competition.status === true && competition.mode === "private") || (competition.status === true && now > endDate && competition.mode === "public")) {
      return "competition_status_competition done";
    }
  };
  const tagStatuses = (competition) => {
    const now = new Date(); // Lấy thời gian hiện tại
    const endDate = new Date(competition.endDate);
    if (competition.status === false) {
      return "Chưa kích hoạt";
    } else if (competition.status === true && now <= endDate && competition.mode === "public") {
      return "Đang đăng ký";
    } else if (competition.status === true) {
      return "Đang diển ra";
    }
  };
  return (
    <div className="manage_competition_container">
      <div className="manage_competition_header">
        <IoLogoGameControllerB className="manage_competition_icon" />
        <span className="manage_competition_title">Nội dung thi đấu</span>
      </div>
      <div
        className={
          competitions.length >= 6
            ? "manage_competition_grid"
            : "manage_competition_grid_single"
        }
      >
        {competitions.map((competition) => (
          <div
            key={competition.id}
            className="manage_competition_item"
            onClick={() => handleCompetitionClick(competition.id)} // Navigate to the specific competition's customize page
          >
            <div className={activeStatuses(competition)}>
              {tagStatuses(competition)}
            </div>
            <img
              src={competition.image}
              alt={competition.name}
              className="manage_competition_image"
            />
            <div className="manage_competition_name">
              <div className="manage_competition_name_text">
                {competition.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCompetition;
