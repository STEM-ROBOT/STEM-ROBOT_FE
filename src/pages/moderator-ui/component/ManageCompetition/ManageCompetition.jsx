import React from "react";
import "./ManageCompetition.css";
import { IoLogoGameControllerB } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams to get tournament ID

const competitions = [
  {
    id: 1,
    name: "Bóng Đá",
    image:
      "https://5sfashion.vn/storage/upload/images/ckeditor/4KG2VgKFDJWqdtg4UMRqk5CnkJVoCpe5QMd20Pf7.jpg",
  },
  {
    id: 2,
    name: "Bóng Đá",
    image:
      "https://5sfashion.vn/storage/upload/images/ckeditor/4KG2VgKFDJWqdtg4UMRqk5CnkJVoCpe5QMd20Pf7.jpg",
  },
  {
    id: 3,
    name: "Bóng Đá",
    image:
      "https://5sfashion.vn/storage/upload/images/ckeditor/4KG2VgKFDJWqdtg4UMRqk5CnkJVoCpe5QMd20Pf7.jpg",
  },
  {
    id: 4,
    name: "Bóng Đá",
    image:
      "https://5sfashion.vn/storage/upload/images/ckeditor/4KG2VgKFDJWqdtg4UMRqk5CnkJVoCpe5QMd20Pf7.jpg",
  },
  {
    id: 5,
    name: "Bóng Đá",
    image:
      "https://5sfashion.vn/storage/upload/images/ckeditor/4KG2VgKFDJWqdtg4UMRqk5CnkJVoCpe5QMd20Pf7.jpg",
  },
  {
    id: 6,
    name: "Bóng Đá",
    image:
      "https://5sfashion.vn/storage/upload/images/ckeditor/4KG2VgKFDJWqdtg4UMRqk5CnkJVoCpe5QMd20Pf7.jpg",
  },
  {
    id: 7,
    name: "Bóng Đá",
    image:
      "https://5sfashion.vn/storage/upload/images/ckeditor/4KG2VgKFDJWqdtg4UMRqk5CnkJVoCpe5QMd20Pf7.jpg",
  },
];

const ManageCompetition = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleCompetitionClick = (competitionId) => {
   
    navigate(`/mytournament/${id}/mycompetition/${competitionId}/customize`);
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
