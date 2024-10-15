import React from "react";
import "./CompetitionList.css";
import { IoLogoGameControllerB } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
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
  {
    id: 8,
    name: "Bóng Đá",
    image:
      "https://5sfashion.vn/storage/upload/images/ckeditor/4KG2VgKFDJWqdtg4UMRqk5CnkJVoCpe5QMd20Pf7.jpg",
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
            onClick={() =>
              navigate(
                `/league/${path.league_id}/competition/${competition.id}`,
                { state: { names: competition.name } }
              )
            }
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
